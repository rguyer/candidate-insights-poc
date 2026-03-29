"use client";

import { useState, useRef, useEffect } from "react";
import type { SuggestedSkill } from "@/lib/candidate-insights/types";

interface SuggestedSkillsProps {
  suggestions: SuggestedSkill[];
  onAdd: (skill: SuggestedSkill) => void;
  addedSkillNames: string[];
}

export default function SuggestedSkills({
  suggestions,
  onAdd,
  addedSkillNames,
}: SuggestedSkillsProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const availableCount = suggestions.filter(
    (s) => !addedSkillNames.includes(s.name)
  ).length;

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Toggle pill button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A5C4E] focus:ring-offset-1 shadow-sm"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span className="text-purple-600">✦</span>
        Suggested Skills
        {availableCount > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-semibold">
            {availableCount}
          </span>
        )}
        <span
          className={`text-gray-500 text-xs transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        >
          ▼
        </span>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Suggested skills"
          className="absolute left-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-50 overflow-hidden"
        >
          <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              AI-Suggested Skills
            </p>
          </div>

          <ul className="max-h-72 overflow-y-auto divide-y divide-gray-100">
            {suggestions.length === 0 && (
              <li className="px-4 py-4 text-sm text-gray-400 italic text-center">
                No suggestions available
              </li>
            )}
            {suggestions.map((skill) => {
              const isAdded = addedSkillNames.includes(skill.name);
              return (
                <li
                  key={skill.name}
                  role="option"
                  aria-selected={isAdded}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors"
                >
                  {/* Skill name */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{skill.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Relevance: {skill.relevance}/10
                    </p>
                  </div>

                  {/* Category badge */}
                  <span
                    className={`shrink-0 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${
                      skill.category === "technical"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {skill.category === "technical" ? "Technical" : "Soft"}
                  </span>

                  {/* Add / checkmark button */}
                  {isAdded ? (
                    <span
                      className="shrink-0 w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-600"
                      title="Already added"
                      aria-label="Already added"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onAdd(skill)}
                      className="shrink-0 w-7 h-7 rounded-full bg-[#1A5C4E] hover:bg-[#154d41] flex items-center justify-center text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A5C4E] focus:ring-offset-1"
                      aria-label={`Add ${skill.name}`}
                      title={`Add ${skill.name}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
