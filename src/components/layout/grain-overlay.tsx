/**
 * The Ledger's grain overlay — a fixed, pointer-events-none feTurbulence
 * texture at 5% opacity, multiply-blended over the page ("felt not seen").
 * Ported from prototype/index.html; mount this once near the root of the
 * layout shell, not per-section.
 */
export function GrainOverlay() {
  return <div className="grain" aria-hidden="true" />;
}
