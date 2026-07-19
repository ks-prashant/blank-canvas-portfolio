import { metrics } from "../../content/metrics";
import { principles } from "../../content/principles";
import type { Lens, SourceLabel } from "../../content/types";

/**
 * `LensSignature` (C8, BUILD-SPEC §6/§8.6) — the per-lens landing visual.
 * Three variants, only the active lens's renders. Each reads real counts
 * out of the compiled pipeline (`metrics.ts`, `principles.ts`) rather than
 * inventing numbers — small, legible, semantic HTML/CSS only (§9.4's
 * "no canvas, no diagram library" rule, applied site-wide).
 */
export function LensSignature({ lens }: { lens: Lens }) {
  if (lens === "recruiter") return <EvidenceLadder />;
  if (lens === "operator") return <DecisionLedger />;
  return <StructureBoard />;
}

const GROUP_ORDER: { label: SourceLabel; title: string }[] = [
  { label: "instrumented", title: "Measured" },
  { label: "directional", title: "Directional" },
  { label: "disclosed-gap", title: "Fell short / disclosed" },
];

/** Recruiter — the Evidence Ladder: every metric on the site, grouped by
 * how it was measured, tallest rung first. The currency of proof for this
 * lens (§4.1) is evidence strength, not size — this is that idea, drawn. */
function EvidenceLadder() {
  const counts = GROUP_ORDER.map((group) => ({
    ...group,
    count: metrics.filter((m) => m.metric.sourceLabel === group.label).length,
  }));
  const max = Math.max(...counts.map((c) => c.count), 1);

  return (
    <div className="ledger-signature ledger-signature--ladder" role="img" aria-label="Evidence ladder: metrics grouped by how they were measured">
      <p className="ledger-signature-caption">The evidence ladder — every metric, by how it was measured</p>
      <div className="ledger-ladder">
        {counts.map((c) => (
          <div className="ledger-ladder-rung" key={c.label}>
            <span className="ledger-ladder-label">{c.title}</span>
            <span className="ledger-ladder-bar-track">
              <span
                className={`ledger-ladder-bar${c.label === "disclosed-gap" ? " is-cost" : ""}`}
                style={{ width: `${(c.count / max) * 100}%` }}
              />
            </span>
            <span className="ledger-ladder-count tabular">{c.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Founder/PM — the Decision Ledger: the four themed groups of principles,
 * each a row, each carrying how many cross-company decisions back it. The
 * currency of proof for this lens (§4.1) is decisions where something was
 * given up — this counts them. */
function DecisionLedger() {
  const groups: { key: string; title: string }[] = [
    { key: "before-i-build", title: "Before I build" },
    { key: "how-i-decide", title: "How I decide" },
    { key: "how-i-ship", title: "How I ship" },
    { key: "what-i-trust", title: "What I trust" },
  ];

  return (
    <div className="ledger-signature ledger-signature--decisions" role="img" aria-label="Decision ledger: principles grouped by theme, with evidence counts">
      <p className="ledger-signature-caption">The decision ledger — every principle, and how many projects prove it</p>
      <dl className="ledger-decision-rows">
        {groups.map((group) => {
          const items = principles.filter((p) => p.group === group.key);
          const evidenceCount = items.reduce((sum, p) => sum + p.evidence.length, 0);
          return (
            <div className="ledger-decision-row" key={group.key}>
              <dt>{group.title}</dt>
              <dd>
                <span className="tabular">{items.length}</span> principle{items.length === 1 ? "" : "s"}
                <span className="ledger-decision-sep"> · </span>
                <span className="tabular">{evidenceCount}</span> proof point{evidenceCount === 1 ? "" : "s"}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}

/** Engineer — the Structure Board: three rows, one per system. The third
 * row is this site (D9's thesis, drawn instead of asserted). */
function StructureBoard() {
  const rows = [
    {
      name: "Automjet",
      mechanism:
        "The commitment ladder has no upward transition — a declined ask cannot be re-offered by any node.",
    },
    {
      name: "Grounded Governance",
      mechanism:
        "A post-generation entailment check drops any claim its cited source doesn't support — the model never vouches for its own grounding.",
    },
    {
      name: "This site",
      mechanism:
        "The lens switch is a client-side object lookup. No LLM anywhere, at build time or runtime — nothing to drift.",
    },
  ];

  return (
    <div className="ledger-signature ledger-signature--structure" role="img" aria-label="Structure board: three systems, one discipline">
      <p className="ledger-signature-caption">The structure board — three systems, one discipline</p>
      <ol className="ledger-structure-rows">
        {rows.map((row, i) => (
          <li className={`ledger-structure-row${row.name === "This site" ? " is-site" : ""}`} key={row.name}>
            <span className="ledger-structure-num tabular">{String(i + 1).padStart(2, "0")}</span>
            <span className="ledger-structure-name">{row.name}</span>
            <span className="ledger-structure-mechanism">{row.mechanism}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
