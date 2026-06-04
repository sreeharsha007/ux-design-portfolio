import React from "react";
import { motion } from "motion/react";

// ─── Highlighter Mark — organic SVG highlight, pen-draw reveal ───────────────
// Path: top pass (left→right) → rounded right tooth → middle pass (right→left,
// stops short of left edge) → rounded left tooth → bottom pass (left→right,
// overshoots right edge). Mimics a natural back-and-forth human highlight.

export default function HighlightMark({
  children,
  delay = 0.3,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <span style={{ position: "relative", display: "inline", whiteSpace: "normal" }}>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-6px",
          top: "-8%",
          width: "calc(100% + 12px)",
          height: "116%",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "visible",
          transform: "rotate(-0.4deg)",
          filter: "blur(0.5px)",
        }}
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M-1,2.2 L84,2.2 Q103,2.2 103,3.7 Q103,5.2 84,5.2 L22,5.2 Q8,5.2 8,6.6 Q8,8 22,8 L110,8"
          stroke="rgba(196,82,42,0.21)"
          strokeWidth="3.2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            pathLength: { duration: 0.65, ease: "easeInOut", delay },
            opacity: { duration: 0.01, delay },
          }}
        />
      </svg>
      <span style={{ position: "relative", zIndex: 1, color: "var(--terra-600, #b34d20)", fontWeight: 600 }}>
        {children}
      </span>
    </span>
  );
}
