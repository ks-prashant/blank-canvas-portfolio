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
          const { added, deepened } = whatThisLensAdds(activeLens, lens, lensesData);
          return (
            <li key={lens} className="ledger-case-honesty-row">
              <button type="button" className="ledger-case-honesty-switch" onClick={() => onSwitch(lens)}>
                Read this page as {LENS_LABELS[lens]} →
              </button>
              {added.length > 0 || deepened.length > 0 ? (
                <span className="ledger-case-honesty-adds">
                  {added.length > 0 ? <>adds: {added.join(", ")}</> : null}
                  {added.length > 0 && deepened.length > 0 ? " · " : null}
                  {deepened.length > 0 ? <>goes deeper on: {deepened.join(", ")}</> : null}
                </span>
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

/**
 * Distinguishes two genuinely different claims that the old single-list
 * version conflated: a section the active lens doesn't show *at all*
 * (`omit`, a real addition) versus a section both lenses show but the
 * other lens goes deeper on (`short` here, `full` there — already visible,
 * just thinner). Confirmed live: the engineer lens already renders "The
 * problem" / "Discovery" / "The decision" as full headings with prose (at
 * `depth: 'short'`, which still renders a heading and body — see
 * `CaseSections`), so claiming Founder/PM "adds" them was false; it goes
 * deeper on them.
 */
function whatThisLensAdds(
  activeLens: Lens,
  otherLens: Lens,
  lensesData: Record<Lens, LensCopy>,
): { added: string[]; deepened: string[] } {
  const otherSections = lensesData[otherLens].sections ?? [];
  const activeSections = lensesData[activeLens].sections ?? [];
  const activeByKind = new Map(activeSections.map((s) => [s.kind, s.depth]));

  const added: string[] = [];
  const deepened: string[] = [];

  for (const s of otherSections) {
    if (s.depth === "omit") continue;
    const activeDepth = activeByKind.get(s.kind) ?? "omit";
    const label = KIND_LABELS[s.kind] ?? s.kind;
    if (activeDepth === "omit") {
      added.push(label);
    } else if (s.depth === "full" && activeDepth === "short") {
      deepened.push(label);
    }
  }

  return { added, deepened };
}
