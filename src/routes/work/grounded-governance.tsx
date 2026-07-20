import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { LedgerShell } from "../../components/layout/ledger-shell";
import { LensPill } from "../../components/lens/lens-pill";
import { ArtifactFrame } from "../../components/product/artifact-frame";
import { BlockRenderer } from "../../components/product/block-renderer";
import { Prose } from "../../components/prose";
import { LENS_LABELS, LensProvider, useLens } from "../../content/lens-context";
import { composeArtifact, findQuoteBlock } from "../../content/product-essay";
import { projects } from "../../content/projects";
import "../../styles/product-essay.css";

/**
 * `/work/grounded-governance` — the Founder/PM-default build essay
 * (BUILD-SPEC §9.3). This route mounts its own `LensProvider` (a fresh
 * instance, not the landing page's) since a visitor may land here
 * directly, e.g. `/work/grounded-governance?lens=engineer`, without ever
 * visiting `/` — see this file's own copy of the precedence rule in
 * `lens-context.tsx`: URL param → localStorage → the honest default.
 *
 * `/work/automjet` is intentionally NOT built here or anywhere yet — see
 * this step's report. Nothing in this file assumes a shared `$slug` route
 * exists; Automjet's later pass can add its own
 * `src/routes/work/automjet.tsx` reusing `ArtifactFrame`/`BlockRenderer`
 * unchanged.
 */
export const Route = createFileRoute("/work/grounded-governance")({
  component: GroundedGovernancePage,
  head: () => ({
    meta: [
      { title: "Grounded Governance — Prashant Singh" },
      {
        name: "description",
        content:
          "A source-grounded AI-governance assistant, read three ways: a screening summary, a build memo, or a design review with an honest eval story.",
      },
    ],
  }),
});

function GroundedGovernancePage() {
  return (
    <LensProvider>
      <LedgerShell>
        <LensPill />
        <GroundedGovernanceEssay />
      </LedgerShell>
    </LensProvider>
  );
}

function GroundedGovernanceEssay() {
  const project = projects.find((p) => p.slug === "grounded-governance");
  const { lens } = useLens();

  const articleRef = useRef<HTMLElement | null>(null);
  const previousLensRef = useRef<string | null | undefined>(undefined);
  const [announcement, setAnnouncement] = useState("");

  // Lens-switch focus management + live-region announcement (§9.5).
  // Skipped on the very first render (initial hydration from URL/
  // localStorage isn't a user-driven "switch"); fires on every change
  // after that, including the first time a lens is actively chosen.
  useEffect(() => {
    if (previousLensRef.current === undefined) {
      previousLensRef.current = lens;
      return;
    }
    if (previousLensRef.current === lens) return;
    previousLensRef.current = lens;
    articleRef.current?.focus();
    setAnnouncement(
      lens ? `Reading as ${LENS_LABELS[lens]}. Content recomposed.` : "Reading the default composition.",
    );
  }, [lens]);

  if (!project?.essay) {
    return (
      <p className="ledger-artifact-missing">
        Grounded Governance's build essay isn't available yet.
      </p>
    );
  }

  const { essay } = project;
  const composed = composeArtifact(essay, lens);
  const quoteBlock = findQuoteBlock(essay, "gg-13");

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <article
        ref={articleRef}
        tabIndex={-1}
        className="ledger-artifact-article"
        aria-label="Grounded Governance build essay"
      >
        <ArtifactFrame
          genre={composed.genre}
          productName="Grounded Governance"
          dek="A source-grounded AI-governance research assistant. Live at pact-wise-guide.lovable.app."
        >
          <BlockRenderer composed={composed.blocks} slug="grounded-governance" metrics={project.metrics} />

          {project.liveUrl ? (
            <p className="ledger-artifact-live-link">
              <a href={project.liveUrl} target="_blank" rel="noreferrer">
                Try it live ↗
              </a>
            </p>
          ) : null}

          {/* The verbatim quote reads as a conclusion, not an opener — and
              the recruiter genre's own promise ("60-90 sec read, plain
              language, outcome-first") is broken by a dense abstraction in
              its first ten seconds. So it's omitted from the record genre
              entirely and placed last, after the blocks, for memo/review. */}
          {quoteBlock && composed.genre !== "record" ? (
            <aside className="ledger-artifact-quote" aria-label="From the build plan, verbatim">
              <p className="ledger-artifact-quote-label">From the build plan, verbatim</p>
              <blockquote>
                <Prose text={quoteBlock.body} />
              </blockquote>
            </aside>
          ) : null}
        </ArtifactFrame>
      </article>
    </>
  );
}
