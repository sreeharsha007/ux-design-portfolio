import React, { useState } from "react";
import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Star, ChevronRight } from "lucide-react";
import { projects } from "../data/projects";
import CaseStudyModal from "./CaseStudyModal";

// ─── Design Tokens ────────────────────────────────────────────────────────────

const T = {
  bg:         "#f7f6f3",
  white:      "#ffffff",
  surface:    "#f2f1ee",
  text:       "#0f0f13",
  text2:      "#52525b",
  text3:      "#a1a1aa",
  border:     "rgba(15,15,19,0.07)",
  borderMed:  "rgba(15,15,19,0.12)",
  amber:      "#d97706",
  amberBold:  "#b45309",
  amberLight: "#fef3c7",
  amberMid:   "#fde68a",
  shadowSm:   "0 1px 3px rgba(15,15,19,0.06), 0 3px 10px rgba(15,15,19,0.04)",
  shadowMd:   "0 2px 8px rgba(15,15,19,0.08), 0 8px 24px rgba(15,15,19,0.05)",
  shadowLg:   "0 8px 40px rgba(15,15,19,0.10), 0 2px 6px rgba(15,15,19,0.06)",
} as const;

// ─── Static Data ──────────────────────────────────────────────────────────────

const METRICS = [
  { value: "8 wks",  label: "Full design system delivered", note: "vs. 6 months quoted" },
  { value: "40%",    label: "Fewer QA cycles",              note: "AI-caught before handoff" },
  { value: "4.8 / 5", label: "Average client NPS",          note: "Across 12+ engagements" },
];

const DECISIONS = [
  { n: "01", title: "System before screens",        desc: "Every engagement starts with information architecture and a component system — before a single screen is designed." },
  { n: "02", title: "Outcomes over output",         desc: "Design decisions are tied to measurable user behaviours and business metrics — not aesthetic preferences or velocity." },
  { n: "03", title: "Constraints as creative fuel", desc: "Technical limits, accessibility standards, and stakeholder constraints are the rails that sharpen the work, not limit it." },
  { n: "04", title: "AI-augmented, human-led",      desc: "AI accelerates research synthesis, accessibility checks, and prototype generation. Human judgement drives every decision." },
];

const PROCESS_PHASES = [
  { n: "01", phase: "Discover", time: "3–5 days",  desc: "Synthesise research, map the problem space, define measurable success criteria.",  tools: ["Claude", "Maze", "Dovetail"] },
  { n: "02", phase: "Frame",    time: "1–2 days",  desc: "Translate insights into a focused brief. Align stakeholders on scope, constraints, and metrics before design starts.", tools: ["Miro", "Notion"] },
  { n: "03", phase: "Design",   time: "2–4 wks",   desc: "Exploration → iteration → refinement. AI-accelerated components and live accessibility validation throughout.",        tools: ["Figma", "v0", "Framer"] },
  { n: "04", phase: "Test",     time: "3–5 days",  desc: "Moderated usability tests, tree tests, and 5-second tests on key flows. Data informs every final decision.",           tools: ["Maze", "Lyssna"] },
  { n: "05", phase: "Deliver",  time: "2–3 days",  desc: "Pixel-perfect handoff with annotated edge cases, interaction specs, and implementation notes engineers trust.",        tools: ["Figma", "Zeroheight"] },
];

const TESTIMONIALS = [
  { quote: "Delivered a full design system in 8 weeks that our previous agency quoted 6 months for. The quality was exceptional and the handoff was the cleanest we've ever received.", name: "Sarah Kim",    role: "VP of Product",    company: "Series B SaaS" },
  { quote: "Speed without sacrificing depth. We had a usability-tested, dev-ready prototype for our investor demo in 3 weeks. Highly recommend.", name: "Marcus Osei",  role: "Co-founder & CEO", company: "FinTech Startup" },
  { quote: "A designer who understands enterprise constraints. AI workflow breakdowns in every deliverable helped our team understand the decisions — not just the output.", name: "Priya Nair",   role: "Director of UX",   company: "Enterprise Healthcare" },
];

// ─── Hero UI Composition ──────────────────────────────────────────────────────

function HeroComposition() {
  const bars = [32, 50, 26, 72, 44, 60, 32, 80, 48, 56, 36, 62];
  return (
    <div className="relative select-none" style={{ height: "390px", width: "100%" }}>

      {/* Ambient amber glow */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 56% 44%, rgba(217,119,6,0.07) 0%, transparent 68%)",
      }} />

      {/* Desktop window — back, rotated */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", left: "0%", top: "18px",
          width: "74%", height: "70%",
          background: T.white, borderRadius: "12px",
          border: `1px solid ${T.border}`,
          boxShadow: T.shadowLg,
          transform: "rotate(-1.5deg)",
          overflow: "hidden", zIndex: 1,
        }}
      >
        {/* Chrome */}
        <div style={{ height: "26px", background: "#f8f8f6", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: "5px", padding: "0 10px" }}>
          {["rgba(220,80,70,0.65)", "rgba(220,175,50,0.65)", "rgba(70,185,70,0.65)"].map((c, i) => (
            <div key={i} style={{ width: "8px", height: "8px", borderRadius: "50%", background: c }} />
          ))}
          <div style={{ marginLeft: "12px", height: "12px", width: "130px", borderRadius: "3px", background: "rgba(15,15,19,0.05)" }} />
        </div>

        <div style={{ display: "flex", height: "calc(100% - 26px)" }}>
          {/* Sidebar */}
          <div style={{ width: "50px", flexShrink: 0, background: "#f9f8f6", borderRight: `1px solid ${T.border}`, padding: "10px 6px" }}>
            {[true, false, false, false].map((active, i) => (
              <div key={i} style={{ height: "8px", marginBottom: "12px", borderRadius: "3px", background: active ? T.amber : "rgba(15,15,19,0.09)" }} />
            ))}
          </div>
          {/* Content */}
          <div style={{ flex: 1, padding: "14px 12px" }}>
            <div style={{ height: "8px", width: "44%", borderRadius: "3px", background: "rgba(15,15,19,0.55)", marginBottom: "5px" }} />
            <div style={{ height: "5px", width: "30%", borderRadius: "2px", background: "rgba(15,15,19,0.17)", marginBottom: "14px" }} />
            {/* Metric cards */}
            <div style={{ display: "flex", gap: "7px", marginBottom: "12px" }}>
              {[true, false, false].map((amber, i) => (
                <div key={i} style={{
                  flex: 1, padding: "8px", borderRadius: "7px", height: "42px",
                  background: amber ? T.amberLight : "#f8f8f6",
                  border: `1px solid ${amber ? "rgba(217,119,6,0.22)" : T.border}`,
                }}>
                  <div style={{ height: "6px", width: amber ? "52%" : "38%", borderRadius: "2px", background: amber ? "rgba(217,119,6,0.80)" : "rgba(15,15,19,0.38)", marginBottom: "4px" }} />
                  <div style={{ height: "4px", width: "68%", borderRadius: "2px", background: "rgba(15,15,19,0.11)" }} />
                </div>
              ))}
            </div>
            {/* Bar chart */}
            <div style={{ height: "72px", background: "#f9f8f6", borderRadius: "7px", border: `1px solid ${T.border}`, padding: "8px 8px 4px" }}>
              <div style={{ height: "4px", width: "52px", borderRadius: "2px", background: "rgba(15,15,19,0.20)", marginBottom: "7px" }} />
              <div style={{ display: "flex", alignItems: "flex-end", gap: "3.5px", height: "38px" }}>
                {bars.map((h, i) => (
                  <div key={i} style={{
                    flex: 1, height: `${h}%`, borderRadius: "2px 2px 0 0",
                    background: i === 3 || i === 7 ? "rgba(217,119,6,0.65)" : "rgba(15,15,19,0.09)",
                  }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mobile frame — front */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", right: "0%", top: "6px",
          width: "22%", height: "90%",
          background: T.white, borderRadius: "20px",
          border: `1px solid ${T.borderMed}`,
          boxShadow: T.shadowLg,
          overflow: "hidden", zIndex: 2,
        }}
      >
        <div style={{ height: "20px", background: "#f8f8f6", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: "30px", height: "4px", borderRadius: "2px", background: "rgba(15,15,19,0.14)" }} />
        </div>
        <div style={{ padding: "12px 10px" }}>
          <div style={{ height: "6px", width: "55%", borderRadius: "2px", background: "rgba(15,15,19,0.44)", marginBottom: "4px" }} />
          <div style={{ height: "4px", width: "38%", borderRadius: "2px", background: "rgba(15,15,19,0.14)", marginBottom: "12px" }} />
          <div style={{ padding: "10px", borderRadius: "10px", background: T.amberLight, border: "1px solid rgba(217,119,6,0.20)", marginBottom: "10px" }}>
            <div style={{ height: "6px", width: "60%", borderRadius: "2px", background: "rgba(217,119,6,0.75)", marginBottom: "5px" }} />
            <div style={{ height: "4px", width: "82%", borderRadius: "2px", background: "rgba(217,119,6,0.35)", marginBottom: "3px" }} />
            <div style={{ height: "4px", width: "55%", borderRadius: "2px", background: "rgba(217,119,6,0.25)" }} />
          </div>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "2px", flexShrink: 0, background: i === 0 ? T.amber : "rgba(15,15,19,0.11)" }} />
              <div style={{ height: "4px", borderRadius: "2px", background: "rgba(15,15,19,0.12)", width: ["80%", "65%", "74%", "58%"][i] }} />
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating metric chip */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        style={{
          position: "absolute", bottom: "2px", left: "7%",
          background: T.white, border: "1px solid rgba(217,119,6,0.26)",
          borderRadius: "12px", padding: "10px 14px",
          display: "flex", alignItems: "center", gap: "10px",
          boxShadow: "0 8px 28px rgba(15,15,19,0.13)",
          zIndex: 3,
        }}
      >
        <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: T.amber, boxShadow: "0 0 7px rgba(217,119,6,0.45)", flexShrink: 0 }} />
        <div>
          <div style={{ fontSize: "12px", fontWeight: 600, color: T.text, marginBottom: "1px" }}>40% fewer QA cycles</div>
          <div style={{ fontSize: "11px", color: T.text3 }}>AI-native design workflow</div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function LightHomepage() {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);

  const featuredProject = projects[0];
  const moreProjects = projects.slice(1, 4);
  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div style={{ background: T.bg, minHeight: "100vh" }}>

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: "rgba(247,246,243,0.88)",
        backdropFilter: "blur(18px) saturate(160%)",
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: T.amber }} />
            <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.08em", color: T.text }}>HARSHA</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "32px" }}>
            {["Work", "Process", "About"].map(item => (
              <a key={item} href="#" style={{ fontSize: "13px", color: T.text2, textDecoration: "none", fontWeight: 500 }}>{item}</a>
            ))}
            <a
              href="mailto:hpolepeddi@gmail.com"
              style={{
                fontSize: "13px", fontWeight: 600, padding: "7px 16px", borderRadius: "8px",
                border: "1px solid rgba(217,119,6,0.30)",
                color: T.amber, background: "rgba(217,119,6,0.05)",
                textDecoration: "none",
              }}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section style={{ padding: "92px 40px 80px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center" }}>

          {/* Left: Editorial text */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "7px",
              padding: "5px 12px", borderRadius: "100px",
              background: T.amberLight, border: "1px solid rgba(217,119,6,0.22)",
              marginBottom: "28px",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.amber }} />
              <span style={{ fontSize: "12px", fontWeight: 600, color: T.amberBold, letterSpacing: "0.04em" }}>
                UX Design · AI-Native Workflow
              </span>
            </div>

            <h1 style={{
              fontSize: "clamp(2.8rem, 4.8vw, 4.2rem)",
              fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.07,
              color: T.text, marginBottom: "24px",
            }}>
              Design that moves<br />
              <span style={{ color: T.amber }}>products forward.</span>
            </h1>

            <p style={{ fontSize: "17px", lineHeight: 1.68, color: T.text2, marginBottom: "32px", maxWidth: "440px" }}>
              I help growth-stage B2B teams ship better products faster — strategic UX, AI-augmented process, and clean handoff that engineering teams actually love.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px", marginBottom: "36px" }}>
              {["7+ years", "Series A–C", "AI-native workflow", "4-week avg delivery"].map(tag => (
                <span key={tag} style={{
                  fontSize: "12px", fontWeight: 500, padding: "4px 10px", borderRadius: "6px",
                  background: T.white, border: `1px solid ${T.border}`, color: T.text2,
                  boxShadow: "0 1px 3px rgba(15,15,19,0.04)",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "12px 22px", borderRadius: "10px",
                  background: T.amber, color: "#ffffff",
                  fontSize: "14px", fontWeight: 600, border: "none", cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(217,119,6,0.32)",
                }}
              >
                View Case Studies <ArrowRight size={15} />
              </button>
              <a
                href="mailto:hpolepeddi@gmail.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "14px", fontWeight: 500, color: T.text2, textDecoration: "none",
                }}
              >
                Get in Touch <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.div>

          {/* Right: Product UI composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroComposition />
          </motion.div>
        </div>
      </section>

      {/* ── Metrics Strip ───────────────────────────────────────────────────── */}
      <div style={{ borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, background: T.white }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
          {METRICS.map((m, i) => (
            <div key={i} style={{ padding: "28px 32px", borderRight: i < 2 ? `1px solid ${T.border}` : "none" }}>
              <div style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)", fontWeight: 700, letterSpacing: "-0.035em", color: T.amber, marginBottom: "4px" }}>
                {m.value}
              </div>
              <div style={{ fontSize: "14px", fontWeight: 500, color: T.text, marginBottom: "2px" }}>{m.label}</div>
              <div style={{ fontSize: "12px", color: T.text3 }}>{m.note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Selected Work ────────────────────────────────────────────────────── */}
      <section id="work" style={{ padding: "80px 40px 72px", maxWidth: "1200px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "36px" }}
        >
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: T.amber, textTransform: "uppercase", marginBottom: "8px" }}>Selected Work</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 700, letterSpacing: "-0.025em", color: T.text, margin: 0 }}>
            Problems solved. Numbers attached.
          </h2>
        </motion.div>

        {/* Featured project — editorial */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onClick={() => setActiveProjectId(featuredProject.id)}
          style={{
            background: T.white, borderRadius: "20px",
            border: `1px solid ${T.border}`,
            boxShadow: T.shadowMd,
            overflow: "hidden", cursor: "pointer",
            position: "relative", marginBottom: "14px",
          }}
        >
          {/* Amber left accent line */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: `linear-gradient(to bottom, transparent, ${T.amber} 28%, rgba(217,119,6,0.30) 72%, transparent)` }} />

          {/* Ghost number */}
          <div style={{
            position: "absolute", bottom: 0, right: "24px",
            fontSize: "160px", fontWeight: 700, lineHeight: 1,
            color: "rgba(15,15,19,0.025)", pointerEvents: "none", userSelect: "none",
          }}>
            01
          </div>

          <div style={{ padding: "48px 48px 48px 56px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "56px", alignItems: "center" }}>
            {/* Left: narrative */}
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginBottom: "20px" }}>
                <span style={{ padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 500, border: `1px solid ${T.border}`, color: T.text2 }}>
                  {featuredProject.category}
                </span>
                <span style={{ fontSize: "12px", color: T.text3 }}>{featuredProject.clientSize} · {featuredProject.timeline}</span>
              </div>

              <h3 style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)", fontWeight: 700, letterSpacing: "-0.02em", color: T.text, marginBottom: "16px", lineHeight: 1.2 }}>
                {featuredProject.title}
              </h3>

              <p style={{ fontSize: "15px", lineHeight: 1.72, color: T.text2, marginBottom: "24px" }}>
                {featuredProject.description}
              </p>

              {/* Outcome proof rows */}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "28px" }}>
                {featuredProject.outcomes.slice(0, 3).map((o, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: "10px",
                    padding: "10px 14px", borderRadius: "8px",
                    background: T.bg, border: `1px solid ${T.border}`,
                  }}>
                    <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.amber, flexShrink: 0 }} />
                    <span style={{ fontSize: "13px", color: T.text2 }}>{o}</span>
                  </div>
                ))}
              </div>

              <div style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "10px 20px", borderRadius: "9px",
                border: "1px solid rgba(217,119,6,0.28)",
                color: T.amber, fontSize: "13px", fontWeight: 600,
                background: "rgba(217,119,6,0.04)",
              }}>
                Read Full Case Study <ArrowRight size={14} />
              </div>
            </div>

            {/* Right: product UI */}
            <div style={{ position: "relative" }}>
              <div style={{
                position: "absolute", inset: "-10px",
                background: "radial-gradient(ellipse at center, rgba(217,119,6,0.06) 0%, transparent 70%)",
                borderRadius: "24px", pointerEvents: "none",
              }} />
              <div style={{ borderRadius: "14px", overflow: "hidden", border: `1px solid ${T.border}`, boxShadow: T.shadowLg, position: "relative" }}>
                <img
                  src="/ui-preview.png"
                  alt="Product UI"
                  style={{ width: "100%", display: "block", objectFit: "cover", objectPosition: "top" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.88) 100%)" }} />
              </div>
              {/* Floating chip */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{
                  position: "absolute", bottom: "-14px", right: "14px",
                  background: T.white, border: "1px solid rgba(217,119,6,0.24)",
                  borderRadius: "10px", padding: "8px 14px",
                  display: "flex", alignItems: "center", gap: "8px",
                  boxShadow: "0 6px 20px rgba(15,15,19,0.11)",
                }}
              >
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: T.amber }} />
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: T.text }}>40% fewer QA cycles</div>
                  <div style={{ fontSize: "10px", color: T.text3 }}>AI-caught before handoff</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 3-column project grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {moreProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 + i * 0.09 }}
              onClick={() => setActiveProjectId(project.id)}
              style={{
                background: T.white, borderRadius: "16px",
                border: `1px solid ${T.border}`,
                boxShadow: T.shadowSm,
                overflow: "hidden", cursor: "pointer",
              }}
            >
              {/* Image */}
              <div style={{ height: "172px", overflow: "hidden", position: "relative" }}>
                <img
                  src="/ui-preview.png"
                  alt="Product UI"
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 42%, rgba(255,255,255,0.97) 100%)" }} />
                <div style={{ position: "absolute", bottom: "12px", left: "14px" }}>
                  <span style={{
                    fontSize: "10px", fontWeight: 500, padding: "3px 8px", borderRadius: "4px",
                    background: "rgba(255,255,255,0.90)", backdropFilter: "blur(4px)",
                    border: `1px solid ${T.border}`, color: T.text2,
                  }}>
                    {project.outcomes[0]?.slice(0, 42) || project.category}
                  </span>
                </div>
              </div>
              {/* Card info */}
              <div style={{ padding: "18px 20px 20px" }}>
                <p style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "0.10em", color: T.text3, textTransform: "uppercase", marginBottom: "6px" }}>
                  {project.category}
                </p>
                <h4 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em", color: T.text, marginBottom: "8px", lineHeight: 1.3 }}>
                  {project.title}
                </h4>
                <p style={{
                  fontSize: "13px", color: T.text3, lineHeight: 1.6, marginBottom: "14px",
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                } as React.CSSProperties}>
                  {project.description}
                </p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: T.text3 }}>{project.timeline}</span>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: T.amber, display: "flex", alignItems: "center", gap: "4px" }}>
                    View case study <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Design Philosophy ────────────────────────────────────────────────── */}
      <section style={{ background: T.white, borderTop: `1px solid ${T.border}`, padding: "80px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "64px", alignItems: "start" }}
          >
            {/* Left: heading */}
            <div style={{ position: "sticky", top: "80px" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: T.amber, textTransform: "uppercase", marginBottom: "10px" }}>Design Philosophy</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: T.text, lineHeight: 1.2, margin: 0 }}>
                How I approach every design challenge
              </h2>
            </div>

            {/* Right: 2×2 decision grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              {DECISIONS.map((d, i) => (
                <motion.div
                  key={d.n}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.07 }}
                  style={{
                    background: T.bg, borderRadius: "14px",
                    border: `1px solid ${T.border}`,
                    padding: "26px 28px",
                  }}
                >
                  <div style={{ fontSize: "11px", fontWeight: 700, color: T.amber, letterSpacing: "0.06em", marginBottom: "12px" }}>{d.n}</div>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: T.text, marginBottom: "9px", letterSpacing: "-0.01em" }}>{d.title}</h3>
                  <p style={{ fontSize: "13px", lineHeight: 1.68, color: T.text2, margin: 0 }}>{d.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Process ─────────────────────────────────────────────────────────── */}
      <section style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "80px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ marginBottom: "48px" }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: T.amber, textTransform: "uppercase", marginBottom: "10px" }}>AI-Native Process</p>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
              <h2 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: T.text, margin: 0 }}>
                From problem to shipped product.
              </h2>
              <p style={{ fontSize: "14px", color: T.text3, maxWidth: "320px", margin: 0, lineHeight: 1.6 }}>
                A structured five-phase process, accelerated by AI at every stage.
              </p>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", position: "relative" }}>
            {/* Amber connector line */}
            <div style={{
              position: "absolute", top: "34px", left: "calc(10% + 2px)", right: "calc(10% + 2px)", height: "1px",
              background: `linear-gradient(to right, ${T.amber}, rgba(217,119,6,0.15))`,
              pointerEvents: "none", zIndex: 0,
            }} />

            {PROCESS_PHASES.map((p, i) => (
              <motion.div
                key={p.n}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                style={{ position: "relative", zIndex: 1 }}
              >
                <div style={{
                  background: T.white, borderRadius: "14px",
                  border: `1px solid ${T.border}`,
                  padding: "22px 18px",
                  boxShadow: T.shadowSm, height: "100%",
                }}>
                  <div style={{
                    width: "34px", height: "34px", borderRadius: "10px",
                    background: i === 0 ? T.amber : T.amberLight,
                    border: "1px solid rgba(217,119,6,0.20)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    marginBottom: "16px",
                  }}>
                    <span style={{ fontSize: "11px", fontWeight: 700, color: i === 0 ? "#fff" : T.amberBold }}>{p.n}</span>
                  </div>
                  <h4 style={{ fontSize: "14px", fontWeight: 700, color: T.text, marginBottom: "3px" }}>{p.phase}</h4>
                  <p style={{ fontSize: "11px", color: T.amber, fontWeight: 600, marginBottom: "10px" }}>{p.time}</p>
                  <p style={{ fontSize: "12px", lineHeight: 1.65, color: T.text2, marginBottom: "14px" }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {p.tools.map(tool => (
                      <span key={tool} style={{
                        fontSize: "10px", fontWeight: 500, padding: "2px 7px", borderRadius: "4px",
                        background: T.amberLight, border: "1px solid rgba(217,119,6,0.18)", color: T.amberBold,
                      }}>{tool}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────────── */}
      <section style={{ background: T.white, borderTop: `1px solid ${T.border}`, padding: "80px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}
          >
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: T.amber, textTransform: "uppercase", marginBottom: "8px" }}>Client Feedback</p>
              <h2 style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.2rem)", fontWeight: 700, letterSpacing: "-0.025em", color: T.text, margin: 0 }}>
                What clients say
              </h2>
            </div>
            <div style={{ display: "flex", gap: "3px" }}>
              {[0, 1, 2, 3, 4].map(s => <Star key={s} size={14} fill={T.amber} color={T.amber} />)}
              <span style={{ fontSize: "13px", fontWeight: 600, color: T.text2, marginLeft: "6px" }}>4.8 average</span>
            </div>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                style={{
                  background: T.bg, borderRadius: "16px",
                  border: `1px solid ${T.border}`, padding: "28px 28px 24px",
                }}
              >
                {/* Amber quote mark */}
                <div style={{ fontSize: "48px", lineHeight: 0.9, color: T.amber, fontFamily: "Georgia, serif", marginBottom: "16px", opacity: 0.55 }}>
                  "
                </div>
                <p style={{ fontSize: "14px", lineHeight: 1.78, color: T.text2, marginBottom: "22px" }}>
                  {t.quote}
                </p>
                <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: "16px", display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "30px", height: "30px", borderRadius: "50%", background: T.amberLight, border: "1px solid rgba(217,119,6,0.20)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: 700, color: T.amberBold }}>{t.name[0]}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: T.text, margin: 0 }}>{t.name}</p>
                    <p style={{ fontSize: "11px", color: T.text3, margin: 0 }}>{t.role} · {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "96px 40px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 60% at 50% 100%, rgba(217,119,6,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: "560px", margin: "0 auto", position: "relative" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", color: T.amber, textTransform: "uppercase", marginBottom: "18px" }}>
              Let's Work Together
            </p>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)", fontWeight: 700, letterSpacing: "-0.03em", color: T.text, marginBottom: "20px", lineHeight: 1.1 }}>
              Ready to ship something meaningful?
            </h2>
            <p style={{ fontSize: "17px", lineHeight: 1.68, color: T.text2, marginBottom: "36px" }}>
              I take on 2–3 engagements per quarter. If your timeline aligns, let's talk about what you're building.
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="mailto:hpolepeddi@gmail.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "13px 24px", borderRadius: "10px",
                  background: T.amber, color: "#ffffff",
                  fontSize: "14px", fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 4px 16px rgba(217,119,6,0.32)",
                }}
              >
                Start a Conversation <ArrowRight size={15} />
              </a>
              <button
                onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px",
                  padding: "13px 24px", borderRadius: "10px",
                  border: `1px solid ${T.borderMed}`,
                  background: T.white, color: T.text,
                  fontSize: "14px", fontWeight: 500, cursor: "pointer",
                }}
              >
                View Case Studies
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer style={{ background: T.text, padding: "28px 40px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: T.amber }} />
            <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.80)", letterSpacing: "0.08em" }}>HARSHA</span>
          </div>
          <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.28)", margin: 0 }}>
            UX Design & Product Strategy · {new Date().getFullYear()}
          </p>
          <a href="mailto:hpolepeddi@gmail.com" style={{ fontSize: "12px", color: "rgba(255,255,255,0.38)", textDecoration: "none" }}>
            hpolepeddi@gmail.com
          </a>
        </div>
      </footer>

      {/* Case study modal */}
      {activeProject && (
        <CaseStudyModal
          project={activeProject}
          onClose={() => setActiveProjectId(null)}
        />
      )}
    </div>
  );
}
