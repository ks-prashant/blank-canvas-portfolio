import type { Org, Project } from "../../content/types";

/**
 * `CaseHeader` (BUILD-SPEC §8.5's shared page frame, first element) —
 * company · role · dates · status · scale, identical across all three
 * lenses (the header is never lens-adapted; only the body below it is).
 *
 * The six Tier-2 case-study projects (§7.4) only span two orgs
 * (`tophire`, `nurture-farm`), so this small map is deliberately narrow —
 * it is NOT meant to describe every `Org` value in `types.ts` (Ola,
 * Infosys, Prashaste, personal have no case pages and never route here).
 */
const ORG_META: Partial<Record<Org, { label: string; dates: string }>> = {
  tophire: { label: "TopHire · recruitment SaaS", dates: "2023–2026" },
  "nurture-farm": { label: "nurture.farm · MSME marketplace", dates: "2021–2022" },
};

export function CaseHeader({ project }: { project: Project }) {
  const meta = ORG_META[project.org];

  return (
    <header className="ledger-case-header">
      {meta ? (
        <p className="ledger-case-org">
          {meta.label} · {meta.dates}
        </p>
      ) : null}
      <h1 className="ledger-case-title">{project.name}</h1>
      <p className="ledger-case-status">{project.status}</p>
    </header>
  );
}
