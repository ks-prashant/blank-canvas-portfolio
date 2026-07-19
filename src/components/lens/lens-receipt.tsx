/**
 * `LensReceipt` (C22, BUILD-SPEC §6/§8.6) — the "why you're seeing this"
 * margin mark on a lens-adapted block. A native `<details>/<summary>` so
 * it's keyboard-operable and works with no JS or CSS at all (it just
 * becomes a plain expandable disclosure), matching the rest of the site's
 * "no framework, semantic HTML" rule (§9.4, applied generally here too).
 */
import { Prose } from "../../components/prose";

export function LensReceipt({ children }: { children: string }) {
  return (
    <details className="ledger-lens-receipt">
      <summary className="ledger-lens-receipt-summary">Why you're seeing this</summary>
      <p className="ledger-lens-receipt-body">
        <Prose text={children} />
      </p>
    </details>
  );
}
