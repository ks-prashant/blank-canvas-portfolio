# Design Plan — FINAL
**Direction:** A, The Ledger. One world. Ledger as *logic*, never as costume.
**Status:** rationale document, reconciled 2026-07-19 against the ratified `STRATEGY-V2-PROPOSAL.md` and the **replaced products** (Automjet → Retell v5; DocuFlow → Grounded Governance). §§5–6 rewritten: the trace, the timing bar, and the 17-mark hero are all retired with the architectures they depicted; the visual inventory and hero below describe the current design. **The prototype now lags this document** (it still renders the retired trace design) — reconcile the prototype forward, not this document back. `BUILD-SPEC.md` §5, §9, §17.3 carry the current source of truth for tokens, the product pages, and the hero; this document is the *rationale* for them, not a competing spec.
**Keeping this in sync:** see `CLAUDE.md` in this folder — both this file and `BUILD-SPEC.md` must be reconciled against the prototype whenever the prototype changes materially. Don't let either drift again.

---

## 1. The one rule this whole plan hangs on

**Take the ledger's logic. Reject the ledger's look.**

A visitor should never think "this looks like accounting." They should feel: *precise, honest, paired, and expensive.* The ledger is the reason the design is coherent — it is not the thing being depicted.

| Keep (the logic) | Kill (the costume) |
|---|---|
| **Duality** — no claim without its counter-entry | Column headers, totals rows |
| **Red means cost.** One accent, semantic, never decorative | Greenbar / accounting-paper stripes |
| **Precision** — figures align, nothing approximate | `ENTRY 01` labels, balance-sheet layout |
| **Rules organise, not boxes** | Sepia, aged paper, ornament |
| **The margin annotates** | Anything resembling accounting software |

Test for every decision: *would a designer call this rich, or would an accountant call this familiar?* Second answer means it's wrong.

---

## 2. One world

No toggle. No light/dark twin. **One committed material, executed well.**

The 2026 trend is a deep cyber-monochrome ground interrupted by a saturated acid accent. That is now the *new default* — every premium AI-era site is dark with a neon pop. So the contrarian, and the one that matches your own diagrams, is a **committed light world with real substance.**

Not white. Not cream (`#F4F1EA` + terracotta is the single most-flagged AI cliché). **Deep paper with tooth.**

```
--paper        #E7E7E1   deep neutral paper. has body. reads as material, not screen.
--paper-lift   #EFEFEA   rare raised surface only
--ink          #15181E   blue-black. real ink is never neutral black.
--ink-soft     #5C6169
--ink-faint    #8B9098
--rule         #CFCFC8   hairline
--rule-strong  #B4B4AC
--red          #B23A26   oxide. THE ONLY CHROMATIC COLOUR ON THE SITE.
--red-wash     #E8D5CF   rare fill
```

**Ten values. One of them is a colour.** That discipline is what will make it read as designed rather than generated.

**`--red` means *what it costs*. Nothing else.** Not errors, not warnings, not links, not emphasis. Every red mark on the page is a liability being declared. When the scorecard shows "Missed its bar" in red, it's red *because it is a cost* — not because red means bad.

**Live/running status is indicated by motion, not colour** — a slow pulsing ink dot. A red "live" dot would break the rule.

---

## 3. Richness — how it stops being flat, without a single gradient

Flatness was the complaint. Gradients are the AI tell. So richness comes from **material**, not from colour ramps:

1. **Grain.** An SVG `feTurbulence` overlay at ~4% opacity, fixed over the whole page. No asset, no request. This is the single biggest change — it turns a screen into a surface. Borrowed straight from the risograph research.
2. **Ink overlap.** Where marks cross (the hero visual, rules meeting), `mix-blend-mode: multiply` so ink *accumulates* rather than replaces. Real ink behaviour. Creates a third tone from two, for free.
3. **Deep paper.** `#E7E7E1` is unusual and substantial. `#FFFFFF` and `#FAFAFA` are what everything else is.
4. **Extreme type contrast.** 132px against 11px on the same screen. Drama from scale, not decoration.
5. **Asymmetry.** A working left margin, content off-centre. Templated pages are centred; designed pages are not.
6. **Precise motion.** Marks *land*. They don't fade.

---

## 4. Type

| Role | Face | Sizes | Notes |
|---|---|---|---|
| Display | **Instrument Serif** | 40 – 132 | High contrast, editorial authority. Confirmed. Display sizes only — never below 28. |
| Body / UI | **Archivo** | 13 – 21 | Grotesque with real personality. Explicitly not Inter. |
| Figures / labels / margin | **Martian Mono** | 11 – 15 | Genuine tabular figures. Every number in a column aligns, always. |

**Scale:** `11 · 13 · 15 · 17 · 21 · 28 · 40 · 72 · 132`

The top of that scale is a *visual*, not text. A 132px Instrument Serif line with air around it is the hero's image — that's what "typography as primary interface architecture" means, and it's a large part of the 30%.

---

## 5. The ratio, budgeted honestly

Target: **~30% blank · ~30% visual · ~40% text.**

The current prototype is roughly **5 / 5 / 90**. That's the real problem — bigger than the palette.

### The visual inventory — what actually fills 30% (revised 2026-07-19)

| # | Element | Where |
|---|---|---|
| V1 | **The counter-entry mark** — hero. See §6. | Hero |
| V2 | **132px display type** — type as image | Hero + section heads |
| V3 | **The journey as a drawn line**, not paragraphs | Journey |
| V4 | **The paired recordings** — two calls, opposite outcomes, side by side; the loudest moment on the site precisely because half of it is a failure | Automjet |
| V5 | **The annotated transcript & the struck-edge state graph** — the ladder stepping down, audible and drawn | Automjet (engineer) |
| V6 | **The incident ledger & the failing eval scorecard** — ruled rows, honest FAILs | Grounded Governance |
| V7 | **The lens signatures** — Evidence Ladder / Decision Ledger / Structure Board, one per lens, only the active one renders | Landing |
| V8 | **Tabular figure columns** — right-aligned, red-marked. Data as image. | Numbers |
| V9 | **Photo** — small, two placements | Hero, contact |

*(Retired from this inventory 2026-07-19: the full-bleed trace and the DocuFlow timing bar — both depicted architectures that no longer exist, and the trace animated the happy path of a system whose honesty was the point. The recordings replace it with the failure case given equal weight.)*

### The rhythm — density contrast IS the composition

Editorial design is the *interval* between dense and empty. One rhythm repeated seven times is why it reads flat:

```
HERO         ~90vh   headline + 2-sentence sub. counter-entry marks. photo small.
LIVE          tight   hard cut. two entries, one line each. dense after air.
JOURNEY      ~65vh   drawn line, 3 phases. click a company mark, detail expands
                     inline in the content column (indented, ink-bordered) — not
                     in the true left margin. See sync note below.
WORK          medium  13 ruled rows, tiered by depth. a list, not cards.
PRINCIPLES   ~70vh   8 statements grouped into 4 themes, ruled. bodies exist but
                     start collapsed — click to expand. not bodiless, just quiet
                     until asked.
NUMBERS       dense   the proof. tabular, grouped by company (north-star
                     metric first, rest collapsed), each row evidence-tagged
                     (Measured / Directional / Fell short). Post-V1 task #6.
QUESTIONS     airy    all collapsed by default. 7 lines visible.
CONTACT      ~60vh   ~60% air.
```

**Sync note (2026-07-18):** the original plan routed journey/principle detail into a *working left margin* (§8 below) as the main mechanism for cutting visible text without deleting it. In the shipped prototype, that margin column carries only short static annotations and is hidden entirely below ~860px (see §8's own open question — this was flagged, not silently dropped). Expandable detail (journey role cards, principle bodies) actually lives inline, in the content column, click-to-reveal. The text-cut goal was still hit — the *mechanism* is disclosure, not marginalia. Read §8 below as "the intended margin design," not as a description of the currently shipped layout.

---

## 6. The hero visual — the counter-entry mark (revised 2026-07-19)

**⚠ Two superseded designs, noted for the record.** v1 was seventeen thin marks with two permanently hollow ("two never fired") — killed for reading as a riddle. v2 grouped the marks into three labelled phases (5/7/5) filling on load — killed on 2026-07-19 along with the architecture it counted: the 17-checkpoint build is retired, so "17" is a fact about nothing. The deeper lesson from losing it: **a hero tied to one product's internals dies with that product's next rebuild.** On this evidence, rebuilds happen.

**The current design: the counter-entry mark.** A row of ~12 paired marks — an ink mark above the baseline (what it bought), a red mark below it (what it cost), heights varying. Abstract, quiet, product-independent, and *literally* the design system's founding logic drawn as an object. Beneath it, the thesis line (BUILD-SPEC D9):

> *I build systems that stay honest under pressure. Two are in production. You're reading the third.*

Why it wins: it survives the next product rebuild; it uses `--red` exactly as §2 demands with zero strain (every red mark **is** a declared cost); it's legible in under a second with no riddle to decode — the exact failure the hero was already corrected for once; and it's honest, because the site really does carry a cost entry for every claim. Marks fill once on load, posting rather than fading; `prefers-reduced-motion` renders the final state instantly. See `BUILD-SPEC.md` §17.3 and component `HeroCounterEntry` (C9).

*Alternative considered and rejected: the one-way ladder as hero — stronger as an image, but it belongs to one product, and the whole point of this revision is that the hero must not.*

---

## 7. The text cut — section by section

Landing page is currently **~3,000 words**. Target: **~550 visible**, with everything else one click away. Nothing is deleted — it's *demoted*.

| Section | Now | Becomes | Saved |
|---|---|---|---|
| **Hero** | headline + 4 sentences | headline + **2 sentences** (lens still visibly swaps) | ~50w |
| **Live products** | 2 cards, 3 lines + stats + 2 buttons each | **2 ruled entries**: name · one line · one figure · one link | ~90w |
| **Picker** | prompt + sub + 3 cards | keep — already tight | — |
| **Journey** | 6 roles × ~60w + 15 chips | **3 phase bands on a drawn line.** One sentence each. Companies are marks. Click a mark → role detail opens **in the left margin.** | **~300w** |
| **Work** | 13 rows × 2 lines | 13 rows × **1 line** | ~60w |
| **Principles** | 8 × (title + 40w + chips) | **8 statements, 28px, ruled, evidence marks only.** Click → body expands. | **~320w** |
| **Numbers** | 7 rows | **keep every word** — this is the proof, and it's tabular | — |
| **Questions** | first open, long answers | **all collapsed.** 7 lines visible. | **~400w** |
| **Contact** | 3 lines | 1 line | ~25w |

**The two big wins are Journey and Principles**, and both get *better*, not just shorter:

- **Principles as 8 bare statements at 28px, ruled, with evidence marks** is a poster. Right now it's a paragraph dump. The title *is* the principle — the body is footnote material.
- **Journey as a drawn line with clickable marks** turns 360 words into a visual *and* keeps every fact one click away, in the margin.

**Throughout: caveats and source tags move out of the text column and into the left margin.** That's how the page gets 30% air that isn't dead padding — the air is doing work.

---

## 8. Layout

- **Asymmetric grid**, max 1200px. Left margin ~2/12 is a **working annotation zone**: source tags, caveats, counter-entries, expanded role detail. Content 8/12. Never centred.
- **Rules, never cards.** Every `border+radius+background` block dies. A card says "I am a component." A rule says "I am a document." Rules are also 90% less ink for the same structure — that's air, free.
- **Figures always right-align** in their column, always `tabular-nums`.
- Mobile: margin collapses, annotations inline, marks stack.

---

## 9. Motion

- **Entries post, they don't fade.** ~120ms, sharp ease-out, tiny overshoot. Like something being set down. Never a dissolve.
- **Rules draw** left-to-right on section entry, 400ms, once.
- **Hero counter-entry marks fill** in sequence, once, on load — the only genuinely animated element on the site (the trace playback is retired; nothing on the product pages animates).
- Everything else: **nothing moves.**
- `prefers-reduced-motion` → hero marks render final state instantly, rules pre-drawn.

---

## 10. What I build first

**One screen, throwaway:** the hero and the live entries. Real type sizes, real grain, real palette, the counter-entry marks filling.

That's enough to answer the only question that matters: **did "Zürich 2026" come out, or did "Victorian counting house"?** If it's the second, we kill Direction A and go to B.

Then, if it survives: Principles as a poster, since that's the biggest text cut and the one most likely to prove the whole approach.

---

## 11. Open — but I have a lean on all three

1. **Grain intensity.** 4% is my start. It should be *felt, not seen* — if you can point at the grain, it's too much.
2. **The margin on mobile.** Annotations inline is the safe answer, but it partly undoes the text cut on small screens. Alternative: annotations become tap-to-reveal marks. My lean: tap-to-reveal.
3. **`--red` discipline.** I want to hold "red = cost, nothing else" *absolutely*, including for links and focus rings (which become ink + underline, and an ink ring). It's a real constraint and it will occasionally be inconvenient. My lean: hold it. The discipline is the whole point.
