import type { Metric } from "../../content/types";

/**
 * `EvalScore` (C7, BUILD-SPEC §6/§9.3) — a metric vs. its target, rendered
 * honestly. FAIL states are shown plainly (e.g. "93.3% vs 95% ✗"), styled
 * with the same visual weight as passing metrics — the failing first run
 * is content, not shame (§9.3, §9.6.3). `--red` is used only because a
 * metric that fell short of its own bar is exactly the kind of disclosed
 * gap the design system's cost/gap convention (§5.2) already covers, not
 * because failure is being singled out for emphasis.
 *
 * Reusable by Automjet: takes a plain `Metric[]` (already on every
 * `Project`, §7.2), not Grounded-Governance-specific fields.
 */

// A metric "passes" when its value states its own target and doesn't carry
// a disclosed-gap label — the value strings already say "vs 95% target"
// etc. (authored that way in `projects.ts`), so status is read off the
// existing `sourceLabel` rather than re-parsing the number out of prose.
function statusOf(metric: Metric): "pass" | "fail" | "n/a" {
  if (metric.sourceLabel === "disclosed-gap") return "fail";
  if (metric.value.includes("vs") && metric.sourceLabel === "directional") return "pass";
  return "n/a";
}

export function EvalScore({ metrics, title }: { metrics: Metric[]; title?: string }) {
  return (
    <div className="ledger-eval-score">
      {title ? <p className="ledger-eval-score-title">{title}</p> : null}
      <dl className="ledger-eval-rows">
        {metrics.map((metric) => {
          const status = statusOf(metric);
          return (
            <div
              className={`ledger-eval-row${status === "fail" ? " is-fail" : ""}`}
              key={metric.label}
            >
              <dt className="ledger-eval-label">{metric.label}</dt>
              <dd className="ledger-eval-value tabular">
                {metric.value}
                {status === "fail" ? (
                  <span className="ledger-eval-mark ledger-eval-mark--fail" aria-hidden>
                    {" "}
                    ✗
                  </span>
                ) : status === "pass" ? (
                  <span className="ledger-eval-mark ledger-eval-mark--pass" aria-hidden>
                    {" "}
                    ✓
                  </span>
                ) : null}
                <span className="sr-only">
                  {" "}
                  — {status === "fail" ? "failed target" : status === "pass" ? "met target" : ""}
                </span>
              </dd>
              {metric.caveat ? <dd className="ledger-eval-caveat">{metric.caveat}</dd> : null}
            </div>
          );
        })}
      </dl>
    </div>
  );
}
