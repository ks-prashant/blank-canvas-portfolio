import type { ReactNode } from "react";

import { GrainOverlay } from "./grain-overlay";

/**
 * Bare page shell for The Ledger design system (BUILD-SPEC §5.4).
 *
 * Provides: the paper background + ink text + Archivo body font, the
 * asymmetric grid (a narrow left margin column reserved for running
 * annotations, content never centered), and the grain overlay mounted
 * once. Does NOT include nav, lens picker, or any content-bearing
 * component — those are later build steps.
 *
 * `marginContent` is optional running-annotation content for the left
 * margin column (BUILD-SPEC's "working annotation zone"); omit it and
 * the column stays empty but still reserves its width above 860px.
 */
export function LedgerShell({
  children,
  marginContent,
}: {
  children: ReactNode;
  marginContent?: ReactNode;
}) {
  return (
    <div className="ledger-site">
      <GrainOverlay />
      <div className="ledger-grid">
        <div className="ledger-margin-col">{marginContent}</div>
        <div className="ledger-content-col">{children}</div>
      </div>
    </div>
  );
}
