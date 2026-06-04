import React from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";

interface TestimonialProps {
  quote: string;
  highlightText?: string;
  highlightParts?: string[];
  role: string;
  company: string;
  location: string;
  rating: number;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

function SectionLabel({ children }: { children: string }) {
  return (
    <p
      className="text-[11px] font-semibold tracking-[0.14em] uppercase mb-8"
      style={{ color: "var(--terra-500)" }}
    >
      {children}
    </p>
  );
}

export default function CaseStudyTestimonial({ quote, highlightText, highlightParts, role, company, location, rating }: TestimonialProps) {
  // Render quote with highlighted text (supports both single and multiple highlights)
  const renderQuote = () => {
    // Use highlightParts if available (multiple highlights)
    if (highlightParts && highlightParts.length > 0) {
      let remaining = quote;
      const result: React.ReactNode[] = [];

      for (const part of highlightParts) {
        if (remaining.includes(part)) {
          const [before, ...after] = remaining.split(part);
          result.push(before);
          result.push(
            <span key={`highlight-${part}`} style={{ color: "var(--terra-600)", fontWeight: 600 }}>
              {part}
            </span>
          );
          remaining = after.join(part);
        }
      }
      result.push(remaining);
      return result;
    }

    // Fallback to single highlightText
    if (highlightText && quote.includes(highlightText)) {
      const parts = quote.split(highlightText);
      return (
        <>
          {parts[0]}
          <span style={{ color: "var(--terra-600)", fontWeight: 600 }}>
            {highlightText}
          </span>
          {parts[1]}
        </>
      );
    }

    return quote;
  };

  return (
    <section
      className="py-20 lg:py-32"
      style={{
        background: "#ffffff",
        borderTop: "1px solid #e7e5e4",
        borderBottom: "1px solid #e7e5e4",
      }}
    >
      <div className="max-w-[900px] mx-auto px-6 lg:px-10">
        {/* Section Label */}
        <motion.div {...fadeUp(0)}>
          <SectionLabel>Client Impact</SectionLabel>
        </motion.div>

        {/* Quote mark */}
        <motion.div
          {...fadeUp(0.1)}
          className="mb-8"
        >
          <span
            className="text-8xl lg:text-9xl font-bold leading-none"
            style={{ color: "var(--terra-500)", opacity: 0.28 }}
          >
            "
          </span>
        </motion.div>

        {/* Quote */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.4] font-medium text-stone-900 mb-12"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {renderQuote()}
        </motion.p>

        {/* Stars */}
        <motion.div
          {...fadeUp(0.3)}
          className="flex gap-1.5 mb-8"
        >
          {[...Array(rating)].map((_, i) => (
            <Star
              key={i}
              className="w-4 h-4"
              fill="var(--terra-500)"
              style={{ color: "var(--terra-500)" }}
            />
          ))}
        </motion.div>

        {/* Attribution */}
        <motion.div
          {...fadeUp(0.4)}
          className="pt-8"
          style={{ borderTop: "1px solid #e7e5e4" }}
        >
          <p className="text-[14px] font-semibold text-stone-800">
            {role} · {company}
          </p>
          <p className="text-[13px] mt-1" style={{ color: "var(--terra-500)" }}>
            {location}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
