import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { findCrossJobMatches } from "@/lib/candidate-insights/ai/cross-match";
import { buildRubricFromSnapshot } from "@/lib/candidate-insights/onet/rubric-builder";
import { MOCK_JOBS } from "@/lib/candidate-insights/mock/jobs";
import { MOCK_CANDIDATES } from "@/lib/candidate-insights/mock/candidates";
import type { OnetSnapshot } from "@/lib/candidate-insights/types";

// POST /api/candidate-insights/cross-match
// Body: { candidateId, appliedJobId }
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { candidateId, appliedJobId } = body as {
    candidateId: string;
    appliedJobId: string;
  };

  if (!candidateId || !appliedJobId) {
    return NextResponse.json(
      { error: "candidateId and appliedJobId are required" },
      { status: 400 }
    );
  }

  const candidate = MOCK_CANDIDATES.find((c) => c.id === candidateId);
  if (!candidate) {
    return NextResponse.json({ error: "Candidate not found" }, { status: 404 });
  }

  // Build rubrics for all OTHER jobs
  const otherJobs = MOCK_JOBS.filter((j) => j.id !== appliedJobId);
  const otherRubrics = otherJobs
    .map((job) => {
      const snapshotPath = path.join(
        process.cwd(),
        "src/data/onet-snapshots",
        `${job.socCode}.json`
      );
      if (!fs.existsSync(snapshotPath)) return null;
      const snapshot: OnetSnapshot = JSON.parse(
        fs.readFileSync(snapshotPath, "utf-8")
      );
      return {
        jobId: job.id,
        jobTitle: job.title,
        rubric: buildRubricFromSnapshot(snapshot, job.id),
      };
    })
    .filter(Boolean) as Array<{
    jobId: string;
    jobTitle: string;
    rubric: ReturnType<typeof buildRubricFromSnapshot>;
  }>;

  const matches = await findCrossJobMatches(
    candidateId,
    appliedJobId,
    candidate.resume,
    otherRubrics
  );

  return NextResponse.json({ candidateId, appliedJobId, matches });
}
