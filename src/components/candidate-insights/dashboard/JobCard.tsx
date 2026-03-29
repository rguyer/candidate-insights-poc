"use client";

import Link from "next/link";
import { MapPin, Briefcase, DollarSign, Users, ArrowRight } from "lucide-react";
import type { MockJob } from "@/lib/candidate-insights/types";

interface ScoresSummary {
  total: number;
  strongMatches: number;
  partialMatches: number;
  lowMatches: number;
  scored: number;
}

interface JobCardProps {
  job: MockJob;
  scoresSummary?: ScoresSummary;
}

const departmentConfig: Record<
  string,
  { stripClass: string; pillClass: string }
> = {
  Engineering: {
    stripClass: "bg-blue-500",
    pillClass: "bg-blue-100 text-blue-800",
  },
  "Data & Analytics": {
    stripClass: "bg-purple-500",
    pillClass: "bg-purple-100 text-purple-800",
  },
  Healthcare: {
    stripClass: "bg-teal-500",
    pillClass: "bg-teal-100 text-teal-800",
  },
  Finance: {
    stripClass: "bg-green-600",
    pillClass: "bg-green-100 text-green-800",
  },
  Marketing: {
    stripClass: "bg-orange-500",
    pillClass: "bg-orange-100 text-orange-800",
  },
  "Human Resources": {
    stripClass: "bg-rose-500",
    pillClass: "bg-rose-100 text-rose-800",
  },
  HR: {
    stripClass: "bg-rose-500",
    pillClass: "bg-rose-100 text-rose-800",
  },
};

const fallbackConfig = {
  stripClass: "bg-gray-400",
  pillClass: "bg-gray-100 text-gray-700",
};

export default function JobCard({ job, scoresSummary }: JobCardProps) {
  const config = departmentConfig[job.department] ?? fallbackConfig;
  const candidateCount = scoresSummary?.total ?? job.candidateIds.length;

  return (
    <Link
      href={`/candidate-insights/jobs/${job.id}`}
      className="group block bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      {/* Colored department strip */}
      <div className={`h-1.5 w-full ${config.stripClass}`} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 leading-snug truncate group-hover:text-[#1A5C4E] transition-colors">
              {job.title}
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">SOC {job.socCode}</p>
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full shrink-0 ${config.pillClass}`}
          >
            {job.department}
          </span>
        </div>

        {/* Meta rows */}
        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{job.location}</span>
            <span className="text-gray-300 mx-1">·</span>
            <Briefcase className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span className="truncate">{job.employmentType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-gray-600">
            <DollarSign className="w-3.5 h-3.5 text-gray-400 shrink-0" />
            <span>{job.salaryRange}</span>
          </div>
        </div>

        {/* Candidates footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-700">
              {candidateCount} candidate{candidateCount !== 1 ? "s" : ""}
            </span>

            {scoresSummary && scoresSummary.scored > 0 && (
              <div className="flex items-center gap-2 ml-1">
                {scoresSummary.strongMatches > 0 && (
                  <span className="flex items-center gap-1 text-xs text-green-700">
                    <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
                    {scoresSummary.strongMatches}
                  </span>
                )}
                {scoresSummary.partialMatches > 0 && (
                  <span className="flex items-center gap-1 text-xs text-orange-700">
                    <span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />
                    {scoresSummary.partialMatches}
                  </span>
                )}
                {scoresSummary.lowMatches > 0 && (
                  <span className="flex items-center gap-1 text-xs text-red-700">
                    <span className="w-2 h-2 rounded-full bg-red-500 inline-block" />
                    {scoresSummary.lowMatches}
                  </span>
                )}
              </div>
            )}
          </div>

          <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#1A5C4E] group-hover:translate-x-0.5 transition-all duration-150" />
        </div>
      </div>
    </Link>
  );
}
