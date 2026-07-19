/**
 * `UnlensedMark` (C23, BUILD-SPEC §6/§8.6) — "this block doesn't change by
 * lens" marker. Belongs on the numbers table, evidence tags, and the
 * documented "no" (§8.6's grounding-fence mechanism: some things the model
 * — here, the lens picker — is never allowed to vary).
 */
export function UnlensedMark() {
  return (
    <span className="ledger-unlensed-mark" title="This block doesn't change by lens. The evidence is the evidence.">
      Unlensed — the evidence is the evidence
    </span>
  );
}
