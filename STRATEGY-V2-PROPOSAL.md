# Portfolio Strategy v2 — the full rethink

**Status:** RATIFIED 2026-07-19 — the §2 thesis ("three systems, one discipline") is approved by Prashant, and the Automjet numbers (~500 calls/month; ~70% connect / ~40% complete / ~20% convert / ~20% cold) are confirmed to hold for the Retell build. The Thane correction has been applied across all six dealership-location statements (transcript strings exempt, §7). `BUILD-SPEC.md` and `DESIGN-PLAN.md` still describe the old architecture — the §9 drift list is now a **work order**, to be executed alongside the knowledge-book updates (§10 Q6). Open questions 3–6 in §10 remain open.
**Inputs:** the Automjet Retell v5 build guide, the Grounded Governance PRD, and the Grounded Governance build plan + session logs — all three read in full.
**Supersedes:** the first draft of this file (which over-read the material as "revision history." It isn't. It's a complete product-management method, exercised twice, with the receipts kept.)
**Date:** 2026-07-19

---

## 1. What the two products actually prove — the four-sided read

The reason the old portfolio needed a gimmick (the animated trace) is that it had one product story told one way. The new material doesn't need a gimmick, because each product is strong on **all four faces of the PM job**, and the two products *rhyme* — same discipline, opposite media (a phone call vs. a retrieval pipeline).

| Face | Automjet (voice agent, live in Thane) | Grounded Governance (live at pact-wise-guide.lovable.app) |
|---|---|---|
| **Business** | Real dealership, real mixed-provenance lead list. Cost engineered per-minute ($0.13–0.31/min) with levers *ranked* — end bad calls fast beats every model optimization. The commitment ladder is descending business value: test ride → team connect → warm/cold, so even a "no" produces an asset (a classified lead). Compliance (TRAI/TCCCPR, DND, number series) treated as a hard gate *upstream* of design, because penalties are real. | The "so what" risk named in its own PRD: *a grounded RAG demo over PDFs is a commodity* — answered structurally (the eval page is a product surface, the hero output is a map, not chat). Liability risk → no verdicts, by requirement not disclaimer. A $5 eval budget costed from the harness's actual call structure before spending a cent. Corpus refresh is a data operation, not a redeploy. |
| **User** | The user is the *caller*. Register researched, not assumed: "scooty" not "EV," simple present tense, one ask per turn, "Hi" never "Hey." A "no" is four different signals deserving four different treatments. Hinglish handled by a comfort rule, not keyword detection. Honest about how their number was obtained. Discloses being an AI if asked, never claims to be human. | One user, chosen on purpose: the PM/engineer told "make sure it's compliant" — explicitly *not* designing for lawyers and auditors too, because "designing for all of them at once would produce a product tuned for none of them." One clarifying question, never a form. Restated understanding before the answer, with "Not quite? Refine." Applicability as labels, never false-precision percentages. |
| **Product** | Priority-ordered outcomes where the fallback ladder *is* the product. Warm/cold classification designed as a win state, not a failure state. Lead-source-branched openings so the first sentence is never a lie. Scope note: no real SMS in the demo — "nail the conversation first." | The obligation *map* (tiers, rationale-per-card, citations) instead of a chat box. Honesty states — refusal, clarification, empty, conflict, low-confidence — as first-class UI, not error states. §4.2's out-of-scope list is *binding*: "named here so that adding them requires an explicit decision." Phase gates as permission slips. |
| **Technical** | Loop-proof **by structure**: a one-way ladder whose upward transitions don't exist; the objection node returns to a rung exactly once. Transition conditions treated as the real instructions (a tone note can be silently overruled by a gate). Per-node model routing. Naturalness as six coordinated levers with real settings (interruption sensitivity 0.7–0.9, semantic endpointing, sub-800ms to first word). | Parent–child chunking over 5 frameworks (630 parents / 1,573 chunks). Hybrid retrieval + RRF + rerank + parent expansion. A **post-generation citation-validation fence** that mechanically drops unentailed claims — grounding enforced, not requested. Latency measured, not assumed (4.2–5.3s before generation even starts → streaming moved into the backend phase). Security verified empirically (the RLS find). Immutable snapshots, promote-on-clean-validation. |

**The rhyme, stated once:** both products are systems designed to stay honest under pressure — to a caller who says no, to a user who asks something the corpus can't answer. And both got there the same way: **when an instruction can drift, replace it with a structure that can't.** The ladder with no upward edge. The fence that drops uncited claims. The transition condition that gates on "can I recommend?" instead of "are all fields filled?"

---

## 2. The thesis: three systems, one discipline

Here is the creative center of the rethink.

The portfolio should not *present* these two products. It should be **the third system built on the same rules** — and say so. Every design mechanism on the site is the portfolio-shaped version of a mechanism that already exists in the products:

| In Grounded Governance / Automjet | On this site |
|---|---|
| One clarifying question, never a form | **The lens picker is the site's one clarifying question**: "What should I optimize this read for?" Three answers. Nothing else is ever asked. |
| Lead-source-branched opening — never assume a warmer relationship than the data supports | **The un-lensed default state is the "unknown source" treatment**: the humble generalist read, no invented intimacy, with the clarifying question offered — not a lens silently pre-chosen. |
| "Why this applies to your system" rationale on every obligation card | **Personalization with receipts**: every lens-adapted block carries a small margin mark; open it and the block states *why this lens shows this* ("Engineer lens leads with the transition graph because the loop fix is structural, not verbal"). The adaptation explains itself. |
| The grounding fence — some things the model is never allowed to vary | **Blocks that refuse to personalize**: the numbers table, the evidence tags, and the documented "no" render identically in all three lenses, marked *"This block doesn't change by lens. The evidence is the evidence."* |
| Source viewer — one click from any claim to the primary source | **The compare view** — one click from any lensed block to all three versions side by side. |
| Refusal card instead of a fabricated answer | **Declared gaps** — where a lens genuinely has nothing to add, the section says so plainly instead of manufacturing depth. |
| Eval page — the product grades itself in public | **The numbers section** — every metric tagged by evidence strength, including the ones that fell short. |

This is what makes the personalization *mean something*. It stops being a feature bolted onto a portfolio and becomes a live demonstration of the same product judgment the two case studies describe. A visitor who never consciously notices the mapping still gets a deeply coherent site; a visitor who does notice it (and engineers and founders will) gets the strongest possible proof that the method is real — *it was applied a third time, to the thing they're reading.*

**Hero thesis line (draft):** *I build systems that stay honest under pressure. Two are in production. You're reading the third.*

---

## 3. The lens system, rebuilt for depth

The old spec's lenses changed prose. That is rung 1 of a four-rung ladder, and it's why it felt cosmetic:

1. Same content, different words ← old spec
2. Different amount of content (sections omitted)
3. **Different argument, different evidence, different visuals** ← the landing page target
4. **A different artifact type entirely** ← the two product pages' target

### 3.1 Landing page — rung 3: three arguments, not three tones

Each persona arrives with a different decision to make, a different fear, and a different currency of proof. So each lens gets a genuinely different *argument*, made with different *evidence*, anchored by a different *signature visual* the other lenses never show.

| | Recruiter / hiring manager | Founder / PM | Engineer |
|---|---|---|---|
| Their decision | Clear the bar? Any reason to reject? | Can this person make calls unsupervised, on limited money and time? | Can this PM actually reason about systems, or does he narrate them? |
| Their fear | Forwarding an inflated profile | Someone who builds beautifully and ships nothing; who can't say no | Claimed rigor with no artifact behind it |
| Currency of proof | **Evidence strength** — not the size of the number, the credibility of it | **Decisions where something was given up** — a costless choice is a preference | **Specificity + admitted limits** — one correct non-obvious detail beats three paragraphs |
| **The argument the page makes** | *"Every claim here is tagged with how it was measured — including the ones that fell short."* | *"Nine years of decisions, with the costs kept on the books."* | *"Instructions drift. Structures hold. Here are the structures."* |
| **The evidence set led with** | The tagged numbers (35%→42% instrumented A/B beside self-reported estimates, labeled as such) · the documented voice-screening "no" · two live products as existence proof | The forks: the ladder as business logic · one user not four · scope lists that are binding · the $5 eval budget · the deliberate deferral, with its reason | The removed edge (the ladder) · the citation fence · the transition-condition insight · the silent-failure bugs found by tracing |
| **Signature visual (exclusive to this lens)** | **The Evidence Ladder** — every site claim plotted by how it was measured: Instrumented / A-B tested / Directional / Self-reported / Fell short | **The Decision Ledger** — ~10 real forks across nine years as paired entries: what it bought (ink) / what it cost (red) | **The Structure Board** — instruction → structure that replaced it, three rows from three systems (the third row is this site) |
| Section order | verdict → numbers → the "no" → journey → products-as-proof → contact | products as decision stories → principles as an operating system → numbers with method → journey → contact | products as mechanisms → structure board → exclusions & limits → eval methodology → contact |

Same facts everywhere. Different argument built from them. The compare view keeps all of it one click away from any lens, so nothing is hidden — which is itself the point.

### 3.2 Product pages — rung 4: three artifacts, each in the reader's native genre

The deep move: each lens renders the product page as **the kind of document that persona already produces and trusts in their own job.** Format *is* empathy — it's perceivable in one second, before a word is read, and it answers your requirement that the personalization change "what content to show, what visualizations to keep, how to show things, and what language to use" all at once.

| Lens | Artifact genre | Length | Register |
|---|---|---|---|
| Recruiter | **A screening summary** — the same genre recruiters produce about candidates all day. (For Automjet this is literal and delightful: the page is shaped like the agent's own post-call analysis record. The system's output format, applied to its maker.) | 60–90 sec | Plain language, zero jargon, outcome-first |
| Founder / PM | **A build memo** — bet, constraint, decisions with costs, what was cut, what's next. The genre founders write to themselves. | 8–10 min | Decision-framed, costs explicit |
| Engineer | **A design review + incident log** — mechanism, real settings, the bugs, the limits. The genre engineers trust most, because it's the one that can't be faked. | 15+ min | Precise, specific, negative results included |

These are not three pages to maintain — they're one content model per product with three *compositions* (§7 covers authoring load). But to the reader, they are different artifacts, and that difference is the depth.

---

## 4. Product page 1 — Automjet

**Shared spine (all lenses):** status line (live at the Ather dealership, Thane West) · the two call recordings · the honest funnel distribution beside them.

### 4.1 The two recordings — the centrepiece for every lens, used differently

**[PLACEHOLDER — two audio files coming: one booked-test-ride call, one cold-lead call.]**

The paired listen replaces the old animated trace outright. Two players, side by side, same system, opposite outcomes — the counter-entry logic made audible. The cold-lead call gets equal visual weight: almost nobody publishes a recording of their own product not converting, and that is precisely why it converts *here*.

- **Recruiter hears:** 20 seconds of it sounding human, then reads the outcome fields.
- **Founder reads beside it:** the funnel distribution as context, not apology — with both outcomes present, the distribution stops being a disclaimer and becomes the product working as designed (a cold lead *is* an outcome; classification is the third rung of the ladder).
- **Engineer gets the killer version:** each recording paired with an **annotated transcript** — margin marks showing which node is active at each turn, and in the cold-lead call, the ladder visibly stepping down: `N5 declined → N7 → declined → N8 → classified cold`. The state machine, made audible. No animation required; the document form does it.

**Gate before shipping audio:** confirm consent/test-call status for both recordings. If unclear, transcripts with masked numbers (`+9193***7036` style, as the source docs already do) — no audio.

### 4.2 The three artifacts

**Recruiter — "The post-call record."** The page presents Prashant the way his agent presents a call: a record with fields. What it is (an outbound voice agent for a real dealership, built solo, in production) · listen to both calls · the outcome fields from each · scale and status · one line on what's *not* claimed. ~250 words. The self-aware form is the charm — a small caption notes it: *"This summary is structured like the agent's own post-call record. It seemed only fair."*

**Founder — "The build memo."** Not a chronicle of fixes — the system as it stands, with the reasoning that shaped it:
1. The situation: a friend's dealership, mixed-provenance leads going cold, one week of evenings.
2. The bet: an agent whose *fallback ladder is the product* — every call ends in an asset (booking > meeting > classified lead), never a burned lead.
3. The four decisions with costs: the "no" taxonomy (a mishandled busy-no throws away a callback); openings branched by lead source (a false first sentence is a trust *and* compliance problem); Hindi handed off, never faked (a bad Hindi bot is worse than an honest handoff); compliance upstream as a dial-gate, not a conversation feature.
4. The economics: cost levers ranked — ending bad calls fast is worth more than any model choice.
5. What was cut and why: real SMS, live booking — "nail the conversation first."
6. What's watched: booking rate, classification accuracy audited against reality, loop incidents (target ~0), early hang-ups in the first 15 seconds.
Visuals: ladder-as-funnel · the no-taxonomy routing table · the ranked cost levers (right-aligned, tabular, red where money leaks).

**Engineer — "The annotated system."** The full conversation-flow graph, then the parts that earn respect:
1. The one-way ladder with its **removed edges drawn and struck in red** — the design is the edges that don't exist.
2. The insight worth the whole page: *the transition condition is the real instruction.* The prompt said "don't interrogate"; the gate said "all five fields filled"; the gate won. Fix the gate.
3. The objection/decline distinction — an objection is a question (N9, returns once), a decline is a decision (step down, never revisit).
4. The annotated transcripts (§4.1).
5. The naturalness stack with actual settings: voice speed 0.92–0.95, interruption sensitivity 0.7–0.9, semantic endpointing, turn-taking windows per node type, sub-800ms first word, boosted Hinglish keywords.
6. Per-node model routing (premium only where judgment lives: discovery, recommendation, objections, KB).
7. The register rewrite as an engineering artifact: the wrong-vs-right phrasing table.
8. The post-call schema — outcome read off the ending node reached, never inferred from the transcript.
Visuals: the state graph · the struck edges · the settings table · the annotated transcripts · the register table.

---

## 5. Product page 2 — Grounded Governance

**Shared spine:** live link (`pact-wise-guide.lovable.app`) · the one-line promise (a source-cited obligation map that refuses rather than fabricates) · the honest eval status.

**The eval status must follow the build plan's own instruction to itself** — quoted verbatim on the page, because it is the single most characterizing sentence in all three documents:

> *"Don't repeat 'groundedness is proven' to a stakeholder yet — say 'the foundation it depends on is proven.'"*

So the page says exactly that: retrieval proven (7/7 on the gate), the first full generation eval **failed** (93.3% groundedness against a 95% bar), six root-caused fixes landed and item-verified, and the comprehensive re-run is deliberately sequenced for launch — one measurement of the finished product rather than two of a moving one. That sequencing *decision, with its stated reason,* is founder-lens gold, not a gap to hide.

### 5.1 The three artifacts

**Recruiter — "The scorecard."** What it is in one sentence · the **Article 99 story as a three-panel strip** (asked what GDPR Art. 99 says about AI training data → Art. 99 is real but it's about entry into force → the product retrieves the actual text and says "here's what it actually says, and it isn't what you asked" — *the entire pitch in one concrete example*) · the metrics table with targets and honest current status · try-it-live link. ~300 words.

**Founder — "The de-risking memo."** The strongest pure-PM document on the site, because the source material *is* one:
1. The commodity problem, named by its own PRD, and the structural answer (eval page as product surface; a map, not chat).
2. One user, chosen on purpose — the refusal to design for lawyers and auditors too.
3. The risk table: every liability converted to a *requirement* — liability → no verdicts ever; staleness → dated snapshots on every claim; sprawl → a binding out-of-scope list.
4. Sequencing as risk management: the plan "front-loads the existential risk" — groundedness proven on one framework before any breadth or polish. If that gate is red, minimum money was spent learning it.
5. The $5 episode: eval costed from the harness's real call structure, model temporarily downshifted as an explicit lever with a written revert condition.
6. The deferral decision, with its reason, presented as what it is: scope discipline under budget, in writing.
Visuals: the risk→requirement ledger · the phase-gate rail (A→I, each gate a permission slip, current state marked honestly) · the budget episode as a margin note.

**Engineer — "The design review + incident log."** Two halves.
*The mechanism:* parent–child chunking and why (retrieve small, generate from large) · 630 parents / 1,573 chunks across five frameworks, each parsed to its native hierarchy (and the SSDF's flattened three-column tables filed by id-prefix, never position — the kind of detail that buys instant credibility) · hybrid retrieval + RRF + rerank + parent expansion · **the fence**: a post-generation entailment check that drops any claim its citation doesn't support — the model is never trusted to ground itself · forced tool-use vs. extended thinking as a real API constraint that had to be designed around · latency measured at 4.2–5.3s pre-generation → streaming pulled into the backend phase rather than bolted on.
*The incident log* — five entries, ruled ledger rows, each: what happened / how it was caught / the fix / the verification:
1. RLS: "disabled" did not mean server-only on this platform — the public anon key could read *and write* every table. Caught by an automated scan, **verified empirically, fixed, then verified again by attempting the exploit** — not by trusting the setting.
2. `websearch_to_tsquery` silently AND-ing every word — the keyword arm was dead for natural questions. Found by the retrieval eval, not by a user.
3. The validate gate checked child-label uniqueness but not parent — a collision would have silently linked children to the *wrong parent* with zero error. Found by tracing logic end-to-end, before it ever fired.
4. Three malformed-tool-call crashes in one session → stopped patching fields and fixed the *class* (a retry loop around the parse).
5. The rate limiter that "didn't work": ten rapid requests, all 200s — root cause a transient schema-cache lag being absorbed by the fail-open path, *which is exactly what fail-open is for.* Retest minutes later: blocked at precisely request 9 of 10, as configured.
Plus the eval design itself: the golden set weighted toward adversarial and out-of-corpus items, CI-runnable, published in-product.
Visuals: the pipeline with the fence highlighted · the incident ledger · assumed-vs-measured latency bars · the golden-set composition split.

---

## 6. The landing page hero

The old `HeroMarkRow` (17 marks) is dead — it counted an architecture that no longer exists, and tying the hero to one product's internals is what made it fragile.

**Recommendation: the counter-entry mark.** A row of ~12 paired marks — ink above the baseline (what it bought), red below (what it cost), heights varying. Abstract, quiet, product-independent, and literally the design system's founding logic drawn as an object. Beneath it, the thesis:

> *I build systems that stay honest under pressure. Two are in production. You're reading the third.*

Then the two live-product entries (one ruled line each), then the clarifying question (§2) — the lens picker, framed as the only question the site will ever ask.

---

## 7. Authoring & build reality

**The binding constraint is authoring, not engineering.** Everything above is static content — no LLM anywhere, per the standing rule. The visuals are tables, bars, state graphs, annotated excerpts: cheap per unit, and far cheaper in total than the one animated trace they replace (which carried transport controls, keyboard support, and an aria-live region).

**One content model, three compositions.** Author each product page as a pool of typed blocks (`fact`, `decision`, `mechanism`, `incident`, `metric`, `visual`, `quote`), each tagged per lens with `lead / full / brief / omit` plus an optional per-lens variant and the "why you're seeing this" receipt. The three artifacts are then compositions over the pool — different order, selection, register, and visuals — without maintaining three divergent essays. The genre wrappers (record fields / memo headings / review-and-log structure) are templates, written once.

**Sequencing:**
1. Grounded Governance founder artifact first — richest source material, and the default lens.
2. Automjet engineer artifact second — the annotated-transcript mechanic is the site's most distinctive object; prove it early.
3. Recruiter artifacts third — deliberately thin is *correct* for this genre; resist padding.
4. Landing-page signature visuals (Evidence Ladder → Structure Board → Decision Ledger, in order of authoring ease).
5. Case pages (the six employer studies) inherit the §3.1 argument structure last — they already have the §8.5 depth table and need re-argument, not rebuild.

**Fact gates before anything ships** (per `KNOWLEDGE-BOOK-PLAN.md` discipline — these are currently *unverified* for the new builds):
- Automjet: ~~current call volume and funnel numbers~~ **CONFIRMED by Prashant 2026-07-19: ~500 calls/month and the 70/40/20/20 funnel hold for the Retell build** — quotable, sourced to this confirmation · whether `automjet-connect-pks.lovable.app` still deserves a link · recording consent (§4.1).
- Grounded Governance: which eval numbers are quotable and with what caveat (first-run figures are from the interim Sonnet-5 config — the page must say so) · confirm the live URL is the public one.
- Dealership location is **Thane West** everywhere the *dealership* is meant. The two transcript-extracted `"commutes 7-8 km daily within Navi Mumbai"` strings are the caller's own words in a primary-source record and stay verbatim.

---

## 8. What survives, what dies

| From the old spec | Fate |
|---|---|
| The Ledger design system, one committed world, red = cost | **Survives untouched** — a memo/record/review is *more* native to it than an app-like diagram ever was |
| No LLM at runtime or build time; hand-authored lens | **Survives** — and §2 gives it a stronger reason to exist |
| The compare view, declared gaps, evidence-strength tagging | **Survive, promoted** — they're now instances of the site-as-third-system thesis |
| The eight principles | **Survive as the founder lens's operating-system section**; principle #8 (deterministic-not-inferred) is now demonstrated twice over |
| The six employer case pages + §8.5 depth table | **Survive**, upgraded from rung 2 to rung 3 (different argument per lens, not just different sections) |
| §9 interactive diagrams + the 20-card traced call | **Dead.** Replaced by §§4–5. The trace animated the happy path and needed a disclaimer to be honest; the paired recordings *are* the honesty |
| The 17-mark hero | **Dead.** Replaced by §6 |
| DocuFlow as Tier 1 | **Dead** — off the main site (a one-line Tier-3 mention is an open question, §10) |

## 9. The drift list (unedited until ratification)

`BUILD-SPEC.md`: §9 entire (both diagrams + trace) · §7.4 Tier 1 roster · §2 D2/D5/D6 · §1.2 fact 1 · §17.2–17.4 copy blocks · 6 dealership-location statements (→ Thane; the 2 transcript strings exempt). `DESIGN-PLAN.md`: §5 visual inventory V4/V5 · §6 hero. `content/lens-copy.md`, `case-studies/`, `knowledge-book/02` + `03/automjet`: describe the pre-Retell build throughout; the knowledge book needs new canonical entries for both products before any copy is drafted (nothing on the site may exist without a knowledge-book source — the rule stands).

## 10. Open questions

1. ~~**Ratify the thesis?**~~ **RATIFIED 2026-07-19.**
2. ~~**Automjet numbers for the Retell build**~~ **CONFIRMED 2026-07-19** — ~500/month and 70/40/20/20 hold.
3. **The old 17-checkpoint build** — worth one paragraph as a decision ("rebuilt on Retell after reviewing real transcripts, because X"), or omit entirely?
4. **DocuFlow** — Tier-3 one-liner or gone?
5. **"What I haven't done"** — the recruiter artifact gets sharply stronger with an explicit non-claims block; only you can write it.
6. **Knowledge-book update sequencing** — the two new canonical project files have to be written (from these three docs) before lens copy is drafted. Confirm that's the next work session.
