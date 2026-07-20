import { contact, profile } from "../../content/site-copy";

/**
 * `SiteFooter` — the shared colophon rendered by `LedgerShell` on every page.
 *
 * The counterpart to `SiteHeader`: it closes every interior page with a
 * reach-out path at exactly the moment intent is highest — the end of a long
 * read — so a convinced visitor never has to scroll back up hunting for a way
 * to contact. Kept deliberately slim (a single ruled row of links) so that on
 * the landing page, where the fuller `ContactSection` is the real closer, it
 * reads as a light colophon underneath rather than a second contact block.
 */
export function SiteFooter() {
  return (
    <footer className="ledger-site-footer">
      <div className="ledger-wrap ledger-site-footer-inner">
        <p className="ledger-site-footer-id">
          <a href="/">{profile.name}</a> — {profile.role} · {profile.location}
        </p>
        <nav className="ledger-site-footer-nav" aria-label="Contact">
          <a href={`mailto:${contact.email}`}>Email</a>
          <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
            Résumé
          </a>
        </nav>
      </div>
    </footer>
  );
}
