import React, { useRef, useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft, Sparkles, Network, Zap, Users, Brain,
  Layers, ArrowRight, BarChart2, GitMerge, Compass, Target, ChevronLeft, ChevronRight,
} from "lucide-react";
import { projects } from "../data/projects";
import Navigation from "./Navigation";
import HighlightMark from "./HighlightMark";
import MobileCarousel from "./MobileCarousel";
import ContactSection from "./ContactSection";

// ─── Feature flags ─────────────────────────────────────────────────────────────
// Flip to true once project assets, AI design notes, and reflection content
// are ready. All three sections will reappear automatically.
const SHOW_WIP_SECTIONS = false;

// ─── Noise Shimmer ────────────────────────────────────────────────────────────

function NoiseShimmer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const W = 100, H = 75;
    canvas.width = W; canvas.height = H;
    let t = 0, raf: number;
    const sample = (x: number, y: number, time: number) => {
      const n1 = Math.sin(x * 1.1 + time * 0.55) * Math.cos(y * 0.85 + time * 0.38) * 0.42;
      const n2 = Math.sin(x * 2.1 + y * 1.8 + time * 0.40) * 0.32;
      const n3 = Math.cos(x * 0.65 + y * 1.6 + time * 0.26) * 0.26;
      return n1 + n2 + n3;
    };
    const draw = () => {
      const img = ctx.createImageData(W, H);
      const d = img.data;
      for (let x = 0; x < W; x++) {
        for (let y = 0; y < H; y++) {
          const v = (sample(x / W * 4, y / H * 4, t) + 1) / 2;
          const a = Math.max(0, Math.floor(Math.pow(v, 1.2) * 95));
          const i = (y * W + x) * 4;
          d[i] = 196; d[i + 1] = 82; d[i + 2] = 42; d[i + 3] = a;
        }
      }
      ctx.putImageData(img, 0, 0);
      t += 0.006;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%", filter: "blur(44px)", opacity: 1 }}
    />
  );
}

// ─── Animation presets ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay, ease: "easeOut" },
});

// ─── Section label ─────────────────────────────────────────────────────────────

function SectionLabel({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <p
      className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-5"
      style={{ color: light ? "rgba(255,255,255,0.38)" : "var(--terra-500)" }}
    >
      {children}
    </p>
  );
}

// ─── AI layer illustration ─────────────────────────────────────────────────────

function AILayerIllustration() {
  return (
    <svg viewBox="0 0 420 154" className="w-full max-w-[500px]" style={{ display: "block" }}>
      {[
        { y: 4,   label: "User Interface", fill: "rgba(196,82,42,0.10)", stroke: "rgba(196,82,42,0.28)", text: "#c4522a" },
        { y: 54,  label: "AI Layer",       fill: "rgba(196,82,42,0.20)", stroke: "rgba(196,82,42,0.46)", text: "#e8896a" },
        { y: 104, label: "Data + Context", fill: "rgba(255,255,255,0.04)", stroke: "rgba(255,255,255,0.11)", text: "rgba(255,255,255,0.38)" },
      ].map((band, i) => (
        <g key={i}>
          <rect x="0" y={band.y} width="420" height="44" rx="8" fill={band.fill} stroke={band.stroke} strokeWidth="0.75" />
          <text x="16" y={band.y + 27} fill={band.text} fontSize="11" fontFamily="-apple-system,sans-serif" fontWeight="600">
            {band.label}
          </text>
        </g>
      ))}
      {["Trust", "Usability", "Feedback", "Control"].map((p, i) => (
        <g key={i}>
          <rect
            x={240 + (i % 2) * 88}
            y={4 + Math.floor(i / 2) * 50}
            width="78" height="38" rx="6"
            fill="rgba(196,82,42,0.09)"
            stroke="rgba(196,82,42,0.22)"
            strokeWidth="0.5"
          />
          <text
            x={279 + (i % 2) * 88}
            y={27 + Math.floor(i / 2) * 50}
            textAnchor="middle"
            fill="rgba(196,82,42,0.85)"
            fontSize="9"
            fontFamily="-apple-system,sans-serif"
            fontWeight="700"
          >
            {p}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ─── Artefact tag — brush stroke highlight ───────────────────────────────────
// Three slightly different brush paths for organic variety across tags

const BRUSH_VARIANTS = [
  // Start low, end high — gentle rise
  { d: "M-3,8 Q52,6.5 105,4", angle: "-1deg", sw: "9" },
  // Start low, end high — slightly steeper
  { d: "M-2,8.5 Q50,6 104,3.5", angle: "0.5deg", sw: "8.5" },
  // Start low, end high — with a subtle mid-wave
  { d: "M-3,7.5 Q30,7 55,5.5 Q80,4 106,3.5", angle: "-0.8deg", sw: "9.5" },
];

function ArtefactTag({ children, delay = 0, index = 0 }: { children: React.ReactNode; delay?: number; index?: number }) {
  const v = BRUSH_VARIANTS[index % BRUSH_VARIANTS.length];
  return (
    <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-5px",
          top: "-10%",
          width: "calc(100% + 10px)",
          height: "120%",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "visible",
          transform: `rotate(${v.angle})`,
          filter: "blur(1.4px)",
        }}
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
      >
        <motion.path
          d={v.d}
          stroke="rgba(196,82,42,0.22)"
          strokeWidth={v.sw}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            pathLength: { duration: 0.45, ease: "easeOut", delay },
            opacity: { duration: 0.01, delay },
          }}
        />
      </svg>
      <span style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-display)", fontStyle: "italic", color: "var(--terra-600, #b34d20)" }}>
        {children}
      </span>
    </span>
  );
}

// ─── Decision card icon + category ────────────────────────────────────────────

const DECISION_META: { Icon: React.ElementType; category: string; objectPos: string }[] = [
  { Icon: Network,   category: "Architecture",  objectPos: "top center" },
  { Icon: Zap,       category: "Efficiency",    objectPos: "center left" },
  { Icon: Users,     category: "Collaboration", objectPos: "top right" },
  { Icon: Brain,     category: "AI Experience", objectPos: "center" },
  { Icon: Layers,    category: "Design System", objectPos: "bottom center" },
];

// ─── Impact outcome icons ──────────────────────────────────────────────────────

const IMPACT_ICONS: React.ElementType[] = [Target, Brain, Zap, Layers];

// ─── Main component ────────────────────────────────────────────────────────────

export default function CaseStudyPage() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  // Parallax scroll refs — defined unconditionally (React hook rules)
  const heroRef = useRef<HTMLDivElement>(null);
  const impactImageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroScrollY } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const { scrollYProgress: impactScrollY } = useScroll({
    target: impactImageRef,
    offset: ["start end", "end start"],
  });

  const heroImgY = useTransform(heroScrollY, [0, 1], [0, -100]);
  const impactImgY = useTransform(impactScrollY, [0, 1], [-50, 50]);

  // Project assets carousel
  const [assetIndex, setAssetIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const firstSlideRef = useRef<HTMLImageElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setCarouselWidth(el.offsetWidth));
    ro.observe(el);
    setCarouselWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = firstSlideRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setSlideWidth(el.offsetWidth));
    ro.observe(el);
    setSlideWidth(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  // Active outcome card tracking
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const items = project?.impactItems;
    if (!items || items.length === 0) return;
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIndex(i); },
        { rootMargin: "-38% 0px -38% 0px", threshold: 0 }
      );
      obs.observe(ref);
      return obs;
    });
    return () => observers.forEach(obs => obs?.disconnect());
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <p className="text-[14px] mb-4" style={{ color: "#78716c" }}>Case study not found.</p>
          <Link to="/" className="text-[13px] font-medium" style={{ color: "var(--terra-500)" }}>
            ← Back to portfolio
          </Link>
        </div>
      </div>
    );
  }

  const { title, category, role, timeline, industry, tagline, heroImage, contextImage, context, contextPoints, keyDecisions, impactItems, projectAssets, aiDesignNote, nextPhase, reflection } = project;

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "var(--font-body, system-ui)" }}>
      <Navigation />

      {/* Page entrance animation wrapper */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section className="pt-[64px] relative overflow-hidden">

          {/* Noise shimmer — atmospheric warm glow */}
          <NoiseShimmer />

          <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">

            {/* Breadcrumb */}
            <div className="pt-10 pb-6">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-[13px] font-medium transition-colors duration-200"
                style={{ color: "#78716c" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "#1c1917"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "#78716c"}
              >
                <ArrowLeft size={14} />
                All Work
              </Link>
            </div>

            {/* Metadata */}
            <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-5 mb-7 text-[12px]">
              <HighlightMark delay={0.2}>{category}</HighlightMark>
              <span style={{ color: "#e7e5e4" }} className="hidden sm:inline text-[10px]">·</span>
              <HighlightMark delay={0.4}>{role}</HighlightMark>
              <span style={{ color: "#e7e5e4" }} className="hidden sm:inline text-[10px]">·</span>
              <HighlightMark delay={0.6}>{timeline}</HighlightMark>
              <span style={{ color: "#e7e5e4" }} className="hidden sm:inline text-[10px]">·</span>
              <HighlightMark delay={0.8}>{industry}</HighlightMark>
            </motion.div>

            {/* Title */}
            <motion.h1
              {...fadeUp(0.1)}
              className="text-[32px] sm:text-[48px] lg:text-[58px] font-bold leading-[1.1] tracking-[-0.025em] text-stone-900 max-w-[800px] mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </motion.h1>

            {/* Tagline */}
            {tagline && (
              <motion.p
                {...fadeUp(0.18)}
                className="text-[17px] sm:text-[19px] leading-relaxed max-w-[580px] mb-10"
                style={{ color: "#78716c" }}
              >
                {tagline}
              </motion.p>
            )}

            {/* Hero image —
                MOBILE: a plain <img> at natural aspect (w-full, h-auto)
                  → zero cropping, zero empty bars, no background tint.
                  The image is exactly what it is.
                DESKTOP (lg+): cinematic clamp container + object-cover
                  crop + scroll parallax + load-reveal zoom. */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
              className="relative rounded-2xl overflow-hidden w-full"
            >
              {/* MOBILE — natural-aspect image */}
              <img
                src={heroImage ?? "/Featured Project Hero Image.png"}
                alt={title}
                className="block lg:hidden w-full h-auto"
              />

              {/* DESKTOP — original cropped + parallax treatment */}
              <div ref={heroRef} className="hidden lg:block relative" style={{ height: "clamp(340px, 50vw, 500px)" }}>
                <motion.div
                  initial={{ scale: 1.08 }}
                  animate={{ scale: 1.0 }}
                  transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
                  style={{ y: heroImgY, willChange: "transform" }}
                  className="absolute w-full h-[calc(100%+140px)] top-0"
                >
                  <img
                    src={heroImage ?? "/Featured Project Hero Image.png"}
                    alt={title}
                    className="w-full h-full object-cover"
                    style={{ objectPosition: "center top" }}
                  />
                </motion.div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* Section divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e7e5e4, transparent)" }} />

        {/* ── CONTEXT ──────────────────────────────────────────────────────── */}
        <section
          className="py-16 lg:py-32"
          style={{
            background: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px) 0 0 / 26px 26px, radial-gradient(ellipse at 90% 0%, rgba(196,82,42,0.05) 0%, transparent 52%), #ffffff",
          }}
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

              {/* Left: Text */}
              <div>
                <motion.div {...fadeUp(0)}>
                  <SectionLabel>Context</SectionLabel>
                </motion.div>

                <motion.p
                  {...fadeUp(0.08)}
                  className="text-[17px] leading-[1.78] mb-10"
                  style={{ color: "#57534e" }}
                >
                  {context}
                </motion.p>

                {contextPoints && (
                  <div className="space-y-7">
                    {contextPoints.map((point, i) => (
                      <motion.div key={i} {...fadeUp(0.12 + i * 0.07)} className="flex gap-4">
                        <div className="flex-shrink-0 mt-[3px]">
                          <Sparkles size={14} style={{ color: "var(--terra-500)" }} />
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold text-stone-900 mb-1.5">{point.title}</p>
                          <p className="text-[14px] leading-[1.75]" style={{ color: "#78716c" }}>{point.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right: Illustration */}
              <motion.div
                {...fadeIn(0.2)}
                className="relative lg:sticky lg:top-28"
              >
                <img
                  src={contextImage ?? "/Featured Project Challenges.png"}
                  alt="Fragmented organizational context"
                  className="w-full h-auto"
                  style={{ filter: "drop-shadow(0 8px 32px rgba(0,0,0,0.10))" }}
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Section divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e7e5e4, transparent)" }} />

        {/* ── KEY DECISIONS ─────────────────────────────────────────────────── */}
        {keyDecisions && keyDecisions.length > 0 && (
          <section
            className="py-16 lg:py-32"
            style={{
              background: "radial-gradient(circle, rgba(0,0,0,0.028) 1px, transparent 1px) 0 0 / 26px 26px, radial-gradient(ellipse at 100% 0%, rgba(196,82,42,0.05) 0%, transparent 50%), #ffffff",
            }}
          >
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

              <motion.div {...fadeUp(0)} className="mb-14">
                <SectionLabel>What shaped the product</SectionLabel>
                <h2
                  className="text-[30px] sm:text-[36px] font-bold tracking-[-0.02em] text-stone-900 max-w-[520px] leading-[1.15]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Key decisions that defined the direction.
                </h2>
              </motion.div>

              {/* Decision 01 — full width featured card, image top */}
              {(() => {
                const meta = DECISION_META[0];
                const { Icon } = meta;
                return (
                  <motion.div
                    {...fadeUp(0.08)}
                    whileHover={{ y: -3, transition: { duration: 0.22, ease: "easeOut" } }}
                    className="mb-6 rounded-2xl overflow-hidden"
                    style={{ background: "white", border: "1px solid #ece8e6" }}
                  >
                    {/* Image area — gradient IS the background, image sits in lower portion on top of it */}
                    <div
                      className="relative overflow-hidden"
                      style={{
                        height: "clamp(340px, 38vw, 520px)",
                        background: "linear-gradient(to bottom, rgba(196,82,42,0.12) 0%, rgba(247,243,240,1) 42%, white 72%)",
                      }}
                    >
                      <div className="absolute inset-x-0 bottom-0" style={{ height: "100%" }}>
                        <motion.img
                          src={keyDecisions[0].image ?? "/WID 1.png"}
                          alt={keyDecisions[0].title}
                          initial={{ scale: 1.05, opacity: 0 }}
                          whileInView={{ scale: 1.0, opacity: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          className="w-full h-full object-contain object-bottom"
                          style={{ filter: "drop-shadow(0 -6px 18px rgba(0,0,0,0.09))" }}
                        />
                      </div>
                    </div>
                    {/* Text — bottom. Tighter padding on mobile so a
                        375px card uses its real estate instead of
                        burning half of it on margins. */}
                    <div className="p-6 sm:p-10 lg:p-14">
                      <div className="flex items-center gap-2.5 mb-5">
                        <Icon size={18} style={{ color: "var(--terra-500)" }} strokeWidth={1.75} />
                        <span className="text-[11px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--terra-500)" }}>
                          {meta.category}
                        </span>
                      </div>
                      <h3
                        className="text-[22px] sm:text-[24px] font-bold tracking-[-0.015em] text-stone-900 mb-4 leading-[1.25]"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {keyDecisions[0].title}
                      </h3>
                      <p className="text-[15px] leading-[1.78] max-w-[640px]" style={{ color: "#78716c" }}>
                        {keyDecisions[0].description}
                      </p>
                      {keyDecisions[0].artefacts && keyDecisions[0].artefacts.length > 0 && (
                        <div className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-10 mt-7 pt-6 border-t border-stone-100 text-[13px]">
                          {keyDecisions[0].artefacts.map((a, idx) => (
                            <ArtefactTag key={idx} delay={0.25 + idx * 0.15} index={idx}>{a}</ArtefactTag>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })()}

              {/* Decisions 02–05 — DESKTOP: connected 2×2 cluster, no gaps.
                  Hidden on mobile; mobile gets a swipe carousel below. */}
              <motion.div
                {...fadeUp(0.12)}
                className="hidden lg:block rounded-2xl overflow-hidden"
                style={{ border: "1px solid #ece8e6" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {keyDecisions.slice(1).map((decision, i) => {
                    const meta = DECISION_META[i + 1] ?? DECISION_META[0];
                    const { Icon } = meta;
                    // Internal dividers only — no outer borders (handled by wrapper)
                    const dividerClass = [
                      "border-b border-[#ece8e6] sm:border-r",
                      "border-b border-[#ece8e6]",
                      "border-b border-[#ece8e6] sm:border-b-0 sm:border-r",
                      "",
                    ][i] ?? "";
                    return (
                      <div
                        key={i}
                        className={`flex flex-col bg-white ${dividerClass}`}
                      >
                        {/* Image — padded within card, background breathes around it.
                            Mobile uses smaller insets so the screenshot
                            isn't shrunken inside the card frame. */}
                        <div
                          className="relative h-[260px] sm:h-[340px]"
                        >
                          <motion.div
                            className="absolute inset-6 bottom-5 sm:inset-10 sm:bottom-8 overflow-hidden"
                            initial={{ y: 22, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.55, delay: 0.06 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                            style={{ borderRadius: "10px 10px 0 0" }}
                          >
                            <img
                              src={keyDecisions[i + 1]?.image ?? (i === 0 ? "/Final Deep Navigation.png" : i === 1 ? "/Final Collaboration.png" : i === 2 ? "/Final Principles.png" : "/Final Design System.png")}
                              alt={decision.title}
                              className="w-full h-full object-contain object-bottom"
                              style={{
                                filter: "drop-shadow(0 -4px 14px rgba(0,0,0,0.08))",
                                transform: i === 2 ? "scale(0.92)" : undefined,
                                transformOrigin: "bottom center",
                              }}
                            />
                          </motion.div>
                        </div>
                        {/* Text — bottom. Mobile gets tighter padding
                            so each cluster card fits nicely on a phone. */}
                        <div className="p-6 sm:p-10 flex flex-col gap-5 flex-1">
                          <div className="flex items-center gap-2">
                            <Icon size={15} style={{ color: "var(--terra-500)" }} strokeWidth={1.75} />
                            <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--terra-500)" }}>
                              {meta.category}
                            </span>
                          </div>
                          <h3
                            className="text-[15px] sm:text-[16px] font-bold tracking-[-0.01em] text-stone-900 leading-[1.3]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {decision.title}
                          </h3>
                          <p className="text-[13px] leading-[1.75]" style={{ color: "#78716c" }}>
                            {decision.description}
                          </p>
                          {decision.artefacts && decision.artefacts.length > 0 && (
                            <div className="flex flex-wrap gap-x-5 gap-y-2.5 sm:gap-9 mt-2 pt-5 border-t border-stone-100 text-[12px]">
                              {decision.artefacts.map((a, idx) => (
                                <ArtefactTag key={idx} delay={0.2 + idx * 0.15} index={idx}>{a}</ArtefactTag>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* MOBILE — Decisions 02–05 as a horizontal swipe carousel.
                  Featured Decision 01 sits above (full-width hero card);
                  the remaining 4 are best-explored one-at-a-time on a
                  phone, with pagination dots to signal there's more and
                  edge-to-edge cards for a real mobile-product feel. */}
              <div className="lg:hidden">
                <p
                  className="text-[11px] font-bold tracking-[0.16em] uppercase mb-4"
                  style={{ color: "var(--terra-500)" }}
                >
                  What's next
                </p>
                <MobileCarousel
                  cardWidthPercent={88}
                  gap={14}
                  snap="start"
                  ariaLabel="Other key decisions"
                >
                  {keyDecisions.slice(1).map((decision, i) => {
                    const meta = DECISION_META[i + 1] ?? DECISION_META[0];
                    const { Icon } = meta;
                    const imgSrc =
                      decision.image ??
                      (i === 0 ? "/Final Deep Navigation.png" :
                       i === 1 ? "/Final Collaboration.png" :
                       i === 2 ? "/Final Principles.png" :
                                 "/Final Design System.png");
                    return (
                      <div
                        key={i}
                        className="flex flex-col bg-white rounded-2xl overflow-hidden h-full"
                        style={{ border: "1px solid #ece8e6" }}
                      >
                        {/* Image area */}
                        <div className="relative h-[220px]">
                          <div className="absolute inset-5 bottom-3 overflow-hidden" style={{ borderRadius: "10px 10px 0 0" }}>
                            <img
                              src={imgSrc}
                              alt={decision.title}
                              className="w-full h-full object-contain object-bottom"
                              style={{ filter: "drop-shadow(0 -4px 14px rgba(0,0,0,0.08))" }}
                            />
                          </div>
                        </div>
                        {/* Text */}
                        <div className="p-6 flex flex-col gap-4 flex-1">
                          <div className="flex items-center gap-2">
                            <Icon size={15} style={{ color: "var(--terra-500)" }} strokeWidth={1.75} />
                            <span className="text-[10px] font-bold tracking-[0.1em] uppercase" style={{ color: "var(--terra-500)" }}>
                              {meta.category}
                            </span>
                          </div>
                          <h3
                            className="text-[17px] font-bold tracking-[-0.01em] text-stone-900 leading-[1.3]"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {decision.title}
                          </h3>
                          <p className="text-[13.5px] leading-[1.7]" style={{ color: "#78716c" }}>
                            {decision.description}
                          </p>
                          {decision.artefacts && decision.artefacts.length > 0 && (
                            <div className="flex flex-wrap gap-x-5 gap-y-2 mt-1 pt-4 border-t border-stone-100 text-[12px]">
                              {decision.artefacts.map((a, idx) => (
                                <ArtefactTag key={idx} delay={0.2 + idx * 0.15} index={idx}>{a}</ArtefactTag>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </MobileCarousel>
              </div>
            </div>
          </section>
        )}

        {/* Section divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e7e5e4, transparent)" }} />

        {/* ── IMPACT & OUTCOMES ─────────────────────────────────────────────── */}
        {impactItems && impactItems.length > 0 && (
          <section
            className="pt-16 lg:pt-32 pb-0"
            style={{ background: "radial-gradient(circle, rgba(0,0,0,0.036) 1px, transparent 1px) 0 0 / 26px 26px, #faf8f7" }}
          >
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

              {/* Heading */}
              <motion.div {...fadeUp(0)} className="mb-16">
                <SectionLabel>Impact &amp; Outcomes</SectionLabel>
                <h2
                  className="text-[30px] sm:text-[36px] font-bold tracking-[-0.02em] text-stone-900 max-w-[540px] leading-[1.15]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  What changed once the design shipped.
                </h2>
              </motion.div>

              {/* Outcome row — 2×2 grid on mobile (better visual rhythm
                  than a long vertical stack of 4 large bloom cards), then
                  flex row with animated vertical dividers on tablet+. */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:flex sm:flex-row sm:items-stretch sm:gap-0 mb-20">
                {impactItems.map((item, i) => {
                  const Icon = IMPACT_ICONS[i] ?? Sparkles;
                  return (
                    <React.Fragment key={i}>
                      {/* Animated vertical divider */}
                      {i > 0 && (
                        <div className="hidden sm:block relative flex-shrink-0 mx-10" style={{ width: 1 }}>
                          <motion.div
                            className="absolute top-0 left-0 w-full"
                            style={{ background: "#e7e3e0" }}
                            initial={{ height: 0 }}
                            whileInView={{ height: "100%" }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      )}

                      <motion.div
                        {...fadeUp(0.06 + i * 0.1)}
                        className="flex flex-col gap-5 sm:gap-8 flex-1 py-2"
                      >
                        {/* Bloom icon — smaller on mobile so it fits
                            comfortably in a half-width grid cell. */}
                        <motion.div
                          className="relative flex items-center justify-center w-[56px] h-[56px] sm:w-[80px] sm:h-[80px]"
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                        >
                          {/* Pulsing bloom */}
                          <motion.div
                            className="absolute inset-0 rounded-full"
                            style={{ background: "radial-gradient(circle, rgba(196,82,42,0.2) 0%, rgba(196,82,42,0.07) 48%, transparent 72%)" }}
                            animate={{ scale: [1, 1.18, 1], opacity: [1, 0.65, 1] }}
                            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}
                          />
                          <Icon size={32} style={{ color: "var(--terra-500)", position: "relative" }} strokeWidth={1.4} />
                        </motion.div>

                        <div className="flex flex-col gap-3">
                          <h3 className="text-[17px] font-bold text-stone-900 leading-snug">{item.title}</h3>
                          <p className="text-[13px] leading-[1.75]" style={{ color: "#78716c" }}>{item.detail}</p>
                        </div>

                      </motion.div>
                    </React.Fragment>
                  );
                })}
              </div>

            </div>

            <div className="pb-16 lg:pb-32" />
          </section>
        )}

        {/* Section divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e7e5e4, transparent)" }} />

        {/* ── PROJECT ASSETS ────────────────────────────────────────────────── */}
        {SHOW_WIP_SECTIONS && projectAssets && projectAssets.length > 0 && (
          <section className="py-16 lg:py-32" style={{ background: "#f7f4f1" }}>
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mb-12">
              <div className="flex items-end justify-between">
                {/* E1 — label + heading stagger first */}
                <motion.div {...fadeUp(0)}>
                  <SectionLabel>Project Assets</SectionLabel>
                  <h2
                    className="text-[30px] sm:text-[36px] font-bold tracking-[-0.02em] text-stone-900 leading-[1.15]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    Screens from the shipped product.
                  </h2>
                </motion.div>
                {/* E1 — counter + arrows stagger in after heading */}
                <motion.div {...fadeUp(0.18)} className="hidden sm:flex items-center gap-4 pb-1">
                  <span className="text-[13px] font-semibold tabular-nums" style={{ color: "var(--terra-500)" }}>
                    {String(assetIndex + 1).padStart(2, "0")}
                  </span>
                  <div className="w-20 h-[2px] rounded-full overflow-hidden" style={{ background: "#e2ddd9" }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: "var(--terra-500)" }}
                      animate={{ width: `${((assetIndex + 1) / projectAssets.length) * 100}%` }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className="text-[13px] tabular-nums" style={{ color: "#a8a29e" }}>
                    {String(projectAssets.length).padStart(2, "0")}
                  </span>
                  <div className="flex items-center gap-1 ml-2">
                    <button
                      onClick={() => setAssetIndex(i => Math.max(0, i - 1))}
                      disabled={assetIndex === 0}
                      className="p-1 transition-all"
                      style={{ color: assetIndex === 0 ? "#d4cdc9" : "#1c1917", cursor: assetIndex === 0 ? "default" : "pointer" }}
                    >
                      <ChevronLeft size={20} strokeWidth={1.75} />
                    </button>
                    <button
                      onClick={() => setAssetIndex(i => Math.min(projectAssets.length - 1, i + 1))}
                      disabled={assetIndex === projectAssets.length - 1}
                      className="p-1 transition-all"
                      style={{ color: assetIndex === projectAssets.length - 1 ? "#d4cdc9" : "#1c1917", cursor: assetIndex === projectAssets.length - 1 ? "default" : "pointer" }}
                    >
                      <ChevronRight size={20} strokeWidth={1.75} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Carousel — DESKTOP version (spring-driven chevron nav).
                Hidden on mobile because the chevron controls live in the
                hidden-sm header row, leaving mobile users with no way to
                navigate. */}
            <motion.div
              ref={carouselRef}
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="hidden lg:block overflow-hidden pl-6 lg:pl-10"
              style={{ maxWidth: "calc(1200px + 40px)", margin: "0 auto", paddingBottom: 60, marginBottom: -60 }}
            >
              {/* C1 — spring-physics track */}
              <motion.div
                className="flex gap-4 lg:gap-6"
                animate={{
                  x: (() => {
                    if (!slideWidth || !carouselWidth) return 0;
                    const lp = carouselWidth >= 1024 ? 40 : 24; // left padding (pl-10 / pl-6)
                    const gap = carouselWidth >= 1024 ? 24 : 16; // gap-6 / gap-4
                    const n = projectAssets.length;
                    if (assetIndex === n - 1 && n > 1) {
                      // Last slide: right-align so right edge sits at container right minus left padding
                      return -(lp + n * slideWidth + (n - 1) * gap - carouselWidth + lp);
                    }
                    return -(assetIndex * (slideWidth + gap));
                  })(),
                }}
                transition={{ type: "spring", stiffness: 300, damping: 34, mass: 0.85 }}
                style={{ willChange: "transform" }}
              >
                {projectAssets.map((asset, i) => (
                  // I1 — lift + scale + shadow bloom on active
                  <motion.img
                    key={i}
                    ref={i === 0 ? firstSlideRef : undefined}
                    src={asset.src}
                    alt={asset.caption ?? `Screen ${i + 1}`}
                    className="flex-shrink-0"
                    animate={{
                      scale: i === assetIndex ? 1.02 : 1,
                      y: i === assetIndex ? -6 : 0,
                      opacity: i === assetIndex ? 1 : 0.4,
                      filter: i === assetIndex
                        ? "drop-shadow(0 16px 44px rgba(100,75,50,0.18))"
                        : "drop-shadow(0 0px 0px rgba(0,0,0,0))",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    style={{ width: "86%", height: "auto", display: "block" }}
                  />
                ))}
              </motion.div>
            </motion.div>

            {/* MOBILE carousel — touch-native scroll-snap with pagination
                dots. Uses our reusable MobileCarousel and pipes the active
                index back into assetIndex so the caption stays in sync. */}
            <div className="lg:hidden">
              <MobileCarousel
                cardWidthPercent={86}
                gap={14}
                snap="center"
                ariaLabel="Project screens"
                onActiveChange={(i) => setAssetIndex(i)}
              >
                {projectAssets.map((asset, i) => (
                  <img
                    key={i}
                    src={asset.src}
                    alt={asset.caption ?? `Screen ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "auto",
                      display: "block",
                      borderRadius: 12,
                      filter: "drop-shadow(0 10px 28px rgba(100,75,50,0.14))",
                    }}
                  />
                ))}
              </MobileCarousel>
            </div>

            {/* Caption */}
            <div className="max-w-[1200px] mx-auto px-6 lg:px-10 mt-8">
              <motion.p
                key={assetIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="text-[15px] font-medium max-w-[560px]"
                style={{ color: "#57534e" }}
              >
                {projectAssets[assetIndex]?.caption}
              </motion.p>
            </div>
          </section>
        )}

        {SHOW_WIP_SECTIONS && (<>
        {/* Section divider */}
        <div style={{ height: "1px", background: "linear-gradient(to right, transparent, #e7e5e4, transparent)" }} />

        {/* ── DESIGNING FOR AI ──────────────────────────────────────────────── */}
        <section className="py-16 lg:py-36" style={{ background: "#1c1917" }}>
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

            <motion.div {...fadeUp(0)}>
              <SectionLabel light>Designing for AI</SectionLabel>
            </motion.div>

            {aiDesignNote && (
              <motion.p
                {...fadeUp(0.1)}
                className="text-[22px] sm:text-[28px] lg:text-[32px] font-medium leading-[1.48] max-w-[740px] mb-16"
                style={{ color: "rgba(255,255,255,0.86)", fontFamily: "var(--font-display)" }}
              >
                <span style={{ color: "var(--terra-400, #c4522a)" }}>"</span>
                {aiDesignNote}
                <span style={{ color: "var(--terra-400, #c4522a)" }}>"</span>
              </motion.p>
            )}

            <motion.div {...fadeIn(0.18)} className="mb-16">
              <AILayerIllustration />
            </motion.div>

            {/* Principles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Trust",     desc: "Interactions feel understandable and predictable" },
                { label: "Usability", desc: "HCI principles applied to AI-specific patterns" },
                { label: "Feedback",  desc: "System state is always transparent to the user" },
                { label: "Control",   desc: "Users retain meaningful agency over AI outputs" },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  {...fadeUp(0.22 + i * 0.06)}
                  className="rounded-xl p-5"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p className="text-[13px] font-semibold mb-2" style={{ color: "rgba(196,82,42,0.9)" }}>
                    {p.label}
                  </p>
                  <p className="text-[12px] leading-relaxed" style={{ color: "rgba(255,255,255,0.58)" }}>
                    {p.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── REFLECTION / CLOSE ────────────────────────────────────────────── */}
        <section
          className="py-16 lg:py-36"
          style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(196,82,42,0.04) 0%, transparent 52%), #faf8f7" }}
        >
          <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
            <div className="max-w-[720px] mx-auto text-center">

              <motion.div {...fadeUp(0)}>
                <SectionLabel>Reflection</SectionLabel>
              </motion.div>

              {reflection && (
                <motion.p
                  {...fadeUp(0.1)}
                  className="text-[20px] sm:text-[24px] lg:text-[26px] font-medium leading-[1.52] text-stone-900 mb-14"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  "{reflection}"
                </motion.p>
              )}

              {nextPhase && nextPhase.length > 0 && (
                <motion.div {...fadeUp(0.18)} className="mb-14">
                  <p
                    className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-5"
                    style={{ color: "#78716c" }}
                  >
                    Looking ahead
                  </p>
                  <div className="space-y-3">
                    {nextPhase.map((item, i) => (
                      <div key={i} className="flex items-center justify-center gap-3">
                        <ArrowRight size={12} style={{ color: "var(--terra-500)", flexShrink: 0 }} />
                        <span className="text-[14px]" style={{ color: "#78716c" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </div>
          </div>
        </section>
        </>)}

        {/* ── BACK TO ALL WORK — always visible ────────────────────────────── */}
        <div className="py-14 flex justify-center" style={{ background: "#faf8f7" }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-semibold tracking-wide transition-all duration-200 hover:opacity-80"
            style={{ background: "#1c1917", color: "white" }}
          >
            <ArrowLeft size={15} />
            Back to all work
          </Link>
        </div>

        <ContactSection />

        <div style={{ height: "64px", background: "#faf8f7" }} />

      </motion.div>
    </div>
  );
}
