import type { ReactNode } from "react";

import { GrainOverlay } from "./grain-overlay";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import "../../styles/site-chrome.css";

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
      <a className="ledger-skip-link" href="#main-content">
        Skip to content
      </a>
      <GrainOverlay />
      <SiteHeader />
      <div className="ledger-grid">
        <div className="ledger-margin-col">{marginContent}</div>
        <main className="ledger-content-col" id="main-content">
          {children}
        </main>
      </div>
      <SiteFooter />
    </div>
  );
}
