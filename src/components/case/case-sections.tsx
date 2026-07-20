import { Prose } from "../../components/prose";
import { LensReceipt } from "../lens/lens-receipt";
import { UnlensedMark } from "../lens/unlensed-mark";
import { EvalScore } from "../product/eval-score";
import type { CaseSection, Metric } from "../../content/types";

/**
 * `CaseSections` (BUILD-SPEC §8.5's shared page frame, fourth element) —
 * renders whatever `CaseSection[]` the compiled data actually has for the
 * active lens, in the canonical reading order below, skipping anything
 * at `depth === 'omit'`. Which sections exist and at what depth is
 * entirely data-driven (already baked into `projects.ts` by the Step 3
 * pipeline) — this component does not hardcode §8.5's depth table as
 * logic, only the section *order*, since `CaseSection.kind`'s declared
 * union order in `types.ts` already matches §8.5's table top-to-bottom
 * and there's no reason to invent a second ordering.
 */
const SECTION_ORDER: CaseSection["kind"][] = [
  "problem",
  "discovery",
  "decision",
  "approach",
  "fixOrder",
  "metrics",
  "guardrail",
  "didntShip",
  "notUsed",
  "eval",
  "roadmap",
];

const SECTION_LABELS: Record<CaseSection["kind"], string> = {
  problem: "The problem",
  discovery: "Discovery",
  decision: "The decision",
  approach: "Approach",
  fixOrder: "Fix, in order",
  metrics: "Metrics",
  guardrail: "Guardrail",
  didntShip: "Didn't ship / gaps",
  notUsed: "Not used",
  eval: "Eval methodology",
  roadmap: "Roadmap",
};

// The "why this lens shows this" reason has two independent parts: what
// this *kind* of section is for (constant across lenses), and how much
// of it this lens gets (its `depth`). Combining the two gives an honest,
// non-invented receipt without needing a per-lens `receipt` field that
// `CaseSection` (§7.2) deliberately doesn't have — case-page depth is the
// mechanism, and the receipt just narrates that mechanism, same content
// layer boundary as everywhere else on this page.
const KIND_REASON: Record<CaseSection["kind"], string> = {
  problem: "what the reader needs before anything else",
  discovery: "how the problem was actually found, not just stated",
  decision: "the fork that was chosen, and why",
  approach: "how it actually works",
  fixOrder: "the order fixes were applied, ranked by impact",
  metrics: "the numbers, with as much method as this lens needs to trust them",
  guardrail: "the safeguard that kept a win from hiding a regression",
  didntShip: "what didn't make it, and why",
  notUsed: "what was deliberately left out",
  eval: "how success was actually measured",
  roadmap: "what's still ahead",
};

const DEPTH_PHRASE: Record<"short" | "full", string> = {
  full: "This lens gets it in full",
  short: "This lens gets the short version",
};

function receiptFor(kind: CaseSection["kind"], depth: "short" | "full"): string {
  return `${DEPTH_PHRASE[depth]} — ${KIND_REASON[kind]}.`;
}

export function CaseSections({
  sections,
  metrics,
}: {
  sections: CaseSection[];
  metrics: Metric[];
}) {
  const bySlug = new Map(sections.map((s) => [s.kind, s]));
  const visible = SECTION_ORDER.map((kind) => bySlug.get(kind)).filter(
    (s): s is CaseSection => Boolean(s) && s!.depth !== "omit",
  );

  if (visible.length === 0) {
    return (
      <p className="ledger-case-section-empty">
        This lens has nothing further to add beyond the summary above — that's stated plainly rather than
        padded out.
      </p>
    );
  }

  return (
    <div className="ledger-case-sections">
      {visible.map((section) => (
        <section className="ledger-case-section" key={section.kind} id={`section-${section.kind}`}>
          <h2 className="ledger-case-section-heading">{SECTION_LABELS[section.kind]}</h2>
          <p className="ledger-case-section-body">
            <Prose text={section.body} />
          </p>
          {section.kind === "metrics" ? (
            <div className="ledger-case-metrics-table">
              <EvalScore metrics={metrics} />
              <UnlensedMark />
            </div>
          ) : null}
          <LensReceipt>{receiptFor(section.kind, section.depth as "short" | "full")}</LensReceipt>
        </section>
      ))}
    </div>
  );
}
