import { notFound } from "next/navigation";
import { getJobById } from "@/lib/candidate-insights/mock/jobs";
import { MOCK_CANDIDATES } from "@/lib/candidate-insights/mock/candidates";
import precomputed from "@/data/scores/pre-computed.json";
import type { ScoreResult, OnetSnapshot } from "@/lib/candidate-insights/types";
import { buildRubricFromSnapshot } from "@/lib/candidate-insights/onet/rubric-builder";
import fs from "fs";
import path from "path";
import JobDetailClient from "./JobDetailClient";

export default function JobDetailPage({ params }: { params: { jobId: string } }) {
  const job = getJobById(params.jobId);
  if (!job) notFound();

  // Load O*NET snapshot
  const snapshotPath = path.join(
    process.cwd(),
    "src/data/onet-snapshots",
    `${job.socCode}.json`
  );
  const snapshot: OnetSnapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));
  const initialRubric = buildRubricFromSnapshot(snapshot, job.id);

  // Load pre-computed scores for this job
  const jobScores = (precomputed.scores as ScoreResult[]).filter(
    (s) => s.jobId === job.id
  );

  // Get candidates for this job
  const candidates = MOCK_CANDIDATES.filter((c) =>
    job.candidateIds.includes(c.id)
  );

  return (
    <JobDetailClient
      job={job}
      initialRubric={initialRubric}
      initialScores={jobScores}
      candidates={candidates}
      snapshot={snapshot}
    />
  );
}
