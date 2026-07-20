import { Prose } from "../../components/prose";
import { LENS_LABELS } from "../../content/lens-context";
import { LensReceipt } from "../lens/lens-receipt";
import type { Lens, LensCopy } from "../../content/types";

/**
 * Lens-specific `SummaryBlock` (BUILD-SPEC §8.5's shared page frame,
 * second element) — `Project.lenses[lens].summary`, the same field used
 * everywhere a project is summarized elsewhere on the site (§7.2).
 *
 * Carries a `LensReceipt` since the summary itself is a different
 * argument per lens (§8.6's "per-lens argument" mechanism), not a
 * trimmed slice of one canonical paragraph.
 */
export function CaseSummary({ lens, copy }: { lens: Lens; copy: LensCopy }) {
  return (
    <div className="ledger-case-summary">
      <p className="ledger-case-summary-body">
        <Prose text={copy.summary} />
      </p>
      <LensReceipt>
        {`Written for the ${LENS_LABELS[lens]} lens specifically — its own argument, not a shortened cut of one shared paragraph.`}
      </LensReceipt>
    </div>
  );
}
