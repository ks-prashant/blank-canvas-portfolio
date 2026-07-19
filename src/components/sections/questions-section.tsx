import { useState } from "react";

import { faq } from "../../content/site-copy";
import { SectionGrid, SectionHeading } from "./section-heading";
import { Prose } from "../../components/prose";

/**
 * `#questions` — the FAQ (BUILD-SPEC §11.1: "Keep" — unchanged). Structure
 * ported from the prototype's `#qaList`/`.qa-item` build; content re-
 * sourced from `knowledge-book/01-identity.md` and `02-career-timeline.md`
 * via `src/content/site-copy.ts` (see that file's header comment — there
 * is no typed pipeline module for FAQ content yet, same gap as `#journey`
 * and `#contact`).
 */
export function QuestionsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="ledger-qa-block ledger-rule-top" id="questions">
      <SectionGrid>
        <SectionHeading
          eyebrow="Straight answers"
          heading="Questions you'll probably ask"
          dek="Including the ones that are awkward to answer. Better to answer them here than leave a guess."
        />

        <div className="ledger-qa-list">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div className={`ledger-qa-item${isOpen ? " open" : ""}`} key={item.question}>
                <button
                  type="button"
                  className="ledger-qa-q"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                >
                  <span>{item.question}</span>
                  <span className="ledger-qa-ind">{isOpen ? "−" : "+"}</span>
                </button>
                <div className="ledger-qa-a">
                  {item.answer.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}><Prose text={paragraph} /></p>
                  ))}
                  {item.tradeoff ? (
                    <div className="ledger-tradeoff">
                      <div className="ledger-tt-row">
                        <b>Buys</b>
                        <span><Prose text={item.tradeoff.buys} /></span>
                      </div>
                      <div className="ledger-tt-row ledger-tt-row--costs">
                        <b>Costs</b>
                        <span><Prose text={item.tradeoff.costs} /></span>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </SectionGrid>
    </section>
  );
}
