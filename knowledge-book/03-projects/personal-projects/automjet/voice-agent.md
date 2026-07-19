# Automjet Sales Agent — Outbound Voice AI on Retell (v5)

**Identity:** Built independently by Prashant Singh, solo, for a friend who co-founds the Automjet group and owns an authorized **Ather Energy** electric-scooter dealership in **Thane West** (Panch Pakhdi, Almeda Rd, near Nitin Company). Not a TopHire or nurture.farm project; not a paid client engagement.

**Status:** **Live in production at the Thane showroom.** ~500 calls/month. Funnel (confirmed by Prashant, 2026-07-19): **~70%** of calls connect, **~40%** complete the full conversation, **~20%** convert to a test ride, meeting, or warm lead, **~20%** end cold.

**Platform:** Retell AI, Conversation Flow agent type. This is the **v5** build — the current system, which replaced an earlier custom implementation entirely. The earlier build is retired and is not described in this book; the v1→v5 learnings that shaped v5 are in §10 and are the only sanctioned way to reference the project's history.

**Primary sources in this folder:** `retell-build-guide-v5.md` (the complete build document — architecture, prompts, settings, appendices). Two call recordings — one booked-test-ride call, one cold-lead call — **[PENDING: Prashant to supply both files + confirm consent/test-call status before any audio ships]**.

**This file is the canonical summary.** Anything on the site about Automjet must be traceable to this file or the build guide beside it.

---

## 1. What it does

An outbound agent that calls a **consolidated, mixed-source lead list** (Ather/OEM CRM records, sales-team referrals, website enquiries, general outreach) and — like a warm, humble Thane showroom advisor — moves each caller down a priority-ordered ladder of outcomes:

1. **Test ride booked** (primary ask)
2. **Sales-team connect scheduled** (fallback ask)
3. **Classified warm or cold** (never a wasted call — classification is itself the third product outcome, not a failure state)

It speaks Indian showroom English, discloses being an AI only if asked (and never denies it), and is **loop-proof by design** — see §4.

## 2. The user is the caller — register, researched not assumed

The agent persona is "Arjun," a warm, humble, respectful advisor. The register was rewritten line by line after real-call review, because generic voice-AI "naturalness" produced fluent *Western sales English* — grammatically fine, locally wrong:

- "Hi," never "Hey." Respectful "sir/ma'am" used naturally, not every sentence.
- **"Scooty"** or the model name — never "electric vehicle" or "EV."
- Simple present tense: *"You looked at the scooty on our website. I am calling you about that"* — not *"so I thought I'd give you a quick ring."*
- **One ask per turn.** Ask when they can visit only *after* they've said yes to visiting.
- Numbers as people say them: *"around one lakh ten to one lakh fifty."* Acronyms spelled: "R T O," "E M I."
- Humble acknowledgements ("No issues sir." "I get it sir."), never bubbly ones ("that's the sweet spot!").
- Honest about how their number was obtained; honest that it's an AI if asked.
- **Hinglish rule is comfort-based, not keyword-based:** continue in English through mixed-in Hindi words; hand off warmly to a human Hindi callback only if the caller asks to switch, replies only in Hindi, or clearly can't continue in English. Never attempt a half-Hindi conversation — a bad Hindi bot damages trust worse than an honest handoff.

## 3. Architecture — the conversation flow

Nine conversation nodes, four global nodes (reachable from anywhere), ten ending nodes. The **ending node reached is the authoritative outcome** — `call_status` is read off the ladder rung the conversation actually reached, never inferred afterward from the transcript.

```
N1 Greeting & Identity → N2 Reason & Permission → N3 Discovery (lite)
→ N4 Suggest/Affirm Model → N5 Invite Test Ride (PRIMARY, rung=test_ride)
→ N6 Capture Visit → END: Test Ride Booked
N5 declined → N7 Offer Team Connect (FALLBACK, rung=sales_connect)
N7 declined → N8 Nurture & Classify → END: Warm | Cold
Objections (a question, not a "no") → N9 → returns to the current rung ONCE, then steps down
GLOBALS: GK factual Q&A (KB-grounded, returns to where it was) · GD do-not-call
· GL language handoff · GH human/out-of-scope handoff
```

Key design facts:
- **The opening is branched by `lead_source`** (website / sales referral / OEM CRM / unknown), so the first sentence is never a lie — each version is something the agent can honestly defend if asked "how did you get my number?"
- **Already-chosen models are respected:** if `vehicle_hint` is set or the caller names a model, the flow affirms *that* model rather than re-running discovery and recommending a different one.
- **The agent never repeats information already given** (if it introduced itself in N1 because the caller asked "who's this?", N2 skips the re-introduction).
- **No invented facts:** approximate price/range bands come from a curated Knowledge Base with `last_verified` dates per section; exact prices, EMIs, and subsidies are always deferred to the showroom — and the deferral is used as a reason to visit.

## 4. Loop-proof by structure, not by instruction

The central engineering idea, and the one that generalizes: **every fix on this project turned an instruction into a structure.**

- **The ladder is one-way.** The only downward moves are N5 → N7 → N8 → close. No transition exists back up. Once a rung is declined, no node can re-offer it — not because a prompt says not to, but because the edge isn't there.
- **N9 (objections) returns to a rung exactly once.** A second decline after the objection was addressed routes *down*, never back into another round.
- **A "no" is four different signals**, each with its own route:

| Type of "no" | Example | Route |
|---|---|---|
| Bad timing | "busy," "call later," "driving" | Capture callback → warm close. Never terminal alone. |
| CTA decline | "don't want a test ride" | Step down exactly one rung. A decision, not a discussion. |
| Not interested | "not interested at all" | Skip to classify → warm/cold. |
| Hard stop | "stop calling," "remove me" | Immediate DNC exit, suppressed across systems. |

An *objection* ("too costly," "range problem") is a request for information → N9. A *decline* is a decision → step down. Conflating these two categories is what broke v1 in both directions at once (hanging up on recoverable leads *and* re-pitching through real declines).

- **The transition condition is the real instruction.** v1's discovery node said "don't interrogate" in its prompt but gated advancement on five filled fields — so it interrogated. The fix changed the *gate*: advance the moment one recommendation is possible, cap at one question per turn, treat every other field as opportunistic.

## 5. Sounding human is a system, not a voice setting

Six coordinated levers, with the actual production settings:

| Lever | Setting |
|---|---|
| Voice | Warm, mature Indian-English male, auditioned; speed **0.92–0.95**; temperature ~1.0 |
| Latency | **Sub-800 ms** to first word, streaming TTS |
| Interruption | Sensitivity **0.7–0.9** — a "no" cuts the agent off instantly; never apologize when interrupted, just stop |
| Endpointing | Semantic — don't jump in on "umm" or a breath |
| Turn-taking | ~100/1500 ms default; snappier (~1300 max) on yes/no nodes; roomier (~1800 max) on time-capture |
| Backchannel | On, ~0.5 — light "haan, okay" while they talk, never over a "no" |

Plus boosted keywords for Hinglish intent (haan, nahi, baad mein, mat karo, Hindi mein…), voicemail detection with a short honest message, and a two-beat opening ("Hi…" — pause — "…am I talking to {first_name}?") because that's how a real person calls.

## 6. Cost engineering

Production voice AI bills every layer separately (~$0.13–0.31/min all-in). Levers, **ranked** — ordering is the insight:

1. **End bad calls fast** (the biggest lever — you pay per minute including ringing, hold, and silence): voicemail detection on, quick disqualification, one-line closings, and the one-way ladder itself (no re-pitch loops means no paid loop minutes).
2. **Per-node model routing:** premium model only where judgment lives (discovery N3, recommendation N4, objections N9, KB answers GK); fast/cheap everywhere else — while keeping the *opening* nodes low-latency, because the first ten seconds decide the call.
3. Premium voice where it pays (answer rates), lean global prompt (billed every turn), one small KB, SIP trunking at volume, upstream DND scrubbing (don't pay to dial numbers that generate penalties).

## 7. Compliance — upstream of the conversation, not inside it

India's telemarketing rules (TCCCPR, amended 2025) apply to AI calls the same as human ones. Designed as a **hard pre-dial gate**, not a conversation feature: DND/NCPR scrubbing per batch (status changes daily), correct sender-number series (140 promotional / 1600 service) per consent basis, permitted calling window (conservative 10:00–19:00 recipient-local), DLT registration, and `do_not_call` honored instantly and suppressed across systems. Disclosure posture: answers honestly if asked whether it's an AI; never claims to be human.

## 8. The post-call record

Every call writes a structured record — `call_status` (from the ending node), model of interest, use case, purchase timeline, preferred times, objections raised, sentiment, language-handoff / needs-human / do-not-call flags, and free-text notes for follow-up — delivered by webhook for outcome-specific follow-ups.

**Metrics watched hardest:** warm/cold classification accuracy (audited against reality — it compounds into future runs), loop incidents (target ~0), and early hang-ups in the first ~15 seconds (the opening/naturalness proxy).

## 9. Deliberate scope

The demo build *says* "I will send you the showroom address on SMS" but sends nothing — a spoken line only, documented as such. Real SMS and live slot-booking are named upgrades, deferred on purpose: **nail the conversation first.**

## 10. The v1→v5 learnings (the sanctioned project history)

Eight, from reviewing real call transcripts across five versions — full detail in `retell-build-guide-v5.md` Appendix E:

1. **A "no" is not one signal — it's at least four** (§4's taxonomy). The same conflation caused opposite failures: hanging up on a busy-but-warm lead, and re-pitching three times through a real decline.
2. **Loops are an architecture problem, not a wording problem.** The v1 objection node's prompt literally said "never argue, don't re-pitch" — and it re-pitched three times anyway, because no structure tracked prior declines. Remove the transition, don't strengthen the sentence.
3. **The transition condition is the real instruction** — a tone note in the prompt is a suggestion the gate can silently overrule.
4. **Design for the lead list you actually have.** v1's opening assumed every lead had visited the website; most hadn't. A false first sentence is a trust *and* compliance failure. Branch the opening on real provenance.
5. **India-specific failure modes need named designs, not general best practice** — Hinglish code-switching, interruption handling, TCCCPR compliance.
6. **Sounding human is a system** — voice, latency, endpointing, phrasing, pacing, transparency, all pointing the same direction at once (§5).
7. **"Natural" means *locally* natural** — fluency research gets you Western sales idiom; register has to be sourced from how a Thane showroom advisor actually talks.
8. **Respect what the caller already told you** — don't re-introduce yourself, don't re-recommend against a chosen model. Natural conversation is cumulative.

**The throughline (verbatim from the build doc):** *"Every fix in this project came from the same root move: turn an instruction into a structure. … Instructions alone are suggestions a large language model can and will drift from under pressure; structure — transitions that don't exist, variables that gate behavior, node logic that checks prior context — is what actually holds under real, messy phone calls."*

---

## 11. Facts needing confirmation before use on the site

| Fact | Status |
|---|---|
| ~500 calls/month; 70/40/20/20 funnel | ✅ Confirmed by Prashant 2026-07-19 |
| Dealership location: Thane West | ✅ Confirmed 2026-07-19 |
| Build timeline of the Retell v5 system (when built, how long, months live) | ❌ UNCONFIRMED — the "built in about one week, late 2025, ~7–8 months live" story belonged to the retired build. Do not carry it over without Prashant confirming what's true of the current system. |
| The two recordings (booked + cold) + consent status | ⏳ PENDING — placeholders only until supplied |
| Whether `automjet-connect-pks.lovable.app` still exists / deserves a link | ❌ UNCONFIRMED |
