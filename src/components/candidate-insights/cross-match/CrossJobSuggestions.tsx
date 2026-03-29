"use client";

import { useState } from "react";
import Link from "next/link";
import type { CrossJobMatch } from "@/lib/candidate-insights/types";
import MatchBadge from "../scoring/MatchBadge";

interface CrossJobSuggestionsProps {
  candidateId: string;
  appliedJobTitle: string;
  matches: CrossJobMatch[];
}

export default function CrossJobSuggestions({
  candidateId,
  appliedJobTitle,
  matches,
}: CrossJobSuggestionsProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (matches.length === 0) {
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-sm text-gray-500">
        No strong alternative matches found across other open positions.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-gray-500">
        This candidate scored low for <strong>{appliedJobTitle}</strong>. Based on their
        resume, they may be a stronger fit for:
      </p>
      {matches.map((match) => (
        <div
          key={match.jobId}
          className="bg-white border border-gray-200 rounded-xl overflow-hidden"
        >
          <div className="px-5 py-4 flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-semibold text-gray-900">{match.jobTitle}</span>
                <MatchBadge label={match.matchLabel} size="sm" />
                <span className="text-sm font-bold text-gray-700">
                  {match.estimatedScore}/100
                </span>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed">{match.reasoning}</p>
              {match.sharedSkills.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {match.sharedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <Link
              href={`/candidate-insights/jobs/${match.jobId}`}
              className="shrink-0 text-xs font-medium text-[#1A5C4E] hover:underline"
            >
              View job →
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
