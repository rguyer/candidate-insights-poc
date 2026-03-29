"use client";

import type { ScoreResult, SkillEvidence } from "@/lib/candidate-insights/types";
import ConfidenceBar from "./ConfidenceBar";
import SourceBadge from "./SourceBadge";

interface SkillEvidenceTableProps {
  score: ScoreResult;
  candidateName: string;
  onClose: () => void;
  embedded?: boolean;
}

function SkillTable({ skills }: { skills: SkillEvidence[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <th className="text-left py-2 pr-3 w-12">Rank</th>
            <th className="text-left py-2 pr-3">Skill + Evidence</th>
            <th className="text-left py-2 pr-3 w-24">Source</th>
            <th className="text-left py-2 w-24">Confidence</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr
              key={skill.rank}
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 pr-3 text-gray-400 font-medium">#{skill.rank}</td>
              <td className="py-3 pr-3">
                <div className="font-semibold text-gray-900">{skill.skill}</div>
                {skill.evidence && (
                  <div className="text-xs text-gray-500 italic mt-0.5 leading-relaxed">
                    &ldquo;{skill.evidence}&rdquo;
                  </div>
                )}
              </td>
              <td className="py-3 pr-3">
                <SourceBadge source={skill.source} />
              </td>
              <td className="py-3">
                <ConfidenceBar level={skill.confidence} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SkillEvidenceTable({
  score,
  candidateName,
  onClose,
  embedded = false,
}: SkillEvidenceTableProps) {
  const technicalSkills = score.skillEvidence.filter((s) => s.category === "technical");
  const softSkills = score.skillEvidence.filter((s) => s.category === "soft");

  const techMatched = technicalSkills.filter((s) => s.rawScore >= 5).length;
  const softMatched = softSkills.filter((s) => s.rawScore >= 5).length;
  const allTechMatched = techMatched === technicalSkills.length && technicalSkills.length > 0;
  const allSoftMatched = softMatched === softSkills.length && softSkills.length > 0;

  return (
    <div className={embedded ? "" : "bg-white rounded-2xl border border-gray-200 overflow-hidden"}>
      {/* Back button + Header — hidden when embedded */}
      {!embedded && (
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
          <div className="h-4 w-px bg-gray-300" />
          <h2 className="font-bold text-gray-900 text-sm">Skill Evidence — {candidateName}</h2>
        </div>
      )}
      {embedded && (
        <h3 className="font-bold text-gray-900 text-sm mb-4">Skill Evidence</h3>
      )}

      {/* Summary stats */}
      <div className="flex gap-4 px-5 py-3 border-b border-gray-100 bg-white">
        <div
          className={`text-sm font-medium ${
            allTechMatched ? "text-green-700" : "text-amber-700"
          }`}
        >
          {techMatched}/{technicalSkills.length} Technical Skills
          {allTechMatched && " — All matched from skills matrix"}
        </div>
        <div className="text-gray-300">·</div>
        <div
          className={`text-sm font-medium ${
            allSoftMatched ? "text-green-700" : "text-amber-700"
          }`}
        >
          {softMatched}/{softSkills.length} Soft Skills
          {allSoftMatched && " — All matched"}
        </div>
      </div>

      <div className="p-5 space-y-8">
        {/* Technical Skills */}
        {technicalSkills.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                Technical Skills
              </h3>
              <span className="text-xs text-gray-400 font-normal normal-case tracking-normal">
                Ranked by importance to this role
              </span>
            </div>
            <SkillTable skills={technicalSkills} />
          </section>
        )}

        {/* Soft Skills */}
        {softSkills.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">
                Soft Skills
              </h3>
              <span className="text-xs text-gray-400 font-normal normal-case tracking-normal">
                Ranked by importance to this role
              </span>
            </div>
            <SkillTable skills={softSkills} />
          </section>
        )}

        {score.skillEvidence.length === 0 && (
          <div className="text-sm text-gray-500 italic text-center py-8">
            No skill evidence available for this candidate.
          </div>
        )}
      </div>
    </div>
  );
}
