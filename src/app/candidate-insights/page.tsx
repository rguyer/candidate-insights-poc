import CIHeader from "@/components/candidate-insights/layout/CIHeader";
import JobCard from "@/components/candidate-insights/dashboard/JobCard";
import StatsBar from "@/components/candidate-insights/dashboard/StatsBar";
import { MOCK_JOBS } from "@/lib/candidate-insights/mock/jobs";
import precomputed from "@/data/scores/pre-computed.json";
import type { ScoreResult } from "@/lib/candidate-insights/types";

function buildScoresSummary(jobId: string, scores: ScoreResult[]) {
  const jobScores = scores.filter((s) => s.jobId === jobId);
  return {
    total: jobScores.length,
    scored: jobScores.length,
    strongMatches: jobScores.filter((s) => s.matchLabel === "Strong Match").length,
    partialMatches: jobScores.filter((s) => s.matchLabel === "Partial Match").length,
    lowMatches: jobScores.filter((s) => s.matchLabel === "Low Match").length,
  };
}

export default function CandidateInsightsDashboard() {
  const scores = precomputed.scores as ScoreResult[];

  const allStrong = scores.filter((s) => s.matchLabel === "Strong Match").length;
  const allPartial = scores.filter((s) => s.matchLabel === "Partial Match").length;
  const allLow = scores.filter((s) => s.matchLabel === "Low Match").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <CIHeader />

      <StatsBar
        totalJobs={MOCK_JOBS.length}
        totalCandidates={scores.length}
        strongMatches={allStrong}
        partialMatches={allPartial}
        lowMatches={allLow}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900">Active Job Openings</h2>
          <p className="text-sm text-gray-500 mt-1">
            Click a job to view the O*NET-powered rubric and ranked candidates.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {MOCK_JOBS.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              scoresSummary={buildScoresSummary(job.id, scores)}
            />
          ))}
        </div>

        {/* Demo note */}
        <div className="mt-8 bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800">
          <strong>O*NET-Powered Demo</strong> — Skills and weights are derived from O*NET occupational
          data (SOC codes), not manually extracted from job descriptions. Scores are pre-computed
          for instant demo performance.
        </div>
      </div>
    </div>
  );
}
