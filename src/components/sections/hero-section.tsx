import { heroCopy } from "../../content/lenses";
import { unlensedHeroCopy, unlensedHeroSubline, heroReceipts } from "../../content/lens-picker-copy";
import { useLens } from "../../content/lens-context";
import { LensPicker } from "../../components/lens/lens-picker";
import { LensReceipt } from "../../components/lens/lens-receipt";
import { projects } from "../../content/projects";
import type { Lens, Project } from "../../content/types";
import { Prose } from "../../components/prose";

/**
 * BUILD-SPEC §11 Step 5. New landing work, assembled per §17.3's ordering:
 * the hero mark + thesis (constant across lenses) → the two live-product
 * entries → the lens picker (the site's one clarifying question),
 * "proof above the fold, the question after the proof." Rendered above
 * the six Step 4 sections in `src/routes/index.tsx`.
 *
 * `LensProvider` (and the sticky `LensPill`) are mounted one level up, in
 * `src/routes/index.tsx`, wrapping this section AND the six Step 4
 * sections below it — so the pill is genuinely global and any section can
 * opt in to `useLens()` without a rewrite. See this step's report for
 * exactly what does/doesn't consume it yet.
 */
export function HeroSection() {
  return (
    <section className="ledger-hero-block" id="top">
      <HeroCounterEntry />
      <LiveProductEntries />
      <LensPicker />
    </section>
  );
}

/**
 * `HeroCounterEntry` (C9) — DESIGN-PLAN §6, exactly: ~12 paired marks, an
 * ink mark above the baseline (what it bought) and a red mark below (what
 * it cost), heights varying, deliberately abstract and NOT tied to any
 * product's real internals (two earlier hero designs died for counting
 * something that got retired — see DESIGN-PLAN §6's "two superseded
 * designs" note). Pure CSS keyframe animation (no JS) so it fills once on
 * load even with JS disabled; `src/styles.css`'s global
 * `prefers-reduced-motion` kill-switch already forces `animation: none`,
 * which renders the final state instantly, satisfying C9's requirement
 * without a second code path.
 */
const MARK_PAIRS: { ink: number; red: number }[] = [
  { ink: 62, red: 18 },
  { ink: 40, red: 34 },
  { ink: 78, red: 10 },
  { ink: 26, red: 52 },
  { ink: 54, red: 22 },
  { ink: 88, red: 8 },
  { ink: 33, red: 40 },
  { ink: 60, red: 28 },
  { ink: 46, red: 46 },
  { ink: 70, red: 16 },
  { ink: 24, red: 60 },
  { ink: 82, red: 12 },
];

function HeroCounterEntry() {
  return (
    <div className="ledger-hero-mark">
      <div className="ledger-hero-mark-row" role="img" aria-hidden>
        {MARK_PAIRS.map((pair, i) => (
          <span className="ledger-hero-mark-pair" key={i} style={{ animationDelay: `${i * 45}ms` }}>
            <span className="ledger-hero-mark-ink" style={{ height: `${pair.ink}px` }} />
            <span className="ledger-hero-mark-baseline" />
            <span className="ledger-hero-mark-red" style={{ height: `${pair.red}px` }} />
          </span>
        ))}
      </div>
      <h1 className="ledger-hero-thesis">
        I build systems that stay honest under pressure. Two are in production. You&rsquo;re reading
        the third.
      </h1>
      <HeroSubCopy />
    </div>
  );
}

/** The lens-adapted sub-copy beneath the constant thesis line. Un-lensed
 * default renders the honest generalist read (content/lens-copy.md BLOCK
 * 00 · Unlensed, quoted verbatim — see lens-picker-copy.ts); each named
 * lens reads its own compiled `heroCopy` entry (src/content/lenses.ts,
 * BUILD-SPEC §8.6: genuinely different arguments, not just re-worded). */
function HeroSubCopy() {
  const { lens } = useLens();

  if (!lens) {
    return (
      <div className="ledger-hero-subcopy">
        <p><Prose text={unlensedHeroCopy} /></p>
        <p className="ledger-hero-subcopy-clarify"><Prose text={unlensedHeroSubline} /></p>
      </div>
    );
  }

  return (
    <div className="ledger-hero-subcopy">
      <p><Prose text={heroCopy[lens]} /></p>
      <LensReceipt>{heroReceipts[lens]}</LensReceipt>
    </div>
  );
}

/**
 * The two `LiveProductEntry` rows (C18) — pulsing ink dot (never colored —
 * `--ink`, not `--red`, §5.2's rule that red means cost only), a
 * plain-language metric line drawn from the compiled per-lens summary
 * (`Project.lenses[lens].summary`, itself authored with a different
 * argument per lens), "Open the build →" (to the not-yet-built
 * `/work/$slug` route — expected to 404 until Step 6) and "Try it live ↗"
 * only where a real `liveUrl` exists (automjet has none yet, per OQ7 —
 * that button is simply omitted rather than inventing a URL).
 */
function LiveProductEntries() {
  const automjet = projects.find((p) => p.slug === "automjet");
  const groundedGovernance = projects.find((p) => p.slug === "grounded-governance");

  return (
    <div className="ledger-live-entries">
      {automjet ? <LiveProductEntry project={automjet} /> : null}
      {groundedGovernance ? <LiveProductEntry project={groundedGovernance} /> : null}
    </div>
  );
}

/** First 1–2 sentences of a longer compiled paragraph, for a "plain-
 * language metric line" — kept short by truncating real authored prose,
 * never by hand-typing a new line. */
function leadSentences(text: string, maxSentences = 2, maxChars = 200): string {
  const sentences = text.split(/(?<=[.!?])\s+/).slice(0, maxSentences).join(" ");
  if (sentences.length <= maxChars) return sentences;
  return `${sentences.slice(0, maxChars).trimEnd()}…`;
}

function LiveProductEntry({ project }: { project: Project }) {
  const { lens } = useLens();
  const line = lens ? leadSentences(project.lenses[lens].summary) : project.status;
  const receipt = lens
    ? project.essay?.blocks.find((b) => b.id === `${project.slug}-01`)?.treatments[lens as Lens]
        ?.receipt
    : undefined;

  return (
    <div className="ledger-live-entry">
      <span className="ledger-live-dot" aria-hidden />
      <div className="ledger-live-entry-body">
        <p className="ledger-live-entry-name">{project.name}</p>
        <p className="ledger-live-entry-line"><Prose text={line} /></p>
        {receipt ? <LensReceipt>{receipt}</LensReceipt> : null}
        <div className="ledger-live-entry-links">
          <a className="ledger-live-entry-link" href={`/work/${project.slug}`}>
            Open the build →
          </a>
          {project.liveUrl ? (
            <a
              className="ledger-live-entry-link"
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
            >
              Try it live ↗
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}
