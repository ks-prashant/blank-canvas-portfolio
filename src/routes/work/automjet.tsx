import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { LedgerShell } from "../../components/layout/ledger-shell";
import { LensPill } from "../../components/lens/lens-pill";
import { ArtifactFrame } from "../../components/product/artifact-frame";
import { BlockRenderer } from "../../components/product/block-renderer";
import { Prose } from "../../components/prose";
import { LENS_LABELS, LensProvider, useLens, validateLensSearch } from "../../content/lens-context";
import { composeArtifact, findQuoteBlock } from "../../content/product-essay";
import { projects } from "../../content/projects";
import "../../styles/product-essay.css";

/**
 * `/work/automjet` — the second product-essay page (BUILD-SPEC §9's "two
 * product pages ★"), reusing every shared piece from the Grounded
 * Governance pass unchanged (`composeArtifact`, `ArtifactFrame` C1,
 * `BlockRenderer` C2, the lens-switch focus/`aria-live` pattern). Mounts its
 * own fresh `LensProvider`, same reasoning as the GG route: a visitor can
 * land directly on `/work/automjet?lens=engineer` without ever visiting `/`.
 *
 * Un-lensed default: `composeArtifact`'s `DEFAULT_PRODUCT_LENS` is
 * `operator` (Founder/PM), shared across both product pages by design — see
 * `src/content/product-essay.ts`'s own documented rationale. That rationale
 * (richest, already-real composition; no neutral fourth reading to invent)
 * applies identically here: Automjet's `operator`/memo artifact is also its
 * richest — the four numbered decisions with stated costs, the ranked cost
 * levers, what was cut and why — so this page doesn't override it.
 */
export const Route = createFileRoute("/work/automjet")({
  component: AutomjetPage,
  validateSearch: validateLensSearch,
  head: () => ({
    meta: [
      { title: "Automjet Sales Agent — Prashant Singh" },
      {
        name: "description",
        content:
          "A voice sales agent for a Thane Ather scooter dealership, read three ways: a screening summary shaped like its own post-call record, a build memo, or a design review of the one-way conversation ladder.",
      },
    ],
  }),
});

function AutomjetPage() {
  const { lens } = Route.useSearch();
  return (
    <LensProvider initialLens={lens ?? null}>
      <LedgerShell>
        <LensPill />
        <AutomjetEssay />
      </LedgerShell>
    </LensProvider>
  );
}

function AutomjetEssay() {
  const project = projects.find((p) => p.slug === "automjet");
  const { lens } = useLens();

  const articleRef = useRef<HTMLElement | null>(null);
  const previousLensRef = useRef<string | null | undefined>(undefined);
  const [announcement, setAnnouncement] = useState("");

  // Lens-switch focus management + live-region announcement (§9.5) — same
  // pattern as the GG route: skipped on the very first render (initial
  // hydration from URL/localStorage isn't a user-driven "switch"), fires on
  // every change after that.
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
        Automjet's build essay isn't available yet.
      </p>
    );
  }

  const { essay } = project;
  const composed = composeArtifact(essay, lens);
  // automjet-19 — the closing pull-quote — carries `depth: 'full'` (not
  // 'omit' like GG's gg-13) only on the engineer lens, so it already renders
  // in-flow via BlockRenderer for that lens. It's read separately here only
  // so every lens can see it in the margin, matching the GG page's own
  // "verbatim, unconditional" quote treatment (§9.6.3) rather than gating a
  // non-negotiable closing line behind one lens's composition order.
  const quoteBlock = findQuoteBlock(essay, "automjet-19");
  const quoteAlreadyComposed = composed.blocks.some((b) => b.block.id === "automjet-19");

  return (
    <>
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>
      <article
        ref={articleRef}
        tabIndex={-1}
        className="ledger-artifact-article"
        aria-label="Automjet Sales Agent build essay"
      >
        <ArtifactFrame
          genre={composed.genre}
          productName="Automjet Sales Agent"
          dek="A voice AI sales agent for a Thane Ather electric-scooter dealership. Live in production, ~500 calls/month."
        >
          {composed.genre === "record" ? (
            <p className="ledger-artifact-caption">
              This page is shaped like the agent's own post-call record, applied to its maker. It
              seemed only fair.
            </p>
          ) : null}

          <BlockRenderer
            composed={composed.blocks}
            slug="automjet"
            metrics={project.metrics}
            recordings={project.recordings}
          />

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
              entirely and placed last for memo; the engineer/review genre
              already composes it in-flow via BlockRenderer (automjet-19),
              so `quoteAlreadyComposed` keeps this from duplicating there. */}
          {quoteBlock && !quoteAlreadyComposed && composed.genre !== "record" ? (
            <aside className="ledger-artifact-quote" aria-label="The closing line, verbatim">
              <p className="ledger-artifact-quote-label">The closing line, verbatim</p>
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
