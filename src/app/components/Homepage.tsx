import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import {
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Star,
  ChevronRight,
} from "lucide-react";
import { projects } from "../data/projects";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import WhoItsFor from "./WhoItsFor";

// ─── AI Stack Data ────────────────────────────────────────────────────────────

const AI_STACK = [
  {
    number: "01",
    phase: "Discover",
    tools: [
      { name: "Claude", color: "blue" },
      { name: "Otter.ai", color: "blue" },
      { name: "Maze", color: "blue" },
    ],
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
    phaseColor: "from-blue-600 to-indigo-600",
  },
  {
    number: "02",
    phase: "Synthesise",
    tools: [
      { name: "Dovetail AI", color: "indigo" },
      { name: "GPT-4", color: "indigo" },
      { name: "Miro AI", color: "indigo" },
    ],
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
    phaseColor: "from-indigo-600 to-violet-600",
  },
  {
    number: "03",
    phase: "Ideate",
    tools: [
      { name: "Midjourney", color: "violet" },
      { name: "GPT-4", color: "violet" },
      { name: "Framer AI", color: "violet" },
    ],
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
    phaseColor: "from-violet-600 to-purple-600",
  },
  {
    number: "04",
    phase: "Design",
    tools: [
      { name: "Figma AI", color: "cyan" },
      { name: "v0", color: "cyan" },
      { name: "Framer", color: "cyan" },
    ],
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
    phaseColor: "from-cyan-600 to-blue-600",
  },
  {
    number: "05",
    phase: "Deliver",
    tools: [
      { name: "Claude", color: "emerald" },
      { name: "Notion AI", color: "emerald" },
      { name: "Figma", color: "emerald" },
    ],
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
    phaseColor: "from-emerald-600 to-green-600",
  },
];

const TOOL_COLORS: Record<string, string> = {
  blue: "bg-blue-500/10 border-blue-500/20 text-blue-200/80",
  indigo: "bg-indigo-500/10 border-indigo-500/20 text-indigo-200/80",
  violet: "bg-violet-500/10 border-violet-500/20 text-violet-200/80",
  cyan: "bg-cyan-500/10 border-cyan-500/20 text-cyan-200/80",
  emerald: "bg-emerald-500/10 border-emerald-500/20 text-emerald-200/80",
};

// Per-layer colors: top face (lightest), left-front face (darkest), right-front face (medium)
const LAYER_GRADIENTS = [
  { top: "rgba(59,130,246,0.45)",  front: "rgba(30,64,175,0.90)",   side: "rgba(37,99,235,0.65)",   border: "rgba(96,165,250,0.30)",  accent: "from-blue-500 to-indigo-500"   },
  { top: "rgba(99,102,241,0.45)", front: "rgba(67,56,202,0.90)",   side: "rgba(79,70,229,0.65)",   border: "rgba(129,140,248,0.30)", accent: "from-indigo-500 to-violet-500" },
  { top: "rgba(139,92,246,0.45)", front: "rgba(109,40,217,0.90)",  side: "rgba(124,58,237,0.65)",  border: "rgba(167,139,250,0.30)", accent: "from-violet-500 to-purple-500" },
  { top: "rgba(6,182,212,0.45)",  front: "rgba(14,116,144,0.90)",  side: "rgba(8,145,178,0.65)",   border: "rgba(34,211,238,0.30)",  accent: "from-cyan-500 to-blue-500"     },
  { top: "rgba(16,185,129,0.45)", front: "rgba(4,120,87,0.90)",    side: "rgba(5,150,105,0.65)",   border: "rgba(52,211,153,0.30)",  accent: "from-emerald-500 to-green-500" },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote:
      "Delivered a full design system in 8 weeks that our previous agency quoted 6 months for. The quality was exceptional and the handoff was the cleanest we've ever received.",
    name: "Sarah Kim",
    role: "VP of Product",
    company: "Series B SaaS",
    rating: 5,
  },
  {
    quote:
      "What stood out was the speed without sacrificing depth. We had a usability-tested, dev-ready prototype for our investor demo in 3 weeks. Highly recommend.",
    name: "Marcus Osei",
    role: "Co-founder & CEO",
    company: "FinTech Startup",
    rating: 5,
  },
  {
    quote:
      "Finally a designer who understands enterprise constraints. The AI workflow breakdowns in every deliverable helped our team understand the decisions — not just the output.",
    name: "Priya Nair",
    role: "Director of UX",
    company: "Enterprise Healthcare",
    rating: 5,
  },
];

// ─── AI Stack: Left-Right Interactive Layout ────────────────────────────────

function StackWithDetail() {
  const [active, setActive] = useState(0);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const accordionRef = React.useRef<HTMLDivElement>(null);
  const [accordionH, setAccordionH] = React.useState(0);

  React.useEffect(() => {
    if (!accordionRef.current) return;
    const ro = new ResizeObserver(([entry]) => setAccordionH(entry.contentRect.height));
    ro.observe(accordionRef.current);
    return () => ro.disconnect();
  }, []);

  const W = 260;
  const HH = 62;
  const DEPTH = 28;
  // Calculate overlap so the stack fills exactly the accordion height
  const diamondH = HH * 2 + DEPTH;
  const count = AI_STACK.length;
  const overlap = accordionH > 0
    ? Math.max(0, (count * diamondH - accordionH) / (count - 1))
    : 50;

  return (
    <div className="hidden lg:flex justify-center items-start gap-28">
      {/* Left: Diamond stack — height matches accordion */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center flex-shrink-0"
      >
        {AI_STACK.map((s, i) => {
          const l = LAYER_GRADIENTS[i];
          const isActive = i === active;
          return (
            <button
              key={s.phase}
              onClick={() => setActive(i)}
              className="relative cursor-pointer flex flex-col items-center"
              style={{
                width: W,
                marginTop: i === 0 ? 0 : -overlap,
                zIndex: isActive ? 10 : count - i,
                transition: "transform 0.4s cubic-bezier(.4,0,.2,1), filter 0.4s cubic-bezier(.4,0,.2,1)",
                transform: isActive ? "scale(1.08) translateY(-2px)" : "scale(1)",
                filter: isActive
                  ? `brightness(${isDark ? 1.35 : 1.1}) drop-shadow(0 4px 18px ${l.border})`
                  : `brightness(${isDark ? 0.65 : 0.85}) saturate(${isDark ? 0.5 : 0.4}) opacity(0.7)`,
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
                    fontSize: 11,
                    color: isActive
                      ? (isDark ? "rgba(255,255,255,0.95)" : "rgba(0,0,0,0.85)")
                      : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.45)"),
                    transition: "color 0.4s ease",
                  }}
                >
                  {s.phase}
                </span>
              </div>
            </button>
          );
        })}
      </motion.div>

      {/* Right: Accordion panel */}
      <div
        ref={accordionRef}
        className="w-[400px] flex-shrink-0 rounded-xl transition-colors duration-300"
        style={{
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
          border: isDark ? "1px solid rgba(255,255,255,0.10)" : "1px solid rgba(0,0,0,0.12)",
          boxShadow: isDark ? "none" : "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03)",
        }}
      >
        {AI_STACK.map((s, i) => {
          const l = LAYER_GRADIENTS[i];
          const isOpen = i === active;
          return (
            <div
              key={s.phase}
              style={{ borderBottom: i < count - 1 ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` : "none" }}
            >
              {/* Header */}
              <button
                onClick={() => setActive(i)}
                className="w-full flex items-center justify-between px-5 py-3 text-left transition-colors duration-200"
                style={{ background: isOpen ? (isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)") : "transparent" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold transition-all duration-300"
                    style={{
                      background: isOpen ? `linear-gradient(135deg, ${l.front}, ${l.side})` : (isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"),
                      color: isOpen ? "white" : (isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)"),
                    }}
                  >
                    {s.number}
                  </span>
                  <span
                    className="text-sm font-medium transition-colors duration-300"
                    style={{ color: isOpen ? (isDark ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.85)") : (isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)") }}
                  >
                    {s.phase}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {!isOpen && (
                    <span className="text-[11px] text-white/25">
                      {s.agents.length} agents · {s.tools.length} tools
                    </span>
                  )}
                  <ChevronRight
                    className="w-3.5 h-3.5 transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      color: isOpen ? (isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)") : (isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)"),
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
                    <div className="px-5 pb-5 pt-2 space-y-4">
                      {/* Time */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/25 line-through">{s.timeBefore}</span>
                        <ArrowRight className="w-3 h-3 text-white/15" />
                        <span className="text-xs text-emerald-400 font-semibold">{s.timeAfter}</span>
                      </div>

                      {/* Agents */}
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2.5">Agents</p>
                        <div className="space-y-2.5">
                          {s.agents.map((agent) => (
                            <div key={agent.name}>
                              <p className="text-[13px] text-white/80 font-medium">{agent.name}</p>
                              <p className="text-[12px] text-white/35 leading-relaxed mt-0.5">{agent.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Workflows */}
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2.5">Workflows</p>
                        <div className="space-y-2">
                          {s.workflows.map((wf) => (
                            <div key={wf} className="flex items-start gap-2.5">
                              <span className="w-1 h-1 rounded-full bg-emerald-400/40 mt-[7px] flex-shrink-0" />
                              <p className="text-[12px] text-white/40 leading-relaxed">{wf}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Tools */}
                      <div className="pt-3 border-t border-white/[0.06]">
                        <p className="text-[10px] uppercase tracking-widest text-white/25 mb-2">Tools</p>
                        <div className="flex flex-wrap gap-1.5">
                          {s.tools.map((t) => (
                            <span key={t.name} className={`px-2.5 py-0.5 border rounded-full text-[11px] ${TOOL_COLORS[t.color]}`}>
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

// ─── Component ────────────────────────────────────────────────────────────────

export default function Homepage() {
  const featuredProject = projects[0];
  const moreProjects = projects.slice(1);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="pt-20 bg-surface text-on-surface overflow-hidden transition-colors duration-300">

      {/* ── 1. Hero ───────────────────────────────────────────────────────────── */}
      <section className="min-h-screen flex items-center relative">
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0a1628_0%,#000000_100%)]" />
          <motion.div
            animate={{ x: [0, 100, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -100, 0], y: [0, 100, 0], scale: [1.2, 1, 1.2] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-tr from-cyan-600/30 via-blue-600/20 to-transparent rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -50, 0], y: [0, -50, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-violet-600/20 via-purple-600/10 to-transparent rounded-full blur-3xl"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 p-[48px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: text content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full mb-8"
              >
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full animate-pulse" />
                <span className="text-sm text-blue-200 tracking-wide">AI-Powered UX Design</span>
                <Sparkles className="w-4 h-4 text-blue-400" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-6xl md:text-7xl lg:text-[7.5rem] mb-8 tracking-tighter leading-[0.9]"
              >
                <span className="block">UX Design.</span>
                <span className="block bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                  AI Speed.
                </span>
                <span className="block">Real Results.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-white/60 mb-12 max-w-3xl leading-relaxed"
              >
                I help startups and growth-stage companies ship better products faster —
                using AI-accelerated design workflows that cut delivery time without cutting quality.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#work"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{ color: "#ffffff" }}
                >
                  <span className="relative z-10">See My Work</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                </a>
                <a
                  href="#how-i-work"
                  className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-full hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 inline-flex items-center justify-center gap-2"
                >
                  How I Work
                </a>
              </motion.div>
            </div>

            {/* Right: floating stat cards */}
            <div className="hidden lg:flex flex-col gap-5 items-end">
              {([
                { value: "40%", label: "faster delivery vs. traditional UX process", Icon: Zap, iconColor: "text-blue-400", bg: "bg-blue-500/15", delay: 0.6, dur: 5 },
                { value: "20+", label: "projects shipped across SaaS, FinTech & HealthTech", Icon: TrendingUp, iconColor: "text-emerald-400", bg: "bg-emerald-500/15", delay: 0.75, dur: 7 },
                { value: "5.0★", label: "average client rating on Upwork", Icon: Star, iconColor: "text-yellow-400", bg: "bg-yellow-500/15", delay: 0.9, dur: 6 },
              ] as const).map(({ value, label, Icon, iconColor, bg, delay, dur }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay }}
                  className={i === 1 ? "self-center" : i === 2 ? "self-end" : "self-start"}
                >
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: dur, repeat: Infinity, ease: "easeInOut" }}
                    className="p-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl min-w-[220px] hover:border-blue-500/25 transition-colors"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${iconColor}`} />
                      </div>
                      <span className="text-3xl font-light tracking-tighter text-white">{value}</span>
                    </div>
                    <p className="text-sm text-white/40 leading-snug pl-11">{label}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-blue-500/30 rounded-full flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1.5 h-3 bg-gradient-to-b from-blue-500 to-cyan-400 rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* ── 2. AI Workflow Stack ──────────────────────────────────────────────── */}
      <section id="how-i-work" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-950/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          {/* Centered headline + horizontal stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500/10 backdrop-blur-xl border border-violet-500/20 rounded-full mb-8">
              <Zap className="w-4 h-4 text-violet-400" />
              <span className="text-sm text-violet-200/80 tracking-wide">The AI Difference</span>
            </div>
            <h2 className="text-5xl md:text-6xl tracking-tighter leading-tight mb-6">
              <span className="bg-gradient-to-r from-blue-200 via-violet-200 to-cyan-200 bg-clip-text text-transparent">
                Every phase.
              </span>
              <br />
              <span className="text-white">AI-accelerated.</span>
            </h2>
            <p className="text-lg text-white/50 leading-relaxed mb-12">
              The same rigour as a full design team — at a fraction of the time and cost. AI is embedded in every step, not bolted on at the end.
            </p>
            <div className="flex justify-center gap-8 lg:gap-12">
              {[
                { value: "4×", label: "faster research synthesis", detail: "3–5 days vs. 2–4 weeks" },
                { value: "3×", label: "more concepts per project", detail: "same budget, more directions explored" },
                { value: "50%", label: "less handoff friction", detail: "annotated specs engineers actually use" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-light tracking-tighter bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                  <div className="text-white/35 text-[11px] mt-0.5">{stat.detail}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Desktop: Left stack + Right detail panel */}
          <StackWithDetail />

          {/* Mobile: stacked cards */}
          <div className="lg:hidden space-y-4">
            {AI_STACK.map((item, i) => {
              const layer = LAYER_GRADIENTS[i];
              return (
                <motion.div
                  key={item.phase}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-4 rounded-xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: `1px solid ${layer.border}` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-1 h-8 rounded-full bg-gradient-to-b ${item.phaseColor} flex-shrink-0`} />
                      <div>
                        <div className="text-sm text-white/90 font-medium">{item.phase}</div>
                        <div className="text-xs text-white/35 mt-0.5">{item.output}</div>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div className="text-[10px] text-white/25 line-through">{item.timeBefore}</div>
                      <div className="text-xs text-emerald-400 font-medium">{item.timeAfter}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-white/25 mb-1.5">Agents</div>
                      {item.agents.map((a) => (
                        <div key={a.name} className="mb-1.5 last:mb-0">
                          <div className="text-[11px] text-white/70 font-medium">{a.name}</div>
                          <div className="text-[10px] text-white/30 leading-snug">{a.description}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="text-[9px] uppercase tracking-wider text-white/25 mb-1.5">Workflows</div>
                      {item.workflows.map((wf) => (
                        <div key={wf} className="flex gap-1.5 mb-1.5 last:mb-0">
                          <span className="text-white/20 text-[10px] mt-px flex-shrink-0">-</span>
                          <span className="text-[10px] text-white/40 leading-snug">{wf}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/5">
                    {item.tools.map((t) => (
                      <span key={t.name} className={`px-2 py-0.5 border rounded-full text-[10px] ${TOOL_COLORS[t.color]}`}>
                        {t.name}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Featured Case Study ────────────────────────────────────────────── */}
      <section id="work" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-200/80 tracking-wide">Featured Project</span>
            </div>
            <h2 className="text-5xl md:text-7xl tracking-tighter leading-tight">
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                Work that ships.
              </span>
            </h2>
          </motion.div>

          {/* Featured card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`relative rounded-3xl overflow-hidden border mb-6 transition-colors duration-300 ${isDark ? "border-blue-500/20" : "border-blue-500/15 shadow-lg shadow-blue-500/5"}`}
          >
            {/* Background image */}
            <div className="absolute inset-0">
              <ImageWithFallback
                src={featuredProject.image}
                alt={featuredProject.title}
                className={`w-full h-full object-cover ${isDark ? "opacity-15" : "opacity-8"}`}
              />
              <div className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-black via-black/90 to-black/70" : "bg-gradient-to-br from-white via-white/95 to-blue-50/80"}`} />
            </div>

            <div className="relative p-8 lg:p-12">
              {/* Two-column layout on desktop */}
              <div className="flex flex-col lg:flex-row lg:gap-12">
                {/* Left column — text + CTA */}
                <div className="flex-1 min-w-0">
                  <span className={`inline-block px-3 py-1.5 rounded-full text-xs mb-5 ${isDark ? "bg-blue-500/20 border border-blue-500/30 text-blue-300" : "bg-blue-500/10 border border-blue-500/20 text-blue-700"}`}>
                    {featuredProject.category}
                  </span>

                  <h3 className={`text-3xl md:text-4xl lg:text-5xl tracking-tighter mb-3 leading-tight ${isDark ? "" : "text-gray-900"}`}>
                    {featuredProject.title}
                  </h3>
                  <p className={`text-base lg:text-lg leading-relaxed mb-6 ${isDark ? "text-white/55" : "text-gray-500"}`}>
                    Unified 3 platforms under one AI-assisted design system — catching accessibility issues before handoff, not after.
                  </p>

                  {/* AI tools — minimal pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-6">
                    <span className={`text-[10px] uppercase tracking-widest mr-1 ${isDark ? "text-white/25" : "text-gray-400"}`}>AI-powered</span>
                    {[...new Set(featuredProject.aiWorkflow.flatMap(s => s.tool.split(" + ").map(t => t.trim())))].map((tool) => (
                      <span
                        key={tool}
                        className={`px-2.5 py-0.5 rounded-full text-[11px] ${isDark ? "bg-violet-500/10 border border-violet-500/20 text-violet-300/70" : "bg-violet-50 border border-violet-500/15 text-violet-600/70"}`}
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/project/${featuredProject.id}`}
                    className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 relative overflow-hidden"
                    style={{ color: "#ffffff" }}
                  >
                    <span className="relative z-10 text-sm">Read Full Case Study</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform relative z-10" />
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                  </Link>
                </div>

                {/* Right column — outcome metrics */}
                <div className="flex flex-col gap-3 mt-8 lg:mt-0 lg:w-[320px] lg:flex-shrink-0 lg:justify-center">
                  {featuredProject.outcomes.slice(0, 3).map((outcome, i) => {
                    const match = outcome.match(/^(\d+(?:\.\d+)?(?:%|x|\+)?)\s+(.+)/i);
                    return match ? (
                      <div
                        key={i}
                        className={`px-5 py-3.5 rounded-xl flex items-baseline gap-3 ${isDark ? "bg-white/5 border border-blue-500/15" : "bg-blue-50/50 border border-blue-500/10"}`}
                      >
                        <span className={`text-2xl font-light tracking-tighter bg-clip-text text-transparent ${isDark ? "bg-gradient-to-br from-emerald-400 to-cyan-400" : "bg-gradient-to-br from-emerald-600 to-cyan-600"}`}>
                          {match[1]}
                        </span>
                        <span className={`text-xs leading-snug capitalize ${isDark ? "text-white/50" : "text-gray-500"}`}>
                          {match[2]}
                        </span>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── 5. More Projects grid ──────────────────────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {moreProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative"
              >
                <Link to={`/project/${project.id}`} className="block">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 group-hover:border-blue-500/30 transition-all">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      {/* Key outcome overlay */}
                      {(() => {
                        const match = project.outcomes[0]?.match(/^(\d+(?:\.\d+)?(?:%|x|\+)?)/i);
                        return match ? (
                          <div className="absolute bottom-3 left-3 px-2.5 py-1 bg-black/60 backdrop-blur-sm border border-emerald-500/30 rounded-lg text-xs text-emerald-400">
                            {match[1]} impact
                          </div>
                        ) : null;
                      })()}
                    </div>
                    {/* Info */}
                    <div className="p-5 bg-white/5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-blue-300/60 uppercase tracking-wide">{project.category}</span>
                        <span className="text-xs text-white/30">{project.industry}</span>
                      </div>
                      <h3 className="text-lg tracking-tight text-white/90 group-hover:text-white transition-colors mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-white/45 line-clamp-2 leading-relaxed mb-4">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-1.5 text-blue-400 text-sm group-hover:gap-2.5 transition-all">
                        <span className="text-xs">View case study</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Services / What's Included ───────────────────────────────────── */}
      <WhoItsFor />

      {/* ── 8. Testimonials ───────────────────────────────────────────────────── */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-yellow-500/10 backdrop-blur-xl border border-yellow-500/20 rounded-full mb-6">
              <Star className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-yellow-200/80 tracking-wide">Client Feedback</span>
            </div>
            <h2 className="text-5xl md:text-6xl tracking-tighter">
              <span className="bg-gradient-to-r from-blue-200 via-cyan-200 to-indigo-200 bg-clip-text text-transparent">
                What clients say
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/8 to-cyan-600/5 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative p-8 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-3xl group-hover:border-blue-500/30 transition-all h-full flex flex-col">
                  <div className="flex gap-1 mb-6">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-white/65 leading-relaxed mb-8 flex-1 text-[0.95rem]">
                    "{t.quote}"
                  </blockquote>
                  <div>
                    <div className="text-white font-medium">{t.name}</div>
                    <div className="text-sm text-blue-300/60">{t.role}</div>
                    <div className="text-xs text-white/30 mt-0.5">{t.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. About ──────────────────────────────────────────────────────────── */}
      <section id="about" className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-3"
            >
              <h2 className="text-5xl md:text-7xl mb-8 tracking-tighter leading-tight">
                <span className="block">UX Designer.</span>
                <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  AI Practitioner.
                </span>
              </h2>
              <div className="space-y-5 text-lg text-white/55 leading-relaxed">
                <p>
                  I'm a UX designer who's spent years building products at the intersection of user
                  needs and business goals — and the last few years specifically building AI into every
                  part of that process.
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 space-y-5"
            >
              <div className="p-8 bg-gradient-to-br from-blue-600/8 to-cyan-600/8 backdrop-blur-xl border border-blue-500/20 rounded-3xl">
                <h3 className="text-lg mb-5 tracking-tight flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-cyan-400" />
                  Industries Served
                </h3>
                <ul className="space-y-2.5">
                  {["SaaS & Productivity Tools", "FinTech & Financial Services", "HealthTech & Wellness", "Enterprise Software", "Consumer Mobile Apps", "AI & Data Products"].map((ind) => (
                    <li key={ind} className="flex items-center gap-2 text-sm text-white/55">
                      <span className="text-blue-400 text-xs">→</span>
                      {ind}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 10. Contact ───────────────────────────────────────────────────────── */}
      <section id="contact" className="py-32 relative">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-full mb-10">
                <div className="w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-400 rounded-full animate-pulse" />
                <span className="text-sm text-emerald-200/80 tracking-wide">Available for New Projects</span>
              </div>
              <h2 className="text-5xl md:text-7xl mb-8 tracking-tighter leading-tight">
                <span className="block">Let's build</span>
                <span className="block bg-gradient-to-r from-blue-300 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  something great.
                </span>
              </h2>
              <p className="text-xl text-white/45 mb-12 leading-relaxed max-w-2xl mx-auto">
                Have a product to design, a system to fix, or a team to support? Tell me what you're working on.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:hello@example.com"
                  className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full hover:shadow-[0_0_40px_rgba(37,99,235,0.5)] transition-all duration-300 inline-flex items-center justify-center gap-2 relative overflow-hidden"
                  style={{ color: "#ffffff" }}
                >
                  <span className="relative z-10">Start a Conversation</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-full hover:bg-blue-500/10 hover:border-blue-500/30 transition-all duration-300 inline-flex items-center justify-center"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>

            {/* What happens next */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { step: "01", title: "Send a message", description: "Tell me about your project — what you're building, your timeline, and what help you need." },
                { step: "02", title: "30-min discovery call", description: "We'll discuss your goals, constraints, and whether my approach is the right fit." },
                { step: "03", title: "Proposal in 48 hours", description: "A clear scope, timeline, and pricing proposal. No vague estimates, no surprise fees." },
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-white/5 backdrop-blur-xl border border-blue-500/15 rounded-2xl"
                >
                  <div className="text-3xl font-light text-white/8 mb-3">{item.step}</div>
                  <h4 className="text-white/90 font-medium mb-2">{item.title}</h4>
                  <p className="text-sm text-white/45 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────────────────────── */}
      <footer className={`border-t py-10 backdrop-blur-xl transition-colors duration-300 ${isDark ? "border-blue-500/15 bg-black/50" : "border-blue-500/10 bg-blue-50/50"}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-5">
            <div className={`text-sm ${isDark ? "text-white/35" : "text-gray-400"}`}>© 2026 · AI-Powered UX Designer</div>
            <div className={`flex gap-8 text-sm ${isDark ? "text-white/35" : "text-gray-400"}`}>
              <a href="https://dribbble.com" className="hover:text-blue-500 transition-colors">Dribbble</a>
              <a href="https://twitter.com" className="hover:text-cyan-500 transition-colors">Twitter</a>
              <a href="https://linkedin.com" className="hover:text-indigo-500 transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
