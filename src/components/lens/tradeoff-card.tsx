import type { ReactNode } from "react";

/**
 * `TradeoffCard` (C17, BUILD-SPEC §6) — generic buys/costs block. Despite
 * the name it's a rule-bound block, not a card (§5.4: no cards anywhere).
 * Reused verbatim-shaped for "no runtime LLM" (§8.3, this step) and, later,
 * "left without an offer" (§17.1) and similar.
 */
export function TradeoffCard({
  title,
  buys,
  costs,
}: {
  title: ReactNode;
  buys: ReactNode;
  costs: ReactNode;
}) {
  return (
    <div className="ledger-tradeoff-card">
      <p className="ledger-tradeoff-title">{title}</p>
      <dl className="ledger-tradeoff-list">
        <div className="ledger-tradeoff-row">
          <dt>What it buys</dt>
          <dd>{buys}</dd>
        </div>
        <div className="ledger-tradeoff-row ledger-tradeoff-row--cost">
          <dt>What it costs</dt>
          <dd>{costs}</dd>
        </div>
      </dl>
    </div>
  );
}
