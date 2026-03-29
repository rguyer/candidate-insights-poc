"use client";

import { useCallback } from "react";
import * as Slider from "@radix-ui/react-slider";
import type { RubricSkill, SkillPriority } from "@/lib/candidate-insights/types";
import PriorityBadge from "../scoring/PriorityBadge";
import SourceBadge from "../scoring/SourceBadge";

interface SkillSliderProps {
  skill: RubricSkill;
  onChange: (skillId: string, weight: number, priority: SkillPriority) => void;
}

const PRIORITY_ORDER: SkillPriority[] = ["Essential", "Important", "Preferred", "Desired"];

const PRIORITY_MIDPOINTS: Record<SkillPriority, number> = {
  Essential: 9.5,
  Important: 8.0,
  Preferred: 6.0,
  Desired: 3.0,
};

function weightToPriority(weight: number): SkillPriority {
  if (weight >= 9) return "Essential";
  if (weight >= 7) return "Important";
  if (weight >= 5) return "Preferred";
  return "Desired";
}

export default function SkillSlider({ skill, onChange }: SkillSliderProps) {
  const handleSliderChange = useCallback(
    (values: number[]) => {
      const weight = values[0];
      const priority = weightToPriority(weight);
      onChange(skill.id, weight, priority);
    },
    [skill.id, onChange]
  );

  const handlePriorityClick = useCallback(() => {
    const currentIndex = PRIORITY_ORDER.indexOf(skill.priority);
    const nextPriority = PRIORITY_ORDER[(currentIndex + 1) % PRIORITY_ORDER.length];
    const newWeight = PRIORITY_MIDPOINTS[nextPriority];
    onChange(skill.id, newWeight, nextPriority);
  }, [skill.id, skill.priority, onChange]);

  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-gray-50 transition-colors group">
      {/* Left: skill name + source badge */}
      <div className="flex items-center gap-2 min-w-0 w-44 shrink-0">
        <span className="font-semibold text-sm text-gray-800 truncate" title={skill.name}>
          {skill.name}
        </span>
        <SourceBadge source="O*NET" />
      </div>

      {/* Middle: slider */}
      <div className="flex items-center gap-2 flex-1">
        <Slider.Root
          className="relative flex items-center select-none touch-none"
          style={{ width: 200 }}
          min={1}
          max={10}
          step={0.5}
          value={[skill.weight]}
          onValueChange={handleSliderChange}
        >
          <Slider.Track className="relative h-2 grow rounded-full bg-gray-200 overflow-hidden">
            <Slider.Range className="absolute h-full rounded-full bg-[#1A5C4E]" />
          </Slider.Track>
          <Slider.Thumb
            className="block w-4 h-4 rounded-full bg-white border-2 border-[#1A5C4E] shadow-md focus:outline-none focus:ring-2 focus:ring-[#1A5C4E] focus:ring-offset-1 cursor-pointer hover:scale-110 transition-transform"
            aria-label={`${skill.name} weight`}
          />
        </Slider.Root>

        {/* Weight number */}
        <span className="text-sm font-mono font-semibold text-gray-700 w-8 text-right tabular-nums">
          {skill.weight.toFixed(1)}
        </span>
      </div>

      {/* Right: clickable priority badge */}
      <div className="shrink-0">
        <button
          type="button"
          onClick={handlePriorityClick}
          className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#1A5C4E] focus:ring-offset-1 rounded-full"
          title="Click to cycle priority"
          aria-label={`Priority: ${skill.priority}. Click to change.`}
        >
          <PriorityBadge priority={skill.priority} size="sm" />
        </button>
      </div>
    </div>
  );
}
