import { Prose } from "../../components/prose";
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

// Task #4 (receipt demotion): the per-section "why you're seeing this"
// receipt was removed here. A case page renders up to ~11 sections, so one
// receipt per section read as pure repetition — and it was redundant with
// the `CaseHonestyFooter` at the foot of every case page, which already
// states the page-level "here's what the other lenses add." The depth
// mechanism is still visible (sections appear/disappear/re-depth by lens);
// it just no longer narrates itself on every single section.

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
        This lens has nothing further to add beyond the summary above — that's stated plainly rather
        than padded out.
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
        </section>
      ))}
    </div>
  );
}
