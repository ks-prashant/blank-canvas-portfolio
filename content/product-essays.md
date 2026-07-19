# Product essays — the block pool for both build-essay pages

**Status:** first draft by the builder. **Prashant reviews and rewrites every block below**, same loop as `lens-copy.md` and `case-pages.md`.
**Scope:** the two Tier-1 products, `automjet` and `grounded-governance` (BUILD-SPEC.md §9). Both are `confidential: false` — full technique detail is fine here; this is not where the confidentiality gate applies (§7.3).
**Source of truth:** `knowledge-book/03-projects/personal-projects/automjet/{voice-agent.md,retell-build-guide-v5.md}` and `knowledge-book/03-projects/personal-projects/grounded-governance/{grounded-governance.md,source-prd.md,source-build-plan.md}`.

**How this compiles:** each product is authored once as a pool of `ContentBlock`s (§7.2), then composed three different ways — one per lens — into a `ProductEssay.artifact[lens]` with its own `genre` and `order: string[]` of block ids (§9.1). `scripts/build-content.ts` reads the `## ARTIFACT` table for each product to build the compositions, and reads each `# BLOCK` section to build the `blocks[]` pool. Nothing here is generated; it is drafted prose, meant to be edited in place.

**Block id scheme:** `{slug}-{NN}`, zero-padded, assigned in reading order within each product — e.g. `automjet-01`, `automjet-02`, … `gg-01`, `gg-02`, … The number carries no meaning beyond "the order this was authored in"; the actual reading order per lens is whatever `## ARTIFACT`'s `order:` list says. A block's `kind` (fact / decision / mechanism / incident / metric / visual / quote) is stated on its own header line, not implied by the id.

**Every block's `source` line is a real, checkable anchor** into one of the four canonical files above — a section name, a numbered §, or an Appendix letter. A block with no traceable source is a build error (§7.2, §9.2's constraint).

**Unconfirmed facts, binding, not present anywhere below (§9.6.4):** the Retell build's construction timeline / months-live (the retired build's "built in a week, live 7-8 months" story — see `voice-agent.md` §11), whether `automjet-connect-pks.lovable.app` still applies (OQ7), and any Grounded Governance usage/traffic figure (it has no real users yet — `grounded-governance.md` §10).

**Recordings:** `Recording.src` stays absent on both call blocks below — no audio ships until OQ8 (consent) clears. Every recording-shaped block renders the masked-transcript-fallback framing instead, and `Recording.caveat` (the funnel context) is required wherever a recording block appears.

---

## PRODUCT: automjet

**Canonical facts:** built solo, for a friend who co-founds the Automjet group and owns an authorized Ather Energy dealership in Thane West. Not a paid engagement. Live in production, ~500 calls/month. Funnel confirmed 2026-07-19: ~70% connect, ~40% complete, ~20% convert, ~20% cold.

### Artifact composition

**Recruiter — genre: record**
Order: automjet-01, automjet-15, automjet-11, automjet-12, automjet-17

**Founder / PM — genre: memo**
Order: automjet-01, automjet-02, automjet-03, automjet-04, automjet-05, automjet-06, automjet-13, automjet-17, automjet-18, automjet-12

**Engineer — genre: review**
Order: automjet-14, automjet-08, automjet-07, automjet-03, automjet-15, automjet-09, automjet-10, automjet-16, automjet-11, automjet-19

---

### BLOCK automjet-01 — Who this is for, and its status
*kind: fact · source: automjet/voice-agent.md §"Identity"/"Status" · visual: none*

> Built solo for a friend who co-founds the Automjet group and owns an authorized Ather Energy electric-scooter dealership in Thane West. Not a paid client engagement. Live in production at the Thane showroom, ~500 calls a month.

**Recruiter — depth: lead**
> A friend runs an Ather electric-scooter dealership in Thane. This is the agent that calls his leads.
*Receipt: the plain fact first, who and where, so the rest of the page has somewhere to stand.*

**Founder / PM — depth: full**
> A real dealership with a real leak. A friend co-founds the Automjet group and runs the Thane Ather showroom; this wasn't a client engagement, it was solving a problem for someone whose business actually depended on the answer.
*Receipt: the situation the bet responds to, before the bet itself.*

**Engineer — depth: brief**
> A friend's Ather dealership in Thane, live at ~500 calls/month, not a client engagement.
*Receipt: one line of business context, per the engineer lens's own rule; the rest of the page is architecture.*

---

### BLOCK automjet-02 — The priority ladder is the product
*kind: fact · source: automjet/voice-agent.md §1 · visual: none*

> The agent moves every caller down a priority-ordered ladder: test ride booked (primary), else a sales-team connect (fallback), else classified warm or cold. Classification is the third product outcome, not a failure state — no call is wasted.

**Recruiter — depth: omit**

**Founder / PM — depth: lead**
> The bet was that the fallback ladder *is* the product. Every call has to end in an asset: a booked test ride, else a meeting with the sales team, else an honestly classified lead. A call that ends "cold, and here's why" is a win, not a failure, because the next run doesn't waste money re-dialing it.
*Receipt: the founder lens leads with the bet, because "can this person make a call with limited money and time" is their real question.*

**Engineer — depth: omit**
*(folded into automjet-07's mechanism instead — the engineer wants the structure, not the pitch)*

---

### BLOCK automjet-03 — A "no" is four different signals
*kind: decision · source: automjet/voice-agent.md §4 (table); retell-build-guide-v5.md Appendix B · visual: none*

> Bad-timing, CTA-decline, not-interested, and hard-stop are routed differently: a busy no gets a callback, never terminal alone; a CTA decline steps down exactly one rung; not-interested skips to classification; a hard stop exits to do-not-call immediately, suppressed across systems. Conflating these categories is what broke the earlier build in both directions at once (hanging up on recoverable leads, and re-pitching through real declines).

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> Treat "no" as four different signals, not one: a busy no is a callback, a declined ask is a decision. Getting this wrong costs a real lead either way, hang up on someone who was just busy, or annoy someone who already said no by asking again.
> **+buys:** no recoverable lead is thrown away by a premature hang-up. **−costs:** four routes to design and build instead of one simple no-handler.
*Receipt: a decision with a stated cost, the founder lens's currency of proof.*

**Engineer — depth: full**
> **variant:** technical framing — the transitions, not the pitch.
> Four "no"s, four routes: bad-timing → capture callback, never terminal alone; CTA-decline → step down exactly one rung (N5→N7→N8); not-interested → skip straight to classify; hard-stop → immediate DNC exit, suppressed across systems. An *objection* ("too costly," a question) routes to N9; a *decline* (a decision) moves down the ladder. The earlier build conflated these two categories, and that conflation is what broke it in both directions simultaneously.
*Receipt: the engineer lens gets the full routing table, because the taxonomy is a structure, not a tone note.*

---

### BLOCK automjet-04 — The opening is branched by lead source
*kind: decision · source: automjet/voice-agent.md §3; retell-build-guide-v5.md §4.2 (N2) and Learning 4 · visual: none*

> The first sentence branches on where the lead actually came from (website / sales referral / OEM CRM / unknown), so it is never a lie the agent would have to defend. The earlier build's opening assumed every lead had visited the website; most hadn't, and a false first sentence is both a trust failure and a compliance one, since it pre-empts "how did you get my number?"

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> Branch the opening line on where the lead actually came from, because a first sentence that assumes a relationship you don't have breaks trust and compliance in the same breath. The consolidated lead list is mixed-source (OEM CRM, sales referrals, website enquiries, general outreach), so one script can't honestly cover all of it.
> **+buys:** every version is something the agent can honestly defend if asked "how did you get my number?" **−costs:** four opening variants to write and keep consistent instead of one.
*Receipt: a decision with a stated cost.*

**Engineer — depth: full**
> N2's reason-for-calling line is gated on `lead_source`: website references the real enquiry, sales_referral references the real conversation, oem_crm is honest that the number came via Ather, unknown is the most humble version with no invented relationship. Never let a script assume a warmer relationship than the data supports, the moment reality contradicts it, trust breaks immediately and is hard to recover mid-call.
*Receipt: full technical framing, the variable and its four branches.*

---

### BLOCK automjet-05 — Hindi is handed off, never faked
*kind: decision · source: automjet/voice-agent.md §2; retell-build-guide-v5.md Learning 5 · visual: none*

> The Hinglish rule is comfort-based, not keyword-based: continue in English through mixed-in Hindi words, and hand off warmly to a human Hindi callback only if the caller asks to switch, replies only in Hindi, or clearly can't continue. Never attempt a half-Hindi conversation, a bad Hindi bot damages trust worse than an honest handoff.

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> Hand off to a human for Hindi rather than fake it. Code-switching happens faster than a keyword rule can reliably catch, so the fix is a comfort-based judgment call, not a language-detection feature: keep going in English through mixed Hindi words, and only hand off when the caller genuinely needs Hindi.
> **+buys:** no caller ever gets a half-broken bilingual conversation. **−costs:** a real callback queue for Hindi speakers instead of a fully self-serve system.
*Receipt: a decision with a stated cost.*

**Engineer — depth: full**
> The GL global node triggers on an explicit ask to switch, replies that are only Hindi, or a clear inability to continue in English, and does not fire on a few Hindi words mixed into English. On trigger it sets `language_handoff = true`, captures a rough callback time if offered, and exits to a dedicated ending node rather than attempting Hindi generation.
*Receipt: full technical framing of the actual trigger condition.*

---

### BLOCK automjet-06 — Compliance is a pre-dial gate, not a conversation feature
*kind: decision · source: automjet/voice-agent.md §7; retell-build-guide-v5.md Part 10.1 · visual: none*

> India's telemarketing rules (TCCCPR, amended 2025) apply to AI calls the same as human ones. Designed as a hard pre-dial gate: DND/NCPR scrubbing per batch, correct sender-number series per consent basis, a permitted calling window, DLT registration, and `do_not_call` honored instantly and suppressed across systems.

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> Put the regulatory checks upstream of the conversation entirely, as a gate before anything dials, rather than something the conversation design has to handle mid-call. This is the same instinct nine years in regulated payments teaches: a compliance failure caught after the call has already happened is not a compliance program.
*Receipt: nine years in regulated fintech shows up directly in how this gate is placed, worth surfacing to a founder audience.*

**Engineer — depth: full**
> DND/NCPR scrubbing before every batch (status changes daily), the correct number series (140 promotional / 1600 service) per `consent_basis`, a conservative 10:00–19:00 recipient-local calling window, DLT registration, and `do_not_call` honored instantly and suppressed across systems. Disclosure posture: answers honestly if asked whether it's an AI, never claims to be human.
*Receipt: the full gate, as a structure independent of the conversation flow.*

---

### BLOCK automjet-07 — The ladder is one-way
*kind: mechanism · source: automjet/voice-agent.md §4; retell-build-guide-v5.md Part 7, Learning 2 · visual: state-graph*

> The only downward moves are N5 → N7 → N8 → close. No transition exists back up: once a rung is declined, no node can re-offer it, not because a prompt says not to, but because the edge isn't there. N9 (objections) returns to the current rung exactly once; a second decline routes down, never back into another round. Because the ladder can only go down or exit, there is no structural way to loop.

**Recruiter — depth: omit**

**Founder / PM — depth: brief**
> The fallback ladder only moves one way: test ride, then team connect, then classify, never back up. That's the mechanism behind "no lead gets pitched at three times."
*Receipt: the founder gets the plumbing in one line; the full mechanism is the engineer's to read.*

**Engineer — depth: lead**
> The only downward moves are N5 → N7 → N8 → close. No transition exists back up: once a rung is declined, no node can re-offer it, not because a prompt says not to, but because the edge doesn't exist. The objection node (N9) returns to the current rung exactly once; a second decline routes down. The earlier build kept re-pitching through a clear no even with a prompt that explicitly forbade it, which is the whole lesson: an instruction is a suggestion a model drifts from under pressure, a missing transition is not.
*Receipt: the lead mechanism block on the engineer artifact, rendered with the state graph beside it.*

---

### BLOCK automjet-08 — The transition condition is the real instruction
*kind: mechanism · source: automjet/voice-agent.md §4; retell-build-guide-v5.md Learning 3 · visual: none*

> Discovery's earlier prompt said "don't interrogate" while gating advancement on five filled fields, so it interrogated anyway. The fix was the gate, not the wording: advance as soon as one recommendation is possible, one question per turn, everything else captured only if volunteered.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: lead**
> Discovery used to say "don't interrogate" in the prompt while gating advancement on five filled fields. It interrogated anyway. The fix was the gate, not the sentence: advance the moment one recommendation is possible, cap at one question per turn, treat everything else as opportunistic. In a node-based flow, the transition condition is the real instruction, a tone note in the prompt is a suggestion the transition condition can silently overrule.
*Receipt: this is the insight that carries the whole engineer page, deliberately given lead placement.*

---

### BLOCK automjet-09 — Sounding human is six coordinated levers
*kind: mechanism · source: automjet/voice-agent.md §5; retell-build-guide-v5.md §2.4, Learning 6 · visual: none*

> Voice speed 0.92-0.95, interruption sensitivity 0.7-0.9 so a "no" cuts the agent off instantly, semantic endpointing, sub-800ms to first word with streaming TTS, tuned turn-taking windows per node type, light backchannel that never talks over a "no." Naturalness is the product of all six pointing the same direction at once, not any single setting.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> Voice 0.92-0.95 speed, interruption sensitivity 0.7-0.9, semantic endpointing (don't cut in on "umm" or a breath), turn-taking tuned per node (snappier ~1300ms max on yes/no nodes, roomier ~1800ms on time-capture), backchannel on at ~0.5, sub-800ms to first word with streaming TTS, boosted Hinglish keywords. Fixing only one of these without the others still sounds robotic, naturalness is a system, not a voice choice.
*Receipt: full production settings, the kind of specificity the engineer lens is built to reward.*

---

### BLOCK automjet-10 — Per-node model routing
*kind: mechanism · source: automjet/voice-agent.md §6; retell-build-guide-v5.md Part 8 · visual: none*

> Premium model only where judgment lives: discovery, recommendation, objections, KB answers. Fast/cheap everywhere else, including the opening nodes, kept low-latency because the first ten seconds decide the call.

**Recruiter — depth: omit**

**Founder / PM — depth: brief**
> Cost isn't a single dial, premium models run only where judgment actually happens; everything else is fast and cheap.
*Receipt: enough for the founder to see the discipline without the per-node table.*

**Engineer — depth: full**
> Premium model on N3 (discovery), N4 (recommendation), N9 (objections), and GK (knowledge-base answers), the nodes where judgment lives. Fast/low-latency model on N1, N2, N5, N6, N7, N8, every ending node, and the other global nodes, kept low-latency deliberately even where slightly pricier, because the opening's rhythm is where naturalness is won.
*Receipt: the full routing table.*

---

### BLOCK automjet-11 — The post-call record
*kind: mechanism · source: automjet/voice-agent.md §8; retell-build-guide-v5.md Part 9.1 · visual: none*

> Every call writes a structured record: `call_status` read from the ending node reached, model of interest, use case, purchase timeline, preferred times, objections raised, sentiment, language-handoff / needs-human / do-not-call flags, and free-text follow-up notes, delivered by webhook.

**Recruiter — depth: full**
> Every call ends in a structured record: what happened, which model they're interested in, when they might buy, what to follow up on. It's the same output format the agent produces for every real customer, applied here to itself.
*Receipt: the recruiter's genre is literally shaped like this record (§9.1's "it seemed only fair" joke), so this block is close to verbatim what they're reading.*

**Founder / PM — depth: omit**

**Engineer — depth: full**
> `call_status` (matches the ending node reached, never inferred from sentiment or keywords afterward), `call_summary`, `lead_source`, `model_of_interest`, `use_case`, `purchase_timeline`, `test_drive_preferred_time`, `sales_meeting_preferred_time`, `callback_time`, `objections_raised`, `current_vehicle`, `sentiment`, `language_handoff`, `needs_human`, `do_not_call`, `key_notes_for_followup`. The outcome is read, never guessed: `call_status` comes from which ending node the conversation actually reached.
*Receipt: the full schema, and the deterministic-outcome principle stated plainly.*

---

### BLOCK automjet-12 — The funnel, and the recordings
*kind: metric · source: automjet/voice-agent.md §"Status" · visual: paired-recordings*

> ~500 calls/month. ~70% connect, ~40% complete the full conversation, ~20% convert to a test ride/meeting/warm lead, ~20% end cold. Two real calls are shown side by side, one booked test ride, one cold lead, with equal visual weight, because with both outcomes present the funnel stops being a disclaimer and becomes the product working as designed.

**Recruiter — depth: full**
> Roughly 7 in 10 people pick up, and about 2 in 10 end up booking a test ride, booking a meeting, or becoming a warm lead. The rest are sorted into warm or cold so nobody wastes a call on them later. You can hear two real calls on this page. One books a test ride. One doesn't. Both are here on purpose.
*Receipt: the recruiter sees the plain numbers and the honest framing of why a "failed" call is shown at all.*

**Founder / PM — depth: full**
> ~500 calls/month. ~70% connect, ~40% complete the full conversation, ~20% convert. A call that ends cold is still a read outcome, not a wasted one, that's the whole design.
*Receipt: same figures, the founder framing (the funnel as the product working, not an apology).*

**Engineer — depth: brief**
> ~70% connect / ~40% full completion / ~20% terminal-node conversion; the remaining ~20% classify cold. The annotated transcript for the cold call (automjet-15) shows the ladder stepping down live.
*Receipt: the number, pointed at the artifact that makes it concrete for this lens.*

---

### BLOCK automjet-13 — Cost levers, ranked
*kind: metric · source: automjet/voice-agent.md §6; retell-build-guide-v5.md Appendix C · visual: cost-levers-table*

> Production voice AI bills every layer separately (~$0.13-0.31/min all-in). Ranked: (1) end bad calls fast, voicemail detection, quick disqualification, one-line closings, the one-way ladder itself, since you pay per minute including ringing, hold, and silence; (2) per-node model routing, premium only where judgment lives; (3) premium voice where it pays, a lean global prompt, one small KB, SIP trunking at volume, upstream DND scrubbing.

**Recruiter — depth: omit**

**Founder / PM — depth: lead**
> The economics, ranked, because the ordering is the insight: ending bad calls fast beats every model optimization. A call that hangs up in three seconds costs almost nothing; a call that loops costs real minutes for no outcome. Get the structure right first, then tune the model choice.
*Receipt: the founder's currency of proof is a decision with a cost, this is the cost side made explicit and ranked.*

**Engineer — depth: omit**
*(folded into automjet-10's per-node routing; the engineer artifact treats this as one mechanism, not a separate cost essay)*

---

### BLOCK automjet-14 — The conversation-flow graph
*kind: visual · source: retell-build-guide-v5.md Appendix A · visual: state-graph*

> Nine conversation nodes, four global nodes, ten ending nodes. Removed edges are struck in red, red is literally cost here, the back-edges were what the earlier design's looping cost. The design is the edges that don't exist.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: lead**
> The full graph: N1 Greeting → N2 Reason/Permission → N3 Discovery → N4 Suggest/Affirm Model → N5 Invite Test Ride → N6 Capture Visit → END Test Ride Booked; N5 declined → N7 Team Connect → N7 declined → N8 Nurture/Classify → END Warm or Cold; objections → N9, returns to the current rung once, then steps down. Four global nodes reachable from anywhere: GK (factual Q&A, KB-grounded), GD (do-not-call), GL (language handoff), GH (human/out-of-scope). The struck-through edges, a re-pitch back up the ladder, a second return from N9, are what the earlier build had and this one deliberately does not.
*Receipt: the engineer artifact's lead visual, per §9.2 — the state graph with removed edges struck in red.*

---

### BLOCK automjet-15 — The paired recordings, in transcript-fallback mode
*kind: visual · source: automjet/voice-agent.md primary sources note (recordings pending, OQ8) · visual: paired-recordings*

> **[PLACEHOLDER — pending Prashant, gated on OQ8]** Two real calls, one booked test ride and one cold lead, side by side with equal weight, each with its extracted post-call record beneath it. Until consent or confirmed test-call status clears, this renders masked transcript excerpts (numbers as `+9193***7036`, the source docs' own masking convention) instead of audio, `<audio>` controls never ship ahead of that confirmation.

**Recruiter — depth: lead**
> Listen to 20 seconds of either call (or read the masked transcript excerpt, until recordings clear). One booked a test ride. One didn't. Both are shown, on purpose.
*Receipt: the recruiter genre's centerpiece per §9.2, a screening summary shaped like the agent's own record.*

**Founder / PM — depth: omit**
*(the founder artifact treats the funnel/recordings pairing as part of automjet-12 instead, framed as evidence for the bet, not a standalone visual)*

**Engineer — depth: full**
> The annotated transcript is the engineer signature object: each recording's transcript with margin marks showing the active node per turn. The cold call's annotation shows the ladder stepping down live, N5 declined → N7 → declined → N8 → classified cold, exactly the structure in automjet-07 and automjet-14, made concrete against a real conversation instead of asserted as a diagram.
*Receipt: full technical treatment, the mechanism made visible against real (masked, pending) transcript data.*

---

### BLOCK automjet-16 — The register rewrite, wrong vs. right
*kind: visual · source: retell-build-guide-v5.md Learning 7 · visual: register-table*

> Fluency research gets you Western sales idiom ("so I thought I'd give you a quick ring," "honestly that's the sweet spot"); it doesn't get you the right register for a Thane showroom. The rewrite: "Hi," never "Hey"; simple present tense; "scooty," never "electric vehicle"; humble acknowledgements, never bubbly ones; one ask per turn, never everything in one breath.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> Wrong: "so I thought I'd give you a quick ring" / Right: "I am calling you about that." Wrong: "the best way to know is to actually ride it, would you like to pop by" / Right: "the best thing you can do is take a test ride. What do you think?" Wrong: "honestly, that's the sweet spot" / Right: "Okay sir, I will help you with that." Naturalness research produces fluent speech; it doesn't automatically produce the right register for the specific culture and context, register has to be sourced from how the target audience actually talks, not general voice-AI best practice, which defaults to Western sales idiom.
*Receipt: the one visual §9.2 calls "the recruiter's one rich visual, instantly legible" in spirit, but placed with the engineer's full technical framing here since this file's engineer artifact carries the full table.*

---

### BLOCK automjet-17 — What was cut
*kind: fact · source: automjet/voice-agent.md §9; retell-build-guide-v5.md Appendix F · visual: none*

> The build says "I will send you the showroom address on SMS" but sends nothing, a spoken line only, documented as such. Real SMS and live slot-booking are named upgrades, deferred on purpose: nail the conversation first.

**Recruiter — depth: brief**
> What's not claimed: no SMS is actually sent, and there's no live booking system behind the scenes yet. The conversation came first.
*Receipt: the recruiter artifact's closing honesty line, per §9.2.*

**Founder / PM — depth: full**
> What was cut: real SMS, live slot-booking. The build says it will send the showroom address on SMS but doesn't, that's a spoken line only, documented as such rather than hidden. The sequencing call was to nail the conversation first and add real infrastructure after, not to build every feature simultaneously and ship a shakier core.
*Receipt: a stated cut with its reasoning, the founder's currency of proof.*

**Engineer — depth: omit**

---

### BLOCK automjet-18 — What's watched
*kind: fact · source: automjet/voice-agent.md §8; retell-build-guide-v5.md Appendix D · visual: none*

> Warm/cold classification accuracy is audited against reality (it compounds into future runs), loop incidents are tracked with a target of ~0, and early hang-ups in the first ~15 seconds are watched as the opening/naturalness proxy.

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> What's watched, ongoing: classification accuracy audited against reality, loop incidents (target ~0), early hang-ups under 15 seconds. These are the numbers that would catch a regression before it shows up as a worse funnel three months from now.
*Receipt: the founder wants to know this isn't a fire-and-forget system.*

**Engineer — depth: omit**
*(folded into automjet-11's post-call schema)*

---

### BLOCK automjet-19 — The throughline
*kind: quote · source: automjet/voice-agent.md §10; retell-build-guide-v5.md Appendix E closing · visual: none*

> "Every fix in this project came from the same root move: turn an instruction into a structure. … Instructions alone are suggestions a large language model can and will drift from under pressure; structure, transitions that don't exist, variables that gate behavior, node logic that checks prior context, is what actually holds under real, messy phone calls."

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> **variant:** rendered as a pull-quote in the margin, verbatim.
> The line that generalizes past this one build: every fix here came from turning an instruction into a structure, "don't interrogate" became a transition condition, "don't loop" became a one-way ladder, "don't sound robotic" became specific, testable settings. Instructions are suggestions a model drifts from under pressure; structure is what holds.
*Receipt: the closing block on the engineer artifact, the same move the site's own thesis (D9) makes about itself.*

---
---

## PRODUCT: grounded-governance

**Canonical facts:** built solo, live at `pact-wise-guide.lovable.app` (confirmed 2026-07-19). Stack: TanStack Start on Cloudflare Workers, Supabase Postgres with pgvector + full-text search, Voyage embeddings, Anthropic models per pipeline step. No real users yet, no usage numbers exist.

### Artifact composition

**Recruiter — genre: record**
Order: gg-01, gg-15, gg-12, gg-24, gg-14

**Founder / PM — genre: memo**
Order: gg-01, gg-24, gg-03, gg-04, gg-05, gg-21, gg-14, gg-12

**Engineer — genre: review**
Order: gg-06, gg-07, gg-08, gg-09, gg-10, gg-11, gg-16, gg-17, gg-18, gg-19, gg-20, gg-12, gg-22

---

### BLOCK gg-01 — The problem and the one user
*kind: fact · source: grounded-governance/grounded-governance.md §1 · visual: none*

> A PM or engineer shipping an AI feature gets told "make sure it's compliant" and handed hundreds of pages of regulation that don't cross-reference each other. Generic search can't reason across them; general assistants produce plausible, subtly wrong answers, and in this domain a wrong answer is worse than no answer. The PRD designs for exactly one user, the PM or engineer told to make a feature compliant, and explicitly defers lawyers, auditors, and compliance analysts.

**Recruiter — depth: lead**
> If you build an AI feature that scores loan applicants or ranks job candidates, someone eventually tells you to "make sure it's compliant" and hands you several hundred pages of regulation. Grounded Governance reads your description of what you're building and gives you back the obligations that actually apply to it, each one pointing at the exact paragraph it came from.
*Receipt: the recruiter's currency of proof is a plain-language read on what it is and why, before anything about how it works.*

**Founder / PM — depth: brief**
> One user, chosen on purpose: the PM or engineer told to make a feature compliant. Not lawyers, not auditors, not compliance analysts. Designing for all of them would have produced something tuned for none of them.
*Receipt: the scoping decision the founder lens leads with; full user framing lives in gg-24.*

**Engineer — depth: omit**

---

### BLOCK gg-02 — The obligation map, not a chat box
*kind: fact · source: grounded-governance/grounded-governance.md §2 · visual: obligation-map*

> The user describes their system; the product returns an Obligation Map with three priority tiers (Applies / Likely relevant / Possibly relevant), each card carrying a plain-language obligation, a "why this applies to your system" rationale, citations, and an applicability label (Direct/Inferred/Possible, never a false-precision percentage). One clarifying question, never a form, if a critical attribute is missing.

**Recruiter — depth: brief**
> The part I care about is what it does when it doesn't know. Ask it something the source documents don't cover and it says so, rather than producing a confident answer that sounds right.
*Receipt: the recruiter gets the honesty behavior stated plainly, ahead of the mechanism.*

**Founder / PM — depth: omit**
*(folded into gg-03, the commodity-risk framing subsumes this)*

**Engineer — depth: omit**
*(the engineer artifact goes straight to the pipeline mechanics, gg-06 onward)*

---

### BLOCK gg-03 — Naming the commodity risk before building
*kind: decision · source: grounded-governance/source-prd.md, risk table (line ~157); grounded-governance.md §3 · visual: none*

> "A grounded RAG demo over PDFs is a commodity" is named as a product risk in the PRD itself, before building, not discovered afterward. The answer is structural: the output is a prioritized map, not a chat box, and the product's own evaluation scores are a first-class in-product page, not a claim in a README.

**Recruiter — depth: omit**

**Founder / PM — depth: lead**
> A grounded document assistant over PDFs is a commodity in 2026, and I wrote that down as a product risk before building rather than discovering it afterwards. So the answer had to be structural: the output is a prioritized map of obligations rather than a chat box, and the product's own evaluation scores are a page inside it, not a claim in a README.
*Receipt: the founder artifact's opening move, the risk stated and answered in the same breath.*

**Engineer — depth: omit**

---

### BLOCK gg-04 — Risk to requirement, the PRD's signature move
*kind: decision · source: grounded-governance/grounded-governance.md §3 (table) · visual: risk-requirement-ledger*

> Every product risk becomes a hard requirement, not a disclaimer. Liability, a user acting on a wrong answer, becomes: never a verdict, decision-support framing at the point of answer, conflicts surfaced not resolved, out-of-corpus refused. Staleness becomes: every retrieved unit carries a version and snapshot date. Scope creep becomes: the out-of-scope list is binding.

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> Every risk became a requirement instead of a disclaimer. Liability means it never issues a verdict and never resolves a conflict between two frameworks, it shows both sides cited and lets you decide. Staleness means every claim carries the version and snapshot date it came from. Scope creep means the out-of-scope list is binding, written so that adding anything requires an explicit decision.
> **+buys:** a system that names its own failure modes and closes them structurally, not with a disclaimer. **−costs:** real engineering work per risk (a versioning scheme, a refusal path, a bounded scope) instead of one paragraph of legal-sounding caveats.
*Receipt: the risk-requirement ledger visual sits beside this block, the founder's clearest single artifact.*

**Engineer — depth: omit**
*(the engineer artifact treats the fence, gg-09, and the corpus versioning, gg-07, as the technical instantiations of this; the ledger itself is the founder's object)*

---

### BLOCK gg-05 — Sequencing as risk management
*kind: decision · source: grounded-governance/source-build-plan.md, "measure the finished product once rather than twice" note (§0 latest+6); grounded-governance.md §9 · visual: phase-gate-rail*

> The build plan front-loads the existential risk: prove groundedness on one framework (GDPR) before touching the other four or building a single polished screen. The comprehensive 64-item eval and the formal 24-item gate were both deliberately deferred to one combined run after the whole app was built, a written, standing sequencing decision, not an omission.

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> The sequencing was the real bet: prove groundedness on one framework before touching the other four or building a single polished screen. If that gate had failed, I'd have spent the least possible effort finding out. The formal evaluation runs were then deliberately held for one combined measurement of the finished product, "measure the finished product once rather than twice," a written decision, not a shortcut.
*Receipt: sequencing-as-risk-management is exactly the discipline a founder audience is being asked to trust; stated in full here.*

**Engineer — depth: omit**

---

### BLOCK gg-06 — The corpus
*kind: mechanism · source: grounded-governance/grounded-governance.md §4 · visual: corpus-bar*

> Five frameworks, one per governance dimension, GDPR (privacy), EU AI Act (AI regulation), NIST AI RMF (AI risk), CSF 2.0 (cybersecurity), SSDF (secure development). Each parsed deterministically to its native hierarchy into committed, reviewable JSON: 630 parents, 1,573 child chunks, one immutable snapshot promoted only on a clean validation gate. SSDF's flattened tables are filed by id-prefix, never position.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: lead**
> Five frameworks, each parsed deterministically to its own native hierarchy rather than a shared generic schema: GDPR 99/99 articles + 173/173 recitals, EU AI Act 113/113 articles + 180/180 recitals + 13 annexes (`Annex III(5)(b)` resolves), CSF 22 categories/106 subcategories, SSDF 19 practices/42 tasks (its flattened 3-column PDF tables filed by id-prefix, never position, since position in a flattened table isn't stable), AI RMF 7 characteristics/72 subcategories. 630 parents, 1,573 child chunks total, one immutable snapshot promoted only on a clean validation gate. Recitals are included deliberately, retrieval itself surfaced GDPR Recital 71 (the reasoning behind Article 22) above the operative article, which upgraded "include recitals" from nice-to-have to a real quality lever.
*Receipt: the engineer's lead mechanism block, full corpus detail.*

---

### BLOCK gg-07 — Parent-child chunking
*kind: mechanism · source: grounded-governance/grounded-governance.md §4 · visual: none*

> Retrieval operates over small child chunks (paragraph/point); generation receives the surrounding parent (article) for context. Snapshots are immutable and promoted only on a clean validation gate; every answer records its snapshot_id.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> Retrieval runs over small child chunks so matching stays precise; generation receives the parent (the full article) so the model has enough surrounding context to reason correctly, rather than a bare paragraph stripped of its clause structure. Every answer records the `snapshot_id` it was generated against, so staleness (§gg-04's risk) is closed structurally rather than by a disclaimer.
*Receipt: full technical detail, direct link back to the risk-requirement ledger's staleness row.*

---

### BLOCK gg-08 — The retrieval pipeline
*kind: mechanism · source: grounded-governance/grounded-governance.md §5 · visual: pipeline-diagram*

> understand (Haiku: input type, sufficiency, subqueries) → hybrid retrieval (pgvector dense + Postgres FTS keyword, RRF fusion, citation-pinning for named units) → rerank → parent expansion → generation (structured output, grounding fence) → the citation-validation fence → assembly → SSE streaming, first tier first.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> `understand` (Haiku, structured output: input type, sufficiency, subqueries, a system description fans out across all five dimensions by design, so cross-framework coverage isn't luck) → hybrid retrieval (pgvector dense plus Postgres full-text keyword search, fused with RRF, plus citation-pinning for named units like "Article 22") → rerank → parent expansion → generation (structured output; `supporting_chunk_ids` must come from the supplied set) → the citation-validation fence (gg-09) → assembly (citation chips built from chunk metadata, never parsed from model text, so a hallucinated citation label has no path to the screen) → SSE streaming, first tier first.
*Receipt: the full pipeline, the mechanism half of the engineer artifact's centerpiece.*

---

### BLOCK gg-09 — The fence
*kind: mechanism · source: grounded-governance/grounded-governance.md §5 · visual: pipeline-diagram*

> After generation, a post-generation entailment check verifies each claim is actually supported by the parents it cites. Unsupported claims are dropped or flagged, never rendered as a confident citation. The model is never trusted to vouch for its own grounding.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: lead**
> The fence is the point. After generation, an entailment pass checks every claim against the specific sources it cites. Anything unsupported is dropped or flagged, never rendered as a confident citation. The model is not trusted to vouch for its own grounding, and citation chips are built from chunk metadata rather than parsed out of model text, so a hallucinated citation label has no path to the screen. This mirrors Grounded Governance's own product mechanism back at the site itself, the same "don't let the generator grade itself" instinct.
*Receipt: given lead placement in the engineer artifact, per §9.3's framing of the fence as the centerpiece for every lens.*

---

### BLOCK gg-10 — A real API constraint, designed around
*kind: mechanism · source: grounded-governance/source-build-plan.md, model config note (line ~703); grounded-governance.md §5 · visual: none*

> Forced tool-use (the structured-output mechanism actually used) is incompatible with extended thinking. The combination had to be explicitly resolved per pipeline step, not assumed to just work together.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> Forced tool-use, the structured-output mechanism used throughout the pipeline, cannot be combined with extended thinking in the same call. This isn't a hypothetical edge case, it's a real constraint that had to be resolved per pipeline step (which steps need thinking, which need guaranteed structure) rather than assumed away, and getting it wrong would have silently dropped structure or silently dropped reasoning depending on which way the conflict resolved.
*Receipt: a real, specific limit, the kind of admitted constraint the engineer lens rewards over a claim of seamless integration.*

---

### BLOCK gg-11 — Latency measured, not assumed
*kind: metric · source: grounded-governance/grounded-governance.md §5 · visual: latency-bars*

> Query understanding plus retrieval alone measured 4.2-5.3s against the deployed system, essentially the whole 5-second first-tier budget before generation even starts. Streaming was pulled into the backend phase as a requirement, not bolted on later as UI polish.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> Understanding + retrieval measured 4.2-5.3s against the deployed system, essentially the entire 5-second first-tier latency budget before generation starts. That measurement, not a guess, is what moved SSE streaming into the backend phase as a hard requirement instead of a UI concern bolted on after the fact, avoiding a second pass on the response shape once the numbers came back worse than assumed.
*Receipt: assumed-vs-measured is exactly the kind of gap the engineer lens is built to surface.*

---

### BLOCK gg-12 — The eval story, honestly reported
*kind: metric · source: grounded-governance/grounded-governance.md §6 · visual: eval-score*

> Retrieval: proven, 7/7 on the GDPR gate slice. The first full generation eval run FAILED: groundedness 93.3% (target 95, fail), correct-refusal 83.3% (target 90, fail), citation accuracy 93.8% (target 90, pass). Six root-caused fixes, each individually re-verified. The comprehensive re-run is deliberately deferred to launch. First-run numbers are quotable only with the interim-config caveat (a temporary Sonnet 5 generation model, not the Opus 4.8 the system reverts to).

**Recruiter — depth: lead**
> There's a page inside the product showing its own test scores, including the run where it missed the bar I'd set. Retrieval, the foundation everything else depends on, is proven: 7 out of 7 on the hardest test slice. The first full end-to-end run came in short of target on two of three metrics. Six causes were found and fixed. The comprehensive re-run is scheduled before launch, not run yet.
*Receipt: the recruiter's centerpiece, per §9.3, a failing scorecard with the diagnosis attached read as a plain outcome, not hidden.*

**Founder / PM — depth: full**
> The first full evaluation run failed, 93.3% groundedness against a 95% bar, 83.3% correct-refusal against 90%. Six root causes found and fixed. The comprehensive re-run is deliberately held for launch, to measure the finished product once rather than a moving one twice. **Every first-run number above certifies the interim configuration** (a temporary Sonnet 5 generation model, since reverted to Opus 4.8 for the real gate) and should never be read as the final score.
*Receipt: full numbers with the required interim-config caveat, never rounded up.*

**Engineer — depth: brief**
> Retrieval proven, 7/7 on the GDPR gate slice. The first full generation eval run failed on two of three targets: groundedness 93.3% against a 95% bar, correct-refusal 83.3% against 90%; citation accuracy passed at 93.8%. Six root causes found and fixed, each re-verified individually. First-run numbers certify only the interim configuration (a temporary Sonnet 5 generation model, since reverted to Opus 4.8) — the comprehensive re-run is deliberately deferred to launch.
*Receipt: §9.3 makes the honest eval story the centerpiece for every lens, not just recruiter/founder — the engineer view states the same failing numbers before moving into the eval-harness mechanism (gg-22) that produced them.*

---

### BLOCK gg-13 — The build plan's own words
*kind: quote · source: grounded-governance/grounded-governance.md §6 (quoted verbatim from the build plan) · visual: none*

> "Don't repeat 'groundedness is proven' to a stakeholder yet, say 'the foundation it depends on is proven.'"

**Recruiter — depth: omit**

**Founder / PM — depth: omit**
*(the quote itself is the required verbatim margin note on the page per §9.3, rendered by the page shell rather than composed into the memo's block order, so it is marked omit here to avoid double-counting; the reviewer should confirm the page template renders it regardless of lens)*

**Engineer — depth: omit**

---

### BLOCK gg-14 — The comprehensive re-run, deferred with its reason stated
*kind: fact · source: grounded-governance/grounded-governance.md §6, §9 · visual: none*

> The 64-item comprehensive re-run and the formal 24-item Phase D gate are both explicitly not yet run since the six fixes landed. The stated reason is written into the build plan itself: measure the finished product once, with the generation model reverted to Opus 4.8, rather than measuring it twice against a moving target.

**Recruiter — depth: brief**
> The comprehensive re-run hasn't happened yet, on purpose, it's scheduled for once the whole product is finished, not partway through.
*Receipt: the recruiter's closing honesty line on the eval story, mirroring §9.2's automjet close.*

**Founder / PM — depth: full**
> Both the 24-item and 64-item gates are deliberately not re-run since the six fixes landed. The decision, written down rather than assumed: measure the finished product once rather than twice, and revert the generation model to Opus 4.8 before that measurement, so the number that ships is the real one, not an artifact of a temporary cost-saving model swap.
*Receipt: the deferral decision as scope discipline, in writing, per §17's own framing of similar decisions elsewhere on the site.*

**Engineer — depth: omit**

---

### BLOCK gg-15 — The Article 99 story
*kind: fact · source: grounded-governance/grounded-governance.md §6 · visual: none*

> Asked what GDPR Article 99 says about AI training data, a real article that's actually about entry into force, the system retrieves the actual text and says what it really says, and that it isn't what was asked, rather than dodging or fabricating. Verified live. Bonus nuance it caught: the EU AI Act has its own, different Article 99.

**Recruiter — depth: lead**
> Ask it what GDPR Article 99 says about AI training data, a real article number, but one that's actually about something else entirely (when the regulation takes effect). It retrieves the real text, tells you that's what it actually says, and that it isn't what you asked about, instead of guessing at an answer that sounds plausible. That one example is most of the pitch.
*Receipt: the recruiter's three-panel signature story per §9.3, the entire argument compressed into one concrete example.*

**Founder / PM — depth: omit**

**Engineer — depth: omit**
*(the mechanism behind this, the fence, is gg-09; the engineer reads the structure, not the anecdote)*

---

### BLOCK gg-16 — Incident: the RLS exposure
*kind: incident · source: grounded-governance/grounded-governance.md §7.1 · visual: incident-ledger*

> "RLS disabled" did not mean server-only on this hosting platform, its default grants meant the public anon key could read and write every table, bypassing the app. Caught by the platform's automated scan, fixed same day (RLS on, zero policies, service-role bypasses), then verified again by re-attempting the exploit rather than trusting the setting.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: lead**
> What happened: "RLS disabled" on this platform did not mean server-only access, its default grants meant the public, non-secret anon key could read and write every table, bypassing the application entirely. How caught: the platform's own automated security scan. Fix: RLS enabled with zero policies plus a service-role bypass for legitimate server calls, shipped the same day. Verification: not trusting the setting, re-attempting the actual exploit and confirming it now failed. No real users existed yet, which is exactly why this check runs before launch rather than after.
*Receipt: the first, most severe row of the incident ledger, given lead placement.*

---

### BLOCK gg-17 — Incident: the dead keyword arm
*kind: incident · source: grounded-governance/grounded-governance.md §7.2 · visual: incident-ledger*

> `websearch_to_tsquery` was silently AND-ing every word, killing keyword retrieval for natural-language questions. Found by the retrieval eval, not by a user.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> What happened: Postgres's `websearch_to_tsquery` was silently AND-ing every word in a query, so any natural-language question with more than a couple of terms returned nothing from the keyword arm of hybrid retrieval. How caught: the retrieval eval harness, not a live user complaint. Fix and verification: `evals/check_retrieval.mjs`, the reusable retrieval-eval script, re-run clean afterward; the harness itself is what's rerun against later corpus expansions.
*Receipt: the second ledger row.*

---

### BLOCK gg-18 — Incident: the silent wrong-parent-link risk
*kind: incident · source: grounded-governance/grounded-governance.md §7.3 · visual: incident-ledger*

> The validation gate checked child citation-label uniqueness but not parent, a collision would have linked children to the wrong parent with zero errors raised, anywhere. Found by tracing load logic end-to-end before it ever fired.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> What happened: the validation gate checked that child citation labels were unique, but never checked parent labels for the same uniqueness, so a parent-label collision could silently link a child chunk to the wrong parent article with zero errors raised anywhere in the pipeline. How caught: found by tracing the load logic end to end before it ever fired in production, not by an incident. Fix: the missing uniqueness check, plus a defense-in-depth throw if it's ever violated again.
*Receipt: the third ledger row, the one caught before it could ever have caused visible harm.*

---

### BLOCK gg-19 — Incident: fix the class, not the field
*kind: incident · source: grounded-governance/grounded-governance.md §7.4 · visual: incident-ledger*

> Three malformed-tool-call crashes in one session, three different fields. Stopped patching individual fields and wrapped the whole parse in a bounded retry instead.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> What happened: three separate malformed-tool-call crashes surfaced in one session, each caused by a different field failing to parse as expected. How caught: normal development, not a scan or an eval. Fix: instead of patching each field's parsing individually (which would just wait for the fourth field to break), the whole tool-call parse was wrapped in a bounded retry, fixing the class of failure rather than each instance of it.
*Receipt: the fourth ledger row, a generalizable engineering instinct rather than a one-off patch.*

---

### BLOCK gg-20 — The non-incident: rate limiter fail-open
*kind: incident · source: grounded-governance/grounded-governance.md §7.5 · visual: incident-ledger*

> A live burst test of 10 rapid requests returned all 200s, no 429s, looking broken. Root cause: a transient schema-cache lag right after a migration, silently absorbed by the fail-open path, which is exactly what fail-open is for. Minutes later, it blocked at precisely request 9 of 10, as configured, and was re-verified clean.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> What happened: a live burst test, 10 rapid requests, returned all 200s and no 429, which looked like the rate limiter had silently failed. How caught: the burst test itself. Fix (or rather, the correct read): root-caused to a transient schema-cache lag right after a recent migration, which the fail-open path was silently absorbing, exactly what fail-open exists to do, not a bug. Verification: minutes later, the same test blocked at precisely request 9 of 10 as configured, and was re-verified clean. Included in the ledger deliberately as the fifth row, because a "fail-open worked correctly and looked alarming" story is itself worth publishing, it shows the difference between a bug and a system behaving exactly as designed under a transient condition.
*Receipt: the fifth ledger row, deliberately not dramatized past what it actually was.*

---

### BLOCK gg-21 — The $5 budget episode
*kind: fact · source: grounded-governance/grounded-governance.md §8; source-build-plan.md §0 (session log, "$5" entries) · visual: none*

> The Phase D eval was costed from the harness's actual call structure before spending: 24 items, 7 generations plus 13 refusals plus 4 clarifies, only the 7 generations expensive, estimated ~$1.6 (worst case ~$3.4) against a $5 budget. The generation model was downshifted Opus to Sonnet as an explicit temporary lever with a written revert condition.

**Recruiter — depth: omit**

**Founder / PM — depth: full**
> The eval was costed from the harness's real call structure before a dollar was spent, 24 items break down into 7 generations, 13 refusals, and 4 clarifies, and only the generations are expensive to run, so the estimate came in at roughly $1.6, worst case $3.4, against a $5 budget. When the number still needed trimming, the generation model was downshifted from Opus to Sonnet as an explicit, temporary lever, written down with the exact condition for reverting it, not silently absorbed as the new normal.
*Receipt: a real budget constraint, treated as an engineering decision with a stated cost and a stated reversal condition, exactly the founder lens's currency of proof.*

**Engineer — depth: omit**
*(the model-per-step discipline this reflects is already covered by gg-08's pipeline block; kept out of the engineer artifact to avoid restating the same fact twice)*

---

### BLOCK gg-22 — The golden-set design
*kind: metric · source: grounded-governance/grounded-governance.md §6 · visual: golden-set-split*

> 64 questions with human-verified expectations, deliberately weighted toward hard cases: cross-framework synthesis, out-of-corpus (should refuse), adversarial (designed to bait a confident unsupported answer), direct lookup as baseline. Targets: groundedness ≥95%, citation accuracy ≥90%, correct-refusal ≥90%. The harness runs against the deployed product and can publish to the in-product eval page (secret-gated write, so the page can't be spoofed).

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: full**
> 64 items, weighted deliberately toward the hard cases rather than the easy ones: cross-framework synthesis questions, out-of-corpus questions that should trigger a refusal, adversarial questions designed specifically to bait a confident but unsupported answer, and direct-lookup questions as a sanity baseline. Targets: groundedness ≥95%, citation accuracy ≥90%, correct-refusal ≥90%. The harness runs against the live, deployed product (not a mocked pipeline) and writes results to the in-product eval page through a secret-gated endpoint, specifically so the "here are our honest numbers" page can't be spoofed by editing a config file.
*Receipt: the closing block on the engineer artifact, the eval-harness design itself as the final piece of mechanism.*

---

### BLOCK gg-23 — The obligation-map wireframe
*kind: visual · source: grounded-governance/grounded-governance.md §2; source-prd.md §6.1 · visual: obligation-map*

> Three tiers (Applies / Likely relevant / Possibly relevant), each card: obligation, "why this applies to your system," citations, applicability label. Restated understanding with "Not quite? Refine" opens the result; conflicts render as paired cards under "These frameworks pull in different directions," cited, unresolved.

**Recruiter — depth: omit**

**Founder / PM — depth: omit**

**Engineer — depth: omit**
*(this visual belongs to the landing page's product-summary use of Grounded Governance more than the build essay's own composition; kept in the pool with a real source for that reuse, omitted from all three artifact orders above so it isn't double-rendered)*

---

### BLOCK gg-24 — One user, chosen on purpose, and what's deliberately out of scope
*kind: fact · source: grounded-governance/grounded-governance.md §1, §2 ("Non-goals, binding") · visual: none*

> Designed for exactly one user, a PM or engineer told to make a feature compliant, and explicitly not for lawyers, auditors, or compliance analysts. Non-goals, binding: no legal verdicts ever, no accounts/saved sessions/export in MVP, no frameworks beyond the five, named explicitly so that adding any of them requires a real decision.

**Recruiter — depth: brief**
> It's live. You can use it. It's built for one kind of person, the PM or engineer who just got told to check compliance, not for lawyers or auditors.
*Receipt: the recruiter's plain framing of scope, short and outcome-first.*

**Founder / PM — depth: full**
> One user, chosen on purpose: the PM or engineer told to make a feature compliant. Not lawyers, not auditors, not compliance analysts. Designing for all of them would have produced something tuned for none of them. The out-of-scope list, no legal verdicts, no accounts or export in MVP, no frameworks beyond the five, is binding and named explicitly, so that adding anything requires an explicit decision rather than quiet scope creep.
*Receipt: the founder artifact's scoping discipline, stated as fully as gg-01's shorter version leaves room for.*

**Engineer — depth: omit**
