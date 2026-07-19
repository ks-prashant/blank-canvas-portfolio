import type { Metric } from "../../content/types";

/**
 * Small, static, semantic-HTML visual renderers keyed off `ContentBlock
 * .visual` (§7.2, §9.4: "no canvas, no diagram library" — every visual is
 * structured DOM content). `BlockRenderer` (C2) dispatches to these by
 * name; unknown/future visual keys fall back to plain prose in
 * `block-renderer.tsx` rather than crashing, so Automjet's later pass can
 * add its own keys (`state-graph`, `annotated-transcript`, …) without
 * touching this file.
 *
 * DATA GAP, flagged for the report: none of these five visuals have
 * structured fields in the compiled content pool (`ContentBlock` carries
 * one prose `body`, §7.2) — the rows/steps below are hand-derived
 * directly from each block's own already-sourced `body` text (see the
 * inline citation on each), not invented facts. Where the source has no
 * numeric breakdown (`golden-set-split`), the render stays qualitative
 * rather than fabricate a split. A future pipeline revision could carry
 * this structure in `projects.ts` itself.
 */

/** gg-04's risk → requirement pairs (BUILD-SPEC §9.3's "risk-requirement-ledger"). */
export function RiskRequirementLedger() {
  const rows = [
    {
      risk: "Liability — a user acting on a wrong answer",
      requirement:
        "Never a verdict; decision-support framing at the point of answer; conflicts surfaced, not resolved; out-of-corpus refused.",
    },
    {
      risk: "Staleness",
      requirement: "Every retrieved unit carries a version and snapshot date.",
    },
    {
      risk: "Scope creep",
      requirement: "The out-of-scope list is binding.",
    },
  ];
  return (
    <div className="ledger-risk-ledger-wrap">
      <table className="ledger-risk-ledger">
        <caption className="sr-only">Risk to requirement ledger</caption>
        <thead>
          <tr>
            <th scope="col">Risk</th>
            <th scope="col">Becomes the requirement</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.risk}>
              <td>{row.risk}</td>
              <td>{row.requirement}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** gg-05 + gg-14's sequencing, as a phase-gate rail — current state marked honestly. */
export function PhaseGateRail() {
  const stages = [
    { label: "Prove groundedness on GDPR alone", status: "done" as const, note: "Retrieval gate 7/7" },
    { label: "Build the other four frameworks + the full app", status: "done" as const },
    {
      label: "First full eval run (interim generation config)",
      status: "done" as const,
      note: "Failed 2 of 3 targets — six fixes applied",
    },
    {
      label: "Comprehensive 64-item re-run + formal 24-item Phase D gate",
      status: "current" as const,
      note: "Deliberately deferred to launch",
    },
    { label: "Launch", status: "pending" as const },
  ];
  return (
    <ol className="ledger-phase-rail">
      {stages.map((stage) => (
        <li className={`ledger-phase-step is-${stage.status}`} key={stage.label}>
          <span className="ledger-phase-status" aria-hidden>
            {stage.status === "done" ? "✓" : stage.status === "current" ? "→" : "·"}
          </span>
          <span className="ledger-phase-label">
            {stage.label}
            <span className="sr-only"> — {stage.status}</span>
          </span>
          {stage.note ? <span className="ledger-phase-note">{stage.note}</span> : null}
        </li>
      ))}
    </ol>
  );
}

/** gg-06's corpus stat: total + the five frameworks/dimensions named in the source. */
export function CorpusBar({ metrics }: { metrics: Metric[] }) {
  const corpus = metrics.find((m) => m.label === "Corpus");
  const frameworks = [
    { name: "GDPR", dimension: "privacy" },
    { name: "EU AI Act", dimension: "AI regulation" },
    { name: "NIST AI RMF", dimension: "AI risk" },
    { name: "CSF 2.0", dimension: "cybersecurity" },
    { name: "SSDF", dimension: "secure development" },
  ];
  return (
    <div className="ledger-corpus-bar">
      {corpus ? <p className="ledger-corpus-total tabular">{corpus.value}</p> : null}
      <ul className="ledger-corpus-frameworks">
        {frameworks.map((f) => (
          <li key={f.name}>
            <span className="ledger-corpus-fw-name">{f.name}</span>
            <span className="ledger-corpus-fw-dim">{f.dimension}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** gg-08/gg-09's pipeline, as an ordered list with CSS-drawn connectors (§9.4). */
export function PipelineDiagram() {
  const steps = [
    { label: "Understand", detail: "Haiku: input type, sufficiency, subqueries" },
    {
      label: "Hybrid retrieval",
      detail: "pgvector dense + Postgres FTS keyword, RRF fusion, citation-pinning for named units",
    },
    { label: "Rerank", detail: "" },
    { label: "Parent expansion", detail: "" },
    { label: "Generation", detail: "structured output, grounding fence" },
    {
      label: "Citation-validation fence",
      detail: "post-generation entailment check — unsupported claims dropped or flagged",
      isFence: true,
    },
    { label: "Assembly", detail: "" },
    { label: "SSE streaming", detail: "first tier first" },
  ];
  return (
    <ol className="ledger-pipeline">
      {steps.map((step) => (
        <li className={`ledger-pipeline-step${step.isFence ? " is-fence" : ""}`} key={step.label}>
          <span className="ledger-pipeline-step-label">
            {step.label}
            {step.isFence ? <span className="ledger-pipeline-fence-tag">THE FENCE</span> : null}
          </span>
          {step.detail ? <span className="ledger-pipeline-step-detail">{step.detail}</span> : null}
        </li>
      ))}
    </ol>
  );
}

/** gg-11's assumed-vs-measured latency, against the 5s first-tier budget. */
export function LatencyBars() {
  const budget = 5.0;
  const measuredLow = 4.2;
  const measuredHigh = 5.3;
  const max = 6.0;
  return (
    <div className="ledger-latency-bars">
      <div className="ledger-latency-row">
        <span className="ledger-latency-label">Assumed first-tier budget</span>
        <span className="ledger-latency-track">
          <span className="ledger-latency-fill" style={{ width: `${(budget / max) * 100}%` }} />
        </span>
        <span className="ledger-latency-value tabular">{budget.toFixed(1)}s</span>
      </div>
      <div className="ledger-latency-row is-measured">
        <span className="ledger-latency-label">Measured (understanding + retrieval only)</span>
        <span className="ledger-latency-track">
          <span
            className="ledger-latency-fill is-over"
            style={{ width: `${(measuredHigh / max) * 100}%` }}
          />
        </span>
        <span className="ledger-latency-value tabular">
          {measuredLow}–{measuredHigh}s
        </span>
      </div>
    </div>
  );
}

/** gg-22's golden-set composition — qualitative, since the source names the
 * four categories but doesn't give a numeric split (no split is invented). */
export function GoldenSetSplit() {
  const categories = [
    { name: "Cross-framework synthesis", weight: "weighted toward" },
    { name: "Out-of-corpus (should refuse)", weight: "weighted toward" },
    { name: "Adversarial (baits an unsupported answer)", weight: "weighted toward" },
    { name: "Direct lookup", weight: "baseline" },
  ];
  return (
    <ul className="ledger-golden-set">
      {categories.map((c) => (
        <li key={c.name} className={c.weight === "baseline" ? "is-baseline" : "is-weighted"}>
          <span className="ledger-golden-set-name">{c.name}</span>
          <span className="ledger-golden-set-weight">{c.weight}</span>
        </li>
      ))}
    </ul>
  );
}
