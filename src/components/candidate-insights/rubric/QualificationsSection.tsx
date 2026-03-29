"use client";

import type { Qualification } from "@/lib/candidate-insights/types";

interface QualificationsSectionProps {
  qualifications: Qualification[];
}

const TYPE_COLORS: Record<Qualification["type"], string> = {
  Qualification: "bg-blue-100 text-blue-700 border border-blue-200",
  Certification: "bg-purple-100 text-purple-700 border border-purple-200",
};

const LEVEL_COLORS: Record<Qualification["level"], string> = {
  Required: "bg-red-100 text-red-700 border border-red-200",
  Preferred: "bg-yellow-100 text-yellow-700 border border-yellow-200",
};

function QualificationCard({ qualification }: { qualification: Qualification }) {
  return (
    <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors">
      {/* Type badge */}
      <span
        className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap mt-0.5 ${TYPE_COLORS[qualification.type]}`}
      >
        {qualification.type}
      </span>

      {/* Requirement text */}
      <p className="flex-1 text-sm text-gray-800 leading-snug">
        {qualification.requirement}
      </p>

      {/* Level badge */}
      <span
        className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold whitespace-nowrap mt-0.5 ${LEVEL_COLORS[qualification.level]}`}
      >
        {qualification.level}
      </span>
    </div>
  );
}

export default function QualificationsSection({ qualifications }: QualificationsSectionProps) {
  const qualificationItems = qualifications.filter((q) => q.type === "Qualification");
  const certificationItems = qualifications.filter((q) => q.type === "Certification");

  return (
    <div className="space-y-4">
      {/* Section header */}
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-600">
          Qualifications &amp; Certifications
        </h3>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
          {qualifications.length}
        </span>
      </div>

      {qualifications.length === 0 && (
        <p className="text-sm text-gray-400 italic px-1">
          No qualifications or certifications specified.
        </p>
      )}

      {/* Qualifications group */}
      {qualificationItems.length > 0 && (
        <div className="space-y-2">
          {qualificationItems.length > 0 && certificationItems.length > 0 && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
              Qualifications
            </p>
          )}
          {qualificationItems.map((q) => (
            <QualificationCard key={q.id} qualification={q} />
          ))}
        </div>
      )}

      {/* Certifications group */}
      {certificationItems.length > 0 && (
        <div className="space-y-2">
          {qualificationItems.length > 0 && certificationItems.length > 0 && (
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
              Certifications
            </p>
          )}
          {certificationItems.map((q) => (
            <QualificationCard key={q.id} qualification={q} />
          ))}
        </div>
      )}
    </div>
  );
}
