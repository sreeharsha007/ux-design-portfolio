import { motion } from "motion/react";
import { useState } from "react";
import {
  ArrowRight,
  Rocket,
  Users,
  Layers,
  Workflow,
  GitBranch,
  Smartphone,
  Search,
  Zap,
  ShieldCheck,
  UsersRound,
  Presentation,
  Route,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

// ─── Types ─────────────────────────────────────────────────────────────────────

type TierId = "startup" | "growth" | "enterprise";

type Outcome = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

type AiOutcome = {
  icon: LucideIcon;
  title: string;
  detail: string;
};

type Tier = {
  id: TierId;
  badge: string;
  name: string;
  tagline: string;
  timeline: string;
  outcomes: Outcome[];
  aiOutcome: AiOutcome;
  ctaLabel: string;
  featured?: boolean;
};

// ─── Tier Data ─────────────────────────────────────────────────────────────────

const TIERS: Tier[] = [
  {
    id: "startup",
    badge: "Pre-seed → Series A",
    name: "Startup",
    tagline: "Ship an MVP investors can back.",
    timeline: "2–3 wks",
    outcomes: [
      { icon: Rocket, title: "Investor-ready MVP screens", detail: "10–15 core flows, fully responsive, dev-annotated." },
      { icon: Users, title: "Usability-tested core flows", detail: "Real user feedback before a single engineer commits." },
      { icon: Layers, title: "Design-system foundations", detail: "Tokens and components your dev team can extend." },
      { icon: Workflow, title: "Handoff your devs won't curse at", detail: "Figma specs with redlines, spacing, and assets." },
    ],
    aiOutcome: {
      icon: Sparkles,
      title: "Research synthesis",
      detail: "Turn 10 interviews into persona drafts in a day.",
    },
    ctaLabel: "Book a discovery call",
  },
  {
    id: "growth",
    badge: "Series A – Series C",
    name: "Growth",
    tagline: "Design infrastructure that lets your team ship faster.",
    timeline: "Quarterly retainer",
    outcomes: [
      { icon: GitBranch, title: "Scalable design system", detail: "Tokens, primitives, and patterns documented for reuse." },
      { icon: Smartphone, title: "Multi-platform consistency", detail: "Web, iOS, and Android aligned to one source of truth." },
      { icon: Search, title: "Quarterly usability research", detail: "Structured cadence that feeds roadmap decisions." },
      { icon: Zap, title: "Token + handoff pipeline", detail: "Changes flow from Figma to production without translation loss." },
    ],
    aiOutcome: {
      icon: Sparkles,
      title: "Design linter",
      detail: "Catches inconsistencies and a11y regressions before they ship.",
    },
    ctaLabel: "Start scaling",
    featured: true,
  },
  {
    id: "enterprise",
    badge: "Enterprise",
    name: "Enterprise",
    tagline: "Design leadership that handles stakeholder complexity.",
    timeline: "Dedicated programme",
    outcomes: [
      { icon: ShieldCheck, title: "WCAG 2.1 AA compliance", detail: "Full audit, remediation, and governance plan." },
      { icon: UsersRound, title: "Stakeholder alignment workshops", detail: "Cross-team rituals that unblock decisions." },
      { icon: Presentation, title: "Exec-ready design decks", detail: "Narratives leadership can sign off on quickly." },
      { icon: Route, title: "Phased rollout plan", detail: "Sequenced delivery that de-risks org-wide adoption." },
    ],
    aiOutcome: {
      icon: Sparkles,
      title: "Governance copilot",
      detail: "Detects design-system drift across 200+ components.",
    },
    ctaLabel: "Request a proposal",
  },
];

// ─── Shared tokens ─────────────────────────────────────────────────────────────

const CARD_BG = "#fefbf6";
const CARD_BORDER = "#ece2d3";
const HEADING = "#1c1917";
const BODY = "#57534e";
const MUTED = "#78716c";
const DIVIDER = "rgba(120, 113, 108, 0.16)";
const ICON_TILE_BG = "rgba(217, 119, 6, 0.08)";
const TERRA_500 = "var(--terra-500)";
const TERRA_600 = "var(--terra-600)";

// ─── Highlighter brush (reused from CaseStudyPage pattern) ─────────────────────

const BRUSH_VARIANTS = [
  { d: "M-3,8 Q52,6.5 105,4", angle: "-1deg", sw: "9" },
  { d: "M-2,8.5 Q50,6 104,3.5", angle: "0.5deg", sw: "8.5" },
  { d: "M-3,7.5 Q30,7 55,5.5 Q80,4 106,3.5", angle: "-0.8deg", sw: "9.5" },
];

function HighlighterBrush({ active, variantIndex }: { active: boolean; variantIndex: number }) {
  const v = BRUSH_VARIANTS[variantIndex % BRUSH_VARIANTS.length];
  return (
    <svg
      aria-hidden
      viewBox="0 0 102 12"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: -3,
        right: -3,
        bottom: -3,
        width: "calc(100% + 6px)",
        height: "0.8em",
        transform: `rotate(${v.angle})`,
        pointerEvents: "none",
        overflow: "visible",
        filter: "blur(1.1px)",
      }}
    >
      <motion.path
        d={v.d}
        fill="none"
        stroke="rgba(196, 82, 42, 0.22)"
        strokeWidth={v.sw}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          active
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: 0, opacity: 0 }
        }
        transition={{
          pathLength: { duration: active ? 0.35 : 0.2, ease: [0.22, 1, 0.36, 1] },
          opacity: { duration: active ? 0.1 : 0.2 },
        }}
      />
    </svg>
  );
}

// ─── Growth name underline — narrower single pencil stroke ────────────────────

function GrowthUnderline() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 120 8"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        left: 0,
        bottom: -6,
        width: "100%",
        height: "8px",
        overflow: "visible",
      }}
    >
      <motion.path
        d="M1,5 Q28,2.5 58,4 Q90,5.5 118,3"
        fill="none"
        stroke={TERRA_600 as string}
        strokeOpacity="0.85"
        strokeWidth="1.8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
}

// ─── Tier-signature glyphs (72×72, pencil stroke, terra) ──────────────────────

const GLYPH_STROKE = "rgba(180, 83, 9, 0.85)";
const GLYPH_FAINT = "rgba(180, 83, 9, 0.30)";

function GlyphFrame({ children, delay }: { children: React.ReactNode; delay: number }) {
  return (
    <motion.svg
      viewBox="0 0 72 72"
      width="72"
      height="72"
      fill="none"
      aria-hidden
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      custom={delay}
    >
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.3, delay }}
      >
        {children}
      </motion.g>
    </motion.svg>
  );
}

function StartupGlyph({ delay = 0 }: { delay?: number }) {
  // Paper plane (classic send-icon silhouette) + dashed flight trail
  // Points:
  //   A tip        (64, 8)
  //   B upper wing (8, 28)
  //   C notch fold (34, 36)  — indented V at the tail
  //   D lower tail (26, 60)
  return (
    <GlyphFrame delay={delay}>
      {/* Dashed flight path swooping up from lower-left to the plane's tail */}
      <motion.path
        d="M6,66 Q12,58 18,52 Q24,46 22,40 Q20,36 26,34"
        stroke={GLYPH_FAINT}
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeDasharray="2 3"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: delay + 0.1, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Filled soft body tint (very faint), helps the shape read as solid paper */}
      <motion.path
        d="M64,8 L8,28 L34,36 L26,60 Z"
        fill="rgba(180, 83, 9, 0.08)"
        stroke="none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.3, delay: delay + 0.9 }}
      />

      {/* Plane silhouette — tip → upper wing → notch → tail → back to tip */}
      <motion.path
        d="M64,8 L8,28 L34,36 L26,60 Z"
        stroke={GLYPH_STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.85, delay: delay + 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Crease — fold line from tip (A) to notch (C) */}
      <motion.path
        d="M64,8 L34,36"
        stroke={GLYPH_STROKE}
        strokeWidth="1.3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: delay + 1.2, ease: [0.22, 1, 0.36, 1] }}
      />
    </GlyphFrame>
  );
}

function GrowthGlyph({ delay = 0 }: { delay?: number }) {
  // Layered mountain — back peak + front peak + summit dot + ground line
  return (
    <GlyphFrame delay={delay}>
      {/* Ground line */}
      <motion.path
        d="M8,58 Q36,57 64,58"
        stroke={GLYPH_FAINT}
        strokeWidth="1.1"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.45, delay: delay + 0.1 }}
      />
      {/* Back peak (smaller, faint) */}
      <motion.path
        d="M10,58 L26,30 L42,58"
        stroke={GLYPH_FAINT}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, delay: delay + 0.35, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Front peak (larger, bolder) */}
      <motion.path
        d="M20,58 L42,14 L62,58"
        stroke={GLYPH_STROKE}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.75, delay: delay + 0.55, ease: [0.22, 1, 0.36, 1] }}
      />
      {/* Snow cap — short zigzag across the front peak */}
      <motion.path
        d="M34,26 L38,30 L42,24 L46,30 L50,26"
        stroke={GLYPH_STROKE}
        strokeOpacity="0.75"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.4, delay: delay + 1.2 }}
      />
      {/* Summit marker — filled dot at the peak */}
      <motion.circle
        cx="42" cy="14" r="2"
        fill={GLYPH_STROKE}
        initial={{ opacity: 0, scale: 0.3 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.3, delay: delay + 1.4 }}
        style={{ transformOrigin: "42px 14px" }}
      />
    </GlyphFrame>
  );
}

function EnterpriseGlyph({ delay = 0 }: { delay?: number }) {
  // Lattice node — 4 diamond nodes + center, radiating dashes
  const nodes: [number, number][] = [
    [36, 12], [60, 36], [36, 60], [12, 36],
  ];
  return (
    <GlyphFrame delay={delay}>
      {/* connector lines to center */}
      {nodes.map(([x, y], i) => (
        <motion.line
          key={`line-${i}`}
          x1={x} y1={y} x2="36" y2="36"
          stroke={GLYPH_STROKE}
          strokeWidth="1.4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: delay + 0.15 + i * 0.08 }}
        />
      ))}
      {/* outer nodes */}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={`node-${i}`}
          cx={x} cy={y} r="3"
          fill="none"
          stroke={GLYPH_STROKE}
          strokeWidth="1.4"
          initial={{ opacity: 0, scale: 0.2 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: delay + 0.5 + i * 0.05 }}
          style={{ transformOrigin: `${x}px ${y}px` }}
        />
      ))}
      {/* center node (filled) */}
      <motion.circle
        cx="36" cy="36" r="2.5"
        fill={GLYPH_STROKE}
        initial={{ opacity: 0, scale: 0.2 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.3, delay: delay + 0.75 }}
        style={{ transformOrigin: "36px 36px" }}
      />
      {/* radiating dashes from center (short) */}
      {[
        [36, 24, 36, 20],
        [48, 36, 52, 36],
        [36, 48, 36, 52],
        [24, 36, 20, 36],
      ].map(([x1, y1, x2, y2], i) => (
        <motion.line
          key={`dash-${i}`}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke={GLYPH_FAINT}
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: delay + 0.9 + i * 0.05 }}
        />
      ))}
    </GlyphFrame>
  );
}

function TierGlyph({ id, delay }: { id: TierId; delay: number }) {
  if (id === "startup") return <StartupGlyph delay={delay} />;
  if (id === "growth") return <GrowthGlyph delay={delay} />;
  return <EnterpriseGlyph delay={delay} />;
}

// ─── Hand-drawn pencil bolt (for AI row icon) ─────────────────────────────────

function PencilBolt({ size = 15 }: { size?: number }) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill="none" aria-hidden>
      <path
        d="M9.2,1.4 L4.2,8.3 Q4,8.7 4.4,8.8 L7.3,9.1 Q7.7,9.2 7.5,9.5 L5.6,14.5 Q5.5,14.9 5.9,14.6 L11.7,7.7 Q12,7.3 11.6,7.2 L8.7,6.9 Q8.3,6.8 8.5,6.5 L10.2,1.6 Q10.3,1.2 9.8,1.3 Z"
        stroke={TERRA_600 as string}
        strokeWidth="1.3"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// ─── Growth annotation (arrow scrawl + handwritten text) ──────────────────────

function GrowthAnnotation() {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        top: -96,
        left: "50%",
        transform: "translateX(-50%)",
        width: 260,
        height: 96,
      }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: 0.9 }}
    >
      <motion.span
        className="absolute"
        style={{
          top: 4,
          left: 18,
          fontFamily: "var(--font-display)",
          fontStyle: "italic",
          fontSize: 15,
          color: TERRA_600 as string,
          fontWeight: 500,
          transformOrigin: "left center",
          whiteSpace: "nowrap",
        }}
        initial={{ opacity: 0, rotate: -6 }}
        whileInView={{ opacity: 1, rotate: -4 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 1.0 }}
      >
        most teams start here
      </motion.span>
      <svg
        viewBox="0 0 260 96"
        width="260"
        height="96"
        fill="none"
        aria-hidden
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Wobbly, hand-drawn curve — double stroke for "sketched twice" feel */}
        <motion.path
          d="M80,30 C 78,46 108,40 112,58 C 116,74 96,78 110,86 C 118,90 128,88 134,92"
          stroke={TERRA_600 as string}
          strokeOpacity="0.35"
          strokeWidth="1.3"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        <motion.path
          d="M82,28 C 80,48 110,42 113,60 C 117,74 97,79 112,87 C 120,91 129,90 136,93"
          stroke={TERRA_600 as string}
          strokeOpacity="0.85"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Large clear arrowhead at the end */}
        <motion.path
          d="M122,86 L136,93 L131,78"
          stroke={TERRA_600 as string}
          strokeOpacity="0.9"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.3, delay: 1.65 }}
          style={{ transformOrigin: "136px 93px" }}
        />
      </svg>
    </motion.div>
  );
}

// ─── Outcome Row ──────────────────────────────────────────────────────────────

function OutcomeRow({
  icon: Icon,
  title,
  detail,
  staggerDelay,
  variantIndex,
  highlight,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  staggerDelay: number;
  variantIndex: number;
  highlight: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: staggerDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2.5">
        <Icon
          size={15}
          strokeWidth={1.7}
          style={{ color: TERRA_500, flexShrink: 0, display: "block" }}
        />
        <div
          className="relative inline-block text-[14px] font-semibold"
          style={{ color: HEADING, lineHeight: 1 }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>{title}</span>
          <HighlighterBrush active={highlight} variantIndex={variantIndex} />
        </div>
      </div>
      <div
        className="text-[12.5px] leading-[1.45] mt-1"
        style={{ color: MUTED, paddingLeft: 25 /* icon 15 + gap 10 */ }}
      >
        {detail}
      </div>
    </motion.div>
  );
}

function AiAssistedTag() {
  return (
    <span
      className="relative inline-flex items-center gap-2 align-middle overflow-hidden"
      style={{
        fontSize: 16,
        fontWeight: 600,
        color: TERRA_600 as string,
        letterSpacing: "0.02em",
        marginLeft: 10,
        padding: "2px 4px",
        borderRadius: 4,
        lineHeight: 1,
      }}
    >
      {/* Shimmer sweep — diagonal light band passing across */}
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(110deg, transparent 30%, rgba(255, 210, 150, 0.55) 48%, rgba(255, 235, 200, 0.75) 50%, rgba(255, 210, 150, 0.55) 52%, transparent 70%)",
          mixBlendMode: "screen",
        }}
        initial={{ x: "-120%" }}
        animate={{ x: ["-120%", "140%"] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatDelay: 1.8,
          ease: "easeInOut",
        }}
      />
      <span className="relative" style={{ fontWeight: 700, fontSize: 18, lineHeight: 1 }}>＋</span>
      <span className="relative inline-flex">
        <PencilBolt size={18} />
      </span>
      <span className="relative">AI-assisted</span>
    </span>
  );
}

function AiOutcomeRow({
  icon: Icon,
  title,
  detail,
  staggerDelay,
  variantIndex,
  highlight,
}: {
  icon: LucideIcon;
  title: string;
  detail: string;
  staggerDelay: number;
  variantIndex: number;
  highlight: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: staggerDelay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-2.5 flex-wrap">
        <Icon
          size={15}
          strokeWidth={1.7}
          style={{ color: TERRA_500, flexShrink: 0, display: "block" }}
        />
        <div
          className="relative inline-block text-[14px] font-semibold"
          style={{ color: HEADING, lineHeight: 1 }}
        >
          <span style={{ position: "relative", zIndex: 1 }}>{title}</span>
          <HighlighterBrush active={highlight} variantIndex={variantIndex} />
        </div>
        <AiAssistedTag />
      </div>
      <div
        className="text-[12.5px] leading-[1.45] mt-1"
        style={{ color: MUTED, paddingLeft: 25 }}
      >
        {detail}
      </div>
    </motion.div>
  );
}

// ─── Tier Card ─────────────────────────────────────────────────────────────────

function TierCard({ tier, index }: { tier: Tier; index: number }) {
  const isFeatured = !!tier.featured;
  const cardDelay = 0.12 + index * 0.12;
  const glyphDelay = cardDelay + 0.4;
  const [cardHover, setCardHover] = useState(false);

  return (
    <div className={`relative h-full ${isFeatured ? "lg:-my-3" : ""}`}>
      {/* Hand-drawn annotation above the featured tier — desktop only.
          In the mobile carousel the centered + featured styling already
          signals "recommended", and the absolutely-positioned arrow
          would overflow the carousel slide. */}
      {isFeatured && (
        <div className="hidden lg:block">
          <GrowthAnnotation />
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        onMouseEnter={() => setCardHover(true)}
        onMouseLeave={() => setCardHover(false)}
        className={`relative flex flex-col rounded-[20px] h-full ${
          isFeatured
            ? "px-6 py-9 lg:px-8 lg:py-12"   // featured: 24/36 mobile → 32/48 desktop
            : "px-6 py-7 lg:px-8 lg:py-9"    // regular:  24/28 mobile → 32/36 desktop
        }`}
        style={{
          background: CARD_BG,
          border: isFeatured ? `1.5px solid rgba(217,119,6,0.35)` : `1px solid ${CARD_BORDER}`,
        }}
        animate={
          isFeatured
            ? {
                boxShadow: [
                  "0 0 0 6px rgba(217,119,6,0.06), 0 24px 60px -24px rgba(180,83,9,0.14)",
                  "0 0 0 6px rgba(217,119,6,0.10), 0 24px 60px -24px rgba(180,83,9,0.18)",
                  "0 0 0 6px rgba(217,119,6,0.06), 0 24px 60px -24px rgba(180,83,9,0.14)",
                ],
              }
            : { boxShadow: "0 1px 2px rgba(28, 25, 23, 0.04)" }
        }
        transition={
          isFeatured
            ? {
                default: { duration: 0.55, delay: cardDelay, ease: [0.22, 1, 0.36, 1] },
                boxShadow: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
              }
            : { duration: 0.55, delay: cardDelay, ease: [0.22, 1, 0.36, 1] }
        }
      >
        {/* Top row: badge on the left, glyph on the right */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <span
            className="text-[10px] font-bold tracking-[0.12em] uppercase px-2.5 py-1 rounded-full"
            style={{
              background: "rgba(217, 119, 6, 0.08)",
              color: TERRA_600 as string,
            }}
          >
            {tier.badge}
          </span>
          <div style={{ width: 72, height: 72, flexShrink: 0, marginTop: -8, marginRight: -8 }}>
            <TierGlyph id={tier.id} delay={glyphDelay} />
          </div>
        </div>

        {/* Tier name — responsive (24px mobile → 30px desktop) */}
        <div className="relative inline-block mb-2">
          <h3
            className="text-[26px] lg:text-[30px] font-bold tracking-[-0.015em] leading-[1.1]"
            style={{ fontFamily: "var(--font-display)", color: HEADING }}
          >
            {tier.name}
          </h3>
          {isFeatured && <GrowthUnderline />}
        </div>

        {/* Tagline */}
        <p className="text-[15px] leading-[1.55] mb-5" style={{ color: BODY }}>
          {tier.tagline}
        </p>

        {/* Top hairline */}
        <div className="h-px mb-5" style={{ background: DIVIDER }} />

        {/* Outcomes (4 standard + 1 AI) */}
        <div className="flex flex-col gap-[14px] mb-6 flex-1">
          {tier.outcomes.map((o, i) => (
            <OutcomeRow
              key={i}
              icon={o.icon}
              title={o.title}
              detail={o.detail}
              staggerDelay={cardDelay + 0.3 + i * 0.06}
              variantIndex={i}
              highlight={cardHover}
            />
          ))}
          <AiOutcomeRow
            icon={tier.aiOutcome.icon}
            title={tier.aiOutcome.title}
            detail={tier.aiOutcome.detail}
            staggerDelay={cardDelay + 0.3 + tier.outcomes.length * 0.06}
            variantIndex={tier.outcomes.length}
            highlight={cardHover}
          />
        </div>

        {/* Bottom hairline */}
        <div className="h-px mb-5" style={{ background: DIVIDER }} />

        {/* CTA */}
        <a
          href="/#contact"
          onClick={(e) => {
            const el = document.getElementById("contact");
            if (el) { e.preventDefault(); el.scrollIntoView({ behavior: "smooth", block: "start" }); }
          }}
          className="group flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold transition-colors"
          style={
            isFeatured
              ? {
                  background: TERRA_600 as string,
                  color: "#ffffff",
                  border: `1px solid ${TERRA_600}`,
                }
              : {
                  background: "transparent",
                  color: TERRA_600 as string,
                  border: "1px solid rgba(217, 119, 6, 0.35)",
                }
          }
          onMouseEnter={(e) => {
            if (isFeatured) {
              (e.currentTarget as HTMLAnchorElement).style.background = TERRA_500 as string;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = TERRA_500 as string;
            } else {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(217, 119, 6, 0.06)";
            }
          }}
          onMouseLeave={(e) => {
            if (isFeatured) {
              (e.currentTarget as HTMLAnchorElement).style.background = TERRA_600 as string;
              (e.currentTarget as HTMLAnchorElement).style.borderColor = TERRA_600 as string;
            } else {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
            }
          }}
        >
          {tier.ctaLabel}
          <motion.span
            className="inline-flex"
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
          >
            <ArrowRight
              size={15}
              strokeWidth={2}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </motion.span>
        </a>
      </motion.div>
    </div>
  );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export default function WhoItsFor() {
  return (
    <section
      id="services"
      className="py-32 relative overflow-hidden"
      style={{
        background: "#fbf7f1",
        borderTop: `1px solid ${CARD_BORDER}`,
        borderBottom: `1px solid ${CARD_BORDER}`,
      }}
    >
      {/* Blueprint dotted grid (masked) */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(120,85,45,0.12) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 95%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 40%, black 40%, transparent 95%)",
        }}
      />

      {/* Single soft amber glow — top-left */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          top: -140,
          left: "-8%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(closest-side, rgba(217,119,6,0.10), transparent 70%)",
        }}
      />

      <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-4"
        >
          <p
            className="text-[12px] font-semibold tracking-[0.14em] uppercase mb-4"
            style={{ color: TERRA_500 }}
          >
            Services
          </p>
          <h2
            className="font-bold tracking-tight leading-tight"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontFamily: "var(--font-display)",
              color: HEADING,
            }}
          >
            Services tailored
            <br />
            <span style={{ color: "#8c8680" }}>to your stage.</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg max-w-2xl leading-relaxed mb-10 lg:mb-28"
          style={{ color: BODY }}
        >
          Three engagements shaped by your stage — each with outcome-driven delivery and an AI-assisted workflow to help your team move faster.
        </motion.p>

        {/* Desktop grid — 3-up auto-fit */}
        <div
          className="hidden lg:grid gap-6 items-stretch relative"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} />
          ))}
        </div>

        {/* Mobile tabbed view — three tabs at top (Startup | Growth |
            Enterprise) with the active tier card rendered below. Growth
            (featured) is selected by default. */}
        <div className="lg:hidden">
          <MobileTabbedTiers />
        </div>
      </div>
    </section>
  );
}

// ─── Mobile Tabbed Tiers ──────────────────────────────────────────────────────

function MobileTabbedTiers() {
  const featuredIdx = Math.max(0, TIERS.findIndex((t) => t.featured));
  const [activeIdx, setActiveIdx] = useState(featuredIdx);
  const activeTier = TIERS[activeIdx];

  return (
    <div className="w-full">
      {/* Tab bar — pill segmented control. Active pill in terra. */}
      <div
        role="tablist"
        aria-label="Service tier"
        className="flex items-center gap-1 p-1 rounded-full mb-6 mx-auto"
        style={{
          background: "#f1eadf",
          border: `1px solid ${CARD_BORDER}`,
          width: "fit-content",
          maxWidth: "100%",
        }}
      >
        {TIERS.map((tier, i) => {
          const isActive = i === activeIdx;
          return (
            <button
              key={tier.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIdx(i)}
              className="relative px-4 py-2 text-[13px] font-semibold rounded-full transition-colors"
              style={{
                color: isActive ? "#ffffff" : "#6b6259",
                background: "transparent",
                whiteSpace: "nowrap",
                lineHeight: 1.2,
                fontFamily: "var(--font-body)",
                letterSpacing: "0.01em",
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="tier-tab-active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: TERRA_600 as string,
                    zIndex: 0,
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span style={{ position: "relative", zIndex: 1 }}>
                {tier.name}
              </span>
              {tier.featured && !isActive && (
                <span
                  aria-hidden
                  className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full align-middle"
                  style={{ background: TERRA_500, position: "relative", zIndex: 1 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Active tier card — cross-fades on tab change */}
      <AnimatePresenceWrapper activeKey={activeTier.id}>
        <TierCard tier={activeTier} index={activeIdx} />
      </AnimatePresenceWrapper>

      {/* "Recommended" hint below the tab bar when Growth is active —
          subtle reinforcement that this is the suggested tier. */}
      {activeTier.featured && (
        <p
          className="text-[11px] text-center mt-3 mb-2 font-medium tracking-[0.08em] uppercase"
          style={{ color: TERRA_600 as string }}
        >
          Most teams start here
        </p>
      )}
    </div>
  );
}

// Helper: simple AnimatePresence wrapper for keyed cross-fade transitions
function AnimatePresenceWrapper({
  activeKey,
  children,
}: {
  activeKey: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={activeKey}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
