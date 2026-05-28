import React, { useState, useEffect, useRef, useId } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useMotionValueEvent, useInView } from "motion/react";
import {
  ArrowRight, TrendingUp, Star, ChevronRight,
  Shield, BarChart2, Smartphone, Layers,
} from "lucide-react";
import { projects } from "../data/projects";
import WhoItsFor from "./WhoItsFor";
import IcebergSection from "./IcebergSection";
import CaseStudyModal from "./CaseStudyModal";
import HighlightMark from "./HighlightMark";
import MobileCarousel from "./MobileCarousel";
import ContactSection from "./ContactSection";

// ─── Noise Displacement Shimmer ──────────────────────────────────────────────

function NoiseShimmer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 100, H = 75;
    canvas.width = W;
    canvas.height = H;

    let t = 0;
    let raf: number;

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

// ─── World Map ────────────────────────────────────────────────────────────────

const MAP_MARKERS = [
  { x: 128, y: 122, label: "San Francisco, CA" },
  { x: 401, y: 104, label: "London, UK" },
  { x: 572, y: 148, label: "Bangalore, India" },
];

function WorldMap({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="relative w-full overflow-hidden rounded-2xl" style={{ background: "#f0eeeb", aspectRatio: "800/300" }}>
      <svg
        viewBox="0 0 800 300"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        {/* Latitude / longitude grid */}
        {[0,1,2,3,4,5,6].map(i => (
          <line key={`h${i}`} x1="0" y1={i*50} x2="800" y2={i*50} stroke="#e2ded9" strokeWidth="0.5" />
        ))}
        {[0,1,2,3,4,5,6,7,8,9,10,11,12].map(i => (
          <line key={`v${i}`} x1={i*800/12} y1="0" x2={i*800/12} y2="300" stroke="#e2ded9" strokeWidth="0.5" />
        ))}

        {/* Continents */}
        <g fill="rgba(196,82,42,0.11)" stroke="rgba(196,82,42,0.22)" strokeWidth="0.75" strokeLinejoin="round">
          {/* North America */}
          <polygon points="80,75 188,62 258,102 258,142 222,192 178,202 132,158 96,152 76,118" />
          {/* South America */}
          <polygon points="218,198 262,180 312,202 302,262 270,288 250,282 238,258 222,232" />
          {/* Europe */}
          <polygon points="362,108 394,85 444,75 478,98 482,128 468,148 438,146 392,138 370,133" />
          {/* Africa */}
          <polygon points="368,145 435,126 500,145 508,195 498,248 478,282 442,292 408,282 372,248 358,196" />
          {/* Asia (main body) */}
          <polygon points="478,92 548,45 638,38 722,48 752,75 748,108 718,145 672,158 620,162 578,162 542,152 512,138 492,112" />
          {/* Indian subcontinent */}
          <polygon points="512,148 568,145 588,162 582,205 560,224 532,220 514,192 512,162" />
          {/* Japan */}
          <polygon points="726,102 738,92 752,96 750,118 738,124 726,118" />
          {/* SE Asia */}
          <polygon points="618,162 652,155 668,172 658,195 638,198 618,182" />
          {/* Australia */}
          <polygon points="650,215 702,205 744,218 750,248 734,272 700,278 658,265 642,242" />
          {/* Greenland */}
          <polygon points="290,38 334,30 350,48 338,64 310,68 288,56" />
          {/* UK / Ireland */}
          <polygon points="374,98 385,88 394,92 392,108 380,114 372,108" />
        </g>

        {/* Connection arcs between markers */}
        {MAP_MARKERS.map((m, i) => {
          const next = MAP_MARKERS[(i + 1) % MAP_MARKERS.length];
          const mx = (m.x + next.x) / 2;
          const my = Math.min(m.y, next.y) - 30;
          return (
            <path
              key={i}
              d={`M ${m.x} ${m.y} Q ${mx} ${my} ${next.x} ${next.y}`}
              fill="none"
              stroke={i === activeIndex ? "rgba(196,82,42,0.28)" : "rgba(196,82,42,0.08)"}
              strokeWidth={i === activeIndex ? 1.5 : 0.75}
              strokeDasharray="4 3"
            />
          );
        })}
      </svg>

      {/* Markers */}
      {MAP_MARKERS.map((marker, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={i}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${(marker.x / 800) * 100}%`, top: `${(marker.y / 300) * 100}%` }}
          >
            {isActive && (
              <motion.div
                className="absolute rounded-full"
                animate={{ scale: [1, 2.8, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                style={{ inset: -7, background: "rgba(196,82,42,0.28)" }}
              />
            )}
            <div
              className="relative rounded-full border-2 border-white transition-all duration-400"
              style={{
                width: isActive ? 14 : 10,
                height: isActive ? 14 : 10,
                background: isActive ? "var(--terra-500)" : "rgba(196,82,42,0.38)",
                boxShadow: isActive ? "0 0 0 3px rgba(196,82,42,0.18), 0 2px 10px rgba(196,82,42,0.35)" : "none",
              }}
            />
            {isActive && (
              <motion.div
                initial={{ opacity: 0, y: 4, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded-lg text-[12px] font-medium z-10"
                style={{
                  background: "#ffffff",
                  border: "1px solid #e7e5e4",
                  color: "#57534e",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                }}
              >
                {marker.label}
              </motion.div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── AI Stack Data (legacy — replaced by IcebergSection) ─────────────────────

const AI_STACK = [
  {
    phase: "Discover",
    tools: [{ name: "Claude" }, { name: "Otter.ai" }, { name: "Maze" }],
    agents: [
      { name: "Research Synthesizer", description: "Aggregates interviews, surveys & support tickets into themes" },
      { name: "Competitor Scanner", description: "Scans rival products, generates UX gap analysis" },
    ],
    workflows: [
      "Auto-generates discussion guides from project briefs",
      "Transcribes & tags interview themes in real-time",
    ],
    output: "Research synthesis",
    timeBefore: "2–4 weeks",
    timeAfter: "3–5 days",
  },
  {
    phase: "Synthesise",
    tools: [{ name: "Dovetail AI" }, { name: "GPT-4" }, { name: "Miro AI" }],
    agents: [
      { name: "Insight Clustering", description: "Groups qualitative data into actionable themes" },
      { name: "Brief Generator", description: "Turns findings into structured design briefs" },
    ],
    workflows: [
      "Auto-clusters affinity data from 100+ data points",
      "Generates persona drafts from interview transcripts",
    ],
    output: "Insights + brief",
    timeBefore: "1–2 weeks",
    timeAfter: "4–8 hours",
  },
  {
    phase: "Ideate",
    tools: [{ name: "Midjourney" }, { name: "GPT-4" }, { name: "Framer AI" }],
    agents: [
      { name: "Concept Explorer", description: "Generates diverse design directions from constraints" },
      { name: "Moodboard Curator", description: "Sources visual references aligned to brand" },
    ],
    workflows: [
      "Produces 10+ layout variations per screen in minutes",
      "Auto-generates copy alternatives for testing",
    ],
    output: "Concepts + direction",
    timeBefore: "1–2 weeks",
    timeAfter: "1–2 days",
  },
  {
    phase: "Design",
    tools: [{ name: "Figma AI" }, { name: "v0" }, { name: "Framer" }],
    agents: [
      { name: "Component Generator", description: "Creates Figma components from natural language" },
      { name: "A11y Checker", description: "Real-time WCAG accessibility validation" },
    ],
    workflows: [
      "Auto-generates responsive variants from desktop designs",
      "Flags contrast & touch-target issues before review",
    ],
    output: "Hi-fi prototype",
    timeBefore: "3–6 weeks",
    timeAfter: "2–4 weeks",
  },
  {
    phase: "Deliver",
    tools: [{ name: "Claude" }, { name: "Notion AI" }, { name: "Figma" }],
    agents: [
      { name: "Spec Writer", description: "Generates dev handoff docs with implementation notes" },
      { name: "QA Annotator", description: "Auto-annotates edge cases and interaction states" },
    ],
    workflows: [
      "Produces pixel-perfect redlines with code snippets",
      "Auto-generates changelog from design iterations",
    ],
    output: "Dev-ready specs",
    timeBefore: "1–2 weeks",
    timeAfter: "2–3 days",
  },
];

const LAYER_GRADIENTS = [
  { top: "rgba(196,82,42,0.40)", front: "rgba(28,25,23,0.97)", side: "rgba(196,82,42,0.58)", border: "rgba(196,82,42,0.32)" },
  { top: "rgba(168,70,36,0.34)", front: "rgba(41,37,36,0.94)", side: "rgba(168,70,36,0.50)", border: "rgba(168,70,36,0.26)" },
  { top: "rgba(120,53,15,0.30)", front: "rgba(55,52,48,0.92)", side: "rgba(120,53,15,0.44)", border: "rgba(120,53,15,0.22)" },
  { top: "rgba(87,83,78,0.28)", front: "rgba(68,64,60,0.90)", side: "rgba(87,83,78,0.40)", border: "rgba(87,83,78,0.18)" },
  { top: "rgba(68,65,60,0.24)", front: "rgba(78,74,70,0.88)", side: "rgba(68,65,60,0.36)", border: "rgba(68,65,60,0.15)" },
];

const TESTIMONIALS = [
  {
    quote: "Delivered a full design system in 8 weeks that our previous agency quoted 6 months for. The quality was exceptional and the handoff was the cleanest we've ever received.",
    name: "Sarah Kim",
    role: "VP of Product",
    company: "Series B SaaS",
    location: "San Francisco, CA",
    rating: 5,
  },
  {
    quote: "What stood out was the speed without sacrificing depth. We had a usability-tested, dev-ready prototype for our investor demo in 3 weeks. Highly recommend.",
    name: "Marcus Osei",
    role: "Co-founder & CEO",
    company: "FinTech Startup",
    location: "London, UK",
    rating: 5,
  },
  {
    quote: "Finally a designer who understands enterprise constraints. The AI workflow breakdowns in every deliverable helped our team understand the decisions — not just the output.",
    name: "Priya Nair",
    role: "Director of UX",
    company: "Enterprise Healthcare",
    location: "Bangalore, India",
    rating: 5,
  },
];

const PROJECT_DOMAIN_ICONS = [Shield, BarChart2, Smartphone, Layers];

// ─── Animated Counter ─────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 18 });
  const inView = useInView(ref, { once: true, margin: "-5% 0px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  useMotionValueEvent(spring, "change", (v) => {
    setDisplay(Math.round(v).toString());
  });

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── AI Stack: Interactive Layout ────────────────────────────────────────────

function StackWithDetail() {
  const [active, setActive] = useState(0);
  const accordionRef = React.useRef<HTMLDivElement>(null);
  const [accordionH, setAccordionH] = React.useState(0);

  React.useEffect(() => {
    if (!accordionRef.current) return;
    const ro = new ResizeObserver(([entry]) => setAccordionH(entry.contentRect.height));
    ro.observe(accordionRef.current);
    return () => ro.disconnect();
  }, []);

  const W = 260, HH = 62, DEPTH = 28;
  const diamondH = HH * 2 + DEPTH;
  const count = AI_STACK.length;
  const overlap = accordionH > 0
    ? Math.max(0, (count * diamondH - accordionH) / (count - 1))
    : 50;

  return (
    <div className="hidden lg:flex justify-center items-start gap-24">
      {/* Diamond stack */}
      <div className="flex flex-col items-center flex-shrink-0">
        {AI_STACK.map((s, i) => {
          const l = LAYER_GRADIENTS[i];
          const isActive = i === active;
          return (
            <motion.button
              key={s.phase}
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setActive(i)}
              className="relative cursor-pointer flex flex-col items-center"
              style={{
                width: W,
                marginTop: i === 0 ? 0 : -overlap,
                zIndex: isActive ? 10 : count - i,
                transition: "transform 0.4s cubic-bezier(.4,0,.2,1), filter 0.4s cubic-bezier(.4,0,.2,1)",
                transform: isActive ? "scale(1.08) translateY(-2px)" : "scale(1)",
                filter: isActive
                  ? `brightness(1.08) drop-shadow(0 6px 22px ${l.border})`
                  : `brightness(0.68) saturate(0.25) opacity(0.52)`,
              }}
            >
              <div className="relative" style={{ width: W, height: diamondH }}>
                <div style={{ position: "absolute", inset: 0, background: l.top, clipPath: `polygon(50% 0%, 100% ${HH}px, 50% ${HH * 2}px, 0% ${HH}px)` }} />
                <div style={{ position: "absolute", inset: 0, background: l.front, clipPath: `polygon(0% ${HH}px, 50% ${HH * 2}px, 50% ${HH * 2 + DEPTH}px, 0% ${HH + DEPTH}px)` }} />
                <div style={{ position: "absolute", inset: 0, background: l.side, clipPath: `polygon(50% ${HH * 2}px, 100% ${HH}px, 100% ${HH + DEPTH}px, 50% ${HH * 2 + DEPTH}px)` }} />
                <span
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none font-medium tracking-wide whitespace-nowrap"
                  style={{
                    top: HH - 7,
                    fontSize: 12,
                    fontFamily: "var(--font-sans)",
                    color: isActive ? "rgba(255,255,255,0.90)" : "rgba(255,255,255,0.38)",
                    transition: "color 0.4s ease",
                  }}
                >
                  {s.phase}
                </span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Accordion panel */}
      <div
        ref={accordionRef}
        className="w-[420px] flex-shrink-0 rounded-2xl overflow-hidden"
        style={{
          background: "#ffffff",
          border: "1px solid #e7e5e4",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
        }}
      >
        {AI_STACK.map((s, i) => {
          const l = LAYER_GRADIENTS[i];
          const isOpen = i === active;
          return (
            <div
              key={s.phase}
              style={{ borderBottom: i < count - 1 ? "1px solid #e7e5e4" : "none" }}
            >
              {/* Header */}
              <button
                onClick={() => setActive(i)}
                className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-200"
                style={{ background: isOpen ? "#f5f5f4" : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300"
                    style={{ background: isOpen ? "var(--terra-500)" : "#a8a29e" }}
                  />
                  <span
                    className="text-[13px] font-semibold transition-colors duration-300"
                    style={{
                      fontFamily: "var(--font-display)",
                      color: isOpen ? "#1c1917" : "#78716c",
                    }}
                  >
                    {s.phase}
                  </span>
                  {isOpen && (
                    <span
                      className="text-[12px] uppercase tracking-widest px-2 py-0.5 rounded"
                      style={{ background: "var(--terra-light)", color: "var(--terra-500)" }}
                    >
                      {s.output}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {!isOpen && (
                    <span className="text-[12px] text-stone-500">
                      {s.timeAfter}
                    </span>
                  )}
                  <ChevronRight
                    className="w-3.5 h-3.5 transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      color: "#78716c",
                    }}
                  />
                </div>
              </button>

              {/* Body */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-6 pt-5 space-y-5">

                      {/* Time saved — prominent */}
                      <div
                        className="flex items-center justify-between p-4 rounded-xl"
                        style={{ background: "var(--terra-light)", border: "1px solid var(--terra-border)" }}
                      >
                        <div>
                          <p className="text-[12px] uppercase tracking-widest mb-0.5" style={{ color: "var(--terra-600)" }}>
                            Time saved
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-sm line-through text-stone-400">{s.timeBefore}</span>
                            <ArrowRight className="w-3 h-3 text-stone-500" />
                            <span className="text-base font-bold" style={{ color: "var(--terra-500)", fontFamily: "var(--font-display)" }}>
                              {s.timeAfter}
                            </span>
                          </div>
                        </div>
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center"
                          style={{ background: "var(--terra-500)" }}
                        >
                          <span className="text-white text-xs font-bold">{String(i + 1).padStart(2, "0")}</span>
                        </div>
                      </div>

                      {/* Agents */}
                      <div>
                        <p className="text-[12px] uppercase tracking-widest mb-3" style={{ color: "#78716c" }}>
                          AI Agents
                        </p>
                        <div className="space-y-3">
                          {s.agents.map((agent) => (
                            <div key={agent.name} className="flex gap-3">
                              <div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[6px]"
                                style={{ background: "var(--terra-500)" }}
                              />
                              <div>
                                <p className="text-[14px] font-semibold text-stone-800">{agent.name}</p>
                                <p className="text-[14px] leading-relaxed text-stone-500 mt-0.5">{agent.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Workflows */}
                      <div>
                        <p className="text-[12px] uppercase tracking-widest mb-3" style={{ color: "#78716c" }}>
                          Automated Workflows
                        </p>
                        <div className="space-y-2">
                          {s.workflows.map((wf) => (
                            <div key={wf} className="flex items-start gap-2.5">
                              <span
                                className="w-1 h-1 rounded-full mt-[6px] flex-shrink-0"
                                style={{ background: "rgba(196,82,42,0.45)" }}
                              />
                              <p className="text-[14px] leading-relaxed text-stone-500">{wf}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tools */}
                      <div className="pt-4" style={{ borderTop: "1px solid #e7e5e4" }}>
                        <p className="text-[12px] uppercase tracking-widest mb-2.5" style={{ color: "#78716c" }}>
                          Tools
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.tools.map((t) => (
                            <span
                              key={t.name}
                              className="px-2.5 py-1 rounded-full text-[12px] font-medium"
                              style={{
                                background: "var(--terra-light)",
                                border: "1px solid var(--terra-border)",
                                color: "var(--terra-600)",
                                fontFamily: "var(--font-mono)",
                              }}
                            >
                              {t.name}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Tilt Card ───────────────────────────────────────────────────────────────

function TiltCard({
  children, className, style, onMouseEnter, onMouseLeave,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [3, -3]), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-3, 3]), { stiffness: 200, damping: 25 });

  return (
    <motion.div
      className={className}
      style={{ ...style, rotateX, rotateY, transformPerspective: 1000 }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={e => { mx.set(0); my.set(0); onMouseLeave?.(e); }}
      onMouseEnter={onMouseEnter}
    >
      {children}
    </motion.div>
  );
}

// ─── MobileScrollCue ──────────────────────────────────────────────────────────
// Floating "Scroll to explore" cue that sits FIXED at viewport bottom while
// the hero is in view. Fades out on first scroll (≥40px). Mobile only.

function MobileScrollCue() {
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setHidden(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      className="md:hidden fixed left-0 right-0 flex flex-col items-center pointer-events-none"
      style={{
        bottom: "max(20px, env(safe-area-inset-bottom))",
        zIndex: 40,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      transition={{
        opacity: { duration: hidden ? 0.18 : 0.6, delay: hidden ? 0 : 1.4 },
      }}
      aria-hidden={hidden}
    >
      <span
        style={{
          fontSize: 10,
          letterSpacing: "0.22em",
          color: "#a8a4a0",
          textTransform: "uppercase",
          fontWeight: 600,
          fontFamily: "var(--font-body)",
          marginBottom: 10,
        }}
      >
        Scroll to explore
      </span>
      <motion.svg
        width={12}
        height={18}
        viewBox="0 0 12 18"
        fill="none"
        animate={{ y: [0, 5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden
      >
        <path
          d="M6 1v12M2 10l4 4 4-4"
          stroke="#a8a4a0"
          strokeWidth={1.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}

// ─── Homepage ─────────────────────────────────────────────────────────────────

export default function Homepage() {
  const featuredProject = projects[0];
  const moreProjects = projects.slice(1);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [pauseAutoRotate, setPauseAutoRotate] = useState(false);

  // 3D tilt for featured card
  const featMX = useMotionValue(0);
  const featMY = useMotionValue(0);
  const featRotateX = useSpring(useTransform(featMY, [-0.5, 0.5], [4, -4]), { stiffness: 200, damping: 25 });
  const featRotateY = useSpring(useTransform(featMX, [-0.5, 0.5], [-4, 4]), { stiffness: 200, damping: 25 });
  const activeProject = projects.find((p) => p.id === activeProjectId) ?? null;

  useEffect(() => {
    if (pauseAutoRotate) return;
    const id = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % TESTIMONIALS.length);
    }, 4500);
    return () => clearInterval(id);
  }, [pauseAutoRotate]);

  return (
    <div style={{ background: "#ffffff", color: "#1c1917", overflowX: "clip" }}>

      {/* ── 1. Hero ───────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center relative pt-[64px]" style={{ background: "#ffffff" }}>
        {/* Noise shimmer background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <NoiseShimmer />
        </div>

        <div className="max-w-[1200px] mx-auto w-full relative z-10 px-6 lg:px-10 py-28 text-center">

          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-[12px] tracking-[0.18em] uppercase mb-10 font-semibold"
            style={{ color: "var(--terra-500)" }}
          >
            UX Design · Available for new projects
          </motion.p>

          {/* Hero headline — line-by-line clip entrance */}
          <h1
            className="tracking-tight leading-[1.0] mb-10"
            style={{
              fontSize: "clamp(3.2rem, 8.5vw, 7rem)",
              fontFamily: "var(--font-display)",
              fontWeight: 800,
            }}
          >
            {[
              { text: "UX Design.", color: "#1c1917" },
              { text: "AI Speed.", color: "var(--terra-500)" },
              { text: "Real Results.", color: "#8c8680" },
            ].map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.75, delay: 0.28 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                  style={{ color: line.color }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="text-xl md:text-2xl mb-14 max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#78716c" }}
          >
            I help <HighlightMark delay={1.4}>startups</HighlightMark> and <HighlightMark delay={1.65}>growth</HighlightMark>-stage companies ship better products faster —
            using AI-accelerated design workflows that cut delivery time without cutting quality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.72, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <a
              href="#work"
              className="group px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 text-sm font-semibold"
              style={{ background: "var(--terra-600)", color: "#ffffff" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--terra-500)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--terra-600)"}
            >
              See My Work
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#process"
              className="px-8 py-4 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-200 text-sm font-semibold"
              style={{
                border: "1px solid rgba(217,119,6,0.30)",
                color: "var(--terra-500)",
                background: "rgba(217,119,6,0.05)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(217,119,6,0.50)";
                (e.currentTarget as HTMLElement).style.background = "rgba(217,119,6,0.10)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(217,119,6,0.30)";
                (e.currentTarget as HTMLElement).style.background = "rgba(217,119,6,0.05)";
              }}
            >
              How I Work
            </a>
          </motion.div>

        </div>

      </section>

      {/* Mobile scroll-to-explore cue — FLOATING at viewport bottom (fixed).
          Position fixed so it sits at the bottom of the screen regardless
          of how tall the hero content is (on small phones the hero
          overflows the viewport and the cue would otherwise be off-screen).
          Auto-hides the moment the user starts scrolling. */}
      <MobileScrollCue />

      {/* ── 2. Metrics Strip ─────────────────────────────────────────────────── */}
      {(() => {
        const METRICS = [
          { num: 4, suffix: "×", label: "faster research synthesis", sub: "3–5 days vs. 2–4 weeks" },
          { num: 3, suffix: "×", label: "more concepts per budget", sub: "same dollar, more directions" },
          { num: 50, suffix: "%", label: "less handoff friction", sub: "annotated specs that ship" },
          { num: 9, suffix: " yrs", label: "product design experience", sub: "SaaS, fintech, enterprise" },
        ];

        return (
          <section style={{ background: "#f5f5f4", borderTop: "1px solid #e7e5e4", borderBottom: "1px solid #e7e5e4" }}>
            {/* Desktop: 2×2 / 4-up divided grid with counter-up animation */}
            <div className="hidden md:block">
              <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
                <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-200">
                  {METRICS.map((stat, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="px-8 py-12 text-center"
                    >
                      <div
                        className="font-bold tracking-tight mb-2 leading-none"
                        style={{
                          fontSize: "clamp(2.2rem, 4vw, 3.2rem)",
                          fontFamily: "var(--font-display)",
                          color: "var(--terra-500)",
                        }}
                      >
                        <AnimatedCounter value={stat.num} suffix={stat.suffix} />
                      </div>
                      <div className="text-[13px] font-medium mb-1 text-stone-700">{stat.label}</div>
                      <div className="text-[12px] text-stone-500">{stat.sub}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile: continuous marquee/ticker — ambient horizontal scroll.
                Content duplicated so the loop is seamless when translateX
                hits -50% (the duplicate is now in the original position). */}
            <div className="md:hidden overflow-hidden py-10 relative">
              {/* Soft edge masks — fade left/right to avoid hard cut-off at viewport edges */}
              <div
                aria-hidden
                className="absolute inset-y-0 left-0 z-10 pointer-events-none"
                style={{
                  width: 40,
                  background: "linear-gradient(to right, #f5f5f4 0%, rgba(245,245,244,0) 100%)",
                }}
              />
              <div
                aria-hidden
                className="absolute inset-y-0 right-0 z-10 pointer-events-none"
                style={{
                  width: 40,
                  background: "linear-gradient(to left, #f5f5f4 0%, rgba(245,245,244,0) 100%)",
                }}
              />

              <div className="metrics-marquee flex gap-6" style={{ width: "max-content" }}>
                {[...METRICS, ...METRICS].map((stat, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 text-center"
                    style={{ width: 240 }}
                  >
                    <div
                      className="font-bold tracking-tight mb-2 leading-none"
                      style={{
                        fontSize: "2.4rem",
                        fontFamily: "var(--font-display)",
                        color: "var(--terra-500)",
                      }}
                    >
                      {stat.num}{stat.suffix}
                    </div>
                    <div className="text-[14px] font-medium mb-1 text-stone-700">
                      {stat.label}
                    </div>
                    <div className="text-[12px] text-stone-500">{stat.sub}</div>
                  </div>
                ))}
              </div>

              <style>{`
                @keyframes metrics-marquee-anim {
                  from { transform: translateX(0); }
                  to   { transform: translateX(-50%); }
                }
                .metrics-marquee {
                  animation: metrics-marquee-anim 32s linear infinite;
                  will-change: transform;
                }
                @media (prefers-reduced-motion: reduce) {
                  .metrics-marquee { animation: none; }
                }
              `}</style>
            </div>
          </section>
        );
      })()}

      {/* ── 3. Case Studies ──────────────────────────────────────────────────── */}
      <section id="work" className="py-32 relative" style={{ background: "radial-gradient(ellipse at 80% -5%, rgba(196,82,42,0.055) 0%, transparent 52%), #ffffff" }}>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <p
              className="text-[12px] font-semibold tracking-[0.14em] uppercase mb-5"
              style={{ color: "var(--terra-500)" }}
            >
              Selected Work
            </p>
            <h2
              className="font-bold tracking-tight leading-tight"
              style={{
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                fontFamily: "var(--font-display)",
                color: "#1c1917",
              }}
            >
              Problems solved.<br />
              <span style={{ color: "#8c8680" }}>Numbers attached.</span>
            </h2>
          </motion.div>

          {/* ── Featured card ── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden mb-5"
            style={{
              background: "#ffffff",
              border: "1px solid #e7e5e4",
              boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
              rotateX: featRotateX,
              rotateY: featRotateY,
              transformPerspective: 1200,
            }}
            onMouseMove={e => {
              const r = e.currentTarget.getBoundingClientRect();
              featMX.set((e.clientX - r.left) / r.width - 0.5);
              featMY.set((e.clientY - r.top) / r.height - 0.5);
            }}
            onMouseLeave={() => { featMX.set(0); featMY.set(0); }}
          >

            {/* Image area — gradient top, image blends in from below
                Mobile uses a much larger 56vw min so the hero image is
                truly hero-sized (was 30vw which collapsed to 96px on
                a 320px viewport). */}
            <div
              className="relative overflow-hidden"
              style={{
                height: "clamp(240px, 56vw, 400px)",
                background: "linear-gradient(to bottom, rgba(196,82,42,0.12) 0%, rgba(247,243,240,1) 42%, white 72%)",
              }}
            >
              <div className="absolute bottom-0 inset-x-0" style={{ height: "90%" }}>
                <motion.img
                  src="/Featured Project Hero Image.png"
                  alt={featuredProject.title}
                  initial={{ scale: 1.04, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                  className="w-full h-full object-cover object-left-top"
                  style={{ borderRadius: "10px 10px 0 0", filter: "drop-shadow(0 -6px 18px rgba(0,0,0,0.09))" }}
                />
              </div>

            </div>

            {/* Content below */}
            <div className="p-6 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:gap-16 lg:items-start">

                {/* Left: tags + title */}
                <div className="flex-1 min-w-0 lg:max-w-[48%]">
                  <div className="flex flex-wrap items-center gap-5 mb-5 text-[12px]">
                    <HighlightMark delay={0.2}>{featuredProject.category}</HighlightMark>
                    <span className="text-stone-400">·</span>
                    <HighlightMark delay={0.45}>{featuredProject.clientSize}</HighlightMark>
                    <span className="text-stone-400">·</span>
                    <HighlightMark delay={0.7}>{featuredProject.timeline}</HighlightMark>
                  </div>
                  <h3
                    className="font-bold tracking-tight leading-tight"
                    style={{ fontSize: "clamp(1.5rem, 3vw, 2.4rem)", fontFamily: "var(--font-display)", color: "#1c1917" }}
                  >
                    {featuredProject.title}
                  </h3>
                </div>

                {/* Right: description + CTA */}
                <div className="flex-1 mt-6 lg:mt-0 flex flex-col gap-7 justify-center">
                  <p className="text-base leading-relaxed text-stone-500">
                    An AI-native security platform that connects vulnerabilities across code,
                    teams, and ownership — helping organisations see not just what's broken,
                    but who owns it, why it matters, and how to act on it.
                  </p>
                  <Link
                    to={`/case-study/${featuredProject.id}`}
                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-200 text-sm font-semibold self-start"
                    style={{ background: "var(--terra-600)", color: "#ffffff" }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--terra-500)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--terra-600)"}
                  >
                    Read Full Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>

          {/* ── 2 project cards — desktop connected cluster ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block rounded-2xl overflow-hidden"
            style={{ border: "1px solid #e7e5e4" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {moreProjects.slice(0, 2).map((project, i) => (
                <Link
                  key={project.id}
                  to={`/case-study/${project.id}`}
                  className="group cursor-pointer flex flex-col"
                  style={{ borderLeft: i > 0 ? "1px solid #ece8e6" : undefined, textDecoration: "none" }}
                >
                  {/* Image area — padded, blends into card */}
                  <div className="relative" style={{ height: "300px" }}>
                    <motion.div
                      className="absolute inset-9 bottom-6"
                      initial={{ y: 22, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.55, delay: 0.08 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img
                        src={project.heroImage ?? "/Hero Image.png"}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        style={{
                          borderRadius: "10px 10px 0 0",
                          filter: "drop-shadow(0 -6px 20px rgba(0,0,0,0.11))",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="px-10 pt-10 pb-12 flex flex-col gap-7 flex-1">
                    <div className="text-[11px]">
                      <HighlightMark delay={0.2 + i * 0.2}>{project.category}</HighlightMark>
                    </div>
                    <h3
                      className="text-[16px] font-bold tracking-tight leading-snug text-stone-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-[13px] line-clamp-2 leading-relaxed flex-1" style={{ color: "#78716c" }}>
                      {project.description}
                    </p>
                    <div
                      className="flex items-center gap-1 transition-all group-hover:gap-2 self-start"
                      style={{ color: "var(--terra-500)" }}
                    >
                      <span className="text-[12px] font-medium">View case study</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* ── 2 project cards — mobile carousel ──
              Swipe horizontally between secondary projects. Each card
              has its own border (independent unit), reduced padding,
              and a tighter image height appropriate for mobile. */}
          <div className="lg:hidden -mx-6">
            <MobileCarousel
              cardWidthPercent={86}
              gap={14}
              snap="center"
              ariaLabel="More case studies"
            >
              {moreProjects.slice(0, 2).map((project, i) => (
                <Link
                  key={project.id}
                  to={`/case-study/${project.id}`}
                  className="group flex h-full flex-col rounded-2xl overflow-hidden"
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e7e5e4",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                    textDecoration: "none",
                  }}
                >
                  {/* Image area — responsive height for mobile */}
                  <div className="relative" style={{ height: "clamp(200px, 48vw, 260px)" }}>
                    <motion.div
                      className="absolute"
                      style={{ inset: 22, bottom: 14 }}
                      initial={{ y: 16, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5, delay: 0.06 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <img
                        src={project.heroImage ?? "/Hero Image.png"}
                        alt={project.title}
                        className="w-full h-full object-cover object-top"
                        style={{
                          borderRadius: "10px 10px 0 0",
                          filter: "drop-shadow(0 -4px 14px rgba(0,0,0,0.10))",
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Content — reduced mobile padding */}
                  <div className="px-6 pt-6 pb-7 flex flex-col gap-5 flex-1">
                    <div className="text-[12px]">
                      <HighlightMark delay={0.2 + i * 0.2}>{project.category}</HighlightMark>
                    </div>
                    <h3
                      className="text-[17px] font-bold tracking-tight leading-snug text-stone-900"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className="text-[14px] line-clamp-3 leading-relaxed flex-1"
                      style={{ color: "#78716c" }}
                    >
                      {project.description}
                    </p>
                    <div
                      className="flex items-center gap-1.5 self-start"
                      style={{ color: "var(--terra-500)" }}
                    >
                      <span className="text-[13px] font-medium">View case study</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </MobileCarousel>
          </div>
        </div>
      </section>

      {/* ── 4. Testimonials ──────────────────────────────────────────────────── */}
      <section
        id="clients"
        className="py-28 relative"
        style={{ background: "#f5f5f4", borderTop: "1px solid #e7e5e4" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-10 flex items-end justify-between flex-wrap gap-4"
          >
            <div>
              <p
                className="text-[12px] font-semibold tracking-[0.14em] uppercase mb-4"
                style={{ color: "var(--terra-500)" }}
              >
                Client Feedback
              </p>
              <h2
                className="font-bold tracking-tight"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.2rem)",
                  fontFamily: "var(--font-display)",
                  color: "#1c1917",
                }}
              >
                What clients say.
              </h2>
            </div>
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full self-start"
              style={{ background: "#ffffff", border: "1px solid #e7e5e4" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3" fill="var(--terra-500)" style={{ color: "var(--terra-500)" }} />
                ))}
              </div>
              <span className="text-[12px] font-medium text-stone-600">5.0 on Upwork</span>
            </div>
          </motion.div>

          {/* World Map — stays within content padding (no edge-to-edge
              bleed on mobile). Because the SVG aspect ratio is preserved,
              keeping it inside the container also keeps the height modest. */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-5"
          >
            <WorldMap activeIndex={activeTestimonial} />
          </motion.div>

          {/* Desktop: 3-up grid with click-to-activate */}
          <div
            className="hidden md:grid grid-cols-3 gap-4"
            onMouseEnter={() => setPauseAutoRotate(true)}
            onMouseLeave={() => setPauseAutoRotate(false)}
          >
            {TESTIMONIALS.map((t, i) => {
              const isActive = i === activeTestimonial;
              return (
                <motion.button
                  key={t.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.10, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  onClick={() => setActiveTestimonial(i)}
                  className="text-left p-7 rounded-2xl flex flex-col gap-4 transition-all duration-300 w-full"
                  style={{
                    background: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                    border: isActive ? "1px solid #d6d3d1" : "1px solid #e7e5e4",
                    boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
                  }}
                >
                  {/* Quote mark */}
                  <div
                    className="text-4xl font-bold leading-none select-none"
                    style={{ color: isActive ? "var(--terra-400)" : "var(--terra-light)", fontFamily: "var(--font-display)", lineHeight: 0.9 }}
                  >"</div>

                  {/* Quote */}
                  <p className="text-[14px] leading-relaxed flex-1 text-stone-600 -mt-1">
                    {t.quote}
                  </p>

                  {/* Stars */}
                  <div className="flex gap-0.5">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-3 h-3" fill={isActive ? "var(--terra-500)" : "#d6d3d1"} style={{ color: isActive ? "var(--terra-500)" : "#d6d3d1" }} />
                    ))}
                  </div>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 pt-3" style={{ borderTop: `1px solid ${isActive ? "#e7e5e4" : "#ece9e6"}` }}>
                    <div>
                      <div className="text-[14px] font-semibold text-stone-800">{t.name}</div>
                      <div className="text-[12px] text-stone-500">{t.role} · {t.company}</div>
                      <div className="text-[12px] mt-0.5" style={{ color: isActive ? "var(--terra-500)" : "#78716c" }}>{t.location}</div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile: swipe carousel — drives the world-map active marker
              via onActiveChange. Centered card has full "active" treatment,
              siblings dim back to the inactive visual style (matches the
              desktop active/inactive pattern). */}
          <div className="md:hidden -mx-6">
            <MobileCarousel
              cardWidthPercent={84}
              gap={14}
              snap="center"
              initialIndex={activeTestimonial}
              onActiveChange={(idx) => setActiveTestimonial(idx)}
              ariaLabel="Client testimonials"
            >
              {TESTIMONIALS.map((t, i) => {
                const isActive = i === activeTestimonial;
                return (
                  <div
                    key={t.name}
                    className="h-full p-7 rounded-2xl flex flex-col gap-4 transition-all duration-300"
                    style={{
                      background: isActive ? "#ffffff" : "rgba(255,255,255,0.5)",
                      border: isActive ? "1px solid #d6d3d1" : "1px solid #e7e5e4",
                      boxShadow: isActive ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
                    }}
                  >
                    {/* Quote mark */}
                    <div
                      className="text-4xl font-bold leading-none select-none"
                      style={{
                        color: isActive ? "var(--terra-400)" : "var(--terra-light)",
                        fontFamily: "var(--font-display)",
                        lineHeight: 0.9,
                      }}
                    >
                      {'“'}
                    </div>

                    {/* Quote */}
                    <p className="text-[14px] leading-relaxed flex-1 text-stone-600 -mt-1">
                      {t.quote}
                    </p>

                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star
                          key={j}
                          className="w-3 h-3"
                          fill={isActive ? "var(--terra-500)" : "#d6d3d1"}
                          style={{ color: isActive ? "var(--terra-500)" : "#d6d3d1" }}
                        />
                      ))}
                    </div>

                    {/* Attribution */}
                    <div
                      className="flex items-center gap-3 pt-3"
                      style={{ borderTop: `1px solid ${isActive ? "#e7e5e4" : "#ece9e6"}` }}
                    >
                      <div>
                        <div className="text-[14px] font-semibold text-stone-800">{t.name}</div>
                        <div className="text-[12px] text-stone-500">{t.role} · {t.company}</div>
                        <div
                          className="text-[12px] mt-0.5"
                          style={{ color: isActive ? "var(--terra-500)" : "#78716c" }}
                        >
                          {t.location}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </MobileCarousel>
          </div>

          {/* Upwork CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-5 rounded-2xl"
            style={{ background: "#ffffff", border: "1px solid #e7e5e4" }}
          >
            <p className="text-[14px] text-stone-500">
              More verified client reviews available on my Upwork profile.
            </p>
            <a
              href="https://upwork.com"
              target="_blank"
              rel="noopener noreferrer"
              className="self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
              style={{ border: "1px solid #e7e5e4", color: "#57534e" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.borderColor = "#1c1917"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = "#e7e5e4"}
            >
              View Upwork profile
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ── 5. How I Work ────────────────────────────────────────────────────── */}
      <section id="process">
        <IcebergSection />
      </section>

      {/* ── 6. Services ──────────────────────────────────────────────────────── */}
      <WhoItsFor />

      {/* ── 7. About ──────────────────────────────────────────────────────────── */}
      <section
        id="about"
        className="py-32 relative"
        style={{ background: "radial-gradient(ellipse at 100% 50%, rgba(196,82,42,0.05) 0%, transparent 48%), #ffffff", borderTop: "1px solid #e7e5e4" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-3"
            >
              <p
                className="text-[12px] font-semibold tracking-[0.14em] uppercase mb-5"
                style={{ color: "var(--terra-500)" }}
              >
                About
              </p>
              <h2
                className="font-bold tracking-tight leading-tight mb-8"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 4rem)",
                  fontFamily: "var(--font-display)",
                  color: "#1c1917",
                }}
              >
                UX Designer.<br />
                <span style={{ color: "#8c8680" }}>AI Practitioner.</span>
              </h2>
              <div className="space-y-5 text-[16px] leading-relaxed text-stone-500">
                <p>
                  I'm Harsha — a UX designer with 9 years of experience building products at the
                  intersection of user needs and business goals — and the last few years specifically
                  building AI into every part of that process.
                </p>
                <p>
                  That means research synthesis in hours, more design directions per dollar, and
                  documentation that engineers actually read. The result for clients: faster timelines,
                  more considered designs, and handoffs that stick.
                </p>
                <p>
                  I've worked across SaaS, fintech, healthtech, and enterprise software — with
                  early-stage founders who needed to move fast, and product org leads who needed to
                  move carefully.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-[13px] font-semibold mt-8 transition-colors duration-200 group"
                style={{ color: "var(--terra-500)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color = "var(--terra-600)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color = "var(--terra-500)"}
              >
                Get in touch
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Industries card */}
              {(() => {
                const INDUSTRIES = [
                  "SaaS & Productivity Tools",
                  "FinTech & Financial Services",
                  "HealthTech & Wellness",
                  "Enterprise Software",
                  "Consumer Mobile Apps",
                  "AI & Data Products",
                ];
                return (
                  <div
                    className="p-7 rounded-2xl"
                    style={{ background: "#f5f5f4", border: "1px solid #e7e5e4" }}
                  >
                    <h3
                      className="text-[13px] font-semibold mb-5 flex items-center gap-2 text-stone-700"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      <TrendingUp className="w-4 h-4" style={{ color: "var(--terra-500)" }} />
                      Industries Served
                    </h3>

                    {/* Desktop: vertical list with arrow bullets */}
                    <ul className="hidden md:block space-y-2.5">
                      {INDUSTRIES.map((ind) => (
                        <li key={ind} className="flex items-center gap-2.5 text-[13px] text-stone-500">
                          <span style={{ color: "var(--terra-500)" }}>→</span>
                          {ind}
                        </li>
                      ))}
                    </ul>

                    {/* Mobile: chip cluster wraps onto multiple rows.
                        Each industry is a pill, the cluster flows in 2–3
                        rows depending on viewport width. No scrolling,
                        every industry visible at a glance. */}
                    <div className="md:hidden flex flex-wrap gap-2">
                      {INDUSTRIES.map((ind) => (
                        <span
                          key={ind}
                          className="inline-flex items-center text-[13px] font-medium px-3.5 py-2 rounded-full"
                          style={{
                            background: "#ffffff",
                            border: "1px solid #e2ded9",
                            color: "#57534e",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* Availability card */}
              <div
                className="p-5 rounded-2xl"
                style={{ background: "var(--terra-light)", border: "1px solid var(--terra-border)" }}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ background: "var(--terra-500)" }}
                  />
                  <span className="text-[13px] font-semibold" style={{ color: "var(--terra-500)" }}>
                    Available for New Projects
                  </span>
                </div>
                <p className="text-[12px] text-stone-500">
                  Taking on select projects starting immediately. Proposals within 48 hours.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 8. Contact ───────────────────────────────────────────────────────── */}
      <ContactSection />

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer
        className="py-8"
        style={{ background: "#ffffff", borderTop: "1px solid #e7e5e4" }}
      >
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2.5">
              <div
                className="w-[6px] h-[6px] rounded-full"
                style={{ background: "var(--terra-500)" }}
              />
              <span
                className="text-[12px] font-semibold tracking-[0.10em] uppercase text-stone-500"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Harsha
              </span>
              <span className="text-stone-400 text-[12px]">· UX Designer · © 2026</span>
            </div>
            <div className="flex gap-7 text-[12px] text-stone-500">
              {["Dribbble", "Twitter", "LinkedIn"].map((link) => (
                <a
                  key={link}
                  href={`https://${link.toLowerCase()}.com`}
                  className="transition-colors duration-200 hover:text-stone-700"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* ── Case Study Modal ─────────────────────────────────────────────────── */}
      <CaseStudyModal
        project={activeProject}
        onClose={() => setActiveProjectId(null)}
      />
    </div>
  );
}
