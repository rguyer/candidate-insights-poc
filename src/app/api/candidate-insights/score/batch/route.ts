import { NextRequest, NextResponse } from "next/server";
import type { ScoringRubric } from "@/lib/candidate-insights/types";
import { scoreBatch } from "@/lib/candidate-insights/ai/scoring-prompt";
import { MOCK_CANDIDATES } from "@/lib/candidate-insights/mock/candidates";
import { MOCK_JOBS } from "@/lib/candidate-insights/mock/jobs";

// POST /api/candidate-insights/score/batch
// Body: { jobId, rubric }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { jobId, rubric } = body as { jobId: string; rubric: ScoringRubric };

  if (!jobId || !rubric) {
    return NextResponse.json({ error: "jobId and rubric are required" }, { status: 400 });
  }

  const job = MOCK_JOBS.find((j) => j.id === jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  const candidates = MOCK_CANDIDATES.filter((c) =>
    job.candidateIds.includes(c.id)
  );

  const results = await scoreBatch(
    candidates.map((c) => ({ id: c.id, resume: c.resume })),
    jobId,
    rubric
  );

  return NextResponse.json({
    jobId,
    total: candidates.length,
    scored: results.filter((r) => r.result !== null).length,
    errors: results.filter((r) => r.error !== null).length,
    results,
  });
}
