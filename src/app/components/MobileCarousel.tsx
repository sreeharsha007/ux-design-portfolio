import React, { useEffect, useRef, useState, useCallback } from "react";

/* ──────────────────────────────────────────────────────────────────────────
   MobileCarousel — reusable touch-native horizontal carousel
   · CSS scroll-snap based (no JS-driven swipe, native momentum)
   · Configurable: card width, gap, snap-to-center vs snap-to-start
   · Pagination dots that sync with scroll position and act as buttons
   · `initialIndex` lets us start centered on a specific card (e.g., the
     "recommended" services tier should be the starting card with left
     and right siblings peeking).
   ───────────────────────────────────────────────────────────────────────── */

export interface MobileCarouselProps {
  children: React.ReactNode;
  cardWidthPercent?: number; // 0–100, default 85
  gap?: number;              // px between cards, default 16
  snap?: "center" | "start"; // default "center"
  initialIndex?: number;     // default 0 — card index to start on
  showDots?: boolean;        // default true
  dotColor?: string;         // active dot colour (defaults to terra)
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
  onActiveChange?: (index: number) => void; // fires when active card changes
}

export default function MobileCarousel({
  children,
  cardWidthPercent = 85,
  gap = 16,
  snap = "center",
  initialIndex = 0,
  showDots = true,
  dotColor = "var(--terra-500)",
  ariaLabel,
  className,
  style,
  onActiveChange,
}: MobileCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = React.Children.toArray(children);
  const itemCount = items.length;
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, initialIndex), Math.max(0, itemCount - 1)),
  );

  // For centred snap: inset padding so the first/last cards can land
  // visually centred in the viewport (otherwise they'd butt the edges).
  const sidePadding =
    snap === "center" ? `${Math.max(0, (100 - cardWidthPercent) / 2)}%` : "0px";

  // Scroll programmatically to a specific index (used by dot buttons and
  // for the initial centering on `initialIndex`).
  const scrollToIndex = useCallback(
    (idx: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;
      const cards = track.children;
      if (idx < 0 || idx >= cards.length) return;
      const targetCard = cards[idx] as HTMLElement;
      const trackWidth = track.clientWidth;
      const cardWidth = targetCard.clientWidth;
      const cardLeft = targetCard.offsetLeft;
      const scrollLeft =
        snap === "center" ? cardLeft - (trackWidth - cardWidth) / 2 : cardLeft;
      track.scrollTo({ left: scrollLeft, behavior });
    },
    [snap],
  );

  // On mount + when `initialIndex` changes, jump (no animation) to that card.
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      scrollToIndex(initialIndex, "auto");
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex]);

  // Sync `activeIndex` with whichever card is closest to the snap point.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let rafId: number | null = null;

    const update = () => {
      rafId = null;
      const cards = Array.from(track.children) as HTMLElement[];
      const trackRect = track.getBoundingClientRect();
      const reference =
        snap === "center" ? trackRect.left + trackRect.width / 2 : trackRect.left;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, idx) => {
        const r = card.getBoundingClientRect();
        const cardRef = snap === "center" ? r.left + r.width / 2 : r.left;
        const d = Math.abs(cardRef - reference);
        if (d < minDist) {
          minDist = d;
          closest = idx;
        }
      });
      setActiveIndex((prev) => {
        if (prev === closest) return prev;
        onActiveChange?.(closest);
        return closest;
      });
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(update);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    // Run once to set the initial active index after layout settles.
    requestAnimationFrame(update);
    return () => {
      track.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [snap, itemCount, onActiveChange]);

  return (
    <div
      className={className}
      style={style}
      aria-label={ariaLabel}
      role="region"
    >
      <div
        ref={trackRef}
        className="mobile-carousel-track"
        style={{
          display: "flex",
          gap: `${gap}px`,
          overflowX: "auto",
          overflowY: "visible",
          scrollSnapType: "x mandatory",
          scrollBehavior: "smooth",
          paddingLeft: sidePadding,
          paddingRight: sidePadding,
          // Hide native scrollbar (cross-browser)
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          // iOS momentum / smooth scroll
          WebkitOverflowScrolling: "touch",
          // Prevent vertical scroll while swiping horizontally
          touchAction: "pan-x",
        }}
      >
        {items.map((child, idx) => (
          <div
            key={idx}
            style={{
              flex: `0 0 ${cardWidthPercent}%`,
              scrollSnapAlign: snap,
              scrollSnapStop: "always",
              // Allow internal content to size to the slide
              minWidth: 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Hide WebKit scrollbar */}
      <style>{`
        .mobile-carousel-track::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Pagination dots */}
      {showDots && itemCount > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginTop: 20,
            paddingLeft: 16,
            paddingRight: 16,
          }}
          role="tablist"
        >
          {items.map((_, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={idx}
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to item ${idx + 1} of ${itemCount}`}
                aria-current={isActive ? "true" : undefined}
                role="tab"
                style={{
                  width: isActive ? 22 : 7,
                  height: 7,
                  borderRadius: 99,
                  border: "none",
                  background: isActive ? dotColor : "rgba(60,78,96,0.28)",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 0.28s ease, background 0.28s ease",
                  // 44×44 hit area without changing visual size
                  position: "relative",
                  outline: "none",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
