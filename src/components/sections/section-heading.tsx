import type { ReactNode } from "react";

/**
 * C21 `SectionLabel` (BUILD-SPEC §6) plus the h2/dek pair every landing
 * section opens with — the mono eyebrow + ink dot, a serif h2, and a
 * one-sentence deck. Ported structure/classes from prototype/index.html's
 * `<p class="label">`/`<h2 class="h">`/`<p class="dek">` trio (§11.1: kept
 * verbatim, content re-sourced).
 */
export function SectionHeading({
  eyebrow,
  heading,
  dek,
}: {
  eyebrow: string;
  heading: string;
  dek?: ReactNode;
}) {
  return (
    <>
      <p className="ledger-eyebrow">
        <span className="ledger-eyebrow-dot" />
        {eyebrow}
      </p>
      <h2 className="ledger-section-heading">{heading}</h2>
      {dek ? <p className="ledger-section-dek">{dek}</p> : null}
    </>
  );
}

/** The per-section two-column grid: a narrow margin-annotation column
 * plus the main content column, repeated per `<section>` (BUILD-SPEC
 * §5.4's asymmetric grid, applied at section scope — see landing-
 * sections.css's `.ledger-section-grid` comment for why this isn't
 * reusing LedgerShell's page-level grid directly). */
export function SectionGrid({
  marginNote,
  marginNoteCost,
  children,
}: {
  marginNote?: ReactNode;
  /** Renders the margin note in `--red` — reserved for the numbers
   * section's "red means cost" annotation (§5.2), matching the
   * prototype's `.margin-note.cost` modifier. */
  marginNoteCost?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="ledger-section-grid">
      <div className="ledger-section-margin">
        {marginNote ? (
          <div className={`ledger-margin-note${marginNoteCost ? " cost" : ""}`}>{marginNote}</div>
        ) : null}
      </div>
      <div className="ledger-section-content">{children}</div>
    </div>
  );
}
