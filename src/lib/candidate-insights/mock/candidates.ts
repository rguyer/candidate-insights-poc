import { MockCandidate } from "../types";

export const MOCK_CANDIDATES: MockCandidate[] = [
  // ─── job-sw-dev ─────────────────────────────────────────────────────────────
  {
    id: "cand-01",
    name: "Marcus Chen",
    email: "marcus.chen@email.com",
    appliedJobId: "job-sw-dev",
    resume: `Eight years of professional software engineering experience across startup and enterprise environments, with deep expertise in Python and TypeScript. Currently a senior software engineer at Meridian Systems, where I lead a team of five engineers building a distributed data ingestion platform serving 200 million events per day. My responsibilities span system design, code review, sprint planning, and mentoring junior developers through structured one-on-ones and pairing sessions.

I joined Meridian after four years at Bolt Financial, where I built full-stack features using React, Node.js, and PostgreSQL. At Bolt I introduced CI/CD pipelines using GitHub Actions and reduced deployment time from two hours to under fifteen minutes. I also led the migration of three monolithic services to containerized microservices on AWS ECS, which improved system reliability from 98.2% to 99.8% uptime over six months.

My current stack at Meridian centers on Python for backend services, TypeScript for our internal tooling and frontend dashboards, and AWS for infrastructure — specifically Lambda, SQS, RDS, and CloudFront. I have hands-on experience with Terraform for infrastructure as code and have authored runbooks and architectural decision records that have become team standards.

On the data side, I have worked extensively with PostgreSQL and have designed schemas that handle complex hierarchical relationships under high concurrency. I introduced query optimization strategies at Meridian that cut p99 latency on our reporting endpoints by 60 percent.

I hold a Bachelor of Science in Computer Science from UC Davis and have completed AWS Solutions Architect Associate certification. I am comfortable in system design interviews and regularly conduct them as part of our hiring process. I enjoy mentoring, writing internal documentation, and advocating for test coverage — our team currently maintains 87% unit and integration test coverage on all production services.`,
  },
  {
    id: "cand-02",
    name: "Sarah Okafor",
    email: "sarah.okafor@email.com",
    appliedJobId: "job-sw-dev",
    resume: `Six years of full-stack software development experience, including time at two early-stage startups and Google, where I spent eighteen months as a software engineer on the Google Maps Platform team. I hold a B.S. in Computer Science from Howard University and bring strong foundations in both backend and frontend engineering.

At Google I contributed to Python-based microservices that processed geospatial data at massive scale. I worked within a team of twelve engineers and was responsible for writing and reviewing code, defining API contracts, and participating in on-call rotations. The experience gave me direct exposure to large-scale cloud infrastructure — specifically Google Cloud Platform — as well as rigorous code review processes and SRE-style reliability thinking.

Before Google I worked at two startups. At Luma Health I was the first backend hire, building the patient scheduling API in Django and PostgreSQL from scratch. I implemented OAuth2 authentication, wrote comprehensive test suites using pytest, and helped design the database schema that eventually supported 500,000 monthly active users. At Wren Finance I wore multiple hats, shipping React frontends alongside Flask APIs and writing deployment scripts for AWS EC2 and RDS.

I am comfortable with the full modern web stack: Python, Django, Flask, JavaScript, TypeScript, and React on the product side, with PostgreSQL and Redis as my go-to data stores. My cloud experience spans both AWS and GCP. I care deeply about code quality, test coverage, and writing services that are easy to understand and maintain. I have mentored two junior engineers and enjoy code review as a teaching tool rather than a gatekeeping exercise.`,
  },
  {
    id: "cand-03",
    name: "James Whitfield",
    email: "james.whitfield@email.com",
    appliedJobId: "job-sw-dev",
    resume: `Three years of software development experience primarily focused on JavaScript and React-based front-end work. I graduated with a B.S. in Information Technology from Ohio State University in 2021 and have been working full time as a junior developer at Clearpath Digital, a marketing technology agency, since then.

My day-to-day work involves building and maintaining React component libraries, implementing designs from Figma into responsive web interfaces, and integrating with REST APIs provided by backend teams. I have strong CSS skills including Tailwind and have worked with Next.js for several client projects. I use Git daily and am comfortable with basic CI workflows for front-end deployments.

On the backend side, I have a working knowledge of Node.js and have built small Express APIs for personal projects, but I have not maintained production backend services professionally. I have taken two online courses in SQL and can write basic queries, though I do not have production database experience. My cloud exposure is limited to deploying front-end apps on Netlify and Vercel; I have not worked directly with AWS or GCP services.

I am actively learning Python through a self-paced course and am interested in moving toward more full-stack roles. I enjoy front-end engineering and am proud of the accessible, performant interfaces I have shipped, but I recognize I have more to learn on the systems and infrastructure side. I am a fast learner and eager to grow my skill set in a role that offers mentorship and exposure to back-end architecture.`,
  },
  {
    id: "cand-04",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    appliedJobId: "job-sw-dev",
    resume: `Background in computer science with a B.S. from Carnegie Mellon University, followed by four years working at the intersection of HR technology and people operations. After graduating I joined Deloitte's HR Transformation practice, where I spent three years implementing HRIS platforms — primarily Workday — for mid-size enterprise clients. This work involved requirements gathering, configuration, data migration, UAT coordination, and end-user training.

I then moved to an in-house role at Vertex Pharmaceuticals as a People Analytics Manager. In this capacity I built and maintained HR dashboards in Tableau and Power BI, pulling data from Workday and ADP to surface workforce metrics including attrition, headcount variance, time-to-fill, and diversity representation. I collaborated with HR business partners and senior leadership to translate data into actionable talent strategies.

My technical skills include SQL for querying HR data warehouses, Excel for ad hoc analysis, and basic Python scripting for data cleanup tasks. I have working knowledge of Workday HCM modules including Core HCM, Recruiting, Absence Management, and Compensation. I have also led vendor evaluations for ATS platforms and managed the relationship with our background screening provider.

While my undergraduate CS training gave me a foundation in programming, my career has developed firmly within the HR technology and people analytics space. I am most energized by problems that sit at the intersection of workforce data and organizational strategy, and I am looking for a role where those skills are central rather than supplementary. Full-cycle recruiting experience, benefits administration knowledge, and strong employee relations background round out my profile.`,
  },

  // ─── job-data-sci ────────────────────────────────────────────────────────────
  {
    id: "cand-05",
    name: "Aisha Mensah",
    email: "aisha.mensah@email.com",
    appliedJobId: "job-data-sci",
    resume: `PhD in Statistics from the University of Michigan, with a dissertation focused on hierarchical Bayesian models for longitudinal health outcomes. Five years of industry experience in machine learning and data science following my doctorate, currently as a Senior Data Scientist at Kestrel Capital, a fintech firm specializing in credit risk and fraud detection.

At Kestrel I lead a team of three data scientists and own the end-to-end lifecycle of our primary fraud scoring model — from feature engineering through training, validation, deployment, and monitoring. The model runs at inference time on over 40 million transactions per month and has reduced false positive rates by 22 percent compared to the rule-based system it replaced. I work primarily in Python using scikit-learn, XGBoost, and TensorFlow, and I manage experiment tracking with MLflow and model versioning with DVC.

Prior to Kestrel I was a data scientist at Relativity Space, where I worked on statistical process control models for additive manufacturing. I published two peer-reviewed papers during this period: one in the Journal of Manufacturing Science and Engineering on anomaly detection in metal deposition processes, and one in a workshop proceedings at NeurIPS on uncertainty quantification for industrial ML systems.

My statistical toolkit spans classical methods (GLMs, survival analysis, hypothesis testing) and modern ML (gradient boosting, neural networks, Bayesian optimization). I am proficient in both Python and R, with strong command of pandas, NumPy, and the tidyverse. I have experience designing and analyzing A/B tests including power calculations, sequential testing, and heterogeneous treatment effect estimation. I hold a Professional Certificate in Machine Learning Engineering from Coursera and regularly contribute to open-source statistical computing libraries.`,
  },
  {
    id: "cand-06",
    name: "Tyler Brooks",
    email: "tyler.brooks@email.com",
    appliedJobId: "job-data-sci",
    resume: `Master of Science in Data Science from the University of Washington, with four years of industry experience in applied machine learning, specializing in natural language processing and computer vision. Currently a Machine Learning Engineer II at Amazon Search, where I develop and deploy models that improve product search relevance for the Amazon.com marketplace.

At Amazon I have shipped two major NLP models to production: a query intent classifier that improved add-to-cart rate by 3.4 percent on relevant query traffic, and a multilingual product attribute extractor built on a fine-tuned BERT variant. Both systems serve real-time inference through SageMaker endpoints and handle peak loads exceeding 500,000 requests per minute. I own model monitoring dashboards in CloudWatch and have implemented drift detection pipelines that page on-call engineers when feature distributions shift beyond defined thresholds.

My technical stack centers on Python and PyTorch for model development, with supporting work in Spark for large-scale feature engineering on the Amazon EMR cluster. I use MLflow for experiment tracking, and I have led the team's adoption of model cards as a documentation standard for all production models. I have designed and analyzed dozens of A/B tests, applying Bayesian and frequentist frameworks depending on the business context, and I have presented experiment results directly to senior product managers and VPs.

In computer vision I have worked on image quality classification using ResNet and EfficientNet architectures, building training pipelines that process over 10 million product images weekly. My statistical background is strong — I am comfortable with causal inference concepts, survival analysis, and bootstrapping methods for uncertainty estimation.`,
  },
  {
    id: "cand-07",
    name: "Carmen Reyes",
    email: "carmen.reyes@email.com",
    appliedJobId: "job-data-sci",
    resume: `Five years of experience as a business analyst and data analyst, now actively transitioning toward a data science role. I hold a Bachelor of Science in Business Analytics from Arizona State University and have spent my career at Sunbelt Financial Services, where I currently serve as a Senior Business Analyst supporting the retail lending division.

My core strength is SQL — I write complex queries daily against our Snowflake data warehouse to support reporting, ad hoc analysis, and KPI tracking. I have built and maintained over 40 Tableau dashboards used by teams across credit, operations, and marketing. I am comfortable with Excel and have recently started learning Python through Coursera and personal projects; I can write scripts for data cleaning and basic visualization using pandas and matplotlib, though I have not used Python in a production context.

I completed the IBM Data Science Professional Certificate in 2023, which introduced me to machine learning concepts including linear regression, decision trees, k-means clustering, and neural network basics using scikit-learn. I have reproduced several tutorials from this program and applied a simple logistic regression model to a side project predicting customer churn in a publicly available telecom dataset. I have not deployed a machine learning model in a production environment.

My business analyst background gives me strong skills in requirements gathering, stakeholder communication, and translating business questions into analytical frameworks. I understand the data pipelines and governance processes at an enterprise level and am confident working with messy, real-world data. I am genuinely excited about machine learning and committed to developing the engineering and deployment skills needed to work as a full data scientist.`,
  },
  {
    id: "cand-08",
    name: "David Kim",
    email: "david.kim@email.com",
    appliedJobId: "job-data-sci",
    resume: `Seven years of experience in people analytics and workforce intelligence, with a focus on using data to drive organizational effectiveness and talent strategy. I hold an MBA with a concentration in Organizational Behavior from Vanderbilt University and a B.A. in Psychology from Emory University.

Currently serving as Director of People Analytics at Apex Logistics, where I lead a team of two analysts responsible for all workforce reporting, predictive attrition modeling, and HR data infrastructure. I built our attrition prediction model using logistic regression in Python — the first ML application within our HR function — which achieved 74 percent accuracy in identifying flight risk employees three months before departure. This work informed our retention program design and contributed to a 9 percent reduction in voluntary turnover over two years.

Prior to Apex I spent four years at Mercer as an HR Technology and Analytics Consultant, helping clients implement people analytics capabilities on platforms including Workday, SAP SuccessFactors, and Visier. I led engagements covering HRIS implementation, organizational network analysis, workforce planning models, and DEI measurement frameworks. I am proficient in SQL, Excel, Power BI, and Tableau. My Python skills are functional for data wrangling and simple modeling but do not extend to deep learning or large-scale ML pipelines.

I am deeply familiar with HR metrics: time-to-fill, cost-per-hire, regrettable attrition, span of control, and engagement scores. I have presented analytics findings to CHROs, boards of directors, and CEO-level audiences. My interest in this role is driven by a desire to expand my technical ML skills, but I want to be transparent that my primary domain expertise sits in workforce analytics and organizational effectiveness rather than traditional data science disciplines.`,
  },

  // ─── job-rn ──────────────────────────────────────────────────────────────────
  {
    id: "cand-09",
    name: "Linda Johansson",
    email: "linda.johansson@email.com",
    appliedJobId: "job-rn",
    resume: `Registered Nurse with twelve years of clinical experience, the majority spent in the intensive care unit at Brigham and Women's Hospital in Boston. Currently holding a Certified Critical Care Registered Nurse (CCRN) credential and maintaining current ACLS, BLS, and NIHSS certifications. I earned my Bachelor of Science in Nursing from Boston College and completed a post-baccalaureate certification in Critical Care Nursing.

At Brigham I have worked in a 24-bed Medical-Surgical ICU, caring for patients with complex, multi-organ illness including sepsis, respiratory failure, post-surgical recovery, and traumatic brain injury. I have managed ventilated patients, arterial lines, central venous catheters, and continuous renal replacement therapy. For the past three years I have served as a Charge Nurse, overseeing unit operations during twelve-hour night shifts, coordinating bed assignments, managing staffing variances, and serving as the first clinical escalation contact for my team.

I am proficient with Epic EHR and have participated in two system upgrades at Brigham, contributing to workflow testing and staff training for the ICU nursing module. I serve on the hospital's Falls Prevention Committee and co-authored a unit-based quality improvement project that reduced catheter-associated urinary tract infections by 31 percent over eighteen months.

As a preceptor I have onboarded seven new graduate nurses, developing individualized orientation plans and providing structured feedback. I am also a clinical instructor adjunct at Northeastern University, teaching a one-credit critical care simulation lab each semester. I am known for calm, methodical practice under pressure and for communication that keeps patients, families, and interdisciplinary teams aligned even in high-acuity situations.`,
  },
  {
    id: "cand-10",
    name: "Marcus Thompson",
    email: "marcus.thompson@email.com",
    appliedJobId: "job-rn",
    resume: `Registered Nurse with seven years of clinical experience in medical-surgical and step-down units, currently employed at Northwestern Memorial Hospital in Chicago. I hold a Bachelor of Science in Nursing from the University of Illinois Chicago and maintain current BLS and ACLS certifications.

My primary clinical background is in medical-surgical nursing where I have cared for post-operative patients, patients with complex chronic disease, and patients requiring telemetry monitoring in a step-down capacity. I transitioned to Northwestern's Progressive Care Unit three years ago, where I manage a patient population requiring higher monitoring intensity than general medical-surgical floors but not full ICU-level intervention. This includes patients on cardiac monitoring, non-invasive positive pressure ventilation, and continuous medication infusions.

I have served as a preceptor for new graduate nurses for the past two years, coordinating orientation schedules with the unit educator and providing real-time feedback during clinical shifts. I am recognized on my unit for strong patient advocacy — I have escalated three cases to rapid response teams that resulted in timely interventions preventing ICU transfer — and I have received two DAISY Award nominations from patients and families for compassionate care.

I am proficient in Epic, have participated in our hospital's annual safety culture surveys as a unit liaison, and am an active member of the nursing shared governance council where I represent the progressive care unit's concerns and proposals to hospital leadership. I completed a thirty-hour self-directed course in evidence-based practice through the American Association of Critical-Care Nurses in 2023 and am considering pursuing CCRN certification in the next two years.`,
  },
  {
    id: "cand-11",
    name: "Fatima Al-Rashid",
    email: "fatima.alrashid@email.com",
    appliedJobId: "job-rn",
    resume: `Registered Nurse with two years of clinical experience since graduating with a Bachelor of Science in Nursing from the University of Texas at Austin in 2022. Currently working on a general medical-surgical floor at St. David's Medical Center in Austin, Texas, in a thirty-two-bed unit serving patients with a range of acute conditions including pneumonia, cellulitis, post-operative recovery, and diabetic complications.

In my current role I manage a patient assignment of four to five patients per shift and have developed strong skills in medication administration, wound care, IV management, patient education, and interdisciplinary communication. I participate in daily interdisciplinary rounds and have grown comfortable presenting patient status updates to attending physicians, hospitalists, and case managers.

I hold current BLS certification and completed my ACLS certification in early 2024. My exposure to critical care is limited — I have not worked in an ICU setting and have only briefly rotated through a simulation-based critical care lab during my nursing school training. I am aware this represents a gap and have been proactively pursuing education to address it, including enrolling in a critical care nursing fundamentals course through my hospital's clinical education department.

I am proficient in Meditech EHR, which is the system used at St. David's. I am detail-oriented, a strong communicator, and known by my charge nurses for following through on tasks without reminders. I am eager to grow into higher-acuity settings and am actively seeking a role that will accelerate that clinical development.`,
  },
  {
    id: "cand-12",
    name: "Robert Nguyen",
    email: "robert.nguyen@email.com",
    appliedJobId: "job-rn",
    resume: `Licensed Practical Nurse with four years of clinical experience, recently achieved my Associate Degree in Nursing from Chamberlain University and passed the NCLEX-RN examination in January 2024. Transitioning from LPN scope of practice to Registered Nurse role and seeking an opportunity to apply my expanded clinical training alongside my established practical nursing experience.

During my four years as an LPN at Sunrise Senior Living, I provided direct care to residents in a long-term care and memory care setting, managing medication administration, wound care, vital sign monitoring, and coordination of care with physicians and physical therapists. I supervised four certified nursing assistants per shift and was responsible for shift handoff documentation and family communication.

My LPN experience gave me a strong foundation in clinical fundamentals, time management, and patient-centered communication. However, I recognize that the RN scope — including independent assessment, nursing diagnosis, care plan development, and IV medication management — represents new responsibilities I have learned in school but have limited hands-on experience applying. My ADN clinical rotations included medical-surgical, pediatrics, obstetrics, and a brief psychiatric rotation, providing broad exposure across settings.

I hold current BLS certification and plan to pursue ACLS within the next six months. I am proficient in PointClickCare from my LPN role and have basic familiarity with Epic from clinical rotations. I am a reliable, team-oriented nurse who brings maturity, work ethic, and genuine care for patients to every shift. I am seeking a position that recognizes both my newly earned RN credentials and the practical clinical experience I have built over the past four years.`,
  },

  // ─── job-fin-analyst ─────────────────────────────────────────────────────────
  {
    id: "cand-13",
    name: "Claire Dubois",
    email: "claire.dubois@email.com",
    appliedJobId: "job-fin-analyst",
    resume: `CFA Charterholder (Level 3 passed, designation pending final registration) with six years of financial planning and analysis experience at Fortune 500 companies. Currently Senior Financial Analyst at Honeywell International, supporting the Performance Materials and Technologies business unit with annual revenue exceeding four billion dollars.

My core competency is financial modeling — I build and maintain integrated three-statement models, DCF valuations, and scenario analyses that support capital allocation decisions and strategic planning reviews. At Honeywell I own the long-range plan model for my business unit and present monthly variance analyses to the VP of Finance and CFO. My models are built in Excel with VBA macros for automation and are linked to Power BI dashboards used by finance business partners across the division.

Prior to Honeywell I spent three years at Caterpillar Financial Products Corporation, starting as a financial analyst and being promoted to senior analyst after eighteen months. At Caterpillar I supported lease portfolio analysis, built credit risk scoring models in Excel, and developed the monthly management reporting package distributed to the executive team. This role gave me deep exposure to both FP&A and some elements of corporate treasury.

I am proficient in Excel, VBA, Power BI, and SAP (BPC module). I have also used Anaplan for collaborative planning in a cross-functional budgeting cycle and am comfortable working across large, complex organizations with multiple finance stakeholders. I passed the CFA Level 1, 2, and 3 examinations on my first attempt and hold a Bachelor of Commerce in Finance from McGill University with a minor in Statistics. I am most energized by complex valuation problems and projects that connect financial rigor to real strategic decisions.`,
  },
  {
    id: "cand-14",
    name: "Jamal Washington",
    email: "jamal.washington@email.com",
    appliedJobId: "job-fin-analyst",
    resume: `MBA in Finance from Wharton School of the University of Pennsylvania, with five years of experience spanning investment banking and corporate finance. Began my career as an Investment Banking Analyst at Lazard in the restructuring and recapitalization group, where I spent two years building LBO models, analyzing distressed capital structures, and preparing CIMs and management presentation materials for clients in the industrials and healthcare sectors.

After Lazard I transitioned to corporate finance at General Mills, first as a Corporate Finance Manager and then as a Senior Financial Analyst on the M&A team. In this role I led financial due diligence for three completed acquisitions ranging from $200 million to $1.4 billion in enterprise value. I built buy-side DCF and accretion/dilution models, coordinated with legal and accounting advisors, and presented investment recommendations to the SVP of Corporate Development and the board of directors.

My technical skills include advanced Excel financial modeling, Bloomberg Terminal, FactSet, and Capital IQ for market data and comparable analysis. I have a working knowledge of Python for financial data manipulation — I have built scripts to automate data pulls from Bloomberg via the API and to run Monte Carlo simulations for sensitivity analysis. I use Power BI for management reporting and am comfortable presenting to C-suite audiences.

My transaction experience gives me a strong sense of how financial models drive real decisions, and my corporate finance background has taught me to translate complex analysis into clear narratives for non-finance stakeholders. I am looking to continue building my FP&A and strategic finance toolkit in a high-impact corporate environment.`,
  },
  {
    id: "cand-15",
    name: "Nina Patel",
    email: "nina.patel@email.com",
    appliedJobId: "job-fin-analyst",
    resume: `Two years of financial analysis experience at Meridian Capital Partners, a boutique investment advisory firm specializing in lower-middle-market mergers and acquisitions. I hold a Bachelor of Science in Finance from Indiana University's Kelley School of Business, where I graduated with honors.

In my current role I support senior analysts and managing directors with deal analysis, including building merger models, comparables analysis, and supporting due diligence documentation. My Excel skills are strong — I am comfortable with VLOOKUP, INDEX/MATCH, pivot tables, and basic financial modeling structures — and I have built several three-statement models as guided exercises during training and for live deal support. I have not yet owned a financial model end-to-end from initial build through board presentation.

I am learning Python through a Udemy course focused on financial applications and have completed modules covering pandas and basic data visualization. I have not yet applied Python in a work context. My knowledge of forecasting and budgeting methodologies is developing; I understand the concepts of rolling forecasts and zero-based budgeting from coursework but have limited hands-on experience with multi-year planning cycles in a corporate FP&A environment.

My strengths are a sharp attention to detail, the ability to organize and synthesize large amounts of information under deadline pressure, and a genuine curiosity about valuation and financial strategy. I have received consistent positive feedback from senior colleagues on the quality of my research summaries and presentation materials. I am seeking a role that will accelerate my development in FP&A and expose me to a broader planning and forecasting cycle.`,
  },
  {
    id: "cand-16",
    name: "Evan Murphy",
    email: "evan.murphy@email.com",
    appliedJobId: "job-fin-analyst",
    resume: `Certified Public Accountant with four years of experience in public accounting and one year in a corporate accounting role, now seeking to transition into financial planning and analysis. I hold a Master of Accountancy from Notre Dame and passed all four CPA exam sections on the first attempt in 2020.

I spent four years at Deloitte in the Audit practice, serving clients in manufacturing, consumer products, and logistics. Audit work gave me an exceptionally deep understanding of GAAP, financial statement construction, internal controls, and the mechanics of revenue recognition, inventory accounting, and lease accounting under ASC 842. I am highly proficient in Excel for reconciliation and analysis work and have experience working with large data sets using Excel Power Query.

In 2023 I moved in-house to a Corporate Accountant role at Clorox, where I handle monthly close, account reconciliations, and variance explanations for the supply chain finance function. This role has given me my first exposure to management reporting and I have participated in the annual budget process in a supporting capacity, helping compile actual-versus-budget schedules for business unit reviews.

My gap, which I want to be transparent about, is in forward-looking financial modeling. I have not built a DCF model, LBO model, or multi-year operating forecast professionally. I understand the conceptual frameworks from my education and am actively developing these skills through a self-directed modeling course and a CFA Level 1 study program I am currently enrolled in. My GAAP depth, attention to detail, and understanding of how financial statements are constructed give me a strong foundation to grow into FP&A, and I am committed to closing the modeling gap quickly.`,
  },

  // ─── job-mkt-mgr ─────────────────────────────────────────────────────────────
  {
    id: "cand-17",
    name: "Sofia Andersen",
    email: "sofia.andersen@email.com",
    appliedJobId: "job-mkt-mgr",
    resume: `Eight years of marketing experience spanning brand strategy, paid media, and team leadership, currently serving as Marketing Director at Thrive Consumer Brands, a mid-size direct-to-consumer wellness company with approximately $80 million in annual revenue. I oversee a team of six marketing professionals and manage an annual media budget of five million dollars across Google Ads, Meta, Pinterest, and connected TV.

In my current role I have led two major brand repositioning initiatives, each involving a complete refresh of visual identity, messaging architecture, and go-to-market strategy. The most recent reposition resulted in a 34 percent increase in new customer acquisition over the following twelve months and a 12-point improvement in aided brand awareness in our target demographic as measured by a Nielsen brand tracker. I own the attribution model we use to evaluate media efficiency and report marketing ROI monthly to the CEO and board.

Prior to Thrive I spent four years at Unilever, rotating through brand management roles for two personal care product lines. At Unilever I was trained in rigorous brand planning processes and gained experience managing agency relationships, leading integrated campaigns from creative brief through in-market execution, and analyzing panel and scanner data to assess market share performance.

I am proficient in Google Analytics 4, Meta Ads Manager, Google Ads, Looker, and Salesforce Marketing Cloud. I hold a Google Analytics certification and a Meta Blueprint certification. My leadership style emphasizes clear goal-setting, transparent performance data, and developing team members' strategic thinking alongside execution skills. I thrive in environments where creativity and analytical rigor are both valued.`,
  },
  {
    id: "cand-18",
    name: "Darius Jackson",
    email: "darius.jackson@email.com",
    appliedJobId: "job-mkt-mgr",
    resume: `Six years of digital marketing experience with a strong specialization in SEO, SEM, content strategy, and marketing analytics. Currently Head of Growth Marketing at Fieldstone Software, a B2B SaaS company, where I manage a team of four and own all demand generation channels with a combined budget of approximately $1.2 million annually.

I joined Fieldstone as its second marketing hire and have built the marketing function largely from scratch. Over three years I grew organic search traffic by 280 percent through a systematic SEO content program, established a paid search program that achieves a $42 average cost per lead in a highly competitive category, and led a complete rebrand including a new website, visual identity, and messaging framework. The rebrand coincided with a 60 percent increase in inbound demo requests over the following two quarters.

Prior to Fieldstone I spent three years at Razorfish as a digital marketing consultant, managing SEM and SEO programs for clients in financial services, healthcare, and retail. I am a HubSpot Certified Inbound Marketer and a Google Ads certified professional. I am proficient in HubSpot, Salesforce, SEMrush, Ahrefs, Google Analytics 4, and Looker Studio.

My approach to marketing is data-first but not data-only — I believe strong creative combined with rigorous measurement is what drives lasting growth. I conduct weekly performance reviews with my team, maintain a clear testing roadmap for each channel, and document learnings in a shared knowledge base so institutional knowledge does not leave with people. I am looking for a marketing manager role at a company where growth is a genuine strategic priority and where I will have meaningful ownership over both strategy and execution.`,
  },
  {
    id: "cand-19",
    name: "Yuki Tanaka",
    email: "yuki.tanaka@email.com",
    appliedJobId: "job-mkt-mgr",
    resume: `Three years of experience in social media and content marketing, currently working as a Social Media Coordinator at Capsule Beauty, a specialty beauty retailer. I manage the brand's presence across Instagram, TikTok, Pinterest, and YouTube, creating and scheduling content, monitoring engagement metrics, and responding to community comments and DMs.

In my role I have grown Capsule's Instagram following from 42,000 to over 180,000 followers over two and a half years, primarily through consistent short-form video content and a series of creator partnership campaigns I helped source and manage. Our average engagement rate on Instagram is 4.7 percent, which our leadership team regards as well above industry benchmarks for our category. I also managed a TikTok account launch that reached 50,000 followers in its first six months.

My content skills are strong — I write copy, shoot and edit short-form video using CapCut and Adobe Premiere, design social graphics in Canva and Figma, and brief external photographers and videographers for larger campaign shoots. I use Later and Sprout Social for scheduling and analytics.

I have not managed a marketing budget beyond small creator payments of a few thousand dollars per month, and I do not have experience running paid media campaigns, managing a team, or developing brand strategy at a planning level. I have participated in one cross-functional campaign meeting as a coordinator, but overall campaign strategy and P&L responsibility are areas where I am looking to grow. I am eager to step into a more senior marketing role and believe my content expertise and organic channel track record are a strong foundation for learning the broader marketing management skill set.`,
  },
  {
    id: "cand-20",
    name: "Amara Osei",
    email: "amara.osei@email.com",
    appliedJobId: "job-mkt-mgr",
    resume: `Career changer with a strong background in education and instructional design, now pursuing a transition into marketing. I spent six years as a high school English teacher in the Atlanta Public Schools system, followed by three years as an Instructional Designer at Coursera where I developed online course content in collaboration with university faculty and subject-matter experts.

My instructional design work at Coursera involved writing learner personas, developing curriculum maps, scripting video lectures, and crafting assessment items — skills that translate meaningfully into audience analysis, content strategy, and message development. I also became the informal social media point of contact for my team, building a small LinkedIn presence for one of our course series that grew to over 8,000 followers through consistent educational content.

I have taken several marketing courses — HubSpot's Content Marketing certification, a Coursera Specialization in Digital Marketing from the University of Illinois, and a paid media fundamentals workshop through General Assembly — and I have applied some of these concepts in a freelance capacity, managing social content for two small local businesses. However, I have not run a paid advertising campaign professionally, managed a marketing budget, led a team, or overseen an integrated marketing campaign from strategy through execution.

My communication skills are exceptional — I write clearly, present confidently, and am adept at translating complex ideas for diverse audiences. I bring a learner's mindset, genuine curiosity about consumer psychology, and the kind of organizational discipline that teaching demands. I am transparent that I am entering marketing from the outside and would benefit from a role with mentorship and a clear path to developing the functional marketing competencies I am still building.`,
  },

  // ─── job-hr-spec ─────────────────────────────────────────────────────────────
  {
    id: "cand-21",
    name: "Rachel Torres",
    email: "rachel.torres@email.com",
    appliedJobId: "job-hr-spec",
    resume: `Seven years of HR generalist experience with a strong track record across full-cycle recruiting, employee relations, benefits administration, and HRIS management. Currently Senior HR Specialist at Veritas Healthcare Solutions, a regional healthcare services company with approximately 2,200 employees. I hold the SHRM Certified Professional (SHRM-CP) credential and a Bachelor of Arts in Human Resources Management from the University of Arizona.

In my current role I manage full-cycle recruiting for clinical and administrative roles — an average of 30 open requisitions at any given time — using a combination of Workday Recruiting, LinkedIn Recruiter, and targeted sourcing. Over the past two years I have reduced average time-to-fill by 18 days through process improvements including structured intake meetings with hiring managers, standardized interview scorecards, and a candidate pipeline database I built in Workday.

I handle all employee relations matters for a population of 600 employees, including performance management support, policy interpretation, leave administration, and investigation support for EEOC and harassment complaints. I have managed fifteen formal workplace investigations over my career and have worked closely with employment counsel on three that carried legal risk.

I administer benefits for my employee population including open enrollment coordination, carrier communications, ADA accommodation requests, and FMLA administration. I am a certified Workday HCM administrator and serve as the primary Workday point of contact for my site, handling configuration requests, report building, and user support. I am also proficient in ADP Workforce Now from a prior role. I thrive in fast-paced environments with high stakeholder expectations and genuinely believe that HR done well is a meaningful strategic advantage for any organization.`,
  },
  {
    id: "cand-22",
    name: "Brendan O'Sullivan",
    email: "brendan.osullivan@email.com",
    appliedJobId: "job-hr-spec",
    resume: `Three years of HR experience in a support and coordination capacity, currently serving as HR Assistant at Lakeside Manufacturing, a mid-size industrial company with approximately 800 employees. I hold a Bachelor of Arts in Business Administration from Marquette University with a concentration in Human Resources.

My primary responsibilities include payroll processing for hourly and salaried employees using ADP Workforce Now, new hire onboarding coordination — scheduling orientation sessions, preparing onboarding packets, entering employee data into the HRIS, and tracking completion of I-9 documentation — and general HR administrative support including maintaining employee files, responding to employment verification requests, and managing HR inbox routing.

I have assisted HR Business Partners with scheduling and note-taking during performance management conversations and once served as an investigative note-taker for a workplace misconduct complaint, though I have not led an investigation myself. I have supported two open enrollment cycles, primarily handling employee questions about benefit options and updating enrollment changes in the system.

My recruiting experience is limited to assisting with job posting coordination and scheduling phone screens; I have not conducted independent sourcing, led interviews, or managed a requisition end-to-end. I am familiar with Workday at a user level from brief experience during a prior internship but am not certified or experienced as an administrator. I am eager to develop into a full HR generalist or specialist role and am actively studying for the SHRM-CP examination. My strengths are reliability, attention to detail, and a genuine interest in doing HR work that supports employees and managers well.`,
  },
];

export function getCandidateById(id: string): MockCandidate | undefined {
  return MOCK_CANDIDATES.find((c) => c.id === id);
}

export function getCandidatesForJob(
  jobId: string,
  allCandidates: MockCandidate[] = MOCK_CANDIDATES
): MockCandidate[] {
  return allCandidates.filter((c) => c.appliedJobId === jobId);
}
