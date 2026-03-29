// ─── Jobs ────────────────────────────────────────────────────────────────────

export interface MockJob {
  id: string;
  title: string;
  socCode: string;
  department: string;
  location: string;
  employmentType: "Full-Time" | "Part-Time" | "Contract";
  salaryRange: string;
  description: string;
  candidateIds: string[];
}

// ─── Candidates ───────────────────────────────────────────────────────────────

export interface MockCandidate {
  id: string;
  name: string;
  email: string;
  appliedJobId: string;
  resume: string; // plain text, 300-800 words
}

// ─── Rubric (built from O*NET) ────────────────────────────────────────────────

export type SkillPriority = "Essential" | "Important" | "Preferred" | "Desired";
export type SkillSource = "O*NET" | "Resume" | "Inferred" | "Manual";

export interface RubricSkill {
  id: string;
  name: string;
  weight: number;       // 1-10 (O*NET importance mapped to 1-10 scale)
  priority: SkillPriority;
  source: "O*NET";
  category: "technical" | "soft";
}

export interface ScoringWeightages {
  skills: number;       // percentage, e.g. 55
  experience: number;   // percentage, e.g. 25
  education: number;    // percentage, e.g. 20
}

export interface Qualification {
  id: string;
  requirement: string;
  level: "Required" | "Preferred";
  type: "Qualification" | "Certification";
}

export interface ScoringRubric {
  jobId: string;
  socCode: string;
  version: number;
  technicalSkills: RubricSkill[];
  softSkills: RubricSkill[];
  weightages: ScoringWeightages;
  qualifications: Qualification[];
  suggestedSkills: SuggestedSkill[];
}

export interface SuggestedSkill {
  name: string;
  relevance: number;    // 1-10
  category: "technical" | "soft";
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

export type MatchLabel = "Strong Match" | "Partial Match" | "Low Match";
export type ConfidenceLevel = "high" | "mid" | "low";
export type ExperienceLevel = "High" | "Medium" | "Low";

export interface SkillEvidence {
  rank: number;
  skill: string;
  evidence: string;           // quote or inference from resume
  source: "Resume" | "Inferred";
  confidence: ConfidenceLevel;
  rawScore: number;           // 0-10, used for client-side re-ranking
  priority: SkillPriority;
  category: "technical" | "soft";
}

export interface QualificationResult {
  requirement: string;
  met: boolean;
  level: "Required" | "Preferred";
  evidence: string;
}

export interface ScoreResult {
  candidateId: string;
  jobId: string;
  overallScore: number;
  skillsScore: number;
  experienceScore: number;
  educationScore: number;
  matchLabel: MatchLabel;
  technicalSkillsMatched: number;
  technicalSkillsTotal: number;
  softSkillsMatched: number;
  softSkillsTotal: number;
  experienceLevel: ExperienceLevel;
  educationMet: number;
  educationTotal: number;
  penalties: string[];
  locationMatch: boolean;
  seniorityMatch: boolean;
  employmentTypeMatch: boolean;
  strengths: string[];          // 3-4 bullets
  concerns: string[];           // 3-4 bullets
  whyThisScore: string;         // 2-3 sentences
  skillEvidence: SkillEvidence[];
  qualificationScoring: QualificationResult[];
  scoredAt: string;             // ISO timestamp
}

// ─── Reality Check ───────────────────────────────────────────────────────────

export interface SkillScarcity {
  skillName: string;
  priority: SkillPriority;
  estimatedMarketRarity: number;        // % of workforce with this skill (0-100)
  candidatesEliminated: number;         // count eliminated by this requirement
  eliminationRate: number;              // % of candidates eliminated
  suggestedDowngrade: SkillPriority | null;
  rationale: string;
}

export interface RealityCheckResult {
  totalCandidates: number;
  strongMatches: number;
  scarcityFlags: SkillScarcity[];       // skills flagging >30% elimination
  overallAssessment: string;
}

// ─── Cross-job matching ───────────────────────────────────────────────────────

export interface CrossJobMatch {
  jobId: string;
  jobTitle: string;
  estimatedScore: number;
  matchLabel: MatchLabel;
  reasoning: string;
  sharedSkills: string[];
}

// ─── O*NET snapshot (stored in data/onet-snapshots/) ─────────────────────────

export interface OnetSkillEntry {
  elementId: string;
  name: string;
  importance: number;   // 1-5 from O*NET
  level: number;        // 1-7 from O*NET
  category: "knowledge" | "skill" | "ability" | "technology";
}

export interface OnetSnapshot {
  socCode: string;
  occupationTitle: string;
  jobZone: number;          // 1-5
  technicalSkills: OnetSkillEntry[];
  softSkills: OnetSkillEntry[];
  suggestedSkills: SuggestedSkill[];
  qualifications: Qualification[];
  fetchedAt: string;
}

// ─── Pre-computed scores (stored in data/scores/) ────────────────────────────

export interface PrecomputedScores {
  generatedAt: string;
  scores: ScoreResult[];
}
