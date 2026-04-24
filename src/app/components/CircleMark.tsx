import React from "react";
import { motion } from "motion/react";

// ─── Circle Mark — open hand-drawn oval ──────────────────────────────────────
// Pen approaches from outside, sweeps ~300° around the word, and lifts off
// WITHOUT closing the loop — visible gap on the left, just like the reference.

const VARIANTS = [
  {
    // Entry from left, sweeps clockwise, ends on lower-left (open gap)
    d: "M-8,11 L6,15 C5,6 24,0.5 50,0 C76,0.5 97,6 97,15 C97,24 76,28 50,28 C24,28 5,24 6,18",
    rotate: "-3deg",
  },
  {
    // Entry from upper-left, sweeps clockwise, ends mid-left
    d: "M-6,9 L5,14 C4,5 24,0 50,0 C76,0 98,5 98,14 C98,23 76,28 50,28 C24,28 3,23 5,17",
    rotate: "2.5deg",
  },
  {
    // Entry from above, sweeps clockwise, ends lower-left
    d: "M3,3 L5,15 C4,6 24,1 50,0.5 C76,0.5 97,7 97,15 C97,24 76,29 50,29 C24,29 3,25 5,19",
    rotate: "-1.2deg",
  },
];

export default function CircleMark({
  children,
  delay = 0.3,
  index = 0,
}: {
  children: React.ReactNode;
  delay?: number;
  index?: number;
}) {
  const v = VARIANTS[index % VARIANTS.length];

  return (
    <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-20px",
          top: "-8px",
          width: "calc(100% + 28px)",
          height: "calc(100% + 18px)",
          zIndex: 0,
          pointerEvents: "none",
          overflow: "visible",
          transform: `rotate(${v.rotate})`,
        }}
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
      >
        <motion.path
          d={v.d}
          stroke="rgba(196,82,42,0.58)"
          strokeWidth="4.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{
            pathLength: { duration: 0.75, ease: "easeInOut", delay },
            opacity: { duration: 0.01, delay },
          }}
        />
      </svg>
      <span style={{ position: "relative", zIndex: 1, color: "var(--terra-600, #b34d20)", fontWeight: 500 }}>
        {children}
      </span>
    </span>
  );
}
