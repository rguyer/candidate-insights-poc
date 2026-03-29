import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ScoutAI — Candidate Insights",
  description:
    "O*NET-powered candidate scoring and live rubric re-ranking for talent acquisition teams.",
};

export default function CandidateInsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
