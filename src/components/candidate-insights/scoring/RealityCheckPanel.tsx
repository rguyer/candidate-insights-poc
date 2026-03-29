"use client";

import type { RealityCheckResult, SkillPriority } from "@/lib/candidate-insights/types";

interface RealityCheckPanelProps {
  result: RealityCheckResult;
  onReclassify: (skillName: string, newPriority: SkillPriority) => void;
}

const PRIORITY_BADGE_COLORS: Record<SkillPriority, string> = {
  Essential: "bg-red-100 text-red-800",
  Important: "bg-orange-100 text-orange-800",
  Preferred: "bg-blue-100 text-blue-800",
  Desired: "bg-gray-100 text-gray-700",
};

export default function RealityCheckPanel({ result, onReclassify }: RealityCheckPanelProps) {
  const hasFlags = result.scarcityFlags.length > 0;

  return (
    <div
      className={`rounded-2xl p-5 ${
        hasFlags
          ? "bg-amber-50 border border-amber-200"
          : "bg-green-50 border border-green-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-start gap-2 mb-4">
        <span className="text-lg flex-shrink-0">{hasFlags ? "⚠️" : "✓"}</span>
        <div>
          <h3
            className={`font-bold text-base ${
              hasFlags ? "text-orange-800" : "text-green-800"
            }`}
          >
            Talent Market Reality Check
          </h3>
          <p
            className={`text-sm mt-0.5 ${
              hasFlags ? "text-amber-700" : "text-green-700"
            }`}
          >
            {result.overallAssessment}
          </p>
        </div>
      </div>

      {/* Scarcity flags */}
      {hasFlags && (
        <ul className="space-y-4">
          {result.scarcityFlags.map((flag) => (
            <li
              key={flag.skillName}
              className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm"
            >
              {/* Skill name + priority */}
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-gray-900 text-sm">{flag.skillName}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    PRIORITY_BADGE_COLORS[flag.priority]
                  }`}
                >
                  {flag.priority}
                </span>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mb-2">
                <span className="text-xs text-gray-600">
                  Eliminates{" "}
                  <span className="font-semibold text-red-700">
                    {flag.candidatesEliminated}/{result.totalCandidates} candidates
                  </span>{" "}
                  ({flag.eliminationRate}%)
                </span>
                <span className="text-xs text-gray-500">
                  ~{flag.estimatedMarketRarity}% of professionals hold this skill
                </span>
              </div>

              {/* Rationale */}
              <p className="text-xs text-gray-500 italic mb-3 leading-relaxed">
                {flag.rationale}
              </p>

              {/* Reclassify button */}
              {flag.suggestedDowngrade && (
                <button
                  onClick={() => onReclassify(flag.skillName, flag.suggestedDowngrade!)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-green-600 text-green-700 text-xs font-semibold hover:bg-green-50 transition-colors"
                >
                  Reclassify to {flag.suggestedDowngrade} →
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
