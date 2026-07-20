import { LensPill } from "../lens/lens-pill";
import { profile } from "../../content/site-copy";

/**
 * `SiteHeader` — the shared, sticky top bar rendered by `LedgerShell` on
 * every page.
 *
 * Its whole reason to exist is that interior pages (`/work/*`, `/case/*`)
 * were navigational dead ends: they carried no name, no way home, and no way
 * to contact. A visitor who finished the best case study had to edit the URL
 * bar. This bar gives every page an identity (the name is a home link) and a
 * path to the work and to contact.
 *
 * Sticky, and it OWNS the `LensPill`. Previously the pill was a separate
 * `position: sticky` element floating inside the content column while this
 * header stayed static — so on scroll the little pill detached and overlapped
 * body text (two bars fighting for the top). Now there is one opaque sticky
 * bar: nav on the right, the "Reading as" pill beside it, and body content
 * scrolls cleanly underneath. Every route already wraps `LedgerShell` in a
 * `LensProvider`, so the pill's `useLens()` always has a provider here. The
 * closing `SiteFooter` still covers the reach-out moment at the end of a read.
 *
 * The name is a plain wordmark here (no photo — the photo lives in the hero
 * masthead and the contact block, per the hero's identity treatment), so on
 * the landing page this reads as the standard "wordmark + hero headline"
 * pairing, not a duplicated portrait.
 *
 * Links are plain anchors to landing-section ids. From an interior page they
 * cross-navigate to `/` and scroll — robust and SSR-safe, no client-router
 * hash handling needed. `scroll-padding-top` on the scroll root (styles.css)
 * keeps anchored sections clear of the sticky bar.
 */
export function SiteHeader() {
  return (
    <header className="ledger-site-header">
      <div className="ledger-wrap ledger-site-header-inner">
        <a className="ledger-site-header-mark" href="/">
          {profile.name}
        </a>
        <div className="ledger-site-header-right">
          <nav className="ledger-site-header-nav" aria-label="Primary">
            <a href="/#work">Work</a>
            <a href="/#numbers">The numbers</a>
            <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
              Résumé
            </a>
            <a href="/#contact">Contact</a>
          </nav>
          <LensPill />
        </div>
      </div>
    </header>
  );
}
