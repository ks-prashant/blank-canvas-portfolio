import { LENS_LABELS, useLens } from "../../content/lens-context";
import type { Lens } from "../../content/types";

const ALL_LENSES: readonly Lens[] = ["recruiter", "operator", "engineer"];

/**
 * `LensPill` (C11, BUILD-SPEC §6) — sticky "Reading as: X ▾" indicator,
 * global, always visible. Built as a native `<details>/<summary>` menu so
 * it's keyboard-operable with no extra JS. The menu itself doubles as a
 * minimal "compare all three" affordance (§8.4): every lens is listed with
 * a one-click "read the site this way" action, which is what a full
 * `CompareModal` would add on top of this pill anyway — a real
 * side-by-side comparison view (showing one block's three renderings at
 * once) is out of scope for this step (see report), but the cheap part —
 * "every view is one click away from the pill" — is already true here.
 */
export function LensPill() {
  const { lens, setLens } = useLens();

  return (
    <details className="ledger-lens-pill">
      <summary className="ledger-lens-pill-summary">
        Reading as: <strong>{lens ? LENS_LABELS[lens] : "Unlensed"}</strong> <span aria-hidden>▾</span>
      </summary>
      <div className="ledger-lens-pill-menu" role="menu">
        {ALL_LENSES.map((option) => (
          <button
            key={option}
            type="button"
            role="menuitemradio"
            aria-checked={lens === option}
            className={`ledger-lens-pill-option${lens === option ? " is-active" : ""}`}
            onClick={(event) => {
              setLens(option);
              // Close the native <details> menu after a choice.
              event.currentTarget.closest("details")?.removeAttribute("open");
            }}
          >
            {LENS_LABELS[option]}
          </button>
        ))}
      </div>
    </details>
  );
}
