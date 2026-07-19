# Methodology & Working Patterns

Patterns that recur across projects, evidenced by specific instances rather than asserted as general traits.

## Sequencing bottlenecks, not executing a fixed roadmap

At TopHire, the four AI products were not built as a pre-planned simultaneous suite — they were sequenced by **where recruiter time was going next**, once the prior bottleneck was addressed. Voice screening was explicitly framed, in his own words, as the next project *because* outreach was already automated: *"I have already automated high volume emails and whatsapp follow-ups across the hiring funnel. Screening is one of the workflows where recruiters spend the maximum time now."* (`03-projects/professional-experience/tophire/company-context.md`, "Sequencing note"; `03-projects/professional-experience/tophire/voice-screening.md` §1). Resume shortlisting and the support chatbot addressed separate, parallel bottlenecks (client-facing shortlist quality, internal support load) rather than continuing the same outreach→screening chain. This is opportunistic bottleneck-chasing, not a fixed multi-quarter roadmap being executed on schedule.

## Discovery, before building

Standard pattern, seen at both TopHire and nurture.farm: talk to the people doing the work — or the people the product is for — before building. At TopHire's drip campaign, this meant interviewing recruiters directly plus a dedicated 50-candidate email-quality test with a generated evaluation-criteria list (`03-projects/professional-experience/tophire/drip-campaign.md` §2). At nurture.farm, both the lending product and the cashback builder trace to the same discovery effort — **retailer interviews and on-ground visits**, which surfaced that retailers relied on offline sellers for credit and that price was their primary purchase driver — run before either feature was designed (`03-projects/professional-experience/nurture-farm/lending.md` §1, `cashback-builder.md` §1).

## Validate live before scaling — real demos, not mockups, as the approval gate

Before the voice screening agent was built out to full scale, Prashant pitched the concept to leadership and showed **actual demo call recordings** — real generated calls, not a slide deck or a script mockup — to get sign-off (`03-projects/professional-experience/tophire/voice-screening.md` §3). This same instinct — prove it with a real running artifact before asking anyone to commit — shows up again outside TopHire entirely: both solo products are shared as **live, running systems** rather than screenshots or slide decks (Automjet is in production at the dealership; Grounded Governance is live at a public URL with an in-product evaluation page that shows its own measured quality — `03-projects/personal-projects/automjet/voice-agent.md`, `03-projects/personal-projects/grounded-governance/grounded-governance.md`, both §"Identity"/"Status"). Across three separate projects and two different employment contexts (internal TopHire, external solo work), the pattern is the same: don't ask for buy-in, or claim a result, without something real running first.

## Vendor and model selection as an experiment, not a default

Every AI feature that involved a build-vs-buy or model choice was run as a measured comparison, not decided by preference — and this extends past AI models to plain infrastructure vendors too:
- Voice AI: evaluated ElevenLabs, Bolna, Retell AI, and Gnani; shipped on Retell AI (`03-projects/professional-experience/tophire/voice-screening.md` §2).
- Resume shortlisting: evaluated GPT, Claude, and DeepSeek across multiple input formats and prompt designs; Claude won (`03-projects/professional-experience/tophire/resume-shortlisting.md` §2).
- Grounded Governance's model choices are per-pipeline-step, not global: a cheap fast model (Haiku) where classification suffices, the strongest model (Opus) where grounded generation quality matters — and when budget forced a temporary downshift to a mid-tier model for an eval run, that was recorded as an explicit, temporary lever with a written revert condition, not silently absorbed (`03-projects/personal-projects/grounded-governance/grounded-governance.md` §8). Automjet applies the same routing per conversation node: premium models only where judgment lives, fast models everywhere else (`03-projects/personal-projects/automjet/voice-agent.md` §6).
- WhatsApp messaging: evaluated AiSensy, Wati, and Gupshup; shipped on Gupshup (`03-projects/professional-experience/tophire/integrations.md` §1).
- Cloud calling: evaluated MyOperator, Servetel, and Exotel; shipped on MyOperator (`03-projects/professional-experience/tophire/integrations.md` §2).

**Beyond vendor choice, into workflow design:** the PII-enrichment integration went a step further than picking a winner — it kept 7–8 tools active simultaneously in a **cost-and-need-sequenced waterfall**, segmented by geography and role type, rather than picking one vendor and calling it uniformly (`03-projects/professional-experience/tophire/integrations.md` §3). This is the same experimental rigor applied at the workflow level instead of the vendor-selection level: the right answer wasn't "which tool," it was "which tool, in what order, for which segment."

## Cost evaluated against a specific outcome bar, not in isolation

The voice screening agent's cost (~₹9/minute, ~₹30/candidate at ~3 min/call) wasn't judged "cheap enough" against a vague sense of budget — it was explicitly evaluated against a stated bandwidth target: **under budget specifically if it freed 3–4 hours/day of recruiter time** (`03-projects/professional-experience/tophire/voice-screening.md` §5). The measured outcome that actually shipped was ~2 hours/day — below the original 3–4 hour target, and the book records that gap rather than rounding the achieved figure up to match the original bar. This is the same discipline as the willingness-to-not-ship pattern below, applied to a cost/benefit decision rather than a go/no-go ship decision: state the real bar, then report the real result against it, even when they don't match exactly.

## Phased rollout pattern

The same rollout shape recurs at TopHire across at least two features (drip campaign and voice screening): **1 recruiter/client → 5 → 10 → all**, with 2–3 weeks at each stage to observe and fix issues before expanding. At the voice screening agent, this phased rollout was explicitly used to segment-test — tech junior, tech mid, non-tech, and senior roles were all tried before the feature was scoped down to just tech junior/mid based on completion-rate data (`03-projects/professional-experience/tophire/voice-screening.md` §4). The shape of this rollout pattern is not arbitrary — it maps onto TopHire's actual org structure, where recruiters are organized into pods under a head recruiter (`03-projects/professional-experience/tophire/company-context.md`), making "a few pods first, then everyone" the natural unit of a phased launch rather than an arbitrary headcount split.

## Metric hierarchies, not single numbers

Consistently defines a north-star metric alongside explicit guardrails, not just one headline number:
- Drip campaign: north star = positive reply rate; guardrails = bounce rate, complaint rate (`03-projects/professional-experience/tophire/drip-campaign.md` §7).
- Resume shortlisting: primary result = shortlisting rate (35%→42%); guardrail = 1st-interview % held steady, checked specifically so a shortlisting-rate win couldn't mask a quality regression (`03-projects/professional-experience/tophire/resume-shortlisting.md` §4).

## Multi-channel feedback loops, running simultaneously, not sequentially

The drip campaign's post-launch measurement wasn't a single mechanism — three distinct feedback channels ran at once: **(1)** an in-product UI feedback channel recruiters could use directly, **(2)** support-ticket tracking specific to the feature, so a quality regression would surface as ticket volume before any survey caught it, and **(3)** a live metrics dashboard for continuous monitoring — on top of the periodic 3-month post-launch survey (`03-projects/professional-experience/tophire/drip-campaign.md` §7). The value of this pattern is timing: a survey only reports every few months, but tickets and dashboard metrics catch a regression in near-real-time, while UI feedback captures qualitative complaints neither of the other two channels would surface.

## Deterministic outcomes over inferred ones

A distinct, well-evidenced discipline: wherever a system needs to record "what happened," the design consistently prefers reading the actual, deterministic result over inferring or guessing one after the fact.
- Automjet's `call_status` is read directly off which ending node the conversation actually reached (test ride booked → meeting → warm/cold), never inferred from sentiment or keywords after the fact (`03-projects/personal-projects/automjet/voice-agent.md` §3 — "the ending node reached is the authoritative outcome").
- Grounded Governance never lets the model vouch for its own grounding: a post-generation validation pass checks each claim against the sources it cites, and what the user sees — answer, honest gap, or refusal — is read off what *survived* that check, not off the model's confidence (`03-projects/personal-projects/grounded-governance/grounded-governance.md` §5).
- Voice screening's confidence scoring routes low-confidence extractions to human review rather than guessing at an answer and shipping it silently (`03-projects/professional-experience/tophire/voice-screening.md` §3).

## Eval discipline: offline + online, in combination

At the drip campaign specifically: offline eval used LLM-as-judge in some places prior to changes shipping, combined with online A/B testing tied to reply-rate tracking, plus a 3-month post-launch survey mirroring a pre-launch baseline survey to quantify time saved (`03-projects/professional-experience/tophire/drip-campaign.md` §7).

## Iterating on quality, in a stated order of impact

At the drip campaign, three fixes were applied in explicit priority order when email quality had hallucination/guideline-drift problems: (1) clean the input data first, (2) optimize the prompt against real observed failures, (3) add a second-pass review layer that validates output before a human ever sees it — with the review layer identified as the fix that mattered most (`03-projects/professional-experience/tophire/drip-campaign.md` §6). This ordering — fix the data, then the prompt, then add a verification layer, rather than reaching for a bigger model or more prompt engineering first — is a reusable diagnostic pattern.

**Corroborating evidence from the production prompt itself:** the drip campaign prompt document restates several of its "hard rules" a second time, verbatim, in a later "mandatory format requirements" block (`03-projects/professional-experience/tophire/drip-campaign-prompt.md`, "Mandatory format requirements" section) — no sign-off, always start with "Hi [Candidate First Name],", always mention location/work mode. Rules don't get restated in a shipped production prompt unless the first statement of them was observed to fail often enough in practice to be worth reinforcing. This is independent, artifact-level evidence for the guideline-drift problem described in the case study — the prompt itself shows its own iteration history.

---

# How he works with people

The patterns above are about systems. These are about the humans around them — how he prioritizes with leadership, and how he works with the business functions that have a stake in what he ships.

## Prioritization as a standing ritual with leadership, run on evidence

At TopHire he reported directly to the **co-founders**, and feature prioritization ran through a **standing monthly meeting with the CEO, the CTO, and the Head of Sales.** What he brought into that room is the notable part: **test results and cost analysis** — not a roadmap document or a strategy narrative. Priorities got decided against evidence he'd already gathered.

This is the same instinct visible in the systems work, applied to stakeholder management. The voice screening agent's approval gate was real demo call recordings, not a deck (`03-projects/professional-experience/tophire/voice-screening.md` §3); its cost was argued against a specific bandwidth target rather than a vague budget sense (§5). The monthly prioritization meeting is where that habit lived structurally: bring the numbers and the working artifact, let those decide, rather than arguing from opinion or seniority.

The same meeting cadence also covered **feature demos and launch alignment before launch** — so leadership saw a feature working, and agreed on the launch, before it shipped rather than after.

## Owning the business's stakeholder relationship, not just the product surface

The clearest pattern across two companies: he doesn't treat a business function as a requirements-giver to be serviced. He embeds in it.

**At nurture.farm**, the business was heavily **sales-team driven**, and his closest stakeholders were **business finance and sales**. Rather than taking requirements over the wall, he:
- **Involved sales directly in discovery** — understanding problems, and setting up customer interviews through them.
- **Sat inside the sales groups** where queries were shared regularly, so he saw raw problems as they surfaced rather than filtered into a ticket.
- Ran a **monthly meeting** to discuss and prioritize sales-driven product development.
- Was **the PM for any sales-team requirement** at nurture.farm — a named, single point of ownership for that whole relationship, not a rotating assignment.

That structure explains something in the product work: both the lending product and the cashback builder trace to **retailer interviews and on-ground visits** run before either feature was designed (`03-projects/professional-experience/nurture-farm/lending.md` §1, `cashback-builder.md` §1) — and the cashback designer portal itself was built for the **internal sales team** to run campaigns self-serve, not for product to build each one on request. That wasn't a one-off research exercise, and the self-serve tooling wasn't a generic UX choice — both were the natural output of a PM already embedded in the sales org.

**At Ola**, his core stakeholders were **engineering** and, again, the **business finance team** — a direct consequence of owning billing logic, where the product decisions and the financial reconciliation are the same problem viewed from two sides (`03-projects/professional-experience/ola/experience.md`).

**The through-line:** across Ola, nurture.farm, and TopHire, his stakeholder set is consistently **engineering plus the money-side function** — business finance at Ola and nurture.farm, sales and the CEO/CTO at TopHire. He has spent his career adjacent to the part of the business that counts revenue, not insulated from it inside a pure product org.

## Sources

Synthesized from `03-projects/*`. No new claims introduced here — every statement traces to a specific project file and section, cited inline above.
