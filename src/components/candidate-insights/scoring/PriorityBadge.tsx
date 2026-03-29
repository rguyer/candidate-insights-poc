"use client";

import type { SkillPriority } from "@/lib/candidate-insights/types";

interface PriorityBadgeProps {
  priority: SkillPriority;
  size?: "sm" | "md";
}

const colorMap: Record<SkillPriority, string> = {
  Essential:
    "bg-green-100 text-green-800 border border-green-300",
  Important:
    "bg-orange-100 text-orange-800 border border-orange-300",
  Preferred:
    "bg-yellow-100 text-yellow-800 border border-yellow-300",
  Desired:
    "bg-gray-100 text-gray-600 border border-gray-300",
};

const sizeMap: Record<NonNullable<PriorityBadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
};

export default function PriorityBadge({
  priority,
  size = "md",
}: PriorityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-medium rounded-full whitespace-nowrap ${colorMap[priority]} ${sizeMap[size]}`}
    >
      {priority}
    </span>
  );
}
