import type {
  OnetSnapshot,
  ScoringRubric,
  RubricSkill,
  SkillPriority,
} from "../types";

// Map O*NET importance (1-5) → weight (1-10) and priority badge
function importanceToPriority(importance: number): SkillPriority {
  if (importance >= 4.5) return "Essential";
  if (importance >= 3.5) return "Important";
  if (importance >= 2.5) return "Preferred";
  return "Desired";
}

function importanceToWeight(importance: number): number {
  // Scale 1-5 → 1-10 (round to 1 decimal)
  return Math.round(importance * 2 * 10) / 10;
}

function toSkillId(prefix: string, name: string): string {
  return `${prefix}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

export function buildRubricFromSnapshot(
  snapshot: OnetSnapshot,
  jobId: string
): ScoringRubric {
  const technicalSkills: RubricSkill[] = snapshot.technicalSkills
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 10)
    .map((entry) => ({
      id: toSkillId("tech", entry.name),
      name: entry.name,
      weight: importanceToWeight(entry.importance),
      priority: importanceToPriority(entry.importance),
      source: "O*NET" as const,
      category: "technical" as const,
    }));

  const softSkills: RubricSkill[] = snapshot.softSkills
    .sort((a, b) => b.importance - a.importance)
    .slice(0, 8)
    .map((entry) => ({
      id: toSkillId("soft", entry.name),
      name: entry.name,
      weight: importanceToWeight(entry.importance),
      priority: importanceToPriority(entry.importance),
      source: "O*NET" as const,
      category: "soft" as const,
    }));

  return {
    jobId,
    socCode: snapshot.socCode,
    version: 1,
    technicalSkills,
    softSkills,
    weightages: { skills: 55, experience: 25, education: 20 },
    qualifications: snapshot.qualifications,
    suggestedSkills: snapshot.suggestedSkills,
  };
}

// Client-side re-ranking: recalculate overall score when priorities change
export function recalculateScore(
  skillEvidence: Array<{ rawScore: number; priority: SkillPriority; category: string }>,
  weightages: { skills: number; experience: number; education: number },
  experienceScore: number,
  educationScore: number
): { overallScore: number; skillsScore: number } {
  const priorityWeight: Record<SkillPriority, number> = {
    Essential: 4,
    Important: 3,
    Preferred: 2,
    Desired: 1,
  };

  const totalWeight = skillEvidence.reduce(
    (sum, s) => sum + priorityWeight[s.priority],
    0
  );
  const weightedSum = skillEvidence.reduce(
    (sum, s) => sum + s.rawScore * priorityWeight[s.priority],
    0
  );

  const skillsScore =
    totalWeight > 0 ? Math.round((weightedSum / totalWeight) * 10) : 0;

  const overallScore = Math.round(
    (skillsScore * weightages.skills +
      experienceScore * weightages.experience +
      educationScore * weightages.education) /
      100
  );

  return { overallScore, skillsScore };
}

export function scoreToMatchLabel(
  score: number
): "Strong Match" | "Partial Match" | "Low Match" {
  if (score >= 85) return "Strong Match";
  if (score >= 50) return "Partial Match";
  return "Low Match";
}

// Fuzzy skill name matcher — handles O*NET long names vs. short evidence names
// e.g. "Programming Languages & Paradigms" matches "Programming"
export function skillNamesMatch(evidenceName: string, rubricName: string): boolean {
  const norm = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  const e = norm(evidenceName);
  const r = norm(rubricName);
  // Exact, or one contains the other (handles abbreviations + O*NET long names)
  return e === r || r.includes(e) || e.includes(r);
}

// Reality Check: identify Essential skills with high elimination rates
export function computeRealityCheck(
  rubric: ScoringRubric,
  scores: Array<{ skillEvidence: Array<{ skill: string; rawScore: number; priority: SkillPriority }> }>
) {
  const totalCandidates = scores.length;

  // O*NET rarity estimates by occupation type — rough market percentages
  const rarityBySkill: Record<string, number> = {
    // These are rough estimates — in production would use BLS/O*NET wage data
    "Machine Learning": 8,
    "Natural Language Processing": 5,
    "Deep Learning": 6,
    "Medical Negligence Litigation": 4,
    "ICU/Critical Care": 18,
    "EHR Systems": 35,
    "Financial Modeling": 22,
    "LBO Modeling": 7,
    "CFA": 12,
    "SHRM-CP": 15,
  };

  const essentialSkills = [
    ...rubric.technicalSkills,
    ...rubric.softSkills,
  ].filter((s) => s.priority === "Essential");

  const scarcityFlags = essentialSkills
    .map((skill) => {
      // Count candidates who scored < 5/10 on this skill (considered "eliminated" by it)
      const eliminated = scores.filter((candidate) => {
        const ev = candidate.skillEvidence.find(
          (e) => skillNamesMatch(e.skill, skill.name)
        );
        return ev ? ev.rawScore < 5 : false; // no evidence entry → assume not scored, don't penalise
      }).length;

      const eliminationRate =
        totalCandidates > 0
          ? Math.round((eliminated / totalCandidates) * 100)
          : 0;

      const marketRarity =
        rarityBySkill[skill.name] ??
        Math.max(5, Math.round(100 - skill.weight * 8)); // fallback estimate

      return {
        skillName: skill.name,
        priority: skill.priority,
        estimatedMarketRarity: marketRarity,
        candidatesEliminated: eliminated,
        eliminationRate,
        suggestedDowngrade:
          eliminationRate > 30 && skill.priority === "Essential"
            ? ("Important" as SkillPriority)
            : null,
        rationale:
          eliminationRate > 30
            ? `This skill eliminates ${eliminationRate}% of your candidate pool. Only ~${marketRarity}% of qualified professionals hold it at an Essential level.`
            : "",
      };
    })
    .filter((s) => s.eliminationRate > 30);

  const strongMatches = scores.filter((s) => {
    const techEvidence = s.skillEvidence.filter((e) => e.rawScore >= 7);
    return techEvidence.length / Math.max(s.skillEvidence.length, 1) >= 0.7;
  }).length;

  return {
    totalCandidates,
    strongMatches,
    scarcityFlags,
    overallAssessment:
      scarcityFlags.length > 0
        ? `${scarcityFlags.length} Essential skill${scarcityFlags.length > 1 ? "s are" : " is"} filtering out a significant portion of your candidate pool. Consider adjusting these requirements to unlock more talent.`
        : "Your skill requirements are well-calibrated to the available talent pool.",
  };
}
