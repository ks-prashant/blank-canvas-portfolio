# Portfolio Build Specification
**Subject:** Prashant Singh — AI Product Manager & Builder
**Document purpose:** a complete, self-contained build brief. Any AI builder (Lovable + Claude Code) should be able to execute this end to end without further context.
**Source of truth for all content:** `knowledge-book/` (27 files, already written).
**Build posture:** quality-gated, not time-boxed. Two tiers: V1 (the complete site) and V2 (launch polish). Each ships when its acceptance criteria pass, not on a date.
**Revision note:** this spec was reconciled on 2026-07-17 against the working prototype after several rounds of design and content iteration. §§0, 1.2, 2, 3, 4, 4.1, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 19, 20 all changed from the original draft. The differences are load-bearing, not cosmetic — read this version, not any earlier one.

**Revision note 2 (2026-07-19):** rewritten against the ratified `STRATEGY-V2-PROPOSAL.md` after **both personal products were replaced**: Automjet is now a Retell conversation-flow agent (v5, live in Thane), and DocuFlow is retired in favor of **Grounded Governance** (live at pact-wise-guide.lovable.app). The old §9 (interactive diagrams + the 20-card traced call) is gone entirely, replaced by two lens-composed build-essay pages. The lens system is deepened from re-worded copy to different arguments/artifacts per lens (§8.6). The site thesis is now **"three systems, one discipline"** — the portfolio itself is built on the same rules as the two products it presents. Canonical product facts live in `knowledge-book/03-projects/personal-projects/{automjet,grounded-governance}/`; the pre-2026-07 product files are archived and must not be cited.

---

## 0. TL;DR for the builder

Build a portfolio that is not a brochure. It is a **derived artifact**: every fact on the site is generated from the knowledge book via a content pipeline, never hand-typed. The site's organizing spine is **eight named operating principles, grouped into four themes** (Before I build / How I decide / How I ship / What I trust), each proven by real projects across five industries.

The site runs **no LLM, ever — not at runtime, not at build time.** The one adaptive feature ("The Lens") is **hand-authored, static content**, reviewed and rewritten by Prashant, not generated. The tradeoff is stated on the page.

**The thesis is "three systems, one discipline":** two live products — a Retell voice agent in production at a real dealership, and a source-grounded AI-governance assistant — both built on the same rule (*when an instruction can drift, replace it with a structure that can't*), and the portfolio itself built as the third system on the same rules. Every site mechanism mirrors a product mechanism: the lens picker is the site's one clarifying question; lensed blocks carry "why you're seeing this" receipts; the evidence blocks refuse to personalize and say so.

**The centrepiece is §9: the two product pages as lens-composed build essays** — each rendered as a genuinely different artifact per lens (a screening summary / a build memo / a design review + incident log), anchored by two real call recordings (booked + cold, side by side) on Automjet and an honestly-reported eval story on Grounded Governance.

The differentiator is not "look, AI." It's **"look, judgment — and here's the receipt."**

---

## 1. Thesis

### 1.1 The one sentence
Most portfolios claim judgment. This one exposes it — because every number carries how it was measured, every principle carries its evidence, and the one time he said *no* is featured, not buried.

### 1.2 Why this, for this person specifically
Three facts from the knowledge book drive the entire design:

1. **He already invented a design logic, not just a design language.** His build documents run on a *what it buys / what it costs* device — the Automjet build guide's node tables carry explicit buys/costs columns and rank its cost levers; Grounded Governance's PRD converts every risk into a paired requirement and shows framework conflicts side by side *without resolving them*. Every claim carries its counter-entry. That's double-entry bookkeeping, and it matches nine years spent adjacent to the money side (AML at Infosys, RBI-compliant payouts and NBFC lending at nurture.farm, cost-sequenced vendor waterfalls at TopHire). **The site's design system, "The Ledger" (§5), takes that logic and builds a distinctive visual identity from it** — deep paper, one oxide-red accent that means *cost* and nothing else, ink that never fades to grey. The ledger *logic* is his. The ledger *look* — rich, restrained, editorial — was designed to earn it, not copy it.

2. **His rarest asset is a documented "no."** Voice screening was deliberately not shipped to senior roles because call-completion dropped into the 40s, below the human baseline. Almost no portfolio has this. It is the single most credible thing in the book and gets featured placement.

3. **His metrics already carry honesty labels.** The book distinguishes instrumented figures (35%→42% A/B test) from self-reported estimates and directional signals. Making that distinction a **visible UI element** is free — the labeling already exists — and it is exactly the "failure literacy" signal AI PM hiring managers say is missing everywhere else.

### 1.3 What we are deliberately NOT building
| Rejected | Why |
|---|---|
| Generative UI front door | Non-deterministic on the most important page. Contradicts his own principle: "read the real outcome, never infer it." A man who chose GPT-4o over a faster model *for reliability* should not gamble his homepage. |
| "Chat with my portfolio" bot | Commodity. Hundreds exist. He has two *real* live AI products — lead with those. |
| Live visitor-analytics dashboard | On a new site with no traffic, it reads as staged. Wrong note for a site whose whole pitch is honesty. |
| Terminal/macOS-desktop metaphor | Signals frontend hobbyist, not AI PM. |
| Embedded "the agent calls you" demo | Real telephony cost + real abuse surface. Not defensible. Link out instead. |
| An AI-generated Lens, with a glass box exposing the prompt | The original plan. Retired — see §8. A hand-authored lens, reviewed line by line, is more honest for a site whose whole thesis is "don't let a model invent a fact about your own career," and there's no generation step left to expose. |
| A green/teal "docs" palette, Source Serif 4 / Inter / IBM Plex Mono | The literal read of the diagrams' colors, applied site-wide. Reads as the generic AI-builder house style. Replaced by The Ledger (§5) — same underlying logic, a distinct, considered look. |

---

## 2. Locked decisions

| # | Decision | Chosen | Rationale |
|---|---|---|---|
| D1 | The Lens | **Three lenses** (Recruiter / Founder-PM / Engineer), **hand-authored static copy**, human-reviewed, persisted client-side (URL param + localStorage). No generation step, no runtime or build-time LLM call. | Removes all hallucination risk on his own career facts by construction. The compare modal (§8.4) shows all three side by side, so the mechanism stays honest and visible rather than hidden behind a toggle. |
| D2 | Automjet evidence | **Two real call recordings** — one booked test ride, one cold lead — presented as a paired listen with the extracted post-call record beneath each and the honest funnel beside them (§9.2). No live demo link until OQ7 (whether `automjet-connect-pks.lovable.app` still exists/applies) and OQ8 (recording consent) are resolved. | The cold-lead call is the credibility engine: with both outcomes present, the funnel distribution stops being a disclaimer and becomes the product working as designed. |
| D3 | Career narrative | **No dedicated `/story` route.** Folded into the journey section (the structural "why") and the questions section (the direct answers). | A page titled "Story" containing only liabilities reads as a confession booth, not honesty. The real arc — analytics → regulated payments → agentic AI — is the actual story and belongs in the journey; the hard questions belong beside the easy ones in an FAQ, not spotlighted alone. |
| D4 | Build tiers | **V1 = the complete site. V2 = launch polish only** (OG images, meta, favicon, domain, final QA). No AI-layer tier — there's no AI layer left to gate behind a V2. | Once the Lens stopped being generated, the original V1/V2 split (static site vs. AI layer) no longer describes anything real. V1 must still be independently shippable. |
| D5 | Product pages | **Lens-composed build essays** — one typed content pool per product, rendered as a genuinely different artifact per lens (screening summary / build memo / design review + incident log). All visuals static (tables, bars, state graphs, annotated excerpts) — semantic HTML, no canvas, no diagram library, no playback animation. | See §9. Replaces the retired interactive-diagram/traced-call centrepiece (2026-07-19): the trace animated the happy path and needed a disclaimer to be honest; the paired recordings *are* the honesty. |
| D6 | Naming the dealership | **Named openly.** Automjet group, Ather dealership, Thane. | Confirmed with the owner. Location corrected Navi Mumbai → Thane, 2026-07-19. |
| D7 | Design system | **The Ledger** — deep paper `#E7E7E1`, ink, **one oxide-red accent meaning cost, and nothing else**, Instrument Serif / Archivo / Martian Mono, paper grain, rules instead of cards, one committed world (no dark/light toggle). | Researched deliberately (see `DESIGN-PLAN.md`) after the original green/teal "docs" system was identified as generic AI-house style. Full tokens in §5. |
| D8 | Information architecture | **Single-scroll landing** (`how I got here · work · how I work · numbers · questions · contact`), with real sub-pages only for the eight case studies. | Multi-page navigation with tabs is not how anyone opens a portfolio. Deep pages are earned only where content genuinely can't fit inline — the two product build-essays and the six employer case studies. |
| D9 | Site thesis | **"Three systems, one discipline."** The portfolio is built as the third system on the products' own rules, and says so — hero line: *"I build systems that stay honest under pressure. Two are in production. You're reading the third."* | Ratified 2026-07-19 (`STRATEGY-V2-PROPOSAL.md` §2). This is what makes the lens personalization meaningful rather than decorative: every site mechanism mirrors a product mechanism (§8.6). |

---

## 3. Scope: V1 vs V2

**Hard rule: V1 ships standalone.** If V2 never happens, V1 is still a complete, strong portfolio.

### V1 — "The complete site"
- Design system (The Ledger, §5) + layout shell
- Content pipeline (knowledge book → typed content modules)
- Single-scroll landing: hero, the lens picker (the site's one clarifying question), two live-product entries, journey, work index, principles (grouped), numbers/audit, questions, contact — with per-lens section order and one signature visual per lens (§8.6)
- **§9: both product build-essay pages — `automjet` and `grounded-governance` — each rendered as three lens artifacts, including the paired call recordings**
- Eight full case studies: `automjet`, `grounded-governance` (own pages, §9), plus six employer case studies (`voice-screening`, `resume-shortlisting`, `drip-campaign`, `lending`, `cashback-builder`, `pii-waterfall`) with the adaptive lens-depth pattern — see the case-pages addendum, §8.5
- Five short entries (one line each, no page, no CTA — see §7.4)
- The Lens (§8) — hand-authored, all three views, persisted across the site
- Responsive, full a11y pass
- Deploy to real URL

### V2 — "Launch polish"
- OG images, meta tags, favicon, 404 page
- Custom domain (see OQ1)
- A short public build-log of real decisions from the build (optional; nice-to-have, not load-bearing — the honesty-with-receipts thesis is already carried by the audit section and the case studies)
- Final cross-browser / performance QA pass

### Explicitly out of scope (both tiers)
- Any runtime or build-time LLM call
- Any database, auth, or backend
- Any analytics dashboard
- Blog

---

## 4. Information architecture

```
/                         Single-scroll landing.
  #top                    Hero: headline, lens picker, live-product entries.
  #journey                How I got here — the nine-year arc, expandable role detail.
  #work                   Everything I've built — 13 projects, grouped by org, tiered.
  #principles             The patterns that repeat — 8 principles in 4 themed groups.
  #numbers                The audit — every metric, grouped by company (north-star first), each row evidence-tagged.
  #questions              Straight answers — FAQ, including the direct/hard questions.
  #contact                Next step.

/work/automjet            Build essay: the Retell v5 voice agent. Three lens artifacts;
                           the paired recordings (booked + cold) + annotated transcripts.
/work/grounded-governance Build essay: the governance research assistant. Three lens
                           artifacts; the honest eval story + the incident log.
/case/:slug               The six employer case studies, lens-adaptive depth (§8.5).
                           voice-screening · resume-shortlisting · drip-campaign ·
                           lending · cashback-builder · pii-waterfall
```

No `/principles`, `/scorecard`, or `/story` as standalone routes — those are landing-page sections (`#principles`, `#numbers`) or folded into `#journey`/`#questions`. No `/build-log` route in V1 — if built at all (V2, optional), it's a section, not a promoted nav item.

### 4.1 The lens picker (client-side, deterministic — not LLM)

A dedicated landing section, framed as **the site's one clarifying question** — the same design move as Grounded Governance's sufficiency check (one targeted question, never a form) and named as such on the page: *"One question, so this reads the way you need it to."*

| Lens | Their decision | Currency of proof | The argument the page makes |
|---|---|---|---|
| Recruiter | Clear the bar? Any reason to reject? | **Evidence strength** — the credibility of a number, not its size | *"Every claim here is tagged with how it was measured — including the ones that fell short."* |
| Founder / PM *(default when set — see below)* | Can this person make calls unsupervised, on limited money and time? | **Decisions where something was given up** | *"Nine years of decisions, with the costs kept on the books."* |
| Engineer | Can this PM reason about systems, or does he narrate them? | **Specificity + admitted limits** | *"Instructions drift. Structures hold. Here are the structures."* |

**The un-lensed default state is the honest "unknown source" treatment** — mirroring Automjet's unknown-lead-source opening, which never assumes a warmer relationship than the data supports: before a lens is chosen, the page renders the humble generalist read with the clarifying question offered, not the Founder lens silently pre-applied. Once chosen (URL param → localStorage → picker, in that precedence), Founder/PM is the richest and recommended view.

Picking a lens **re-argues the page, not just its prose** (§8.6): section order, evidence set, and one signature visual change per lens; on case pages the whole section set changes (§8.5); on the two product pages the entire artifact genre changes (§9). Persistence: a nav pill (`Reading as: Engineer ▾`) stays visible everywhere, the choice is carried in the URL (`?lens=engineer`) and `localStorage`, and the compare view (§8.4) shows all three side by side on demand.

---

## 5. Design system — "The Ledger"

### 5.1 The rule everything hangs on
**Take the ledger's logic. Reject the ledger's look.** A visitor should never think "this looks like accounting." They should feel *precise, honest, paired, and expensive.* Every design decision below is tested against: *would a designer call this rich, or would an accountant call this familiar?* Second answer means it's wrong.

| Keep (the logic) | Kill (the costume) |
|---|---|
| Duality — no claim without its counter-entry | Column headers, totals rows |
| Red means cost. One accent, semantic, never decorative | Greenbar / accounting-paper stripes |
| Precision — figures align, nothing approximate | `ENTRY 01` labels, literal balance-sheet layout |
| Rules organise, not boxes | Sepia, aged paper, ornament |
| The margin annotates | Anything resembling accounting software |

### 5.2 One committed world
No light/dark toggle. The 2026 default everywhere is dark-monochrome-plus-acid-accent; a committed **light** world with real substance is the rarer, more considered choice right now, and it matches the diagrams. Not white, not cream (the single most-flagged AI-cliché palette) — deep paper with tooth.

```css
:root {
  --paper:        #E7E7E1;   /* deep neutral paper, has body */
  --paper-lift:   #EFEFEA;   /* rare raised surface only */
  --ink:          #15181E;   /* blue-black, never neutral */
  --ink-soft:     #5C6169;
  --ink-faint:    #8B9098;
  --rule:         #CFCFC8;   /* hairline */
  --rule-strong:  #B4B4AC;
  --red:          #B23A26;   /* THE ONLY CHROMATIC COLOUR ON THE SITE */
  --red-wash:     #E8D5CF;   /* rare fill, e.g. behind a "didn't ship" block */
}
```

**`--red` means "what it costs." Nothing else.** Not errors, not warnings, not links, not emphasis, not "live" status (that's a slow-pulsing ink dot). Every red mark on the site is a liability being declared — a disclosed gap, a metric that fell short of its own bar, a deliberate no. Ten values in the palette; one of them is a colour. That discipline is what makes it read as designed rather than generated.

**Rule:** style through tokens only. Never hardcode a hex in a component.

### 5.3 Typography

| Role | Face | Used for |
|---|---|---|
| Display | **Instrument Serif** | Headlines, section titles, memo headings, big figures. Weight 400 only — it has no bold; lean on size and the display/mono contrast instead. |
| Body / UI | **Archivo** | Paragraphs, controls, nav. Weights 400/500/600/700. Explicitly not Inter. |
| Mono | **Martian Mono** | Labels, IDs, durations, eyebrows, tabular figures, source tags. Weights 400/500. |

Type scale (px): `9.5 · 10.5 · 11 · 12 · 13 · 13.5 · 15 · 17 · 19 · 21 · 23 · 25 · 28 · 40 · 62–88 (hero, clamp)`.
Numbers in columns: `font-variant-numeric: tabular-nums`, always.
Running text measure: 60–72ch depending on section.
Font delivery: self-host (woff2), latin subset only, no CDN — see §5.7 for how the prototype embeds them.

### 5.4 Space, geometry, motion
- Spacing scale: `4 8 12 16 24 32 48 64 96`.
- Radius: **4px** everywhere, or **0** (rules have no radius). Never `rounded-lg`/`rounded-xl`.
- **No cards.** Elevation is a `1px solid var(--rule)` rule, not a border-radius box with a shadow. This is the single biggest correction from the original draft — a ledger has lines, not boxes.
- Layout: asymmetric grid, ~2/12 left margin as a working annotation zone (source tags, caveats, expandable detail), content ~8/12. Never centered.
- Motion: sections and rules **post into place** (~120–500ms, sharp ease-out, slight overshoot on interactive marks) — they don't fade. The one genuinely animated element is the hero counter-entry mark filling once on load (C9). Everything else: 150ms hover/focus, nothing else moves. (The trace playback is retired — nothing on the product pages animates.)
- `prefers-reduced-motion: reduce` → all fills/reveals render final state instantly; step-through controls remain usable.

### 5.5 Texture
A fixed, full-page grain overlay (`feTurbulence` SVG, ~5% opacity, `mix-blend-mode: multiply`) — felt, not seen. This is what stops the flat paper from reading as a screen. Borrowed from risograph/spot-color practice, not decoration.

### 5.6 Anti-patterns (hard bans)
Warm-cream + terracotta; purple→blue gradient heroes; emoji as section markers; centered-everything; accent bars on rounded cards; "AI-powered" copy; `rounded-lg` defaults; any second color competing with red for meaning; dark-mode-as-default; Inter as the body face.

### 5.7 Provenance & font delivery
Design language originates from the *logic* of Prashant's own build documents (buys/costs counter-entries, risks paired with requirements, conflicts shown unresolved), refined through explicit design research into a distinct visual system — see `DESIGN-PLAN.md` for the full rationale and the directions considered and rejected. In the working prototype, Instrument Serif / Archivo / Martian Mono (latin subset, woff2) are fetched once and embedded as base64 `@font-face` data URIs, since the prototype environment has no asset pipeline. In the real build, self-host the same three families as static files under `public/fonts/`.

---

## 6. Component inventory

| # | Component | Purpose | Notes |
|---|---|---|---|
| C1 | `ArtifactFrame` | The genre wrapper per lens on the two product pages | Three variants: `record` (post-call-record fields, mono labels), `memo` (numbered decisions, memo headings), `review` (mechanism sections + incident log). Written once, reused by both products |
| C2 | `BlockRenderer` | Renders the product-page content pool per lens | Consumes `ContentBlock[]` + per-lens treatments (§7.2); order, selection, register, visuals all lens-driven |
| C3 | `PairedRecordings` | The two call audio players, side by side, equal weight | Booked + cold. Extracted post-call record beneath each; the funnel distribution *beside*, not under, the pair. Native `<audio>`, keyboard operable. [PLACEHOLDER until recordings + consent arrive — renders masked transcript excerpts instead] |
| C4 | `AnnotatedTranscript` | Transcript with margin marks showing the active node per turn | The Engineer lens's signature object: the cold call shows the ladder stepping down (`N5 declined → N7 → declined → N8 → cold`). Static, semantic HTML |
| C5 | `StateGraph` | The conversation-flow graph / the one-way ladder | Removed edges drawn **struck in red** — red is literally cost here (the back-edges were what the old design cost). Semantic HTML + CSS, no canvas |
| C6 | `IncidentLedger` | Grounded Governance's five incidents as ruled ledger rows | Each row: what happened / how caught / fix / verification. No red except where a cost is stated |
| C7 | `EvalScore` | A metric vs. its target, honest status | Renders FAIL states plainly (93.3% vs 95 ✗) — the failing first run is content, not shame |
| C8 | `LensSignature` | The per-lens landing visual | Three variants: `EvidenceLadder` (recruiter), `DecisionLedger` (founder), `StructureBoard` (engineer — 3 rows, third row is this site). Only the active lens's renders |
| C9 | `HeroCounterEntry` | The hero mark: ~12 paired marks, ink above the baseline (bought) / red below (cost), heights varying | Fills once on load, posts don't fade; `prefers-reduced-motion` renders final state. Caption: the D9 thesis line |
| C22 | `LensReceipt` | The quiet "why you're seeing this" footnote — **one per page** (post-V1 review, task #4): the landing hero, the lead block of each product essay, and the case-page summary. Opens a one-sentence rationale (§8.6). Mirrors GG's "why this applies to your system" | Demoted from per-block to per-page and restyled from an all-caps mono banner to a lowercase footnote — repeating it after ~10 blocks read as noise; case pages already carry a page-level "what the other lenses add" honesty footer |
| C23 | `UnlensedMark` | The "This block doesn't change by lens" marker | On the numbers table, evidence tags, and the documented "no" (§8.6) |
| C10 | `LensPicker` | The three lens cards on the landing page | Persists selection; drives `LensPill` and every lensed block |
| C11 | `LensPill` | Sticky "Reading as: X" indicator + menu | Global, always visible |
| C12 | `CompareModal` | Shows all three lens versions of one block side by side | §8.4 |
| C13 | `JourneyLine` | The drawn timeline with clickable company marks | Detail expands in place, not a separate page |
| C14 | `PrincipleGroup` / `PrincipleItem` | The 4-themed, 8-item expandable list | Evidence chips per item |
| C15 | `AuditGroup` / `ScoreRow` | The numbers section. **Grouped by company (post-V1 review, task #6)**, each cluster led by the north-star metric I owned with supporting metrics collapsed; each row carries a per-row evidence tag (Measured / Directional / Fell short). The documented "no" is a featured block below the clusters | Red only where a cost is declared (a "Fell short" tag/value, the featured "no") |
| C16 | `SourceTag` | Inline honesty label wherever a number appears | `instrumented` / `directional` / `disclosed-gap` |
| C17 | `TradeoffCard` | Generic buys/costs block | Used for "left without an offer," "no runtime LLM," etc. |
| C18 | `LiveProductEntry` | The two live-product rows | Pulsing ink dot (not colored), plain-language metric line, "Open the build →" + "Try it live ↗" |
| C19 | `DidntShipBlock` | Red. The honest gap or deliberate no | |
| C20 | `CaseHeader` | Metadata strip on every case page: company · role · dates · status · scale | New — see §8.5 addendum |
| C21 | `SectionLabel` | Mono eyebrow + ink dot | |

Retired from the original draft: `PersonaChips` (replaced by `LensPicker`), `GlassBox` (nothing to expose — §8). **Retired 2026-07-19 with the product replacement:** `CheckpointCard`, `CheckpointGrid`, `ParallelBracket`, `GlobalNodeWrap`, `SystemDiagram`, `DiagramControls`, `TraceRecord`, `TimingBar`, `HeroMarkRow`, and the `useTrace` hook — the architectures they rendered no longer exist, and the playback-animation pattern is deliberately not carried forward (it animated the happy path; the paired recordings replaced it).

**Definition of done, per component:** typed props, no `any`; keyboard operable; visible focus; no hardcoded color; renders correctly at 375px and 1280px; real content, never lorem.

---

## 7. Content architecture

### 7.1 The rule
**No content is ever hand-typed into a component.** All content lives in `src/content/*.ts` and in two human-editable markdown source files — `content/lens-copy.md` and `content/case-pages.md` — generated into typed modules by a Claude Code script from `knowledge-book/`. The knowledge book stays canonical; the site derives from it. If the book changes, re-run the pipeline.

### 7.2 Types

```ts
// src/content/types.ts

export type SourceLabel =
  | 'instrumented'    // A/B test, measured system metric
  | 'directional'     // real but methodologically limited (e.g. single-evaluator eval)
  | 'disclosed-gap';  // a number that fell short of its own bar, or a self-reported estimate, stated anyway

export type Org =
  | 'tophire' | 'nurture-farm' | 'ola' | 'infosys' | 'prashaste' | 'personal';

export type Lens = 'recruiter' | 'operator' | 'engineer';   // operator = Founder / PM

export interface Metric {
  label: string;
  value: string;          // "35% → 42%"
  method: string;         // "A/B test, 5 jobs, ~400 candidates"
  sourceLabel: SourceLabel;
  caveat?: string;        // travels with the number, always
}

// ——— The product-page content pool (§9): one pool per product, three
// compositions over it. This replaces the retired Checkpoint/Trace/TimingStage
// diagram types (2026-07-19).

export type BlockKind =
  | 'fact' | 'decision' | 'mechanism' | 'incident' | 'metric' | 'visual' | 'quote';

export type LensDepth = 'lead' | 'full' | 'brief' | 'omit';

export interface LensTreatment {
  depth: LensDepth;
  variant?: string;        // per-lens body override (register changes, not just cuts)
  receipt?: string;        // "why this lens shows this" — rendered by LensReceipt (C22)
}

export interface ContentBlock {
  id: string;
  kind: BlockKind;
  body: string;                          // canonical prose, traceable to the knowledge book
  visual?: string;                       // component key, e.g. "state-graph", "incident-ledger"
  source: string;                        // knowledge-book anchor — REQUIRED, no orphan claims
  treatments: Record<Lens, LensTreatment>;
}

export interface ProductEssay {
  slug: 'automjet' | 'grounded-governance';
  artifact: Record<Lens, {
    genre: 'record' | 'memo' | 'review';  // ArtifactFrame variant (C1)
    order: string[];                      // block ids, composition order for this lens
  }>;
  blocks: ContentBlock[];
}

export interface Recording {
  label: string;                     // "Booked test ride" | "Cold lead"
  src?: string;                      // absent until supplied+consented — renders transcript fallback
  record: Record<string, string>;    // the extracted post-call fields shown beneath
  annotations?: { turn: number; node: string; note?: string }[];  // AnnotatedTranscript (C4)
  caveat: string;                    // REQUIRED — the funnel context lives beside the pair
}

export interface DidntShip {
  what: string;
  why: string;
  number?: string;
}

// The Lens: hand-authored, static, reviewed. No generation metadata — there is
// nothing generated to describe.
export interface LensCopy {
  lens: Lens;
  summary: string;         // the block used everywhere a project is summarized
  sections?: CaseSection[]; // case-study pages only — see §8.5
}

export interface CaseSection {
  kind: 'problem' | 'discovery' | 'decision' | 'approach' | 'fixOrder'
      | 'metrics' | 'guardrail' | 'didntShip' | 'notUsed' | 'eval' | 'roadmap';
  depth: 'short' | 'full' | 'omit';
  body: string;             // may be empty when depth === 'omit'
}

export interface Project {
  slug: string;
  name: string;
  org: Org;
  confidential: boolean;  // ⚠ GATE — see §7.3
  status: string;
  metrics: Metric[];
  essay?: ProductEssay;          // the two personal products only (§9)
  recordings?: Recording[];      // Automjet only — the paired listen (§9.2)
  principles: string[];
  didntShip?: DidntShip;
  liveUrl?: string;
  sourceFile: string;
  depth: 'full' | 'short';       // short = one line, no page, no CTA (§7.4)
  signatureVisual?: string;      // employer case pages — §8.5
  lenses: Record<Lens, LensCopy>;
}

export interface Principle {
  slug: string;
  num: number;
  group: 'before-i-build' | 'how-i-decide' | 'how-i-ship' | 'what-i-trust';
  title: string;
  body: string;
  evidence: { projectSlug: string; note: string }[];
}
```

### 7.3 ⚠ The confidentiality gate — READ THIS

**TopHire's production prompt is TopHire's IP. It must never appear on the site.** Same for any internal artifact from nurture.farm, Ola, Infosys, or Prashaste.

Enforcement, at three layers:

1. **Data layer.** Every `Project` has `confidential: boolean`. `true` for all `tophire`, `nurture-farm`, `ola`, `infosys`, `prashaste`. `false` only for `personal` (Automjet, Grounded Governance).
2. **Component layer.** Any raw-artifact renderer must accept only projects where `confidential === false`. Runtime guard that throws in dev if violated.
3. **Content layer.** For confidential projects, every lens — including the Engineer lens — emits **description of technique only**. Never verbatim prompt text, never internal schemas.

**What IS safe to say about the drip campaign (Engineer lens, technique-level):** the outreach prompt locked the opening line, banned sign-offs entirely, tiered tone by candidate seniority, ran a wrong-vs-right phrasing table, and enforced a strict JSON output contract; the fix that mattered most wasn't the prompt, it was a second review-pass prompt that validated content before any recruiter saw it.

**What is NOT safe:** quoting rules verbatim, reproducing the JSON contract, showing the wrong/right examples as written.

**Note:** the two personal projects are `confidential: false` — their architecture, build documents, and records are fully publishable. That asymmetry is *why* §9 is built on Automjet and Grounded Governance. One extra gate for Automjet specifically: **the call recordings ship only with confirmed consent/test-call status (OQ8)**; until then, masked transcript excerpts only (numbers as `+9193***7036`, per the source docs' own convention).

### 7.4 Project roster

**Tier 1 — full build-essay page, three lens artifacts (2):**
`automjet`, `grounded-governance` — see §9. (DocuFlow is retired and archived — it appears nowhere on the site, not even as a Tier-3 line, unless Prashant decides otherwise.)

**Tier 2 — full case study, lens-adaptive (6):**
| Slug | Org | Why it's in |
|---|---|---|
| `voice-screening` | tophire | **Carries the "said no."** Non-negotiable. Signature visual: role-level go/no-go matrix. |
| `resume-shortlisting` | tophire | The bake-off (GPT/Claude/DeepSeek) + a real A/B (35%→42%) + a guardrail metric. Signature visual: the decline-then-recovery line. |
| `drip-campaign` | tophire | The "fix data → fix prompt → add review layer" ordering. Signature visual: V1→V2 timeline + the 3-fix ladder. |
| `lending` | nurture-farm | Regulated fintech + NBFC + the KYC diagnosis. His positioning moat. Signature visual: KYC before→after. |
| `cashback-builder` | nurture-farm | Discovery→mechanism→loop. Delivery-gated crediting. Signature visual: the earn-on-delivery loop. |
| `pii-waterfall` | tophire | $100k/yr via cost engineering at the *workflow* level. Signature visual: the cost-ascending waterfall × 3 segments. |

**Tier 3 — one line, no page, no CTA (5):**
`seller-payouts`, `checkout-optimization`, `support-chatbot`, `ola-billing`, `early-career` (Infosys + Prashaste combined).

The tiering is **evidence-driven, not effort-driven** — the book itself notes that Ola, Infosys, and Prashaste have resume-level source material only, and that splitting them further "would outrun what's actually documented." A missing CTA on Tier 3 is honest; a CTA leading somewhere thin is a small lie, and this site can't afford those.

### 7.5 The eight principles, grouped into four themes
From `knowledge-book/05-methodology.md`:

**Before I build**
1. `chase-the-bottleneck` — sequenced by where time was going, not a fixed roadmap
2. `discovery-first` — talk to the people doing the work, before building

**How I decide**
3. `vendor-choice-is-an-experiment` — five documented bake-offs
4. `cost-against-a-stated-bar` — ₹30/candidate was only worth it *if* it freed 3–4 hrs/day

**How I ship**
5. `phased-rollout` — 1 → 5 → 10 → all, mapped to real org structure
6. `north-star-plus-guardrail` — 35%→42%, but 1st-interview % watched so the win couldn't hide a regression

**What I trust**
7. `real-demo-not-a-deck` — a running artifact is the approval gate
8. `deterministic-not-inferred` — read the real outcome, never guess it

Each principle lists evidence **across different companies** — that cross-company repetition is the actual differentiator and must be visually obvious.

---

## 8. The Lens — hand-authored, not generated

### 8.1 What it is
Three ways to read the whole site: **Recruiter** (the outcomes), **Founder / PM** (the decisions), **Engineer** (the systems). On the landing page it reshapes the hero sub-copy, the live-product lines, and every project summary. On the six Tier-2 case pages it does more — see §8.5.

### 8.2 How it's made — and why this replaces the original generated-Lens plan
The original spec (see the revision note at the top of this document) generated lens copy at build time via a Claude API call, fact-checked it with a deterministic eval harness, and exposed the prompt and generation metadata in a "glass box." That was retired for a simpler, more honest reason: **a hand-authored lens has nothing to hide, because there is nothing generated.**

```
knowledge-book/*.md
   → Claude Code drafts lens copy into content/lens-copy.md and content/case-pages.md
   → Prashant reads every block, rewrites what he wants
   → a build script compiles the reviewed markdown into src/content/lenses.ts
   → served as static content, instantly, $0/visitor
```

At runtime — and at build time — the site calls **no LLM at all.** The lens switch is a client-side object lookup.

### 8.3 The tradeoff — state it on the page
A `TradeoffCard` beside the lens picker:

> **This site doesn't call an LLM — anywhere.**
> **What it buys:** instant load; $0 per visitor; zero chance of a model inventing a metric about my own career; every word reviewed by me before it shipped.
> **What it costs:** the content is fixed. It can't answer a question I didn't anticipate. If you have one, [email me](mailto:prashant.dpsrkp@gmail.com).

This is the thesis in one card. **Do not cut it.**

### 8.4 The compare view
A modal, reachable from a "compare all three" link wherever the lens picker or a lensed block appears: all three versions of that block, side by side, the active one marked, each inactive one carrying a **"read the site this way →"** button that switches the global lens. This is what keeps the mechanism honest and visible instead of hidden behind a toggle — it's the strongest single demonstration of "nothing is hidden from anyone, every view is one click away."

### 8.5 Addendum — the six case pages go further than the landing page

On the landing page, the lens changes *prose*. On the six Tier-2 case pages, it changes *which sections exist*, because a recruiter, a founder, and an engineer are reading these pages for genuinely different reasons and the knowledge book has enough depth to serve each properly.

**Shared page frame:** `CaseHeader` (company · role · dates · status · scale) → lens-specific `SummaryBlock` → the project's one **signature diagram** (visible to all three lenses, unchanged — it's the argument, not the framing) → a lens-composed set of sections → a quiet honesty marker at the foot naming what the other lenses add, linking to the compare view.

**The section kit** (`CaseSection.kind` in §7.2): `problem`, `discovery`, `decision` (a fork — options, what was chosen, why, using the +buys/−costs device), `approach`, `fixOrder` (the ordered diagnostic steps, the one that mattered most emphasized), `metrics`, `guardrail`, `didntShip`, `notUsed` (deliberate exclusions — a strong honesty signal, e.g. "no RAG," "no n8n," "no LangGraph"), `eval` (how it was measured), `roadmap`.

**Depth per lens, by section:**

| Section | Recruiter | Founder / PM | Engineer |
|---|---|---|---|
| Problem | short | full | short |
| Discovery | omit | **full** | short |
| Decision | omit | **full** | technical framing |
| Approach | outcome-framed | decision-framed | **full technical** |
| Fix-in-order | omit | the pattern | **full** |
| Metrics | plain | with method | with method |
| Guardrail | omit | full | full |
| Didn't ship / gaps | stated plainly | the reasoning | the technical why |
| Not-used | omit | omit | full |
| Eval methodology | omit | brief | full |
| Roadmap | omit | full | full |

Result: **Recruiter** ≈ a 30-second skim (problem → outcome → honest gap). **Founder/PM** = the richest view, the full decision narrative. **Engineer** = architecture, the fix-in-order, deliberate exclusions, eval methodology.

**Confidentiality applies per-section, same as everywhere** — the Engineer lens on `drip-campaign` describes technique, never quotes the artifact (§7.3).

**When a lens genuinely has nothing to add** (e.g., Engineer on `cashback-builder`, which is a business-mechanism story more than a systems one), the section says so plainly rather than manufacturing depth — that declared gap is itself an honesty signal, not a bug to fix.

### 8.6 The lens system, deepened (2026-07-19) — argument, not tone

The original lens changed *prose*. That is rung 1 of a four-rung ladder, and it read as decorative. The ratified targets: **rung 3 on the landing page, rung 4 on the two product pages.**

1. Same content, different words *(retired)*
2. Different amount of content *(§8.5 — still used on the six case pages, upgraded with rung-3 arguments)*
3. **Different argument, different evidence, different visuals** *(landing page)*
4. **A different artifact type entirely** *(the two product pages — §9)*

**The five mechanisms, all mirroring a product mechanism (D9):**

| Mechanism | What it does | Mirrors |
|---|---|---|
| **Per-lens argument** | Each lens gets its own section order, evidence set, and headline claim (§4.1's table) | GG's obligation map prioritized for *this* system |
| **Per-lens signature visual** (`LensSignature`, C8) | Recruiter: the Evidence Ladder. Founder: the Decision Ledger. Engineer: the Structure Board — whose third row is this site | Each lens's currency of proof, drawn instead of asserted |
| **Personalization with receipts** (`LensReceipt`, C22) | One quiet receipt per page states *why this lens shows this* | GG's "why this applies to your system" rationale |
| **Blocks that refuse to personalize** (`UnlensedMark`, C23) | The numbers table, evidence tags, and the documented "no" render identically in all lenses, marked *"This block doesn't change by lens. The evidence is the evidence."* | GG's grounding fence — some things the model is never allowed to vary |
| **The honest un-lensed default** (§4.1) | Before a lens is chosen: the humble generalist read, no silent pre-selection | Automjet's unknown-lead-source opening — never assume a warmer relationship than the data supports |

**The same number means different true things per lens** — e.g. `35% → 42%`: recruiter gets *"a real A/B — one of the few instrumented numbers here"*; founder gets *"shipped with a guardrail metric watched alongside, so the win couldn't hide a regression"*; engineer gets the split design, the sample, and the fact that it's the only instrumented A/B in the set. Different facts about one figure, never different figures.

---

## 9. The two build-essay pages ★

**This is the centrepiece of the site.** It needs no AI, and it is the single most differentiating thing here. It replaced the retired interactive-diagram/traced-call design on 2026-07-19 — that design animated one successful call and then needed a disclaimer admitting most calls don't go that way; when the required disclaimer carries more information than the artifact, ship the disclaimer.

### 9.1 The form: one content pool, three artifacts

Each product page is authored once as a pool of typed blocks (`ContentBlock`, §7.2), then composed into **a genuinely different artifact per lens** — different genre, order, selection, register, and visual set. The genre is the reader's own native document format; format is empathy a visitor perceives before reading a word:

| Lens | Genre (`ArtifactFrame` variant) | Length | Register |
|---|---|---|---|
| Recruiter | **`record`** — a screening summary. For Automjet, literally shaped like the agent's own post-call record (the system's output format, applied to its maker — a small caption admits the joke: *"It seemed only fair."*) | 60–90 sec | Plain language, outcome-first, zero jargon |
| Founder / PM | **`memo`** — a build memo: bet, constraints, numbered decisions with costs, what was cut, what's watched | 8–10 min | Decision-framed, costs explicit |
| Engineer | **`review`** — a design review + incident log: mechanism with real settings, the bugs, the limits | 15+ min | Precise, specific, negative results included |

Format law, inherited from §5: rules not cards, figures right-aligned and tabular, red means cost and nothing else, marks post rather than fade. A build essay is *more* native to The Ledger than an interactive diagram ever was. All visuals are **static semantic HTML** — tables, bars, state graphs, annotated excerpts. No canvas, no diagram library, no playback animation, no transport controls.

### 9.2 `/work/automjet` — the Retell v5 voice agent

**Canonical source:** `knowledge-book/03-projects/personal-projects/automjet/` (`voice-agent.md` + `retell-build-guide-v5.md`). Facts confirmed 2026-07-19: live at the Thane dealership, ~500 calls/month, funnel ~70% connect / ~40% complete / ~20% convert / ~20% cold.

**The centrepiece for every lens: the paired recordings (`PairedRecordings`, C3).** Two real calls — one booked test ride, one cold lead — side by side, equal visual weight, same system, opposite outcomes. Beneath each: the extracted post-call record (`call_status`, `model_of_interest`, `purchase_timeline`, `key_notes_for_followup`…). Beside the pair — not under it — the funnel distribution. With both outcomes present, the distribution is no longer an apology; the cold lead **is** an outcome (classification is the ladder's third rung), so the honesty requirement and the artifact are finally the same thing. The stated argument: *the outcome was read off the ending node the conversation actually reached — never inferred afterward from the transcript.*

**[PLACEHOLDER]** Recordings pending from Prashant. **Hard gate (OQ8):** audio ships only with confirmed consent or confirmed test-call status; until then `Recording.src` stays absent and the component renders masked transcript excerpts.

**Per-lens composition:**

- **Recruiter (`record`):** what it is in one line · listen to 20 seconds of either call · the two outcome-field records · scale/status strip · one line on what's *not* claimed. ~250 words.
- **Founder (`memo`):** the situation (a friend's dealership, mixed-provenance leads going cold) · the bet (an agent whose *fallback ladder is the product* — every call ends in an asset: booking > meeting > classified lead) · four numbered decisions with costs: the four-way "no" taxonomy (a mishandled busy-no throws away a callback-able lead); openings branched by `lead_source` (a false first sentence is a trust *and* compliance failure); Hindi handed off, never faked; compliance as a pre-dial gate, upstream of conversation design · the economics (cost levers **ranked**: ending bad calls fast beats every model optimization) · what was cut (real SMS, live booking — *"nail the conversation first"*) · what's watched (classification accuracy audited against reality, loop incidents ~0, early hang-ups <15s).
- **Engineer (`review`):** the conversation-flow graph (`StateGraph`, C5) with the **removed edges struck in red** — the design is the edges that don't exist · the insight that carries the page: *the transition condition is the real instruction* (the prompt said "don't interrogate"; the gate said "all five fields filled"; the gate won — fix the gate) · objection vs. decline (a question returns once; a decision steps down, never revisits) · the **annotated transcripts** (`AnnotatedTranscript`, C4): each recording's transcript with margin marks showing the active node per turn — the cold call shows the ladder stepping down live · the naturalness stack with production settings (voice 0.92–0.95, interruption 0.7–0.9, semantic endpointing, per-node turn-taking windows, sub-800ms first word, boosted Hinglish keywords) · per-node model routing · the register rewrite as a wrong-vs-right table · the post-call schema.

**Visuals:** ladder-as-funnel (founder) · no-taxonomy routing table · ranked cost levers, right-aligned tabular · the state graph with struck edges · annotated transcripts · the register table (the recruiter's one rich visual — instantly legible, obviously the product of taste).

### 9.3 `/work/grounded-governance` — the governance research assistant

**Canonical source:** `knowledge-book/03-projects/personal-projects/grounded-governance/` (canonical summary + PRD + build plan). Live at `pact-wise-guide.lovable.app`.

**The centrepiece for every lens: the honest eval story (`EvalScore`, C7).** The page quotes the build plan's own instruction to itself, verbatim, in the margin:

> *"Don't repeat 'groundedness is proven' to a stakeholder yet — say 'the foundation it depends on is proven.'"*

And then does exactly that: retrieval proven (7/7 gate) · **the first full eval run FAILED** (groundedness 93.3% vs 95 ✗ · correct-refusal 83.3% vs 90 ✗ · citation 93.8% ✓) · six root-caused fixes, item-verified · the comprehensive re-run deliberately sequenced for launch, reason stated (*"measure the finished product once rather than twice"*). A failing scorecard with the diagnosis attached is the most credible artifact on the entire site. First-run numbers always carry the interim-config caveat.

**Per-lens composition:**

- **Recruiter (`record`):** what it is in one sentence · the **Article 99 story as a three-panel strip** (asked what GDPR Art. 99 says about AI training data → Art. 99 is real but is about entry into force → the product retrieves the real text and says so instead of fabricating — the entire pitch in one example) · the metrics vs. targets, honest status · try it live. ~300 words.
- **Founder (`memo`):** the commodity problem, named by its own PRD (*"a grounded RAG demo over PDFs is a commodity"*) and answered structurally (an obligation *map*, not chat; the eval page as a product surface) · one user, chosen on purpose — the explicit refusal to design for lawyers and auditors too · the **risk → requirement ledger** (liability → no verdicts ever; staleness → dated snapshots; sprawl → a binding out-of-scope list) · sequencing as risk management (the plan *front-loads the existential risk*: groundedness proven on one framework before any breadth or polish) · the $5 episode (the eval costed from the harness's real call structure before spending; the model downshifted as an explicit lever with a written revert condition) · the deferral decision as scope discipline, in writing.
- **Engineer (`review`):** *mechanism half* — parent–child chunking and why · 630 parents / 1,573 chunks across five frameworks, each parsed to its native hierarchy (SSDF's flattened tables filed by id-prefix, never position) · hybrid retrieval + RRF + rerank + parent expansion · **the fence**: post-generation entailment validation that drops any claim its citation doesn't support — the model is never trusted to ground itself · forced tool-use vs. extended thinking as a real constraint designed around · latency measured (4.2–5.3s pre-generation) → streaming pulled into the backend phase. *Incident half* (`IncidentLedger`, C6) — five ruled rows, each: what happened / how caught / fix / verification: (1) the RLS find — the public anon key could read *and write* every table; caught by an automated scan, **verified by attempting the exploit, fixed, re-verified**; (2) `websearch_to_tsquery` silently AND-ing every word — found by the eval, not a user; (3) the silent wrong-parent link that would have raised zero errors — found by tracing, before it ever fired; (4) three malformed-tool-call crashes → fix the class, not the field; (5) the rate limiter that "failed" because fail-open was absorbing a schema-cache lag — *which is what fail-open is for* · the golden-set design (weighted toward adversarial + out-of-corpus) and the CI-runnable harness.

**Visuals:** obligation-map wireframe (tiers + applicability labels) · five-framework corpus bar · the pipeline with the fence highlighted · metrics-vs-target bars with FAIL rendered plainly · the risk→requirement ledger · the phase-gate rail (current state marked honestly) · assumed-vs-measured latency bars · the incident ledger · golden-set composition split.

### 9.4 Technical decisions

**No canvas, no WebGL, no diagram library, no animation framework.** Semantic HTML + CSS Grid/Flex throughout — every visual is structured content in the DOM: accessible, deep-linkable, selectable, responsive.

| Concern | Approach |
|---|---|
| Audio | Native `<audio>` with visible controls; transcript always present (annotated for Engineer); never autoplay |
| State graph | Ordered lists + CSS-drawn edges; removed edges as struck red rules with a mono `REMOVED BY DESIGN` label |
| Wide visuals | Each in its own `overflow-x: auto` container |
| Deep links | Every block `id="{slug}-{blockId}"` + `scroll-margin-top` — "let me show you exactly this" mid-interview |
| Lens composition | Pure client-side lookup over `ProductEssay.artifact[lens].order` — no reflow tricks, a real re-render |
| Reduced motion | Nothing here animates except the hero mark; nothing to disable |

### 9.5 Accessibility requirements

- Each essay is a `<article>` with a real heading hierarchy per section; the artifact genre is announced in the page `<h1>`'s subtitle, not only visually.
- Recordings: named `<audio>` controls, full transcript adjacent, no color-only meaning in annotations (node marks carry mono labels).
- The incident ledger and all tables are real `<table>`/`<dl>` markup, readable linearly.
- Lens switching re-renders content — focus is moved to the top of the recomposed artifact and announced via `aria-live="polite"`.
- Everything readable with JS disabled: the default (un-lensed) composition server-renders complete.

### 9.6 ⚠ Honesty requirements — non-negotiable

1. **The paired recordings are specific calls, not the average.** The funnel distribution (~500/month: ~70% connect · ~40% complete · ~20% convert · ~20% cold) renders **beside the pair, always** — `Recording.caveat` is a required field. With both outcomes shown this is context, not apology; it still must never be omitted.
2. **No audio without confirmed consent** (OQ8). Masked transcripts until then.
3. **Grounded Governance's eval status states exactly what is measured and what isn't.** The failing first run is shown, the fixes are shown, the deferral is shown with its reason, and interim numbers always carry the interim-config caveat. The site never claims "groundedness proven," and never implies the product has users it doesn't have.
4. **The unconfirmed-facts table in each canonical knowledge-book file is binding** — a fact listed as unconfirmed there (e.g. the Retell build's construction timeline) does not appear on the site in any lens.

---

## 10. Backend & infrastructure

### 10.1 There is no backend, and no build-time API call either
V1 and V2 are **fully static**, and — now that the Lens is hand-authored — there is no API call anywhere in the project, at build time or runtime. No database, no auth, no server, no edge functions, no secrets to manage.

| Decision | What it buys | What it costs |
|---|---|---|
| No LLM anywhere in the build | Instant load. $0/visitor. Zero chance a model invents a metric about my own career. Nothing to secure, nothing to rate-limit, no API key to manage. | Content is fixed. Can't answer an unanticipated question. |
| No database | Zero attack surface, zero ops | No analytics |
| Static hosting | Free, fast, CDN-cached | No personalization beyond the URL-carried lens param |

### 10.2 Hosting
Lovable's built-in deploy. Custom domain — see OQ1.

---

## 11. Build order — the exact sequence

**Repo:** `github.com/ks-prashant/blank-canvas-portfolio` (Lovable-scaffolded, synced to GitHub). **This file lives in that repo now** — if you're reading a copy of it from `my-portfolio/`, that's the stale origin; the repo's copy is authoritative.
**Division of labor for this project:** Claude Code writes **everything**. Lovable is **not** prompted to build features — it is the sandbox that holds the deploy target and serves the preview. See §12.1 for why that's different from the Grounded Governance workflow.

**Posture: extend the prototype, don't restart it.** The prototype's design system, layout shell, and most landing sections are correct and stay. What changes is the hero visual, the two product entries, the depth of the lens, and two brand-new product pages. Roughly **two-thirds of the prototype survives intact** — §11.1 is the exact inventory.

### Status at a glance — read this first in a new session

**Standing instruction, mirroring the Grounded Governance build's own convention:** whenever a step below is completed, or a session ends mid-step with meaningful progress, update its status marker and its "done when" note **in place**, in this table and in the matching step section — before ending the turn. A fresh session should be able to read this table alone and know exactly where to resume, without re-deriving it from git log.

| Step | Status | Note |
|---|---|---|
| 0 — Prototype into the repo | ✅ Done | `prototype/index.html`, 486KB, still shows retired product content (expected — ported for tokens only) |
| 1 — Local loop, clone + move + verify | ✅ Done | Cloned to `Documents/blank-canvas-portfolio`; docs/knowledge-book/content/prototype copied in; `bun install` + `bun run build` verified clean; stack corrected to TanStack Start + bun (not Vite/npm). Committed (`d9cab3d`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the same SHA |
| 2 — Port design system from prototype | ✅ Done | Tokens/fonts/grain/motion/layout shell ported into `src/styles.css` + `src/fonts.css` + `src/components/layout/`; verified live via dev server. `src/index.css` in the spec text is actually `src/styles.css` in this repo |
| 3 — Content pipeline | ✅ Done | `src/content/types.ts` written verbatim from §7.2; `content/product-essays.md` authored (19 automjet blocks, 24 grounded-governance blocks); `scripts/build-content.ts` compiles `knowledge-book/` + all three `content/*.md` files into `src/content/{projects,principles,metrics,lenses}.ts`, zod-validated, confidentiality-gated. `bun run content:build` and `bun run build` both verified clean. Committed (`e9444c1`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the same SHA. |
| 4 — Port surviving landing sections | ✅ Done | Six sections (`journey`/`work`/`principles`/`numbers`/`questions`/`contact`) built as typed React under `src/components/sections/`, reading from `src/content/{projects,principles,metrics}.ts`; wired into `src/routes/index.tsx` inside `LedgerShell`, replacing the Step 2 shell-proof placeholder. `bun run build` and `bunx tsc --noEmit` both verified clean; confirmed rendering with no console/network errors via a dev-server browser check. **Gap flagged for a future pipeline extension:** journey timeline, FAQ, and contact info have no typed pipeline module (§7.2 only covers Project/Principle/Metric/LensCopy) — hand-authored in new `src/content/site-copy.ts`, traceable per-entry to `knowledge-book/01-identity.md`, `02-career-timeline.md`, `06-positioning.md`. **CSS gap flagged:** none of the six sections' prototype classes (`.jline`, `.work-row`, `.sgroup`, etc.) had actually survived into `src/styles.css` from Step 2 — only the page-shell tokens/grid did — so this step added new `src/styles/landing-sections.css` (re-namespaced `ledger-` prefixed classes, values ported verbatim from the prototype) rather than touching `src/styles.css` itself, loaded via a side-effect import from `index.tsx`. Tier 1/2 work-index rows render as plain non-anchor list items (no CTA) since `/work/$slug` and `/case/$slug` routes don't exist until Steps 6-7; Tier 3 rows have no CTA by design (§7.4). Committed (`1f0b336`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the same SHA. |
| 5 — New hero + deepened lens | ✅ Done | `HeroCounterEntry`, honest un-lensed default, receipts, signature visuals, `LensProvider`/`LensPill` wired site-wide. **Also fixed a repo-wide bug found during verification:** raw `**bold**`/`` `code` `` markdown from `content/*.md` was rendering literally instead of as `<strong>`/`<code>` — added `src/components/prose.tsx` (`<Prose>`) and retrofitted it across Steps 4-5's rendered text; future steps should use it for any content-module field. Committed (`f459de6`) and pushed; Lovable's sandbox confirmed synced. |
| 6 — Two product pages ★ | ✅ Done | Both pages built, all six lens compositions (2 products × 3 lenses) verified live. `StateGraph`/`AnnotatedTranscript`/`PairedRecordings` (C3-C5) added to the shared infra from the GG pass. Two real bugs found and fixed during verification (not by the building agents): a content gap (GG's engineer-lens eval numbers were omitted, contradicting §9.3's "centrepiece for every lens") and a render bug (Automjet's paired-recordings visual rendered twice on the Recruiter page because two blocks shared its visual key) — see prose below for both. Committed and pushed; Lovable's sandbox confirmed synced. |
| 7 — Case pages + ship | ✅ Done | Six case pages, §13 a11y/responsive audit, and deploy all done. **V1 is live: https://genesis-folder-project.lovable.app**, confirmed serving commit `595fe7e`. |

---

### ✅ Step 0 — Get the prototype into the repo. DONE (2026-07-19).

Fetched from the artifact URL Prashant supplied (`claude.ai/code/artifact/dac19844-...`, "Portfolio V1 — Prototype v5 (The Ledger)") and saved verbatim to `my-portfolio/prototype/index.html` — 486KB, 1,683 lines, self-contained (fonts embedded as base64 `@font-face`). Not yet pushed to `blank-canvas-portfolio` — that happens as part of step 1's commit, once the repo is cloned locally.

**Confirmed by inspection: this prototype predates the product pivot.** It references `DocuFlow`, `checkpoint`, and the old Automjet architecture throughout (principles §4 evidence chips, the live-product section, etc.) — exactly what `CLAUDE.md`'s "prototype lags the docs" warning predicted. This is expected and fine: **the prototype is being ported for its design system (tokens, type, motion, layout, grain), not its content.** Step 2 below is scoped accordingly — port structure and styling, never copy product copy out of this file. All content comes from the pipeline (§7, §12.4), sourced from the current knowledge book, never from the prototype's stale text.

---

### ✅ Step 1 — Local loop, one-way sync. DONE (2026-07-19).

**⚠️ Stack correction, confirmed by inspection of the actual clone — read before touching `src/`:** this is **not** a plain Vite+React scaffold. It's **TanStack Start** (React 19, file-based routing under `src/routes/*.tsx`), Tailwind v4, shadcn/ui components already in `src/components/ui`, zod already a dependency, package manager is **bun** (`bun.lock`/`bunfig.toml` present — `npm` is not installed in this environment), and the build targets **Cloudflare Workers** via Nitro (`cloudflare-module` preset, confirmed by a clean `bun run build`). This is the exact same stack shape the Grounded Governance project landed on for the same reason (Lovable's current TanStack template) — see that project's build plan §A.0 correction note for the general pattern. **Wherever this spec or its §12 prompts say `npm`, read `bun`. Wherever they imply a hand-rolled router, read TanStack Router's file-based convention** — `/work/automjet` becomes `src/routes/work/automjet.tsx`, `/case/$slug` uses TanStack's `$param` file-naming, etc. The IA in §4 is unaffected; only the file locations and the exact routing API differ.

1. ✅ `git clone https://github.com/ks-prashant/blank-canvas-portfolio` → `Documents/blank-canvas-portfolio`.
2. ✅ Copied `BUILD-SPEC.md`, `DESIGN-PLAN.md`, `STRATEGY-V2-PROPOSAL.md`, `CLAUDE.md`, `knowledge-book/`, `content/`, `prototype/index.html` into the clone. (Stripped one stray file that came along: `knowledge-book/.claude/settings.local.json` — leftover local tool permissions from a different session, not portfolio content, not committed.) **Not yet committed** — a deliberate pause point; commit/push is a shared, visible action and gets separate confirmation.
3. ✅ `bun install` (419 packages, clean) and `bun run build` (clean, ~3.5s, correctly targets Cloudflare) both verified. Build output (`.output/`, `.wrangler/`) cleaned up afterward — it's gitignored and shouldn't be committed.
4. **Sync rule (from the Grounded Governance build's hard-won lesson):** Lovable and Claude Code write to the same `main`. Serialize access — at any moment either you're touching Lovable or Claude Code is committing, never both. After any Lovable-side change, `git pull` before resuming. Since Lovable isn't being prompted to build here, this stays nearly one-way: **Claude Code → GitHub → Lovable pulls → deploy.**

**Closed:** committed (`d9cab3d`) and pushed to `main` 2026-07-19; Lovable's sandbox `latest_commit_sha` confirmed matching via `get_project`.

---

### ✅ Step 2 — Port the design system out of the prototype. DONE (2026-07-19).

**Owner: Claude Code.** *First real build step, and deliberately the one that proves the prototype is being extended rather than replaced.*

**Correction: the real stylesheet is `src/styles.css`, not `src/index.css`** — the latter doesn't exist in this repo; §5.2's instruction was executed against the actual file.

Lifted from `prototype/index.html`'s style block (lines ~3–450), verbatim where possible:
- The nine tokens (§5.2) added to `:root` in `src/styles.css`, alongside (not replacing) the existing Tailwind v4 + shadcn/ui oklch tokens already there.
- The three self-hosted fonts extracted from the prototype's base64 `@font-face` payloads into real `.woff2` files under `public/fonts/`, referenced from new `src/fonts.css` (`@font-face` rules, `font-display: swap`, latin `unicode-range`). **Note for later:** the prototype's Archivo weights (400/600/700) are byte-identical to each other, and so are its two Martian Mono weights (400/500) — the source only actually embeds one distinct binary per family beyond Instrument Serif. Faithfully preserved as separate files per the spec's naming, but true distinct weight files may be worth sourcing before launch polish (V2) for correct bold/semibold rendering.
- The grain overlay (`.grain`, `feTurbulence` SVG data-URI, 5% opacity, `mix-blend-mode: multiply`) ported exactly, in `src/components/layout/grain-overlay.tsx`.
- Type scale, spacing scale, `--radius-ledger: 4px`, `tabular-nums`, `::selection`, `:focus-visible`, and the `prefers-reduced-motion` kill-switch all added to `src/styles.css`. The prototype has only one `cubic-bezier` timing in its entire source (the hero mark-fill) — generalized into reusable `--ease-post`/`--duration-post-*` tokens and `.ledger-post`/`.ledger-post-fast` utility classes, since the prototype itself never factored this out as a reusable primitive.
- The layout shell in `src/components/layout/ledger-shell.tsx`: the prototype's actual grid is a fixed `180px` margin column + fluid content column (`grid-template-columns:180px 1fr`), not a literal 2/12–8/12 fraction — ported the real implementation, which satisfies the spec's "narrow margin, never centered" intent.

**Done when:** a bare page in the real app is visually indistinguishable from the prototype's empty shell — same paper, same grain, same type, same margins — checked side by side at 375px and 1280px. **Verified:** wired into `src/routes/index.tsx` as a proof page, `bun run build` passed clean, and confirmed live in a dev-server browser check — `.ledger-site` background resolves to `#E7E7E1`, the grain overlay renders at 5% opacity, and the heading renders in Instrument Serif. Not yet checked side-by-side at both 375px/1280px against the prototype pixel-for-pixel — worth a final look before Step 4 ports real content into this shell. Committed (`ec90541`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the same SHA.

---

### ✅ Step 3 — The content pipeline. DONE (2026-07-19).

**Owner: Claude Code.**

`src/content/types.ts` (§7.2, copied verbatim). `content/product-essays.md` (new — 19 `ContentBlock`s for `automjet`, 24 for `grounded-governance`, every one carrying a real knowledge-book `source` anchor and per-lens `treatments`). `scripts/build-content.ts` is a deterministic markdown/regex parser + compiler (no LLM call anywhere in it) that reads `knowledge-book/` + all three `content/*.md` files and writes `src/content/projects.ts` (13 projects: 2 full essays, 6 case studies, 5 one-liners), `principles.ts` (8, curated from `05-methodology.md`, ≥2 cross-company evidence entries each, zod-enforced), `metrics.ts` (33 metrics flattened across all projects with `projectSlug` + `SourceLabel`), and `lenses.ts` (the hero copy, all three lenses). Every output is zod-validated against a mirror of `types.ts`; the confidentiality gate is enforced both as a schema `superRefine` (a confidential project may not carry an `essay` or `recordings`, and only `personal`-org projects may be non-confidential) and as a runtime guard (`assertProjectCanRenderRawArtifact`, exported from the build script for component-layer reuse) that throws given a confidential project. A raw-artifact-leak heuristic scans every confidential project's lensed prose for JSON-shaped or system-prompt-shaped text and throws if found.

**Verified:** `bun run content:build` compiles clean; `bunx tsc --noEmit` passes on the whole repo including the four generated modules; `bun run build` still builds clean with the new modules present (unconsumed — Step 4's job). Deliberately sabotaged twice to confirm the fail-loudly requirement: a `ContentBlock` with its `source` anchor blanked out failed the zod validation with a clear error, then was restored. Committed (`e9444c1`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the same SHA.

**Flagged for Prashant's review, same loop as the other two content files:**
- Unconfirmed facts omitted per the binding tables: no Automjet build-timeline/months-live claim, no `automjet-connect-pks.lovable.app` reference (OQ7), no Grounded Governance usage/traffic figure anywhere.
- `ContentBlock.id` scheme: `{slug}-{NN}` (e.g. `automjet-07`, `gg-16`), assigned in authored order; the actual per-lens reading order lives in `ProductEssay.artifact[lens].order`, not in the id numbering.
- Where `case-pages.md`'s own depth vocabulary ("technical framing," "the pattern," "brief") didn't map onto `CaseSection.depth`'s 3-value enum (`short`/`full`/`omit`), the parser maps them to the nearest of the three and a lens block with no captured body (or an explicit "not specified in the source material" gap) is forced to `omit` regardless of the §8.5 table default — documented inline in `build-content.ts`'s `CASE_DEPTH_TABLE` comment.
- `principles.ts` and per-project `metrics` in `projects.ts` are curated (hand-transcribed from the knowledge-book sections cited in each entry) rather than regex-parsed from prose, since `05-methodology.md` and the Tier-3 project files are flowing argument, not structured lists. Every fact still traces to a cited file; nothing invented.

---

### ✅ Step 4 — Port the surviving landing sections. DONE (2026-07-19).

**Owner: Claude Code.** Convert the prototype's HTML sections into typed React components reading from the pipeline — **structure and styling preserved, content re-sourced.** Per §11.1: journey, work index, principles, numbers/audit, questions, contact all port largely as-is.

Six new files under `src/components/sections/` (`journey-section.tsx`, `work-index-section.tsx`, `principles-section.tsx`, `numbers-section.tsx`, `questions-section.tsx`, `contact-section.tsx`), plus a shared `section-heading.tsx` (`SectionHeading` for the mono-eyebrow/h2/dek trio — C21 `SectionLabel` — and `SectionGrid` for the per-section margin-annotation grid). `src/routes/index.tsx` now assembles all six inside `LedgerShell`, replacing Step 2's shell-proof placeholder.

**Content sourcing, per section:**
- Work index, principles, numbers all read directly from the compiled pipeline (`src/content/{projects,principles,metrics}.ts`) — nothing hand-typed where the pipeline has the fact.
- Journey, questions (FAQ), and contact have **no typed pipeline module** — §7.2's types cover Project/Principle/Metric/LensCopy only, not career-timeline/FAQ/contact content. Per this step's instructions, these were hand-authored into new `src/content/site-copy.ts`, sourced directly from `knowledge-book/01-identity.md`, `02-career-timeline.md`, and `06-positioning.md`, with each entry's knowledge-book anchor kept as an inline comment. **Flagged as a gap for a future pipeline-extension step**, same convention as Step 3's own flagged gaps.

**A prototype-mapping gap, also flagged:** the Step 4 brief assumed classes like `.jline-rule`/`.jphase-head`/`.jmark`/`.jdetail` already existed in `src/styles.css` from Step 2 — on inspection, they don't; Step 2 only ported the page-shell tokens and the two-column grid, not any of these six sections' CSS. Since `src/styles.css` is off-limits for this step, the actual prototype CSS (verbatim values, `ledger-`-prefixed class names to match the Step 2 naming convention) was ported into a new `src/styles/landing-sections.css`, loaded via a plain side-effect `import` in `src/routes/index.tsx` rather than an `@import` inside `src/styles.css`.

**Work index tiering:** Tier 1 (`automjet`, `grounded-governance`) and Tier 2 (the six case studies) render as plain, non-anchor rows for now — `/work/$slug` and `/case/$slug` don't exist until Steps 6–7, and per §7.4's own logic ("a CTA leading somewhere thin is a small lie") a broken or dead link would be worse than no link. Tier 3 has no CTA at all, as specified. Real links land once those routes exist.

**Done when:** the landing page renders every ported section from generated content, nothing hand-typed except the flagged journey/FAQ/contact gap, and diffs against the prototype only where §11.1 says it should. **Verified:** `bun run build` and `bunx tsc --noEmit` both clean; confirmed rendering with no console or network errors via a dev-server browser check (all six sections render real pipeline content; dev server stopped afterward). Committed (`1f0b336`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the same SHA.

---

### ✅ Step 5 — The new hero and the deepened lens. DONE (2026-07-19).

**Owner: Claude Code.** The first genuinely new landing work.

- `HeroCounterEntry` (C9, `src/components/sections/hero-section.tsx`) — ~12 paired marks (ink above / red below, heights hardcoded and deliberately abstract per DESIGN-PLAN §6's "two superseded designs" lesson), pure-CSS `@keyframes` post-in animation (no JS, so it fills even with JS disabled), the D9 thesis line beneath, constant across all lenses.
- `LensProvider`/`useLens` (new `src/content/lens-context.tsx`) — precedence URL param → `localStorage` → the honest un-lensed default (`null`, never silently "operator"). Mounted once in `src/routes/index.tsx`, wrapping the hero AND the six Step 4 sections, so `LensPill` (C11, sticky "Reading as: X ▾") is genuinely global.
- `LensPicker` (C10, `src/components/lens/lens-picker.tsx`) reframed as the site's one clarifying question, honest un-lensed default state rendered until a lens is chosen, `TradeoffCard` (C17) beside it with the §8.3 copy verbatim.
- `LensReceipt` (C22) and `UnlensedMark` (C23) — new (`src/components/lens/`), wired onto the hero sub-copy, both live-product lines, and the numbers section (table + evidence groups + the documented "no").
- The three `LensSignature` visuals (C8, `src/components/lens/lens-signature.tsx`) — `EvidenceLadder`, `DecisionLedger`, `StructureBoard` — data-driven off `metrics.ts`/`principles.ts`, only the active lens's renders, beneath the picker.
- The two `LiveProductEntry` rows (C18) rewritten for Automjet/Grounded Governance, reading `Project.lenses[lens].summary` (truncated to lead sentences) and `Project.liveUrl` — Automjet's "Try it live" button is correctly omitted (no confirmed public URL, OQ7).

**Flagged gap:** `src/content/lenses.ts`'s compiled `heroCopy` only carries the three named lenses — the compiler never emitted `content/lens-copy.md` BLOCK 00's "Unlensed" paragraph. Per this step's instructions the compiler was left untouched; the unlensed hero copy and the §4.1 lens-picker table labels are hand-sourced in new `src/content/lens-picker-copy.ts`, each traceable to its markdown/spec source in that file's header comment. `CompareModal` (C12) was not built as a separate component — out of scope per this step's brief — but `LensPill`'s menu already lists all three lenses with one-click switching, which is the cheap part of "every view is one click away."

**Verified:** `bun run build` and `bunx tsc --noEmit` both clean. Dev-server browser check confirmed: (a) the un-lensed default renders on first load with no `?lens`/localStorage set, (b) picking each lens via the picker changes hero sub-copy, live-product framing, and the active `LensSignature`, and updates both the URL and `localStorage`, (c) reloading with `?lens=engineer` respects it, (d) no console errors.

**Bug found and fixed during this verification pass, root-caused rather than patched locally:** `content/lens-copy.md`, `case-pages.md`, and `product-essays.md` all use plain-markdown emphasis (`**bold**`, `` `code` ``) since they're meant to be human-edited prose (§7.1), and the compiler carries that markdown through into the compiled `src/content/*.ts` modules verbatim — but no component was converting it back, so e.g. the Engineer hero sub-copy rendered literal `**AI Product Manager who writes the backend.**` asterisks on screen. This wasn't scoped to Step 5's own new copy — a repo-wide grep found the same raw-markdown pattern **326 times** across all three content source files, meaning it would have resurfaced heavily in Steps 6-7 (case pages, product essays) if left unfixed. Added a shared `src/components/prose.tsx` (`<Prose text={...} />`, converts `**bold**` → `<strong>` and `` `code` `` → `<code className="ledger-inline-code">` in the mono face) and retrofitted it across every text-rendering spot found in Steps 4-5's output: `LensReceipt`, the hero sub-copy/live-entry lines, and the journey/principles/numbers/questions/contact sections. A small `.ledger-inline-code` rule was added to `src/styles.css` for this. Re-verified clean (zero raw `**`/backtick characters in rendered text, across all three lenses) after the fix. **Any future step (6, 7) rendering a `summary`/`body`/`method`/`caveat`/`receipt`/`note` field from a content module should use `<Prose text={...} />` rather than interpolating the raw string.**

Committed (`f459de6`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the same SHA.

---

### Step 6 — The two product pages ★

**Owner: Claude Code.** The largest new build. `ArtifactFrame` (3 genres), `BlockRenderer`, `useLensArtifact`, `StateGraph`, `IncidentLedger`, `EvalScore`, `PairedRecordings`, `AnnotatedTranscript`.

Sequence deliberately (strategy §9): **Grounded Governance founder artifact first** (richest source material, default lens), then Automjet engineer artifact (the annotated-transcript mechanic is the site's most distinctive object — prove it early), then the remaining four compositions, with the recruiter artifacts last and deliberately thin.

Recordings ship in transcript-fallback mode until **OQ8** clears.

**Done when:** §15 criteria 9–13 pass, including the §9.6 honesty requirements.

**Grounded Governance half done (2026-07-19).** Built the shared infrastructure this whole step depends on — `ArtifactFrame` (C1, generic genre wrapper), `BlockRenderer` (C2, composes `ContentBlock[]` per lens via a new `composeArtifact()` in `src/content/product-essay.ts`), `EvalScore` (C7), `IncidentLedger` (C6, real `<table>` markup), plus GG-specific static visuals (`RiskRequirementLedger`, `PhaseGateRail`, `CorpusBar`, `PipelineDiagram`, `LatencyBars`, `GoldenSetSplit`) in `src/components/product/`. Route: `src/routes/work/grounded-governance.tsx`, its own `LensProvider` instance (a visitor can land directly on this URL without ever hitting `/`). Un-lensed default composition is the Founder/PM (`operator`) memo — the type system has no fourth "un-lensed" artifact, and §9.4 calls the founder view "richest source material, default lens," so that's what renders before a lens is chosen.

**Bug found and fixed during verification, not by the building agent:** the honest eval story (§9.3's stated centerpiece "for every lens") only rendered on Recruiter and Founder/PM — block `gg-12` (the `EvalScore` metric, 93.3%/95% groundedness etc.) was authored in Step 3 with `engineer: {depth: 'omit'}` and left out of the Engineer `order` array entirely, on the reasoning that the incident ledger + golden-set blocks already carried "the engineer's version of this story." In practice neither of those blocks states the actual failing first-run numbers — only the incident mechanism and the eval harness's *targets*, never the scores that missed them. Fixed at the source: `content/product-essays.md`'s `gg-12` now has a `depth: brief` Engineer treatment (a short, technical-register restatement of the same failing numbers) and was added to the Engineer artifact's `order`, right before the closing golden-set block. Re-ran `bun run content:build`, rebuilt, and re-verified live: `93.3%` now appears on all three lenses, and the bare phrase "groundedness is proven" still appears exactly once, only inside the attributed, negated build-plan quote — never as a standalone claim.

**Verified (GG only):** `bun run build` + `bunx tsc --noEmit` clean; browser-checked all three lenses (`?lens=recruiter/operator/engineer`) for genre/register/order changes, the verbatim build-plan quote, the failing-eval numbers now present on all three, the incident ledger as real semantic markup, and no raw markdown (`Prose` used throughout, per Step 5's fix). Not yet committed — Automjet is next, then both will be committed together... *(update: committed separately per-product below, see status table timestamps)*.

**Handoff note for Automjet (left by the GG builder, useful for whoever/whatever builds it next):** `ArtifactFrame` takes `{genre, productName, dek, children}`, nothing GG-specific. `BlockRenderer` dispatches `block.visual` through a `VisualFor` switch in `block-renderer.tsx` — add Automjet's visual keys (`state-graph` for C5, `annotated-transcript`/`paired-recordings` for C3/C4) as new cases there. Build a separate `src/routes/work/automjet.tsx` (not a shared `$slug.tsx` — a dynamic route would make `/work/automjet` start rendering immediately with unimplemented visuals, silently breaking the "leave it 404ing until its own step" convention every prior step has followed). `composeArtifact()`/`DEFAULT_PRODUCT_LENS` in `src/content/product-essay.ts` are already generic and reusable as-is.

**Automjet done (2026-07-19).** Route: `src/routes/work/automjet.tsx`, reusing `ArtifactFrame`/`BlockRenderer`/`composeArtifact()` unchanged. Added `StateGraph` (C5), `AnnotatedTranscript` (C4), `PairedRecordings` (C3) in `src/components/product/automjet-visuals.tsx`, and extended `BlockRenderer`'s `VisualFor` switch (additive) with `state-graph`/`paired-recordings` cases. Un-lensed default is `operator` (Founder/PM) — same reasoning as GG, the memo composition is Automjet's richest too. The Recruiter genre's "It seemed only fair." caption (the joke that the recruiter's page is shaped like the agent's own post-call record) and the state graph's struck-red `REMOVED BY DESIGN` edges are both present and confirmed live.

**Content-pool fix found by the building agent (mirrors the GG pass's gg-12 fix):** `scripts/build-content.ts`'s variant-parsing regex had no multiline flag, so two blocks' (`automjet-03`, `automjet-19`) real second-line replacement text was silently dropped, leaving only a one-line meta-label in the compiled output that contradicted each block's own stated receipt. Fixed by merging each into a single markdown line in `content/product-essays.md` (not by touching the compiler), then re-ran `bun run content:build`. Verified live: the four-way "no" routing table and the engineer artifact's closing verbatim quote both now render their real content.

**Real bug found and fixed during my own verification pass (not by either building agent):** the Recruiter composition includes two blocks (`automjet-12` "The funnel, and the recordings" and `automjet-15` "The paired recordings, in transcript-fallback mode") that both carry `visual: "paired-recordings"` — each contributes distinct, legitimate prose, but `BlockRenderer` re-rendered the full heavy `PairedRecordings` visual (both call cards + the funnel) for every block that referenced it, so the entire visual appeared twice in a row on the page. Fixed at the render level in `src/components/product/block-renderer.tsx`: `BlockRenderer` now tracks which `visual` keys have already rendered once per page in a `renderedVisuals` set, and only the first block carrying a given visual key renders it — every block's own prose/receipt still renders regardless, so no content is lost, just the duplicate visual. Re-verified: `BOOKED TEST RIDE` (a unique string inside the visual) now appears exactly once on the Recruiter page across a fresh reload.

**Recording data reality, flagged by the building agent and confirmed:** `projects.ts`'s two `Recording` entries have `src` correctly absent (OQ8 unresolved) but also have **no `annotations` array at all** (not merely empty) and no authored turn-by-turn transcript text — only the four extracted `record` fields (one of which, `key_notes_for_followup`, is itself an authored `[PENDING]` placeholder). `AnnotatedTranscript` honestly states that per-node annotations await the same OQ8 gate rather than inventing dialogue. **This is a real content gap for Prashant to close later, not a bug** — full annotated transcripts (the "ladder stepping down live" object §9.2 calls the engineer lens's signature artifact) can't exist until real call transcripts are authored into `content/product-essays.md`, which itself can't happen until OQ8 clears and Prashant has the actual recordings to transcribe.

**Verified (both products, all six compositions):** `bun run build` + `bunx tsc --noEmit` clean; every `?lens=recruiter/operator/engineer` combination checked live on both `/work/grounded-governance` and `/work/automjet` — genre/register/order changes per lens, zero raw markdown characters anywhere (the one false-positive, `+9193***7036`, is real masked-phone-number content per the source docs' own convention, not markdown syntax), no fake audio `src` attributes, the GG build-plan quote and Automjet's closing quote both verbatim, the state graph's removed edges struck in red with the mono label, no duplicate visual rendering. Committed (`d7f7f55` GG, `d74bfdc` Automjet) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced to the final SHA.

---

### Step 7 — Case pages, then ship

**Owner: Claude Code.** The six employer case pages on the §8.5 depth table, upgraded to per-lens arguments (§8.6). Then the §13 a11y/responsive audit, Lighthouse, and deploy.

**Deploy procedure — carry the Grounded Governance lesson:** Lovable deploys **its own synced sandbox tree, not GitHub directly.** Always: push → confirm Lovable's sandbox shows the matching commit SHA → deploy → verify the live site reflects that SHA before trusting any check against it.

**Done when:** §15's V1 criteria all pass on the real URL.

**Six case pages done (2026-07-19).** Route: `src/routes/case/$slug.tsx`, one dynamic route for all six (unlike the two product pages, which got separate files — these six genuinely share one page shape and depth table). Components in `src/components/case/`: `CaseHeader` (C20), `CaseSummary`, `CaseSignatureVisual` (marked with `UnlensedMark` — constant across all three lenses per §8.5), `CaseSections` (renders whatever `CaseSection[]` the compiled data has for the active lens, skipping `depth === 'omit'`, no hardcoded depth-table logic — the table lives in the already-compiled data), `CaseHonestyFooter` (the closing "here's what the other lenses add" marker with switch links, per §8.5's shared-frame requirement — a lighter alternative to a full `CompareModal`, which wasn't built in Step 5 either). Work-index section (`src/components/sections/work-index-section.tsx`) now links Tier 1 rows to `/work/$slug` and Tier 2 to `/case/$slug`; Tier 3 stays unlinked plain text by design (§7.4).

**Note on how this step landed:** the building agent was cut off mid-task by a session limit right after finishing the six page/component files but before wiring the work-index links (its final message ended "Now let's wire the work-index-section links" — the file's doc comment had already been updated to claim this was done, but the actual JSX still rendered plain unlinked rows). Caught and completed this myself before any verification, then ran the full verification pass independently rather than trusting the interrupted agent's incomplete report.

**Verified (spot-checked 3 of 6 pages across orgs and all three lenses):** `bun run build` + `bunx tsc --noEmit` clean. `drip-campaign` Engineer lens confirmed the confidentiality gate holds — the JSON output contract, locked opening line, seniority tiering, and the review-pass are all described in technique-level detail, nothing verbatim quoted (matches §7.3's explicit allowed-disclosure list closely). `drip-campaign` Recruiter lens confirmed the depth table is followed exactly (Problem/Approach/Metrics only, Discovery/Decision/Guardrail all correctly omitted) and the signature visual (V1→V2 timeline + 3-fix ladder) renders identically across lenses. `cashback-builder` Engineer lens confirmed the "nothing to add" honesty pattern (§8.5's closing note) renders as a plain, well-written declared gap ("this is a business-mechanism story more than a systems one, and I'd rather say that than pad it") rather than manufactured depth. `lending` confirmed semantic structure (one `<h1>`, real `<article>`). Zero raw markdown on every page checked. Work-index links verified programmatically: all 13 rows checked, Tier 1/2 correctly anchored, Tier 3 correctly unlinked. Committed (`e1ee5d0`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced.

**§13 a11y/responsive audit done (2026-07-19).** Ran the checklist directly (grep-based static checks + live browser checks — no Lighthouse tool available in this environment, so its exact score is unverified; everything Lighthouse itself would flag was checked by hand instead). Found and fixed six real defects, all sitewide:

1. **Contrast failure:** `--ink-faint` (used for margin notes, mono eyebrows, receipts, oneliners — everywhere) was only 2.59:1 against `--paper`, well under WCAG AA's 4.5:1. Darkened the token from `#8B9098` to `#61656D` (4.71:1 on `--paper`, 5.07:1 on `--paper-lift`), same blue-gray hue family as `--ink`/`--ink-soft`, just darker. This is a design-system-level change (§5.2's token), not a one-off tweak — flagged here rather than silently altered, since it affects the whole site's visual hierarchy.
2. **No skip-to-content link and no `<main>` landmark anywhere** — added both to `LedgerShell` (`src/components/layout/ledger-shell.tsx`), the shared shell every page uses, so the fix applies site-wide from one place.
3. **Horizontal overflow at 320px** on the landing page: the numbers/audit table's value column (`.ledger-sv`) forced `white-space: nowrap` on some non-numeric descriptive values (e.g. "630 parents / 1,573 chunks, 5 frameworks"), and the row's `1fr` grid track couldn't shrink below that content's width. Fixed with `minmax(0, 1fr)` on the row and a `max-width: 480px` media query allowing long values to wrap. Re-verified clean at 320/375/768/1280/1920px on the landing page, both product pages, and a case page.
4. **Touch targets under 44×44px:** the live-product links, journey company chips, lens-pill dropdown items, the contact email button, the LinkedIn link, and the case-page "read this as X" switches were all measured below 44px tall. Fixed via padding (with a matching negative margin where the visible text/glyph shouldn't grow) — hit area grows, nothing shifts visually. Two exceptions left as-is and documented: the inline "email me" text link inside a paragraph (WCAG 2.5.5's standard inline-text-link exception — enlarging it would require bloating the whole paragraph's line-height) and the skip-link itself (off-screen except when keyboard-focused, not a pointer/touch target in practice).
5. **`tabular-nums` missing on the numbers/audit table's value column** (`.ledger-sv`) — every other metric-value class already had it (`EvalScore`'s `.ledger-eval-value`, reused by the case pages too); this was the one gap. Fixed directly on the CSS rule.
6. **One `box-shadow` usage** (the lens-picker's active-card indicator) — technically fine in intent (an inset accent line, not a card-elevation shadow), but converted to `border-top` anyway to keep "no box-shadow anywhere" literally true rather than relying on an interpretation of intent.

**Not independently re-verified in this pass (already covered by earlier steps' work, spot-checked again here rather than re-audited from scratch):** semantic HTML/heading hierarchy (confirmed on `lending` and the product pages), `prefers-reduced-motion` (Step 2's global kill-switch, unchanged), lens-switch focus+`aria-live` (Steps 6-7's route implementations), no color-only state encoding (`EvalScore`/`IncidentLedger` already use text glyphs, not color alone), recordings honesty (no audio exists yet, so "never autoplay" is moot until OQ8). **JS-disabled readability confirmed via raw SSR HTML fetch** for both product pages and the landing page — the default (un-lensed/operator) composition renders complete real content server-side. **One known, accepted limitation:** the `?lens=X` URL param is only applied client-side after hydration (not during SSR), so a JS-disabled visitor with a specific `?lens=` URL sees the default composition, not the requested one — this matches §4.1's own framing of the lens mechanism as "client-side, deterministic," and the actual hard requirement (real, complete content without JS) holds for the default composition on every page checked.

`bun run build` + `bunx tsc --noEmit` clean after all six fixes; re-verified live in-browser (contrast values, skip link, `<main>` presence, zero-overflow at all five required widths on four different page types, all real touch targets ≥44px). Committed (`eed033e`) and pushed to `main` 2026-07-19; Lovable's sandbox confirmed synced.

**Deployed (2026-07-19).** With explicit go-ahead, ran `deploy_project` against the synced sandbox (commit `595fe7e`). Confirmed via `get_project`: `is_published: true`, `url: https://genesis-folder-project.lovable.app`, `latest_commit_sha` matching `595fe7e` exactly — the full deploy procedure (push → confirm sandbox SHA → deploy → verify live SHA) closed clean, no step skipped.

**V1 is live.** Every §15 V1 acceptance criterion this build order covers has been built and verified across the six build steps: the six landing sections, the deepened lens system, both product build-essay pages (all six lens compositions), the six employer case pages, and the §13 a11y/responsive audit. Two things remain genuinely outside this build's control rather than unfinished work: **OQ8** (Automjet's call-recording consent, currently rendering the honest transcript-fallback framing as designed) and a formal Lighthouse run (no such tool was available in this environment — the full checklist was verified by hand instead, and every finding it turned up was fixed). V2 (OG images, custom domain, final cross-browser QA) remains open, per §3, as explicitly non-blocking for V1.

**Post-ship bug found and fixed (2026-07-19), reported by Prashant:** the hero counter-entry mark (`HeroCounterEntry`, C9) was invisible on the live deployed site, though it rendered fine in every browser check run during the build. Root cause: `.ledger-hero-mark-pair` (`src/styles/hero-lens.css`) is authored with `opacity: 0` as its unconditional base style, becoming visible only via its `ledger-hero-mark-post` fill-in animation reaching `opacity: 1`. The global `prefers-reduced-motion: reduce` kill-switch (`src/styles.css`, from Step 2) sets `animation: none !important` site-wide for any visitor with that OS/browser accessibility setting on — which cancels the animation but leaves the element frozen at its own authored `opacity: 0`, i.e. permanently invisible, exactly backwards from §13's actual requirement ("prefers-reduced-motion ... renders final state instantly"). This is why it was invisible on the deployed site but visible in every check during the build: none of those checks happened to run with reduced-motion enabled, so the bug never surfaced. **Fixed** with a targeted override — `@media (prefers-reduced-motion: reduce) { .ledger-hero-mark-pair { opacity: 1; transform: none; } }` — confirmed by simulating the kill-switch's effect directly (disabling the animation and reading the computed style: opacity now correctly resolves to `1`, previously would have been `0`). Grepped for the same anti-pattern (`opacity: 0` relying entirely on an animation to become visible) across every CSS file — this was the only occurrence. `bun run build` clean. Pushed (`9a08e9e`), redeployed with explicit go-ahead, and confirmed via `get_project`: `latest_commit_sha` matches, live at https://genesis-folder-project.lovable.app.

**Regression sweep after that bug (2026-07-19), prompted by Prashant asking "how do I know there aren't more?"** Ran a systematic pass rather than more spot-checks: grepped every `animation:` declaration in the codebase (3 total) and confirmed the hero mark was the only one with an unconditional hidden base state — the other (the live-product pulsing dot) defaults to fully visible, so disabling its animation just freezes the pulse, doesn't hide it. Wrote two small scripts, now kept as reusable tooling (`bun run qa:check`, see `scripts/qa/`):
- `check-duplicate-visuals.ts` — flags any two blocks in the same lens composition sharing a `visual` key. Surfaced that the exact bug class fixed in Automjet (§Step 6) also existed in GG's pipeline diagram and Automjet's state graph — both already resolved as a side effect of that earlier fix (it lives in the shared `BlockRenderer`), confirmed live (each now renders exactly once). Three low-severity authoring redundancies remain in the content pool (already safely deduplicated at render time, not visually broken) — worth cleaning up in `content/product-essays.md` during a future content-review pass, not urgent.
- `check-confidential.ts` — scans every `confidential: true` project's compiled section bodies, all three lenses, for JSON-contract fragments, code fences, or system-prompt phrasing. Nothing flagged.

Also crawled every route (all 9 real pages) for broken internal links (none — every link resolves, an invalid `/case/` slug correctly 404s), swept every page × every lens state (32 combinations) for raw un-rendered markdown (found 2 apparent hits, both false positives — one inside a hydration data payload never shown as text, one already correctly rendered), and confirmed no render/hydration errors on any page (all 9 return a real single `<h1>`, no error boundary triggered).

---

### 11.1 What survives from the prototype — the exact inventory

Read this before touching a section, so nothing correct gets rebuilt and nothing retired gets ported.

| Prototype element | Fate | Why |
|---|---|---|
| **Design tokens, fonts, grain, rules-not-cards, motion** | **Keep verbatim** | The Ledger is unaffected by the product change; §5 is unchanged |
| **Layout shell** (asymmetric grid, annotation margin) | **Keep** | Unchanged |
| **Journey / career line** | **Keep**, re-source content | Structure valid; unlensed per `lens-copy.md` |
| **Work index** (tiered rows) | **Keep**, new roster | Tier 1 is now `automjet` + `grounded-governance` (§7.4) |
| **Principles** (8 in 4 groups) | **Keep** | Unchanged; now also the founder lens's operating-system section |
| **Numbers / audit** | **Keep, promote, and (post-V1) regroup by company** | Now company clusters, north-star first, per-row evidence tags (task #6); still the *entire* recruiter argument (§8.6) |
| **Questions, contact** | **Keep** | Unchanged |
| **Live-product entries** | **Keep shell, replace content** | Same component, two different products |
| **Lens picker** | **Keep shell, deepen** | Prototype is rung 1 (copy swap); target is rung 3 + the un-lensed default (§4.1, §8.6) |
| **Hero mark row (17 marks)** | **Retire** | Counts an architecture that no longer exists → `HeroCounterEntry` |
| **Trace playback, both system diagrams, timing bar** | **Retire** | Products replaced; the trace animated the happy path (§9) |
| **Two product pages as build essays** | **New** | The centrepiece (§9) |
| **Lens receipts, unlensed marks, lens signatures** | **New** | §8.6 |

**The honest summary:** the landing page is mostly a port; the product pages are a genuine new build. The prototype was never wrong — it was built against products that changed underneath it.

---

## 12. Tool split — Lovable vs Claude Code

### 12.1 The boundary — revised 2026-07-19 for this repo

**Claude Code owns the entire codebase. Lovable is not prompted to build features.**

This is a deliberate departure from the Grounded Governance workflow, and the reason is simple: **this project has no backend.** Per §10.1 there is no database, no auth, no edge functions, no migrations, and no secrets. So Lovable's usual jobs there — holding keys, provisioning Postgres, applying migrations, running sandboxed data ops — **do not exist here.** Carrying that mental model over would invent coordination work that has no subject.

| Lovable owns | Claude Code owns |
|---|---|
| The sandbox that deploys, and the preview URL | **Everything in `src/`, `scripts/`, `content/`, `public/`** |
| Publishing to the live URL (`deploy_project`) | Components, pages, tokens, routing, responsive, pipeline, hooks |

**What Lovable is still genuinely needed for:** it is the deploy target. Publishing goes through it, and its sandbox — not GitHub — is what gets deployed (§12.2, step 4).

**`send_message` to Lovable's agent is a last resort here, not the loop.** It costs workspace credits and lets a second agent write to the same `main`. For a static site there is almost never a reason. Use it only if the sandbox desyncs and needs a nudge; if you do, scope it narrowly and `git pull` immediately afterward.

### 12.2 The workflow — the actual loop

1. **Write in Claude Code**, locally, against `bun dev`.
2. **Commit and push to `main`.**
3. **Confirm Lovable's sandbox synced** to that exact commit SHA. Do not assume it did.
4. **Deploy from Lovable**, then **verify the live site reports the same SHA** before trusting any check against it.

Step 4 is not ceremony — it is a real lesson from the Grounded Governance build, where `deploy_project` was found to publish **the platform's own synced sandbox tree, not GitHub directly.** A push that hasn't synced will deploy the *previous* tree and every live test after it will be measuring the wrong build.

**Sync discipline:** serialize access to `main`. Because Lovable isn't authoring here, the loop is effectively one-way (Claude Code → GitHub → Lovable → deploy). If anything is ever changed on the Lovable side, `git pull` before resuming locally.
### 12.3 ~~First Lovable prompt~~ → Design-system reference

**⚠️ Retired as a Lovable prompt (2026-07-19).** Lovable is no longer prompted to build (§12.1), and — more importantly — **the prototype is a better source for the design system than any prompt**, because it's the version that was actually agreed on screen. §11 step 2 ports the tokens, fonts, grain, and shell out of `prototype/index.html` directly.

Kept below as a **written reference for the ported values**, useful for verifying step 2 caught everything and for onboarding anyone new. If it ever disagrees with the prototype, the prototype wins.

```
Reference spec — "The Ledger." React + Vite + TypeScript + Tailwind + shadcn/ui.

This is a rich, restrained, editorial design built on one logic: every claim carries
its counter-entry (what it bought, what it cost). It should feel precise and expensive,
never like accounting software. NO gradients, NO large rounded corners, NO shadows,
NO emoji, NO cards with drop shadows, NO dark-mode toggle (this is a single committed
light world).

DESIGN TOKENS - CSS custom properties in index.css, used everywhere. Never hardcode a
hex in a component.

  --paper:#E7E7E1  --paper-lift:#EFEFEA
  --ink:#15181E  --ink-soft:#5C6169  --ink-faint:#8B9098
  --rule:#CFCFC8  --rule-strong:#B4B4AC
  --red:#B23A26  --red-wash:#E8D5CF

RED IS THE ONLY CHROMATIC COLOR ON THE SITE, AND IT MEANS ONE THING: COST. A disclosed
gap, a metric that fell short of its own bar, a deliberate "we didn't ship this." Never
use it for errors, links, warnings, or decoration. "Live" status is a slow-pulsing INK
dot, not a red or green one.

TYPE:
  Display: Instrument Serif, weight 400 only (it has no bold) - headlines, section
    titles, big figures. Use size and contrast against the mono/body faces, not weight.
  Body: Archivo, 400/500/600/700 - paragraphs, controls, nav.
  Mono: Martian Mono, 400/500 - labels, IDs, durations, source tags, all tabular figures.
  Self-host all three as woff2, latin subset, no CDN.
  Numbers in columns: font-variant-numeric: tabular-nums, always.

GEOMETRY:
  Border radius: 4px or 0. NO cards - elevation is a 1px solid var(--rule) rule between
  sections, never a bordered box with a shadow.
  Spacing scale: 4 8 12 16 24 32 48 64 96. Use flex/grid gap, not child margins.
  Layout: asymmetric grid, ~2/12 left margin for annotations (source tags, caveats),
  ~8/12 content. Never centered.

TEXTURE: a fixed, full-page grain overlay (SVG feTurbulence, ~5% opacity, mix-blend-mode
  multiply). Felt, not seen - if you can point at the grain, it's too strong.

MOTION: sections and rules POST into place (120-500ms, sharp ease-out, slight
  overshoot) - they don't fade. Everything else: 150ms hover/focus only. Respect
  prefers-reduced-motion (render final state instantly).

BUILD NOW:
1. App shell: minimal nav (text links + a sticky "Reading as: X" lens pill, no logo
   mark), footer.
2. SectionLabel: mono uppercase eyebrow with a 5px ink dot before it.
3. ArtifactFrame - the genre wrapper for the two product pages, three variants:
   - "record": a fields-and-values document (mono field labels left, values right,
     ruled rows) - like a structured summary record
   - "memo": numbered sections, serif headings, a decisions list where each entry
     carries a "+ <what it bought>" line in --ink and a "- <what it cost>" line
     in --red
   - "review": mechanism sections plus a ledger-style incident table (what happened /
     how caught / fix / verification), real <table> markup
4. EvalScore: a metric row - name, measured value, target, and a plain PASS/FAIL
   mark (glyph + word, never color alone; FAIL is not red unless it is a declared
   cost - follow the red rule).
5. StateGraph: an ordered flow of labeled nodes (CSS, no canvas) where certain
   edges render struck-through in --red with a mono label "REMOVED BY DESIGN".
6. Any wide element scrolls inside its OWN overflow-x container - the page body
   must never scroll sideways.

Sample content (real, from the project):
  memo decision: "A 'no' is four different signals" - body "Busy is a callback, a
  declined ask steps down one rung, not-interested classifies, stop-calling exits." -
  buys "No lead is burned by a misread no" - costs "Four routes to build instead of one"
  incident row: "RLS misconfiguration" / "Platform's automated security scan" /
  "RLS enabled with zero policies" / "Verified by re-attempting the exploit, not by
  trusting the setting"
```

### 12.4 First Claude Code prompt (paste verbatim)

```
Read every file in knowledge-book/ first, including the two personal-project folders'
full primary sources (automjet/retell-build-guide-v5.md, grounded-governance/source-prd.md,
grounded-governance/source-build-plan.md). Do not skim. Do NOT read anything in
_archive/ - those are retired products and must not be cited.

Then build the content pipeline that converts the knowledge book into typed content
modules for a portfolio site. This is the ONLY way content reaches the site - nothing
is ever hand-typed into a component.

1. Write src/content/types.ts with the types in BUILD-SPEC.md section 7.2
   (Project, Metric, ContentBlock, LensTreatment, ProductEssay, Recording,
   Principle, Lens, LensCopy, CaseSection, SourceLabel, Org, DidntShip).
2. Draft content/lens-copy.md and content/case-pages.md - one section per
   project x lens (and, for the six Tier-2 case studies, per section kind - see
   BUILD-SPEC.md section 8.5). These are meant to be reviewed and rewritten by
   Prashant before they're compiled, so write them as clear prose in markdown,
   not as code.
3. Write scripts/build-content.ts that compiles those two markdown files plus the
   knowledge book into:
   - src/content/projects.ts   (8 full + 5 short - roster in BUILD-SPEC.md 7.4)
   - src/content/principles.ts (8 principles in 4 groups, from 05-methodology.md,
     with cross-company evidence)
   - src/content/metrics.ts    (every metric, with its SourceLabel)
   - src/content/lenses.ts     (from the reviewed lens-copy.md / case-pages.md)
4. Validate everything with zod at build time. Fail loudly on a missing field.

CRITICAL CONSTRAINT - confidentiality:
Every Project has `confidential: boolean`. TRUE for all tophire, nurture-farm, ola,
infosys, and prashaste projects. FALSE only for automjet and grounded-governance.

For confidential projects, EVERY lens - including Engineer - gets DESCRIPTION OF
TECHNIQUE ONLY. Resume-level facts (adoption %, lifts, vendor names already in the
book) are fine. NEVER emit verbatim production prompt text or internal schemas. The
TopHire drip-campaign prompt in particular must never reach the site in any form -
describe that its rules exist (locked opening line, no sign-off, seniority tiers,
a review-pass prompt), never quote them.

Add a runtime guard that throws in dev if a component tries to render a raw artifact
from a project where confidential === true.

ESSAY DATA - this is the centrepiece, get it exactly right:
- Build the two ProductEssay pools (BUILD-SPEC.md section 9) from the canonical
  knowledge-book files ONLY. Every ContentBlock carries a `source` anchor into the
  book - a block with no traceable source is a build error.
- Automjet: the conversation-flow graph (N1-N9, 4 globals, 10 endings), the one-way
  ladder with its removed edges, the four-way "no" taxonomy, the naturalness settings,
  ranked cost levers, the compliance pre-flight, the v1->v5 learnings (voice-agent.md
  sections 3-10).
- Grounded Governance: the obligation-map design, the corpus (630 parents/1,573 chunks,
  five frameworks), the pipeline + citation-validation fence, the honest eval story
  (the FAILING first run included, with the interim-config caveat), the five-entry
  incident log, the $5 budget episode (grounded-governance.md sections 2-9).
- Recording.caveat is REQUIRED. Use the confirmed funnel (~500 calls/month: ~70%
  connect, ~40% complete, ~20% convert, ~20% cold - confirmed 2026-07-19).
- Recordings are PENDING: Recording.src stays absent; build the masked-transcript
  fallback. No audio ships before consent is confirmed (OQ8).
- The "facts needing confirmation" table in each canonical file is BINDING - an
  unconfirmed fact (e.g. the Retell build's construction timeline) must not appear
  in any block, in any lens.

THE LENS - there is no generation step. Do not write a script that calls an LLM API
anywhere in this build. content/lens-copy.md and content/case-pages.md are the only
source; your job is to draft them well and compile them, not to generate them
programmatically at build time.
```

---

## 13. UI/UX quality bar — checklist

**Accessibility**
- [ ] Body text contrast ≥ 4.5:1; large text ≥ 3:1. Check `--ink-soft` and `--ink-faint` on `--paper` and `--paper-lift`.
- [ ] Every interactive element has a visible focus ring. Never `outline: none` without a replacement.
- [ ] Full keyboard nav. Tab order matches visual order.
- [ ] Skip-to-content link, first in tab order.
- [ ] Semantic HTML: `<nav> <main> <article> <section>`. One `<h1>` per page. No heading skips.
- [ ] `prefers-reduced-motion` honored everywhere, including the hero mark fill.
- [ ] Touch targets ≥ 44×44px.
- [ ] Lens switches move focus to the recomposed artifact and announce via `aria-live="polite"`.
- [ ] Recordings: named `<audio>` controls, full transcript adjacent, never autoplay.
- [ ] **No state encoded in color alone** — glyph + label always accompany (incl. PASS/FAIL marks and transcript node annotations).
- [ ] Product pages fully readable with JS disabled (default composition server-rendered).

**Layout**
- [ ] No horizontal body scroll at 320 / 375 / 768 / 1280 / 1920px.
- [ ] Every wide element scrolls inside its **own** `overflow-x: auto` container.
- [ ] No CLS — fonts use `font-display: swap` with a metric-compatible fallback.
- [ ] Margin annotations degrade sanely below ~860px (inline or tap-to-reveal, not silently lost).

**Craft**
- [ ] `tabular-nums` on every metric column.
- [ ] Active voice, specific, no filler.
- [ ] No emoji in the UI — the source diagrams' 🟢/🟠 legend becomes `+`/`−` glyphs in ink/red.
- [ ] **Every number on the site has a `SourceTag`.** No exceptions.
- [ ] **Red appears only where something costs — never decoratively.** Audit every red usage before shipping.
- [ ] No boxes-with-shadows anywhere — rules only.
- [ ] Every `ContentBlock` on both product pages traces to its knowledge-book `source` anchor. Spot-check ten at random.

**Performance**
- [ ] Lighthouse ≥ 95 Performance, ≥ 95 Accessibility.
- [ ] Fonts subset to latin, self-hosted, 3 families.
- [ ] Zero network requests to any LLM, ever. Verify in the Network tab.

---

## 14. Engineering quality bar — checklist

- [ ] TypeScript `strict: true`. No `any`. No `@ts-ignore`.
- [ ] All content zod-validated at build. Build fails on schema violation.
- [ ] Confidentiality guard (§7.3) throws in dev.
- [ ] No API keys anywhere in the repo — there is no API call in this build.
- [ ] Lens-composition logic is a headless, unit-testable hook — no DOM assumptions.
- [ ] No `console.log` in shipped code.
- [ ] Components pure and typed. No content logic inside components.
- [ ] Deterministic build: same input → same output.
- [ ] Commit messages state the decision, not the file list.

---

## 15. Acceptance criteria

**V1 is done when:**
1. A stranger reaches a real URL and, in 90 seconds, learns what he does, sees two live products, and can open one full case study.
2. Every number on the site carries a visible source label.
3. `#principles` shows eight principles in four themed groups, each with evidence from **2+ different companies**.
4. `#numbers` (the audit) features the voice-screening "said no" prominently, as its own featured block below the company clusters.
5. `#journey` and `#questions` together address the career questions directly and calmly — no dedicated "story" page that reads as a confession booth.
6. Zero network requests to any LLM, at any point. Verified in devtools.
7. Lighthouse a11y ≥ 95. No horizontal scroll at 375px.
8. No TopHire (or any employer's) IP anywhere on the site, in any lens.
9. **Both product pages render all three lens artifacts** — switching the lens changes the genre, order, selection, register, and visual set (§9.1), not just prose. Confirmed on both pages, all three lenses.
10. **The paired recordings render with equal weight** (or the masked-transcript fallback if OQ8 is unresolved), the extracted record beneath each, and the funnel distribution beside the pair — `Recording.caveat` present whenever the pair is (§9.6).
11. **The Engineer artifact's annotated transcripts show the active node per turn**, and the cold call visibly steps down the ladder.
12. **Grounded Governance's eval story shows the failing first run, the fixes, and the deferral with its stated reason** — and never claims "groundedness proven." The build plan's "foundation is proven" quote appears verbatim.
13. **Both product pages are fully readable with JS off**, at 375px, and via screen reader.
14. **The lens picker visibly re-argues the page** on selection (section order + signature visual + copy, §8.6), the un-lensed default renders the honest generalist read, lensed blocks carry receipts (C22), the unlensed evidence blocks carry their marker (C23), and the choice **persists** across navigation via URL param + localStorage, shown by a sticky "Reading as" indicator.
15. **The compare view** shows all three lens versions of a block side by side, with working "read the site this way" switches.
16. **All six Tier-2 case pages** compose their sections per the §8.5 depth table when the lens changes — confirmed by switching lens on each and checking that Discovery/Fix-order/Not-used/Eval sections appear, disappear, or re-depth as specified.
17. **The "this site doesn't call an LLM" tradeoff card** is present beside the lens picker.
18. Tier-3 projects have **no CTA, no page** — confirmed no dead links.

**V2 is done when:**
19. OG images, meta tags, favicon, and a 404 page are in place.
20. Deployed on a custom domain (see OQ1).
21. Final cross-browser and performance QA pass complete.

---

## 16. Tradeoff ledger (for an optional public build-log, V2)

Publish these if the build-log is built. They're the site's thesis applied to itself.

| Decision | What it buys | What it costs |
|---|---|---|
| No LLM anywhere — not runtime, not build time | Instant load. $0/visitor. Zero chance a model invents a metric about my own career. Nothing to secure, no key to manage. | Content is fixed. Can't answer an unanticipated question. |
| The Lens hand-authored, not generated | Every word read by me before it shipped. No generation step to audit or expose. | Three fixed framings, not infinite. Regenerating a lens means rewriting it, not re-running a script. |
| Content derived from the knowledge book | Single source of truth. The site can't drift from the book. | The pipeline must re-run when the book changes. |
| Product pages as three lens artifacts, not one essay | Each reader gets their own native document genre — format as empathy, perceivable before reading a word. | Three compositions to author and keep honest per product. |
| Two recordings — the cold lead beside the booked one | The honest funnel becomes the content instead of a disclaimer; "the outcome is read off the ending node" is heard, not asserted. | Publishing a recording of the product failing to convert. That's the point. |
| The trace playback, killed | (Retired 2026-07-19.) The animation showed the happy path; the disclaimer carried the real information. | The one flashy interactive feature is gone; static documents have to carry the wow instead. |
| Six case pages reshape by lens, not just reword | The lens becomes substantive rather than cosmetic — the strongest demonstration of the feature. | Roughly 4x the copy to write and keep honest, across 6 projects x 3 lenses x up to 8 sections. |
| One committed design world (The Ledger), no dark/light toggle | A distinct, deliberate identity instead of the generic AI-builder default. | No "pick your preference" flexibility; the choice has to be right. |
| No database | Nothing to breach, nothing to operate. | No analytics. I won't know who visited. |
| Tier-3 projects get no CTA | A missing button is honest; a button leading somewhere thin is a small lie. | Five real projects get one line each, not a page. |

---

## 17. Key copy — write these carefully

### 17.1 The career questions (now in `#journey` and `#questions`, not a `/story` route)
Calm, short, factual. Not defensive. The frame is a **deliberate sequence**, which is what the knowledge book actually says.

In the journey's closing "why the order matters" block: the regulated-payments years aren't a detour on the way to AI — they're why the AI systems look the way they do (consent before dialing, signature verification before trust, deterministic status). Most AI PMs have never had a regulator on the other side of a decision.

In the questions section, first-open and mixed with ordinary questions (what are you looking for, where are you based) rather than spotlighted alone:
1. **Why he left TopHire** — structural, not a complaint. The product org contracted from 2 PMs + 7–8 engineers to *him alone* + 3–4 engineers. Read the results (four AI products, +140% productivity, ~25% time-to-hire cut) against that backdrop.
2. **Why he left without an offer in hand** — he couldn't run a serious interview process as the solo PM on a contracting team. So he sequenced it: leave, learn, then interview. Grounded Governance exists because of that decision. Use a `TradeoffCard`:
   > **Left without another offer lined up.**
   > **What it bought:** full attention on the search; a full retrieval product — pipeline, eval harness, and all — built solo in the gap.
   > **What it cost:** no income during the gap; a question I have to answer in every first call. Answering it here.
3. **The title** — Product Manager, not Senior. ~9.5 years total, ~5 in a PM title. State it plainly.
4. **The 2022 gap** — five months, CAT prep, 98.02 percentile, chose TopHire over an MBA. One sentence.

### 17.2 The audit's featured row
> **Voice screening, senior roles — didn't ship.**
> Call-completion dropped into the 40s against a ~60% human baseline. Tech junior and mid held at ~60%, on par with human callers, and shipped. Senior conversations were too nuanced to match a person, so those stayed human.
> *The bar was human parity. Senior roles didn't clear it.*

### 17.3 The hero
No hyperbole. Headline stays constant across all three lenses (only the sub-copy beneath it changes). Above it, the counter-entry mark (`HeroCounterEntry`, C9); the thesis line is the D9 sentence:
> **I build systems that stay honest under pressure. Two are in production. You're reading the third.**

Then the two live-product entries, then the lens picker framed as the site's one clarifying question (§4.1). Proof above the fold, the question after the proof.

### 17.4 Automjet attribution (D6 — naming confirmed)
> Built solo for the **Automjet group's Ather dealership in Thane** — a real business, owned by a friend who co-founds the group. Not a paid engagement. Live in production, ~500 calls/month.

⚠️ The old "designed, built, and deployed in about a week / live ~7–8 months" line belonged to the **retired** build and is **not confirmed** for the current Retell system (see the unconfirmed-facts table in `voice-agent.md` §11). Do not reuse it until Prashant confirms what's true of the current system — if a version of it survives confirmation, it's among the most impressive facts available and should not be buried.

---

## 18. Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| **Employer IP leaks onto the site** | Medium | Three-layer gate §7.3, applied per-lens, per-section (§8.5). Prashant reviews every case-study block before deploy. |
| **Authoring load stalls the build** (3 lenses × 2 essays × 6 case pages, all hand-written) | High — the binding constraint | One content pool per product, three *compositions* (§9.1), not three divergent essays. Sequence: GG founder artifact → Automjet engineer artifact → recruiter artifacts (deliberately thin is correct) → landing visuals. Use the declared-gap pattern aggressively. |
| **Recordings ship without confirmed consent** | Medium | OQ8 is a hard gate (§9.6). `Recording.src` stays absent until resolved; the transcript fallback is built first regardless. |
| **A stale fact from the retired builds leaks onto the site** | Medium (nearly happened with the "one week" story) | The unconfirmed-facts tables in the canonical files are binding (§9.6); `_archive/` is off-limits to the content pipeline; every `ContentBlock.source` must anchor into the current book. |
| **Six case pages become a huge, uneven writing effort** | Medium | Build the section kit + lens-depth engine once, then flesh out two exemplars (Voice Screening, Lending) fully before rolling out the other four — the same 1→5→10→all instinct the book itself documents. |
| **A lens on a case page is thin and gets padded to look complete** | Medium | Explicitly allowed to say "not much of a systems story here" (§8.5) rather than manufacture depth — that's an honesty signal, not a failure. |
| **Lovable and Claude Code fight over files** | Medium | Hard boundary §12.1. The `SystemDiagram` split (headless hook vs. presentation) is the one to watch. |
| **Site drifts back toward the generic AI-builder look** | Medium | §5.1's test — "would a designer call this rich, or would an accountant call this familiar" — applied before shipping any new component. |
| **"No LLM anywhere" reads as "he can't build AI"** | Low-Medium | Two live AI products above the fold; the tradeoff card frames the choice as judgment; the engineer artifacts (annotated transcripts, the incident log, the fence) carry the technical-depth signal instead. |

---

## 19. Open questions

| # | Question | Status |
|---|---|---|
| **OQ1** | Domain name? | **Open.** Recommendation: buy one. A Lovable subdomain undercuts the whole thing for a recruiter. ~₹1000/yr. |
| **OQ2** | Diagrams: embed or rebuild? | ✅ **Resolved — rebuild as interactive HTML.** See §9. |
| **OQ3** | Contact route — email only, or add a calendar link? | **Open.** Recommendation: email + LinkedIn, plus a calendar link if he has one. |
| **OQ4** | Fonts | ✅ **Resolved — Instrument Serif / Archivo / Martian Mono.** See §5.3. |
| **OQ5** | Is the career narrative in the main nav? | ✅ **Resolved — no dedicated route.** Folded into `#journey` and `#questions`, both reachable from the main nav anchors. |
| **OQ6** | Can the dealership be named? | ✅ **Resolved — yes, named openly.** See §17.4. Location: Thane (corrected from Navi Mumbai, 2026-07-19). |
| **OQ7** | Does `automjet-connect-pks.lovable.app` still exist, and does it still deserve a link now that the Retell agent is the live system? | **Open.** No demo link ships until answered. |
| **OQ8** | The two call recordings: consent confirmed, or both Prashant's own test calls? | **Open — hard gate for audio (§9.6).** Transcript fallback ships regardless. |
| **OQ9** | Does any version of the "built in about a week" story apply to the current Retell build? What's its real timeline and months-live? | **Open.** Until answered, no build-timeline claim appears (§17.4). |
| **OQ10** | The old 17-checkpoint build: worth one memo line as a decision ("rebuilt on Retell after reviewing real transcripts"), or omitted entirely? | **Open** (strategy §10 Q3). Current behavior: omitted. |

---

## 20. Repo layout

**Repo:** `github.com/ks-prashant/blank-canvas-portfolio` (the docs and knowledge book move into it at §11 step 1; `my-portfolio/` is their origin, not the build root).

```
blank-canvas-portfolio/
├── BUILD-SPEC.md              ← this file
├── DESIGN-PLAN.md              ← the design-system research and rationale (§5)
├── STRATEGY-V2-PROPOSAL.md     ← the ratified strategy (thesis, personas, lens depth)
├── prototype/
│   └── index.html              ← ⚠️ §11 step 0. Reference artifact, committed verbatim,
│                                  never edited, never shipped. Ports from here in step 2.
├── knowledge-book/            ← canonical source, read-only to the build
├── content/
│   ├── lens-copy.md            ← human-editable, reviewed source for the landing-page lens
│   └── case-pages.md           ← human-editable, reviewed source for the six case-study sections
├── scripts/
│   └── build-content.ts       ← compiles content/*.md + knowledge-book/ into typed modules
├── src/
│   ├── content/
│   │   ├── types.ts            ← Claude Code writes once, Lovable reads only
│   │   ├── projects.ts         ← generated (incl. essays, recordings, lenses)
│   │   ├── principles.ts       ← generated
│   │   └── metrics.ts          ← generated
│   ├── hooks/
│   │   └── useLensArtifact.ts  ← Claude Code owns. Headless lens-composition logic.
│   ├── components/             ← Lovable owns
│   ├── pages/                  ← Lovable owns
│   └── index.css               ← tokens (§5)
├── public/
│   ├── fonts/                  ← self-hosted Instrument Serif / Archivo / Martian Mono, woff2
│   └── recordings/             ← the two call recordings (only after OQ8 clears)
```

No `.env.local`, no API key, anywhere — there is no API call in this build.

---

## 21. First three actions — as of 2026-07-19 (superseded — see §11's status table)

**This section is a snapshot from the start of the build and is now stale — Steps 1-4 are all done as of 2026-07-19.** Read §11's "Status at a glance" table for the current state and next step; it's the maintained source of truth, this section is kept only as a historical note of the original kickoff plan.

~~The Lovable project exists and is synced to `github.com/ks-prashant/blank-canvas-portfolio`. Step 0 and Step 1 are done: the repo is cloned to `Documents/blank-canvas-portfolio`, the prototype + docs + knowledge book are copied in, `bun install` and `bun run build` both verified clean. Not yet committed/pushed — pending explicit go-ahead. The next three:~~

1. ~~**Commit the moved files and push**, confirm the commit appears in Lovable's sandbox. Closes Step 1.~~ Done.
2. ~~**Port the design system out of the prototype** (§11 step 2) — tokens, fonts, grain, motion, layout shell only, never its stale copy. The step that proves the prototype is being extended, not replaced.~~ Done.
3. ~~**Run §12.4's content pipeline** (§11 step 3) — the content pipeline is the critical path; every component from step 4 onward depends on its output existing.~~ Done, plus Step 4 (the six landing sections) on top of it.

**Answer whenever convenient, none of them block:** OQ1 (domain), OQ3 (contact route), OQ7–OQ10 (the Automjet demo link, recording consent, the Retell build's timeline, the retired build's mention).

---

*Spec reconciled against the working prototype as of 2026-07-17, and rewritten against the ratified strategy (`STRATEGY-V2-PROPOSAL.md`) and the replaced products as of 2026-07-19. **The prototype predates the product replacement — it still renders the retired trace/diagram design and is now behind this spec**, which is the reverse of the usual drift direction; reconcile the prototype forward to this spec, not this spec back to the prototype. If the book or the prototype changes further, update this document to match — do not let it drift again.*
