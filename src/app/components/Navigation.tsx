import { Link, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const T = {
  terra500: "var(--terra-500)",
  text: "var(--on-surface)",
  text2: "var(--on-surface-secondary)",
  border: "var(--nav-border)",
  bg: "var(--nav-bg)",
};

const LINKS: Array<{ label: string; id: string }> = [
  { label: "Work", id: "work" },
  { label: "Clients", id: "clients" },
  { label: "Process", id: "process" },
  { label: "Services", id: "services" },
  { label: "About", id: "about" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const lastY = useRef(0);
  const scrollStopTimer = useRef<number | undefined>(undefined);

  // Auto-hide on scroll down; reveal on scroll up, near top, hover at top, or scroll stop
  useEffect(() => {
    const TOP_ZONE = 20;       // treat as "at top" within this many px
    const HOVER_ZONE = 80;     // reveal if pointer within this many px of top
    const DELTA = 6;           // require some movement to flip state (dead zone)

    const onScroll = () => {
      const y = window.scrollY;

      if (y < TOP_ZONE) {
        setHidden(false);
      } else if (y > lastY.current + DELTA) {
        // Scrolling down — hide (only when past the mobile menu concern)
        if (!mobileMenuOpen) setHidden(true);
      } else if (y < lastY.current - DELTA) {
        // Scrolling up — reveal
        setHidden(false);
      }
      lastY.current = y;

      // Reveal when scroll stops
      window.clearTimeout(scrollStopTimer.current);
      scrollStopTimer.current = window.setTimeout(() => setHidden(false), 280);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (e.clientY < HOVER_ZONE) setHidden(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.clearTimeout(scrollStopTimer.current);
    };
  }, [mobileMenuOpen]);

  // Always reveal when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) setHidden(false);
  }, [mobileMenuOpen]);

  // Lock body scroll while the mobile overlay menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
  }, [mobileMenuOpen]);

  // Close the menu on Escape key (a11y)
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen]);

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: hidden ? -72 : 0, opacity: 1 }}
      transition={{ y: { duration: 0.35, ease: [0.22, 1, 0.36, 1] }, opacity: { duration: 0.6, ease: "easeOut" } }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: T.bg,
        backdropFilter: "blur(18px) saturate(160%)",
        WebkitBackdropFilter: "blur(18px) saturate(160%)",
        borderBottom: `1px solid ${T.border}`,
        willChange: "transform",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 40px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              color: T.text,
              fontFamily: "var(--font-display)",
            }}
          >
            HARSHA POLEPEDDI
          </span>
        </Link>

        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: "24px" }}
        >
          {LINKS.map((item) => (
            <a
              key={item.id}
              href={`/#${item.id}`}
              onClick={goToSection(item.id)}
              style={{
                fontSize: "13px",
                color: T.text2,
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={goToSection("contact")}
            style={{
              fontSize: "13px",
              fontWeight: 600,
              padding: "8px 18px",
              borderRadius: "8px",
              border: `1px solid ${T.terra500}`,
              color: T.terra500,
              background: "#ffffff",
              textDecoration: "none",
            }}
          >
            Let's Talk
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "transparent",
            border: "none",
            color: T.text,
            // 44×44 tap target (WCAG min) — was 30×30
            width: 44,
            height: 44,
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            // Visual position adjustment so the icon optically aligns
            marginRight: -10,
            // Stays above the menu overlay so the user can always close it
            position: "relative",
            zIndex: 60,
          }}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {/* Always shows Menu icon — when the overlay is open, the
              overlay's own X button handles closing (this button is
              hidden behind the full-screen portal overlay). */}
          <Menu size={22} />
        </button>
      </div>

      {/* Full-screen mobile menu overlay — rendered via a React Portal
          directly into document.body so it escapes the nav's stacking
          context (and any ancestor's transform/filter/will-change that
          would otherwise trap it). This is the only reliable way to
          guarantee the overlay paints above every page section. */}
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
          <motion.div
            key="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              // Solid theme-aware surface. Now that we're portaled at
              // document.body root, no parent can clip or composite this
              // away — the menu fully covers the page.
              background: "var(--surface)",
              // Max safe z-index — sits above every page element.
              zIndex: 2147483647,
              display: "flex",
              flexDirection: "column",
              paddingTop: 16,
              paddingLeft: "max(28px, env(safe-area-inset-left))",
              paddingRight: "max(28px, env(safe-area-inset-right))",
              paddingBottom: "max(28px, env(safe-area-inset-bottom))",
            }}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
          >
            {/* Close button — lives inside the overlay (not the nav) so
                it always sits above all page content alongside the menu. */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: 44,
              marginBottom: 8,
            }}>
              <span style={{
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: T.text,
                fontFamily: "var(--font-display)",
              }}>
                HARSHA POLEPEDDI
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                style={{
                  background: "transparent",
                  border: "none",
                  color: T.text,
                  width: 44,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  marginRight: -10,
                }}
              >
                <X size={22} />
              </button>
            </div>
            {/* Stagger the links in with a quick rhythm */}
            <motion.nav
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.045, delayChildren: 0.08 },
                },
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginTop: 28,
              }}
            >
              {LINKS.map((item) => (
                <motion.a
                  key={item.id}
                  href={`/#${item.id}`}
                  onClick={goToSection(item.id)}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: "clamp(2rem, 8vw, 2.6rem)",
                    fontWeight: 700,
                    fontFamily: "var(--font-display)",
                    color: T.text,
                    letterSpacing: "-0.025em",
                    lineHeight: 1.15,
                    textDecoration: "none",
                    paddingTop: 12,
                    paddingBottom: 12,
                    // 44×44 min hit area satisfied by line-height + padding
                    cursor: "pointer",
                  }}
                >
                  {item.label}
                </motion.a>
              ))}
            </motion.nav>

            {/* Bottom: Let's Talk CTA + email */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              style={{
                marginTop: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingTop: 32,
              }}
            >
              <a
                href="/#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  goToSection("contact")(e);
                }}
                style={{
                  fontSize: "16px",
                  fontWeight: 600,
                  padding: "16px 20px",
                  borderRadius: "10px",
                  border: `1px solid ${T.terra500}`,
                  color: T.terra500,
                  background: "#ffffff",
                  textDecoration: "none",
                  textAlign: "center",
                  fontFamily: "var(--font-body)",
                  letterSpacing: "0.01em",
                }}
              >
                Let's Talk
              </a>
              {/* Email + WhatsApp row */}
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
                <a
                  href="mailto:hpolepeddi@gmail.com"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: T.text2,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  hpolepeddi@gmail.com
                </a>
                <span style={{ color: "var(--on-surface-secondary)", opacity: 0.35, fontSize: "14px", userSelect: "none" }}>|</span>
                <a
                  href="https://wa.me/919701849481"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "13px",
                    fontWeight: 500,
                    color: T.text2,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontFamily: "var(--font-body)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.554 4.122 1.523 5.855L.057 23.886a.75.75 0 0 0 .921.921l6.056-1.466A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.694 9.694 0 0 1-4.953-1.357l-.355-.212-3.683.892.908-3.647-.232-.372A9.698 9.698 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>,
        document.body
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  );
}
