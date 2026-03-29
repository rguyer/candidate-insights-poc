"use client";

import type { SkillSource } from "@/lib/candidate-insights/types";

interface SourceBadgeProps {
  source: SkillSource;
}

const colorMap: Record<SkillSource, string> = {
  "O*NET": "bg-teal-100 text-teal-800",
  Resume: "bg-blue-100 text-blue-800",
  Inferred: "bg-yellow-100 text-yellow-800",
  Manual: "bg-purple-100 text-purple-800",
};

export default function SourceBadge({ source }: SourceBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${colorMap[source]}`}
    >
      {source}
    </span>
  );
}
