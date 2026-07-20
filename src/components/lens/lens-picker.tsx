import { lensPickerCopy } from "../../content/lens-picker-copy";
import { useLens } from "../../content/lens-context";
import { LensSignature } from "./lens-signature";
import { TradeoffCard } from "./tradeoff-card";

/**
 * `LensPicker` (C10, BUILD-SPEC §4.1/§6) — the site's one clarifying
 * question. Renders the honest un-lensed default (no card pre-selected,
 * no lens silently applied) until the visitor picks one; once picked, the
 * active `LensSignature` (C8) appears beneath it as the visible proof that
 * picking a lens re-argues the page, not just its prose (§8.6).
 *
 * Options are `<button>`s ruled off from each other (§5.4: no cards,
 * elevation is a rule, not a border-radius box), each stating the
 * audience's real decision, this lens's currency of proof, and its
 * one-line argument — all three pulled from `lensPickerCopy`
 * (BUILD-SPEC §4.1's table; see that module's header comment for why this
 * is hand-sourced rather than pipeline-compiled).
 */
export function LensPicker() {
  const { lens, setLens } = useLens();

  return (
    <div className="ledger-lens-picker" id="lens">
      <p className="ledger-lens-picker-prompt">
        One question, so this reads the way you need it to.
      </p>
      <p className="ledger-lens-picker-mechanics">
        Picking one re-composes the page around it — nothing is deleted, and you can switch anytime
        from the pill at the top of the page.
      </p>

      <div className="ledger-lens-picker-body">
        <div className="ledger-lens-options" role="radiogroup" aria-label="Choose how to read this site">
          {lensPickerCopy.map((entry) => {
            const isActive = lens === entry.lens;
            return (
              <button
                key={entry.lens}
                type="button"
                role="radio"
                aria-checked={isActive}
                className={`ledger-lens-option${isActive ? " is-active" : ""}`}
                onClick={() => setLens(entry.lens)}
              >
                <span className="ledger-lens-option-label">{entry.label}</span>
                <span className="ledger-lens-option-decision">{entry.theirDecision}</span>
                <span className="ledger-lens-option-currency">
                  What convinces them: {entry.currencyOfProof}
                </span>
                <span className="ledger-lens-option-argument">&ldquo;{entry.argument}&rdquo;</span>
              </button>
            );
          })}
        </div>

        <TradeoffCard
          title={<>This site doesn&rsquo;t call an LLM — anywhere.</>}
          buys={
            <>
              instant load; $0 per visitor; zero chance of a model inventing a metric about my own
              career; every word reviewed by me before it shipped.
            </>
          }
          costs={
            <>
              the content is fixed. It can&rsquo;t answer a question I didn&rsquo;t anticipate. If
              you have one, <a href="mailto:prashant.dpsrkp@gmail.com">email me</a>.
            </>
          }
        />
      </div>

      {lens ? (
        <div className="ledger-lens-picker-signature">
          <LensSignature lens={lens} />
        </div>
      ) : (
        <div className="ledger-lens-picker-preview">
          <p className="ledger-lens-picker-unset">
            No lens chosen yet — every section above and below is still reading in the plain,
            generalist voice. Here&rsquo;s what each one surfaces:
          </p>
          <div className="ledger-lens-preview-grid">
            {lensPickerCopy.map((entry) => (
              <div className="ledger-lens-preview-item" key={entry.lens}>
                <p className="ledger-lens-preview-item-label">{entry.label}</p>
                <LensSignature lens={entry.lens} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
