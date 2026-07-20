import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { LedgerShell } from "../../components/layout/ledger-shell";
import { CaseHeader } from "../../components/case/case-header";
import { CaseHonestyFooter } from "../../components/case/case-honesty-footer";
import { CaseSections } from "../../components/case/case-sections";
import { CaseSignatureVisual } from "../../components/case/case-signature-visual";
import { CaseSummary } from "../../components/case/case-summary";
import { LensPill } from "../../components/lens/lens-pill";
import { LENS_LABELS, LensProvider, useLens } from "../../content/lens-context";
import { projects } from "../../content/projects";
import type { Project } from "../../content/types";
import "../../styles/hero-lens.css";
import "../../styles/product-essay.css";
import "../../styles/case-page.css";

/**
 * `/case/$slug` — the six Tier-2 employer case-study pages (BUILD-SPEC
 * §7.4, §8.5). One dynamic route for all six, since — unlike the two
 * Tier-1 product-essay pages, which genuinely differ in content/visual
 * shape and got their own files — these six share one real page frame
 * and depth table.
 *
 * A project only renders here if it's one of the six Tier-2 slugs: it
 * must exist in the compiled roster, be `depth: 'full'`, carry no
 * `essay` (that would make it Tier-1, routed under `/work/$slug`
 * instead), and have `sections` compiled for every lens (the case-page-
 * specific field, §7.2) — anything else 404s via the root route's
 * `notFoundComponent`, same as an unknown slug.
 */
function isCasePageProject(project: Project | undefined): project is Project {
  if (!project) return false;
  if (project.essay) return false;
  if (project.depth !== "full") return false;
  return (
    Boolean(project.lenses.recruiter.sections) &&
    Boolean(project.lenses.operator.sections) &&
    Boolean(project.lenses.engineer.sections)
  );
}

export const Route = createFileRoute("/case/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!isCasePageProject(project)) {
      throw notFound();
    }
    return { project };
  },
  component: CasePageRoute,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.project.name} — Prashant Singh` : "Case study — Prashant Singh",
      },
      {
        name: "description",
        content: loaderData
          ? loaderData.project.lenses.operator.summary.slice(0, 155)
          : "An employer case study, read three ways.",
      },
    ],
  }),
});

// The un-lensed default composition (§9.5's "server-renders complete"
// rule, mirrored here from `content/product-essay.ts`'s
// `DEFAULT_PRODUCT_LENS`): before a lens is picked, this page still needs
// one real, complete set of sections to render, not a thinner fourth
// pass. Founder/PM is the richest source material by the same logic
// documented there, so it's the default here too. `LensPill` still shows
// the true "Unlensed" state — only the body content resolves early.
const DEFAULT_CASE_LENS = "operator" as const;

function CasePageRoute() {
  const { project } = Route.useLoaderData();

  return (
    <LensProvider>
      <LedgerShell>
        <LensPill />
        <CasePage project={project} />
      </LedgerShell>
    </LensProvider>
  );
}

function CasePage({ project }: { project: Project }) {
  const { lens, setLens } = useLens();
  const resolvedLens = lens ?? DEFAULT_CASE_LENS;
  const copy = project.lenses[resolvedLens];

  const articleRef = useRef<HTMLElement | null>(null);
  const previousLensRef = useRef<string | null | undefined>(undefined);
  const [announcement, setAnnouncement] = useState("");

  // Lens-switch focus management + live-region announcement (§9.5),
  // same pattern as `/work/grounded-governance` and `/work/automjet`:
  // skipped on first render (hydrating from URL/localStorage isn't a
  // user-driven "switch"), fires on every change after that.
  useEffect(() => {
    if (previousLensRef.current === undefined) {
      previousLensRef.current = lens;
      return;
    }
    if (previousLensRef.current === lens) return;
    previousLensRef.current = lens;
    articleRef.current?.focus();
    setAnnouncement(
      lens
        ? `Reading as ${LENS_LABELS[lens]}. Sections recomposed.`
        : "Reading the default composition.",
    );
  }, [lens]);

  if (!copy.sections) {
    // Defensive only — `isCasePageProject` already guarantees this for
    // all three lenses before this component ever mounts.
    return null;
  }

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <article
        ref={articleRef}
        tabIndex={-1}
        className="ledger-artifact-article"
        aria-label={`${project.name} case study`}
      >
        <CaseHeader project={project} />
        <CaseSummary lens={resolvedLens} copy={copy} />
        <CaseSignatureVisual project={project} />
        <CaseSections sections={copy.sections} metrics={project.metrics} />
        <CaseHonestyFooter activeLens={resolvedLens} lensesData={project.lenses} onSwitch={setLens} />
      </article>
    </>
  );
}
