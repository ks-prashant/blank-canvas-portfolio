// `composeArtifact` — the pure derived-state function behind BUILD-SPEC §9's
// "one content pool, three artifacts" mechanic (§9.1, §9.4's "pure
// client-side lookup over `ProductEssay.artifact[lens].order` — no reflow
// tricks, a real re-render"). Given a `ProductEssay` and a `Lens`, returns
// the ordered, depth-filtered, per-lens-treated block list that
// `BlockRenderer` (C2) needs, plus the genre for `ArtifactFrame` (C1).
//
// Reusable as-is by Automjet's later pass — nothing here is
// Grounded-Governance-specific.

import type { ContentBlock, Lens, LensTreatment, ProductEssay } from "./types";

export interface ComposedBlock {
  block: ContentBlock;
  treatment: LensTreatment;
}

export interface ComposedArtifact {
  genre: "record" | "memo" | "review";
  blocks: ComposedBlock[];
}

/**
 * The un-lensed default composition (§9.5: "the default composition
 * server-renders complete"). `ProductEssay.artifact` has no fourth,
 * lens-less entry in the type system (§7.2) — a product essay page has to
 * pick one of the three real compositions to show before a visitor (or a
 * crawler, or a no-JS client) has chosen a lens.
 *
 * Chosen: `operator` (Founder/PM). Rationale, documented here since the
 * type system doesn't carry it: §9.4's stated build sequence calls the
 * founder/PM artifact "richest source material, default lens," and unlike
 * the landing page's genuine three-way "no lens picked yet" state, every
 * one of the three product-essay genres is already a complete, honest,
 * real composition — there's no neutral fourth reading to fall back to.
 * Defaulting to the richest real one (not inventing a thinner generic
 * pass) keeps the "everything readable with JS disabled" requirement
 * satisfied without fabricating a new genre.
 */
export const DEFAULT_PRODUCT_LENS: Lens = "operator";

export function composeArtifact(essay: ProductEssay, lens: Lens | null): ComposedArtifact {
  const activeLens = lens ?? DEFAULT_PRODUCT_LENS;
  const spec = essay.artifact[activeLens];
  const byId = new Map(essay.blocks.map((b) => [b.id, b] as const));

  const blocks: ComposedBlock[] = [];
  for (const id of spec.order) {
    const block = byId.get(id);
    if (!block) continue; // defensive — a stale id in `order` shouldn't crash the page
    const treatment = block.treatments[activeLens];
    if (!treatment || treatment.depth === "omit") continue;
    blocks.push({ block, treatment });
  }

  return { genre: spec.genre, blocks };
}

/**
 * The verbatim build-plan quote (§9.3's centrepiece requirement: quoted,
 * unchanged, in the margin, for every lens). In the compiled content pool
 * this lives as block `gg-13` (`kind: 'quote'`) — but every lens's
 * treatment for it is `depth: 'omit'`, so it never appears in any
 * `artifact[lens].order` composition (see this step's report, gap (b)).
 * Rather than skip the one thing §9.6.3 calls non-negotiable, this reads
 * the quote block directly off the pool by id and renders it unconditionally
 * alongside the composed artifact, independent of lens.
 */
export function findQuoteBlock(essay: ProductEssay, id: string): ContentBlock | undefined {
  return essay.blocks.find((b) => b.id === id);
}
