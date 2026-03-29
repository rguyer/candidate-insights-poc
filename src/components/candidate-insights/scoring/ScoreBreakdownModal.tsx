"use client";

import type { ScoreResult } from "@/lib/candidate-insights/types";

interface ScoreBreakdownModalProps {
  score: ScoreResult;
  candidateName: string;
  weightages: { skills: number; experience: number; education: number };
  onClose: () => void;
}

export default function ScoreBreakdownModal({
  score,
  candidateName,
  weightages,
  onClose,
}: ScoreBreakdownModalProps) {
  const skillsContribution = Math.round((score.skillsScore * weightages.skills) / 100);
  const experienceContribution = Math.round((score.experienceScore * weightages.experience) / 100);
  const educationContribution = Math.round((score.educationScore * weightages.education) / 100);

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Score Breakdown</h2>
            <p className="text-sm text-gray-500 mt-0.5">{candidateName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-4 flex-shrink-0"
            aria-label="Close"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Overall Score Composition */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Overall Score Composition
          </h3>
          <p className="text-xs text-gray-500 mb-3">
            Skills ({weightages.skills}%) + Experience ({weightages.experience}%) + Education (
            {weightages.education}%) = Overall (100%)
          </p>

          <div className="flex items-center gap-2">
            {/* Skills box */}
            <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
              <div className="text-3xl font-bold text-blue-700">{score.skillsScore}</div>
              <div className="text-xs font-semibold text-blue-600 uppercase tracking-wide mt-0.5">
                Skills
              </div>
              <div className="text-xs text-blue-500 mt-1">
                +{weightages.skills}% = {skillsContribution} pts
              </div>
            </div>

            <div className="text-gray-400 text-sm font-medium">+</div>

            {/* Experience box */}
            <div className="flex-1 bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
              <div className="text-3xl font-bold text-purple-700">{score.experienceScore}</div>
              <div className="text-xs font-semibold text-purple-600 uppercase tracking-wide mt-0.5">
                Experience
              </div>
              <div className="text-xs text-purple-500 mt-1">
                +{weightages.experience}% = {experienceContribution} pts
              </div>
            </div>

            <div className="text-gray-400 text-sm font-medium">+</div>

            {/* Education box */}
            <div className="flex-1 bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
              <div className="text-3xl font-bold text-amber-700">{score.educationScore}</div>
              <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide mt-0.5">
                Education
              </div>
              <div className="text-xs text-amber-500 mt-1">
                +{weightages.education}% = {educationContribution} pts
              </div>
            </div>

            <div className="text-gray-400 text-sm font-medium">→</div>

            {/* Overall */}
            <div className="flex-shrink-0 bg-green-600 rounded-xl p-3 text-center min-w-[72px]">
              <div className="text-3xl font-bold text-white">{score.overallScore}</div>
              <div className="text-xs font-bold text-green-100 uppercase tracking-wide mt-0.5">
                Overall
              </div>
            </div>
          </div>
        </section>

        {/* Penalties */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Penalties Applied
          </h3>
          {score.penalties.length === 0 ? (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-sm text-green-700">
              <span className="text-green-500 flex-shrink-0">✓</span>
              <span>No penalties applied — no seniority mismatch or location issues detected.</span>
            </div>
          ) : (
            <ul className="space-y-2">
              {score.penalties.map((penalty, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-sm text-amber-800"
                >
                  <span className="flex-shrink-0 mt-0.5">⚠</span>
                  <span>{penalty}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Qualification Scoring */}
        <section className="mb-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Qualification Scoring
          </h3>
          <ul className="space-y-2">
            {score.qualificationScoring.map((q, i) => (
              <li key={i} className="flex items-start gap-3 py-2 border-b border-gray-100 last:border-0">
                <span
                  className={`flex-shrink-0 mt-0.5 font-bold text-base ${
                    q.met ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {q.met ? "✓" : "✗"}
                </span>
                <span className="flex-1 text-sm text-gray-700">{q.requirement}</span>
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    q.level === "Required"
                      ? "bg-red-100 text-red-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {q.level}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Skill-by-skill legend */}
        <section className="mb-6 bg-gray-50 rounded-xl p-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Skill-by-Skill Scoring Legend
          </h3>
          <div className="flex flex-wrap gap-3 text-xs text-gray-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 inline-block" />
              ≥80% matched
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block" />
              50–79%
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" />
              &lt;50%
            </span>
            <span className="text-gray-300 ml-2">|</span>
            <span className="text-gray-500 ml-1">
              Confidence: <span className="font-medium text-green-600">high</span>{" "}
              <span className="font-medium text-yellow-600">mid</span>{" "}
              <span className="font-medium text-red-600">low</span>
            </span>
          </div>
        </section>

        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
