import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import type { Project } from "../data/projects";

// ─── Shared helpers ────────────────────────────────────────────────────────────

const SectionLabel = ({ children, isDark }: { children: string; isDark: boolean }) => (
  <p className={`text-[11px] font-semibold tracking-[0.1em] uppercase mb-5 ${isDark ? "text-amber-400/80" : "text-amber-700"}`}>
    {children}
  </p>
);

const Divider = ({ isDark }: { isDark: boolean }) => (
  <div className={`w-full h-px my-12 ${isDark ? "bg-white/[0.06]" : "bg-black/[0.07]"}`} />
);

// ─── Hero UI Widgets ───────────────────────────────────────────────────────────
// Realistic product UI mockups for the hero floating widget panel.
// Replace SVG content with actual screenshots when available.

const InvestigationDashboardSVG = ({ isDark }: { isDark: boolean }) => {
  const bg      = isDark ? "#0e0e16" : "#ffffff";
  const chrome  = isDark ? "#13131e" : "#f7f7fb";
  const bd      = isDark ? "#1f1f30" : "#e4e4f0";
  const txt1    = isDark ? "#e8e8f0" : "#111118";
  const txt2    = isDark ? "#8888aa" : "#7070908";
  const txt3    = isDark ? "#55557a" : "#aaaacc";
  const rowHov  = isDark ? "#15151f" : "#fafafa";
  const accent  = isDark ? "#f59e0b" : "#d97706";
  const accentBg = isDark ? "rgba(245,158,11,0.08)" : "rgba(217,119,6,0.07)";
  const accentBd = isDark ? "rgba(245,158,11,0.22)" : "rgba(217,119,6,0.3)";

  const rows = [
    { dot: "#ef4444", label: "CRITICAL", name: "Apex Financial Corp",    sub: "3 active vulnerabilities",    score: "94" },
    { dot: "#f97316", label: "HIGH",     name: "Team: Cloud Security",   sub: "Ownership unresolved",        score: "81" },
    { dot: "#eab308", label: "MEDIUM",   name: "Service: auth-gateway",  sub: "2 linked incidents",          score: "67" },
    { dot: "#22c55e", label: "LOW",      name: "Resource: k8s-cluster",  sub: "Last reviewed 47 days ago",   score: "42" },
  ];

  return (
    <svg viewBox="0 0 460 360" className="w-full h-full" style={{ display: "block" }}>
      {/* Card body */}
      <rect width="460" height="360" rx="12" fill={bg} stroke={bd} strokeWidth="1" />

      {/* Top chrome */}
      <rect width="460" height="44" rx="12" fill={chrome} />
      <rect y="36" width="460" height="8" fill={chrome} />
      <rect y="43" width="460" height="1" fill={bd} />

      {/* Header left: icon + title */}
      <rect x="14" y="13" width="18" height="18" rx="4" fill={accentBg} stroke={accentBd} strokeWidth="0.75" />
      <text x="23" y="25" textAnchor="middle" fill={accent} fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="700">⬡</text>
      <text x="38" y="26" fill={txt1} fontSize="11" fontFamily="-apple-system,sans-serif" fontWeight="600">Investigation Canvas</text>
      <rect x="160" y="16" width="32" height="13" rx="6" fill="#22c55e22" stroke="#22c55e44" strokeWidth="0.5" />
      <text x="176" y="25" textAnchor="middle" fill="#22c55e" fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="700">LIVE</text>

      {/* Header right: buttons */}
      <rect x="366" y="14" width="36" height="15" rx="4" fill={isDark ? "#ffffff0a" : "#0000000a"} stroke={bd} strokeWidth="0.5" />
      <text x="384" y="24" textAnchor="middle" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">Export</text>
      <rect x="408" y="14" width="38" height="15" rx="4" fill={accentBg} stroke={accentBd} strokeWidth="0.5" />
      <text x="427" y="24" textAnchor="middle" fill={accent} fontSize="7.5" fontFamily="-apple-system,sans-serif">Share</text>

      {/* Section label */}
      <text x="16" y="65" fill={txt3} fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.08em">ENTITY OVERVIEW</text>
      <text x="16" y="78" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">Showing 4 of 12 entities · sorted by risk</text>

      {/* Column headers */}
      <line x1="16" y1="88" x2="444" y2="88" stroke={bd} strokeWidth="0.5" />
      <text x="40" y="97" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.06em">ENTITY</text>
      <text x="310" y="97" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.06em">SEVERITY</text>
      <text x="410" y="97" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.06em">SCORE</text>
      <line x1="16" y1="100" x2="444" y2="100" stroke={bd} strokeWidth="0.5" />

      {/* Data rows */}
      {rows.map((r, i) => (
        <g key={i}>
          <rect x="8" y={104 + i * 38} width="444" height="36" rx="4" fill={i % 2 === 0 ? rowHov : "transparent"} />
          {/* Severity dot */}
          <circle cx="22" cy={122 + i * 38} r="4" fill={r.dot} />
          {/* Entity name + sub */}
          <text x="34" y={118 + i * 38} fill={txt1} fontSize="10" fontFamily="-apple-system,sans-serif" fontWeight="500">{r.name}</text>
          <text x="34" y={131 + i * 38} fill={txt3} fontSize="8" fontFamily="-apple-system,sans-serif">{r.sub}</text>
          {/* Severity badge */}
          <rect x="302" y={113 + i * 38} width="52" height="14" rx="3"
            fill={i === 0 ? "#ef444422" : i === 1 ? "#f9731622" : i === 2 ? "#eab30822" : "#22c55e22"}
            stroke={i === 0 ? "#ef444440" : i === 1 ? "#f9731640" : i === 2 ? "#eab30840" : "#22c55e40"}
            strokeWidth="0.5" />
          <text x="328" y={123 + i * 38} textAnchor="middle"
            fill={i === 0 ? "#ef4444" : i === 1 ? "#f97316" : i === 2 ? "#eab308" : "#22c55e"}
            fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700">{r.label}</text>
          {/* Score */}
          <text x="416" y={124 + i * 38} fill={i < 2 ? accent : txt2} fontSize="13" fontFamily="-apple-system,sans-serif" fontWeight="600">{r.score}</text>
          {/* Chevron */}
          <text x="444" y={124 + i * 38} fill={txt3} fontSize="9" fontFamily="-apple-system,sans-serif">›</text>
        </g>
      ))}

      {/* Divider */}
      <line x1="16" y1="262" x2="444" y2="262" stroke={bd} strokeWidth="0.5" />

      {/* AI Insight bar */}
      <rect x="8" y="268" width="444" height="80" rx="6" fill={accentBg} stroke={accentBd} strokeWidth="0.75" />
      <circle cx="26" cy="286" r="7" fill={accentBg} stroke={accentBd} strokeWidth="0.75" />
      <text x="26" y="289" textAnchor="middle" fill={accent} fontSize="9" fontFamily="-apple-system,sans-serif">✦</text>
      <text x="40" y="283" fill={accent} fontSize="8.5" fontFamily="-apple-system,sans-serif" fontWeight="700">AI Insight</text>
      <rect x="86" y="276" width="46" height="12" rx="3" fill={isDark ? "rgba(245,158,11,0.12)" : "rgba(217,119,6,0.1)"} stroke={accentBd} strokeWidth="0.5" />
      <text x="109" y="285" textAnchor="middle" fill={accent} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700">87% confident</text>
      <text x="16" y="300" fill={txt2} fontSize="9" fontFamily="-apple-system,sans-serif">"Risk is concentrated in 3 services owned by 2 overlapping teams.</text>
      <text x="16" y="312" fill={txt2} fontSize="9" fontFamily="-apple-system,sans-serif">Unresolved ownership is the primary contributor to the risk cluster."</text>
      <text x="16" y="332" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">Based on 3 sources  ·  View evidence  ·  Dismiss</text>
    </svg>
  );
};

const EntityConnectionSVG = ({ isDark }: { isDark: boolean }) => {
  const bg   = isDark ? "#0e0e16" : "#ffffff";
  const bd   = isDark ? "#1f1f30" : "#e4e4f0";
  const txt1 = isDark ? "#e8e8f0" : "#111118";
  const txt2 = isDark ? "#8888aa" : "#777790";
  const txt3 = isDark ? "#55557a" : "#aaaacc";
  const accent = isDark ? "#f59e0b" : "#d97706";
  const nodeBg = isDark ? "#1a1a28" : "#f2f2fa";
  const edge   = isDark ? "rgba(245,158,11,0.25)" : "rgba(217,119,6,0.25)";

  return (
    <svg viewBox="0 0 220 180" className="w-full h-full" style={{ display: "block" }}>
      <rect width="220" height="180" rx="10" fill={bg} stroke={bd} strokeWidth="1" />
      {/* Header */}
      <rect width="220" height="34" rx="10" fill={isDark ? "#13131e" : "#f7f7fb"} />
      <rect y="26" width="220" height="8" fill={isDark ? "#13131e" : "#f7f7fb"} />
      <rect y="33" width="220" height="1" fill={bd} />
      <text x="14" y="21" fill={txt1} fontSize="9.5" fontFamily="-apple-system,sans-serif" fontWeight="600">Connected Entities</text>
      <rect x="162" y="11" width="24" height="13" rx="6" fill={isDark ? "rgba(245,158,11,0.1)" : "rgba(217,119,6,0.1)"} stroke={isDark ? "rgba(245,158,11,0.25)" : "rgba(217,119,6,0.3)"} strokeWidth="0.5" />
      <text x="174" y="20.5" textAnchor="middle" fill={accent} fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight="700">4</text>

      {/* Central node */}
      <circle cx="110" cy="100" r="18" fill={isDark ? "rgba(245,158,11,0.1)" : "rgba(217,119,6,0.08)"} stroke={isDark ? "rgba(245,158,11,0.35)" : "rgba(217,119,6,0.4)"} strokeWidth="1.5" />
      <text x="110" y="97" textAnchor="middle" fill={accent} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700">Apex</text>
      <text x="110" y="107" textAnchor="middle" fill={accent} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700">Financial</text>

      {/* Satellite nodes */}
      {[
        { cx: 48,  cy: 72,  label: "Team",       sub: "Cloud Sec" },
        { cx: 172, cy: 72,  label: "Service",     sub: "auth-gw" },
        { cx: 48,  cy: 130, label: "Resource",    sub: "k8s" },
        { cx: 172, cy: 130, label: "Incident",    sub: "#IC-847" },
      ].map((n, i) => (
        <g key={i}>
          <line x1={n.cx > 110 ? n.cx - 14 : n.cx + 14} y1={n.cy}
            x2={n.cy < 100 ? 95 : n.cy > 100 ? 95 : 92}
            y2={n.cy < 100 ? 92 : n.cy > 100 ? 108 : 100}
            stroke={edge} strokeWidth="1" strokeDasharray="3 2" />
          <circle cx={n.cx} cy={n.cy} r="14" fill={nodeBg} stroke={bd} strokeWidth="1" />
          <text x={n.cx} y={n.cy - 2} textAnchor="middle" fill={txt2} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="600">{n.label}</text>
          <text x={n.cx} y={n.cy + 8} textAnchor="middle" fill={txt3} fontSize="6" fontFamily="-apple-system,sans-serif">{n.sub}</text>
        </g>
      ))}

      {/* Footer */}
      <text x="14" y="168" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">Trust score: 72%  ·  4 connections</text>
    </svg>
  );
};

const AIInsightPillSVG = ({ isDark }: { isDark: boolean }) => {
  const bg     = isDark ? "#0e0e16" : "#ffffff";
  const bd     = isDark ? "rgba(245,158,11,0.28)" : "rgba(217,119,6,0.35)";
  const accent = isDark ? "#f59e0b" : "#d97706";
  const txt1   = isDark ? "#e8e8f0" : "#111118";
  const txt2   = isDark ? "#8888aa" : "#777790";
  const track  = isDark ? "#1f1f30" : "#e8e8f4";
  const fill   = isDark ? "rgba(245,158,11,0.5)" : "rgba(217,119,6,0.5)";
  const fillHi = isDark ? "#f59e0b" : "#d97706";

  return (
    <svg viewBox="0 0 220 90" className="w-full h-full" style={{ display: "block" }}>
      <rect width="220" height="90" rx="10" fill={bg} stroke={bd} strokeWidth="1" />
      {/* Icon + label */}
      <circle cx="20" cy="22" r="9" fill={isDark ? "rgba(245,158,11,0.1)" : "rgba(217,119,6,0.09)"} stroke={bd} strokeWidth="0.75" />
      <text x="20" y="26" textAnchor="middle" fill={accent} fontSize="10" fontFamily="-apple-system,sans-serif">✦</text>
      <text x="36" y="19" fill={txt1} fontSize="10" fontFamily="-apple-system,sans-serif" fontWeight="600">High-confidence finding</text>
      <text x="36" y="30" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">AI-generated  ·  87% confidence</text>
      {/* Confidence bar */}
      <rect x="14" y="44" width="192" height="6" rx="3" fill={track} />
      <rect x="14" y="44" width="167" height="6" rx="3" fill={fill} />
      <rect x="14" y="44" width="80" height="6" rx="3" fill={fillHi} />
      {/* Labels */}
      <text x="14" y="62" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">0%</text>
      <text x="110" y="62" textAnchor="middle" fill={accent} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="600">87%</text>
      <text x="206" y="62" textAnchor="end" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">100%</text>
      {/* Sources */}
      <text x="14" y="79" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">3 sources verified  ·</text>
      <text x="100" y="79" fill={accent} fontSize="8" fontFamily="-apple-system,sans-serif">View evidence ›</text>
    </svg>
  );
};

// ─── Challenge Icons — dual-tone abstract SVG icons ──────────────────────────
// Each represents one of the three core challenges. Amber = primary/active,
// muted = secondary/passive. Purely geometric — no UI chrome.

const ChallengeIcon = ({ index, isDark }: { index: number; isDark: boolean }) => {
  const a   = isDark ? "#f59e0b"               : "#d97706";         // amber primary
  const aFill = isDark ? "rgba(245,158,11,0.12)" : "rgba(217,119,6,0.1)"; // amber fill
  const m   = isDark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.14)"; // muted stroke
  const mFill = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)"; // muted fill

  // Icon 0 — Fragmented context: amber centre node + scattered muted satellites
  if (index === 0) return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Dashed spokes */}
      {[[8,8],[40,8],[8,40],[40,40]].map(([x,y],i) => (
        <line key={i} x1={24} y1={24} x2={x} y2={y} stroke={m} strokeWidth="1.2" strokeDasharray="2.5 2.5" />
      ))}
      {/* Satellite nodes */}
      {[[8,8],[40,8],[8,40],[40,40]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="4" fill={mFill} stroke={m} strokeWidth="1.2" />
      ))}
      {/* Centre anchor (amber) */}
      <circle cx="24" cy="24" r="6.5" fill={aFill} stroke={a} strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2.5" fill={a} />
      {/* Break marks on two spokes */}
      <line x1="13" y1="13" x2="16" y2="16" stroke={isDark ? "#06060a" : "#fafaf8"} strokeWidth="2.5" />
      <line x1="35" y1="35" x2="32" y2="32" stroke={isDark ? "#06060a" : "#fafaf8"} strokeWidth="2.5" />
    </svg>
  );

  // Icon 1 — Buried insights: stacked layers, amber on top, muted going deep
  if (index === 1) return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Deep layers (very muted) */}
      <rect x="17" y="32" width="14" height="7" rx="2" fill={mFill} stroke={m} strokeWidth="1" opacity="0.5" />
      {/* Mid layer */}
      <rect x="11" y="22" width="26" height="7" rx="2" fill={mFill} stroke={m} strokeWidth="1" opacity="0.75" />
      {/* Top layer (amber) */}
      <rect x="5" y="12" width="38" height="8" rx="2.5" fill={aFill} stroke={a} strokeWidth="1.5" />
      {/* Chevron indicating "buried" */}
      <polyline points="20,35 24,39 28,35" stroke={a} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.5" />
    </svg>
  );

  // Icon 2 — Disconnected collaboration: two half-circles with a gap between them
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
      {/* Left group (amber) */}
      <path d="M22 12 A12 12 0 0 0 22 36" stroke={a} strokeWidth="1.5" fill={aFill} strokeLinecap="round" />
      <circle cx="14" cy="24" r="5" fill={aFill} stroke={a} strokeWidth="1.5" />
      {/* Right group (muted) */}
      <path d="M26 12 A12 12 0 0 1 26 36" stroke={m} strokeWidth="1.5" fill={mFill} strokeLinecap="round" />
      <circle cx="34" cy="24" r="5" fill={mFill} stroke={m} strokeWidth="1.5" />
      {/* Gap indicators */}
      <line x1="23" y1="18" x2="25" y2="18" stroke={isDark ? "#06060a" : "#fafaf8"} strokeWidth="2" />
      <line x1="23" y1="24" x2="25" y2="24" stroke={isDark ? "#06060a" : "#fafaf8"} strokeWidth="2" />
      <line x1="23" y1="30" x2="25" y2="30" stroke={isDark ? "#06060a" : "#fafaf8"} strokeWidth="2" />
    </svg>
  );
};

// ─── Fragmented Workspace Widget — "before" state for context section ─────────

const FragmentedTrackerSVG = ({ isDark }: { isDark: boolean }) => {
  const bg    = isDark ? "#0e0e16" : "#ffffff";
  const chrome = isDark ? "#13131e" : "#f7f7fb";
  const bd    = isDark ? "#1f1f30" : "#e4e4f0";
  const txt1  = isDark ? "#e8e8f0" : "#111118";
  const txt2  = isDark ? "#8888aa" : "#777790";
  const txt3  = isDark ? "#55557a" : "#aaaacc";
  const rowA  = isDark ? "#15151f" : "#fafafa";

  return (
    <svg viewBox="0 0 420 310" className="w-full h-full" style={{ display: "block" }}>
      <rect width="420" height="310" rx="12" fill={bg} stroke={bd} strokeWidth="1" />
      {/* Chrome */}
      <rect width="420" height="38" rx="12" fill={chrome} />
      <rect y="30" width="420" height="8" fill={chrome} />
      <rect y="37" width="420" height="1" fill={bd} />
      <circle cx="18" cy="19" r="4.5" fill="#ff5f57" opacity="0.85" />
      <circle cx="31" cy="19" r="4.5" fill="#febc2e" opacity="0.85" />
      <circle cx="44" cy="19" r="4.5" fill="#28c840" opacity="0.85" />
      <rect x="62" y="9" width="200" height="18" rx="4" fill={isDark ? "#1a1a28" : "#ebebf5"} />
      <text x="162" y="21" textAnchor="middle" fill={txt3} fontSize="8.5" fontFamily="-apple-system,sans-serif">investigation_tracker_v7_FINAL.xlsx</text>
      {/* Version warning tab */}
      <rect x="268" y="9" width="140" height="18" rx="4" fill="#ff444418" stroke="#ff444430" strokeWidth="0.5" />
      <text x="338" y="21" textAnchor="middle" fill="#ff7755" fontSize="7.5" fontFamily="-apple-system,sans-serif">⚠ v5 conflict detected</text>

      {/* Column headers */}
      {["ENTITY", "DATE", "SOURCE", "TYPE", "STATUS"].map((h, i) => (
        <g key={h}>
          <rect x={14 + i * 80} y="44" width="80" height="14" fill={isDark ? "#141424" : "#ededf5"} stroke={bd} strokeWidth="0.4" />
          <text x={54 + i * 80} y="53.5" textAnchor="middle" fill={txt3} fontSize="6.5" fontWeight="700" letterSpacing="0.07em" fontFamily="-apple-system,sans-serif">{h}</text>
        </g>
      ))}

      {/* Data rows */}
      {[
        { status: "UNVERIFIED", statusColor: "#ef4444", bg: "#ef444414" },
        { status: "OK",         statusColor: "#22c55e", bg: "transparent" },
        { status: "DUPLICATE?", statusColor: "#f97316", bg: "#f9731614" },
        { status: "OK",         statusColor: "#22c55e", bg: "transparent" },
        { status: "UNVERIFIED", statusColor: "#ef4444", bg: "#ef444414" },
        { status: "MANUAL",     statusColor: "#eab308", bg: "#eab30814" },
      ].map((r, i) => (
        <g key={i}>
          <rect x="14" y={58 + i * 22} width={5 * 80} height="22" fill={r.bg !== "transparent" ? r.bg : i % 2 === 0 ? rowA : "transparent"} stroke={bd} strokeWidth="0.3" />
          {/* Data blobs */}
          {[0,1,2,3].map(c => (
            <rect key={c} x={20 + c * 80} y={64 + i * 22} width={28 + ((i+c*2) % 20)} height="6" rx="1.5" fill={isDark ? "#252540" : "#dcdcee"} />
          ))}
          {/* Status badge */}
          <rect x={334} y={61 + i * 22} width={68} height="14" rx="3" fill={r.bg !== "transparent" ? r.bg : "transparent"} stroke={`${r.statusColor}44`} strokeWidth="0.5" />
          <text x={368} y={71 + i * 22} textAnchor="middle" fill={r.statusColor} fontSize="6.5" fontWeight="700" fontFamily="-apple-system,sans-serif">{r.status}</text>
        </g>
      ))}

      {/* Bottom warning bar */}
      <rect x="14" y="196" width="392" height="22" rx="5" fill="#ff444410" stroke="#ff444428" strokeWidth="0.5" />
      <text x="210" y="210" textAnchor="middle" fill="#ff7755" fontSize="8" fontFamily="-apple-system,sans-serif">⚠ 23 rows with conflicts across v5 and v7 · 8 duplicates · 15 unverified</text>

      {/* Second source warning */}
      <rect x="14" y="226" width="392" height="70" rx="8" fill={isDark ? "#111119" : "#f2f2fa"} stroke={bd} strokeWidth="0.5" />
      <text x="28" y="241" fill={txt2} fontSize="8.5" fontWeight="600" fontFamily="-apple-system,sans-serif">📋 Notes (copy-pasted from 3 sources)</text>
      <rect x="14" y="248" width="392" height="1" fill={bd} />
      {["Entity A → linked to B? (check email)", "Timeline conflict — PDF says Q2, sheet says Q3", "TODO: ask legal · Cross-ref with Slack thread · Manual verify needed"].map((n, i) => (
        <text key={i} x="28" y={264 + i * 12} fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">{n}</text>
      ))}
    </svg>
  );
};

const ContextChatOverlaySVG = ({ isDark }: { isDark: boolean }) => {
  const bg    = isDark ? "#0e0e16" : "#ffffff";
  const bd    = isDark ? "#1f1f30" : "#e4e4f0";
  const chrome = isDark ? "#13131e" : "#f7f7fb";
  const txt2  = isDark ? "#8888aa" : "#777790";
  const txt3  = isDark ? "#55557a" : "#aaaacc";

  const msgs = [
    { warn: false, text: "Which version of the tracker is correct?" },
    { warn: true,  text: "⚠️ v5 and v7 both have different entity names" },
    { warn: false, text: "Just cross-reference manually for now..." },
    { warn: true,  text: "That's what I said 2 weeks ago" },
  ];

  return (
    <svg viewBox="0 0 200 170" className="w-full h-full" style={{ display: "block" }}>
      <rect width="200" height="170" rx="10" fill={bg} stroke={bd} strokeWidth="1" />
      <rect width="200" height="32" rx="10" fill={chrome} />
      <rect y="24" width="200" height="8" fill={chrome} />
      <rect y="31" width="200" height="1" fill={bd} />
      <rect x="10" y="10" width="8" height="8" rx="2" fill="#4c1d95" opacity="0.7" />
      <text x="24" y="18.5" fill={txt2} fontSize="8.5" fontFamily="-apple-system,sans-serif" fontWeight="600">#investigation-team</text>
      <rect x="164" y="10" width="24" height="12" rx="3" fill="#ef444418" stroke="#ef444430" strokeWidth="0.5" />
      <text x="176" y="18.5" textAnchor="middle" fill="#ef4444" fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700">89 new</text>

      {msgs.map((m, i) => (
        <g key={i}>
          <circle cx="18" cy={46 + i * 30} r="5" fill={isDark ? "#1e1e30" : "#e8e8f4"} />
          <text x="28" y={49 + i * 30} fill={m.warn ? "#f97316" : txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">{m.text.length > 30 ? m.text.slice(0,30)+"…" : m.text}</text>
          <text x="28" y={58 + i * 30} fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">
            {m.warn ? "⚠ Unresolved · 2d ago" : "→ No resolution · 3d ago"}
          </text>
        </g>
      ))}
    </svg>
  );
};

// ─── Decision Visualization SVGs ─────────────────────────────────────────────
// One per key decision card. Minimal, on-brand, blending with the card bg.
// Amber = active / primary concept. Muted = secondary / passive elements.

const SemanticLayerFlowViz = ({ isDark }: { isDark: boolean }) => {
  const bg    = isDark ? "#080810" : "#eaeaf2";
  const panel = isDark ? "#0e0e16" : "#f4f4fc";
  const bd    = isDark ? "#1f1f30" : "#d8d8ec";
  const a     = isDark ? "#f59e0b" : "#d97706";
  const aFill = isDark ? "rgba(245,158,11,0.09)" : "rgba(217,119,6,0.08)";
  const aBd   = isDark ? "rgba(245,158,11,0.32)" : "rgba(217,119,6,0.38)";
  const txt2  = isDark ? "#8888aa" : "#777790";
  const txt3  = isDark ? "#55557a" : "#aaaacc";
  const m     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)";

  const entities = [
    { y: 36,  label: "Teams",           sub: "22 defined" },
    { y: 90,  label: "Resources",       sub: "140+ services" },
    { y: 144, label: "Vulnerabilities", sub: "CVEs + findings" },
  ];
  const outputs = [
    { label: "RISK CONTEXT", value: "HIGH · Apex Financial", color: "#ef4444" },
    { label: "OWNERSHIP",    value: "Cloud Security Team",   color: a },
    { label: "CONNECTIONS",  value: "3 CVEs · 2 incidents",  color: txt2 },
  ];

  return (
    <svg viewBox="0 0 540 196" fill="none" className="w-full h-full" style={{ display: "block" }}>
      <rect width="540" height="196" fill={bg} />
      {entities.map((e, i) => (
        <g key={i}>
          <rect x="24" y={e.y} width="118" height="36" rx="7" fill={panel} stroke={bd} strokeWidth="0.75" />
          <text x="34" y={e.y + 14} fill={txt2} fontSize="8.5" fontFamily="-apple-system,sans-serif" fontWeight="600">{e.label}</text>
          <text x="34" y={e.y + 26} fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif">{e.sub}</text>
          <path d={`M 142 ${e.y + 18} C 185 ${e.y + 18} 185 98 218 98`} stroke={m} strokeWidth="1" fill="none" />
        </g>
      ))}
      {/* Semantic Layer box */}
      <rect x="218" y="58" width="104" height="80" rx="10" fill={aFill} stroke={aBd} strokeWidth="1.25" />
      <text x="270" y="85"  textAnchor="middle" fill={a} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="800" letterSpacing="0.1em">SEMANTIC</text>
      <text x="270" y="97"  textAnchor="middle" fill={a} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="800" letterSpacing="0.1em">LAYER</text>
      <rect x="232" y="106" width="76" height="3.5" rx="2" fill={isDark ? "rgba(245,158,11,0.15)" : "rgba(217,119,6,0.12)"} />
      <text x="270" y="122" textAnchor="middle" fill={isDark ? "rgba(245,158,11,0.45)" : "rgba(217,119,6,0.5)"} fontSize="6.5" fontFamily="-apple-system,sans-serif">entity intelligence</text>
      {/* Output connectors */}
      {[54, 108, 162].map((y, i) => (
        <path key={i} d={`M 322 98 C 360 98 360 ${y} 398 ${y}`} stroke={a} strokeWidth="0.75" fill="none" opacity="0.35" />
      ))}
      {/* Output panels */}
      {outputs.map((o, i) => (
        <g key={i}>
          <rect x="398" y={entities[i].y} width="118" height="36" rx="7" fill={panel} stroke={bd} strokeWidth="0.75" />
          <text x="408" y={entities[i].y + 13} fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.06em">{o.label}</text>
          <text x="408" y={entities[i].y + 26} fill={o.color} fontSize="8" fontFamily="-apple-system,sans-serif">{o.value}</text>
        </g>
      ))}
    </svg>
  );
};

const AIChatViz = ({ isDark }: { isDark: boolean }) => {
  const bg    = isDark ? "#080810" : "#eaeaf2";
  const panel = isDark ? "#0c0c14" : "#ebebf5";
  const bd    = isDark ? "#1f1f30" : "#d8d8ec";
  const a     = isDark ? "#f59e0b" : "#d97706";
  const aFill = isDark ? "rgba(245,158,11,0.09)" : "rgba(217,119,6,0.08)";
  const aBd   = isDark ? "rgba(245,158,11,0.28)" : "rgba(217,119,6,0.32)";
  const txt2  = isDark ? "#8888aa" : "#777790";
  const txt3  = isDark ? "#55557a" : "#aaaacc";
  const userBg = isDark ? "rgba(255,255,255,0.035)" : "rgba(0,0,0,0.035)";

  return (
    <svg viewBox="0 0 280 190" fill="none" className="w-full h-full" style={{ display: "block" }}>
      <rect width="280" height="190" fill={bg} />
      {/* App header */}
      <rect width="280" height="26" fill={panel} />
      <circle cx="14" cy="13" r="5.5" fill={aFill} stroke={aBd} strokeWidth="0.75" />
      <text x="14" y="16.5" textAnchor="middle" fill={a} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700">⬡</text>
      <text x="24" y="16.5" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight="600">AI Assistant</text>
      <rect x="230" y="7" width="36" height="12" rx="3" fill="#22c55e1a" stroke="#22c55e40" strokeWidth="0.5" />
      <text x="248" y="15" textAnchor="middle" fill="#22c55e" fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700">LIVE</text>
      {/* User message */}
      <rect x="58" y="34" width="210" height="20" rx="5" fill={userBg} stroke={bd} strokeWidth="0.5" />
      <text x="68" y="47" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">"Status of auth-gateway service?"</text>
      {/* AI response card */}
      <rect x="10" y="62" width="260" height="88" rx="8" fill={aFill} stroke={aBd} strokeWidth="0.75" />
      <circle cx="22" cy="74" r="5" fill={a} fillOpacity="0.3" />
      <text x="22" y="77.5" textAnchor="middle" fill={a} fontSize="7" fontFamily="-apple-system,sans-serif">✦</text>
      <text x="32" y="70" fill={a} fontSize="8" fontFamily="-apple-system,sans-serif" fontWeight="700">AI Insight</text>
      <rect x="76" y="65" width="44" height="11" rx="3" fill={isDark ? "rgba(245,158,11,0.14)" : "rgba(217,119,6,0.12)"} stroke={aBd} strokeWidth="0.4" />
      <text x="98" y="73" textAnchor="middle" fill={a} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700">87% confident</text>
      <rect x="18" y="80" width="80" height="8" rx="2" fill="rgba(239,68,68,0.14)" />
      <text x="22" y="87" fill="#ef4444" fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="600">HIGH risk · auth-gateway</text>
      <text x="18" y="101" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">Owner: Cloud Security Team</text>
      <text x="18" y="112" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">2 active incidents · last reviewed 14d ago</text>
      {/* Confidence bar */}
      <rect x="18" y="122" width="244" height="4" rx="2" fill={bd} />
      <rect x="18" y="122" width="212" height="4" rx="2" fill={isDark ? "rgba(245,158,11,0.3)" : "rgba(217,119,6,0.28)"} />
      <rect x="18" y="122" width="100" height="4" rx="2" fill={a} fillOpacity="0.6" />
      {/* Action chips */}
      {["View sources", "Explain more", "Dismiss"].map((label, i) => (
        <g key={i}>
          <rect x={10 + i * 90} y="157" width="80" height="13" rx="6.5" fill="none" stroke={bd} strokeWidth="0.75" />
          <text x={50 + i * 90} y="165.5" textAnchor="middle" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">{label}</text>
        </g>
      ))}
      {/* Input bar */}
      <rect x="10" y="175" width="240" height="11" rx="3.5" fill={userBg} stroke={bd} strokeWidth="0.5" />
      <rect x="254" y="175" width="16" height="11" rx="3.5" fill={aFill} stroke={aBd} strokeWidth="0.5" />
    </svg>
  );
};

const CollaborativeCanvasViz = ({ isDark }: { isDark: boolean }) => {
  const bg    = isDark ? "#080810" : "#eaeaf2";
  const card  = isDark ? "#0e0e16" : "#f4f4fc";
  const panel = isDark ? "#0c0c14" : "#ebebf5";
  const bd    = isDark ? "#1f1f30" : "#d8d8ec";
  const a     = isDark ? "#f59e0b" : "#d97706";
  const aFill = isDark ? "rgba(245,158,11,0.09)" : "rgba(217,119,6,0.08)";
  const aBd   = isDark ? "rgba(245,158,11,0.28)" : "rgba(217,119,6,0.32)";
  const txt2  = isDark ? "#8888aa" : "#777790";
  const txt3  = isDark ? "#55557a" : "#aaaacc";
  const edge  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)";
  const aEdge = isDark ? "rgba(245,158,11,0.22)" : "rgba(217,119,6,0.22)";

  return (
    <svg viewBox="0 0 280 190" fill="none" className="w-full h-full" style={{ display: "block" }}>
      <rect width="280" height="190" fill={bg} />
      {/* Toolbar */}
      <rect width="280" height="22" fill={panel} />
      <text x="10" y="14.5" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="600">Investigation Canvas</text>
      <circle cx="260" cy="11" r="4" fill={isDark ? "#252540" : "#d0d0e8"} />
      <circle cx="250" cy="11" r="4" fill={aFill} stroke={aBd} strokeWidth="0.5" />
      <circle cx="240" cy="11" r="4" fill={isDark ? "#252540" : "#d0d0e8"} />
      {/* Connection lines */}
      <line x1="88"  y1="66"  x2="122" y2="92"  stroke={edge}  strokeWidth="0.75" strokeDasharray="3 2" />
      <line x1="192" y1="66"  x2="158" y2="92"  stroke={edge}  strokeWidth="0.75" strokeDasharray="3 2" />
      <line x1="140" y1="124" x2="80"  y2="140" stroke={aEdge} strokeWidth="0.75" />
      <line x1="140" y1="124" x2="200" y2="140" stroke={aEdge} strokeWidth="0.75" />
      {/* Incident card */}
      <rect x="22"  y="30" width="132" height="32" rx="5" fill={card} stroke={bd} strokeWidth="0.75" />
      <text x="32" y="44" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="600">Incident #IC-847</text>
      <text x="32" y="55" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">auth-gateway failure · P1</text>
      {/* Ownership card */}
      <rect x="160" y="30" width="96"  height="32" rx="5" fill={card} stroke={bd} strokeWidth="0.75" />
      <text x="170" y="44" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="600">Ownership Gap</text>
      <text x="170" y="55" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">Cloud Security</text>
      {/* Root cause (amber) */}
      <rect x="96" y="84" width="88" height="38" rx="6" fill={aFill} stroke={aBd} strokeWidth="1" />
      <text x="140" y="99"  textAnchor="middle" fill={a}    fontSize="7"   fontFamily="-apple-system,sans-serif" fontWeight="700">ROOT CAUSE</text>
      <text x="140" y="112" textAnchor="middle" fill={txt2} fontSize="6.5" fontFamily="-apple-system,sans-serif">Overlapping team scope</text>
      {/* Contributing factors */}
      <rect x="22"  y="130" width="104" height="20" rx="4" fill={card} stroke={bd} strokeWidth="0.5" />
      <text x="74"  y="143" textAnchor="middle" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">Missing accountability</text>
      <rect x="154" y="130" width="104" height="20" rx="4" fill={card} stroke={bd} strokeWidth="0.5" />
      <text x="206" y="143" textAnchor="middle" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">No shared context</text>
      {/* Timeline */}
      <rect x="0"   y="158" width="280" height="32" fill={panel} />
      <text x="14"  y="177" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">Jun 15</text>
      <line x1="54" y1="174" x2="226" y2="174" stroke={bd} strokeWidth="0.75" />
      <circle cx="80"  cy="174" r="2.5" fill={txt3} />
      <circle cx="130" cy="174" r="3"   fill={a} />
      <circle cx="180" cy="174" r="2.5" fill={txt3} />
      <text x="230" y="177" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">Jun 22</text>
    </svg>
  );
};

const TrustControlViz = ({ isDark }: { isDark: boolean }) => {
  const bg    = isDark ? "#080810" : "#eaeaf2";
  const panel = isDark ? "#0e0e16" : "#f4f4fc";
  const sect  = isDark ? "#0c0c14" : "#ebebf5";
  const bd    = isDark ? "#1f1f30" : "#d8d8ec";
  const a     = isDark ? "#f59e0b" : "#d97706";
  const aFill = isDark ? "rgba(245,158,11,0.09)" : "rgba(217,119,6,0.08)";
  const aBd   = isDark ? "rgba(245,158,11,0.28)" : "rgba(217,119,6,0.32)";
  const txt2  = isDark ? "#8888aa" : "#777790";
  const txt3  = isDark ? "#55557a" : "#aaaacc";
  const dim   = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  return (
    <svg viewBox="0 0 280 190" fill="none" className="w-full h-full" style={{ display: "block" }}>
      <rect width="280" height="190" fill={bg} />
      {/* State labels */}
      <text x="14"  y="20" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.09em">GENERATING</text>
      <text x="148" y="20" fill={a}    fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.09em">RESULT + CONFIDENCE</text>
      {/* Generating panel */}
      <rect x="10"  y="26" width="124" height="68" rx="6" fill={panel} stroke={bd} strokeWidth="0.75" />
      {[0,1,2,3].map(i => (
        <rect key={i} x="20" y={36 + i * 13} width={60 + (i*12)%40} height="6" rx="1.5" fill={dim} />
      ))}
      <circle cx="20" cy="83" r="2.5" fill={a} fillOpacity="0.7" />
      <circle cx="30" cy="83" r="2.5" fill={a} fillOpacity="0.35" />
      <circle cx="40" cy="83" r="2.5" fill={a} fillOpacity="0.15" />
      {/* Result panel */}
      <rect x="144" y="26" width="126" height="68" rx="6" fill={aFill} stroke={aBd} strokeWidth="0.75" />
      <circle cx="156" cy="37" r="4.5" fill={a} fillOpacity="0.3" />
      <text x="164"  y="41" fill={a}    fontSize="8"   fontFamily="-apple-system,sans-serif" fontWeight="700">AI Insight</text>
      <rect  x="152" y="50" width="110" height="4.5" rx="2" fill={bd} />
      <rect  x="152" y="50" width="95"  height="4.5" rx="2" fill={isDark ? "rgba(245,158,11,0.32)" : "rgba(217,119,6,0.28)"} />
      <rect  x="152" y="50" width="58"  height="4.5" rx="2" fill={a} fillOpacity="0.55" />
      <text x="152" y="66" fill={txt2} fontSize="7" fontFamily="-apple-system,sans-serif">87% confidence · 3 sources</text>
      <rect x="152" y="74" width="110" height="4.5" rx="1.5" fill={dim} />
      <rect x="152" y="74" width="68"  height="4.5" rx="1.5" fill={isDark ? "rgba(245,158,11,0.16)" : "rgba(217,119,6,0.13)"} />
      {/* Controls label */}
      <text x="14" y="112" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.09em">USER CONTROLS</text>
      {/* Control buttons */}
      {["Explain more", "View sources", "Dismiss"].map((label, i) => (
        <g key={i}>
          <rect x={10 + i * 90} y="118" width="80" height="15" rx="7.5" fill="none" stroke={bd} strokeWidth="0.75" />
          <text x={50 + i * 90} y="128" textAnchor="middle" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">{label}</text>
        </g>
      ))}
      {/* Feedback strip */}
      <rect x="10" y="143" width="260" height="15" rx="4" fill={panel} stroke={bd} strokeWidth="0.4" />
      <circle cx="22" cy="150.5" r="3" fill={a} fillOpacity="0.4" />
      <rect x="30" y="148" width="50" height="4" rx="1.5" fill={dim} />
      <rect x="97" y="148" width="1" height="5" fill={bd} />
      <circle cx="109" cy="150.5" r="3" fill={a} fillOpacity="0.4" />
      <rect x="117" y="148" width="50" height="4" rx="1.5" fill={dim} />
      <text x="140" y="172" textAnchor="middle" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">transparency · control · feedback at every step</text>
    </svg>
  );
};

const DesignSystemViz = ({ isDark }: { isDark: boolean }) => {
  const bg    = isDark ? "#080810" : "#eaeaf2";
  const panel = isDark ? "#0e0e16" : "#f4f4fc";
  const bd    = isDark ? "#1f1f30" : "#d8d8ec";
  const a     = isDark ? "#f59e0b" : "#d97706";
  const aFill = isDark ? "rgba(245,158,11,0.14)" : "rgba(217,119,6,0.14)";
  const aBd   = isDark ? "rgba(245,158,11,0.38)" : "rgba(217,119,6,0.42)";
  const txt1  = isDark ? "#e8e8f0" : "#111118";
  const txt2  = isDark ? "#8888aa" : "#777790";
  const txt3  = isDark ? "#55557a" : "#aaaacc";
  const dim   = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  const tokens = [
    isDark ? "#f59e0b" : "#d97706",
    isDark ? "rgba(245,158,11,0.45)" : "rgba(217,119,6,0.42)",
    isDark ? "#1f1f30" : "#d8d8ec",
    isDark ? "#13131e" : "#ebebf5",
    isDark ? "#e8e8f0" : "#111118",
    isDark ? "#55557a" : "#aaaacc",
  ];

  return (
    <svg viewBox="0 0 280 190" fill="none" className="w-full h-full" style={{ display: "block" }}>
      <rect width="280" height="190" fill={bg} />
      {/* Design Tokens */}
      <text x="14" y="18" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.09em">DESIGN TOKENS</text>
      {tokens.map((color, i) => (
        <rect key={i} x={14 + i * 40} y="22" width="32" height="20" rx="4" fill={color} stroke={bd} strokeWidth="0.5" />
      ))}
      {/* Typography */}
      <text x="14" y="58" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.09em">TYPOGRAPHY</text>
      <text x="14" y="73" fill={txt1} fontSize="13" fontFamily="-apple-system,sans-serif" fontWeight="600">Aa — Product UI Scale</text>
      <text x="14" y="84" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">Body · Label · Overline · Code mono</text>
      {/* Components */}
      <text x="14" y="99" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.09em">COMPONENTS</text>
      {/* Buttons */}
      <rect x="14"  y="104" width="64" height="17" rx="5" fill={aFill} stroke={aBd} strokeWidth="0.75" />
      <text x="46"  y="115" textAnchor="middle" fill={a}    fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="600">Primary</text>
      <rect x="84"  y="104" width="58" height="17" rx="5" fill="none" stroke={bd} strokeWidth="0.75" />
      <text x="113" y="115" textAnchor="middle" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">Secondary</text>
      <rect x="148" y="104" width="48" height="17" rx="5" fill={panel} stroke={bd} strokeWidth="0.5" />
      <text x="172" y="115" textAnchor="middle" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">Ghost</text>
      {/* Input + dropdown */}
      <rect x="14"  y="127" width="124" height="15" rx="4" fill={panel} stroke={bd} strokeWidth="0.75" />
      <rect x="20"  y="132" width="48"  height="4"  rx="1.5" fill={dim} />
      <rect x="204" y="127" width="62"  height="15" rx="4" fill={panel} stroke={bd} strokeWidth="0.5" />
      <text x="235" y="137" textAnchor="middle" fill={txt3} fontSize="6.5" fontFamily="-apple-system,sans-serif">Dropdown ▾</text>
      {/* Card patterns */}
      {[0,1,2].map(i => (
        <g key={i}>
          <rect x={14 + i * 88} y="150" width="80" height="30" rx="5" fill={panel} stroke={bd} strokeWidth="0.5" />
          <rect x={22 + i * 88} y="156" width={36 + (i*6)%18} height="5" rx="1.5" fill={isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)"} />
          <rect x={22 + i * 88} y="165" width={26 + (i*5)%20} height="4" rx="1.5" fill={dim} />
        </g>
      ))}
    </svg>
  );
};

// ─── Decision Card ─────────────────────────────────────────────────────────────

interface DecisionCardProps {
  num: string;
  workstream: string;
  title: string;
  description: string;
  visual: React.ReactNode;
  isDark: boolean;
  isHero?: boolean;
}

function DecisionCard({ num, workstream, title, description, visual, isDark, isHero = false }: DecisionCardProps) {
  return (
    <div className={`rounded-2xl border overflow-hidden flex flex-col ${
      isDark ? "border-white/[0.07] bg-[#0c0c12]" : "border-black/[0.07] bg-[#f2f2f8]"
    }`}>
      {/* Visual screen area */}
      <div className={`overflow-hidden flex-shrink-0 ${isHero ? "h-[220px]" : "h-[185px]"} ${
        isDark ? "bg-[#080810]" : "bg-[#e8e8f2]"
      }`}>
        {visual}
      </div>
      {/* Text area */}
      <div className={`p-5 lg:p-6 border-t ${isDark ? "border-white/[0.05]" : "border-black/[0.05]"}`}>
        <p className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-2.5 ${isDark ? "text-amber-400/55" : "text-amber-700/60"}`}>
          {num} · {workstream}
        </p>
        <h4 className={`${isHero ? "text-[1.15rem]" : "text-[15px]"} font-semibold leading-snug mb-2 ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
          {title}
        </h4>
        <p className={`text-sm leading-relaxed ${isDark ? "text-white/55" : "text-gray-500"}`}>
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Impact Outcome Icons ─────────────────────────────────────────────────────
// 5 minimal dual-tone abstract icons — amber primary, muted secondary.

const ImpactIcon = ({ index, isDark }: { index: number; isDark: boolean }) => {
  const a  = isDark ? "#f59e0b" : "#d97706";
  const s  = isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.14)";

  const shapes = [
    /* 0 — Layers / context */
    <svg key={0} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="22" height="7" rx="2.5" fill={s} opacity="0.6"/>
      <rect x="3" y="11" width="22" height="7" rx="2.5" fill={s} opacity="0.4"/>
      <rect x="3" y="16" width="22" height="7" rx="2.5" fill={a} fillOpacity="0.22" stroke={a} strokeWidth="0.7" strokeOpacity="0.5"/>
      <circle cx="14" cy="14" r="2.5" fill={a} fillOpacity="0.9"/>
    </svg>,
    /* 1 — Chat + bolt / fast insight */
    <svg key={1} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="4" width="22" height="15" rx="4.5" fill={s} opacity="0.65"/>
      <path d="M7 19 L5 24 L11 21" fill={s} opacity="0.65"/>
      <path d="M13 7.5 L11.5 13 L14.5 13 L11 21 L16.5 11.5 L13.5 11.5 Z" fill={a} fillOpacity="0.9"/>
    </svg>,
    /* 2 — Connected nodes / collaboration */
    <svg key={2} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="4" fill={a} fillOpacity="0.25" stroke={a} strokeWidth="1"/>
      <circle cx="5"  cy="8"  r="3" fill={s}/>
      <circle cx="23" cy="8"  r="3" fill={s}/>
      <circle cx="5"  cy="20" r="3" fill={s}/>
      <circle cx="23" cy="20" r="3" fill={s}/>
      <line x1="8"  y1="10"  x2="11" y2="12.5" stroke={a} strokeWidth="0.8" opacity="0.6"/>
      <line x1="20" y1="10"  x2="17" y2="12.5" stroke={s} strokeWidth="0.8"/>
      <line x1="8"  y1="18"  x2="11" y2="15.5" stroke={s} strokeWidth="0.8"/>
      <line x1="20" y1="18"  x2="17" y2="15.5" stroke={s} strokeWidth="0.8"/>
    </svg>,
    /* 3 — Grid + check / design system */
    <svg key={3} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4"  y="4"  width="8.5" height="8.5" rx="2" fill={s}/>
      <rect x="15.5" y="4"  width="8.5" height="8.5" rx="2" fill={a} fillOpacity="0.22" stroke={a} strokeWidth="0.7" strokeOpacity="0.5"/>
      <rect x="4"  y="15.5" width="8.5" height="8.5" rx="2" fill={s} opacity="0.55"/>
      <rect x="15.5" y="15.5" width="8.5" height="8.5" rx="2" fill={s} opacity="0.7"/>
      <path d="M17.5 20 L19.2 22 L22.5 18" stroke={a} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>,
    /* 4 — Target rings / MVP direction */
    <svg key={4} viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="14" cy="14" r="11" stroke={s} strokeWidth="0.9"/>
      <circle cx="14" cy="14" r="7"  stroke={a} strokeWidth="0.9" strokeOpacity="0.45"/>
      <circle cx="14" cy="14" r="3"  fill={a} fillOpacity="0.85"/>
      <path d="M19 5.5 L23 4 L23 8 L20 9 Z" fill={s}/>
      <line x1="20" y1="6.5" x2="16" y2="11.5" stroke={s} strokeWidth="0.75"/>
    </svg>,
  ];

  return (
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
      isDark ? "bg-amber-400/10 border border-amber-400/15" : "bg-amber-50 border border-amber-200/50"
    }`}>
      <div className="w-7 h-7">{shapes[index % shapes.length]}</div>
    </div>
  );
};

// ─── Impact Showcase SVG ──────────────────────────────────────────────────────
// Full-width Stripe-style brand centrepiece — always uses gradient regardless of theme.

const ImpactShowcaseSVG = () => {
  const sideBg = "#0d0d1a";
  const mainBg = "#09090f";
  const bd     = "#1e1e2c";
  const txt1   = "#e8e8f0";
  const txt2   = "#8484a2";
  const txt3   = "#4a4a66";
  const a      = "#f59e0b";
  const aFill  = "rgba(245,158,11,0.10)";
  const aBd    = "rgba(245,158,11,0.26)";

  return (
    <svg viewBox="0 0 960 510" className="w-full h-auto" xmlns="http://www.w3.org/2000/svg" style={{ display: "block" }}>
      <defs>
        <linearGradient id="impBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#3b0764"/>
          <stop offset="38%"  stopColor="#5b21b6"/>
          <stop offset="72%"  stopColor="#92400e"/>
          <stop offset="100%" stopColor="#b45309"/>
        </linearGradient>
        <linearGradient id="impSide" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#14142a"/>
          <stop offset="100%" stopColor="#0d0d1a"/>
        </linearGradient>
        <filter id="impCard" x="-8%" y="-8%" width="130%" height="135%">
          <feDropShadow dx="0" dy="8" stdDeviation="18" floodColor="#000" floodOpacity="0.55"/>
        </filter>
        <filter id="impAnnot" x="-6%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="0" dy="5" stdDeviation="12" floodColor="#000" floodOpacity="0.38"/>
        </filter>
        <clipPath id="impBrowser">
          <rect x="95" y="22" width="638" height="474" rx="12"/>
        </clipPath>
      </defs>

      {/* Gradient background */}
      <rect width="960" height="510" fill="url(#impBg)"/>

      {/* Browser shadow */}
      <g filter="url(#impCard)">
        <rect x="95" y="22" width="638" height="474" rx="12" fill={mainBg}/>
      </g>

      {/* ── Browser contents (clipped) ── */}
      <g clipPath="url(#impBrowser)">

        {/* Chrome bar */}
        <rect x="95" y="22" width="638" height="40" fill={sideBg}/>
        <circle cx="115" cy="42" r="5.5" fill="#ff5f57"/>
        <circle cx="132" cy="42" r="5.5" fill="#febc2e"/>
        <circle cx="149" cy="42" r="5.5" fill="#28c840"/>
        <rect x="262" y="32" width="220" height="18" rx="5" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
        <text x="372" y="44" textAnchor="middle" fill={txt3} fontSize="8" fontFamily="-apple-system,sans-serif">ivs.security/canvas/apex-rca</text>
        <rect x="496" y="32" width="48" height="16" rx="3" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.07)" strokeWidth="0.5"/>
        <text x="520" y="43" textAnchor="middle" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">Export</text>
        <rect x="550" y="32" width="54" height="16" rx="3" fill={aFill} stroke={aBd} strokeWidth="0.5"/>
        <text x="577" y="43" textAnchor="middle" fill={a} fontSize="7.5" fontFamily="-apple-system,sans-serif">Share ↗</text>

        {/* ── Left sidebar (95–252) ── */}
        <rect x="95" y="62" width="157" height="434" fill="url(#impSide)"/>
        <line x1="252" y1="62" x2="252" y2="496" stroke={bd} strokeWidth="0.75"/>

        {/* App logo */}
        <rect x="108" y="76" width="20" height="20" rx="5" fill={aFill} stroke={aBd} strokeWidth="0.75"/>
        <text x="118" y="89.5" textAnchor="middle" fill={a} fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="700">⬡</text>
        <text x="134" y="90" fill={txt1} fontSize="10" fontFamily="-apple-system,sans-serif" fontWeight="600">IVS</text>

        {/* Nav */}
        <rect x="95" y="108" width="157" height="26" fill="rgba(245,158,11,0.07)"/>
        <rect x="95" y="108" width="2.5" height="26" rx="1" fill={a}/>
        <text x="111" y="124" fill={txt1} fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="500">Investigations</text>
        <text x="111" y="154" fill={txt3} fontSize="9" fontFamily="-apple-system,sans-serif">Entity Map</text>
        <text x="111" y="180" fill={txt3} fontSize="9" fontFamily="-apple-system,sans-serif">Risk Matrix</text>
        <text x="111" y="206" fill={txt3} fontSize="9" fontFamily="-apple-system,sans-serif">AI Canvas</text>

        {/* Org context tree */}
        <text x="108" y="235" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.08em">ORG CONTEXT</text>
        <circle cx="116" cy="252" r="4.5" fill="rgba(245,158,11,0.2)" stroke={aBd} strokeWidth="0.75"/>
        <circle cx="116" cy="252" r="2" fill={a}/>
        <text x="126" y="256" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">Apex Financial</text>

        <line x1="116" y1="257" x2="116" y2="270" stroke={bd} strokeWidth="0.75" strokeDasharray="2.5,2"/>
        <line x1="116" y1="270" x2="124" y2="270" stroke={bd} strokeWidth="0.75" strokeDasharray="2.5,2"/>
        <rect x="124" y="263" width="116" height="16" rx="3" fill={aFill} stroke={aBd} strokeWidth="0.5"/>
        <circle cx="131" cy="271" r="3" fill={a}/>
        <text x="137" y="275" fill={a} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="600">Cloud Security</text>

        <line x1="124" y1="279" x2="124" y2="299" stroke={bd} strokeWidth="0.75" strokeDasharray="2.5,2"/>
        <line x1="124" y1="289" x2="132" y2="289" stroke={bd} strokeWidth="0.75" strokeDasharray="2.5,2"/>
        <circle cx="137" cy="289" r="3" fill="#ef4444" opacity="0.85"/>
        <text x="144" y="293" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif">auth-gateway</text>
        <line x1="124" y1="299" x2="132" y2="299" stroke={bd} strokeWidth="0.75" strokeDasharray="2.5,2"/>
        <circle cx="137" cy="299" r="3" fill="#22c55e" opacity="0.7"/>
        <text x="144" y="303" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif">k8s-cluster</text>

        <line x1="116" y1="279" x2="116" y2="318" stroke={bd} strokeWidth="0.75" strokeDasharray="2.5,2"/>
        <line x1="116" y1="316" x2="124" y2="316" stroke={bd} strokeWidth="0.75" strokeDasharray="2.5,2"/>
        <circle cx="130" cy="316" r="3" fill={txt3} opacity="0.45"/>
        <text x="137" y="320" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif">Infrastructure</text>

        {/* AI index badge */}
        <rect x="108" y="448" width="133" height="34" rx="6" fill={aFill} stroke={aBd} strokeWidth="0.75"/>
        <text x="118" y="461" fill={a} fontSize="7.5" fontFamily="-apple-system,sans-serif" fontWeight="700">✦ Semantic Index</text>
        <text x="118" y="474" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif">3 layers · 94% confidence</text>

        {/* ── Main canvas (252–733) ── */}
        <text x="268" y="83" fill={txt1} fontSize="11" fontFamily="-apple-system,sans-serif" fontWeight="600">Investigation Canvas</text>
        <text x="268" y="97" fill={txt3} fontSize="8" fontFamily="-apple-system,sans-serif">Apex Financial Corp · Root Cause Analysis</text>
        <rect x="476" y="73" width="54" height="14" rx="3" fill="rgba(239,68,68,0.1)" stroke="rgba(239,68,68,0.28)" strokeWidth="0.5"/>
        <text x="503" y="83" textAnchor="middle" fill="#ef4444" fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700">CRITICAL</text>
        <rect x="536" y="73" width="66" height="14" rx="3" fill={aFill} stroke={aBd} strokeWidth="0.5"/>
        <text x="569" y="83" textAnchor="middle" fill={a} fontSize="7" fontFamily="-apple-system,sans-serif" fontWeight="700">IN PROGRESS</text>
        <line x1="262" y1="106" x2="724" y2="106" stroke={bd} strokeWidth="0.5"/>

        {/* Finding card 1 */}
        <rect x="262" y="116" width="460" height="82" rx="7" fill="rgba(255,255,255,0.023)" stroke={bd} strokeWidth="0.5"/>
        <rect x="262" y="116" width="2.5" height="82" rx="1" fill="#ef4444" opacity="0.6"/>
        <text x="274" y="131" fill="#ef4444" fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.06em">⊕  ROOT CAUSE IDENTIFIED</text>
        <text x="274" y="148" fill={txt1} fontSize="9.5" fontFamily="-apple-system,sans-serif" fontWeight="500">Unresolved ownership in Cloud Security team</text>
        <text x="274" y="163" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">3 critical services lack clear ownership mapping. Semantic layer identified</text>
        <text x="274" y="174" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">2 overlapping team assignments creating accountability gaps.</text>
        <text x="634" y="131" fill={txt3} fontSize="7.5" fontFamily="-apple-system,sans-serif">View →</text>

        {/* Finding card 2 */}
        <rect x="262" y="206" width="460" height="82" rx="7" fill="rgba(255,255,255,0.018)" stroke={bd} strokeWidth="0.5"/>
        <rect x="262" y="206" width="2.5" height="82" rx="1" fill={a} opacity="0.5"/>
        <text x="274" y="221" fill={a} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.06em">✦  AI RECOMMENDATION</text>
        <text x="274" y="238" fill={txt1} fontSize="9.5" fontFamily="-apple-system,sans-serif" fontWeight="500">Reassign auth-gateway to Cloud Security · High priority</text>
        <text x="274" y="253" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">Consolidating ownership under Cloud Security reduces risk exposure by ~67%.</text>
        <text x="274" y="264" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">Similar resolution pattern confirmed in Q3 incident review.</text>
        <rect x="590" y="214" width="54" height="13" rx="3" fill="rgba(245,158,11,0.12)" stroke={aBd} strokeWidth="0.4"/>
        <text x="617" y="223" textAnchor="middle" fill={a} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="600">87% confident</text>

        {/* Finding card 3 */}
        <rect x="262" y="296" width="460" height="82" rx="7" fill="rgba(255,255,255,0.014)" stroke={bd} strokeWidth="0.5"/>
        <rect x="262" y="296" width="2.5" height="82" rx="1" fill="#8b5cf6" opacity="0.5"/>
        <text x="274" y="311" fill="#8b5cf6" fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="700" letterSpacing="0.06em">◈  IMPACT SCOPE</text>
        <text x="274" y="328" fill={txt1} fontSize="9.5" fontFamily="-apple-system,sans-serif" fontWeight="500">3 services · 2 teams · 1 unresolved assignment</text>
        <text x="274" y="343" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">Risk is concentrated and addressable. Resolving ownership removes the</text>
        <text x="274" y="354" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">primary escalation path for this vulnerability cluster.</text>

        {/* AI summary bar */}
        <rect x="262" y="390" width="460" height="92" rx="7" fill={aFill} stroke={aBd} strokeWidth="0.75"/>
        <circle cx="280" cy="410" r="8" fill="rgba(245,158,11,0.16)" stroke={aBd} strokeWidth="0.75"/>
        <text x="280" y="414" textAnchor="middle" fill={a} fontSize="10" fontFamily="-apple-system,sans-serif">✦</text>
        <text x="295" y="407" fill={a} fontSize="8.5" fontFamily="-apple-system,sans-serif" fontWeight="600">AI Investigation Summary</text>
        <rect x="376" y="399" width="54" height="12" rx="3" fill="rgba(245,158,11,0.12)" stroke={aBd} strokeWidth="0.4"/>
        <text x="403" y="408" textAnchor="middle" fill={a} fontSize="6.5" fontFamily="-apple-system,sans-serif" fontWeight="600">91% confident</text>
        <text x="270" y="425" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">"Risk is concentrated in 3 services owned by 2 overlapping teams. Unresolved ownership</text>
        <text x="270" y="437" fill={txt2} fontSize="8" fontFamily="-apple-system,sans-serif">is the primary driver. Semantic layer confirms Cloud Security as correct owner."</text>
        <text x="270" y="457" fill={txt3} fontSize="7" fontFamily="-apple-system,sans-serif">Sources: 3 linked investigations  ·  View evidence  ·  Dismiss</text>
        <rect x="614" y="450" width="90" height="16" rx="3" fill="rgba(255,255,255,0.055)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
        <text x="659" y="461" textAnchor="middle" fill={txt2} fontSize="7.5" fontFamily="-apple-system,sans-serif">Export Report ↗</text>
      </g>

      {/* ── Annotation card: Semantic Context Layer (left, floating) ── */}
      <rect x="12" y="138" width="196" height="96" rx="12" fill="white" filter="url(#impAnnot)"/>
      <line x1="208" y1="186" x2="252" y2="248" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="28" y="160" fill="#101018" fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="700">Semantic Context Layer</text>
      <text x="28" y="175" fill="#88889a" fontSize="8" fontFamily="-apple-system,sans-serif">Teams, ownership &amp; resources</text>
      <text x="28" y="186" fill="#88889a" fontSize="8" fontFamily="-apple-system,sans-serif">structurally linked and indexed.</text>
      <rect x="20" y="196" width="172" height="24" rx="5" fill="#09090f"/>
      <text x="30" y="212" fill="#555570" fontSize="7" fontFamily="'Courier New',monospace">semanticLayer<tspan fill="#f59e0b">.resolve</tspan>(<tspan fill="#a5b4fc">'ownership'</tspan>)</text>

      {/* ── Annotation card: AI Investigation Canvas (right top, floating) ── */}
      <rect x="756" y="58" width="198" height="96" rx="12" fill="white" filter="url(#impAnnot)"/>
      <line x1="756" y1="106" x2="733" y2="178" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="772" y="80" fill="#101018" fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="700">AI Investigation Canvas</text>
      <text x="772" y="95" fill="#88889a" fontSize="8" fontFamily="-apple-system,sans-serif">RCA insights generated from</text>
      <text x="772" y="106" fill="#88889a" fontSize="8" fontFamily="-apple-system,sans-serif">connected context data.</text>
      <rect x="764" y="116" width="178" height="24" rx="5" fill="#09090f"/>
      <text x="774" y="132" fill="#555570" fontSize="7" fontFamily="'Courier New',monospace">canvas<tspan fill="#f59e0b">.analyze</tspan>(<tspan fill="#a5b4fc">'risk-cluster'</tspan>)</text>

      {/* ── Annotation card: Collaborative Reporting (right bottom, floating) ── */}
      <rect x="756" y="296" width="198" height="96" rx="12" fill="white" filter="url(#impAnnot)"/>
      <line x1="756" y1="344" x2="733" y2="416" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeDasharray="4,3"/>
      <text x="772" y="318" fill="#101018" fontSize="9" fontFamily="-apple-system,sans-serif" fontWeight="700">Collaborative Reporting</text>
      <text x="772" y="333" fill="#88889a" fontSize="8" fontFamily="-apple-system,sans-serif">Export findings as shareable</text>
      <text x="772" y="344" fill="#88889a" fontSize="8" fontFamily="-apple-system,sans-serif">investigation reports.</text>
      <rect x="764" y="354" width="178" height="24" rx="5" fill="#09090f"/>
      <text x="774" y="370" fill="#555570" fontSize="7" fontFamily="'Courier New',monospace">canvas<tspan fill="#f59e0b">.share</tspan>(<tspan fill="#a5b4fc">'report'</tspan>)</text>
    </svg>
  );
};

// ─── Hero Section ──────────────────────────────────────────────────────────────

function CaseStudyHero({ project, isDark }: { project: Project; isDark: boolean }) {
  const muted = isDark ? "border-white/10 text-white/35" : "border-black/10 text-gray-400";

  return (
    <div className={`relative w-full overflow-hidden ${isDark ? "bg-[#06060a]" : "bg-[#fafaf8]"}`}>

      {/* Subtle radial gradient backdrop */}
      <div className={`absolute inset-0 pointer-events-none ${
        isDark
          ? "bg-[radial-gradient(ellipse_70%_80%_at_75%_50%,rgba(245,158,11,0.055)_0%,transparent_70%)]"
          : "bg-[radial-gradient(ellipse_70%_80%_at_75%_50%,rgba(217,119,6,0.06)_0%,transparent_70%)]"
      }`} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-0 py-16 lg:py-20">

        {/* Left: Text content */}
        <div className="w-full lg:w-[46%] lg:flex-shrink-0 relative z-10">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded border ${isDark ? "border-amber-500/35 text-amber-400" : "border-amber-600/40 text-amber-700"}`}>
              {project.category}
            </span>
            <span className={`text-[10px] px-2.5 py-1 rounded border ${muted}`}>{project.industry}</span>
            <span className={`text-[10px] px-2.5 py-1 rounded border ${muted}`}>{project.timeline}</span>
          </div>

          {/* Title */}
          <h1 className={`text-[2.4rem] md:text-[3rem] font-semibold tracking-tighter leading-[1.08] mb-5 ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
            {project.title}
          </h1>

          {/* Tagline */}
          {project.tagline && (
            <p className={`text-lg font-light leading-relaxed mb-5 max-w-lg ${isDark ? "text-amber-400/75" : "text-amber-700/80"}`}>
              {project.tagline}
            </p>
          )}

          {/* Description */}
          <p className={`text-base leading-relaxed mb-8 max-w-lg ${isDark ? "text-white/50" : "text-gray-500"}`}>
            {project.description}
          </p>

          {/* Meta strip */}
          <div className={`flex flex-wrap gap-x-8 gap-y-3 pt-7 border-t ${isDark ? "border-white/[0.06]" : "border-black/[0.07]"}`}>
            {[
              { label: "Role",     value: project.role },
              { label: "Industry", value: project.industry },
              { label: "Client",   value: project.clientSize },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className={`text-[9px] font-bold tracking-[0.1em] uppercase mb-1 ${isDark ? "text-white/22" : "text-gray-400"}`}>{label}</p>
                <p className={`text-sm font-medium ${isDark ? "text-white/65" : "text-gray-700"}`}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Floating UI widgets — natural height, overlay cards use relative offsets */}
        <div className="hidden lg:flex flex-1 items-center pl-10 -mr-12 relative">
          {/* Small overlay cards, positioned relative to the widget stack */}
          <div className="relative w-full">

            {/* Entity connection card — top-left, floats in front */}
            <div
              className={`absolute -top-8 -left-6 w-[210px] rounded-xl overflow-hidden border z-20 ${
                isDark
                  ? "border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                  : "border-black/[0.07] shadow-[0_16px_48px_rgba(0,0,0,0.12)]"
              }`}
            >
              <EntityConnectionSVG isDark={isDark} />
            </div>

            {/* Main dashboard card — fills right column, bleeds off screen right */}
            <div
              className={`rounded-xl overflow-hidden border ${
                isDark
                  ? "border-white/[0.08] shadow-[0_28px_72px_rgba(0,0,0,0.6)]"
                  : "border-black/[0.07] shadow-[0_28px_72px_rgba(0,0,0,0.14)]"
              }`}
            >
              <InvestigationDashboardSVG isDark={isDark} />
            </div>

            {/* AI insight pill — bottom-left, floats in front */}
            <div
              className={`absolute -bottom-6 -left-6 w-[210px] rounded-xl overflow-hidden border z-20 ${
                isDark
                  ? "border-amber-500/[0.2] shadow-[0_12px_40px_rgba(245,158,11,0.1),0_4px_24px_rgba(0,0,0,0.55)]"
                  : "border-amber-600/[0.22] shadow-[0_12px_40px_rgba(217,119,6,0.1),0_4px_24px_rgba(0,0,0,0.08)]"
              }`}
            >
              <AIInsightPillSVG isDark={isDark} />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

// ─── Modal ─────────────────────────────────────────────────────────────────────

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    if (!project) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className={`fixed inset-0 z-[100] ${isDark ? "bg-[#06060a]" : "bg-[#fafaf8]"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Sticky header */}
          <header className={`sticky top-0 left-0 right-0 h-14 z-20 flex items-center justify-between px-6 lg:px-12 border-b backdrop-blur-xl ${isDark ? "border-white/[0.06] bg-[#06060a]/85" : "border-black/[0.06] bg-[#fafaf8]/85"}`}>
            <div className="flex items-center gap-3 min-w-0 mr-4">
              <span className={`text-[10px] font-bold tracking-[0.1em] uppercase px-2.5 py-1 rounded border flex-shrink-0 ${isDark ? "border-amber-500/30 text-amber-400/80" : "border-amber-600/35 text-amber-700"}`}>
                {project.category}
              </span>
              <span className={`text-sm truncate ${isDark ? "text-white/40" : "text-gray-400"}`}>{project.title}</span>
            </div>
            <button
              onClick={onClose}
              className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-200 ${isDark ? "text-white/35 hover:text-white hover:bg-white/8" : "text-black/35 hover:text-black hover:bg-black/6"}`}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </header>

          {/* Scrollable body */}
          <div className="h-[calc(100vh-3.5rem)] overflow-y-auto">
            <CaseStudyContent project={project} isDark={isDark} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── Full case study content ───────────────────────────────────────────────────

function CaseStudyContent({ project, isDark }: { project: Project; isDark: boolean }) {
  const isRich = !!project.challenges;

  const metrics = (project.outcomes ?? [])
    .map(o => { const m = o.match(/^(\d+(?:\.\d+)?(?:%|x|\+)?)\s+(.+)/i); return m ? { value: m[1], label: m[2] } : null; })
    .filter((m): m is { value: string; label: string } => m !== null);

  return (
    <div>

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <CaseStudyHero project={project} isDark={isDark} />

      {/* ── All sections below use homepage content width ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">

        {/* ── Context + Challenges — combined Stripe-style split section ──────── */}
        <Divider isDark={isDark} />

        {isRich && project.challenges ? (
          /* Rich version: heading + challenge list left | fragmented-state widget right */
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

            {/* Left: label + heading + challenge list */}
            <div className="w-full lg:w-[46%] lg:flex-shrink-0">
              <SectionLabel isDark={isDark}>Context & Challenges</SectionLabel>

              <h2 className={`text-[1.6rem] md:text-[2rem] font-semibold tracking-tight leading-[1.2] mb-5 ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
                {project.context ?? project.problem}
              </h2>

              {project.contextPoints?.[0] && (
                <p className={`text-base leading-relaxed mb-10 ${isDark ? "text-white/55" : "text-gray-500"}`}>
                  {project.contextPoints[0].description}
                </p>
              )}

              {/* Challenge list with dual-tone icons */}
              <div className="space-y-8">
                {project.challenges.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    {/* Dual-tone icon */}
                    <div className={`w-10 h-10 flex-shrink-0 rounded-lg p-1.5 border mt-0.5 ${isDark ? "border-white/[0.07] bg-white/[0.025]" : "border-black/[0.07] bg-black/[0.02]"}`}>
                      <ChallengeIcon index={i} isDark={isDark} />
                    </div>
                    {/* Text */}
                    <div>
                      <div className={`w-px h-0 border-l border-dashed mb-0 hidden`} />
                      <h4 className={`text-[15px] font-semibold mb-1.5 leading-snug ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
                        {item.title}
                      </h4>
                      <p className={`text-sm leading-relaxed ${isDark ? "text-white/55" : "text-gray-500"}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: fragmented workspace widget stack */}
            <div className="hidden lg:block flex-1 relative -mr-12 self-center">
              <div className="relative">

                {/* Chat overlay — top-right, floats in front */}
                <div
                  className={`absolute -top-6 -right-4 w-[200px] rounded-xl overflow-hidden border z-20 ${
                    isDark
                      ? "border-white/[0.08] shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                      : "border-black/[0.07] shadow-[0_16px_48px_rgba(0,0,0,0.13)]"
                  }`}
                >
                  <ContextChatOverlaySVG isDark={isDark} />
                </div>

                {/* Main tracker card */}
                <div
                  className={`rounded-xl overflow-hidden border ${
                    isDark
                      ? "border-white/[0.08] shadow-[0_28px_72px_rgba(0,0,0,0.55)]"
                      : "border-black/[0.07] shadow-[0_28px_72px_rgba(0,0,0,0.13)]"
                  }`}
                >
                  <FragmentedTrackerSVG isDark={isDark} />
                </div>

              </div>
            </div>

          </div>
        ) : (
          /* Non-rich fallback: simple problem + solution */
          <>
            <SectionLabel isDark={isDark}>The Context</SectionLabel>
            <p className={`text-2xl md:text-[1.75rem] font-light leading-[1.65] tracking-tight mb-10 max-w-3xl ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
              {project.problem}
            </p>
            <Divider isDark={isDark} />
            <SectionLabel isDark={isDark}>The Solution</SectionLabel>
            <p className={`text-2xl md:text-[1.75rem] font-light leading-[1.65] tracking-tight mb-8 max-w-3xl ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
              {project.solution}
            </p>
            {project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.technologies.map(tech => (
                  <span key={tech} className={`text-xs font-mono px-3 py-1.5 rounded border ${isDark ? "border-white/10 text-white/45 bg-white/[0.025]" : "border-black/8 text-gray-500 bg-black/[0.02]"}`}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
          </>
        )}

        {/* ── What Shaped the Product — combined bento ───────────────────────── */}
        {isRich && project.keyDecisions && project.contributions && (() => {
          const designFoundation = project.contributions.find(c => c.area === "Design Foundation");
          return (
            <>
              <Divider isDark={isDark} />
              <SectionLabel isDark={isDark}>What Shaped the Product</SectionLabel>
              <p className={`text-base leading-relaxed mb-8 max-w-2xl ${isDark ? "text-white/55" : "text-gray-500"}`}>
                Five decisions defined the product's direction — from scoping the MVP to building the design foundation that made everything consistent.
              </p>
              {/* Hero card — Decision 01 */}
              <div className="mb-3">
                <DecisionCard
                  num="01"
                  workstream="Product Direction · MVP Definition"
                  title={project.keyDecisions[0].title}
                  description={project.keyDecisions[0].description}
                  visual={<SemanticLayerFlowViz isDark={isDark} />}
                  isDark={isDark}
                  isHero
                />
              </div>
              {/* 2×2 grid — Decisions 02–05 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <DecisionCard
                  num="02"
                  workstream="Key Journeys"
                  title={project.keyDecisions[1].title}
                  description={project.keyDecisions[1].description}
                  visual={<AIChatViz isDark={isDark} />}
                  isDark={isDark}
                />
                <DecisionCard
                  num="03"
                  workstream="Key Journeys"
                  title={project.keyDecisions[2].title}
                  description={project.keyDecisions[2].description}
                  visual={<CollaborativeCanvasViz isDark={isDark} />}
                  isDark={isDark}
                />
                <DecisionCard
                  num="04"
                  workstream="Product Direction"
                  title={project.keyDecisions[3].title}
                  description={project.keyDecisions[3].description}
                  visual={<TrustControlViz isDark={isDark} />}
                  isDark={isDark}
                />
                {designFoundation && (
                  <DecisionCard
                    num="05"
                    workstream="Design Foundation"
                    title={designFoundation.area}
                    description={designFoundation.detail}
                    visual={<DesignSystemViz isDark={isDark} />}
                    isDark={isDark}
                  />
                )}
              </div>
            </>
          );
        })()}

        {/* ── Process Timeline ───────────────────────────────────────────────── */}
        {project.processTimeline.length > 0 && (
          <>
            <Divider isDark={isDark} />
            <SectionLabel isDark={isDark}>Process</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {project.processTimeline.map((step, i) => (
                <div key={step.phase} className={`rounded-xl p-5 border ${isDark ? "border-white/[0.06] bg-white/[0.02]" : "border-black/[0.06] bg-black/[0.01]"}`}>
                  <p className={`text-[10px] font-bold tracking-[0.1em] uppercase mb-3 ${isDark ? "text-amber-400/60" : "text-amber-700/60"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h4 className={`text-base font-semibold mb-1.5 ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>{step.phase}</h4>
                  <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded mb-2 ${isDark ? "bg-amber-500/10 text-amber-400/75" : "bg-amber-50 text-amber-700"}`}>
                    {step.duration}
                  </span>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-white/55" : "text-gray-500"}`}>{step.description}</p>
                </div>
              ))}
            </div>
          </>
        )}


        {/* ── AI Workflow ────────────────────────────────────────────────────── */}
        {project.aiWorkflow.length > 0 && (
          <>
            <Divider isDark={isDark} />
            <SectionLabel isDark={isDark}>AI-Assisted Workflow</SectionLabel>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.aiWorkflow.map(step => (
                <div key={step.phase} className={`rounded-xl p-5 border ${isDark ? "border-white/[0.06] bg-white/[0.02]" : "border-black/[0.06] bg-black/[0.01]"}`}>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h4 className={`text-sm font-medium ${isDark ? "text-white/55" : "text-gray-500"}`}>{step.phase}</h4>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex-shrink-0 ${isDark ? "border-amber-500/25 text-amber-400/75 bg-amber-500/8" : "border-amber-600/25 text-amber-700 bg-amber-50"}`}>
                      {step.tool}
                    </span>
                  </div>
                  <p className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-gray-500"}`}>{step.impact}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── Impact & Outcomes (Stripe showcase pattern) ────────────────────── */}
        <Divider isDark={isDark} />

        {/* Two-column header */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-16 mb-12">
          <div className="lg:w-[46%]">
            <SectionLabel isDark={isDark}>Impact & Outcomes</SectionLabel>
            <h3 className={`text-[2rem] lg:text-[2.4rem] font-semibold leading-tight tracking-tight mt-3 ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
              From concept to<br className="hidden lg:block"/> credible product.
            </h3>
          </div>
          <div className="lg:w-[54%] lg:pt-10">
            <p className={`text-base leading-relaxed ${isDark ? "text-white/55" : "text-gray-500"}`}>
              Every decision — from scoping the MVP to structuring the semantic layer — was oriented around one goal: making a complex security product usable, trustworthy, and ready for real-world adoption.
            </p>
          </div>
        </div>

        {/* Full-width showcase visual */}
        <div className="rounded-2xl overflow-hidden mb-12">
          <ImpactShowcaseSVG />
        </div>

        {/* Impact items grid */}
        {isRich && project.impactItems ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {project.impactItems.map((item, i) => (
              <div key={i}>
                <ImpactIcon index={i} isDark={isDark} />
                <p className={`mt-4 text-sm leading-relaxed ${isDark ? "text-white/60" : "text-gray-600"}`}>
                  <span className={`font-semibold ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>{item.title}. </span>
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-0">
            {project.outcomes.map((outcome, i) => {
              const match = outcome.match(/^(\d+(?:\.\d+)?(?:%|x|\+)?)\s+(.+)/i);
              return (
                <div key={i} className={`flex items-baseline gap-5 py-4 border-b last:border-0 ${isDark ? "border-white/[0.05]" : "border-black/[0.05]"}`}>
                  {match ? (
                    <>
                      <span className={`text-3xl font-light tracking-tighter flex-shrink-0 w-20 text-right ${isDark ? "text-amber-400" : "text-amber-700"}`}>{match[1]}</span>
                      <span className={`text-base leading-relaxed ${isDark ? "text-white/65" : "text-gray-600"}`}>{match[2]}</span>
                    </>
                  ) : (
                    <>
                      <span className={`text-base font-light flex-shrink-0 w-20 text-right ${isDark ? "text-amber-400/50" : "text-amber-700/50"}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span className={`text-base leading-relaxed ${isDark ? "text-white/65" : "text-gray-600"}`}>{outcome}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Deliverables + Technologies */}
        {project.deliverables.length > 0 && (
          <div className="mt-8">
            <p className={`text-[10px] font-semibold tracking-[0.1em] uppercase mb-4 ${isDark ? "text-white/22" : "text-gray-400"}`}>Deliverables</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2.5 gap-x-10">
              {project.deliverables.map(d => (
                <div key={d} className={`flex items-center gap-2.5 text-sm ${isDark ? "text-white/50" : "text-gray-500"}`}>
                  <div className={`w-1 h-1 rounded-full flex-shrink-0 ${isDark ? "bg-amber-400/50" : "bg-amber-600/50"}`} />
                  {d}
                </div>
              ))}
            </div>
          </div>
        )}

        {project.technologies.length > 0 && (
          <div className="mt-6">
            <p className={`text-[10px] font-semibold tracking-[0.1em] uppercase mb-3 ${isDark ? "text-white/22" : "text-gray-400"}`}>Technologies</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <span key={tech} className={`text-xs font-mono px-3 py-1.5 rounded border ${isDark ? "border-white/10 text-white/45 bg-white/[0.025]" : "border-black/8 text-gray-500 bg-black/[0.02]"}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* ── AI Design Notes (rich) ─────────────────────────────────────────── */}
        {isRich && project.aiDesignNote && (
          <>
            <Divider isDark={isDark} />
            <SectionLabel isDark={isDark}>Designing for AI</SectionLabel>

            <blockquote className={`text-xl md:text-2xl font-light leading-[1.65] tracking-tight mb-6 max-w-3xl ${isDark ? "text-[#f2f2f5]" : "text-[#0f0f14]"}`}>
              <span className={`${isDark ? "text-amber-400/40" : "text-amber-600/40"}`}>"</span>
              {project.aiDesignNote}
              <span className={`${isDark ? "text-amber-400/40" : "text-amber-600/40"}`}>"</span>
            </blockquote>

            {project.reflection && (
              <p className={`text-sm leading-relaxed italic mb-8 max-w-2xl ${isDark ? "text-white/45" : "text-gray-400"}`}>
                {project.reflection}
              </p>
            )}

            {project.nextPhase && project.nextPhase.length > 0 && (
              <div>
                <p className={`text-[10px] font-semibold tracking-[0.1em] uppercase mb-3 ${isDark ? "text-white/22" : "text-gray-400"}`}>What Comes Next</p>
                <div className="space-y-2">
                  {project.nextPhase.map((item, i) => (
                    <div key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${isDark ? "text-white/55" : "text-gray-500"}`}>
                      <div className={`w-1.5 h-1.5 rounded-full mt-[5px] flex-shrink-0 ${isDark ? "bg-amber-400/35" : "bg-amber-600/35"}`} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
}
