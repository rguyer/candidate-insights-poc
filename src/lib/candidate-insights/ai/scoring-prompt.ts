import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import type { ScoringRubric, ScoreResult, SkillPriority } from "../types";
import { sanitizeResume, wrapResumeForPrompt } from "./resume-sanitizer";

const model = anthropic("claude-sonnet-4-20250514");

const SCORING_SYSTEM_PROMPT = `You are an expert recruitment AI that scores candidate resumes against a structured job rubric.

Scoring guidelines:
- 90-100: Exceptional — exceeds all requirements, rare find
- 80-89: Strong Match — meets all key requirements with solid evidence
- 65-79: Partial Match — meets most requirements, some notable gaps
- 50-64: Partial Match — meets some requirements, significant gaps
- Below 50: Low Match — does not meet core requirements

For each skill in the rubric, score the candidate 0-10 based on evidence in the resume:
- 9-10: Explicit, extensive evidence (named the skill directly + years + achievements)
- 7-8: Clear evidence (skill demonstrated through work, even if not named)
- 5-6: Partial evidence (adjacent skills, transferable experience)
- 3-4: Inferred evidence (tangentially related)
- 0-2: No meaningful evidence

Source classification:
- "Resume": Skill is explicitly mentioned or clearly demonstrated
- "Inferred": Skill is implied by role/context but not explicitly stated

Confidence:
- "high": Strong, specific evidence with context
- "mid": Moderate evidence, some inference required
- "low": Weak or highly inferred evidence

Be objective and evidence-based. Cite specific text from the resume where possible.

IMPORTANT: Respond ONLY with a valid JSON object matching the schema. No markdown, no code fences, no explanation.`;

function buildUserMessage(rubric: ScoringRubric, resumeText: string): string {
  const sanitized = sanitizeResume(resumeText);
  const wrappedResume = wrapResumeForPrompt(sanitized);

  const rubricJson = JSON.stringify(
    {
      technicalSkills: rubric.technicalSkills.map((s) => ({
        name: s.name,
        priority: s.priority,
        weight: s.weight,
      })),
      softSkills: rubric.softSkills.map((s) => ({
        name: s.name,
        priority: s.priority,
        weight: s.weight,
      })),
      weightages: rubric.weightages,
      qualifications: rubric.qualifications,
    },
    null,
    2
  );

  return `Score this candidate against the following job rubric.

SCORING RUBRIC:
${rubricJson}

OVERALL SCORE FORMULA:
overall = (skillsScore × ${rubric.weightages.skills}% + experienceScore × ${rubric.weightages.experience}% + educationScore × ${rubric.weightages.education}%) / 100

Essential skills carry 4× weight. Important: 3×. Preferred: 2×. Desired: 1×.

${wrappedResume}

Return a JSON object with exactly these fields:
{
  "overallScore": number (0-100),
  "skillsScore": number (0-100),
  "experienceScore": number (0-100),
  "educationScore": number (0-100),
  "matchLabel": "Strong Match" | "Partial Match" | "Low Match",
  "technicalSkillsMatched": number,
  "technicalSkillsTotal": number,
  "softSkillsMatched": number,
  "softSkillsTotal": number,
  "experienceLevel": "High" | "Medium" | "Low",
  "educationMet": number,
  "educationTotal": number,
  "penalties": string[],
  "locationMatch": boolean,
  "seniorityMatch": boolean,
  "employmentTypeMatch": boolean,
  "strengths": string[] (3-4 bullets),
  "concerns": string[] (3-4 bullets),
  "whyThisScore": string (2-3 sentences),
  "skillEvidence": Array<{
    "rank": number,
    "skill": string,
    "evidence": string,
    "source": "Resume" | "Inferred",
    "confidence": "high" | "mid" | "low",
    "rawScore": number (0-10),
    "priority": "Essential" | "Important" | "Preferred" | "Desired",
    "category": "technical" | "soft"
  }>,
  "qualificationScoring": Array<{
    "requirement": string,
    "met": boolean,
    "level": "Required" | "Preferred",
    "evidence": string
  }>
}`;
}

export async function scoreCandidate(
  candidateId: string,
  jobId: string,
  rubric: ScoringRubric,
  resumeText: string
): Promise<ScoreResult> {
  const { text } = await generateText({
    model,
    system: SCORING_SYSTEM_PROMPT,
    prompt: buildUserMessage(rubric, resumeText),
    temperature: 0,
    maxOutputTokens: 4096,
  });

  // Parse and validate the JSON response
  let raw: Omit<ScoreResult, "candidateId" | "jobId" | "scoredAt">;
  try {
    raw = JSON.parse(text.trim());
  } catch {
    // Attempt to extract JSON from the response if wrapped in markdown
    const match = text.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
    if (match) {
      raw = JSON.parse(match[1]);
    } else {
      throw new Error("Claude did not return parseable JSON");
    }
  }

  return {
    ...raw,
    candidateId,
    jobId,
    scoredAt: new Date().toISOString(),
  };
}

export async function scoreBatch(
  candidates: Array<{ id: string; resume: string }>,
  jobId: string,
  rubric: ScoringRubric
): Promise<Array<{ result: ScoreResult | null; error: string | null }>> {
  const results = await Promise.allSettled(
    candidates.map((c) => scoreCandidate(c.id, jobId, rubric, c.resume))
  );

  return results.map((r) => {
    if (r.status === "fulfilled") return { result: r.value, error: null };
    return { result: null, error: String(r.reason) };
  });
}
