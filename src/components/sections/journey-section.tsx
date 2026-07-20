import { useState } from "react";

import { education, journey, throughline } from "../../content/site-copy";
import { SectionGrid, SectionHeading } from "./section-heading";
import { Prose } from "../../components/prose";

/**
 * `#journey` — the career timeline (C13 `JourneyLine`), BUILD-SPEC §11.1:
 * "Keep, re-source content" from the prototype's `#jline` build. Structure
 * ported (phase groups, clickable company marks, detail-in-place expansion);
 * content re-sourced from `knowledge-book/02-career-timeline.md` and
 * `01-identity.md` via `src/content/site-copy.ts` (see that file's header
 * comment — there is no typed pipeline module for journey content yet).
 *
 * Renders identically for every lens (BUILD-SPEC §4.1: "This part reads the
 * same for everyone — your history doesn't change by audience").
 */
// Defaults to Phase 3 (TopHire, the most recent full-time role) rather than
// Phase 1 (2016, the oldest and thinnest entry) — a first-time visitor who
// never clicks anything should land on the most relevant role, not the
// earliest one chronology happens to list first.
const DEFAULT_OPEN = { p: 2, r: 0 };

export function JourneySection() {
  const [open, setOpen] = useState<{ p: number; r: number }>(DEFAULT_OPEN);

  return (
    <section className="ledger-journey-block ledger-rule-top" id="journey">
      <SectionGrid
        marginNote={
          <>
            This part reads
            <br />
            the same for
            <br />
            everyone — your
            <br />
            history doesn't
            <br />
            change by
            <br />
            audience.
          </>
        }
      >
        <SectionHeading
          eyebrow="How I got here"
          heading="Nine years, five industries"
          dek="Fintech, recruitment, marketplaces, ride-hailing, banking. Click any company to see what I actually did there."
        />

        <div className="ledger-jline">
          <div className="ledger-jline-rule" />
          {journey.map((phase, pi) => (
            <div className="ledger-jphase" key={phase.phase}>
              <div className="ledger-jphase-head">
                <span className="ledger-jn">{phase.phase}</span>
                <h4>{phase.heading}</h4>
                <span className="ledger-jy">{phase.years}</span>
              </div>
              <div className="ledger-jmarks">
                {phase.roles.map((role, ri) => {
                  const isOpen = open.p === pi && open.r === ri;
                  return (
                    <button
                      key={role.company}
                      type="button"
                      className="ledger-jmark"
                      aria-pressed={isOpen}
                      onClick={() =>
                        setOpen((prev) =>
                          prev.p === pi && prev.r === ri ? { p: -1, r: -1 } : { p: pi, r: ri },
                        )
                      }
                    >
                      {role.company}
                    </button>
                  );
                })}
              </div>
              {phase.roles.map((role, ri) => {
                const isOpen = open.p === pi && open.r === ri;
                return (
                  <div
                    key={role.company}
                    className={`ledger-jdetail${isOpen ? " open" : ""}`}
                    id={`jd-${pi}-${ri}`}
                  >
                    <div className="ledger-jd-ti">{role.title}</div>
                    <p><Prose text={role.body} /></p>
                    <div className="ledger-jd-nums">
                      {role.numbers.map((n) => (
                        <span key={n}>{n}</span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="ledger-throughline">
          <div className="ledger-tl-label">{throughline.label}</div>
          <p><Prose text={throughline.body} /></p>
        </div>

        <div className="ledger-edu-row">
          {education.map((e) => (
            <div className="ledger-edu-item" key={e.value}>
              <span className="ledger-edu-k">{e.kind}</span>
              <div className="ledger-edu-v">{e.value}</div>
              <div className="ledger-edu-y">{e.years}</div>
            </div>
          ))}
        </div>
      </SectionGrid>
    </section>
  );
}
