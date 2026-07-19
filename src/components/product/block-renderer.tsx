import type { ReactNode } from "react";

import { Prose } from "../../components/prose";
import { LensReceipt } from "../lens/lens-receipt";
import type { ComposedBlock } from "../../content/product-essay";
import type { ContentBlock, Metric } from "../../content/types";
import {
  CorpusBar,
  GoldenSetSplit,
  LatencyBars,
  PhaseGateRail,
  PipelineDiagram,
  RiskRequirementLedger,
} from "./block-visuals";
import { EvalScore } from "./eval-score";
import { IncidentLedger } from "./incident-ledger";

/**
 * `BlockRenderer` (C2, BUILD-SPEC §6/§9.1) — renders a composed, per-lens
 * content pool (`ComposedBlock[]` from `composeArtifact`, §7 content
 * architecture) into the actual DOM. Consecutive `incident` blocks are
 * collected into one `IncidentLedger` (C6) table, matching §9.3's "five
 * ruled rows" — the content pool authors five separate blocks so each can
 * carry its own per-lens `treatment`/`receipt`/deep-link id, but they
 * render as one semantic table, not five.
 *
 * Reusable by Automjet: nothing here reads Grounded-Governance-specific
 * fields except the `visual` key dispatch table below, which already
 * falls back to plain prose for any key it doesn't recognize (e.g. C5
 * `state-graph` or C4 `annotated-transcript`, both Automjet-only) rather
 * than throwing — see this step's handoff note for what Automjet's pass
 * needs to add here.
 */

// Short section headings, one per known block id — `ContentBlock` (§7.2)
// has no `title` field, only `body` prose, so these are hand-authored
// labels for heading hierarchy (§9.5), not new facts. Unmapped ids
// (Automjet's blocks, or any future gg id) fall back to a kind-based
// generic label rather than crash.
const BLOCK_HEADINGS: Record<string, string> = {
  "gg-01": "What it is",
  "gg-03": "The commodity problem",
  "gg-04": "Risk becomes requirement",
  "gg-05": "Sequencing as risk management",
  "gg-06": "The corpus",
  "gg-07": "Parent–child chunking",
  "gg-08": "The retrieval pipeline",
  "gg-09": "The citation-validation fence",
  "gg-10": "Forced tool-use vs. extended thinking",
  "gg-11": "Latency: assumed vs. measured",
  "gg-12": "The eval story",
  "gg-14": "What's still deferred",
  "gg-15": "The Article 99 story",
  "gg-21": "The eval budget",
  "gg-22": "The golden set",
  "gg-24": "One user, chosen on purpose",
};

const KIND_FALLBACK_HEADING: Record<ContentBlock["kind"], string> = {
  fact: "",
  decision: "Decision",
  mechanism: "Mechanism",
  incident: "Incident",
  metric: "Metric",
  visual: "",
  quote: "",
};

function headingFor(block: ContentBlock, decisionNumber?: number): string | null {
  const mapped = BLOCK_HEADINGS[block.id];
  if (mapped) return mapped;
  if (block.kind === "decision" && decisionNumber) return `Decision ${decisionNumber}`;
  const fallback = KIND_FALLBACK_HEADING[block.kind];
  return fallback || null;
}

function VisualFor({ block, metrics }: { block: ContentBlock; metrics: Metric[] }) {
  switch (block.visual) {
    case "eval-score": {
      const evalMetrics = metrics.filter((m) =>
        ["Retrieval gate (GDPR slice)", "Groundedness (first full run)", "Correct-refusal (first full run)", "Citation accuracy (first full run)"].includes(
          m.label,
        ),
      );
      return <EvalScore metrics={evalMetrics} />;
    }
    case "risk-requirement-ledger":
      return <RiskRequirementLedger />;
    case "phase-gate-rail":
      return <PhaseGateRail />;
    case "corpus-bar":
      return <CorpusBar metrics={metrics} />;
    case "pipeline-diagram":
      return <PipelineDiagram />;
    case "latency-bars":
      return <LatencyBars />;
    case "golden-set-split":
      return <GoldenSetSplit />;
    default:
      // Unrecognized/unimplemented visual key (e.g. `obligation-map`,
      // never actually composed for Grounded Governance today since gg-02
      // /gg-23 don't appear in any lens's `order` array — or a future
      // Automjet-only key). No visual renders; the block's prose still
      // does, so nothing is silently dropped.
      return null;
  }
}

function BlockSection({
  block,
  slug,
  receipt,
  bodyOverride,
  decisionNumber,
  metrics,
}: {
  block: ContentBlock;
  slug: string;
  receipt?: string;
  bodyOverride?: string;
  decisionNumber?: number;
  metrics: Metric[];
}) {
  const heading = headingFor(block, decisionNumber);
  const body = bodyOverride ?? block.body;

  return (
    <section
      className={`ledger-block ledger-block--${block.kind}`}
      id={`${slug}-${block.id}`}
      key={block.id}
    >
      {heading ? <h3 className="ledger-block-heading">{heading}</h3> : null}
      <p className="ledger-block-body">
        <Prose text={body} />
      </p>
      <VisualFor block={block} metrics={metrics} />
      {receipt ? <LensReceipt>{receipt}</LensReceipt> : null}
    </section>
  );
}

export function BlockRenderer({
  composed,
  slug,
  metrics,
}: {
  composed: ComposedBlock[];
  slug: string;
  metrics: Metric[];
}) {
  const elements: ReactNode[] = [];
  let decisionCounter = 0;
  let i = 0;

  while (i < composed.length) {
    const { block, treatment } = composed[i];

    if (block.kind === "incident") {
      const group: ContentBlock[] = [];
      let j = i;
      while (j < composed.length && composed[j].block.kind === "incident") {
        group.push(composed[j].block);
        j += 1;
      }
      elements.push(
        <section
          className="ledger-block ledger-block--incident"
          id={`${slug}-${group[0].id}`}
          key={group[0].id}
        >
          <h3 className="ledger-block-heading">Incident log</h3>
          <IncidentLedger incidents={group} />
        </section>,
      );
      i = j;
      continue;
    }

    if (block.kind === "decision") decisionCounter += 1;

    elements.push(
      <BlockSection
        block={block}
        slug={slug}
        receipt={treatment.receipt}
        bodyOverride={treatment.variant}
        decisionNumber={block.kind === "decision" ? decisionCounter : undefined}
        metrics={metrics}
        key={block.id}
      />,
    );
    i += 1;
  }

  return <>{elements}</>;
}
