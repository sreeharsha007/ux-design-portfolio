import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "motion/react";

/* ──────────────────────────────────────────────────────────────────────────
   ICEBERG — camera-driven scroll storytelling
   · Intro:   full iceberg from a distance, just the tip catches the eye
   · Middle:  the camera dives, focusing on one layer at a time
   · Finale:  pulls back to a complete view of the full iceberg
   · Content is inscribed on the ice, not stacked in cards
   ─────────────────────────────────────────────────────────────────────── */

// ═══ Geometry ═══════════════════════════════════════════════════════════════

const VB_W    = 800;
const VB_H    = 980;
const WATER_Y = 178;
const TIP_Y   = 8;

// Display size of the SVG inside the viewport (before camera scale)
const DISP_W  = 640;
const DISP_H  = 784;               // preserves VB aspect ratio (640 * 980/800)
const D_RATIO = DISP_H / VB_H;     // 0.8

// ─ Main iceberg outline ─ carefully hand-authored jagged/organic shape
//   Above water: narrow tapering peak with sharp facets
//   Below water: asymmetric expanding body with uneven edges
const ICEBERG_PATH = [
  // Top tip (right side going down)
  "M 398 8",
  "L 414 18 L 406 27 L 420 36 L 410 45 L 424 54",
  "L 416 65 L 432 72 L 422 85 L 438 94 L 428 106",
  "L 445 116 L 436 128 L 452 140 L 440 152 L 455 164",
  "L 444 178",                            // waterline on right
  // Below water — right side expanding with rough steps
  "L 476 198 L 468 222 L 496 248 L 486 274",
  "L 518 298 L 508 326 L 542 348 L 532 378",
  "L 568 398 L 558 428 L 596 450 L 586 480",
  "L 622 504 L 610 534 L 648 558 L 636 590",
  "L 672 614 L 660 644 L 698 668 L 684 698",
  "L 720 722 L 708 754 L 745 776 L 730 808",
  "L 764 830 L 748 860 L 778 886 L 762 914",
  "L 788 938 L 790 948",
  // Bottom edge — irregular wavy base
  "L 740 952 L 680 948 L 620 950 L 560 947",
  "L 500 952 L 440 949 L 400 952 L 360 948",
  "L 300 952 L 240 948 L 180 950 L 120 948",
  "L 60 950 L 10 948 L 12 938",
  // Below water — left side going up, mirror-ish but distinct
  "L 38 914 L 22 886 L 52 860 L 36 830",
  "L 70 808 L 55 776 L 92 754 L 80 722",
  "L 116 698 L 102 668 L 140 644 L 128 614",
  "L 164 590 L 152 558 L 190 534 L 178 504",
  "L 214 480 L 202 450 L 240 428 L 230 398",
  "L 262 378 L 252 348 L 286 326 L 276 298",
  "L 308 274 L 298 248 L 326 222 L 318 198",
  "L 354 178",                            // waterline on left
  // Top tip (left side going up back to start)
  "L 342 164 L 358 152 L 346 140 L 362 128 L 352 116",
  "L 369 106 L 358 94 L 374 85 L 362 72 L 378 65",
  "L 368 54 L 382 45 L 370 36 L 386 27 L 378 18",
  "Z",
].join(" ");

// ─ Internal fracture lines — give the ice crystalline texture
const FRACTURES = [
  "M 380 40 L 395 110 L 388 180",
  "M 435 130 L 420 210",
  "M 500 250 L 520 340 L 495 430",
  "M 320 260 L 305 360 L 330 470",
  "M 590 430 L 605 540 L 580 640",
  "M 210 440 L 225 560 L 200 660",
  "M 660 620 L 680 720 L 655 830",
  "M 145 640 L 165 740 L 140 850",
  "M 400 500 L 420 620 L 390 760 L 415 890",
  "M 290 700 L 310 820",
  "M 525 750 L 510 880",
];

// ─ Highlight ridges — bright edges facing the light
const HIGHLIGHTS = [
  "M 398 14 L 410 22 L 405 32 L 418 40",           // top tip edge
  "L 410 48 L 422 56 L 415 66 L 430 74",
  "M 454 162 L 445 176",                            // waterline edge right
  "M 348 176 L 358 164",                            // waterline edge left
];

// ═══ Layer data ═════════════════════════════════════════════════════════════

type Layer = {
  num: string;
  name: string;
  tagline: string;
  before: string;
  after: string;
  tools: string[];
  stat: string;
  statLabel: string;
  bandY: [number, number];
};

const LAYERS: Layer[] = [
  {
    num: "05", name: "Deliver",
    tagline: "Specs engineers ship from — not documents that gather dust.",
    before: "1–2 weeks", after: "2–3 days",
    tools: ["Claude", "Figma", "Notion AI"],
    stat: "50%", statLabel: "less handoff friction",
    bandY: [180, 310],
  },
  {
    num: "04", name: "Design",
    tagline: "High-fidelity, responsive, component-ready from day one.",
    before: "3–6 weeks", after: "1–2 weeks",
    tools: ["Figma AI", "v0", "Framer"],
    stat: "3×", statLabel: "faster iteration",
    bandY: [310, 460],
  },
  {
    num: "03", name: "Ideate",
    tagline: "The breadth of exploration most teams never have time for.",
    before: "1–2 weeks", after: "1–2 days",
    tools: ["Midjourney", "GPT-4", "Framer AI"],
    stat: "3×", statLabel: "more directions tested",
    bandY: [460, 610],
  },
  {
    num: "02", name: "Synthesise",
    tagline: "Raw research noise turned into a crisp, defensible brief.",
    before: "1–2 weeks", after: "4–8 hours",
    tools: ["Dovetail AI", "GPT-4", "Miro AI"],
    stat: "10×", statLabel: "faster synthesis",
    bandY: [610, 770],
  },
  {
    num: "01", name: "Discover",
    tagline: "The foundation everything else rests on.",
    before: "2–4 weeks", after: "3–5 days",
    tools: ["Claude", "Otter.ai", "Maze"],
    stat: "4×", statLabel: "more ground covered",
    bandY: [770, 950],
  },
];

const LAYER_CENTER_Y = LAYERS.map(l => (l.bandY[0] + l.bandY[1]) / 2);

// ═══ Camera math ════════════════════════════════════════════════════════════

// Given a scale S and a target SVG Y (point we want at viewport centre),
// compute the post-scale pixel translation required.
//   point's offset from display centre (pre-scale) = target*D_RATIO - DISP_H/2
//   after scaling → S * that
//   we want viewport centre (0), so translateY = -S * ( ... )
function camY(scale: number, targetSvgY: number) {
  return -scale * (targetSvgY * D_RATIO - DISP_H / 2);
}

// Phase timings (scrollYProgress 0–1)
const P = {
  introEnd:    0.07,
  focusIn:     0.11,
  d1: [0.11, 0.24] as [number, number],   // Deliver
  d2: [0.28, 0.41] as [number, number],   // Design
  d3: [0.44, 0.57] as [number, number],   // Ideate
  d4: [0.60, 0.73] as [number, number],   // Synthesise
  d5: [0.76, 0.88] as [number, number],   // Discover
  finale:      0.96,
};

// Scale track: overview → deep zoom → overview
const SCALE_KEYS = [0,     P.introEnd, P.focusIn, P.d5[1], 0.93, 1];
const SCALE_VALS = [0.86,  0.86,       2.0,       2.0,     1.0,  1.0];

// Y track: centre of iceberg → each layer centre → centre again
const Y_KEYS = [
  0, P.introEnd, P.focusIn,
  (P.d1[0]+P.d1[1])/2, P.d1[1], P.d2[0], (P.d2[0]+P.d2[1])/2, P.d2[1],
  P.d3[0], (P.d3[0]+P.d3[1])/2, P.d3[1], P.d4[0], (P.d4[0]+P.d4[1])/2,
  P.d4[1], P.d5[0], (P.d5[0]+P.d5[1])/2, P.d5[1],
  0.93, 1,
];
const Y_TARGETS = [
  VB_H/2, VB_H/2, LAYER_CENTER_Y[0],
  LAYER_CENTER_Y[0], LAYER_CENTER_Y[0], LAYER_CENTER_Y[1], LAYER_CENTER_Y[1], LAYER_CENTER_Y[1],
  LAYER_CENTER_Y[2], LAYER_CENTER_Y[2], LAYER_CENTER_Y[2], LAYER_CENTER_Y[3], LAYER_CENTER_Y[3],
  LAYER_CENTER_Y[3], LAYER_CENTER_Y[4], LAYER_CENTER_Y[4], LAYER_CENTER_Y[4],
  VB_H/2, VB_H/2,
];

// ═══ Shiny Star — sits at the tip, animated ═════════════════════════════════

function ShinyStar({ prog }: { prog: MotionValue<number> }) {
  const opacity = useTransform(prog, [0, 0.04], [0, 1], { clamp: true });
  const introScale = useTransform(prog, [0, 0.05], [0, 1], { clamp: true });

  return (
    <motion.g style={{ opacity }} transform={`translate(398 8)`}>
      {/* Outer glow */}
      <motion.circle
        r={26}
        fill="url(#star-glow)"
        style={{ scale: introScale }}
      />
      {/* Light rays (static) */}
      <g>
        {[0, 45, 90, 135].map(angle => (
          <line
            key={angle}
            x1={0} y1={-20} x2={0} y2={20}
            transform={`rotate(${angle})`}
            stroke="rgba(255,248,232,0.30)"
            strokeWidth={0.5}
            strokeLinecap="round"
          />
        ))}
      </g>
      {/* Four-point sparkle */}
      <motion.g style={{ scale: introScale, transformOrigin: "0px 0px" }}>
        <path
          d="M 0 -11 L 2 -2 L 11 0 L 2 2 L 0 11 L -2 2 L -11 0 L -2 -2 Z"
          fill="#fff9ea"
        />
        <circle r={2.2} fill="#ffffff" />
      </motion.g>
      {/* A few static specks */}
      {[
        { x: -18, y: -10 }, { x: 20, y: -6 },
        { x: -12, y: 12 }, { x: 16, y: 10 },
      ].map((s, i) => (
        <circle
          key={i}
          cx={s.x} cy={s.y} r={0.9}
          fill="rgba(255,245,220,0.75)"
        />
      ))}
    </motion.g>
  );
}

// ═══ Waterline with animated ripples ════════════════════════════════════════

function Waterline({ prog }: { prog: MotionValue<number> }) {
  const waveOpacity = useTransform(prog, [0, 0.04], [0, 1], { clamp: true });

  return (
    <g style={{ pointerEvents: "none" }}>
      <motion.g style={{ opacity: waveOpacity }}>
        {/* Subtle reflection band just below waterline */}
        <rect
          x={0} y={WATER_Y} width={VB_W} height={18}
          fill="url(#water-refl)"
        />
        {/* Static wave line — simpler, less CPU */}
        <path
          d={`M 0 ${WATER_Y} Q 100 ${WATER_Y-1.5} 200 ${WATER_Y} T 400 ${WATER_Y} T 600 ${WATER_Y} T 800 ${WATER_Y}`}
          stroke="rgba(132,168,196,0.55)"
          strokeWidth={0.7}
          fill="none"
        />
        <path
          d={`M 0 ${WATER_Y+6} Q 80 ${WATER_Y+4.5} 160 ${WATER_Y+6} T 320 ${WATER_Y+6} T 480 ${WATER_Y+6} T 640 ${WATER_Y+6} T 800 ${WATER_Y+6}`}
          stroke="rgba(132,168,196,0.28)"
          strokeWidth={0.5}
          fill="none"
        />
      </motion.g>
    </g>
  );
}

// ═══ Content plate per layer — rendered as HTML overlays in SVG coords ══════

function LayerLabel({
  layer, idx, prog, focus,
}: {
  layer: Layer;
  idx: number;
  prog: MotionValue<number>;
  focus: [number, number];
}) {
  // Phase name & number — always visible but dims when not focused
  const [fS, fE] = focus;
  const base = useTransform(
    prog,
    [0, P.focusIn - 0.02, P.focusIn, fS, (fS + fE) / 2, fE, fE + 0.06, 0.95, 1],
    [0.20, 0.20,           0.45,      0.55, 1.00,          0.55, 0.35,      0.35, 0.80],
    { clamp: true },
  );

  // Detail content — only during focus window
  const detail = useTransform(
    prog,
    [fS - 0.02, fS + 0.02, fE - 0.02, fE + 0.02],
    [0, 1, 1, 0],
    { clamp: true },
  );

  const detailY = useTransform(prog, [fS - 0.03, fS + 0.03], [18, 0], { clamp: true });

  const yStart = layer.bandY[0];
  const yEnd   = layer.bandY[1];
  const bandH  = yEnd - yStart;

  // Convert SVG coords → % of iceberg display container
  const topPct    = (yStart / VB_H) * 100;
  const heightPct = (bandH  / VB_H) * 100;

  return (
    <div
      style={{
        position: "absolute",
        left: 0, right: 0,
        top: `${topPct}%`,
        height: `${heightPct}%`,
        pointerEvents: "none",
      }}
    >
      {/* Phase name + number — left aligned, centered in band */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: idx % 2 === 0 ? "10%" : "14%",
          transform: "translateY(-50%)",
          opacity: base,
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
          <span
            style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.18em",
              color: "rgba(60,78,96,0.75)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {layer.num}
          </span>
          <span
            style={{
              fontSize: idx === 0 ? 16 : 18 + idx * 1.2,
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              color: "#1a2a38",
              letterSpacing: "-0.01em",
              lineHeight: 1,
            }}
          >
            {layer.name}
          </span>
        </div>
      </motion.div>

      {/* Detail content — tagline, tools, stat — appears when focused */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          right: "8%",
          transform: "translateY(-50%)",
          width: "50%",
          maxWidth: 380,
          opacity: detail,
          y: detailY,
          textAlign: "right",
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "#2c3e50",
            lineHeight: 1.45,
            marginBottom: 10,
            fontWeight: 500,
          }}
        >
          {layer.tagline}
        </p>

        {/* Before → After */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
          <span style={{ fontSize: 10, color: "#8a9aab", textDecoration: "line-through" }}>
            {layer.before}
          </span>
          <span style={{ fontSize: 10, color: "#8a9aab" }}>→</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--terra-500)", fontFamily: "var(--font-display)" }}>
            {layer.after}
          </span>
        </div>

        {/* Tools */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 5, marginBottom: 12, flexWrap: "wrap" }}>
          {layer.tools.map(t => (
            <span
              key={t}
              style={{
                fontSize: 8.5,
                padding: "2px 7px",
                borderRadius: 99,
                background: "rgba(255,255,255,0.55)",
                border: "1px solid rgba(60,78,96,0.18)",
                color: "#2c3e50",
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                backdropFilter: "blur(6px)",
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Stat */}
        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "baseline", gap: 6 }}>
          <span
            style={{
              fontSize: 30,
              fontWeight: 700,
              lineHeight: 1,
              color: "var(--terra-500)",
              fontFamily: "var(--font-display)",
              letterSpacing: "-0.02em",
            }}
          >
            {layer.stat}
          </span>
          <span style={{ fontSize: 9, color: "#8a9aab", letterSpacing: "0.05em" }}>
            {layer.statLabel}
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// ═══ Phase indicator (side rail) ═════════════════════════════════════════════

function PhaseRailItem({
  layer, focus, prog,
}: { layer: Layer; focus: [number, number]; prog: MotionValue<number> }) {
  const [fS, fE] = focus;
  const active = useTransform(prog, [fS - 0.01, fS, fE, fE + 0.01], [0, 1, 1, 0], { clamp: true });
  const dotScale = useTransform(active, [0, 1], [1, 1.8]);
  const textOpacity = useTransform(active, [0, 1], [0, 1]);
  const dotOpacity = useTransform(active, [0, 1], [0.35, 1]);
  const lineOpacity = useTransform(prog, [0, P.focusIn, fS, 0.95, 1], [0, 0.25, 0.6, 0.6, 0.15], { clamp: true });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, height: 10 }}>
      <motion.span
        style={{
          fontSize: 9, fontWeight: 700, letterSpacing: "0.14em",
          color: "#3c4e60", fontFamily: "var(--font-mono)",
          textTransform: "uppercase", opacity: textOpacity,
          whiteSpace: "nowrap",
        }}
      >
        {layer.num} · {layer.name}
      </motion.span>
      <motion.span style={{ width: 14, height: 1, background: "#3c4e60", opacity: lineOpacity, display: "block" }} />
      <motion.span
        style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "var(--terra-500)",
          scale: dotScale, opacity: dotOpacity, display: "block",
        }}
      />
    </div>
  );
}

function PhaseRail({ prog }: { prog: MotionValue<number> }) {
  const focusRanges: [number, number][] = [P.d1, P.d2, P.d3, P.d4, P.d5];
  return (
    <div
      style={{
        position: "absolute",
        right: 36, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 14,
        zIndex: 40,
      }}
    >
      {LAYERS.map((L, i) => (
        <PhaseRailItem key={L.name} layer={L} focus={focusRanges[i]} prog={prog} />
      ))}
    </div>
  );
}

// ═══ Scroll hint ═════════════════════════════════════════════════════════════

function ScrollHint({ prog }: { prog: MotionValue<number> }) {
  const opacity = useTransform(prog, [0, 0.04, 0.08], [1, 1, 0], { clamp: true });
  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: 40,
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        opacity,
        zIndex: 35,
        pointerEvents: "none",
      }}
    >
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "#8a9aab", textTransform: "uppercase" }}>
        Scroll to dive
      </span>
      <svg width={12} height={18} viewBox="0 0 12 18">
        <path d="M6 1v12M2 10l4 4 4-4" stroke="#8a9aab" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </svg>
    </motion.div>
  );
}

// ═══ Section header ══════════════════════════════════════════════════════════

function Header({ prog }: { prog: MotionValue<number> }) {
  // Header fades slightly when camera dives, stays subtle
  const opacity = useTransform(prog, [0, 0.04, P.focusIn, P.d5[1], 0.94, 1], [0, 1, 0.4, 0.4, 0.9, 0.9], { clamp: true });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 44,
        left: 0, right: 0,
        textAlign: "center",
        opacity,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "var(--terra-500)", textTransform: "uppercase", marginBottom: 8 }}>
        How I Work
      </p>
      <h2 style={{ fontSize: "clamp(1.5rem, 2.3vw, 2.1rem)", fontWeight: 700, fontFamily: "var(--font-display)", color: "#1c1917", lineHeight: 1.1, letterSpacing: "-0.02em", margin: 0 }}>
        What you receive is the surface.
      </h2>
      <p style={{ fontSize: 13, color: "#78716c", marginTop: 6, maxWidth: 380, marginLeft: "auto", marginRight: "auto", lineHeight: 1.5 }}>
        Scroll to see what every deliverable is built on.
      </p>
    </motion.div>
  );
}

// ═══ Main ═══════════════════════════════════════════════════════════════════

export default function IcebergSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const mY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const parallaxX = useTransform(mX, v => v * -5);
  const parallaxY = useTransform(mY, v => v * -3);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width  - 0.5) * 2);
    rawY.set(((e.clientY - r.top)  / r.height - 0.5) * 2);
  };

  // Camera transforms — single mapping of scrollYProgress to translateY (px)
  // Compute pre-baked Y values for each phase using camY helper
  const Y_PX = Y_KEYS.map((k, i) => {
    // Find scale at this key from SCALE_KEYS/VALS
    let s = SCALE_VALS[0];
    for (let j = 0; j < SCALE_KEYS.length - 1; j++) {
      if (k >= SCALE_KEYS[j] && k <= SCALE_KEYS[j + 1]) {
        const t = (k - SCALE_KEYS[j]) / (SCALE_KEYS[j + 1] - SCALE_KEYS[j]);
        s = SCALE_VALS[j] + (SCALE_VALS[j + 1] - SCALE_VALS[j]) * t;
        break;
      }
    }
    if (k >= SCALE_KEYS[SCALE_KEYS.length - 1]) s = SCALE_VALS[SCALE_VALS.length - 1];
    return camY(s, Y_TARGETS[i]);
  });

  const cameraScale = useTransform(scrollYProgress, SCALE_KEYS, SCALE_VALS, { clamp: true });
  const cameraY     = useTransform(scrollYProgress, Y_KEYS, Y_PX, { clamp: true });

  // Atmospheric depth glow intensity
  const glowIntensity = useTransform(scrollYProgress, [0, P.focusIn, P.d5[1], 1], [0, 0.5, 0.7, 0.3], { clamp: true });

  // Progress bar
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Vignette intensity
  const vignetteOp = useTransform(scrollYProgress, [0, P.focusIn, P.d5[1], 1], [0.08, 0.35, 0.45, 0.12], { clamp: true });

  // Tip / base label opacities
  const tipLabelOp  = useTransform(scrollYProgress, [0, 0.03, P.focusIn, 0.94, 1], [0, 0, 0, 0.7, 0.9], { clamp: true });
  const baseLabelOp = useTransform(scrollYProgress, [0, 0.03, P.focusIn, 0.94, 1], [0, 0, 0, 0.7, 0.9], { clamp: true });

  return (
    <>
      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="how-i-work"
        className="relative hidden lg:block"
        style={{ minHeight: "720vh", background: "#f8f7f5" }}
      >
        {/* top divider */}
        <div style={{ height: 1, background: "linear-gradient(to right, transparent, #e7e5e4, transparent)" }} />

        {/* Sticky stage */}
        <div
          className="sticky top-0 overflow-hidden"
          style={{ height: "100vh" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
        >
          {/* Background atmosphere */}
          <div
            className="absolute inset-0"
            style={{
              background: "radial-gradient(ellipse 90% 80% at 50% 30%, #fbf8f3 0%, #eae4dc 55%, #c9c0b3 100%)",
            }}
          />
          {/* Depth glow (warms as we dive) */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 50% 40% at 50% 60%, rgba(196,82,42,0.14), transparent 70%)",
              opacity: glowIntensity,
            }}
          />
          {/* Vignette */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 40%, rgba(20,24,32,0.55) 100%)",
              opacity: vignetteOp,
            }}
          />

          {/* Header */}
          <Header prog={scrollYProgress} />

          {/* Phase rail */}
          <PhaseRail prog={scrollYProgress} />

          {/* Progress rail (thin left side) */}
          <div
            className="absolute z-40"
            style={{ left: 36, top: "22%", bottom: "22%", width: 1, background: "rgba(60,78,96,0.10)" }}
          >
            <motion.div
              style={{ width: "100%", height: railFill, background: "var(--terra-500)", opacity: 0.55 }}
            />
          </div>

          {/* Iceberg stage — camera transforms applied here */}
          <motion.div
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              width: DISP_W,
              height: DISP_H,
              marginLeft: -DISP_W / 2,
              marginTop: -DISP_H / 2,
              scale: cameraScale,
              y: cameraY,
              x: parallaxX,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            {/* ─ SVG iceberg ─ */}
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              style={{ position: "absolute", inset: 0, overflow: "visible" }}
            >
              <defs>
                {/* Main iceberg fill — blue-white ice gradient */}
                <linearGradient id="ice-fill" x1="0.2" y1="0" x2="0.8" y2="1">
                  <stop offset="0" stopColor="#f4f6f8" />
                  <stop offset="0.18" stopColor="#dfe6ec" />
                  <stop offset="0.42" stopColor="#a8b9c9" />
                  <stop offset="0.72" stopColor="#5f758c" />
                  <stop offset="1" stopColor="#2a3a4c" />
                </linearGradient>

                {/* Warm glow at the tip — polished product */}
                <linearGradient id="tip-warmth" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(248,220,190,0.9)" />
                  <stop offset="0.35" stopColor="rgba(238,190,150,0.45)" />
                  <stop offset="1" stopColor="rgba(238,190,150,0)" />
                </linearGradient>

                {/* Shadow side overlay */}
                <linearGradient id="ice-shadow" x1="0" y1="0" x2="1" y2="0.3">
                  <stop offset="0" stopColor="rgba(0,0,0,0)" />
                  <stop offset="0.5" stopColor="rgba(0,0,0,0)" />
                  <stop offset="1" stopColor="rgba(20,30,45,0.35)" />
                </linearGradient>

                {/* Underwater shading */}
                <linearGradient id="underwater" x1="0" y1={`${WATER_Y/VB_H}`} x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(30,45,65,0)" />
                  <stop offset="0.3" stopColor="rgba(30,45,65,0.10)" />
                  <stop offset="1" stopColor="rgba(15,22,32,0.35)" />
                </linearGradient>

                {/* Star glow */}
                <radialGradient id="star-glow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="rgba(255,245,220,0.55)" />
                  <stop offset="0.4" stopColor="rgba(255,210,165,0.22)" />
                  <stop offset="1" stopColor="rgba(255,210,165,0)" />
                </radialGradient>

                {/* Waterline reflection */}
                <linearGradient id="water-refl" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(132,168,196,0.25)" />
                  <stop offset="1" stopColor="rgba(132,168,196,0)" />
                </linearGradient>

                {/* Clip to iceberg — for layering internal effects only within the shape */}
                <clipPath id="ice-clip">
                  <path d={ICEBERG_PATH} />
                </clipPath>
              </defs>

              {/* Soft shadow under the iceberg (in water) */}
              <ellipse
                cx={400} cy={942} rx={360} ry={10}
                fill="rgba(20,30,45,0.18)"
              />

              {/* Iceberg base fill */}
              <path d={ICEBERG_PATH} fill="url(#ice-fill)" />

              {/* Underwater deepening overlay (clipped to iceberg) */}
              <g clipPath="url(#ice-clip)">
                <rect x={0} y={WATER_Y} width={VB_W} height={VB_H - WATER_Y} fill="url(#underwater)" />
                {/* Warm tip glow (polished product radiance) */}
                <rect x={280} y={0} width={240} height={200} fill="url(#tip-warmth)" />
                {/* Side shadow (light from upper-left) */}
                <rect x={0} y={0} width={VB_W} height={VB_H} fill="url(#ice-shadow)" />

                {/* Fracture lines — internal cracks */}
                {FRACTURES.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    stroke="rgba(240,245,252,0.35)"
                    strokeWidth={0.6}
                    fill="none"
                    strokeLinecap="round"
                  />
                ))}

                {/* Highlight ridges */}
                {HIGHLIGHTS.map((d, i) => (
                  <path
                    key={i}
                    d={d}
                    stroke="rgba(255,255,255,0.55)"
                    strokeWidth={0.8}
                    fill="none"
                    strokeLinecap="round"
                  />
                ))}

                {/* Subtle layer band demarcations — very soft horizontal tints */}
                {LAYERS.map((L, i) => (
                  <rect
                    key={i}
                    x={0} y={L.bandY[0]} width={VB_W} height={L.bandY[1] - L.bandY[0]}
                    fill={i % 2 === 0 ? "rgba(20,32,46,0.025)" : "rgba(255,255,255,0.02)"}
                  />
                ))}
              </g>

              {/* Iceberg outer edge — fine highlight */}
              <path
                d={ICEBERG_PATH}
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={0.8}
                strokeLinejoin="round"
              />

              {/* Waterline layer — rendered on top of iceberg */}
              <Waterline prog={scrollYProgress} />

              {/* Shiny star at the tip */}
              <ShinyStar prog={scrollYProgress} />
            </svg>

            {/* HTML layer labels — positioned in the same coordinate space */}
            {LAYERS.map((L, i) => {
              const focusRanges: [number, number][] = [P.d1, P.d2, P.d3, P.d4, P.d5];
              return (
                <LayerLabel
                  key={L.name}
                  layer={L}
                  idx={i}
                  prog={scrollYProgress}
                  focus={focusRanges[i]}
                />
              );
            })}

            {/* "Polished product" label at the tip */}
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: `${(30 / VB_H) * 100}%`,
                transform: "translate(-50%, -100%)",
                whiteSpace: "nowrap",
                opacity: tipLabelOp,
              }}
            >
              <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.25em", color: "var(--terra-500)", textTransform: "uppercase" }}>
                The polished product
              </span>
            </motion.div>

            {/* Below-water label at the base */}
            <motion.div
              style={{
                position: "absolute",
                left: "50%",
                top: `${(962 / VB_H) * 100}%`,
                transform: "translate(-50%, 0)",
                whiteSpace: "nowrap",
                opacity: baseLabelOp,
              }}
            >
              <span style={{ fontSize: 7.5, fontWeight: 700, letterSpacing: "0.25em", color: "#3c4e60", textTransform: "uppercase" }}>
                The depth of the process
              </span>
            </motion.div>
          </motion.div>

          {/* Scroll hint */}
          <ScrollHint prog={scrollYProgress} />
        </div>
      </section>

      {/* ── MOBILE — simple stacked fallback ──────────────────────────── */}
      <section
        className="lg:hidden py-20 px-5"
        style={{
          background: "#f8f7f5",
          borderTop: "1px solid #e7e5e4",
        }}
      >
        <div className="text-center mb-12">
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.18em", color: "var(--terra-500)", textTransform: "uppercase", marginBottom: 10 }}>
            How I Work
          </p>
          <h2 style={{ fontSize: "1.8rem", fontWeight: 700, fontFamily: "var(--font-display)", color: "#1c1917", lineHeight: 1.15, letterSpacing: "-0.02em", marginBottom: 10 }}>
            What you receive is the surface.
          </h2>
          <p style={{ fontSize: 13, color: "#78716c", lineHeight: 1.5 }}>
            Every deliverable rests on a depth of process most designers never reach.
          </p>
        </div>

        <div style={{ position: "relative", paddingLeft: 22 }}>
          {/* Vertical thread */}
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 6,
              bottom: 6,
              width: 1,
              background: "linear-gradient(to bottom, rgba(196,82,42,0.1), rgba(60,78,96,0.4))",
            }}
          />
          {LAYERS.map((L, i) => (
            <motion.div
              key={L.name}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              style={{ marginBottom: 28, position: "relative" }}
            >
              {/* dot */}
              <div
                style={{
                  position: "absolute",
                  left: -19,
                  top: 4,
                  width: 9, height: 9, borderRadius: "50%",
                  background: "var(--terra-500)",
                  boxShadow: "0 0 0 4px rgba(196,82,42,0.12)",
                }}
              />
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", color: "rgba(60,78,96,0.6)", fontFamily: "var(--font-mono)" }}>{L.num}</span>
                <span style={{ fontSize: 17, fontWeight: 700, fontFamily: "var(--font-display)", color: "#1a2a38", letterSpacing: "-0.01em" }}>{L.name}</span>
              </div>
              <p style={{ fontSize: 12.5, color: "#4a5664", lineHeight: 1.5, marginBottom: 8 }}>{L.tagline}</p>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 8 }}>
                <span style={{ fontSize: 10, color: "#8a9aab", textDecoration: "line-through" }}>{L.before}</span>
                <span style={{ fontSize: 10, color: "#8a9aab" }}>→</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--terra-500)", fontFamily: "var(--font-display)" }}>{L.after}</span>
                <span style={{ marginLeft: 12, fontSize: 18, fontWeight: 700, color: "var(--terra-500)", fontFamily: "var(--font-display)" }}>{L.stat}</span>
                <span style={{ fontSize: 9, color: "#8a9aab" }}>{L.statLabel}</span>
              </div>
              <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                {L.tools.map(t => (
                  <span
                    key={t}
                    style={{
                      fontSize: 9,
                      padding: "2px 7px",
                      borderRadius: 99,
                      background: "rgba(60,78,96,0.07)",
                      border: "1px solid rgba(60,78,96,0.14)",
                      color: "#2c3e50",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 500,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
