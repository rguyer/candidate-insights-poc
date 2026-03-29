"use client";

import type { ScoreResult } from "@/lib/candidate-insights/types";
import MatchBadge from "./MatchBadge";
import ScoreExpandedCard from "./ScoreExpandedCard";

interface CandidateRowProps {
  rank: number;
  score: ScoreResult;
  candidate: { id: string; name: string; email: string };
  weightages: { skills: number; experience: number; education: number };
  isNewlyEligible?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onViewDetails: () => void;
  onViewBreakdown: () => void;
}

const RANK_AVATAR_COLORS: string[] = [
  "bg-yellow-500",  // 1st
  "bg-gray-400",    // 2nd
  "bg-amber-600",   // 3rd
  "bg-blue-500",    // 4+
  "bg-purple-500",
  "bg-teal-500",
  "bg-pink-500",
  "bg-indigo-500",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(rank: number): string {
  return RANK_AVATAR_COLORS[Math.min(rank - 1, RANK_AVATAR_COLORS.length - 1)];
}

export default function CandidateRow({
  rank,
  score,
  candidate,
  weightages,
  isNewlyEligible = false,
  isExpanded,
  onToggle,
  onViewDetails,
  onViewBreakdown,
}: CandidateRowProps) {
  return (
    <div className={`rounded-2xl border border-gray-200 overflow-hidden bg-white shadow-sm ${isNewlyEligible ? "animate-flash-green" : ""}`}>
      {/* Main row */}
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        {/* Rank */}
        <span className="text-gray-400 font-bold text-sm w-8 flex-shrink-0 text-right">
          {rank}
        </span>

        {/* Avatar */}
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-white text-xs font-bold ${getAvatarColor(
            rank
          )}`}
        >
          {getInitials(candidate.name)}
        </div>

        {/* Name + email */}
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-gray-900 text-sm truncate">{candidate.name}</div>
          <div className="text-xs text-gray-500 truncate">{candidate.email}</div>
        </div>

        {/* Newly eligible pill */}
        {isNewlyEligible && (
          <span className="flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-300">
            Newly eligible
          </span>
        )}

        {/* Match badge */}
        <div className="flex-shrink-0">
          <MatchBadge label={score.matchLabel} size="sm" />
        </div>

        {/* Score */}
        <div className="flex-shrink-0 text-right">
          <span className="font-bold text-gray-900 text-sm">{score.overallScore}</span>
          <span className="text-xs text-gray-400">/100</span>
        </div>

        {/* Chevron */}
        <svg
          className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded panel */}
      {isExpanded && (
        <div className="border-t border-gray-100 pt-3 pb-1">
          <ScoreExpandedCard
            score={score}
            candidateName={candidate.name}
            weightages={weightages}
            onViewDetails={onViewDetails}
            onViewBreakdown={onViewBreakdown}
          />
        </div>
      )}
    </div>
  );
}
