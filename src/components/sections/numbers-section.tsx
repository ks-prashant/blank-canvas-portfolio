import { metrics } from "../../content/metrics";
import { projects } from "../../content/projects";
import type { SourceLabel } from "../../content/types";
import { UnlensedMark } from "../lens/unlensed-mark";
import { Prose } from "../../components/prose";
import { SectionGrid, SectionHeading } from "./section-heading";

/**
 * `#numbers` — the audit, every metric grouped by evidence strength
 * (BUILD-SPEC §11.1: "Keep, and promote" — unchanged, and per §8.6 it's
 * the entire recruiter-lens argument once Step 5 lands). Structure ported
 * from the prototype's `#scoretable`/`.sgroup`/`.score-row` build;
 * content from `src/content/metrics.ts` (the compiled pipeline, §7.2)
 * instead of the prototype's hardcoded SGROUPS array.
 *
 * Grouped by the three real `SourceLabel` values (§7.2) rather than the
 * prototype's four hand-picked buckets — "instrumented" / "directional" /
 * "disclosed-gap" is what the type system actually carries. Red renders
 * only on the disclosed-gap group, per §5.2's rule that red means cost
 * and nothing else.
 *
 * The documented "no" (voice screening, senior roles) is rendered as its
 * own featured block beneath the three metric groups, sourced from the
 * `voice-screening` project's `didntShip` field — it isn't a `Metric` in
 * the type system (§1.2's "rarest asset," featured per BUILD-SPEC's
 * thesis, not buried in a table row it doesn't fit).
 */
const GROUPS: { label: SourceLabel; title: string; description: string }[] = [
  {
    label: "instrumented",
    title: "Measured",
    description: "A/B tested or instrumented in production",
  },
  {
    label: "directional",
    title: "Directional",
    description: "Real, but the method has limits — named alongside the number",
  },
  {
    label: "disclosed-gap",
    title: "Fell short, or a disclosed estimate",
    description: "Reported against the bar that was set, not rounded up to it",
  },
];

export function NumbersSection() {
  const voiceScreening = projects.find((p) => p.slug === "voice-screening");

  return (
    <section className="ledger-numbers-block ledger-rule-top" id="numbers">
      <SectionGrid
        marginNoteCost
        marginNote={
          <>
            Red means a
            <br />
            cost — a gap,
            <br />
            a shortfall, or
            <br />
            a decision not
            <br />
            to ship.
          </>
        }
      >
        <SectionHeading
          eyebrow="The numbers"
          heading="Every number, and how I know it"
          dek="Grouped by how much you should trust it. Some were A/B tested. One is a hand-checked eval. Two fell short of the bar that was set. One isn't a number at all."
        />
        <UnlensedMark />

        <div id="scoretable">
          {GROUPS.map((group) => {
            const rows = metrics.filter((m) => m.metric.sourceLabel === group.label);
            if (rows.length === 0) return null;
            const isCost = group.label === "disclosed-gap";
            return (
              <div className={`ledger-sgroup${isCost ? " ledger-sgroup--cost" : ""}`} key={group.label}>
                <div className="ledger-sg-head">
                  <span className="ledger-sg-t">{group.title}</span>
                  <span className="ledger-sg-d">{group.description}</span>
                </div>
                {rows.map(({ projectSlug, metric }) => (
                  <div className="ledger-score-row" key={projectSlug + metric.label}>
                    <div>
                      <div className="ledger-sl">{metric.label}</div>
                      <div className="ledger-sd">
                        <Prose text={metric.method + (metric.caveat ? ` — ${metric.caveat}` : "")} />
                      </div>
                    </div>
                    <div className="ledger-sv tabular">{metric.value}</div>
                  </div>
                ))}
              </div>
            );
          })}

          {voiceScreening?.didntShip ? (
            <div className="ledger-sgroup ledger-sgroup--cost">
              <div className="ledger-sg-head">
                <span className="ledger-sg-t">Not a number — a decision</span>
                <span className="ledger-sg-d">The one I'd point at first</span>
                <UnlensedMark />
              </div>
              <div className="ledger-score-row">
                <div>
                  <div className="ledger-sl">{voiceScreening.didntShip.what}</div>
                  <div className="ledger-sd">{voiceScreening.didntShip.why}</div>
                </div>
                <div className="ledger-sv tabular">{voiceScreening.didntShip.number ?? "Said no"}</div>
              </div>
            </div>
          ) : null}
        </div>

        <p className="ledger-numbers-note">
          The last one is what I'd point at first. Anyone can show you a win. Voice screening had to
          match a human's completion rate to ship — on senior roles it fell short, so those stayed
          with people.
        </p>
      </SectionGrid>
    </section>
  );
}
