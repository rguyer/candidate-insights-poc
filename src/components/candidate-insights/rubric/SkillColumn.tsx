"use client";

import type { RubricSkill, SkillPriority, SuggestedSkill } from "@/lib/candidate-insights/types";
import SkillSlider from "./SkillSlider";

interface SkillColumnProps {
  title: string;
  icon: string;
  skills: RubricSkill[];
  count: number;
  onSkillChange: (skillId: string, weight: number, priority: SkillPriority) => void;
  onAddSkill?: (skill: SuggestedSkill) => void;
  suggestedSkills?: SuggestedSkill[];
}

export default function SkillColumn({
  title,
  icon,
  skills,
  count,
  onSkillChange,
}: SkillColumnProps) {
  return (
    <div className="flex flex-col">
      {/* Column header */}
      <div className="flex items-center gap-2 px-3 py-2 mb-1">
        <span className="text-base" role="img" aria-hidden="true">
          {icon}
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-gray-600 flex-1">
          {title}
        </span>
        <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gray-200 text-xs font-semibold text-gray-600">
          {count}
        </span>
        <button
          type="button"
          className="text-gray-400 hover:text-gray-600 transition-colors p-0.5 rounded"
          aria-label="Sort skills"
          title="Sort skills"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M7 16V4m0 0L3 8m4-4 4 4" />
            <path d="M17 8v12m0 0 4-4m-4 4-4-4" />
          </svg>
        </button>
      </div>

      {/* Skill rows */}
      <div className="flex flex-col">
        {skills.map((skill, index) => (
          <div key={skill.id}>
            <SkillSlider skill={skill} onChange={onSkillChange} />
            {index < skills.length - 1 && (
              <div className="mx-3 border-b border-gray-100" />
            )}
          </div>
        ))}
        {skills.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-gray-400 italic">
            No skills added yet
          </div>
        )}
      </div>
    </div>
  );
}
