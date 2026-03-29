import Link from "next/link";
import CIHeader from "@/components/candidate-insights/layout/CIHeader";
import MatchBadge from "@/components/candidate-insights/scoring/MatchBadge";
import { MOCK_CANDIDATES } from "@/lib/candidate-insights/mock/candidates";
import { MOCK_JOBS } from "@/lib/candidate-insights/mock/jobs";
import precomputed from "@/data/scores/pre-computed.json";
import type { ScoreResult } from "@/lib/candidate-insights/types";

export default function CandidatesPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const scores = precomputed.scores as ScoreResult[];
  const activeFilter = searchParams.filter ?? "All";

  const filters = ["All", "Strong Match", "Partial Match", "Low Match"];

  // Build rows: each candidate + their score
  const rows = MOCK_CANDIDATES.map((c) => {
    const score = scores.find((s) => s.candidateId === c.id);
    const job = MOCK_JOBS.find((j) => j.id === c.appliedJobId);
    return { candidate: c, score, job };
  }).filter((r) => {
    if (activeFilter === "All") return true;
    return r.score?.matchLabel === activeFilter;
  }).sort((a, b) => (b.score?.overallScore ?? 0) - (a.score?.overallScore ?? 0));

  return (
    <div className="min-h-screen bg-gray-50">
      <CIHeader title="All Candidates" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Filter tabs */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {filters.map((f) => (
            <Link
              key={f}
              href={f === "All" ? "/candidate-insights/candidates" : `/candidate-insights/candidates?filter=${encodeURIComponent(f)}`}
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                activeFilter === f
                  ? "bg-[#1A5C4E] text-white border-[#1A5C4E]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#1A5C4E] hover:text-[#1A5C4E]"
              }`}
            >
              {f}
              {f !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({scores.filter((s) => s.matchLabel === f).length})
                </span>
              )}
            </Link>
          ))}
          <span className="ml-auto text-sm text-gray-400">{rows.length} candidates</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Candidate</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Applied For</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Match</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Score</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map(({ candidate, score, job }) => {
                const initials = candidate.name.split(" ").map((n) => n[0]).join("").toUpperCase();
                return (
                  <tr key={candidate.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#1A5C4E] flex items-center justify-center text-white text-xs font-bold shrink-0">
                          {initials}
                        </div>
                        <div>
                          <Link href={`/candidate-insights/candidates/${candidate.id}`} className="font-medium text-gray-900 hover:text-[#1A5C4E] hover:underline">
                            {candidate.name}
                          </Link>
                          <div className="text-xs text-gray-400">{candidate.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">
                      {job ? (
                        <Link href={`/candidate-insights/jobs/${job.id}`} className="hover:text-[#1A5C4E] hover:underline">
                          {job.title}
                        </Link>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      {score ? <MatchBadge label={score.matchLabel} size="sm" /> : "—"}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {score ? (
                        <span className={`font-bold ${score.overallScore >= 75 ? "text-green-700" : score.overallScore >= 50 ? "text-orange-600" : "text-red-600"}`}>
                          {score.overallScore}<span className="text-gray-400 font-normal text-xs">/100</span>
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/candidate-insights/candidates/${candidate.id}`} className="text-xs text-[#1A5C4E] font-medium hover:underline whitespace-nowrap">
                        View Profile →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
