import { metrics } from "../../content/metrics";
import { projects } from "../../content/projects";
import type { Metric, Org, Project, SourceLabel } from "../../content/types";
import { UnlensedMark } from "../lens/unlensed-mark";
import { Prose } from "../../components/prose";
import { SectionGrid, SectionHeading } from "./section-heading";

/**
 * `#numbers` — the audit. Restructured (post-V1 review, task #6) from three
 * evidence-strength groups that interleaved every company across 36 rows,
 * into **one cluster per company**, each led by the metric I actually owned
 * (the north-star), with the supporting metrics collapsed behind a click.
 *
 * The honesty thesis (§8.6 — "every number carries how it was measured")
 * is preserved, just moved from the *grouping* to a per-row **evidence tag**
 * (Measured / Directional / Fell short). Red still means cost and nothing
 * else (§5.2): only a "Fell short" tag and its value render red.
 *
 * The documented "no" (voice screening, senior roles) stays a featured
 * block, not a table row — it's §1.2's "rarest asset." Its metric is
 * excluded from the TopHire cluster below so it isn't shown twice.
 */

// Company clusters, in the site's established order (matches the work index).
// `orgs` lets one visible cluster fold several `Org` values together (the
// "Earlier" cluster covers Ola + Infosys/Prashaste, exactly as the work
// index groups them). `leads` are the metric labels shown up front — the
// north-star / primary outcome for that pod; everything else collapses.
const CLUSTERS: { label: string; orgs: Org[]; leads: string[] }[] = [
  {
    label: "Built solo · outside any employer",
    orgs: ["personal"],
    leads: [
      "Connect rate",
      "Full-conversation completion",
      "Terminal-node conversion (test ride / meeting / warm lead)",
      "Classified cold",
      "Groundedness (first full run)",
    ],
  },
  {
    label: "TopHire · recruitment SaaS · 2023–2026",
    orgs: ["tophire"],
    // The two suite-wide outcomes I owned the pod for; the per-product
    // metrics that built up to them collapse below.
    leads: ["Recruiter productivity (suite-wide)", "Time-to-hire reduction (suite-wide)"],
  },
  {
    label: "nurture.farm · MSME marketplace · 2021–2022",
    orgs: ["nurture-farm"],
    // MTU was my ownership; the retention loop is the other primary. (GMV —
    // the metric MTU fed into — isn't in the content yet; flagged to add.)
    leads: ["MTU lift, credit cohort", "Month-1 retention"],
  },
  {
    label: "Earlier · Ola, Prashaste, Infosys · 2016–2021",
    orgs: ["ola", "infosys", "prashaste"],
    leads: [],
  },
];

// The featured "said no" is rendered as its own block; keep its metric out of
// the TopHire cluster so it doesn't appear twice.
const FEATURED_EXCLUDE = new Set(["Call-completion, senior roles"]);

const EVIDENCE: Record<SourceLabel, { tag: string; cost: boolean }> = {
  instrumented: { tag: "Measured", cost: false },
  directional: { tag: "Directional", cost: false },
  "disclosed-gap": { tag: "Fell short", cost: true },
};

function projectHrefFor(project: Project): string | undefined {
  if (project.essay) return `/work/${project.slug}`;
  if (project.depth === "full") return `/case/${project.slug}`;
  return undefined;
}

function MetricProjectTag({ projectSlug }: { projectSlug: string }) {
  const project = projects.find((p) => p.slug === projectSlug);
  if (!project) return null;
  const href = projectHrefFor(project);
  return href ? (
    <a className="ledger-sp" href={href}>
      {project.name}
    </a>
  ) : (
    <span className="ledger-sp">{project.name}</span>
  );
}

function MetricRow({ projectSlug, metric }: { projectSlug: string; metric: Metric }) {
  const ev = EVIDENCE[metric.sourceLabel];
  return (
    <div className={`ledger-score-row${ev.cost ? " ledger-score-row--cost" : ""}`}>
      <div>
        <MetricProjectTag projectSlug={projectSlug} />
        <div className="ledger-sl">{metric.label}</div>
        <div className="ledger-sd">
          <Prose text={metric.method + (metric.caveat ? ` — ${metric.caveat}` : "")} />
        </div>
      </div>
      <div className="ledger-sv-cell">
        <div className="ledger-sv tabular">{metric.value}</div>
        <span className={`ledger-metric-tag${ev.cost ? " ledger-metric-tag--cost" : ""}`}>
          {ev.tag}
        </span>
      </div>
    </div>
  );
}

export function NumbersSection() {
  const voiceScreening = projects.find((p) => p.slug === "voice-screening");
  const orgOf = new Map(projects.map((p) => [p.slug, p.org]));

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
          dek="Grouped by where the work happened, each company led by the metric I owned. Every number keeps its evidence tag — measured, directional, or the ones that fell short of the bar I set, marked in red."
        />
        <UnlensedMark />

        <div id="scoretable">
          {CLUSTERS.map((cluster) => {
            const rows = metrics.filter(
              (m) =>
                cluster.orgs.includes(orgOf.get(m.projectSlug) as Org) &&
                !FEATURED_EXCLUDE.has(m.metric.label),
            );
            if (rows.length === 0) return null;
            const leadRows = rows.filter((m) => cluster.leads.includes(m.metric.label));
            const restRows = rows.filter((m) => !cluster.leads.includes(m.metric.label));
            // When a cluster names no leads (Earlier), show everything up front.
            const primary = leadRows.length > 0 ? leadRows : restRows;
            const secondary = leadRows.length > 0 ? restRows : [];

            return (
              <div className="ledger-org-cluster" key={cluster.label}>
                <div className="ledger-org-head">{cluster.label}</div>
                {primary.map((m) => (
                  <MetricRow
                    key={m.projectSlug + m.metric.label}
                    projectSlug={m.projectSlug}
                    metric={m.metric}
                  />
                ))}
                {secondary.length > 0 ? (
                  <details className="ledger-metrics-more">
                    <summary className="ledger-metrics-more-summary">
                      {secondary.length} more from {cluster.label.split(" · ")[0].split(" — ")[0]}
                    </summary>
                    <div>
                      {secondary.map((m) => (
                        <MetricRow
                          key={m.projectSlug + m.metric.label}
                          projectSlug={m.projectSlug}
                          metric={m.metric}
                        />
                      ))}
                    </div>
                  </details>
                ) : null}
              </div>
            );
          })}

          {voiceScreening?.didntShip ? (
            <div className="ledger-org-cluster ledger-org-cluster--featured">
              <div className="ledger-org-head ledger-org-head--cost">
                Not a number — a decision · the one I'd point at first
                <UnlensedMark />
              </div>
              <div className="ledger-score-row ledger-score-row--cost">
                <div>
                  <div className="ledger-sl">{voiceScreening.didntShip.what}</div>
                  <div className="ledger-sd">{voiceScreening.didntShip.why}</div>
                </div>
                <div className="ledger-sv-cell">
                  <div className="ledger-sv tabular">
                    {voiceScreening.didntShip.number ?? "Said no"}
                  </div>
                  <span className="ledger-metric-tag ledger-metric-tag--cost">Didn't ship</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <p className="ledger-numbers-note">
          That last one is what I'd point at first. Anyone can show you a win. Voice screening had
          to match a human's completion rate to ship — on senior roles it fell short, so those
          stayed with people.
        </p>
      </SectionGrid>
    </section>
  );
}
