"use client";

interface MatchBadgeProps {
  label: "Strong Match" | "Partial Match" | "Low Match";
  size?: "sm" | "md";
}

const colorMap: Record<MatchBadgeProps["label"], string> = {
  "Strong Match": "bg-green-600 text-white",
  "Partial Match": "bg-orange-500 text-white",
  "Low Match": "bg-red-600 text-white",
};

const sizeMap: Record<NonNullable<MatchBadgeProps["size"]>, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export default function MatchBadge({ label, size = "md" }: MatchBadgeProps) {
  return (
    <span
      className={`inline-flex items-center font-semibold rounded-full whitespace-nowrap ${colorMap[label]} ${sizeMap[size]}`}
    >
      {label}
    </span>
  );
}
