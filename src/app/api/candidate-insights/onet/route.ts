import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { OnetSnapshot } from "@/lib/candidate-insights/types";
import { buildRubricFromSnapshot } from "@/lib/candidate-insights/onet/rubric-builder";
import { MOCK_JOBS } from "@/lib/candidate-insights/mock/jobs";

// GET /api/candidate-insights/onet?socCode=15-1252.00&jobId=job-sw-dev
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const socCode = searchParams.get("socCode");
  const jobId = searchParams.get("jobId");

  if (!socCode || !jobId) {
    return NextResponse.json({ error: "socCode and jobId required" }, { status: 400 });
  }

  const job = MOCK_JOBS.find((j) => j.id === jobId);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  // Load pre-fetched snapshot
  const snapshotPath = path.join(
    process.cwd(),
    "src/data/onet-snapshots",
    `${socCode}.json`
  );

  if (!fs.existsSync(snapshotPath)) {
    return NextResponse.json(
      { error: `No O*NET snapshot found for SOC code ${socCode}` },
      { status: 404 }
    );
  }

  const snapshot: OnetSnapshot = JSON.parse(fs.readFileSync(snapshotPath, "utf-8"));
  const rubric = buildRubricFromSnapshot(snapshot, jobId);

  return NextResponse.json({ snapshot, rubric });
}
