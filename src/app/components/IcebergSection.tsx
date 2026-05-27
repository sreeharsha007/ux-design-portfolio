import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
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

// ─ Main iceberg silhouette — traced from the reference image ─────────────
//   Diamond/kite massing — both tips converge to single sharp points.
//   • Sharp single apex at top (jagged facets funnel inward to one point)
//   • Dramatic horizontal "ear" protrusions at the waterline (widest)
//   • Sharp inward step back into body just below the ears
//   • Body tapers down with mostly straight-ish jagged edges
//   • Sharp single apex at bottom (taper converges to one point)
//   • Subtle asymmetry — right ear slightly broader, left side slightly straighter
const ICEBERG_PATH = [
  // ── MAIN TOP APEX — single sharp point at viewBox centre ─────────────
  "M 408 4",

  // ── TOP CROWN — right side jagged descent, funneling outward ─────────
  // Facets get progressively wider as we descend; near the apex the
  // points stay tight to the centreline so the tip reads as a sharp peak.
  "L 416 18 L 410 28 L 422 32",                       // tight tip facets
  "L 416 44 L 432 50",                                 // small jag
  "L 426 64 L 446 70",                                 // jag widening out
  "L 438 84 L 462 92",                                 // jag
  "L 454 108 L 480 116",                               // jag — getting wider
  "L 472 132 L 498 142",                               // jag
  "L 490 158 L 514 168",                               // jag
  "L 506 178",                                         // arrives at waterline (right of crown)

  // ── RIGHT EAR — slanted natural wedge ────────────────────────────────
  // Top edge starts ON the waterline and slopes gently DOWN to the
  // outermost tip; bottom edge slants back UP into the body.
  "L 548 182 L 590 186 L 632 190 L 672 192",           // top edge slants DOWN from waterline
  "L 728 196",                                         // outermost right tip (slightly below waterline)
  "L 696 212 L 660 214 L 624 216 L 596 218",           // bottom edge slants BACK UP toward body
  "L 588 232",                                         // small step inward into body (ledge)
  "L 596 252",                                         // body width — start descending

  // ── RIGHT EDGE — gradual taper with jagged irregularity ──────────────
  "L 612 290 L 596 328",
  "L 610 366 L 588 406",
  "L 604 444 L 580 484",
  "L 590 524 L 564 562",
  "L 572 600 L 544 640",
  "L 548 680 L 520 718",
  "L 524 758 L 496 796",
  "L 488 832 L 462 868",
  "L 448 898",                                        // approaching base apex

  // ── BOTTOM APEX — funnels inward to a single sharp point ─────────────
  "L 432 916 L 422 924",                              // tight base facets, right side
  "L 414 936 L 406 948",                              // sharp point
  "L 408 960",                                        // BOTTOM APEX (single point)
  "L 396 948 L 388 938",                              // tight base facets, left side
  "L 378 924 L 370 916",
  "L 358 900",                                        // departing base apex

  // ── LEFT EDGE — gradual taper up with jagged irregularity ────────────
  "L 348 870 L 332 836",
  "L 348 798 L 322 760",
  "L 336 722 L 312 684",
  "L 322 646 L 296 608",
  "L 308 570 L 282 532",
  "L 294 494 L 268 456",
  "L 282 418 L 256 380",
  "L 268 342 L 242 304",
  "L 254 264",                                        // approaching shoulder area

  // ── LEFT EAR — slanted natural wedge (mirrors right ear) ─────────────
  // Bottom edge slants OUT and slightly DOWN to the outermost tip;
  // top edge slants UP to meet the waterline at the crown.
  "L 220 232",                                         // small step outward from body (ledge)
  "L 192 218 L 156 216 L 120 214",                     // bottom edge slants outward
  "L 82 196",                                          // outermost left tip (slightly below waterline)
  "L 116 192 L 152 188 L 190 184 L 228 180",           // top edge slants UP to waterline
  "L 264 178 L 282 178",                               // arrives at waterline (left of crown)

  // ── TOP CROWN — left side jagged ascent, funneling inward to apex ────
  "L 294 162 L 286 142 L 308 134",                    // jag at base of crown
  "L 296 122 L 320 112",                               // jag
  "L 312 96 L 332 86",                                 // jag
  "L 326 70 L 346 62",                                 // jag — narrowing
  "L 340 48 L 360 40",                                 // jag — narrowing
  "L 356 28 L 374 22",                                 // jag — narrowing further
  "L 370 14 L 392 12",                                 // tight tip facets approaching apex
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
// Story: teaser → descent to bottom → bottom-to-top ascent → tip → final reveal.
// LAYERS array order is top→bottom (index 0 = Deliver, 4 = Discover), but the
// scroll story visits bottom first and ascends.
const P = {
  teaserEnd:    0.05,                                  // hold tip+waterline frame
  descentEnd:   0.11,                                  // arrived at the bottom
  d_discover:   [0.11, 0.21] as [number, number],      // LAYERS[4]
  d_synthesise: [0.24, 0.34] as [number, number],      // LAYERS[3]
  d_ideate:     [0.37, 0.47] as [number, number],      // LAYERS[2]
  d_design:     [0.50, 0.60] as [number, number],      // LAYERS[1]
  d_deliver:    [0.63, 0.73] as [number, number],      // LAYERS[0]
  tipReveal:    [0.78, 0.88] as [number, number],
  finalReveal:  0.94,
};

// Teaser framing: zoom into top of iceberg so tip + waterline are centred,
// the deeper iceberg falls naturally below the viewport (tiny hint).
const TEASER_Y      = 95;      // SVG y at viewport centre during teaser
                                // (lower than waterline so the apex/flag sits
                                //  with breathing room below the heading)
const TEASER_SCALE  = 2.05;
const FOCUS_SCALE   = 2.1;     // active layer zoom — Variation A: iceberg
                                // shifts left during this phase so we can push
                                // the zoom a bit higher; layer band ≈ 28% of
                                // viewport height with ~100px gap to column
const TIP_SCALE     = 2.55;
const TIP_TARGET_Y  = 70;      // centre on the polished tip
const FINAL_SCALE   = 0.70;    // pulled back full reveal — sized to leave
                                // ~100px breathing room ABOVE (matches teaser
                                // gap from section title to apex) AND ~100px
                                // breathing room BELOW (between bottom apex
                                // and the end of the section)
const FINAL_TARGET_Y = 334;    // SVG y at viewport centre during final reveal —
                                // pulls the iceberg slightly higher so the
                                // bottom apex doesn't crowd the section edge

// Scale track
const SCALE_KEYS = [
  0,             P.teaserEnd,    P.descentEnd,
  P.d_discover[1], P.d_synthesise[1], P.d_ideate[1], P.d_design[1], P.d_deliver[1],
  P.tipReveal[0], P.tipReveal[1],
  P.finalReveal, 1,
];
const SCALE_VALS = [
  TEASER_SCALE,  TEASER_SCALE,   FOCUS_SCALE,
  FOCUS_SCALE,   FOCUS_SCALE,    FOCUS_SCALE,   FOCUS_SCALE,   FOCUS_SCALE,
  TIP_SCALE,     TIP_SCALE,
  FINAL_SCALE,   FINAL_SCALE,
];

// Y track: teaser frame → bottom layer → ascend chapter by chapter → tip → centre
const Y_KEYS = [
  0,             P.teaserEnd,    P.descentEnd,
  (P.d_discover[0]   + P.d_discover[1])   / 2, P.d_discover[1],
  (P.d_synthesise[0] + P.d_synthesise[1]) / 2, P.d_synthesise[1],
  (P.d_ideate[0]     + P.d_ideate[1])     / 2, P.d_ideate[1],
  (P.d_design[0]     + P.d_design[1])     / 2, P.d_design[1],
  (P.d_deliver[0]    + P.d_deliver[1])    / 2, P.d_deliver[1],
  P.tipReveal[0], P.tipReveal[1],
  P.finalReveal, 1,
];
const Y_TARGETS = [
  TEASER_Y,            TEASER_Y,            LAYER_CENTER_Y[4],
  LAYER_CENTER_Y[4],   LAYER_CENTER_Y[4],
  LAYER_CENTER_Y[3],   LAYER_CENTER_Y[3],
  LAYER_CENTER_Y[2],   LAYER_CENTER_Y[2],
  LAYER_CENTER_Y[1],   LAYER_CENTER_Y[1],
  LAYER_CENTER_Y[0],   LAYER_CENTER_Y[0],
  TIP_TARGET_Y,        TIP_TARGET_Y,
  FINAL_TARGET_Y,      FINAL_TARGET_Y,
];

// Map LAYERS[i] (top→bottom in SVG) to its scroll focus range.
const LAYER_FOCUS: [number, number][] = [
  P.d_deliver,    // LAYERS[0] = Deliver (top hidden layer)
  P.d_design,
  P.d_ideate,
  P.d_synthesise,
  P.d_discover,   // LAYERS[4] = Discover (bottom)
];

// ═══ Shiny Star — sits at the tip, animated ═════════════════════════════════

// ═══ Summit Flag — symbol of the polished outcome at the apex ═════════════
function SummitFlag({ prog }: { prog: MotionValue<number> }) {
  // Visible from the start of the teaser; fades while we dive below the
  // surface, returns at tip-reveal and final reveal — a quiet brand cue.
  const opacity = useTransform(
    prog,
    [0, P.teaserEnd, P.descentEnd, P.tipReveal[0], P.tipReveal[1], P.finalReveal, 1],
    [1,  1,           0,             0,              1,              1,             1],
    { clamp: true },
  );

  // Three keyframe cloth shapes representing a wave traveling from the pole
  // (left) toward the trailing edge (right). Top + bottom edge curves shift
  // y-positions so the cloth ripples like real fabric in the wind.
  // Path order: M(top-pole) → top edge curve → trailing edge → bottom edge curve → Z
  const cloth1 = "M 0.8 -33.6 Q 6 -35.4 12 -33.4 T 22 -33 Q 22.6 -28.5 22.4 -23 Q 14 -22 8 -23 T 0.8 -22.6 Z";
  const cloth2 = "M 0.8 -33.6 Q 6 -32.4 12 -34.6 T 22.6 -33.8 Q 23.2 -28.5 22 -22.4 Q 14 -23.6 8 -21.6 T 0.8 -22.6 Z";
  const cloth3 = "M 0.8 -33.6 Q 6 -33 11.6 -32.6 T 22 -35.4 Q 23.4 -28.5 23 -22.4 Q 14 -22 8.4 -22.6 T 0.8 -22.6 Z";
  const animValues = `${cloth1};${cloth2};${cloth3};${cloth2};${cloth1}`;

  return (
    <motion.g style={{ opacity }} transform={`translate(408 4)`}>
      <style>{`
        @keyframes flag-glint {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 0.85; }
        }
        @media (prefers-reduced-motion: reduce) {
          .flag-glint { animation: none !important; }
        }
        .flag-glint { animation: flag-glint 4.2s ease-in-out infinite; }
      `}</style>

      {/* Soft warm glow behind the flag — anchors the pole to the apex */}
      <circle r={18} fill="url(#flag-glow)" className="flag-glint" />

      {/* Pole — hand-drawn line with a very subtle organic curve */}
      <path
        d="M 0 0 Q -0.4 -10 0 -20 Q 0.4 -28 0 -34"
        stroke="#2a3a4c"
        strokeWidth={1}
        strokeLinecap="round"
        fill="none"
      />

      {/* Pole finial — small irregular triangular nub (hand-drawn feel) */}
      <path
        d="M -1.5 -33.6 L 0 -36 L 1.5 -33.6 Z"
        fill="#2a3a4c"
      />

      {/* Cloth pennant — animated path morphing creates a real wave
          traveling from pole to trailing edge */}
      <path
        d={cloth1}
        fill="var(--terra-500)"
        stroke="#7a3417"
        strokeWidth={0.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <animate
          attributeName="d"
          values={animValues}
          dur="4.8s"
          repeatCount="indefinite"
          calcMode="spline"
          keyTimes="0;0.25;0.5;0.75;1"
          keySplines="0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1;0.4 0 0.6 1"
        />
      </path>

      {/* Subtle inner shading along the leading edge — depth cue, no animation */}
      <path
        d="M 1 -33.4 L 5 -32.6 L 5 -23 L 1 -22.6 Z"
        fill="rgba(0,0,0,0.18)"
        pointerEvents="none"
      />

      <defs>
        <radialGradient id="flag-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="rgba(255,232,210,0.55)" />
          <stop offset="0.55" stopColor="rgba(248,210,180,0.18)" />
          <stop offset="1" stopColor="rgba(248,210,180,0)" />
        </radialGradient>
      </defs>
    </motion.g>
  );
}

// ═══ Waterline with animated ripples ════════════════════════════════════════

function Waterline(_: { prog: MotionValue<number> }) {
  // Build wave paths that extend FAR beyond the iceberg viewBox so the
  // waterline visually spans the full page width at any camera scale.
  // SVG has overflow: visible, so points outside [0..800] still render.
  const buildWave = (y: number, period: number, amp: number) => {
    const xs: number[] = [];
    for (let x = -2400; x <= 3200; x += period) xs.push(x);
    let d = `M ${xs[0]} ${y} Q ${xs[0] + period / 2} ${y - amp} ${xs[1]} ${y}`;
    for (let i = 2; i < xs.length; i++) d += ` T ${xs[i]} ${y}`;
    return d;
  };

  return (
    <g style={{ pointerEvents: "none" }}>
      {/* Four independent ocean wave layers — taller, faster, more visible:
          • A fine choppy ripple skitters across the very top
          • Three main wave layers with pronounced crests and troughs
          • Counter-currents and offset periods avoid mechanical sync
          Each horizontal translation = one wavelength → seamless loop. */}
      <style>{`
        /* Horizontal flow — faster, more noticeable drift */
        @keyframes ice-flow-a { from { transform: translateX(0); } to { transform: translateX(-200px); } }
        @keyframes ice-flow-b { from { transform: translateX(0); } to { transform: translateX(160px); } }
        @keyframes ice-flow-c { from { transform: translateX(0); } to { transform: translateX(-240px); } }
        @keyframes ice-flow-r { from { transform: translateX(0); } to { transform: translateX(140px); } }
        /* Vertical bob — taller rise and fall (ocean swell feel) */
        @keyframes ice-bob-a {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-4.5px); }
        }
        @keyframes ice-bob-b {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(3.8px); }
        }
        @keyframes ice-bob-c {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-2.6px); }
        }
        @keyframes ice-bob-r {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-1.5px); }
        }
        @keyframes ice-shimmer {
          0%, 100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .ice-flow-a, .ice-flow-b, .ice-flow-c, .ice-flow-r,
          .ice-bob-a, .ice-bob-b, .ice-bob-c, .ice-bob-r, .ice-shimmer { animation: none !important; }
        }
        .ice-flow-a  { animation: ice-flow-a 9s linear infinite;  will-change: transform; }
        .ice-flow-b  { animation: ice-flow-b 12s linear infinite; will-change: transform; }
        .ice-flow-c  { animation: ice-flow-c 16s linear infinite; will-change: transform; }
        .ice-flow-r  { animation: ice-flow-r 4.5s linear infinite; will-change: transform; }
        .ice-bob-a   { animation: ice-bob-a 4.0s ease-in-out infinite;        will-change: transform; }
        .ice-bob-b   { animation: ice-bob-b 5.2s ease-in-out infinite 0.6s;   will-change: transform; }
        .ice-bob-c   { animation: ice-bob-c 6.8s ease-in-out infinite 1.3s;   will-change: transform; }
        .ice-bob-r   { animation: ice-bob-r 2.6s ease-in-out infinite 0.4s;   will-change: transform; }
        .ice-shimmer { animation: ice-shimmer 4.8s ease-in-out infinite; }
      `}</style>

      {/* Always visible — no fade-in. */}
      <g>
        {/* Subtle reflection band — extends full page width */}
        <rect
          className="ice-shimmer"
          x={-2400} y={WATER_Y} width={5600} height={22}
          fill="url(#water-refl)"
        />

        {/* Fine choppy ripple — fastest, sits just above the main waves */}
        <g className="ice-bob-r">
          <g className="ice-flow-r">
            <path
              d={buildWave(WATER_Y - 1, 70, 1.2)}
              stroke="rgba(132,168,196,0.32)"
              strokeWidth={0.5}
              fill="none"
            />
          </g>
        </g>

        {/* Primary wave — flows LEFT, biggest swell, most visible */}
        <g className="ice-bob-a">
          <g className="ice-flow-a">
            <path
              d={buildWave(WATER_Y, 200, 4.5)}
              stroke="rgba(132,168,196,0.65)"
              strokeWidth={1.0}
              fill="none"
            />
          </g>
        </g>

        {/* Secondary wave — flows RIGHT (counter-current), strong amplitude */}
        <g className="ice-bob-b">
          <g className="ice-flow-b">
            <path
              d={buildWave(WATER_Y + 9, 160, 3.5)}
              stroke="rgba(132,168,196,0.45)"
              strokeWidth={0.8}
              fill="none"
            />
          </g>
        </g>

        {/* Tertiary wave — deeper parallax layer */}
        <g className="ice-bob-c">
          <g className="ice-flow-c">
            <path
              d={buildWave(WATER_Y + 17, 240, 2.6)}
              stroke="rgba(132,168,196,0.28)"
              strokeWidth={0.7}
              fill="none"
            />
          </g>
        </g>
      </g>
    </g>
  );
}

// ═══ LayerDimRect — darkens a layer band when it's not the active one ═════
// Rendered inside the iceberg's clipPath so the darkening only affects the
// iceberg (not the background). Each rect's opacity is the product of:
//   • ascentPhase: 1 during the layer-focus phase (descentEnd → tipReveal),
//                  0 outside (no dimming during teaser, tip, final reveal)
//   • notActive:   1 when this layer is NOT focused, 0 when it IS focused
//   • PEAK_DIM:    overall maximum darkening
function LayerDimRect({
  layer, focus, prog,
}: {
  layer: Layer;
  focus: [number, number];
  prog: MotionValue<number>;
}) {
  const PEAK_DIM = 0.32;
  const [fS, fE] = focus;

  const ascentPhase = useTransform(
    prog,
    [P.descentEnd - 0.02, P.descentEnd + 0.04, P.tipReveal[0] - 0.04, P.tipReveal[0] + 0.02],
    [0, 1, 1, 0],
    { clamp: true },
  );

  const notActive = useTransform(
    prog,
    [fS - 0.02, fS + 0.03, fE - 0.02, fE + 0.03],
    [1, 0, 0, 1],
    { clamp: true },
  );

  const opacity = useTransform(
    [ascentPhase, notActive] as MotionValue<number>[],
    (vals) => {
      const [a, n] = vals as [number, number];
      return a * n * PEAK_DIM;
    },
  );

  return (
    <motion.rect
      x={0}
      y={layer.bandY[0]}
      width={VB_W}
      height={layer.bandY[1] - layer.bandY[0]}
      fill="rgb(15, 22, 32)"
      style={{ opacity }}
    />
  );
}

// ═══ Content plate per layer — rendered as HTML overlays in SVG coords ══════

function LayerLabel({
  layer, idx, prog,
}: {
  layer: Layer;
  idx: number;
  prog: MotionValue<number>;
}) {
  // VARIATION A: the editorial column is the primary chapter info during
  // the layer-focus phase, so the inscribed labels are HIDDEN throughout
  // teaser/descent/layer-focus/tip-reveal. They return ONLY at the final
  // reveal — as gentle navigation tags beside each layer band on the
  // fully-visible iceberg.
  const base = useTransform(
    prog,
    [
      0,
      P.tipReveal[1] - 0.02,
      P.finalReveal,
      1,
    ],
    [
      0,    // hidden throughout teaser, descent, layer focus, tip reveal
      0,    //
      0.65, // final reveal — return beside each layer band
      0.65, // hold through end
    ],
    { clamp: true },
  );

  const yStart = layer.bandY[0];
  const yEnd   = layer.bandY[1];
  const bandH  = yEnd - yStart;

  // Convert SVG coords → % of iceberg display container so each label sits
  // ALONGSIDE its own layer band. As the camera scrolls, every label moves
  // with its layer, and the active + top + bottom neighbour labels are all
  // visible in the same frame.
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
      {/* Phase name + number — beside the layer band, vertically centred */}
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

      {/* Detail content moved to LayerInfoPanel — rendered OUTSIDE the
          camera div as a single editorial column on the right of the
          viewport (Variation B) so it never overlaps the iceberg. */}
    </div>
  );
}

// ═══ ToolBadge — real logo (simpleicons CDN) with monogram fallback ═══════
// Renders an SVG logo from cdn.simpleicons.org in navy (#2a3a4c) for
// consistent monochrome treatment that complements the iceberg palette.
// Tools not on simpleicons fall back to the styled monogram placeholder.

// Map tool name → simpleicons slug. Entries here will fetch a real logo;
// anything not listed (or that fails to load) shows the monogram.
const LOGO_SLUGS: Record<string, string> = {
  "Claude": "claude",
  "Figma": "figma",
  "Figma AI": "figma",
  "Notion": "notion",
  "Notion AI": "notion",
  "GPT-4": "openai",
  "Framer": "framer",
  "Framer AI": "framer",
  "Midjourney": "midjourney",
  "Miro": "miro",
  "Miro AI": "miro",
  "v0": "vercel",        // v0 is a Vercel product
};

function ToolBadge({ name }: { name: string }) {
  const slug = LOGO_SLUGS[name];
  const [logoFailed, setLogoFailed] = useState(false);
  const useLogo = Boolean(slug) && !logoFailed;

  // Monogram fallback (used when no slug is mapped OR the CDN fetch fails).
  // Strip ".ai" / "AI" suffix and produce 1–2 uppercase letters.
  const monogram = (() => {
    const cleaned = name.replace(/\.\w+$/, "").replace(/\bAI\b/gi, "").trim();
    const parts = cleaned.split(/[\s-]+/).filter(Boolean);
    if (parts.length >= 2) return parts.slice(0, 2).map(p => p[0]).join("").toUpperCase();
    return (parts[0] || name).slice(0, 2).toUpperCase();
  })();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 64 }}>
      <div style={{
        width: 44, height: 44,
        borderRadius: 10,
        background: "rgba(255,255,255,0.78)",
        backdropFilter: "blur(6px)",
        border: "1px solid rgba(60,78,96,0.14)",
        boxShadow: "0 1px 2px rgba(20,30,45,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#2a3a4c",
      }}>
        {useLogo ? (
          <img
            src={`https://cdn.simpleicons.org/${slug}/2a3a4c`}
            alt=""
            width={22}
            height={22}
            onError={() => setLogoFailed(true)}
            style={{ display: "block", opacity: 0.92 }}
          />
        ) : (
          <span style={{
            fontSize: 16, fontWeight: 700,
            color: "#2a3a4c",
            fontFamily: "var(--font-display)",
            letterSpacing: "-0.02em",
          }}>
            {monogram}
          </span>
        )}
      </div>
      <span style={{
        fontSize: 12,
        color: "#5a6a7a",
        fontFamily: "var(--font-body)",
        textAlign: "center",
        lineHeight: 1.25,
        fontWeight: 500,
        maxWidth: 64,
      }}>
        {name}
      </span>
    </div>
  );
}

// ═══ LayerInfoPanel — editorial column on the right (Variation A) ══════════
// Refined hierarchy: chapter ID → description → divider → row(stat | tools).
// All text ≥ 14px (12px only for the tertiary tool-name label).
function LayerInfoPanel({
  layer, focus, prog,
}: {
  layer: Layer;
  focus: [number, number];
  prog: MotionValue<number>;
}) {
  const [fS, fE] = focus;
  // Cross-fade between chapters: each panel's fade-in starts BEFORE the
  // previous one is fully out (~0.03 overlap), so the column never goes
  // visually empty between chapters — a continuous editorial reading flow.
  const opacity = useTransform(
    prog,
    [fS - 0.04, fS + 0.03, fE, fE + 0.04],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const yLift = useTransform(prog, [fS - 0.04, fS + 0.04], [14, 0], { clamp: true });

  return (
    // Outer wrapper handles vertical centring; inner motion.div handles
    // opacity + entrance lift without conflicting transforms.
    // Width 410 + right 80: column extends further LEFT again — its left
    // edge sits at x=950 (vs 970 last iteration, 1000 before that), so
    // the editorial content nearly touches the iceberg's right edge at
    // the deepest layer (~13px gap).
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: 80,
        transform: "translateY(-50%)",
        width: 410,
        pointerEvents: "none",
        zIndex: 25,
      }}
    >
      <motion.div style={{ opacity, y: yLift }}>
        {/* Chapter ID — 14px small caps in terra */}
        <p style={{
          fontSize: 14, fontWeight: 700, letterSpacing: "0.22em",
          color: "var(--terra-500)", textTransform: "uppercase",
          marginBottom: 22, fontFamily: "var(--font-body)",
        }}>
          {layer.num} · {layer.name}
        </p>

        {/* Description — confident editorial statement, 18–22px display */}
        <p style={{
          fontSize: "clamp(1.15rem, 1.45vw, 1.35rem)",
          fontWeight: 600,
          fontFamily: "var(--font-display)",
          color: "#1a2533",
          lineHeight: 1.34,
          letterSpacing: "-0.012em",
          marginBottom: 28,
        }}>
          {layer.tagline}
        </p>

        {/* Thin divider between intro and metrics */}
        <div style={{
          height: 1,
          background: "rgba(60,78,96,0.16)",
          marginBottom: 24,
        }} />

        {/* Stat (left) + Tools (right) — single row, two columns */}
        <div style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 24,
          justifyContent: "space-between",
        }}>
          {/* Stat column — big impact number with terra label */}
          <div style={{ flex: "0 0 auto", maxWidth: 130 }}>
            <div style={{
              fontSize: "clamp(2.4rem, 3.4vw, 3rem)",
              fontWeight: 700,
              fontFamily: "var(--font-display)",
              color: "#1a2533",
              lineHeight: 1,
              letterSpacing: "-0.035em",
              marginBottom: 8,
            }}>
              {layer.stat}
            </div>
            <div style={{
              fontSize: 14,
              color: "var(--terra-500)",
              fontFamily: "var(--font-body)",
              letterSpacing: "0.01em",
              fontWeight: 500,
              lineHeight: 1.3,
            }}>
              {layer.statLabel}
            </div>
          </div>

          {/* Tools column — 3 monogram badges with names */}
          <div style={{
            display: "flex",
            gap: 8,
            flex: "0 0 auto",
          }}>
            {layer.tools.map(t => <ToolBadge key={t} name={t} />)}
          </div>
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
  const lineOpacity = useTransform(prog, [0, P.descentEnd, fS, P.finalReveal, 1], [0, 0.25, 0.6, 0.6, 0.15], { clamp: true });

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
  // Visually order rail bottom→top to match the narrative ascent
  // (Discover at bottom of rail, Deliver at top)
  const order = [4, 3, 2, 1, 0]; // LAYERS indices, bottom-to-top in story
  // Render top→bottom in DOM but match LAYER_FOCUS by index
  return (
    <div
      style={{
        position: "absolute",
        right: 36, top: "50%", transform: "translateY(-50%)",
        display: "flex", flexDirection: "column", gap: 14,
        zIndex: 40,
      }}
    >
      {order.map((idx) => (
        <PhaseRailItem key={LAYERS[idx].name} layer={LAYERS[idx]} focus={LAYER_FOCUS[idx]} prog={prog} />
      ))}
    </div>
  );
}

// ═══ Scroll hint ═════════════════════════════════════════════════════════════

function ScrollHint({ prog }: { prog: MotionValue<number> }) {
  const opacity = useTransform(prog, [0, 0.03, P.teaserEnd], [1, 1, 0], { clamp: true });
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
  // Header full-volume during teaser, dims during dive, FULLY hides
  // when the TipRevealLabel takes the title slot — and STAYS hidden
  // through final reveal. The new section title (TipRevealLabel) carries
  // through to the end and never reverts to "How I Work".
  const opacity = useTransform(
    prog,
    [0, 0.03, P.teaserEnd, P.descentEnd, P.tipReveal[0] - 0.03, P.tipReveal[0] + 0.02, 1],
    [1, 1,    1,             0.35,         0.30,                  0,                      0],
    { clamp: true },
  );
  // Subtle lift during dive
  const headlineY = useTransform(prog, [0, P.teaserEnd, P.descentEnd], [0, 0, -6], { clamp: true });

  return (
    <motion.div
      style={{
        position: "absolute",
        top: 44,
        left: 0, right: 0,
        textAlign: "center",
        opacity,
        y: headlineY,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.20em", color: "var(--terra-500)", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>
        How I Work
      </p>
      <h2 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", fontWeight: 700, fontFamily: "var(--font-display)", color: "#1a2533", lineHeight: 1.1, letterSpacing: "-0.025em", margin: 0 }}>
        What you see is the surface.
      </h2>
      <p style={{ fontSize: 13, color: "#5a6a7a", marginTop: 8, maxWidth: 400, marginLeft: "auto", marginRight: "auto", lineHeight: 1.55, fontFamily: "var(--font-body)" }}>
        Scroll to discover the depth beneath every deliverable.
      </p>
    </motion.div>
  );
}

// ═══ Tip-reveal label & Final-reveal caption ═══════════════════════════════
function TipRevealLabel({ prog }: { prog: MotionValue<number> }) {
  const [tIn] = P.tipReveal;
  // Fades in at the start of tip reveal and STAYS visible through final
  // reveal — the new section title carries to the end and never reverts.
  const opacity = useTransform(prog, [tIn - 0.02, tIn + 0.03, 1], [0, 1, 1], { clamp: true });
  const y = useTransform(prog, [tIn - 0.02, tIn + 0.03], [12, 0], { clamp: true });
  return (
    // Same position as the section Header (top: 44, full-width centered)
    // so it visually REPLACES "How I Work / What you see is the surface"
    // rather than stacking below it during the tip-reveal moment.
    <motion.div
      style={{
        position: "absolute",
        top: 44,
        left: 0, right: 0,
        textAlign: "center",
        opacity, y,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.22em", color: "var(--terra-500)", textTransform: "uppercase", marginBottom: 10, fontFamily: "var(--font-body)" }}>
        The polished outcome
      </p>
      <h3 style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)", fontWeight: 700, fontFamily: "var(--font-display)", color: "#1a2533", lineHeight: 1.1, letterSpacing: "-0.025em", margin: 0, maxWidth: 540, marginLeft: "auto", marginRight: "auto" }}>
        The refined surface — earned by everything below.
      </h3>
    </motion.div>
  );
}

// ═══ Main ═══════════════════════════════════════════════════════════════════

export default function IcebergSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollYProgress = useMotionValue(0);

  // ── Consolidated scroll handler ─────────────────────────────────────────
  // Does two things in a single listener (order matters — entry detection
  // must run BEFORE the progress update so we can pin the iceberg at the
  // final frame and prevent any in-between frames from rendering during
  // the upward "skip" gesture):
  //
  //  1. Detects "entry from below while scrolling up" and PINS the iceberg
  //     at the final reveal frame (scrollYProgress = 1). No matter how
  //     fast the user scrolls up, the iceberg never reverses through any
  //     intermediate frames — it stays frozen on the final view.
  //  2. If the user continues scrolling up past a small threshold, INSTANTLY
  //     teleports them to the middle of the Clients section above.
  //
  // For all other cases (downward scroll, mid-story revisit, etc.) the
  // progress tracks normally.
  useEffect(() => {
    let lastY = window.scrollY;
    let enteredFromBelow = false;
    let entryY = 0;
    let skipInProgress = false;
    const SCROLL_UP_INTENT_PX = 30; // additional upward scroll after entry that signals "skip"
    const SKIP_LOCK_MS = 120;       // brief lock to swallow the teleport scroll event

    const handleScroll = () => {
      const currentY = window.scrollY;
      const el = sectionRef.current;
      if (!el) {
        lastY = currentY;
        return;
      }

      // Ignore the synthetic scroll event our teleport produces
      if (skipInProgress) {
        lastY = currentY;
        return;
      }

      const direction: "up" | "down" = currentY < lastY ? "up" : "down";
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + currentY;
      const sectionHeight = el.scrollHeight;
      const vh = window.innerHeight;
      const sectionScrollEnd = sectionTop + sectionHeight - vh;
      const insideSection = currentY >= sectionTop && currentY <= sectionScrollEnd;

      // ── STEP 1: Detect entry from below ─────────────────────────────────
      // If the user JUST crossed from past-the-section into the pinned
      // range while scrolling UP, set the flag BEFORE updating progress.
      if (
        direction === "up" &&
        lastY > sectionScrollEnd &&
        currentY <= sectionScrollEnd &&
        currentY >= sectionTop
      ) {
        enteredFromBelow = true;
        entryY = currentY;
      }

      // ── STEP 2: Update scrollYProgress ─────────────────────────────────
      // If the flag is set, PIN to 1 (final reveal frame) so the iceberg
      // never renders intermediate frames during the upward gesture.
      // Otherwise compute the true progress normally.
      const denom = Math.max(1, sectionHeight - vh);
      const trueProgress = Math.min(1, Math.max(0, (currentY - sectionTop) / denom));
      scrollYProgress.set(enteredFromBelow ? 1 : trueProgress);

      // ── STEP 3: Trigger the skip teleport ──────────────────────────────
      // After the user has scrolled up >30px more, instantly teleport them
      // to the middle of the Clients section above the iceberg.
      if (enteredFromBelow && direction === "up" && insideSection) {
        const distFromEntry = entryY - currentY;
        if (distFromEntry > SCROLL_UP_INTENT_PX) {
          // Find the Clients section; fall back to half-a-viewport above iceberg
          const clientsEl = document.querySelector("#clients") as HTMLElement | null;
          let targetY: number;
          if (clientsEl) {
            const clientsRect = clientsEl.getBoundingClientRect();
            const clientsAbsTop = clientsRect.top + currentY;
            const clientsHeight = clientsRect.height;
            targetY = clientsAbsTop + clientsHeight / 2 - vh / 2;
            targetY = Math.max(clientsAbsTop - 40, Math.min(sectionTop - 60, targetY));
          } else {
            targetY = sectionTop - vh * 0.5;
          }

          skipInProgress = true;
          enteredFromBelow = false;
          window.scrollTo(0, Math.max(0, targetY)); // INSTANT teleport
          window.setTimeout(() => {
            skipInProgress = false;
            lastY = window.scrollY;
          }, SKIP_LOCK_MS);
          return;
        }
      }

      // Clear the flag if user reverses direction or exits the section,
      // so revisits via downward scroll behave normally.
      if (!insideSection || direction === "down") {
        enteredFromBelow = false;
      }

      lastY = currentY;
    };

    handleScroll(); // initial sync
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [scrollYProgress]);

  // Mouse parallax
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mX = useSpring(rawX, { stiffness: 60, damping: 18 });
  const mY = useSpring(rawY, { stiffness: 60, damping: 18 });
  const parallaxX = useTransform(mX, v => v * -5);
  const parallaxY = useTransform(mY, v => v * -3);

  // VARIATION A: iceberg shifts LEFT during the layer-focus phase so the
  // editorial column on the right has its own clean zone. Glides back to
  // centre for the tip-reveal and final-reveal moments.
  const cameraXShift = useTransform(
    scrollYProgress,
    [
      P.descentEnd - 0.02,
      P.descentEnd + 0.05,
      P.tipReveal[0] - 0.04,
      P.tipReveal[0] + 0.02,
    ],
    [0, -220, -220, 0],
    { clamp: true },
  );
  // Combine the slow horizontal shift with the subtle mouse-driven parallax.
  const combinedX = useTransform([parallaxX, cameraXShift] as MotionValue<number>[], (vals) => {
    const [px, sx] = vals as [number, number];
    return px + sx;
  });

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

  // Atmospheric depth glow — warms as we dive into the hidden process layers
  const glowIntensity = useTransform(scrollYProgress, [0, P.descentEnd, P.d_deliver[1], P.tipReveal[1], 1], [0, 0.5, 0.65, 0.25, 0.18], { clamp: true });

  // Progress bar
  const railFill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Vignette intensity — strongest deep, calm at finale
  const vignetteOp = useTransform(scrollYProgress, [0, P.descentEnd, P.d_deliver[1], P.finalReveal, 1], [0.06, 0.30, 0.42, 0.15, 0.10], { clamp: true });

  // "The polished product" label visible during teaser & tip-reveal & finale
  const tipLabelOp  = useTransform(scrollYProgress, [0, 0.04, P.teaserEnd, P.descentEnd, P.tipReveal[0], P.tipReveal[1], P.finalReveal, 1], [0, 0.85, 0.85, 0, 0, 0.85, 0.7, 0.7], { clamp: true });
  // "The depth of process" label visible only at the final pullback

  return (
    <>
      {/* ── DESKTOP ─────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="how-i-work"
        className="relative hidden lg:block"
        style={{ minHeight: "820vh", background: "#f7f6f4" }}
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

          {/* Tip-reveal moment (carries the section title through to the end) */}
          <TipRevealLabel prog={scrollYProgress} />

          {/* Progress rail (thin left side) — single visual indicator */}
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
              x: combinedX,           // includes layer-focus shift + parallax
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
                {/* Main iceberg fill — purely vertical icy-blue gradient
                    so left and right sides share the same shade (no white
                    cast on the left ear). Starts already in cool blue. */}
                <linearGradient id="ice-fill" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0" stopColor="#dde7ee" />
                  <stop offset="0.18" stopColor="#c5d2dd" />
                  <stop offset="0.42" stopColor="#94a8ba" />
                  <stop offset="0.72" stopColor="#5a7186" />
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

                {/* Per-layer dim overlays — non-active layers recede so the
                    active layer pops forward. Only active during the
                    layer-focus phase (not in teaser, tip reveal, final). */}
                {LAYERS.map((L, i) => (
                  <LayerDimRect
                    key={`dim-${L.name}`}
                    layer={L}
                    focus={LAYER_FOCUS[i]}
                    prog={scrollYProgress}
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

              {/* Summit flag at the apex — symbol of the polished outcome */}
              <SummitFlag prog={scrollYProgress} />
            </svg>

            {/* HTML layer labels — positioned in the same coordinate space as
                the iceberg band, so each title sits beside its own layer */}
            {LAYERS.map((L, i) => (
              <LayerLabel
                key={L.name}
                layer={L}
                idx={i}
                prog={scrollYProgress}
              />
            ))}

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

          </motion.div>

          {/* Editorial info column — right of viewport, viewport-fixed so it
              doesn't scale with the iceberg camera. Each LayerInfoPanel
              cross-fades in when its layer becomes the focused chapter. */}
          {LAYERS.map((L, i) => (
            <LayerInfoPanel
              key={L.name}
              layer={L}
              focus={LAYER_FOCUS[i]}
              prog={scrollYProgress}
            />
          ))}

          {/* Scroll hint */}
          <ScrollHint prog={scrollYProgress} />
        </div>
      </section>

      {/* ── MOBILE — vertical scrollytelling adaptation ────────────────── */}
      <MobileIceberg />
    </>
  );
}

// ═══ MobileIceberg — vertical layout adaptation of the desktop story ═══════
// Same scrollytelling: teaser → descent → 5 layers → tip → final reveal,
// but laid out vertically — iceberg in the top ~60% of viewport,
// editorial card in the bottom ~40%. All camera transforms, layer dim
// overlays, summit flag, waterline, and upward-scroll instant skip
// behavior are preserved from the desktop version.
function MobileIceberg() {
  const mobileSectionRef = useRef<HTMLDivElement>(null);
  const mobileProg = useMotionValue(0);
  // Track viewport height so the camera math adapts to device.
  const [vh, setVh] = useState(800);
  useEffect(() => {
    const update = () => setVh(window.innerHeight);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Iceberg fills the top ~70vh, the editorial card the bottom ~30vh.
  // Bigger iceberg area per user direction — more breathing room for the
  // camera moves, and the bottom edge fades into the card area via mask.
  const ICEBERG_AREA_VH = 70;
  const icebergAreaPx = vh * (ICEBERG_AREA_VH / 100);
  const D_RATIO_M = icebergAreaPx / VB_H;

  // Mobile camera math — translates the iceberg so a specific SVG y is
  // centred within the iceberg area.
  const mobileCamY = (scale: number, targetSvgY: number) =>
    -scale * (targetSvgY - VB_H / 2) * D_RATIO_M;

  // ─── Mobile camera scales & y-targets ─────────────────────────────────
  // Teaser tight on the tip; tip-reveal matches; final shows full iceberg.
  // The per-layer focus scales TAPER from tightest (Discover, bottom) to
  // widest (Deliver, top) so the camera continuously zooms out as the
  // story climbs — keeps later layers from feeling cramped.
  const M_TEASER_SCALE = 3.4;   // tight crop on the tip
  const M_TIP_SCALE = 3.4;      // matches teaser — close on the polished tip
  const M_FINAL_SCALE = 0.95;   // full iceberg nearly fills the larger area
  const M_TEASER_Y = 110;       // centres tip + waterline + faint depth hint
  const M_TIP_Y = 50;           // closer on the polished tip apex
  const M_FINAL_Y = 470;        // full iceberg roughly centred

  // Per-layer focus scales — index matches LAYERS order (0=Deliver top,
  // 4=Discover bottom). Discover is tightest; each step up zooms out.
  const FOCUS_S = [1.60, 1.80, 2.05, 2.40, 2.85]; // [Deliver, Design, Ideate, Synth, Discover]

  // Discover (bottommost) target shifted upward in SVG so the iceberg sits
  // visually lower in the viewport — gives the frame nicer bottom padding.
  const DISCOVER_Y = LAYER_CENTER_Y[4] - 48;

  const SCALE_KEYS_M = [
    0, P.teaserEnd, P.descentEnd,
    P.d_discover[1], P.d_synthesise[1], P.d_ideate[1], P.d_design[1], P.d_deliver[1],
    P.tipReveal[0], P.tipReveal[1],
    P.finalReveal, 1,
  ];
  // Scale at each key. Note FOCUS_S indices: [4]=Discover, [3]=Synth,
  // [2]=Ideate, [1]=Design, [0]=Deliver — bottom to top progression.
  const SCALE_VALS_M = [
    M_TEASER_SCALE, M_TEASER_SCALE,                // 0, teaserEnd
    FOCUS_S[4],     FOCUS_S[4],                    // descentEnd, discover end (tightest)
    FOCUS_S[3],                                    // synth end
    FOCUS_S[2],                                    // ideate end
    FOCUS_S[1],                                    // design end
    FOCUS_S[0],                                    // deliver end (widest layer view)
    M_TIP_SCALE,    M_TIP_SCALE,                   // tipReveal start, end
    M_FINAL_SCALE,  M_FINAL_SCALE,                 // finalReveal, 1
  ];

  const Y_KEYS_M = [
    0, P.teaserEnd, P.descentEnd,
    (P.d_discover[0]   + P.d_discover[1])   / 2, P.d_discover[1],
    (P.d_synthesise[0] + P.d_synthesise[1]) / 2, P.d_synthesise[1],
    (P.d_ideate[0]     + P.d_ideate[1])     / 2, P.d_ideate[1],
    (P.d_design[0]     + P.d_design[1])     / 2, P.d_design[1],
    (P.d_deliver[0]    + P.d_deliver[1])    / 2, P.d_deliver[1],
    P.tipReveal[0], P.tipReveal[1],
    P.finalReveal, 1,
  ];
  // Discover uses an upward-shifted target (DISCOVER_Y) so the iceberg
  // sits visually lower in the viewport for that frame.
  const Y_TARGETS_M = [
    M_TEASER_Y,         M_TEASER_Y,         DISCOVER_Y,
    DISCOVER_Y,         DISCOVER_Y,
    LAYER_CENTER_Y[3],  LAYER_CENTER_Y[3],
    LAYER_CENTER_Y[2],  LAYER_CENTER_Y[2],
    LAYER_CENTER_Y[1],  LAYER_CENTER_Y[1],
    LAYER_CENTER_Y[0],  LAYER_CENTER_Y[0],
    M_TIP_Y,            M_TIP_Y,
    M_FINAL_Y,          M_FINAL_Y,
  ];

  // Pre-compute Y_PX based on current viewport height — recomputed on resize.
  const Y_PX_M = useMemo(() => {
    return Y_KEYS_M.map((k, i) => {
      let s = SCALE_VALS_M[0];
      for (let j = 0; j < SCALE_KEYS_M.length - 1; j++) {
        if (k >= SCALE_KEYS_M[j] && k <= SCALE_KEYS_M[j + 1]) {
          const t = (k - SCALE_KEYS_M[j]) / (SCALE_KEYS_M[j + 1] - SCALE_KEYS_M[j]);
          s = SCALE_VALS_M[j] + (SCALE_VALS_M[j + 1] - SCALE_VALS_M[j]) * t;
          break;
        }
      }
      if (k >= SCALE_KEYS_M[SCALE_KEYS_M.length - 1]) s = SCALE_VALS_M[SCALE_VALS_M.length - 1];
      return mobileCamY(s, Y_TARGETS_M[i]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vh]);

  const cameraScaleM = useTransform(mobileProg, SCALE_KEYS_M, SCALE_VALS_M, { clamp: true });
  const cameraYM = useTransform(mobileProg, Y_KEYS_M, Y_PX_M, { clamp: true });

  // ─── Scroll handler — progress + pin-and-skip behavior (same logic
  // as the desktop section, just targeting the mobile section ref).
  useEffect(() => {
    let lastY = window.scrollY;
    let enteredFromBelow = false;
    let entryY = 0;
    let skipInProgress = false;
    const SCROLL_UP_INTENT_PX = 30;
    const SKIP_LOCK_MS = 120;

    const handleScroll = () => {
      const currentY = window.scrollY;
      const el = mobileSectionRef.current;
      if (!el) { lastY = currentY; return; }
      if (skipInProgress) { lastY = currentY; return; }

      const direction: "up" | "down" = currentY < lastY ? "up" : "down";
      const rect = el.getBoundingClientRect();
      const sectionTop = rect.top + currentY;
      const sectionHeight = el.scrollHeight;
      const vhNow = window.innerHeight;
      const sectionScrollEnd = sectionTop + sectionHeight - vhNow;
      const insideSection = currentY >= sectionTop && currentY <= sectionScrollEnd;

      if (
        direction === "up" &&
        lastY > sectionScrollEnd &&
        currentY <= sectionScrollEnd &&
        currentY >= sectionTop
      ) {
        enteredFromBelow = true;
        entryY = currentY;
      }

      const denom = Math.max(1, sectionHeight - vhNow);
      const trueProgress = Math.min(1, Math.max(0, (currentY - sectionTop) / denom));
      mobileProg.set(enteredFromBelow ? 1 : trueProgress);

      if (enteredFromBelow && direction === "up" && insideSection) {
        const distFromEntry = entryY - currentY;
        if (distFromEntry > SCROLL_UP_INTENT_PX) {
          const clientsEl = document.querySelector("#clients") as HTMLElement | null;
          let targetY: number;
          if (clientsEl) {
            const clientsRect = clientsEl.getBoundingClientRect();
            const clientsAbsTop = clientsRect.top + currentY;
            targetY = clientsAbsTop + clientsRect.height / 2 - vhNow / 2;
            targetY = Math.max(clientsAbsTop - 40, Math.min(sectionTop - 60, targetY));
          } else {
            targetY = sectionTop - vhNow * 0.5;
          }
          skipInProgress = true;
          enteredFromBelow = false;
          window.scrollTo(0, Math.max(0, targetY));
          window.setTimeout(() => {
            skipInProgress = false;
            lastY = window.scrollY;
          }, SKIP_LOCK_MS);
          return;
        }
      }

      if (!insideSection || direction === "down") {
        enteredFromBelow = false;
      }
      lastY = currentY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [mobileProg]);

  // Atmospheric helpers (subtle warm glow + vignette that intensify as we dive)
  const glowOp = useTransform(mobileProg, [0, P.descentEnd, P.d_deliver[1], P.tipReveal[1], 1], [0, 0.45, 0.62, 0.22, 0.16], { clamp: true });
  const vignetteOp = useTransform(mobileProg, [0, P.descentEnd, P.d_deliver[1], P.finalReveal, 1], [0.06, 0.28, 0.38, 0.12, 0.08], { clamp: true });

  return (
    <section
      ref={mobileSectionRef}
      id="how-i-work-mobile"
      className="lg:hidden relative"
      style={{ minHeight: "650vh", background: "#f7f6f4" }}
    >
      {/* Top divider */}
      <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.07), transparent)" }} />

      {/* Sticky viewport — story plays out here */}
      <div className="sticky top-0 overflow-hidden" style={{ height: "100vh" }}>

        {/* Background atmosphere */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 110% 90% at 50% 30%, #faf9f7 0%, #eae7e1 60%, #cfc8be 100%)" }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 40% at 50% 40%, rgba(196,82,42,0.12), transparent 70%)",
            opacity: glowOp,
          }}
        />
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 38%, rgba(18,22,30,0.55) 100%)",
            opacity: vignetteOp,
          }}
        />

        {/* Iceberg area — top portion.
            A soft mask fades the bottom ~22% of this area into transparency
            so the iceberg blends seamlessly into the editorial card area
            below instead of being chopped off by a hard overflow:hidden. */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: `${ICEBERG_AREA_VH}vh`,
            overflow: "hidden",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.55) 90%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 0%, black 78%, rgba(0,0,0,0.55) 90%, transparent 100%)",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0, left: 0,
              width: "100%", height: "100%",
              scale: cameraScaleM,
              y: cameraYM,
              transformOrigin: "center center",
              willChange: "transform",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ overflow: "visible", display: "block" }}
            >
              <defs>
                {/* Mobile-namespaced defs (suffix -m to avoid id collisions
                    with the always-mounted desktop SVG) */}
                <linearGradient id="ice-fill-m" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0" stopColor="#dde7ee" />
                  <stop offset="0.18" stopColor="#c5d2dd" />
                  <stop offset="0.42" stopColor="#94a8ba" />
                  <stop offset="0.72" stopColor="#5a7186" />
                  <stop offset="1" stopColor="#2a3a4c" />
                </linearGradient>
                <linearGradient id="tip-warmth-m" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(248,220,190,0.9)" />
                  <stop offset="0.35" stopColor="rgba(238,190,150,0.45)" />
                  <stop offset="1" stopColor="rgba(238,190,150,0)" />
                </linearGradient>
                <linearGradient id="ice-shadow-m" x1="0" y1="0" x2="1" y2="0.3">
                  <stop offset="0" stopColor="rgba(0,0,0,0)" />
                  <stop offset="0.5" stopColor="rgba(0,0,0,0)" />
                  <stop offset="1" stopColor="rgba(20,30,45,0.32)" />
                </linearGradient>
                <linearGradient id="underwater-m" x1="0" y1={`${WATER_Y / VB_H}`} x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(30,45,65,0)" />
                  <stop offset="0.3" stopColor="rgba(30,45,65,0.10)" />
                  <stop offset="1" stopColor="rgba(15,22,32,0.35)" />
                </linearGradient>
                <linearGradient id="water-refl-m" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(132,168,196,0.18)" />
                  <stop offset="1" stopColor="rgba(132,168,196,0)" />
                </linearGradient>
                <clipPath id="ice-clip-m">
                  <path d={ICEBERG_PATH} />
                </clipPath>
              </defs>

              {/* Iceberg base fill */}
              <path d={ICEBERG_PATH} fill="url(#ice-fill-m)" />

              {/* Underwater + warmth + side shadow (clipped to iceberg) */}
              <g clipPath="url(#ice-clip-m)">
                <rect x={0} y={WATER_Y} width={VB_W} height={VB_H - WATER_Y} fill="url(#underwater-m)" />
                <rect x={280} y={0} width={240} height={200} fill="url(#tip-warmth-m)" />
                <rect x={0} y={0} width={VB_W} height={VB_H} fill="url(#ice-shadow-m)" />

                {/* Fracture lines */}
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
                {/* Per-layer dim overlays */}
                {LAYERS.map((L, i) => (
                  <LayerDimRect
                    key={`mdim-${L.name}`}
                    layer={L}
                    focus={LAYER_FOCUS[i]}
                    prog={mobileProg}
                  />
                ))}
              </g>

              {/* Iceberg outer edge */}
              <path
                d={ICEBERG_PATH}
                fill="none"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth={0.8}
                strokeLinejoin="round"
              />

              {/* Waterline (with animated waves) */}
              <Waterline prog={mobileProg} />

              {/* Summit flag */}
              <SummitFlag prog={mobileProg} />
            </svg>
          </motion.div>
        </div>

        {/* Editorial card area — bottom portion.
            Cards inside use position:absolute inset:0 + flex centring,
            so their content sits in the visual middle of this area with
            equal breathing room above and below. */}
        <div
          style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            height: `${100 - ICEBERG_AREA_VH}vh`,
            padding: "22px 22px 22px",
            background:
              "linear-gradient(to top, #f7f6f4 0%, #f7f6f4 55%, rgba(247,246,244,0.85) 80%, rgba(247,246,244,0) 100%)",
          }}
        >
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <MobileTeaserCard prog={mobileProg} />
            {LAYERS.map((L, i) => (
              <MobileLayerCard
                key={`mcard-${L.name}`}
                layer={L}
                focus={LAYER_FOCUS[i]}
                prog={mobileProg}
              />
            ))}
            <MobileTipRevealCard prog={mobileProg} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Mobile card components ──────────────────────────────────────────────

function MobileTeaserCard({ prog }: { prog: MotionValue<number> }) {
  const opacity = useTransform(
    prog,
    [0, 0.02, P.teaserEnd, P.descentEnd - 0.02],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const y = useTransform(prog, [0, 0.04], [10, 0], { clamp: true });
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0, opacity, y,
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}
    >
      <p style={{
        fontSize: 12, fontWeight: 700, letterSpacing: "0.22em",
        color: "var(--terra-500)", textTransform: "uppercase",
        marginBottom: 12, fontFamily: "var(--font-body)",
      }}>
        How I Work
      </p>
      <h3 style={{
        fontSize: "clamp(1.35rem, 5.4vw, 1.7rem)",
        fontWeight: 700, fontFamily: "var(--font-display)",
        color: "#1a2533", lineHeight: 1.18, letterSpacing: "-0.025em",
        margin: 0, marginBottom: 12,
      }}>
        What you see is the surface.
      </h3>
      <p style={{
        fontSize: 14, color: "#5a6a7a", lineHeight: 1.55,
        margin: 0, fontFamily: "var(--font-body)",
      }}>
        Scroll to discover the depth beneath every deliverable.
      </p>
    </motion.div>
  );
}

function MobileLayerCard({
  layer, focus, prog,
}: {
  layer: Layer;
  focus: [number, number];
  prog: MotionValue<number>;
}) {
  const [fS, fE] = focus;
  const opacity = useTransform(
    prog,
    [fS - 0.04, fS + 0.03, fE, fE + 0.04],
    [0, 1, 1, 0],
    { clamp: true },
  );
  const y = useTransform(prog, [fS - 0.04, fS + 0.04], [12, 0], { clamp: true });
  return (
    <motion.div style={{
      position: "absolute", inset: 0, opacity, y,
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      {/* Chapter ID */}
      <p style={{
        fontSize: 12, fontWeight: 700, letterSpacing: "0.22em",
        color: "var(--terra-500)", textTransform: "uppercase",
        marginBottom: 10, fontFamily: "var(--font-body)",
      }}>
        {layer.num} · {layer.name}
      </p>
      {/* Description */}
      <p style={{
        fontSize: "clamp(1.05rem, 4.4vw, 1.2rem)",
        fontWeight: 600, fontFamily: "var(--font-display)",
        color: "#1a2533", lineHeight: 1.3, letterSpacing: "-0.012em",
        margin: 0, marginBottom: 14,
      }}>
        {layer.tagline}
      </p>
      {/* Thin divider */}
      <div style={{ height: 1, background: "rgba(60,78,96,0.16)", marginBottom: 12 }} />
      {/* Stat + tool logos row */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
      }}>
        {/* Stat */}
        <div style={{ flex: "0 0 auto", maxWidth: 120 }}>
          <div style={{
            fontSize: "clamp(1.8rem, 7vw, 2.2rem)",
            fontWeight: 700, fontFamily: "var(--font-display)",
            color: "#1a2533", lineHeight: 1, letterSpacing: "-0.035em",
            marginBottom: 4,
          }}>
            {layer.stat}
          </div>
          <div style={{
            fontSize: 12.5, color: "var(--terra-500)",
            fontFamily: "var(--font-body)", letterSpacing: "0.01em",
            fontWeight: 500, lineHeight: 1.25,
          }}>
            {layer.statLabel}
          </div>
        </div>
        {/* Tool badges (slightly smaller for mobile) */}
        <div style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
          {layer.tools.map(t => (
            <ToolBadge key={t} name={t} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function MobileTipRevealCard({ prog }: { prog: MotionValue<number> }) {
  const [tIn] = P.tipReveal;
  // Fades in at tip reveal and persists through final (matches desktop).
  const opacity = useTransform(prog, [tIn - 0.02, tIn + 0.03, 1], [0, 1, 1], { clamp: true });
  const y = useTransform(prog, [tIn - 0.02, tIn + 0.03], [12, 0], { clamp: true });
  return (
    <motion.div style={{
      position: "absolute", inset: 0, opacity, y,
      display: "flex", flexDirection: "column", justifyContent: "center",
    }}>
      <p style={{
        fontSize: 12, fontWeight: 700, letterSpacing: "0.22em",
        color: "var(--terra-500)", textTransform: "uppercase",
        marginBottom: 12, fontFamily: "var(--font-body)",
      }}>
        The polished outcome
      </p>
      <h3 style={{
        fontSize: "clamp(1.35rem, 5.4vw, 1.7rem)",
        fontWeight: 700, fontFamily: "var(--font-display)",
        color: "#1a2533", lineHeight: 1.18, letterSpacing: "-0.025em",
        margin: 0, marginBottom: 12,
      }}>
        The refined surface — earned by everything below.
      </h3>
      <p style={{
        fontSize: 14, color: "#5a6a7a", lineHeight: 1.55,
        margin: 0, fontFamily: "var(--font-body)",
      }}>
        What a client receives is the visible tip. The quality lives in the depth.
      </p>
    </motion.div>
  );
}
