// Hand-sourced structural/UI copy for the lens picker and hero, NOT emitted
// by scripts/build-content.ts.
//
// Gap #1 — the un-lensed hero copy: content/lens-copy.md BLOCK 00 has a
// reviewed "00 · Unlensed" paragraph, but src/content/lenses.ts's compiled
// `heroCopy` only carries the three named-lens keys (recruiter/operator/
// engineer) — the compiler never emitted an "unlensed" entry. Per this
// step's instructions ("do NOT modify the compiler; hand-source small gaps
// or flag them"), the paragraph below is quoted verbatim from that
// reviewed markdown block rather than re-derived or invented — it is
// traceable to `content/lens-copy.md`, just not routed through the
// compiled module. Flagged in the Step 5 report.
//
// Gap #2 — the lens picker's own structural labels (their decision /
// currency of proof / one-line argument): these come from BUILD-SPEC.md
// §4.1's table, which is UI/structural copy about the mechanism itself,
// not personal-history content — the brief explicitly sanctions sourcing
// these directly from the spec table.

import type { Lens } from "./types";

export const unlensedHeroCopy =
  "AI Product Manager and Builder. Nine years across fintech, HR tech, marketplaces, mobility and regulated banking. Most recently I owned the full AI product suite at a recruitment platform. Outside of any job, I've built two AI products solo and they're both running right now: a voice agent taking real sales calls for a dealership, and a governance research assistant that refuses to answer what its sources don't cover.";

export const unlensedHeroSubline =
  "I don't know why you're here yet, so this is the plain version. One question below and the rest of the site will read the way you need it to.";

export interface LensPickerEntry {
  lens: Lens;
  label: string;
  theirDecision: string;
  currencyOfProof: string;
  argument: string;
}

export const lensPickerCopy: LensPickerEntry[] = [
  {
    lens: "recruiter",
    label: "Recruiter",
    theirDecision: "Clear the bar? Any reason to reject?",
    currencyOfProof: "Evidence strength — the credibility of a number, not its size",
    argument:
      "Every claim here is tagged with how it was measured — including the ones that fell short.",
  },
  {
    lens: "operator",
    label: "Founder / PM",
    theirDecision: "Can this person make calls unsupervised, on limited money and time?",
    currencyOfProof: "Decisions where something was given up",
    argument: "Nine years of decisions, with the costs kept on the books.",
  },
  {
    lens: "engineer",
    label: "Engineer",
    theirDecision: "Can this PM reason about systems, or just narrate them?",
    currencyOfProof: "Specificity + admitted limits",
    argument: "Instructions drift. Structures hold. Here are the structures.",
  },
];

/**
 * Short "why you're seeing this" receipts for the hero sub-copy (`LensReceipt`,
 * C22). No compiled field carries this — it's one sentence about the
 * mechanism itself (why this lens foregrounds what it does), hand-sourced
 * per the same Gap #2 rationale above, not a personal-history fact.
 */
export const heroReceipts: Record<Lens, string> = {
  recruiter:
    "Reading as Recruiter: outcomes and evidence strength lead; decisions and architecture are trimmed to what's needed to trust the number.",
  operator:
    "Reading as Founder/PM: the decisions and their costs lead — the richest source material of the three, since nine years of product decisions is what there's the most of to draw on.",
  engineer:
    "Reading as Engineer: mechanism and admitted limits lead; business framing is held to one line, per the engineer lens's own rule.",
};
