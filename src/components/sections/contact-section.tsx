import { contact, profile } from "../../content/site-copy";
import { SectionGrid } from "./section-heading";
import { Prose } from "../../components/prose";

/**
 * `#contact` — next step (BUILD-SPEC §11.1: "Keep"). Structure ported from
 * the prototype's `.contact-row`/`.btn-solid`/`.link-line` build; content
 * re-sourced from `knowledge-book/01-identity.md` via
 * `src/content/site-copy.ts`.
 *
 * The prototype's `.contact-ava` (a profile photo) is restored now that a
 * photo asset exists (public/prashant-singh.jpg), alongside the name, so the
 * page closes with a face and an identity rather than two bare links — and a
 * resume download, the recruiter's most common ask, which the page lacked.
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
          <img
            className="ledger-contact-avatar"
            src={profile.avatarUrl}
            width={56}
            height={56}
            alt={profile.name}
          />
          <div className="ledger-contact-line">
            <p className="ledger-contact-name">{profile.name}</p>
            <Prose text={contact.line} />
          </div>
          <div className="ledger-contact-actions">
            <a className="ledger-btn-solid" href={`mailto:${contact.email}`}>
              Email
            </a>
            <a
              className="ledger-link-line"
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Résumé (PDF)
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
