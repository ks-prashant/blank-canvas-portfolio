import { projects } from "../../content/projects";
import type { Project } from "../../content/types";
import { SectionGrid, SectionHeading } from "./section-heading";

/**
 * `#work` — the tiered project index (BUILD-SPEC §11.1: "Keep, new roster").
 * Structure ported from the prototype's `#workList`/`.org-group`/`.work-row`
 * build; roster re-sourced from `src/content/projects.ts` (the compiled
 * pipeline, §7.4) instead of the prototype's hardcoded WORK array.
 *
 * Tier 1/2 rows now link to real routes (Step 7): Tier 1 (`automjet`,
 * `grounded-governance`) to their `/work/$slug` build-essay pages, Tier 2
 * (the six case studies) to `/case/$slug`. Both route sets exist as of
 * this step, so the "a CTA that leads nowhere is a small lie" (§7.4)
 * concern from Steps 4-6 no longer applies. Tier 3 still gets one line,
 * no page, no CTA, by design (never a regression, since it never had one).
 *
 * The one-liner shown for tier 1/2 rows is each project's `status` field —
 * chosen deliberately over any single lens's `summary` because `status` is
 * lens-invariant, which matches §4.1's honest un-lensed default: before a
 * lens is picked (not wired up until Step 5), the page shouldn't silently
 * speak in one lens's voice.
 */
const ORG_GROUPS: { label: string; orgs: Project["org"][] }[] = [
  { label: "Built solo · outside any employer", orgs: ["personal"] },
  { label: "TopHire · recruitment SaaS · 2023–2026", orgs: ["tophire"] },
  { label: "nurture.farm · MSME marketplace · 2021–2022", orgs: ["nurture-farm"] },
  { label: "Earlier · Ola, Prashaste, Infosys · 2016–2021", orgs: ["ola", "infosys", "prashaste"] },
];

function tierOf(project: Project): 1 | 2 | 3 {
  if (project.essay) return 1;
  return project.depth === "full" ? 2 : 3;
}

export function WorkIndexSection() {
  return (
    <section className="ledger-work-block ledger-rule-top" id="work">
      <SectionGrid
        marginNote={
          <>
            Thirteen
            <br />
            projects, tiered
            <br />
            by how much
            <br />
            evidence backs
            <br />
            them — not by
            <br />
            effort.
          </>
        }
      >
        <SectionHeading
          eyebrow="The work"
          heading="Everything I've built"
          dek="Thirteen projects across those nine years. Two you can open and run yourself, six with a full case study, and five that are honestly just a line each."
        />

        <div>
          {ORG_GROUPS.map((group) => {
            const items = projects.filter((p) => group.orgs.includes(p.org));
            if (items.length === 0) return null;
            return (
              <div className="ledger-org-group" key={group.label}>
                <div className="ledger-org-head">{group.label}</div>
                {items.map((project) => {
                  const tier = tierOf(project);
                  const href =
                    tier === 1
                      ? `/work/${project.slug}`
                      : tier === 2
                        ? `/case/${project.slug}`
                        : undefined;
                  const rowClass =
                    tier === 1
                      ? "ledger-work-row ledger-work-row--t1"
                      : tier === 3
                        ? "ledger-work-row ledger-work-row--t3 ledger-work-row--nolink"
                        : "ledger-work-row";
                  const rowContent = (
                    <span className="ledger-wr-main">
                      <span className="ledger-work-title">{project.name}</span>
                      <span className="ledger-work-oneliner">{project.status}</span>
                    </span>
                  );
                  return href ? (
                    <a className={rowClass} href={href} key={project.slug}>
                      {rowContent}
                      <span className="ledger-cta-mark">
                        {tier === 1 ? "Open the build →" : "Read the case →"}
                      </span>
                    </a>
                  ) : (
                    <div className={rowClass} key={project.slug}>
                      {rowContent}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </SectionGrid>
    </section>
  );
}
