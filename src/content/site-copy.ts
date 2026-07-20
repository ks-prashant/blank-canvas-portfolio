// Hand-authored, NOT auto-generated — unlike src/content/{projects,principles,
// metrics,lenses}.ts, there is no `scripts/build-content.ts` pipeline stage
// for career-timeline / FAQ / contact content (BUILD-SPEC.md §7.2's types
// only cover Project/Principle/Metric/LensCopy). Per the Step 4 build
// instructions, this is sourced directly from `knowledge-book/02-career-
// timeline.md`, `knowledge-book/01-identity.md`, and `knowledge-book/06-
// positioning.md`, re-worded but never inventing a fact not in those files.
//
// FLAGGED GAP for future pipeline extension: journey/FAQ/contact should
// eventually get their own typed source + compiler step, the same way
// projects/principles/metrics do. Until then, edit this file directly and
// keep it traceable to the knowledge-book anchors in each entry's comment.

export interface JourneyRole {
  company: string;
  title: string; // role + date range
  body: string;
  numbers: string[];
  source: string;
}

export interface JourneyPhase {
  phase: string; // "Phase 1"
  heading: string;
  years: string;
  roles: JourneyRole[];
}

// knowledge-book/02-career-timeline.md, knowledge-book/01-identity.md §"Career shape"
export const journey: JourneyPhase[] = [
  {
    phase: "Phase 1",
    heading: "Analytics and problem decomposition",
    years: "2016–2021",
    roles: [
      {
        company: "Infosys",
        title: "Business Analyst · 05/2016–10/2017",
        body: "Anti-money-laundering workflows for a UK bank client — the first classification system he built with a stated accuracy figure, in a domain where compliance mattered more than speed.",
        numbers: ["10,000+ transactions/mo flagged", "~40% accuracy", "top 1% of 600+ trainees"],
        source: "02-career-timeline.md §Infosys",
      },
      {
        company: "Prashaste",
        title: "Associate Consultant · 11/2017–01/2019",
        body: "Consulting for auto dealerships of Fortune 500 automakers — a broad tooling rollout, plus six deep engagements where he implemented the changes himself rather than only handing over a report.",
        numbers: ["200+ dealerships", "25+ training sessions", "+6pp monthly PAT lift"],
        source: "02-career-timeline.md §Prashaste",
      },
      {
        company: "Ola",
        title: "Product Analyst · 04/2019–04/2021",
        body: "His one classical machine-learning project: a decision-tree model on driver behavior to predict fares upfront, plus an end-to-end simulation of the billing workflow to coordinate compliance fixes.",
        numbers: ["$200k/yr disputes cut", "−40% complaints", "91%→99% bill accuracy"],
        source: "02-career-timeline.md §Ola",
      },
    ],
  },
  {
    phase: "Phase 2",
    heading: "Payments and monetization ownership",
    years: "2021–2022",
    roles: [
      {
        company: "nurture.farm",
        title: "Product Manager (promoted from APM) · 05/2021–11/2022",
        body: "Owned the payments and monetization roadmap for an MSME marketplace under UPL — regulated fintech for real: an NBFC lending partnership, embedded KYC, RBI-compliant payouts, and cashback loops.",
        numbers: ["MTU 4k→8k", "6,000+ retailers on credit", "$1M+/mo in points"],
        source: "02-career-timeline.md §nurture.farm",
      },
    ],
  },
  {
    phase: "Phase 3",
    heading: "Generative and agentic AI ownership",
    years: "2023–2026",
    roles: [
      {
        company: "TopHire",
        title: "Product Manager · reported to the CEO · 04/2023–05/2026",
        body: "Owned the entire B2B AI product suite. Shipped four AI products, each chosen by where recruiter time was going next. The product org contracted the whole time he was there — 2 PMs and 7–8 engineers when he joined, down to him as the solo PM with 3–4 engineers by the end.",
        numbers: ["+140% recruiter productivity", "~25% faster time-to-hire", "$100k/yr saved"],
        source: "02-career-timeline.md §TopHire; 01-identity.md §\"Why he left TopHire\"",
      },
    ],
  },
  {
    phase: "Alongside",
    heading: "Built solo, outside any employer",
    years: "2025–now",
    roles: [
      {
        company: "Automjet + Grounded Governance",
        title: "Voice AI and governance research assistant · both live",
        body: "Automjet for a friend's real Ather dealership in Thane, alongside employment. Grounded Governance, a source-grounded AI-governance assistant, built during the post-TopHire break with Claude Code + Lovable.",
        numbers: ["~500 calls/mo (Automjet)", "5 frameworks, 630 parents (Grounded Governance)", "Both live in production"],
        source: "02-career-timeline.md §\"Solo builds — outside employment\"",
      },
    ],
  },
];

export const throughline = {
  label: "Why the fintech years matter for AI work",
  // knowledge-book/06-positioning.md §"Core identity", §"The arc, as a story"
  body: "Before AI, two years were spent shipping products where being wrong cost real money — RBI-compliant payouts, embedded KYC, lending to 6,000+ retailers on nurture.farm's marketplace. That's a genuine differentiator for AI-product roles that touch money, compliance, or high-stakes automation: most AI PMs haven't shipped an RBI-compliant, NBFC-partnered lending product. It's also where the habit comes from — deterministic outcomes over inferred guesses, and evidence that carries its own caveat rather than getting rounded up.",
};

// knowledge-book/02-career-timeline.md §"Education & certification"
export const education = [
  {
    kind: "Education",
    value: "B.Tech, Metallurgical Engineering — NIT Jamshedpur",
    years: "2012 – 2016",
  },
  {
    kind: "Certification",
    value: "Product Management & Applications of AI / Gen AI — ISB Hyderabad",
    years: "2024 – 2025",
  },
];

export interface FaqItem {
  question: string;
  answer: string[]; // paragraphs
  tradeoff?: { buys: string; costs: string };
  source: string;
}

// Sourced from knowledge-book/01-identity.md and 02-career-timeline.md.
// Re-worded from those files' framing, no invented facts.
export const faq: FaqItem[] = [
  {
    question: "What are you looking for next?",
    answer: [
      "Deliberately kept open — target role and level, company stage, domain, location and remote stance are all things he'd rather discuss directly, case by case, than pre-filter here.",
    ],
    source: "01-identity.md §\"Current status\"",
  },
  {
    question: "Why did you leave TopHire?",
    answer: [
      "Structural, not a grievance. The product org went from 2 PMs and 7–8 engineers when he joined to him alone with 3–4 engineers by the end of his three years there. A shrinking org caps what a PM inside it can take on — the four AI products and the +140% productivity figure all came out of that same contracting period, which if anything makes them more notable, not less.",
    ],
    source: "01-identity.md §\"Why he left TopHire\"",
  },
  {
    question: "Why leave without another offer lined up?",
    answer: [
      "He couldn't run a serious interview process as the solo PM on a contracting team, so he sequenced it deliberately instead of trying to overlap the two: leave, spend the break building and learning hands-on, then interview.",
    ],
    tradeoff: {
      buys: "Full attention on the search. Two live products built during the break (Automjet, Grounded Governance).",
      costs: "No income during the gap. Answering this question on most first calls.",
    },
    source: "01-identity.md §\"Why he left without another offer already in hand\"",
  },
  {
    question: "Why not Senior PM after this many years?",
    answer: [
      "About 9.5 years of total experience, of which roughly 5 were specifically in a Product Manager title (nurture.farm and TopHire) — the earlier years were analyst and consulting roles that built the foundation. His title has been Product Manager throughout, never \"Senior\" — stating that plainly beats inflating a title that isn't on the record.",
    ],
    source: "01-identity.md §\"Current status\"; 06-positioning.md §\"Key facts to hold precisely\"",
  },
  {
    question: "Can I see the code or prompts from the TopHire products?",
    answer: [
      "No — those are internal TopHire builds and the production prompts are TopHire's IP, not his to publish. He'll describe the technique in as much depth as anyone wants; the artifact itself doesn't get pasted. Automjet and Grounded Governance are the two products where architecture, build documents, and records are fully his to share — that asymmetry is why this site's centrepiece is built on them.",
    ],
    source: "BUILD-SPEC.md §7.3",
  },
  {
    question: "What's the gap in 2022–23?",
    answer: [
      "About five months between nurture.farm and TopHire spent studying for the CAT and GMAT as a possible MBA route. Sat the CAT in December 2022, scored the 98.02 percentile, didn't sit the GMAT, and joined TopHire instead.",
    ],
    source: "02-career-timeline.md §\"Gap — CAT/GMAT exam preparation\"",
  },
  {
    question: "Where are you based?",
    answer: ["Bengaluru. Open to discussing location and remote arrangements case by case."],
    source: "01-identity.md §\"Location, interests\"",
  },
];

// knowledge-book/01-identity.md §"Contact", §"Current status"
export const contact = {
  line: "Between roles, actively talking to people. If this is relevant to something you're building, I'd like to hear from you.",
  email: "prashant.dpsrkp@gmail.com",
  linkedinLabel: "LinkedIn",
  linkedinUrl: "https://linkedin.com/in/prashantaspx",
};

// Constant identity, shown in the hero masthead and the contact block (and
// reused by the interior-page header). Name + role are the site's answer to
// the recruiter's first 30-second question ("who is this, what do they do");
// the role line is the unlensed self-description already used in the hero
// copy, kept constant across lenses. Asset paths are the copies placed in
// public/. knowledge-book/01-identity.md §"Core identity", §"Location".
export const profile = {
  name: "Prashant Singh",
  role: "AI Product Manager & Builder",
  location: "Bengaluru",
  avatarUrl: "/prashant-singh.jpg",
  resumeUrl: "/prashant-singh-resume.pdf",
};
