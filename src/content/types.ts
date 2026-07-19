// src/content/types.ts
//
// Copied verbatim from BUILD-SPEC.md §7.2. Claude Code writes this once; nothing
// downstream should widen or narrow these shapes without updating the spec first.
// This file has no logic in it — types only.

export type SourceLabel =
  | 'instrumented' // A/B test, measured system metric
  | 'directional' // real but methodologically limited (e.g. single-evaluator eval)
  | 'disclosed-gap'; // a number that fell short of its own bar, or a self-reported estimate, stated anyway

export type Org = 'tophire' | 'nurture-farm' | 'ola' | 'infosys' | 'prashaste' | 'personal';

export type Lens = 'recruiter' | 'operator' | 'engineer'; // operator = Founder / PM

export interface Metric {
  label: string;
  value: string; // "35% → 42%"
  method: string; // "A/B test, 5 jobs, ~400 candidates"
  sourceLabel: SourceLabel;
  caveat?: string; // travels with the number, always
}

// ——— The product-page content pool (§9): one pool per product, three
// compositions over it. This replaces the retired Checkpoint/Trace/TimingStage
// diagram types (2026-07-19).

export type BlockKind = 'fact' | 'decision' | 'mechanism' | 'incident' | 'metric' | 'visual' | 'quote';

export type LensDepth = 'lead' | 'full' | 'brief' | 'omit';

export interface LensTreatment {
  depth: LensDepth;
  variant?: string; // per-lens body override (register changes, not just cuts)
  receipt?: string; // "why this lens shows this" — rendered by LensReceipt (C22)
}

export interface ContentBlock {
  id: string;
  kind: BlockKind;
  body: string; // canonical prose, traceable to the knowledge book
  visual?: string; // component key, e.g. "state-graph", "incident-ledger"
  source: string; // knowledge-book anchor — REQUIRED, no orphan claims
  treatments: Record<Lens, LensTreatment>;
}

export interface ProductEssay {
  slug: 'automjet' | 'grounded-governance';
  artifact: Record<
    Lens,
    {
      genre: 'record' | 'memo' | 'review'; // ArtifactFrame variant (C1)
      order: string[]; // block ids, composition order for this lens
    }
  >;
  blocks: ContentBlock[];
}

export interface Recording {
  label: string; // "Booked test ride" | "Cold lead"
  src?: string; // absent until supplied+consented — renders transcript fallback
  record: Record<string, string>; // the extracted post-call fields shown beneath
  annotations?: { turn: number; node: string; note?: string }[]; // AnnotatedTranscript (C4)
  caveat: string; // REQUIRED — the funnel context lives beside the pair
}

export interface DidntShip {
  what: string;
  why: string;
  number?: string;
}

// The Lens: hand-authored, static, reviewed. No generation metadata — there is
// nothing generated to describe.
export interface LensCopy {
  lens: Lens;
  summary: string; // the block used everywhere a project is summarized
  sections?: CaseSection[]; // case-study pages only — see §8.5
}

export interface CaseSection {
  kind:
    | 'problem'
    | 'discovery'
    | 'decision'
    | 'approach'
    | 'fixOrder'
    | 'metrics'
    | 'guardrail'
    | 'didntShip'
    | 'notUsed'
    | 'eval'
    | 'roadmap';
  depth: 'short' | 'full' | 'omit';
  body: string; // may be empty when depth === 'omit'
}

export interface Project {
  slug: string;
  name: string;
  org: Org;
  confidential: boolean; // ⚠ GATE — see §7.3
  status: string;
  metrics: Metric[];
  essay?: ProductEssay; // the two personal products only (§9)
  recordings?: Recording[]; // Automjet only — the paired listen (§9.2)
  principles: string[];
  didntShip?: DidntShip;
  liveUrl?: string;
  sourceFile: string;
  depth: 'full' | 'short'; // short = one line, no page, no CTA (§7.4)
  signatureVisual?: string; // employer case pages — §8.5
  lenses: Record<Lens, LensCopy>;
}

export interface Principle {
  slug: string;
  num: number;
  group: 'before-i-build' | 'how-i-decide' | 'how-i-ship' | 'what-i-trust';
  title: string;
  body: string;
  evidence: { projectSlug: string; note: string }[];
}
