import { profile } from "../../content/site-copy";

/**
 * `SiteHeader` — the shared top bar rendered by `LedgerShell` on every page.
 *
 * Its whole reason to exist is that interior pages (`/work/*`, `/case/*`)
 * were navigational dead ends: they carried no name, no way home, and no way
 * to contact. A visitor who finished the best case study had to edit the URL
 * bar. This bar gives every page an identity (the name is a home link) and a
 * path to the work and to contact.
 *
 * Deliberately NOT sticky: the `LensPill` already owns `position: sticky;
 * top: 0` inside the content column, and stacking two sticky bars at the same
 * offset fights for the same space. The header sits at the top of the page;
 * the persistent "Reading as" pill takes over once you scroll. The closing
 * `SiteFooter` covers the reach-out moment at the end of a long read.
 *
 * The name is a plain wordmark here (no photo — the photo lives in the hero
 * masthead and the contact block, per the hero's identity treatment), so on
 * the landing page this reads as the standard "wordmark + hero headline"
 * pairing, not a duplicated portrait.
 *
 * Links are plain anchors to landing-section ids. From an interior page they
 * cross-navigate to `/` and scroll — robust and SSR-safe, no client-router
 * hash handling needed.
 */
export function SiteHeader() {
  return (
    <header className="ledger-site-header">
      <div className="ledger-wrap ledger-site-header-inner">
        <a className="ledger-site-header-mark" href="/">
          {profile.name}
        </a>
        <nav className="ledger-site-header-nav" aria-label="Primary">
          <a href="/#work">Work</a>
          <a href="/#numbers">The numbers</a>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
          <a href="/#contact">Contact</a>
        </nav>
      </div>
    </header>
  );
}
