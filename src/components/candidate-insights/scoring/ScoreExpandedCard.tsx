"use client";

import { useState } from "react";
import type { ScoreResult } from "@/lib/candidate-insights/types";

interface ScoreExpandedCardProps {
  score: ScoreResult;
  candidateName: string;
  weightages: { skills: number; experience: number; education: number };
  onViewDetails: () => void;
  onViewBreakdown: () => void;
}

function progressBarColor(pct: number): string {
  if (pct >= 80) return "bg-green-500";
  if (pct >= 50) return "bg-orange-400";
  return "bg-red-500";
}

function scoreCircleColor(score: number): string {
  if (score >= 85) return "border-green-500 text-green-700";
  if (score >= 50) return "border-orange-400 text-orange-600";
  return "border-red-500 text-red-600";
}

export default function ScoreExpandedCard({
  score,
  candidateName,
  weightages,
  onViewDetails,
  onViewBreakdown,
}: ScoreExpandedCardProps) {
  const [whyOpen, setWhyOpen] = useState(false);

  const totalSkills = score.technicalSkillsTotal + score.softSkillsTotal;
  const matchedSkills = score.technicalSkillsMatched + score.softSkillsMatched;
  const skillsPct = totalSkills > 0 ? Math.round((matchedSkills / totalSkills) * 100) : 0;
  const educationPct =
    score.educationTotal > 0 ? Math.round((score.educationMet / score.educationTotal) * 100) : 0;
  const experiencePct =
    score.experienceLevel === "High" ? 100 : score.experienceLevel === "Medium" ? 60 : 25;

  return (
    <div className="border-l-4 border-green-500 bg-white rounded-r-2xl shadow-sm mx-4 mb-3 overflow-hidden">
      {/* AI Disclaimer */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 flex items-center gap-2">
        <span className="text-amber-600 text-xs">⚠</span>
        <span className="text-xs text-amber-700 font-medium">
          AI-Generated Content: Reviewed for accuracy before use.
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Score Breakdown row */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Score Breakdown
            </h4>
            <button
              onClick={onViewDetails}
              className="text-xs text-green-700 hover:text-green-900 font-medium transition-colors"
            >
              View details →
            </button>
          </div>

          <div className="flex items-start gap-5">
            {/* Score gauge circle */}
            <div
              className={`flex-shrink-0 w-16 h-16 rounded-full border-4 flex items-center justify-center ${scoreCircleColor(
                score.overallScore
              )}`}
            >
              <span className="text-xl font-bold leading-none">{score.overallScore}</span>
            </div>

            {/* Progress bars */}
            <div className="flex-1 space-y-3">
              {/* Education */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Education</span>
                  <span className="text-xs text-gray-500">
                    {score.educationMet}/{score.educationTotal} met
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${progressBarColor(educationPct)}`}
                    style={{ width: `${educationPct}%` }}
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Skills</span>
                  <span className="text-xs text-gray-500">
                    {matchedSkills}/{totalSkills} matched
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${progressBarColor(skillsPct)}`}
                    style={{ width: `${skillsPct}%` }}
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Experience</span>
                  <span className="text-xs text-gray-500">{score.experienceLevel}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${progressBarColor(experiencePct)}`}
                    style={{ width: `${experiencePct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Compatibility badges */}
        <div className="flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              score.locationMatch
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            📍 {score.locationMatch ? "Location Match" : "Location Mismatch"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              score.seniorityMatch
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            🎯 {score.seniorityMatch ? "Seniority Match" : "Seniority Mismatch"}
          </span>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              score.employmentTypeMatch
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            💼 {score.employmentTypeMatch ? "Employment Type Compatible" : "Type Mismatch"}
          </span>
        </div>

        {/* Quick Highlights */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Quick Highlights
          </h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-green-50 border border-green-200 rounded-xl p-3">
              <div className="text-xs font-bold text-green-800 mb-2">✅ STRENGTHS</div>
              <ul className="space-y-1">
                {score.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-green-700 flex items-start gap-1.5">
                    <span className="flex-shrink-0 mt-0.5 text-green-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3">
              <div className="text-xs font-bold text-red-800 mb-2">⚠️ CONCERNS</div>
              <ul className="space-y-1">
                {score.concerns.map((c, i) => (
                  <li key={i} className="text-xs text-red-700 flex items-start gap-1.5">
                    <span className="flex-shrink-0 mt-0.5 text-red-400">•</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Why This Score accordion */}
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setWhyOpen((prev) => !prev)}
            className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>Why This Score?</span>
            <svg
              className={`w-4 h-4 text-gray-400 transition-transform ${whyOpen ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {whyOpen && (
            <div className="px-4 pb-4 pt-0">
              <p className="text-sm text-gray-600 leading-relaxed">{score.whyThisScore}</p>
            </div>
          )}
        </div>

        {/* Bottom link */}
        <div className="flex justify-end">
          <button
            onClick={onViewBreakdown}
            className="text-sm text-green-700 hover:text-green-900 font-medium transition-colors"
          >
            View Score Breakdown →
          </button>
        </div>
      </div>
    </div>
  );
}
