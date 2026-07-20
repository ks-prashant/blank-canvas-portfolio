import { LENS_LABELS } from "../../content/lens-context";
import type { Lens, LensCopy } from "../../content/types";

const ALL_LENSES: readonly Lens[] = ["recruiter", "operator", "engineer"];

const KIND_LABELS: Record<string, string> = {
  problem: "the problem",
  discovery: "discovery",
  decision: "the decision",
  approach: "the approach",
  fixOrder: "the fix, in order",
  metrics: "the metrics",
  guardrail: "the guardrail",
  didntShip: "the gaps",
  notUsed: "what's not used",
  eval: "eval methodology",
  roadmap: "the roadmap",
};

/**
 * `CaseHonestyFooter` (BUILD-SPEC §8.5's shared page frame, closing
 * element) — "a quiet honesty marker at the foot naming what the other
 * lenses add, linking to a compare-this-page-by-lens affordance." A full
 * `CompareModal` (§8.4) wasn't built for the landing page either — the
 * brief for this step is explicit that the simple version (a "read this
 * page as X/Y instead" link set) is sufficient here, so this reuses that
 * same lighter mechanism rather than building a second, heavier one.
 *
 * "What the other lens adds" is computed, not authored: for each other
 * lens, any section it renders at `depth: 'full'` while the active lens
 * renders it at `short` or doesn't render it at all is named. This stays
 * honest by construction — it can only ever point at differences that
 * genuinely exist in the compiled data, never assert one that doesn't.
 */
export function CaseHonestyFooter({
  activeLens,
  lensesData,
  onSwitch,
}: {
  /** The resolved lens the page is actually composed as right now — never
   * `null` (see this component's caller for the un-lensed-default →
   * resolved-lens rule, same convention as `composeArtifact`'s
   * `DEFAULT_PRODUCT_LENS`). */
  activeLens: Lens;
  lensesData: Record<Lens, LensCopy>;
  onSwitch: (lens: Lens) => void;
}) {
  const otherLenses = ALL_LENSES.filter((l) => l !== activeLens);

  return (
    <footer className="ledger-case-honesty-footer">
      <p className="ledger-case-honesty-lead">
        You're reading this as {LENS_LABELS[activeLens]}. Here's what the other two lenses add:
      </p>
      <ul className="ledger-case-honesty-list">
        {otherLenses.map((lens) => {
          const additions = whatThisLensAdds(activeLens, lens, lensesData);
          return (
            <li key={lens} className="ledger-case-honesty-row">
              <button type="button" className="ledger-case-honesty-switch" onClick={() => onSwitch(lens)}>
                Read this page as {LENS_LABELS[lens]} →
              </button>
              {additions.length > 0 ? (
                <span className="ledger-case-honesty-adds">adds: {additions.join(", ")}</span>
              ) : (
                <span className="ledger-case-honesty-adds">a different argument over the same sections</span>
              )}
            </li>
          );
        })}
      </ul>
    </footer>
  );
}

function whatThisLensAdds(activeLens: Lens, otherLens: Lens, lensesData: Record<Lens, LensCopy>): string[] {
  const otherSections = lensesData[otherLens].sections ?? [];
  const activeSections = lensesData[activeLens].sections ?? [];
  const activeByKind = new Map(activeSections.map((s) => [s.kind, s.depth]));

  return otherSections
    .filter((s) => s.depth === "full")
    .filter((s) => {
      const activeDepth = activeByKind.get(s.kind);
      return activeDepth !== "full";
    })
    .map((s) => KIND_LABELS[s.kind] ?? s.kind);
}
