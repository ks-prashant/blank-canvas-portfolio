import type { ReactNode } from "react";

/**
 * `ArtifactFrame` (C1, BUILD-SPEC §6/§9.1) — the genre wrapper for a
 * product-essay page. Three variants, one per `ProductEssay.artifact[lens]
 * .genre`: `record` (recruiter — a screening summary), `memo` (Founder/PM —
 * a build memo), `review` (engineer — a design review + incident log).
 *
 * Written once here, generic over product name/dek/children — Automjet's
 * later builder should import this unchanged rather than writing a second
 * copy. Owns the page's `<h1>` + subtitle so the genre is "announced in the
 * page `<h1>`'s subtitle, not only visually" (§9.5) in exactly one place.
 *
 * Does NOT own the outer `<article>` — the route component does, since the
 * route also owns the lens-switch focus target and `aria-live` region
 * (§9.5), which need to wrap the whole essay including `LensPill`/picker
 * chrome that lives outside this frame.
 */

const GENRE_META: Record<
  "record" | "memo" | "review",
  { subtitle: string; readingTime: string; register: string }
> = {
  record: {
    subtitle: "a screening summary",
    readingTime: "60–90 sec read",
    register: "plain language, outcome-first",
  },
  memo: {
    subtitle: "a build memo",
    readingTime: "8–10 min read",
    register: "decision-framed, costs explicit",
  },
  review: {
    subtitle: "a design review + incident log",
    readingTime: "15+ min read",
    register: "mechanism and negative results included",
  },
};

export function ArtifactFrame({
  genre,
  productName,
  dek,
  children,
}: {
  genre: "record" | "memo" | "review";
  productName: string;
  dek: ReactNode;
  children: ReactNode;
}) {
  const meta = GENRE_META[genre];

  return (
    <>
      <header className="ledger-artifact-header">
        <p className="ledger-artifact-genre-label">
          {meta.subtitle} · {meta.readingTime}
        </p>
        <h1 className="ledger-artifact-title">
          {productName}
          <span className="ledger-artifact-subtitle"> — {meta.subtitle}</span>
        </h1>
        <p className="ledger-artifact-dek">{dek}</p>
        <p className="ledger-artifact-register">{meta.register}</p>
      </header>
      <div className={`ledger-artifact-body ledger-artifact-body--${genre}`}>{children}</div>
    </>
  );
}
