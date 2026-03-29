"use client";

import CIHeader from "@/components/candidate-insights/layout/CIHeader";
import Link from "next/link";
import { useState } from "react";

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">{title}</h2>
    {children}
  </section>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-gray-100 text-teal-700 font-mono text-xs px-1.5 py-0.5 rounded">{children}</code>
);

const CodeBlock = ({ children, label }: { children: string; label?: string }) => (
  <div className="rounded-xl overflow-hidden border border-gray-200">
    {label && <div className="bg-gray-100 px-4 py-2 text-xs font-semibold text-gray-500 border-b border-gray-200">{label}</div>}
    <pre className="bg-gray-950 text-green-300 text-xs p-4 overflow-x-auto leading-relaxed font-mono whitespace-pre">{children}</pre>
  </div>
);

const FileTree = ({ items }: { items: string[] }) => (
  <div className="bg-gray-950 rounded-xl p-4 font-mono text-xs text-gray-300 space-y-0.5">
    {items.map((item, i) => <div key={i}>{item}</div>)}
  </div>
);

const Pill = ({ color, children }: { color: string; children: React.ReactNode }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${color}`}>{children}</span>
);

type TabId = "overview" | "architecture" | "scoring" | "reranking" | "onet" | "data" | "running";

const TABS: { id: TabId; label: string }[] = [
  { id: "overview",      label: "Overview" },
  { id: "architecture",  label: "Architecture" },
  { id: "onet",          label: "O*NET Data" },
  { id: "scoring",       label: "Scoring Formula" },
  { id: "reranking",     label: "Live Re-Ranking" },
  { id: "data",          label: "File Structure" },
  { id: "running",       label: "Running Locally" },
];

export default function HowItWorksPage() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  return (
    <div className="min-h-screen bg-gray-50">
      <CIHeader title="How It Works" />

      {/* Meta bar */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
        <div className="mx-auto max-w-5xl flex items-center gap-3 text-sm text-gray-600">
          <span className="font-semibold text-gray-900">Developer Reference</span>
          <span className="text-gray-300">·</span>
          <span>Candidate Insights POC</span>
          <span className="text-gray-300">·</span>
          <span className="text-teal-700 font-medium">O*NET-Powered Scoring</span>
          <Link href="/candidate-insights" className="ml-auto text-xs text-teal-700 hover:underline">← Back to dashboard</Link>
        </div>
      </div>

      {/* Tab bar */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 flex gap-0 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? "border-[#1A5C4E] text-[#1A5C4E]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">

        {/* ── OVERVIEW ─────────────────────────────────────────────── */}
        {activeTab === "overview" && (
          <>
            <div className="bg-[#1A5C4E] text-white rounded-2xl p-6 space-y-2">
              <h1 className="text-xl font-bold">Candidate Insights POC</h1>
              <p className="text-green-100 text-sm leading-relaxed">
                This is a proof-of-concept that demonstrates how <strong>O*NET occupational data</strong> can
                power smarter, more objective candidate scoring than manual skill extraction — giving PeopleScout
                a differentiator over what ScoutAI currently does.
              </p>
            </div>

            <Section title="What problem does this solve?">
              <p className="text-sm text-gray-600 leading-relaxed">
                ScoutAI today requires recruiters to manually define skills and weights for every job rubric.
                That's time-consuming, inconsistent, and doesn't reflect market-standard skill importance.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                This POC pulls skills <strong>automatically</strong> from the O*NET database — the US government's
                occupational standards authority — and uses their importance scores to weight candidates objectively.
                A recruiter sets a SOC code (the occupation code) and gets a complete scoring rubric in seconds.
              </p>
            </Section>

            <Section title="The three 'wow' features">
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    num: "01",
                    title: "O*NET Rubric Builder",
                    desc: "Skills auto-extracted from the government occupational database by SOC code. Importance scores (1–5) map directly to skill weights. No manual entry.",
                    color: "bg-teal-50 border-teal-200",
                  },
                  {
                    num: "02",
                    title: "Live Re-Ranking",
                    desc: "Change any skill's priority and all candidate scores instantly recalculate in the browser — no API call needed. Recruiters see the impact of their decisions in real time.",
                    color: "bg-blue-50 border-blue-200",
                  },
                  {
                    num: "03",
                    title: "Cross-Job Matching",
                    desc: "Low-scoring candidates are automatically compared against all other open jobs. Priya Sharma scores 29/100 for Software Developer but 85/100 for HR Specialist — surfaced instantly.",
                    color: "bg-purple-50 border-purple-200",
                  },
                ].map((f) => (
                  <div key={f.num} className={`rounded-xl border p-4 ${f.color}`}>
                    <div className="text-2xl font-black text-gray-300 mb-1">{f.num}</div>
                    <div className="font-bold text-gray-900 text-sm mb-1">{f.title}</div>
                    <p className="text-xs text-gray-600 leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Match label thresholds">
              <div className="flex gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Pill color="bg-green-600 text-white">Strong Match</Pill>
                  <span className="text-sm text-gray-600">≥ 85 / 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Pill color="bg-orange-500 text-white">Partial Match</Pill>
                  <span className="text-sm text-gray-600">50 – 84 / 100</span>
                </div>
                <div className="flex items-center gap-2">
                  <Pill color="bg-red-600 text-white">Low Match</Pill>
                  <span className="text-sm text-gray-600">{'<'} 50 / 100</span>
                </div>
              </div>
            </Section>

            <Section title="Demo candidates — what to show">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-gray-500 border-b">
                    <th className="text-left py-2 pr-4">Candidate</th>
                    <th className="text-left py-2 pr-4">Applied for</th>
                    <th className="text-left py-2 pr-4">Score</th>
                    <th className="text-left py-2">Story</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["Marcus Chen", "Software Developer", "92 Strong", "Perfect fit — fintech background, AWS certified"],
                    ["Sarah Okafor", "Software Developer", "87 Strong", "Strong backend, slight gap on GraphQL"],
                    ["James Whitfield", "Software Developer", "62 Partial", "Self-taught, strong GitHub but no CS degree"],
                    ["Priya Sharma", "Software Developer", "29 Low → HR 85 Strong", "CS grad, 8yr HR career — wrong job, right person"],
                    ["Dr. Diana Reyes", "Registered Nurse", "91 Strong", "ICU RN, CCRN certified, tele experience"],
                    ["Marcus Thompson", "Data Scientist (via cross-match)", "76 Partial in HR", "People analytics background surfaces in HR match"],
                  ].map(([name, job, score, story]) => (
                    <tr key={name} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-4 font-medium text-gray-900">{name}</td>
                      <td className="py-2.5 pr-4 text-gray-600">{job}</td>
                      <td className="py-2.5 pr-4 text-teal-700 font-mono text-xs">{score}</td>
                      <td className="py-2.5 text-gray-500 text-xs">{story}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>
          </>
        )}

        {/* ── ARCHITECTURE ─────────────────────────────────────────── */}
        {activeTab === "architecture" && (
          <>
            <Section title="System overview">
              <CodeBlock label="Data flow">{`Browser (Next.js 14 App Router)
│
├── /candidate-insights                  Dashboard — loads pre-computed scores
├── /candidate-insights/jobs/[jobId]     Job detail — rubric builder + results
│   ├── Server component                 Reads O*NET snapshot from filesystem
│   └── Client component (JobDetailClient.tsx)
│       ├── Live re-ranking (pure client-side, no API)
│       ├── Reality Check (computed from rubric + scores)
│       └── Score Breakdown modal
│
└── /candidate-insights/candidates/[id]  Candidate detail
    └── Calls /api/candidate-insights/cross-match (Claude API)

API Routes (Next.js Route Handlers)
├── GET  /api/candidate-insights/onet?socCode=     Build rubric from O*NET snapshot
├── POST /api/candidate-insights/score             Score one candidate (Claude API)
├── POST /api/candidate-insights/score/batch       Score all candidates for a job
└── POST /api/candidate-insights/cross-match       Find better-fit jobs for Low Match`}</CodeBlock>
            </Section>

            <Section title="Tech stack">
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                {[
                  ["Next.js 14", "App Router, server + client components, route handlers"],
                  ["TypeScript", "Strict types throughout — see src/lib/candidate-insights/types.ts"],
                  ["Tailwind CSS", "Custom CI color tokens: #1A5C4E (green), #E8F5F2 (tint)"],
                  ["@radix-ui/react-slider", "Skill weight sliders in the Rubric Builder"],
                  ["Vercel AI SDK (ai)", "generateText for scoring + cross-job matching"],
                  ["@ai-sdk/anthropic", "Claude Sonnet 4 model provider"],
                  ["Pre-computed JSON", "24 scores across 6 jobs — instant demo, no API latency"],
                ].map(([tech, desc]) => (
                  <div key={tech as string} className="flex gap-3">
                    <Code>{tech}</Code>
                    <span className="text-gray-600 text-xs leading-5">{desc}</span>
                  </div>
                ))}
              </div>
            </Section>

            <Section title="Key design decisions">
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex gap-3">
                  <span className="text-teal-600 font-bold shrink-0">→</span>
                  <p><strong>Pre-computed scores for the demo.</strong> All 24 candidate scores are stored in <Code>src/data/scores/pre-computed.json</Code>. The app loads these on page render — no Claude API call needed, no latency, no cost during the demo.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-teal-600 font-bold shrink-0">→</span>
                  <p><strong>O*NET snapshots are local JSON files.</strong> Rather than hitting the O*NET API live, data is pre-fetched and stored in <Code>src/data/onet-snapshots/{"{"}socCode{"}"}.json</Code>. In production, you'd refresh these periodically.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-teal-600 font-bold shrink-0">→</span>
                  <p><strong>Cross-job matching hits Claude in real time.</strong> This is the only live API call. When a Low Match candidate's detail page loads, it POST to <Code>/api/candidate-insights/cross-match</Code> which calls Claude to find better-fit jobs.</p>
                </div>
                <div className="flex gap-3">
                  <span className="text-teal-600 font-bold shrink-0">→</span>
                  <p><strong>Server + client component split.</strong> <Code>jobs/[jobId]/page.tsx</Code> is a server component that reads O*NET files from disk. <Code>JobDetailClient.tsx</Code> is a client component that owns all state and interactivity.</p>
                </div>
              </div>
            </Section>
          </>
        )}

        {/* ── O*NET DATA ───────────────────────────────────────────── */}
        {activeTab === "onet" && (
          <>
            <Section title="What is O*NET?">
              <p className="text-sm text-gray-600 leading-relaxed">
                O*NET (Occupational Information Network) is the US Department of Labor's database of 900+ occupations.
                Each occupation has a <strong>SOC code</strong> (Standard Occupational Classification) and detailed data on:
                knowledge, skills, abilities, tools, and importance scores (1–5 scale) for each.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                We use importance scores to automatically weight skills — no recruiter judgment needed for the initial rubric.
              </p>
            </Section>

            <Section title="SOC codes used in this POC">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-gray-500 border-b">
                    <th className="text-left py-2 pr-4">SOC Code</th>
                    <th className="text-left py-2 pr-4">Occupation</th>
                    <th className="text-left py-2">Snapshot file</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[
                    ["15-1252.00", "Software Developer", "15-1252.00.json"],
                    ["15-2051.00", "Data Scientist", "15-2051.00.json"],
                    ["29-1141.00", "Registered Nurse", "29-1141.00.json"],
                    ["13-2051.00", "Financial Analyst", "13-2051.00.json"],
                    ["11-2021.00", "Marketing Manager", "11-2021.00.json"],
                    ["13-1071.00", "HR Specialist", "13-1071.00.json"],
                  ].map(([code, title, file]) => (
                    <tr key={code} className="hover:bg-gray-50">
                      <td className="py-2.5 pr-4 font-mono text-xs text-teal-700">{code}</td>
                      <td className="py-2.5 pr-4 text-gray-900">{title}</td>
                      <td className="py-2.5 font-mono text-xs text-gray-500">{file}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title="How importance maps to priority">
              <CodeBlock label="src/lib/candidate-insights/onet/rubric-builder.ts">{`function importanceToPriority(importance: number): SkillPriority {
  if (importance >= 4.5) return "Essential";   // Top-tier skills
  if (importance >= 3.5) return "Important";   // Core skills
  if (importance >= 2.5) return "Preferred";   // Helpful skills
  return "Desired";                            // Nice-to-have
}

function importanceToWeight(importance: number): number {
  // Scale O*NET 1-5 → slider weight 1-10
  return Math.round(importance * 2 * 10) / 10;
}`}</CodeBlock>
              <p className="text-xs text-gray-500">
                A skill with importance 4.8 → weight 9.6, Priority: Essential. Importance 3.2 → weight 6.4, Priority: Preferred.
              </p>
            </Section>

            <Section title="Snapshot file format">
              <CodeBlock label="src/data/onet-snapshots/15-1252.00.json (abbreviated)">{`{
  "socCode": "15-1252.00",
  "occupationTitle": "Software Developer",
  "jobZone": 4,
  "technicalSkills": [
    {
      "elementId": "KN.001",
      "name": "Programming Languages & Paradigms",
      "importance": 4.8,    ← drives priority and weight
      "level": 7,
      "category": "knowledge"
    }
    // ...up to 10 technical skills
  ],
  "softSkills": [ /* ...up to 8 soft skills */ ],
  "suggestedSkills": [ /* skills the AI recommends adding */ ],
  "qualifications": [ /* required/preferred certs and degrees */ ],
  "fetchedAt": "2026-03-28T00:00:00.000Z"
}`}</CodeBlock>
            </Section>

            <Section title="Adding a new job (O*NET snapshot)">
              <ol className="space-y-3 text-sm text-gray-700 list-decimal list-inside">
                <li>Look up the SOC code at <strong>onetonline.org</strong> — search by job title.</li>
                <li>Create <Code>src/data/onet-snapshots/{"<"}SOC-CODE{">"}.json</Code> following the format above. The O*NET API at <Code>services.onetcenter.org</Code> has a REST API you can call with your API key.</li>
                <li>Add the job to <Code>src/lib/candidate-insights/mock/jobs.ts</Code> with an ID, SOC code, and <Code>candidateIds</Code> array.</li>
                <li>Add candidates to <Code>src/lib/candidate-insights/mock/candidates.ts</Code> with plain-text resumes.</li>
                <li>Add pre-computed scores to <Code>src/data/scores/pre-computed.json</Code> — or call <Code>/api/candidate-insights/score/batch</Code> to generate them live.</li>
              </ol>
            </Section>
          </>
        )}

        {/* ── SCORING FORMULA ──────────────────────────────────────── */}
        {activeTab === "scoring" && (
          <>
            <Section title="The scoring formula">
              <CodeBlock label="Overall score calculation">{`Overall Score = (skillsScore × 55% + experienceScore × 25% + educationScore × 20%) / 100

Where:
  skillsScore    = weighted average of rawScore per skill (0-100)
  experienceScore = AI-assessed experience match (0-100)
  educationScore  = qualification requirements met (0-100)

Default weightages: Skills 55% | Experience 25% | Education 20%
(Recruiter can adjust via sliders — must sum to 100%)`}</CodeBlock>
            </Section>

            <Section title="Skill scoring (rawScore)">
              <p className="text-sm text-gray-600 leading-relaxed">
                Claude reads the candidate's resume and scores each skill 0–10 against evidence found:
              </p>
              <table className="w-full text-sm border-collapse mt-2">
                <thead>
                  <tr className="text-xs uppercase tracking-wider text-gray-500 border-b">
                    <th className="text-left py-2 pr-4">Raw Score</th>
                    <th className="text-left py-2">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs">
                  {[
                    ["9–10", "Explicit + extensive evidence (named skill + years + achievements)"],
                    ["7–8", "Clear evidence (skill demonstrated through work, even if not named)"],
                    ["5–6", "Partial evidence (adjacent skills, transferable experience)"],
                    ["3–4", "Inferred evidence (tangentially related)"],
                    ["0–2", "No meaningful evidence"],
                  ].map(([score, meaning]) => (
                    <tr key={score} className="hover:bg-gray-50">
                      <td className="py-2 pr-4 font-mono text-teal-700">{score}</td>
                      <td className="py-2 text-gray-600">{meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Section>

            <Section title="Prompt injection protection (5 layers)">
              <p className="text-sm text-gray-600">Resumes are passed to Claude with 5-layer protection in <Code>src/lib/candidate-insights/ai/resume-sanitizer.ts</Code>:</p>
              <ol className="space-y-1.5 text-sm text-gray-700 list-decimal list-inside mt-2">
                <li>Length cap: 8,000 characters max (truncated with notice)</li>
                <li>Strip HTML and XML tags</li>
                <li>Strip markdown formatting</li>
                <li>Regex detection of injection patterns (IGNORE, SYSTEM, etc.)</li>
                <li>Wrap in <Code>{"<resume_content>"}</Code> delimiters so the model knows it's data, not instructions</li>
              </ol>
            </Section>

            <Section title="Pre-computed vs. live scoring">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                  <div className="font-bold text-green-800 text-sm mb-2">Pre-computed (demo mode) ✓</div>
                  <p className="text-xs text-gray-600 leading-relaxed">Scores stored in <Code>src/data/scores/pre-computed.json</Code>. Page loads instantly. No API cost. Used on the dashboard and job detail pages.</p>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                  <div className="font-bold text-blue-800 text-sm mb-2">Live scoring (production mode)</div>
                  <p className="text-xs text-gray-600 leading-relaxed">Call <Code>POST /api/candidate-insights/score/batch</Code> with a jobId to score all candidates live against the current rubric. Takes 5–15 seconds per candidate.</p>
                </div>
              </div>
            </Section>
          </>
        )}

        {/* ── LIVE RE-RANKING ──────────────────────────────────────── */}
        {activeTab === "reranking" && (
          <>
            <Section title="How live re-ranking works">
              <p className="text-sm text-gray-600 leading-relaxed">
                When a recruiter changes a skill's priority (e.g., downgrades "Kubernetes" from Essential to Important),
                all candidate scores recalculate instantly in the browser — no API call, no page reload.
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                This is possible because each pre-computed score stores a <Code>rawScore</Code> (0–10) per skill.
                The re-ranking formula recombines these raw scores using the new priority weights:
              </p>
            </Section>

            <Section title="Re-ranking formula">
              <CodeBlock label="src/lib/candidate-insights/onet/rubric-builder.ts — recalculateScore()">{`Priority weights:
  Essential = 4×   Important = 3×   Preferred = 2×   Desired = 1×

skillsScore = Σ(rawScore × priorityWeight) / Σ(priorityWeight) × 10

Example with 3 skills:
  Programming  rawScore=10  Essential(4×) → 10 × 4 = 40
  Docker       rawScore=4   Important(3×) →  4 × 3 = 12
  GraphQL      rawScore=6   Preferred(2×) →  6 × 2 = 12

  Σ weights = 4+3+2 = 9
  Σ weighted = 40+12+12 = 64
  skillsScore = (64/9) × 10 = 71.1 → rounds to 71

overallScore = (71 × 55% + experienceScore × 25% + educationScore × 20%) / 100`}</CodeBlock>
            </Section>

            <Section title="What triggers a re-rank?">
              <ol className="space-y-2 text-sm text-gray-700 list-decimal list-inside">
                <li><strong>Skill priority change</strong> — clicking a priority badge (Essential → Important → Preferred → Desired) or moving the weight slider. Handled by <Code>handleSkillChange()</Code> in <Code>JobDetailClient.tsx</Code>.</li>
                <li><strong>Weightage change</strong> — adjusting the Skills/Experience/Education percentage sliders. Handled by <Code>handleWeightageChange()</Code>.</li>
                <li><strong>Reality Check reclassify</strong> — clicking "Reclassify to Important →" on a flagged skill. Calls <Code>handleReclassify()</Code> which calls <Code>handleSkillChange()</Code>.</li>
              </ol>
            </Section>

            <Section title="Flash animation for newly-eligible candidates">
              <p className="text-sm text-gray-600 leading-relaxed">
                If a skill re-rank causes a candidate to cross from Partial/Low → Strong Match (≥ 85), they flash green for 1.2 seconds. This is the <Code>animate-flash-green</Code> Tailwind keyframe defined in <Code>tailwind.config.ts</Code>.
              </p>
              <CodeBlock label="tailwind.config.ts">{`keyframes: {
  "flash-green": {
    "0%, 100%": { backgroundColor: "transparent" },
    "30%":       { backgroundColor: "#D1FAE5" },
  }
},
animation: { "flash-green": "flash-green 1.2s ease-in-out" }`}</CodeBlock>
            </Section>

            <Section title="Reality Check logic">
              <p className="text-sm text-gray-600 leading-relaxed">
                After every re-rank, <Code>computeRealityCheck()</Code> in <Code>rubric-builder.ts</Code> scans Essential skills to find ones that score {"<"} 5/10 for more than 30% of candidates. Those are flagged as "eliminating too much of the talent pool."
              </p>
              <p className="text-sm text-gray-600 leading-relaxed">
                Skill names from O*NET ("Programming Languages & Paradigms") are fuzzy-matched against evidence names ("Programming") using the <Code>skillNamesMatch()</Code> function — substring matching in both directions.
              </p>
            </Section>
          </>
        )}

        {/* ── FILE STRUCTURE ───────────────────────────────────────── */}
        {activeTab === "data" && (
          <>
            <Section title="Directory structure">
              <FileTree items={[
                "src/",
                "├── app/",
                "│   ├── candidate-insights/",
                "│   │   ├── page.tsx                    ← Dashboard",
                "│   │   ├── how-it-works/page.tsx       ← This page",
                "│   │   ├── jobs/[jobId]/",
                "│   │   │   ├── page.tsx                ← Server component (reads O*NET)",
                "│   │   │   └── JobDetailClient.tsx     ← Client component (all state)",
                "│   │   └── candidates/[candidateId]/",
                "│   │       └── page.tsx                ← Candidate detail + cross-job",
                "│   └── api/candidate-insights/",
                "│       ├── onet/route.ts               ← GET: build rubric from snapshot",
                "│       ├── score/route.ts              ← POST: score one candidate",
                "│       ├── score/batch/route.ts        ← POST: score all for a job",
                "│       └── cross-match/route.ts        ← POST: find better-fit jobs",
                "├── components/candidate-insights/",
                "│   ├── layout/CIHeader.tsx             ← Dark green header + breadcrumb",
                "│   ├── dashboard/",
                "│   │   ├── JobCard.tsx                 ← Clickable job card",
                "│   │   └── StatsBar.tsx                ← Aggregate counts strip",
                "│   ├── rubric/",
                "│   │   ├── SkillSlider.tsx             ← Radix slider + priority badge",
                "│   │   ├── SkillColumn.tsx             ← Technical/Soft column wrapper",
                "│   │   ├── SuggestedSkills.tsx         ← Dropdown of suggested skills",
                "│   │   ├── WeightageSliders.tsx        ← Skills/Exp/Edu % sliders",
                "│   │   ├── QualificationsSection.tsx   ← Required/Preferred quals",
                "│   │   └── RubricActions.tsx           ← AI disclaimer + buttons",
                "│   ├── scoring/",
                "│   │   ├── CandidateRow.tsx            ← Expandable candidate row",
                "│   │   ├── ScoreExpandedCard.tsx       ← Expanded score breakdown",
                "│   │   ├── ScoreBreakdownModal.tsx     ← Modal: formula explanation",
                "│   │   ├── SkillEvidenceTable.tsx      ← Per-skill evidence table",
                "│   │   ├── RealityCheckPanel.tsx       ← Talent market warnings",
                "│   │   ├── MatchBadge.tsx              ← Strong/Partial/Low pill",
                "│   │   ├── PriorityBadge.tsx           ← Essential/Important/etc pill",
                "│   │   ├── SourceBadge.tsx             ← O*NET/Resume/Inferred pill",
                "│   │   ├── ConfidenceBar.tsx           ← 5-segment confidence bar",
                "│   │   └── StatusBar.tsx               ← Scored/error status strip",
                "│   └── cross-match/",
                "│       └── CrossJobSuggestions.tsx     ← Alternative job match cards",
                "├── lib/candidate-insights/",
                "│   ├── types.ts                        ← All TypeScript interfaces",
                "│   ├── mock/",
                "│   │   ├── jobs.ts                     ← 6 mock job definitions",
                "│   │   └── candidates.ts               ← 22 mock candidates w/ resumes",
                "│   ├── onet/",
                "│   │   └── rubric-builder.ts           ← Build rubric + re-rank formula",
                "│   └── ai/",
                "│       ├── resume-sanitizer.ts         ← 5-layer injection protection",
                "│       ├── scoring-prompt.ts           ← Claude scoring prompt + parser",
                "│       └── cross-match.ts              ← Claude cross-job matching",
                "└── data/",
                "    ├── onet-snapshots/                 ← Pre-fetched O*NET JSON files",
                "    │   ├── 15-1252.00.json             ← Software Developer",
                "    │   ├── 15-2051.00.json             ← Data Scientist",
                "    │   └── ... (6 total)",
                "    └── scores/",
                "        └── pre-computed.json           ← 24 pre-scored candidates",
              ]} />
            </Section>

            <Section title="Key type definitions">
              <CodeBlock label="src/lib/candidate-insights/types.ts (key interfaces)">{`interface ScoreResult {
  candidateId: string;
  jobId: string;
  overallScore: number;          // 0-100
  skillsScore: number;           // 0-100 skills sub-score
  experienceScore: number;       // 0-100 experience sub-score
  educationScore: number;        // 0-100 education sub-score
  matchLabel: MatchLabel;        // "Strong Match" | "Partial Match" | "Low Match"
  skillEvidence: SkillEvidence[];  // Per-skill raw scores + evidence
  strengths: string[];
  concerns: string[];
  whyThisScore: string;
}

interface SkillEvidence {
  rank: number;
  skill: string;
  evidence: string;              // Quote from resume
  source: "Resume" | "Inferred";
  confidence: "high" | "mid" | "low";
  rawScore: number;              // 0-10 — used for live re-ranking
  priority: SkillPriority;
  category: "technical" | "soft";
}`}</CodeBlock>
            </Section>
          </>
        )}

        {/* ── RUNNING LOCALLY ──────────────────────────────────────── */}
        {activeTab === "running" && (
          <>
            <Section title="Prerequisites">
              <ul className="space-y-1.5 text-sm text-gray-700 list-disc list-inside">
                <li>Node.js 18+ and npm</li>
                <li>An Anthropic API key (for cross-job matching and live scoring)</li>
                <li>Access to the <Code>rguyer/tough-love</Code> GitHub repo (this lives on branch <Code>claude/practical-hamilton</Code>)</li>
              </ul>
            </Section>

            <Section title="Setup">
              <CodeBlock label="Terminal">{`# Clone the repo
git clone https://github.com/rguyer/tough-love.git
cd tough-love

# Switch to the CI branch
git checkout claude/practical-hamilton

# Install dependencies
npm install

# Create .env.local (copy from the team vault)
cp .env.local.example .env.local
# Add ANTHROPIC_API_KEY to .env.local

# Start dev server
npm run dev

# Open in browser
open http://localhost:3000/candidate-insights`}</CodeBlock>
            </Section>

            <Section title="Environment variables needed">
              <CodeBlock label=".env.local">{`# Required for cross-job matching and live scoring
ANTHROPIC_API_KEY=sk-ant-...

# Required only if you use the dating coach features (not needed for CI)
NEXTAUTH_SECRET=any-random-string
NEXTAUTH_URL=http://localhost:3000`}</CodeBlock>
            </Section>

            <Section title="Running a TypeScript check">
              <CodeBlock label="Terminal">{`npx tsc --noEmit
# Should show 0 errors from candidate-insights code
# One pre-existing NextAuth typing issue in src/app/onboarding/page.tsx is expected`}</CodeBlock>
            </Section>

            <Section title="Generating fresh scores (optional)">
              <CodeBlock label="Terminal — call the batch scoring API">{`curl -X POST http://localhost:3000/api/candidate-insights/score/batch \\
  -H "Content-Type: application/json" \\
  -d '{"jobId": "job-sw-dev"}'

# This calls Claude for each candidate and returns ScoreResult[]
# Takes ~30-60 seconds for 4 candidates
# Paste results into src/data/scores/pre-computed.json`}</CodeBlock>
            </Section>

            <Section title="Demo flow for the presentation">
              <ol className="space-y-2.5 text-sm text-gray-700 list-decimal list-inside">
                <li>Open <strong>localhost:3000/candidate-insights</strong> — show the dashboard (6 jobs, aggregate stats)</li>
                <li>Click <strong>Software Developer</strong> → lands on Results tab showing 4 ranked candidates</li>
                <li>Expand <strong>Marcus Chen (92)</strong> — show the score breakdown, strengths, why this score</li>
                <li>Switch to <strong>Rubric Builder</strong> tab — show O*NET auto-extracted skills with importance scores</li>
                <li>Change <strong>"Programming Languages & Paradigms"</strong> from Essential → Important — scores update live</li>
                <li>Switch back to Results — scroll to <strong>Talent Market Reality Check</strong>, click Reclassify on a flagged skill</li>
                <li>Go to <strong>Priya Sharma (29/100, Low Match)</strong> → click "Find better fit →"</li>
                <li>On Priya's detail page — show cross-job matching: <strong>HR Specialist 85/100 Strong Match</strong></li>
              </ol>
            </Section>

            <Section title="Contacts">
              <p className="text-sm text-gray-600">
                Questions while the team is on PTO? The full development history is in the PR at{" "}
                <a href="https://github.com/rguyer/tough-love/pull/2" target="_blank" className="text-teal-700 underline">
                  github.com/rguyer/tough-love/pull/2
                </a>.
                All logic is documented inline in the source files. The scoring formula, re-ranking math, and prompt injection protection all have comments explaining the reasoning.
              </p>
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
