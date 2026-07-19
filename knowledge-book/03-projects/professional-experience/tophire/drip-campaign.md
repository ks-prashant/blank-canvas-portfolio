# AI Drip Campaign Tool — TopHire

**Identity:** Built at TopHire. Owned end to end by Prashant Singh, Product Manager, reporting directly to the CEO. See [company-context.md](company-context.md), in this same folder, for the full org structure and hiring-funnel context this project sits inside.

**Status:** Live. 90%+ adoption — the default way outreach is written at TopHire. Internal build — no public demo or code to share.

---

## 1. Problem

Candidate volume kept climbing and recruiter outreach couldn't keep pace. Two things were slipping at once: **time** — writing a good outreach email is slow, and recruiters lived between two tools all day (copy candidate details out of the CRM, switch to Gmail, write, send, come back, check for replies, update the CRM by hand); and **reply rates** — when email is a chore done at volume, it gets templated and generic, and generic outreach gets ignored. Baseline positive reply rate before the feature was **~20%.**

## 2. Discovery

Followed his standard discovery pattern for every feature: interviewed recruiters directly, plus ran a dedicated 50-candidate test focused specifically on email quality, generating an evaluation-criteria list from the results to guide prompt improvement.

## 3. Options considered before building

Per Prashant's own account, two options were weighed before committing to an approach: **(a)** let recruiters create their own templates and automate just the follow-up sending, versus **(b)** use AI to write personalized emails outright. Rather than picking one, the two options became the two shipped versions in sequence (§4 below) — V1 built the templated/automated option first, partly because the templates UI already existed as a component to reuse, and V2 layered AI personalization on top once V1's automation and adoption were proven.

## 4. Approach — shipped in two deliberate versions

**V1 — automation and control from the CRM.** Follow-up sequences that send themselves; Gmail integration so recruiters send and receive without leaving the CRM; AI-assisted reply classification so a recruiter sees a reply's intent (interested / not / needs info) instead of reading and sorting every response by hand. Email content at this stage was job-level templates — the automation and the single pane of glass were the win, not personalization yet.

**V2 — ultra-personalized, AI-written emails.** Content moved from job-level templates to *job + candidate* level. A third-party **LinkedIn scraper API** pulls the candidate's data, combined with recruiter-fed job and company data, and **Claude Sonnet writes a genuinely personalized email per candidate.** At this point AI does roughly 80% of the outreach-writing work; the recruiter reviews and sends.

For both versions, rollout followed the same phased pattern: **1 recruiter → 5 recruiters → 10 recruiters**, running 2–3 weeks at each stage with improvements made between phases, before launching to everyone.

## 5. What was actually built — the production prompt

The system prompt behind V2 is a real, detailed production artifact (see [drip-campaign-prompt.md](drip-campaign-prompt.md), in this same folder, for the extracted content in full). Notable elements:

- **Hard, non-negotiable formatting rules**: every email opens with exactly "Hi [Candidate First Name]," and no sender sign-off appears at the end, ever; role title, company name, salary, and location/work-mode are bolded; `{{CURRENT_DATE}}` is used for all years-of-experience math so the model never guesses the current year.
- **Three-email sequence with hard word caps**, independently enforced: Email 1 ≤120–140 words, Email 2 (sent 48h later) ≤70–90 words, Email 3 (48h later) ≤50–70 words.
- **A worked bank of wrong-vs-right phrasing** used to keep tone human and non-robotic — e.g. quoting a candidate's exact quota numbers back at them (wrong) vs. "saw you crushed your quota all year" (right); "your background is perfect for this role!" (wrong, oversell) vs. "this might interest you because..." (right, honest).
- **Seniority-tiered emphasis**: VP/Head-level outreach emphasizes org outcomes and board/investor context; Staff/Principal emphasizes architectural challenge and technical ownership; mid/early-career emphasizes growth and promotion trajectory.
- **Strict JSON output contract** (two subject-line options, three email bodies each with a word count) — the prompt is a structured API contract, not a loose creative-writing instruction.
- A templated `[CUSTOM_INSTRUCTIONS_PLACEHOLDER]` block, confirming this prompt is reused and customized per client/job rather than hand-rewritten each time.

## 6. Challenges — and the fix, in order of impact

The hard part was email **quality** — specifically hallucination and guideline drift. Early on the model would quietly break the rules that make outreach land: ignoring opening-line guidelines, bolding the wrong things, attaching what it shouldn't (or skipping what it should), a scatter of small mistakes that added up to emails that didn't feel send-ready.

Three fixes, in order of impact:
1. **Cleaned up the input data** so the model wasn't writing on top of noisy, inconsistent candidate/job inputs.
2. **Optimized the prompt** against real observed failure cases, not hypothetical ones.
3. **Added a review layer** — the fix that mattered most: a second prompt that validates and approves the written content against the guidelines *before* it ever reaches the recruiter. This turned "mostly good with the occasional embarrassing miss" into consistently send-ready output, which is what earned the trust behind 90%+ adoption.

## 7. Metrics and eval methodology

- **Metric hierarchy**: north star = positive reply rate; guardrails = bounce rate and complaint rate; secondary = time saved per recruiter, conversion to interview.
- **Offline eval**: LLM-as-judge used in some places to evaluate email quality before changes shipped.
- **Online eval**: A/B testing tied to reply-rate tracking.
- **Post-launch measurement**: a 3-month post-launch survey (mirroring a pre-launch baseline survey) was used to quantify hours saved.

**The ongoing feedback loop, once live**, per Prashant's own account, had three parts running simultaneously, not just the survey: **(1)** recruiters could submit feedback directly on the UI itself — an in-product channel, not a separate form; **(2)** support tickets related to the feature were tracked specifically, so quality regressions would surface as ticket volume even before a survey caught them; **(3)** a live metrics dashboard let him monitor the feature's health continuously rather than only at scheduled checkpoints.

GTM was owned end to end: in-product UI nudges to notify recruiters of the new feature, **2–3 rounds of direct communication** sent out over time (not a single launch announcement), and sharing data insights to drive adoption beyond the initial rollout cohorts.

## 8. What was not used

**n8n was not used** for the automation workflows — the automation logic was built directly, not on an external workflow tool.

## 9. Outcome

- **90%+ adoption** — the default way outreach is written at TopHire, not an optional side tool.
- **Reply rate lifted from a ~20% baseline to ~+30%** (i.e., an increase of roughly 30% in positive replies).
- **~8 hours/week saved** per recruiter.

## 10. One-line pitch

Built an AI outreach tool that writes ultra-personalized candidate emails, classifies replies, and runs the whole flow inside the CRM — now the default at TopHire, lifting reply rates by ~30% off a ~20% baseline, with 90%+ recruiter adoption and ~8 hours/week saved per recruiter.

## 11. Sources

Prashant's own notes on this project; the production prompt, co-located as [drip-campaign-prompt.md](drip-campaign-prompt.md); direct conversation with Prashant.
