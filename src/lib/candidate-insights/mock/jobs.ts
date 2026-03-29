import type { MockJob } from "../types";

export const MOCK_JOBS: MockJob[] = [
  {
    id: "job-sw-dev",
    title: "Software Developer",
    socCode: "15-1252.00",
    department: "Engineering",
    location: "Seattle, WA",
    employmentType: "Full-Time",
    salaryRange: "$110,000 – $145,000",
    description:
      "Design, develop, and maintain web applications and APIs. Collaborate with product and design teams to ship high-quality software.",
    candidateIds: [
      "cand-01", "cand-02", "cand-03", "cand-04",
    ],
  },
  {
    id: "job-data-sci",
    title: "Data Scientist",
    socCode: "15-2051.00",
    department: "Data & Analytics",
    location: "Chicago, IL",
    employmentType: "Full-Time",
    salaryRange: "$115,000 – $150,000",
    description:
      "Build and deploy machine learning models to drive business insights. Work closely with engineering and product to operationalize models.",
    candidateIds: [
      "cand-05", "cand-06", "cand-07", "cand-08",
    ],
  },
  {
    id: "job-rn",
    title: "Registered Nurse",
    socCode: "29-1141.00",
    department: "Healthcare",
    location: "Houston, TX",
    employmentType: "Full-Time",
    salaryRange: "$72,000 – $95,000",
    description:
      "Provide direct patient care in a fast-paced hospital environment. Coordinate with physicians and multidisciplinary teams.",
    candidateIds: [
      "cand-09", "cand-10", "cand-11", "cand-12",
    ],
  },
  {
    id: "job-fin-analyst",
    title: "Financial Analyst",
    socCode: "13-2051.00",
    department: "Finance",
    location: "New York, NY",
    employmentType: "Full-Time",
    salaryRange: "$85,000 – $115,000",
    description:
      "Perform financial modeling, variance analysis, and forecasting to support strategic decision-making.",
    candidateIds: [
      "cand-13", "cand-14", "cand-15", "cand-16",
    ],
  },
  {
    id: "job-mkt-mgr",
    title: "Marketing Manager",
    socCode: "11-2021.00",
    department: "Marketing",
    location: "Austin, TX",
    employmentType: "Full-Time",
    salaryRange: "$95,000 – $130,000",
    description:
      "Lead integrated marketing campaigns across digital and traditional channels. Manage a team of 4 specialists.",
    candidateIds: [
      "cand-17", "cand-18", "cand-19", "cand-20",
    ],
  },
  {
    id: "job-hr-spec",
    title: "HR Specialist",
    socCode: "13-1071.00",
    department: "Human Resources",
    location: "Denver, CO",
    employmentType: "Full-Time",
    salaryRange: "$62,000 – $82,000",
    description:
      "Support full-cycle recruiting, onboarding, benefits administration, and employee relations.",
    candidateIds: [
      "cand-21", "cand-22",
      // cross-job candidates also apply here
      "cand-04", "cand-08",
    ],
  },
];

export function getJobById(id: string): MockJob | undefined {
  return MOCK_JOBS.find((j) => j.id === id);
}

export function getJobsForCandidate(candidateId: string): MockJob[] {
  return MOCK_JOBS.filter((j) => j.candidateIds.includes(candidateId));
}
