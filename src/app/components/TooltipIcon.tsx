import React, { useState } from "react";
import { Zap } from "lucide-react";

interface TooltipIconProps {
  text: string;
}

export default function TooltipIcon({ text }: TooltipIconProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-flex items-center ml-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full transition-opacity hover:opacity-80"
        style={{ background: "rgba(217, 119, 6, 0.15)", color: "var(--terra-600)" }}
        aria-label="More information"
      >
        <Zap className="w-3 h-3" strokeWidth={2.5} />
      </button>

      {isOpen && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 rounded-lg text-[12px] font-medium whitespace-nowrap z-50 pointer-events-none"
          style={{
            background: "#1c1917",
            color: "#ffffff",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          {text}
          {/* Tooltip arrow */}
          <div
            className="absolute top-full left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "4px solid transparent",
              borderRight: "4px solid transparent",
              borderTop: "4px solid #1c1917",
            }}
          />
        </div>
      )}
    </div>
  );
}
