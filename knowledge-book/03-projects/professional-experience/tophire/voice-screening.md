# Voice AI Screening Agent — TopHire

**Identity:** Built at TopHire, a recruitment-operations SaaS platform (150+ internal recruiters, 2,500+ enterprise clients across India and the US). Owned end to end by Prashant Singh, Product Manager, reporting directly to the CEO. Built with a team of engineers (TopHire's product org is 6–10 engineers, designer, and analyst per PM area). See [company-context.md](company-context.md), in this same folder, for the full org structure and hiring-funnel context this project sits inside.

**Status:** Live for tech junior and mid-level roles. Recruiters opt in per job. Internal build — no public demo or code to share.

---

## 1. Problem

Recruiters were spending 2–3 hours a day screening candidates on calls — asking the same qualifying questions repeatedly and manually typing the answers into a screening form. High-volume, repetitive work that was a poor use of a recruiter's time and judgment, and a scaling bottleneck as the recruiter base grew.

**Why this project, and why then:** by Prashant's own account, this wasn't the first automation project — he had already automated high-volume email and WhatsApp follow-ups across the hiring funnel (the drip campaign tool). Screening was identified as the *next* biggest time sink specifically because outreach had already been addressed — see `company-context.md` for how the four TopHire AI products relate to each other sequentially rather than as a simultaneous suite. The project itself started from a market observation, not a request: Prashant was independently evaluating Voice AI products and concluded that voice quality had crossed a threshold where a fully automated call could sound convincingly human and handle every screening call for a job in one batch, instead of a recruiter calling candidates one by one.

## 2. Vendor selection

Assessed several Voice AI vendors before choosing: **ElevenLabs, Bolna AI, Retell AI, and Gnani Voice AI.** Voice quality had reached a threshold where a fully automated call could sound convincingly human — that threshold crossing is what made the project viable at all. **Shipped on Retell AI**, chosen for a combination of voice quality and intelligence within budget.

Bolna was seriously considered during evaluation before Retell AI was ultimately chosen for production.

## 3. Approach

Built a workflow that runs the screening call without a recruiter present:
1. **Schedules** the call.
2. **Retell AI places the call** and conducts the conversation using a structured, pre-defined set of screening questions per role.
3. An **LLM (Claude) runs over the call transcript** to extract structured answers and **automatically submits the screening form**, with **confidence scoring** on the extraction — and **conditional branching** through the question set based on earlier answers (e.g., skipping advanced questions if experience is below a threshold).
4. **Explicit candidate consent is captured before recording.**
5. Integrates with TopHire's internal CRM ("**Eighty**") to update candidate profiles and give recruiters a summary.

**The approval gate, before any of this was built at scale:** Prashant pitched the concept to leadership and showed them a couple of actual demo call recordings — not a slide deck or a mockup, real generated calls — to get sign-off before building the full workflow. Only after that approval did the phased rollout begin: **1 client → 5 clients**, tracking success rate by segment throughout.

## 4. Key decision: scoping honestly by role level

Segments tested: tech junior, tech mid, non-tech, and senior roles.

- **Tech junior and mid-level roles (this is the segment it shipped for):** call-completion rate — successful data collection once the candidate picks up — held at **~60%, on par with human callers.** Good enough to ship. These two segments together make up **more than 50% of all roles at TopHire.**
- **Non-tech roles:** worked reasonably well, but the per-call budget for non-tech roles was much lower than for tech roles, so the feature was not expanded to that segment for cost reasons — not a quality failure.
- **Senior roles:** call-completion dropped into the 40s. Those conversations are too nuanced for the agent to match a human, so it was **deliberately not shipped there.** A separate prompt for senior roles was under consideration as a future step, not yet built.
- **Recruiters choose per job** whether to use it, rather than it being forced onto every screen — kept trust high and adoption voluntary.

The discipline here was knowing where the tool was good enough and being willing not to ship where it wasn't — matching the human call-completion baseline (~60%) was the bar, and senior-role conversations couldn't clear it, so those stayed human.

## 5. Cost and the budget math behind the go/no-go call

**~₹9 per minute of call time, averaging ~3 minutes per call, for a total of ~₹30 per candidate screened.** (A cheaper, lower-quality model option was evaluated at ~₹6.5/call but not what shipped — the ₹30/candidate figure at the ₹9/min rate is the real, shipped cost.)

**The explicit budget reasoning, per Prashant's own account:** at ~100 candidates to call for a typical job, the per-call cost was judged "under budget" specifically *if* it freed up **3–4 hours of bandwidth per day for a recruiter.** This wasn't cost evaluated in isolation — it was cost evaluated against a specific time-savings bar the feature needed to clear to be worth building at all. The measured outcome (§6 below, ~2 hours/day saved) came in under that 3–4 hour target — worth noting as an honest gap between the original bandwidth goal and what actually shipped, rather than rounding the result up to match the target.

## 6. Outcome

- **~60% call-completion rate** for tech junior/mid roles — on par with human callers.
- Covers a segment (tech junior + mid) that is **>50% of TopHire's total role mix.**
- **~₹30 per candidate** screened.
- **~2 hours/day saved** per recruiter using it — recruiters now spend ~20–25 minutes/day scheduling calls and reviewing call details before sending to the client, versus making the calls themselves.
- Removes roughly ~80% of the manual screening-call effort on the roles it covers.

## 7. Roadmap

Multi-language support (Hindi, regional languages) — planned, not yet shipped. A separate prompt/scoring approach for senior roles — under consideration, not yet built.

## 8. Explicitly not part of this build

Voice-only — no chat fallback channel exists. Not built with LangGraph or any multi-agent orchestration framework.

## 9. Sources

Prashant's own notes on this project; direct conversation with Prashant.
