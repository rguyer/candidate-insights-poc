"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";
import CIHeader from "@/components/candidate-insights/layout/CIHeader";
import SkillColumn from "@/components/candidate-insights/rubric/SkillColumn";
import WeightageSliders from "@/components/candidate-insights/rubric/WeightageSliders";
import QualificationsSection from "@/components/candidate-insights/rubric/QualificationsSection";
import RubricActions from "@/components/candidate-insights/rubric/RubricActions";
import StatusBar from "@/components/candidate-insights/scoring/StatusBar";
import CandidateRow from "@/components/candidate-insights/scoring/CandidateRow";
import SkillEvidenceTable from "@/components/candidate-insights/scoring/SkillEvidenceTable";
import ScoreBreakdownModal from "@/components/candidate-insights/scoring/ScoreBreakdownModal";
import RealityCheckPanel from "@/components/candidate-insights/scoring/RealityCheckPanel";
import { computeRealityCheck, recalculateScore, scoreToMatchLabel } from "@/lib/candidate-insights/onet/rubric-builder";
import type {
  MockJob,
  MockCandidate,
  ScoringRubric,
  ScoreResult,
  OnetSnapshot,
  SkillPriority,
  RubricSkill,
  ScoringWeightages,
} from "@/lib/candidate-insights/types";

interface Props {
  job: MockJob;
  initialRubric: ScoringRubric;
  initialScores: ScoreResult[];
  candidates: MockCandidate[];
  snapshot: OnetSnapshot;
}

type ActiveView = "rubric" | "results";

export default function JobDetailClient({
  job,
  initialRubric,
  initialScores,
  candidates,
  snapshot,
}: Props) {
  const [activeView, setActiveView] = useState<ActiveView>("rubric");
  const [rubric, setRubric] = useState<ScoringRubric>(initialRubric);
  const [scores, setScores] = useState<ScoreResult[]>(initialScores);
  const [expandedCandidateId, setExpandedCandidateId] = useState<string | null>(null);
  const [detailCandidateId, setDetailCandidateId] = useState<string | null>(null);
  const [breakdownCandidateId, setBreakdownCandidateId] = useState<string | null>(null);
  const [newlyEligibleIds, setNewlyEligibleIds] = useState<Set<string>>(new Set());

  // Live re-ranking: recalculate all scores when a skill priority changes
  const handleSkillChange = useCallback(
    (skillId: string, weight: number, priority: SkillPriority) => {
      // Update rubric skill
      const updateSkills = (skills: RubricSkill[]) =>
        skills.map((s) => (s.id === skillId ? { ...s, weight, priority } : s));

      const newRubric = {
        ...rubric,
        technicalSkills: updateSkills(rubric.technicalSkills),
        softSkills: updateSkills(rubric.softSkills),
      };
      setRubric(newRubric);

      // Recalculate every candidate's score client-side
      const prevLabels = new Map(scores.map((s) => [s.candidateId, s.matchLabel]));

      const newScores = scores.map((score) => {
        // Update the priority on this skill in the evidence
        const updatedEvidence = score.skillEvidence.map((e) =>
          e.skill.toLowerCase().replace(/[^a-z0-9]/g, "") ===
          skillId.replace(/^(tech|soft)-/, "").replace(/[^a-z0-9]/g, "")
            ? { ...e, priority }
            : e
        );

        const { overallScore, skillsScore } = recalculateScore(
          updatedEvidence,
          newRubric.weightages,
          score.experienceScore,
          score.educationScore
        );

        return {
          ...score,
          skillEvidence: updatedEvidence,
          overallScore,
          skillsScore,
          matchLabel: scoreToMatchLabel(overallScore),
        };
      });

      // Detect newly eligible (crossed from Low/Partial → Strong threshold)
      const newlyEligible = new Set<string>();
      newScores.forEach((s) => {
        const prev = prevLabels.get(s.candidateId);
        if (
          prev !== "Strong Match" &&
          s.matchLabel === "Strong Match"
        ) {
          newlyEligible.add(s.candidateId);
        }
      });

      if (newlyEligible.size > 0) {
        setNewlyEligibleIds(newlyEligible);
        setTimeout(() => setNewlyEligibleIds(new Set()), 2000);
      }

      setScores(newScores);
    },
    [rubric, scores]
  );

  const handleWeightageChange = useCallback(
    (weightages: ScoringWeightages) => {
      setRubric((r) => ({ ...r, weightages }));
      // Recalculate all scores with new weightages
      setScores((prev) =>
        prev.map((score) => {
          const { overallScore, skillsScore } = recalculateScore(
            score.skillEvidence,
            weightages,
            score.experienceScore,
            score.educationScore
          );
          return {
            ...score,
            overallScore,
            skillsScore,
            matchLabel: scoreToMatchLabel(overallScore),
          };
        })
      );
    },
    []
  );

  // Reality Check
  const realityCheck = useMemo(
    () => computeRealityCheck(rubric, scores),
    [rubric, scores]
  );

  // Sorted ranked candidates
  const rankedScores = useMemo(
    () => [...scores].sort((a, b) => b.overallScore - a.overallScore),
    [scores]
  );

  const detailScore = detailCandidateId
    ? scores.find((s) => s.candidateId === detailCandidateId)
    : null;
  const breakdownScore = breakdownCandidateId
    ? scores.find((s) => s.candidateId === breakdownCandidateId)
    : null;

  const getCandidateName = (id: string) =>
    candidates.find((c) => c.id === id)?.name ?? id;

  const handleReclassify = useCallback(
    (skillName: string, newPriority: SkillPriority) => {
      const allSkills = [...rubric.technicalSkills, ...rubric.softSkills];
      const skill = allSkills.find(
        (s) => s.name.toLowerCase() === skillName.toLowerCase()
      );
      if (skill) {
        const priorityWeights: Record<SkillPriority, number> = {
          Essential: 9.5,
          Important: 8.0,
          Preferred: 6.0,
          Desired: 3.0,
        };
        handleSkillChange(skill.id, priorityWeights[newPriority], newPriority);
      }
    },
    [rubric, handleSkillChange]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <CIHeader title={job.title} />

      {/* Job meta bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="mx-auto max-w-6xl flex items-center gap-4 text-sm text-gray-600">
          <span className="font-medium text-gray-900">{job.title}</span>
          <span>·</span>
          <span>{job.location}</span>
          <span>·</span>
          <span>{job.employmentType}</span>
          <span>·</span>
          <span className="text-teal-700 font-medium">SOC {job.socCode}</span>
          <span className="ml-auto text-gray-400">{job.department}</span>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex gap-0">
          {(["rubric", "results"] as ActiveView[]).map((view) => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeView === view
                  ? "border-[#1A5C4E] text-[#1A5C4E]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {view === "rubric" ? "Rubric Builder" : `Results (${scores.length})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-6">

        {/* ── RUBRIC TAB ───────────────────────────────────────── */}
        {activeView === "rubric" && (
          <div className="space-y-5">
            {/* Extracted Skills header */}
            <div className="bg-[#1A5C4E] text-white rounded-xl px-5 py-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-white/60 uppercase tracking-wide mb-0.5">
                  Extracted Skills List · O*NET Automatic Extraction
                </p>
                <p className="font-semibold">{job.title}</p>
                <p className="text-sm text-white/70">
                  {rubric.technicalSkills.length} Technical Skills ·{" "}
                  {rubric.softSkills.length} Soft Skills
                </p>
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                Viewing version · 1
              </span>
            </div>

            {/* Overall Scoring Weightages */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-1">
                Overall Scoring Weightages
              </h3>
              <p className="text-xs text-gray-400 mb-4">
                Adjust how much each component contributes. All three values must add up to exactly 100%.
              </p>
              <WeightageSliders
                weightages={rubric.weightages}
                onChange={handleWeightageChange}
              />
            </div>

            {/* Two-column skill layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <SkillColumn
                  title="TECHNICAL SKILLS"
                  icon="⚡"
                  skills={rubric.technicalSkills}
                  count={rubric.technicalSkills.length}
                  onSkillChange={handleSkillChange}
                  suggestedSkills={snapshot.suggestedSkills.filter(
                    (s) => s.category === "technical"
                  )}
                />
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <SkillColumn
                  title="SOFT / TRANSFERABLE SKILLS"
                  icon="🤝"
                  skills={rubric.softSkills}
                  count={rubric.softSkills.length}
                  onSkillChange={handleSkillChange}
                  suggestedSkills={snapshot.suggestedSkills.filter(
                    (s) => s.category === "soft"
                  )}
                />
              </div>
            </div>

            {/* Qualifications */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <QualificationsSection qualifications={rubric.qualifications} />
            </div>

            {/* Actions */}
            <RubricActions
              onUseThis={() => setActiveView("results")}
            />
          </div>
        )}

        {/* ── RESULTS TAB ──────────────────────────────────────── */}
        {activeView === "results" && (
          <div className="space-y-4">

            {/* Show evidence table if active */}
            {detailScore && (
              <div className="bg-white rounded-xl border border-gray-200 p-5">
                <SkillEvidenceTable
                  score={detailScore}
                  candidateName={getCandidateName(detailScore.candidateId)}
                  onClose={() => setDetailCandidateId(null)}
                />
              </div>
            )}

            {!detailScore && (
              <>
                <StatusBar
                  total={scores.length}
                  scored={scores.length}
                  errors={0}
                />

                {/* Candidate list */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="border-b border-gray-100 px-5 py-3 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-gray-700">
                      Current Matched Candidates
                    </h3>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>👥 {scores.length} Total</span>
                      <span className="text-green-600 font-medium">
                        {scores.filter((s) => s.matchLabel === "Strong Match").length} Strong
                      </span>
                      <span className="text-orange-500 font-medium">
                        {scores.filter((s) => s.matchLabel === "Partial Match").length} Partial
                      </span>
                    </div>
                  </div>

                  <div className="divide-y divide-gray-50">
                    {rankedScores.map((score, idx) => {
                      const candidate = candidates.find(
                        (c) => c.id === score.candidateId
                      );
                      if (!candidate) return null;
                      return (
                        <CandidateRow
                          key={score.candidateId}
                          rank={idx + 1}
                          score={score}
                          candidate={candidate}
                          weightages={rubric.weightages}
                          isNewlyEligible={newlyEligibleIds.has(score.candidateId)}
                          isExpanded={expandedCandidateId === score.candidateId}
                          onToggle={() =>
                            setExpandedCandidateId(
                              expandedCandidateId === score.candidateId
                                ? null
                                : score.candidateId
                            )
                          }
                          onViewDetails={() => setDetailCandidateId(score.candidateId)}
                          onViewBreakdown={() =>
                            setBreakdownCandidateId(score.candidateId)
                          }
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Reality Check panel */}
                <RealityCheckPanel
                  result={realityCheck}
                  onReclassify={handleReclassify}
                />

                {/* Cross-job match links */}
                <div className="bg-white rounded-xl border border-gray-200 p-5">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Low-Match Candidates — Better Fit Elsewhere?
                  </h3>
                  <div className="space-y-2">
                    {rankedScores
                      .filter((s) => s.matchLabel === "Low Match")
                      .map((s) => {
                        const c = candidates.find((c) => c.id === s.candidateId);
                        return (
                          <Link
                            key={s.candidateId}
                            href={`/candidate-insights/candidates/${s.candidateId}`}
                            className="flex items-center justify-between px-4 py-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors"
                          >
                            <div>
                              <span className="font-medium text-sm text-gray-900">
                                {c?.name}
                              </span>
                              <span className="ml-2 text-xs text-gray-400">
                                {s.overallScore}/100 — Low Match for {job.title}
                              </span>
                            </div>
                            <span className="text-sm text-[#1A5C4E] font-medium">
                              Find better fit →
                            </span>
                          </Link>
                        );
                      })}
                    {rankedScores.filter((s) => s.matchLabel === "Low Match").length === 0 && (
                      <p className="text-sm text-gray-400">
                        No low-match candidates — great talent pool!
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Score Breakdown Modal */}
      {breakdownScore && (
        <ScoreBreakdownModal
          score={breakdownScore}
          candidateName={getCandidateName(breakdownScore.candidateId)}
          weightages={rubric.weightages}
          onClose={() => setBreakdownCandidateId(null)}
        />
      )}
    </div>
  );
}
