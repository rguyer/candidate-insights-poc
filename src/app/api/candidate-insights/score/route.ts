import { NextRequest, NextResponse } from "next/server";
import type { ScoringRubric } from "@/lib/candidate-insights/types";
import { scoreCandidate } from "@/lib/candidate-insights/ai/scoring-prompt";
import { MOCK_CANDIDATES } from "@/lib/candidate-insights/mock/candidates";

// POST /api/candidate-insights/score
// Body: { candidateId, jobId, rubric }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { candidateId, jobId, rubric } = body as {
    candidateId: string;
    jobId: string;
    rubric: ScoringRubric;
  };

  if (!candidateId || !jobId || !rubric) {
    return NextResponse.json(
      { error: "candidateId, jobId, and rubric are required" },
      { status: 400 }
    );
  }

  const candidate = MOCK_CANDIDATES.find((c) => c.id === candidateId);
  if (!candidate) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  const result = await scoreCandidate(candidateId, jobId, rubric, candidate.resume);
  return NextResponse.json(result);
}
