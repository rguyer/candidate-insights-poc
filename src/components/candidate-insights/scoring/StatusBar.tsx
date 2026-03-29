"use client";

import { CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

interface StatusBarProps {
  total: number;
  scored: number;
  errors: number;
  onRetry?: () => void;
}

type RunState = "success" | "errors" | "in-progress";

function deriveState(total: number, scored: number, errors: number): RunState {
  const processed = scored + errors;
  if (processed < total) return "in-progress";
  if (errors > 0) return "errors";
  return "success";
}

export default function StatusBar({
  total,
  scored,
  errors,
  onRetry,
}: StatusBarProps) {
  const state = deriveState(total, scored, errors);

  if (state === "success") {
    return (
      <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm font-medium">
        <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
        <span>
          {scored} candidate{scored !== 1 ? "s" : ""} scored successfully
        </span>
      </div>
    );
  }

  if (state === "errors") {
    return (
      <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm">
        <div className="flex items-center gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span className="font-medium">
            Completed with {errors} error{errors !== 1 ? "s" : ""}
          </span>
          <span className="text-amber-600">
            · {scored} scored successfully
          </span>
        </div>
        {onRetry && (
          <button
            onClick={onRetry}
            className="shrink-0 px-3 py-1 text-xs font-semibold bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-md border border-amber-300 transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    );
  }

  // in-progress
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 text-sm font-medium">
      <Loader2 className="w-4 h-4 text-blue-500 shrink-0 animate-spin" />
      <span>
        Scoring in progress — {scored} of {total} complete
        {errors > 0 && (
          <span className="text-blue-600 font-normal ml-1">
            ({errors} error{errors !== 1 ? "s" : ""})
          </span>
        )}
      </span>
    </div>
  );
}
