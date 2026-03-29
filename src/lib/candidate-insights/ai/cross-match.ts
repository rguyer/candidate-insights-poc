import { generateText } from "ai";
import { anthropic } from "@ai-sdk/anthropic";
import type { CrossJobMatch, ScoringRubric } from "../types";
import { sanitizeResume, wrapResumeForPrompt } from "./resume-sanitizer";

const model = anthropic("claude-sonnet-4-20250514");

export async function findCrossJobMatches(
  candidateId: string,
  appliedJobId: string,
  resumeText: string,
  otherRubrics: Array<{ jobId: string; jobTitle: string; rubric: ScoringRubric }>
): Promise<CrossJobMatch[]> {
  // Suppress unused variable warning — candidateId is passed for logging context
  void candidateId;

  const sanitized = sanitizeResume(resumeText);
  const wrappedResume = wrapResumeForPrompt(sanitized);

  const rubricSummaries = otherRubrics.map((r) => ({
    jobId: r.jobId,
    jobTitle: r.jobTitle,
    topTechnicalSkills: r.rubric.technicalSkills
      .filter((s) => s.priority === "Essential" || s.priority === "Important")
      .slice(0, 5)
      .map((s) => s.name),
    topSoftSkills: r.rubric.softSkills
      .filter((s) => s.priority === "Essential" || s.priority === "Important")
      .slice(0, 3)
      .map((s) => s.name),
  }));

  const { text } = await generateText({
    model,
    temperature: 0,
    maxOutputTokens: 2048,
    prompt: `This candidate applied for job "${appliedJobId}" but may be a better fit for other open positions.

Analyze the candidate's resume against these other open jobs and identify where they would be a stronger match. Only include jobs where the candidate would score significantly higher (estimate 65+). Rank by estimated fit score, highest first.

OPEN JOBS:
${JSON.stringify(rubricSummaries, null, 2)}

${wrappedResume}

Respond ONLY with a JSON object (no markdown, no explanation):
{
  "matches": [
    {
      "jobId": string,
      "jobTitle": string,
      "estimatedScore": number (0-100),
      "matchLabel": "Strong Match" | "Partial Match" | "Low Match",
      "reasoning": string (1-2 sentences why this candidate fits better),
      "sharedSkills": string[] (skills from resume matching this job)
    }
  ]
}`,
  });

  try {
    let parsed: { matches: CrossJobMatch[] };
    const trimmed = text.trim();

    if (trimmed.startsWith("{")) {
      parsed = JSON.parse(trimmed);
    } else {
      const match = trimmed.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (match) {
        parsed = JSON.parse(match[1]);
      } else {
        return [];
      }
    }

    return parsed.matches ?? [];
  } catch {
    return [];
  }
}
