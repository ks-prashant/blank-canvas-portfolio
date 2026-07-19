import { contact } from "../../content/site-copy";
import { SectionGrid } from "./section-heading";

/**
 * `#contact` — next step (BUILD-SPEC §11.1: "Keep" — unchanged). Structure
 * ported from the prototype's `.contact-row`/`.btn-solid`/`.link-line`
 * build; content re-sourced from `knowledge-book/01-identity.md` via
 * `src/content/site-copy.ts` (no typed pipeline module for contact info
 * yet — same flagged gap as `#journey` and `#questions`).
 *
 * The prototype's `.contact-ava` (a profile photo) is intentionally
 * dropped here — no photo asset was supplied to this build step, and an
 * empty/broken `<img>` would be worse than omitting it.
 */
export function ContactSection() {
  return (
    <section className="ledger-contact-block" id="contact">
      <SectionGrid>
        <p className="ledger-eyebrow">
          <span className="ledger-eyebrow-dot" />
          Next step
        </p>
        <div className="ledger-contact-row">
          <div className="ledger-contact-line">{contact.line}</div>
          <div className="ledger-contact-actions">
            <a className="ledger-btn-solid" href={`mailto:${contact.email}`}>
              Email
            </a>
            <a
              className="ledger-link-line"
              href={contact.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {contact.linkedinLabel}
            </a>
          </div>
        </div>
      </SectionGrid>
    </section>
  );
}
