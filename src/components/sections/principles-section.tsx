import { useState } from "react";

import { principles } from "../../content/principles";
import { projects } from "../../content/projects";
import type { Principle } from "../../content/types";
import { SectionGrid, SectionHeading } from "./section-heading";
import { Prose } from "../../components/prose";

/**
 * `#principles` — the 8 principles in 4 themed groups (BUILD-SPEC §11.1:
 * "Keep" — unchanged, now also the founder lens's operating-system
 * section once Step 5 lands). Structure ported from the prototype's
 * `#plist`/`.pgroup`/`.pitem` build; content from `src/content/
 * principles.ts` (the compiled pipeline, §7.5) instead of the prototype's
 * hardcoded PGROUPS array.
 *
 * One structural difference from the prototype worth flagging: the
 * pipeline's `Principle.evidence` carries a full per-project note, not
 * just a short thematic label — so each evidence entry renders as a
 * project chip *plus* its note, rather than a bare chip. Real content
 * earned the extra line; the prototype's chips-only version simply
 * didn't have this depth of data to show.
 */
const GROUP_ORDER: { key: Principle["group"]; num: string; title: string }[] = [
  { key: "before-i-build", num: "Group 1", title: "Before I build" },
  { key: "how-i-decide", num: "Group 2", title: "How I decide" },
  { key: "how-i-ship", num: "Group 3", title: "How I ship" },
  { key: "what-i-trust", num: "Group 4", title: "What I trust" },
];

function projectName(slug: string): string {
  return projects.find((p) => p.slug === slug)?.name ?? slug;
}

export function PrinciplesSection() {
  const [openSlug, setOpenSlug] = useState<string | null>(principles[0]?.slug ?? null);

  return (
    <section className="ledger-principles-block ledger-rule-top" id="principles">
      <SectionGrid
        marginNote={
          <>
            Each one is
            <br />
            evidenced at
            <br />
            more than one
            <br />
            company —
            <br />
            that's the
            <br />
            point.
          </>
        }
      >
        <SectionHeading
          eyebrow="How I work"
          heading="The patterns that repeat"
          dek="Five industries is only an asset if the same judgment shows up each time. Here's what does, grouped by where in the work it happens."
        />

        <div>
          {GROUP_ORDER.map((group) => {
            const items = principles.filter((p) => p.group === group.key).sort((a, b) => a.num - b.num);
            return (
              <div className="ledger-pgroup" key={group.key}>
                <div className="ledger-pg-head">
                  <span className="ledger-pg-n">{group.num}</span>
                  <span className="ledger-pg-t">{group.title}</span>
                </div>
                {items.map((principle) => {
                  const isOpen = openSlug === principle.slug;
                  return (
                    <div className={`ledger-pitem${isOpen ? " open" : ""}`} key={principle.slug}>
                      <button
                        type="button"
                        className="ledger-phead"
                        aria-expanded={isOpen}
                        onClick={() => setOpenSlug(isOpen ? null : principle.slug)}
                      >
                        <span className="ledger-pt">{principle.title}</span>
                        <span className="ledger-pind">{isOpen ? "−" : "+"}</span>
                      </button>
                      <div className="ledger-pbody">
                        <p><Prose text={principle.body} /></p>
                        <dl className="ledger-pevidence">
                          {principle.evidence.map((e) => (
                            <div className="ledger-pevidence-row" key={e.projectSlug + e.note.slice(0, 12)}>
                              <dt>
                                <span className="ledger-pchip">{projectName(e.projectSlug)}</span>
                              </dt>
                              <dd><Prose text={e.note} /></dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </SectionGrid>
    </section>
  );
}
