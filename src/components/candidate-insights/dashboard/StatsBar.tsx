"use client";

import Link from "next/link";
import { Briefcase, Users, TrendingUp, AlertCircle, XCircle } from "lucide-react";

interface StatsBarProps {
  totalJobs: number;
  totalCandidates: number;
  strongMatches: number;
  partialMatches: number;
  lowMatches: number;
}

interface StatTile {
  icon: React.ReactNode;
  value: number;
  label: string;
  valueClass: string;
  href: string;
}

export default function StatsBar({
  totalJobs,
  totalCandidates,
  strongMatches,
  partialMatches,
  lowMatches,
}: StatsBarProps) {
  const tiles: StatTile[] = [
    {
      icon: <Briefcase className="w-4 h-4 text-[#1A5C4E]" />,
      value: totalJobs,
      label: "Active Jobs",
      valueClass: "text-[#1A5C4E]",
      href: "/candidate-insights",
    },
    {
      icon: <Users className="w-4 h-4 text-gray-500" />,
      value: totalCandidates,
      label: "Total Candidates",
      valueClass: "text-gray-800",
      href: "/candidate-insights/candidates",
    },
    {
      icon: <TrendingUp className="w-4 h-4 text-green-600" />,
      value: strongMatches,
      label: "Strong Matches",
      valueClass: "text-green-700",
      href: "/candidate-insights/candidates?filter=Strong+Match",
    },
    {
      icon: <AlertCircle className="w-4 h-4 text-orange-500" />,
      value: partialMatches,
      label: "Partial Matches",
      valueClass: "text-orange-600",
      href: "/candidate-insights/candidates?filter=Partial+Match",
    },
    {
      icon: <XCircle className="w-4 h-4 text-red-500" />,
      value: lowMatches,
      label: "Low Matches",
      valueClass: "text-red-600",
      href: "/candidate-insights/candidates?filter=Low+Match",
    },
  ];

  return (
    <div className="w-full bg-[#E8F5F2] border-b border-[#1A5C4E]/20">
      <div className="max-w-7xl mx-auto px-6 py-3">
        <div className="flex items-center divide-x divide-[#1A5C4E]/15">
          {tiles.map((tile, idx) => (
            <Link
              key={idx}
              href={tile.href}
              className="hover:bg-[#d0ede8] transition-colors rounded-lg px-1 -mx-1"
            >
              <div
                className="flex items-center gap-2.5 px-5 first:pl-0 last:pr-0"
              >
                <div className="flex items-center justify-center w-7 h-7 bg-white rounded-md shadow-sm shrink-0">
                  {tile.icon}
                </div>
                <div className="flex flex-col leading-none">
                  <span className={`text-lg font-bold tabular-nums ${tile.valueClass}`}>
                    {tile.value.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 mt-0.5 whitespace-nowrap">
                    {tile.label}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
