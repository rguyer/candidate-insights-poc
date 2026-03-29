"use client";

import Link from "next/link";
import { Bot, Home, ChevronRight } from "lucide-react";

interface CIHeaderProps {
  title?: string;
}

export default function CIHeader({ title }: CIHeaderProps) {
  return (
    <header
      className="w-full flex items-center px-6 gap-4 shadow-md"
      style={{ backgroundColor: "#1A5C4E", height: "56px" }}
    >
      {/* Logo area */}
      <div className="flex items-center gap-2 shrink-0">
        <div className="flex items-center justify-center w-8 h-8 bg-white/10 rounded-md">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-white font-bold text-sm tracking-wide">
            ScoutAI
          </span>
          <span className="text-white/60 text-[10px] font-medium tracking-wider uppercase">
            Candidate Insights
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-6 w-px bg-white/20 shrink-0" />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm flex-1">
        <Link
          href="/candidate-insights"
          className="flex items-center gap-1 text-white/70 hover:text-white transition-colors"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Home</span>
        </Link>
        {title && (
          <>
            <ChevronRight className="w-3.5 h-3.5 text-white/40" />
            <span className="text-white font-medium truncate max-w-xs">
              {title}
            </span>
          </>
        )}
      </nav>

      {/* How It Works link */}
      <Link
        href="/candidate-insights/how-it-works"
        className="shrink-0 flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-medium transition-colors border border-white/20 hover:border-white/40 rounded-md px-3 py-1.5"
      >
        <span>📖</span>
        <span>How It Works</span>
      </Link>
    </header>
  );
}
