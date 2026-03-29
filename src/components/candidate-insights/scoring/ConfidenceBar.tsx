"use client";

import type { ConfidenceLevel } from "@/lib/candidate-insights/types";

interface ConfidenceBarProps {
  level: ConfidenceLevel;
  className?: string;
}

const TOTAL_SEGMENTS = 5;

const configMap: Record<
  ConfidenceLevel,
  { filled: number; filledClass: string; emptyClass: string }
> = {
  high: {
    filled: 5,
    filledClass: "bg-green-500",
    emptyClass: "bg-green-100",
  },
  mid: {
    filled: 3,
    filledClass: "bg-yellow-400",
    emptyClass: "bg-yellow-100",
  },
  low: {
    filled: 2,
    filledClass: "bg-red-500",
    emptyClass: "bg-gray-200",
  },
};

export default function ConfidenceBar({ level, className = "" }: ConfidenceBarProps) {
  const { filled, filledClass, emptyClass } = configMap[level];

  return (
    <div className={`flex items-center gap-0.5 ${className}`} style={{ width: "80px" }}>
      {Array.from({ length: TOTAL_SEGMENTS }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 rounded-sm ${i < filled ? filledClass : emptyClass}`}
        />
      ))}
    </div>
  );
}
