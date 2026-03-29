"use client";

import { useCallback } from "react";
import * as Slider from "@radix-ui/react-slider";
import type { ScoringWeightages } from "@/lib/candidate-insights/types";

interface WeightageSlidersProps {
  weightages: ScoringWeightages;
  onChange: (weightages: ScoringWeightages) => void;
}

type WeightageKey = keyof ScoringWeightages;

const ROWS: { key: WeightageKey; label: string; color: string; trackColor: string }[] = [
  { key: "skills", label: "Skills", color: "text-[#1A5C4E]", trackColor: "bg-[#1A5C4E]" },
  { key: "experience", label: "Experience", color: "text-blue-700", trackColor: "bg-blue-600" },
  { key: "education", label: "Education", color: "text-purple-700", trackColor: "bg-purple-600" },
];

export default function WeightageSliders({ weightages, onChange }: WeightageSlidersProps) {
  const total = weightages.skills + weightages.experience + weightages.education;
  const isBalanced = total === 100;

  const handleChange = useCallback(
    (changedKey: WeightageKey, newValue: number) => {
      const otherKeys = (Object.keys(weightages) as WeightageKey[]).filter(
        (k) => k !== changedKey
      );
      const remaining = 100 - newValue;
      const currentOtherTotal = otherKeys.reduce((sum, k) => sum + weightages[k], 0);

      let updated: ScoringWeightages = { ...weightages, [changedKey]: newValue };

      if (currentOtherTotal === 0) {
        // Distribute equally among others
        const perOther = Math.round(remaining / otherKeys.length / 5) * 5;
        otherKeys.forEach((k, i) => {
          updated[k] = i === otherKeys.length - 1
            ? remaining - perOther * (otherKeys.length - 1)
            : perOther;
        });
      } else {
        // Proportional adjustment
        let distributed = 0;
        otherKeys.forEach((k, i) => {
          if (i === otherKeys.length - 1) {
            updated[k] = Math.max(10, remaining - distributed);
          } else {
            const proportion = weightages[k] / currentOtherTotal;
            const raw = Math.round((remaining * proportion) / 5) * 5;
            const clamped = Math.max(10, Math.min(80, raw));
            updated[k] = clamped;
            distributed += clamped;
          }
        });

        // Correct rounding drift
        const newTotal = updated.skills + updated.experience + updated.education;
        if (newTotal !== 100) {
          const drift = 100 - newTotal;
          const lastKey = otherKeys[otherKeys.length - 1];
          updated[lastKey] = Math.max(10, updated[lastKey] + drift);
        }
      }

      onChange(updated);
    },
    [weightages, onChange]
  );

  return (
    <div className="border rounded-xl p-4 bg-white space-y-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wide">
          Scoring Weightages
        </h3>
        <span
          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
            isBalanced
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          Total: {total}%
        </span>
      </div>

      {ROWS.map(({ key, label, color, trackColor }) => (
        <div key={key} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className={`text-sm font-semibold ${color}`}
              htmlFor={`weightage-${key}`}
            >
              {label}
            </label>
            <span className={`text-sm font-bold tabular-nums ${color}`}>
              {weightages[key]}%
            </span>
          </div>

          <Slider.Root
            id={`weightage-${key}`}
            className="relative flex items-center select-none touch-none w-full"
            min={10}
            max={80}
            step={5}
            value={[weightages[key]]}
            onValueChange={(values) => handleChange(key, values[0])}
            aria-label={`${label} weightage: ${weightages[key]}%`}
          >
            <Slider.Track className="relative h-2.5 grow rounded-full bg-gray-200 overflow-hidden">
              <Slider.Range className={`absolute h-full rounded-full ${trackColor}`} />
            </Slider.Track>
            <Slider.Thumb
              className="block w-4 h-4 rounded-full bg-white border-2 border-current shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 cursor-pointer hover:scale-110 transition-transform"
              style={{ borderColor: "currentColor" }}
            />
          </Slider.Root>

          <div className="flex justify-between text-xs text-gray-400">
            <span>10%</span>
            <span>80%</span>
          </div>
        </div>
      ))}

      {!isBalanced && (
        <p className="text-xs text-red-600 bg-red-50 rounded-lg px-3 py-2">
          Weightages must sum to 100%. Current total: {total}%.
        </p>
      )}
    </div>
  );
}
