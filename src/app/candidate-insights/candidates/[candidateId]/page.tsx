"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import CIHeader from "@/components/candidate-insights/layout/CIHeader";
import MatchBadge from "@/components/candidate-insights/scoring/MatchBadge";
import CrossJobSuggestions from "@/components/candidate-insights/cross-match/CrossJobSuggestions";
import SkillEvidenceTable from "@/components/candidate-insights/scoring/SkillEvidenceTable";
import { MOCK_CANDIDATES } from "@/lib/candidate-insights/mock/candidates";
import { MOCK_JOBS, getJobById } from "@/lib/candidate-insights/mock/jobs";
import precomputed from "@/data/scores/pre-computed.json";
import type { ScoreResult, CrossJobMatch } from "@/lib/candidate-insights/types";

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = params.candidateId as string;

  const candidate = MOCK_CANDIDATES.find((c) => c.id === candidateId);
  const appliedScore = (precomputed.scores as ScoreResult[]).find(
    (s) => s.candidateId === candidateId
  );
  const appliedJob = appliedScore ? getJobById(appliedScore.jobId) : null;

  const [crossMatches, setCrossMatches] = useState<CrossJobMatch[]>([]);
  const [loadingCrossMatch, setLoadingCrossMatch] = useState(false);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    if (!appliedScore || appliedScore.matchLabel !== "Low Match") return;
    setLoadingCrossMatch(true);
    fetch("/api/candidate-insights/cross-match", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ candidateId, appliedJobId: appliedScore.jobId }),
    })
      .then((r) => r.json())
      .then((data) => setCrossMatches(data.matches ?? []))
      .catch(console.error)
      .finally(() => setLoadingCrossMatch(false));
  }, [candidateId, appliedScore]);

  if (!candidate || !appliedScore || !appliedJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <CIHeader title="Candidate Not Found" />
        <div className="mx-auto max-w-4xl px-6 py-12 text-center text-gray-500">
          Candidate not found.{" "}
          <Link href="/candidate-insights" className="text-[#1A5C4E] underline">
            Back to dashboard
          </Link>
        </div>
      </div>
    );
  }

  const initials = candidate.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50">
      <CIHeader title={candidate.name} />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-6 space-y-5">

        {/* Candidate hero card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-start gap-5">
          <div className="h-14 w-14 rounded-full bg-[#1A5C4E] flex items-center justify-center text-white text-xl font-bold shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">{candidate.name}</h1>
              <MatchBadge label={appliedScore.matchLabel} />
              <span className="text-2xl font-bold text-gray-700">
                {appliedScore.overallScore}
                <span className="text-base font-normal text-gray-400">/100</span>
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{candidate.email}</p>
            <p className="text-sm text-gray-500 mt-0.5">
              Applied for:{" "}
              <Link
                href={`/candidate-insights/jobs/${appliedJob.id}`}
                className="text-[#1A5C4E] font-medium hover:underline"
              >
                {appliedJob.title}
              </Link>{" "}
              · {appliedJob.department}
            </p>
          </div>
          <Link
            href={`/candidate-insights/jobs/${appliedJob.id}`}
            className="shrink-0 text-sm text-[#1A5C4E] font-medium hover:underline"
          >
            ← Back to job
          </Link>
        </div>

        {/* Score summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Skills Score", value: appliedScore.skillsScore, weight: "55%" },
            { label: "Experience", value: appliedScore.experienceScore, weight: "25%" },
            { label: "Education", value: appliedScore.educationScore, weight: "20%" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-white rounded-xl border border-gray-200 p-4 text-center"
            >
              <p className="text-3xl font-bold text-gray-900">{item.value}</p>
              <p className="text-sm text-gray-600 font-medium mt-0.5">{item.label}</p>
              <p className="text-xs text-gray-400">{item.weight} weight</p>
            </div>
          ))}
        </div>

        {/* Strengths + Concerns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-green-800 mb-3">✅ STRENGTHS</h3>
            <ul className="space-y-2">
              {appliedScore.strengths.map((s, i) => (
                <li key={i} className="text-sm text-green-900 leading-relaxed">
                  · {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-sm font-bold text-red-800 mb-3">⚠️ CONCERNS</h3>
            <ul className="space-y-2">
              {appliedScore.concerns.map((c, i) => (
                <li key={i} className="text-sm text-red-900 leading-relaxed">
                  · {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Why This Score */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">Why This Score?</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{appliedScore.whyThisScore}</p>
        </div>

        {/* Skill evidence */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <SkillEvidenceTable
            score={appliedScore}
            candidateName={candidate.name}
            onClose={() => {}}
            embedded
          />
        </div>

        {/* Cross-job matching — only for Low Match */}
        {appliedScore.matchLabel === "Low Match" && (
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="text-sm font-bold text-gray-900 mb-4">
              🔄 Cross-Job Matching — Where Else Could This Candidate Fit?
            </h3>
            {loadingCrossMatch ? (
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 12 0 12 12h-4z" />
                </svg>
                Analyzing fit across {MOCK_JOBS.length - 1} other open positions…
              </div>
            ) : (
              <CrossJobSuggestions
                candidateId={candidateId}
                appliedJobTitle={appliedJob.title}
                matches={crossMatches}
              />
            )}
          </div>
        )}

        {/* Resume viewer */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setShowResume(!showResume)}
            className="w-full flex items-center justify-between px-5 py-4 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>📄 Resume</span>
            <svg
              className={`h-4 w-4 text-gray-400 transition-transform ${showResume ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showResume && (
            <div className="px-5 pb-5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap border-t border-gray-100 pt-4">
              {candidate.resume}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
