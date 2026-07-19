# Case-page section copy — all six case studies

**Status:** first draft by the builder. **Prashant reviews and rewrites every block below**, same loop as `lens-copy.md`.
**Scope:** all six Tier-2 case studies. `voice-screening` and `lending` were the exemplars, reviewed first; `resume-shortlisting`, `drip-campaign`, `cashback-builder`, `pii-waterfall` rolled out after that pattern was signed off, following the same structure.
**Source of truth:** the corresponding file per project under `knowledge-book/03-projects/professional-experience/`.
**Structure:** each project has a `CaseHeader`, one `signatureVisual` (built in code, not copy), and a set of sections. Each section carries three lens variants at whatever depth §8.5 of `BUILD-SPEC.md` calls for. Sections not shown at a given depth are simply omitted — the table below states which.
**A section is omitted per-project, not just per-lens, when the source material genuinely has nothing there** (e.g. no stated roadmap, no explicit guardrail) — omission over invention, consistent with the site's own thesis.

---

## Depth map (from BUILD-SPEC.md §8.5 — reproduced here for reference while writing)

| Section | Recruiter | Founder / PM | Engineer |
|---|---|---|---|
| Problem | short | full | short |
| Discovery | omit | full | short |
| Decision | omit | full | technical framing |
| Approach | outcome-framed | decision-framed | full technical |
| Fix-in-order | omit | the pattern | full |
| Metrics | plain | with method | with method |
| Guardrail | omit | full | full |
| Didn't ship / gaps | stated plainly | the reasoning | the technical why |
| Not-used | omit | omit | full |
| Eval methodology | omit | brief | full |
| Roadmap | omit | full | full |

---

# PROJECT: voice-screening

## CaseHeader
`TopHire · Product Manager, reported to the CEO · 2025 (most recent of the four AI products) · Live for tech junior/mid roles, opt-in per job · internal build, technique described`

## Signature visual
**Role-level go/no-go matrix.** Four rows: Tech junior, Tech mid, Non-tech, Senior. Each shows completion rate against the ~60% human baseline. Junior and mid clear it and ship (ink checkmark). Non-tech clears it but doesn't ship — cost, not quality (a distinct "shipped-but-for-cost-reasons" mark). Senior falls to the 40s and doesn't ship (red, dashed, "−"). The visual makes the "said no" literal: a bar chart where one bar is deliberately below the line, in red, next to three that cleared it.

---

### Problem

**Recruiter**
> Recruiters were spending 2-3 hours a day on screening calls — the same qualifying questions every time, typed into a form by hand.

**Founder / PM**
> Recruiters were spending 2-3 hours a day screening candidates on calls: the same qualifying questions repeatedly, manually typed into a form. High-volume, repetitive work, and a scaling bottleneck as the recruiter base grew. This wasn't the first automation project — outreach (the drip campaign) was already live, and screening was identified as the next biggest time sink specifically because that earlier bottleneck was cleared. The project itself started from a market read, not a request: voice quality had crossed a threshold where a fully automated call could sound convincingly human, and a batch of screening calls could run without a recruiter dialing one by one.

**Engineer**
> Recruiters lost 2-3 hours a day to repetitive screening calls.

---

### Discovery
*(Founder/PM full, Engineer 1 line, Recruiter omitted)*

**Founder / PM**
> Not a request from leadership — a market observation Prashant made independently, evaluating Voice AI products on his own initiative. The trigger was sequencing, not demand: outreach was already automated, so screening became the next visible drain on recruiter time. That's the same "chase the bottleneck" pattern as the rest of the TopHire suite — the four products were never planned as one simultaneous roadmap.

**Engineer**
> Triggered by a voice-quality threshold crossing, evaluated independently before being proposed.

---

### Decision
*(Founder/PM full — the vendor bet; Engineer technical framing; Recruiter omitted)*

**Founder / PM**
> Four Voice AI vendors evaluated — ElevenLabs, Bolna AI, Retell AI, Gnani — with Bolna seriously in contention before Retell won on a combination of voice quality and intelligence within budget. The approval gate mattered more than the vendor choice: before any of this was built at scale, Prashant pitched the concept to leadership and played real generated call recordings, not a deck or a mockup. Only after that sign-off did the phased rollout start — one client, then five, tracking completion rate by segment the whole way.
>
> +buys: a real artifact earns trust a slide can't. −costs: building even a couple of demo calls before any go-ahead, with no guarantee of approval.

**Engineer**
> Bake-off across ElevenLabs, Bolna AI, Retell AI, and Gnani Voice AI on voice quality and cost. Retell shipped. Approval gated on real generated call recordings, not a spec.

---

### Approach
*(Recruiter outcome-framed; Founder/PM decision-framed; Engineer full technical)*

**Recruiter**
> An AI agent makes the screening call instead of a recruiter, asks the same structured questions a person would, and fills in the screening form automatically once the call ends.

**Founder / PM**
> The workflow runs the whole screening call without a recruiter present: it's scheduled, Retell places the call and runs a structured, pre-defined question set per role, and an LLM reads the transcript afterward to extract answers and auto-submit the form — with a confidence score attached to each extraction, and branching that skips advanced questions if the candidate's experience is below a threshold. Consent is captured explicitly before recording starts. Results flow into TopHire's internal CRM, so a recruiter gets a summary instead of a raw transcript.

**Engineer**
> Retell AI places the call and conducts it against a structured, role-specific question set with conditional branching (skip advanced questions below an experience threshold). Claude runs over the resulting transcript, extracts structured answers, and auto-submits the screening form with per-field confidence scoring — low-confidence extractions are the ones that would need a human second look, rather than being submitted silently. Consent captured before recording. Integrates with TopHire's internal CRM ("Eighty") to update the candidate profile and hand the recruiter a summary rather than a transcript to re-read.

---

### Fix-in-order
*(Omitted — this project's hard part was a scoping decision, not an iteration ladder. Its "ordered diagnostic" equivalent is folded into Decision/Didn't-ship instead. See drip-campaign for the canonical fix-in-order example once that rolls out.)*

---

### Metrics

**Recruiter**
> Completes about 6 in 10 screening calls successfully for junior and mid-level tech roles — the same rate a human caller gets. Saves a recruiter roughly 2 hours a day. Costs about ₹30 per candidate screened.

**Founder / PM**
> ~60% call-completion for tech junior/mid roles — on par with human callers, and the segment is over half of TopHire's total role mix. ~₹30/candidate (₹9/min, ~3 min average call). ~2 hrs/day saved per recruiter using it, against a stated target of 3-4 hrs/day (see Didn't-ship / gaps — the gap is reported, not rounded up).

**Engineer**
> ~60% completion, tech junior/mid. ~₹9/min × ~3 min avg = ~₹30/candidate. A cheaper ~₹6.5/call model option was evaluated and not shipped — quality, not cost, decided that comparison.

---

### Guardrail
*(Founder/PM and Engineer full; Recruiter omitted)*

**Founder / PM**
> The bar wasn't "does it work," it was "does it match a human caller" — ~60% call-completion is the number a human recruiter gets on the same calls, and that's the line every segment was tested against before shipping.

**Engineer**
> Human call-completion (~60%) was the explicit bar for every segment tested, not an arbitrary quality threshold picked after the fact.

---

### Didn't ship / gaps
*(All three lenses — this is the featured section on this page)*

**Recruiter**
> Not shipped for senior roles — completion dropped into the 40s there, well below what a human gets, so those calls stayed with people. Also came in under its own time-savings target: the goal was 3-4 hours saved a day, and it delivered about 2.

**Founder / PM**
> Four segments were tested — tech junior, tech mid, non-tech, senior — and only two shipped. Senior-role completion fell into the 40s against the ~60% human bar; those conversations needed more nuance than the agent could match, so they stayed human, full stop, not "we'll revisit this quarter." Non-tech worked reasonably well but the per-call budget for that segment didn't justify it — a cost call, not a quality one, worth distinguishing from the senior-roles no. Recruiters also choose per job whether to use the tool at all, rather than it being forced onto every screen, which kept trust high and adoption voluntary. Separately: the original bandwidth goal was 3-4 hrs/day saved; the measured result was ~2. That's reported as the real number, not rounded up to the target.

**Engineer**
> Senior-role completion: low 40s%, against a ~60% human baseline — the bar was parity, and it wasn't met, so the segment stayed manual. Non-tech: technically viable, excluded on unit economics (lower per-call budget than tech roles). Neither exclusion required a model change to fix — they were scoping decisions made after segment-level data came back from the phased rollout.

---

### Not-used
*(Engineer only)*

**Engineer**
> Voice-only — no chat fallback channel exists. Not built with LangGraph or any multi-agent orchestration framework; a single structured call flow with conditional branching was sufficient for this problem.

---

### Eval methodology
*(Founder/PM brief; Engineer full)*

**Founder / PM**
> Segment-level completion-rate tracking through a phased rollout (1 client → 5 clients), across all four candidate segments before deciding which two to keep.

**Engineer**
> Call-completion rate (successful data collection once the candidate picks up) tracked per segment through the 1→5 client rollout. No offline eval harness for this feature — the phased, segmented rollout against a known human baseline (~60%) served as the eval.

---

### Roadmap
*(Founder/PM and Engineer)*

**Founder / PM**
> Multi-language support (Hindi, regional languages) is planned, not shipped. A separate prompt/scoring approach for senior roles is under consideration, not yet built — the senior-roles gap is a "not yet," held open rather than closed as unsolvable.

**Engineer**
> Multi-language support planned. A distinct prompt/scoring path for senior-role nuance is being considered but not built.

---

# PROJECT: lending

## CaseHeader
`nurture.farm · Product Manager (promoted from APM during this tenure) · 05/2021–11/2022 · Shipped, scaled to 6,000+ retailers · internal build, technique described`

## Signature visual
**KYC flow, before → after.** Two stacked rows. Before: retailer → [portal login 1] → [portal login 2] → [document upload] → [location share] → [photo] → drop-off. Each step is a separate box with a small red "friction" mark. After: retailer → [pre-filled from existing marketplace KYC, via API] → [remaining steps, in-app] → done. The after-row is visibly shorter and has no red marks — the diagnosis-and-fix made literal as a before/after path length.

---

### Problem

**Recruiter**
> Retailers on the marketplace relied on offline sellers for credit when buying offline — and the app had no equivalent, so it was competing for a purchase decision without a way to help pay for it.

**Founder / PM**
> Discovery ran through retailer interviews and on-ground visits, not desk research, and it surfaced a specific friction: retailers were getting credit from offline sellers when they purchased offline, and that access to credit was a real reason they weren't buying through the app at all. Beyond the discovery finding itself, the mechanics of getting credit were a problem in their own right — traditional lending was slow, high-friction, and completely disconnected from the ordering flow; a retailer who wanted credit had to leave the app and go through a separate, slow process.

**Engineer**
> No in-app credit mechanism existed; retailers needing credit had to leave the app entirely for a slow, disconnected process.

---

### Discovery
*(Founder/PM full, Engineer 1 line, Recruiter omitted)*

**Founder / PM**
> Retailer interviews and on-ground visits — the same discovery effort that separately surfaced the finding behind the cashback product (see `cashback-builder`, once it rolls out). Not a hypothesis tested after the fact; the credit-access friction is what discovery found first, and the product was designed around it.

**Engineer**
> Surfaced through field interviews, not inferred from transaction data.

---

### Decision
*(Founder/PM full — partner vs. build; Engineer technical framing; Recruiter omitted)*

**Founder / PM**
> Partner with an NBFC rather than become a lender. Underwriting — who gets credit, and at what limit — was owned entirely by the NBFC, not by product. Prashant's ownership was the product surface around that decision: the embedded KYC flow, payment integration for credit purchases, and the collections handoff. All of it — the KYC data-sharing design, the collection handoff point, the underwriting relationship itself — was planned jointly between product, the NBFC, and nurture.farm's business finance team, not decided by product alone.
>
> +buys: real lending capability without owning credit risk or a lending license. −costs: underwriting quality and speed are someone else's decision, and the product has to design around whatever data flow the NBFC's systems support.

**Engineer**
> NBFC-partnered by design — underwriting, risk, and credit limits (₹30k-₹10L) sit entirely outside the product's own system. The product owns only the surface: KYC, payment integration, and collections handoff.

---

### Approach
*(Recruiter outcome-framed; Founder/PM decision-framed; Engineer full technical)*

**Recruiter**
> Retailers can now get credit inside the app itself — sign up, get approved, and buy on credit without leaving the marketplace or filling out paperwork twice.

**Founder / PM**
> The KYC flow is embedded in-app rather than sending retailers to a separate NBFC process. Payment integration handles credit-based purchases. On collections, nurture.farm integrated the NBFC's collection APIs and additionally set up proactive payment-reminder communication up to the due date; once a payment went overdue, the NBFC took over enforcement and collections directly rather than product chasing it. Credit limits, ₹30,000 to ₹10 lakh per retailer, are entirely the NBFC's underwriting call.

**Engineer**
> Embedded KYC pre-fills from nurture.farm's own backend via API, since retailers had already completed KYC to use the core marketplace app — a meaningful share of the NBFC's required information never has to be asked twice. The remaining required fields are collected inside nurture.farm's own app UI, with the NBFC's SDKs embedded in-app at some steps rather than redirecting out to a third-party portal, and the resulting data passed to the NBFC via API. Collections: NBFC APIs integrated for the base flow, plus a proactive pre-due-date reminder layer built on top; post-due, enforcement is entirely the NBFC's.

---

### Fix-in-order
*(This is the section that carries the project's real diagnostic story — a single, high-impact fix rather than a three-step ladder like drip-campaign, so shown as one entry, not a numbered list)*

**Founder / PM**
> One diagnosis, one fix, and it's the whole story. What went wrong initially: the NBFC's standard KYC required multiple separate third-party portal logins, document uploads, a location share, and a photo — a long, disconnected process completely outside the app the retailer was already using, and conversion into the credit product was low as a direct result. The fix: redesign the data flow around information the business already had, rather than accept the NBFC's default flow as fixed. Because retailers had already done KYC for the core app, most of what the NBFC needed could be pre-filled and passed via API instead of re-collected. That single fix is the specific mechanism behind the product's scale (6,000+ retailers) — not a separate, secondary improvement layered on top of a working feature.

**Engineer**
> Root cause: redundant data collection across a redirect-based, multi-portal flow. Fix: treat the marketplace's existing KYC data as the source of truth, pass it to the NBFC via API, and only collect in-app what genuinely wasn't already held. The fix is a data-flow redesign, not a UI polish pass — the friction was structural, so the fix had to be too.

---

### Metrics

**Recruiter**
> Scaled to over 6,000 retailers using in-app credit. Retailers using credit ended up transacting 32% more often. Repayments came in with about a 6% overdue rate — not the number the team was optimizing for at the time, since the priority was proving the product was worth using at all.

**Founder / PM**
> 6,000+ retailers scaled to. 32% MTU lift for the credit cohort specifically, versus non-credit retailers. ~6% overdue rate — stated plainly, not polished: this wasn't the primary metric being optimized in this period, adoption of a genuinely useful product was. A real lending product with no repayment number at all would be the actual red flag; 6% in an adoption-focused, not risk-focused, period is a defensible number to have.

**Engineer**
> 6,000+ retailers, 32% MTU lift (credit cohort vs. non-credit), ~6% overdue. Credit limits ₹30k-₹10L, set by NBFC underwriting, not the product.

---

### Guardrail
*(Founder/PM and Engineer; Recruiter omitted)*

**Founder / PM**
> There wasn't a single north-star-plus-guardrail pair here the way drip-campaign or resume-shortlisting had one — the closer parallel is that overdue rate was tracked and reported even though it wasn't the metric being optimized, specifically so growth in adoption couldn't be claimed without also stating the repayment picture honestly.

**Engineer**
> Overdue rate (~6%) reported alongside the growth metrics rather than omitted, functioning as an implicit guardrail even though it wasn't the primary optimization target in this period.

---

### Didn't ship / gaps

**Recruiter**
> The honest gap here is the repayment number: about 6% overdue, at a time when the focus was getting retailers to actually use the product, not minimizing risk.

**Founder / PM**
> ~6% overdue, disclosed without spin. This wasn't treated as the primary metric to optimize at the time — scaling adoption of something retailers genuinely needed came first. It's included because a real lending product without any repayment number is the actual red flag to anyone with fintech experience, and 6% in an unoptimized-for-risk, scale-focused period is a plausible, defensible figure rather than a polished one.

**Engineer**
> ~6% overdue rate, not risk-optimized in this period. No automated collections-risk scoring was built on top of the NBFC's base flow beyond the proactive reminder layer — enforcement past due is entirely the NBFC's.

---

### Not-used
*(Engineer only)*

**Engineer**
> No in-house underwriting or credit-scoring logic — deliberately, since that risk and the associated compliance load sits with the NBFC by design, not as a scope cut.

---

### Eval methodology
*(Founder/PM brief; Engineer full)*

**Founder / PM**
> Tracked onboarding volume and credit-product conversion before and after the embedded-KYC fix, plus ongoing MTU comparison between the credit cohort and non-credit retailers.

**Engineer**
> Pre/post comparison of onboarding volume and conversion once the embedded-KYC redesign shipped, attributed directly to that fix rather than treated as a general trend. MTU tracked per cohort (credit vs. non-credit) as the ongoing product-health signal.

---

### Roadmap
*(Founder/PM and Engineer — book doesn't specify a stated roadmap for this project; omit rather than invent one)*

**Founder / PM**
> *(Not specified in the source material — no roadmap item is recorded for this project. Omitted rather than guessed.)*

**Engineer**
> *(Not specified in the source material.)*

---
---

# PROJECT: resume-shortlisting

## CaseHeader
`TopHire · Product Manager, reported to the CEO · shipped, platform-wide · Live, 80%+ adoption · internal build, technique described`

## Signature visual
**The decline-then-recovery line, plus the bake-off.** A small line/step chart: Baseline (two years ago) 45% → Decline 35% (the problem) → After shipping 42% (measured, A/B). Beneath it, a compact three-column bake-off row — GPT / Claude / DeepSeek — with Claude marked as the one that shipped.

---

### Problem

**Recruiter**
> The share of candidates TopHire submitted that clients actually shortlisted had slid from about 45% to 35% over two years.

**Founder / PM**
> The client shortlisting rate — the share of candidates submitted that a client actually shortlists — had been sliding for two years, from roughly 45% down to roughly 35%. Talking to recruiters surfaced two root causes: a skill gap in judging candidate-role fit consistently across recruiters, and rising effort per role as volume grew. A weaker shortlist hurts everyone in the loop — the client loses confidence, the recruiter burns effort for less return, and good candidates don't get seen.

**Engineer**
> Shortlisting rate had slid 45% → 35% over two years, root-caused to recruiter judgment variance plus rising volume.

---

### Discovery
*(Founder/PM full, Engineer short, Recruiter omitted)*

**Founder / PM**
> Talking to recruiters directly is what separated the two causes — a skill gap in judging fit consistently, versus simply rising effort per role as volume grew. Distinguishing the two mattered, because they call for different fixes: consistency needs a shared standard, effort needs automation.

**Engineer**
> Root-caused through recruiter conversations to two distinct causes, not one.

---

### Decision
*(Founder/PM full — the bake-off and the personalization call; Engineer technical framing; Recruiter omitted)*

**Founder / PM**
> Two decisions made this work. First, personalized by role type — a "strong match" for a junior role isn't a strong match for a senior one, so the prompt adapts to role level rather than applying one rubric to everything. Second, selected by experiment, not by faith — GPT, Claude, and DeepSeek were evaluated across different input formats and prompt designs, with Claude winning and shipping. Validated with an A/B test on 5 jobs and about 400 candidates before committing to a platform-wide rollout.
>
> +buys: a model choice backed by a measured comparison, not a default. −costs: running three real bake-offs before writing the shipping prompt, rather than picking the popular option and moving on.

**Engineer**
> Bake-off across GPT, Claude, and DeepSeek, varying input format and prompt design. Claude won on measured output quality. Role-level personalization built into the rubric itself, not bolted on after.

---

### Approach
*(Recruiter outcome-framed; Founder/PM decision-framed; Engineer full technical)*

**Recruiter**
> Reads a candidate's resume against the job and rates the fit Strong, Medium, or Low — with a plain-language reason attached, so a recruiter can sanity-check the call rather than just trust a label.

**Founder / PM**
> An LLM workflow classifies the resume as Strong / Medium / Low match against the job, with a written justification for the call. The justification is the point — a bare label is easy to distrust and ignore, but reasoning a recruiter can sanity-check is something they'll actually use. Confidence scoring is shipped, not just a roadmap item: the model assesses its own confidence in each classification, and high-confidence cases can be auto-accepted, reducing manual review load.

**Engineer**
> Resume text and job requirements passed directly into a classification prompt — no retrieval step (see Not-used). Output: Strong/Medium/Low, a written justification, and a self-assessed confidence score. High-confidence classifications auto-accept, routing only uncertain cases to manual review.

---

### Metrics

**Recruiter**
> In a controlled test on 5 jobs and about 400 candidates, shortlisting went from 35% to 42%. Over 80% of recruiters now use it.

**Founder / PM**
> 35% → 42% shortlisting rate, A/B tested on 5 jobs / ~400 candidates before platform rollout. Guardrail: 1st-interview % tracked specifically so a shortlisting-rate win couldn't be masking a quality regression. Scaled to 80%+ adoption across the platform.

**Engineer**
> 35% → 42%, A/B, n≈400 across 5 jobs. Guardrail metric (1st-interview %) held steady through rollout.

---

### Guardrail
*(Founder/PM and Engineer; Recruiter omitted)*

**Founder / PM**
> Shortlisting rate improving means nothing if the candidates who do get shortlisted are worse fits — so 1st-interview % was tracked specifically as the check that a shortlisting win wasn't hiding a quality regression underneath it.

**Engineer**
> 1st-interview % tracked as an explicit guardrail alongside the primary shortlisting-rate metric, not assumed to move in the same direction by default.

---

### Not-used
*(Engineer only — a deliberate, honesty-signaling exclusion)*

**Engineer**
> RAG is not used for retrieving job criteria in this feature — job requirements and resume text are passed directly into the classification prompt, with no retrieval step. It's the kind of place RAG looks like a natural fit and isn't needed: the job criteria are small, known at call time, and retrieval would add latency and a new failure mode for nothing.

---

### Eval methodology
*(Founder/PM brief; Engineer full)*

**Founder / PM**
> A/B test on 5 live jobs and ~400 candidates, comparing shortlisting rate with the guardrail metric tracked alongside it, before committing to a platform-wide rollout.

**Engineer**
> A/B design: 5 jobs, ~400 candidates, shortlisting rate as the primary metric and 1st-interview % as the guardrail, run before platform-wide rollout — not a synthetic offline eval.

---

### Roadmap
*(Founder/PM and Engineer)*

**Founder / PM**
> Two next steps. First, extend to candidates without resumes — apply the same shortlisting logic to LinkedIn profile data via a third-party API already available at no extra cost, rather than requiring a parsed resume. Second, apply the same logic earlier, at the sourcing stage, filtering candidates before recruiters spend time on them rather than only at the shortlisting stage.

**Engineer**
> Extend the classification logic to LinkedIn-profile input (no resume required). Move the same scoring earlier in the funnel, at sourcing rather than only at shortlisting.

---
---

# PROJECT: drip-campaign

## CaseHeader
`TopHire · Product Manager, reported to the CEO · shipped in two versions (V1, V2) · Live, 90%+ adoption — the default way outreach is written · internal build, technique described`

## Signature visual
**V1 → V2 timeline, and the 3-fix ladder.** Top: a two-stage version timeline, V1 (automation + templates) → V2 (AI-personalized, layered on top once V1 was proven). Below: a numbered 3-step ladder — clean the data → optimize the prompt → add a review layer — with the third step visually emphasized as the one that mattered most.

---

### Problem

**Recruiter**
> Recruiters were living between the CRM and Gmail all day, and writing a good outreach email at volume kept getting slower to do well. Positive reply rate was stuck around 20%.

**Founder / PM**
> Candidate volume kept climbing and recruiter outreach couldn't keep pace. Two things were slipping at once: time — recruiters lived between two tools all day, copying candidate details out of the CRM, switching to Gmail, writing, sending, coming back to check replies, updating the CRM by hand — and reply rates, because when email is a chore done at volume, it gets templated and generic, and generic outreach gets ignored. Baseline positive reply rate was ~20%.

**Engineer**
> Outreach couldn't scale with volume without becoming generic, and generic outreach converts poorly. ~20% baseline positive reply rate.

---

### Discovery
*(Founder/PM full, Engineer short, Recruiter omitted)*

**Founder / PM**
> The standard discovery pattern for every TopHire feature: interviewed recruiters directly, plus ran a dedicated 50-candidate test focused specifically on email quality, generating an evaluation-criteria list from the results to guide prompt improvement. Two options were weighed before committing to an approach — let recruiters build their own templates and automate just the sending, or use AI to write personalized emails outright. Rather than picking one, both became the two shipped versions, in sequence.

**Engineer**
> A 50-candidate email-quality test generated the evaluation criteria used to guide prompt work later.

---

### Decision
*(Founder/PM full — ship both, in sequence; Engineer technical framing; Recruiter omitted)*

**Founder / PM**
> Two options were on the table: recruiter-built templates with automated sending, or AI writing personalized emails outright. Rather than choosing, both became the roadmap, in sequence — V1 shipped the templated/automated option first, partly because the templates UI already existed as a component to reuse; V2 layered AI personalization on top once V1's automation and adoption were already proven.
>
> +buys: V1 proved the automation and the single-pane-of-glass win before betting on personalization quality. −costs: two builds instead of one, and a slower path to the "ultra-personalized" version everyone actually wanted.

**Engineer**
> V1: automation and reply classification, job-level templates. V2: AI-personalized content at the job+candidate level, layered on top of V1's already-adopted automation rather than shipped as a single combined bet.

---

### Approach
*(Recruiter outcome-framed; Founder/PM decision-framed; Engineer full technical)*

**Recruiter**
> Writes a genuinely personalized email for each candidate, sends the follow-ups on a schedule automatically, and sorts incoming replies by intent so a recruiter isn't reading and filing every response by hand.

**Founder / PM**
> V1: follow-up sequences that send themselves, Gmail integration so recruiters work without leaving the CRM, and AI-assisted reply classification. Content was still job-level templates — the win was automation and the single pane of glass, not personalization yet. V2: content moved to job + candidate level — a third-party LinkedIn scraper API pulls the candidate's data, combined with recruiter-fed job and company data, and Claude Sonnet writes a genuinely personalized email per candidate. AI now does roughly 80% of the outreach-writing work; the recruiter reviews and sends. Rollout for both versions: 1 recruiter → 5 → 10, 2-3 weeks per stage.

**Engineer**
> LinkedIn scraper API pulls candidate data, combined with recruiter-fed job/company context. Claude Sonnet writes per-candidate. Strict JSON output contract: two subject-line options, three email bodies each with a word count — the prompt is an API contract, not a creative-writing instruction. Hard constraints enforced in-prompt: a locked opening line, no sender sign-off ever, independent word caps per email in the three-email sequence, seniority-tiered emphasis (VP/Head vs. Staff/Principal vs. mid/early-career), and the current date injected as a variable so the model never guesses the year computing years-of-experience.

---

### Fix-in-order
*(The canonical example of this pattern — a real, numbered, impact-ordered ladder)*

**Founder / PM**
> The hard part was email quality — specifically hallucination and guideline drift, where the model would quietly break the rules that make outreach land. Three fixes, applied in order of impact: first, clean up the input data, so the model wasn't writing on top of noisy, inconsistent candidate/job inputs; second, optimize the prompt against real observed failure cases, not hypothetical ones; third — the fix that mattered most — add a review layer, a second prompt that validates and approves the written content against the guidelines before it ever reaches the recruiter. That third fix is what turned "mostly good with the occasional embarrassing miss" into consistently send-ready output, which is what earned the trust behind 90%+ adoption.

**Engineer**
> Three fixes, in impact order: (1) clean input data, (2) optimize the prompt against real observed failures, (3) a second review-pass prompt that validates output against the guidelines before a human sees it — the highest-impact of the three. Notably, the production prompt document itself restates several "hard rules" a second time, verbatim, in a later "mandatory format requirements" block — rules don't get restated in a shipped prompt unless the first statement of them was observed to fail often enough in practice to be worth reinforcing. The prompt's own structure is evidence of its iteration history.

---

### Metrics

**Recruiter**
> Positive replies went up about 30%. It saves roughly 8 hours a week per recruiter, and over 90% of recruiters use it — it's simply how outreach gets written now.

**Founder / PM**
> North star: positive reply rate, ~20% baseline → ~+30%. Guardrails: bounce rate and complaint rate. Secondary: time saved per recruiter (~8 hrs/week, via a 3-month post-launch survey mirroring a pre-launch baseline), conversion to interview. 90%+ adoption — the default way outreach is written at TopHire, not an optional side tool.

**Engineer**
> ~+30% off a ~20% baseline reply rate. 90%+ adoption. ~8 hrs/week saved (survey-based, pre/post).

---

### Guardrail
*(Founder/PM and Engineer; Recruiter omitted)*

**Founder / PM**
> North star was positive reply rate, but bounce rate and complaint rate were tracked as guardrails specifically so a reply-rate win couldn't be bought at the cost of spammy or bounced sends.

**Engineer**
> Bounce rate and complaint rate tracked as explicit guardrails alongside the primary reply-rate metric.

---

### Not-used
*(Engineer only)*

**Engineer**
> n8n was not used for the automation workflows — the automation logic was built directly, not on an external workflow tool.

---

### Eval methodology
*(Founder/PM brief; Engineer full)*

**Founder / PM**
> Offline: LLM-as-judge used in some places to evaluate email quality before changes shipped. Online: A/B testing tied to reply-rate tracking. Post-launch: a 3-month survey mirroring a pre-launch baseline, to quantify hours saved. Once live, three feedback channels ran simultaneously, not just the survey — in-product UI feedback, support-ticket tracking specific to the feature, and a live metrics dashboard for continuous monitoring.

**Engineer**
> LLM-as-judge (offline) + A/B on reply rate (online) + a mirrored pre/post survey (hours saved) + three simultaneous post-launch feedback channels (in-product UI feedback, feature-specific support tickets, a live dashboard) — deliberately more than one signal, so a regression would surface through whichever channel caught it first rather than waiting for the next scheduled survey.

---
---

# PROJECT: cashback-builder

## CaseHeader
`nurture.farm · Product Manager (promoted from APM) · 05/2021–11/2022 · Shipped, scaled, still run ~15 days/month · internal build, technique described`

## Signature visual
**The earn-on-delivery → redeem-next loop.** A circular flow diagram: Order placed → Delivered (points credited *here*, marked distinctly — not at order placement) → Points balance → Redeemed as a real payment method on the next order, before expiry → back to Order placed. The delivery-gated crediting node is visually called out as the trust mechanism.

---

### Problem

**Recruiter**
> Retailers on the marketplace bought wherever the price was lowest, and the app had no way to compete on price without just discounting margin away on every order.

**Founder / PM**
> Discovery — the same retailer interviews and on-ground visits that separately surfaced the finding behind the lending product — surfaced that retailers' primary purchase-deciding factor was price. Retailers would buy wherever the effective price was lowest, and the app had no mechanism to compete on that dimension beyond the sticker price, no way to be cheaper than the alternative without discounting margin away on every single order.

**Engineer**
> No mechanism existed to compete on price beyond a direct discount, which erodes margin linearly with volume.

---

### Discovery
*(Founder/PM full, Engineer short, Recruiter omitted)*

**Founder / PM**
> Retailer interviews and on-ground visits — the same discovery effort that surfaced the credit-access finding behind the lending product. Not a one-off research exercise; both products trace to the same field work, run before either was designed.

**Engineer**
> Same field-research effort as the lending product; this is the pricing-behavior finding from it.

---

### Decision
*(Founder/PM full — loop vs. discount; Engineer technical framing; Recruiter omitted)*

**Founder / PM**
> Build a loop, not a discount: retailers earn points on an order and are incentivized to place their next order to redeem those points before they expire — a reason to come back, rather than a one-time price cut. Delivery-gated crediting was the deliberate integrity choice inside that loop: points credit only once the product is delivered, not at order placement, tying the incentive to a completed transaction rather than one that could still be cancelled or fail delivery.
>
> +buys: a repeat-purchase incentive that doesn't erode margin the way a straight discount does, plus points-ledger integrity since only completed orders mint points. −costs: real infrastructure to build (a points-payment mode, a ledger, delivery-triggered crediting) versus just changing a price.

**Engineer**
> Points as a real payment method at checkout, not a dashboard balance. Crediting triggered on the delivery event specifically, not order placement — a deliberate choice to tie the incentive to a completed, un-cancellable transaction.

---

### Approach
*(Recruiter outcome-framed; Founder/PM decision-framed; Engineer full technical)*

**Recruiter**
> Retailers earn points on an order and can spend them like real money on their next one. Sales runs the offers themselves through a self-serve tool, without needing engineers involved each time.

**Founder / PM**
> Three things were built to make this work: a cashback designer portal for the internal sales team — a self-serve tool letting sales configure and launch campaigns and rules themselves, without engineering or product involvement per campaign; a points-based payment mode on the app, so points are a real, usable payment method at checkout, not just a dashboard balance; and the points-crediting infrastructure itself, gated on delivery. Once live, the sales team runs cashback offers on about 15 days a month — a recurring operating rhythm, not a one-off launch.

**Engineer**
> Three components: a self-serve campaign-configuration portal for sales (rules, timing, thresholds — no engineering touch per campaign), a points-based payment method integrated into checkout, and delivery-gated crediting infrastructure that only mints points once a delivery event fires, not at order placement.

---

### Metrics

**Recruiter**
> Month-1 retention for retailers using the loop rose from about 28% to 40%. Points-based orders now pass $1M a month.

**Founder / PM**
> Month-1 retention: ~28% → ~40% for retailers exposed to the cashback loop — a real, specific before/after figure that replaced an earlier, rougher self-estimate once it was actually measured. $1M+ in points-based transactions per month at scale. Contributed to Average Order Value growth, directionally — giving retailers a reason to place larger qualifying orders to hit point thresholds, though not precisely isolated from other AOV drivers.

**Engineer**
> 28% → 40% M1 retention (instrumented, replaced an earlier estimate). $1M+/month points-based transactions. AOV lift is directional only — not isolated from other drivers in the source data.

---

### Didn't ship / gaps
*(The one honest caveat on this project — the AOV claim)*

**Recruiter**
> The one figure I'd flag as soft: the loop likely helped average order size grow too, but that specific effect isn't cleanly separated from other things that were also driving order size up at the same time.

**Founder / PM**
> The Month-1 retention and points-volume numbers are solid, instrumented figures. Average Order Value growth is the one I'd flag as directional rather than proven — the loop plausibly contributes to it (bigger orders to hit point thresholds), but it isn't precisely isolated from nurture.farm's other AOV drivers over the same period, so I'm stating it as a contribution, not a measured lift.

**Engineer**
> AOV attribution wasn't isolated with a controlled comparison — it's a plausible mechanism (order-size incentives to hit point thresholds), reported as directional rather than as a measured causal lift.

---

### Not-used
*(Engineer only)*

**Engineer**
> No AI or ML model anywhere in this feature — it's a rules engine (campaign configuration), a payment-ledger integration (points as a payment method), and an event-gated crediting trigger (delivery, not order placement). Worth saying plainly: this is a business-mechanism and systems-integrity story, not a machine-learning one.

---

### Eval methodology
*(Founder/PM brief; Engineer full)*

**Founder / PM**
> Month-1 retention measured before/after exposure to the loop for the same retailer cohort. Points-transaction volume tracked on an ongoing basis once at scale.

**Engineer**
> Retention measured as a cohort before/after comparison (exposed to the loop vs. not), rather than a platform-wide average that could hide the effect. Points-transaction volume tracked continuously post-launch as the scale signal.

---
---

# PROJECT: pii-waterfall

## CaseHeader
`TopHire · Product Manager, reported to the CEO · built ~1 year before this writing, after outreach/shortlisting, before voice screening · Live, foundational infrastructure · internal build, technique described`

## Signature visual
**The cost-ascending waterfall, across three segment configs.** A vertical chain of 7-8 provider boxes, ordered cheapest-to-most-expensive, with an arrow showing "try next only on a miss." Beside it, three segment tabs — India-tech / India-non-tech / US — each highlighting a different subset of enabled providers and whether phone lookups fire at all. The $100k/yr figure sits beneath as the outcome of the whole shape.

---

### Problem

**Recruiter**
> Recruiters need candidate contact details to reach out, bought from a set of outside data providers. TopHire was using 7-8 of them and calling them carelessly — paying for the same lookup twice, or paying for a phone number when only an email was actually needed.

**Founder / PM**
> Recruiters need candidate contact information (email, phone) to reach out, sourced through PII/lead-enrichment APIs — 7-8 tools in the mix (SalesQL, EasyLeadz, ContactOut, PeakAI among them). Called naively, these tools waste spend on duplicate lookups and on fetching data that isn't actually needed for a given candidate or role. This sits alongside two more straightforward vendor decisions handled the same period — WhatsApp messaging (evaluated AiSensy, Wati, Gupshup; shipped on Gupshup) and cloud calling (evaluated MyOperator, Servetel, Exotel; shipped on MyOperator) — but the PII work is where the real cost-engineering story, and the $100k/year figure, actually comes from.

**Engineer**
> 7-8 PII enrichment APIs called uniformly, regardless of what a given candidate or role actually needed — duplicate lookups and unnecessary field fetches were the waste.

---

### Discovery
*(Founder/PM short — this one wasn't interview-driven; Engineer short; Recruiter omitted)*

**Founder / PM**
> Not retailer or recruiter interviews this time — the friction was visible directly in vendor spend across 7-8 already-active PII tools, called the same way regardless of what a given candidate or role actually required.

**Engineer**
> Identified through vendor-spend review, not user research — an infrastructure-cost diagnosis rather than a product-discovery one.

---

### Decision
*(Founder/PM full — the reframe; Engineer technical framing; Recruiter omitted)*

**Founder / PM**
> The insight that made this work wasn't "which vendor is best," it was "which vendor, in what order, for which segment." Rather than picking one winner and calling it uniformly, all 7-8 tools stay active in a cost-and-need-sequenced waterfall — cheaper tools tried first, more expensive ones only called if the cheaper ones fail to return usable data — and the whole workflow is segmented by candidate/role type (India tech, India non-tech, US), each with its own configuration of which lookups are even enabled.
>
> +buys: no spend wasted on a lookup a segment doesn't need, without ever losing coverage for the segments that do need it. −costs: three separate configurations to build and maintain instead of one uniform integration.

**Engineer**
> Reframed from vendor selection to workflow sequencing — cost-ascending fallback order, plus per-segment field requirements (email-only vs. email+phone), rather than one API call pattern applied everywhere.

---

### Approach
*(Recruiter outcome-framed; Founder/PM decision-framed; Engineer full technical)*

**Recruiter**
> Cheapest data providers get tried first for every candidate; more expensive ones only get called if the cheap ones come back empty. Different setups run for India tech roles, India non-tech roles, and US roles, because what's actually needed differs a lot between them.

**Founder / PM**
> A sequenced fallback chain across the 7-8 PII APIs, rather than calling all of them per candidate. Two things drove the sequence: cost (cheaper tools tried first, expensive ones only on a miss) and actual need (some configurations only need email; others need email and phone/WhatsApp — the workflow only enables the lookups actually required for a given case). Segmented into three configurations — India tech roles, India non-tech roles, US roles — each with its own provider set enabled.

**Engineer**
> A sequenced fallback chain, cost-ascending, across 7-8 PII enrichment APIs. Three segment configs (India-tech, India-non-tech, US), each with its own enabled-provider set and required-field list, so an email-only case never fires a phone/WhatsApp lookup at all. The segmentation is what let the system avoid uniformly expensive lookups across a candidate base where the real information need varies significantly by geography and role type.

---

### Metrics

**Recruiter**
> Eliminated wasted spend on duplicate and unnecessary lookups across the 7-8 tools, saving $100,000 a year.

**Founder / PM**
> $100k/year saved in operational costs, from cost engineering at the workflow-design level, not from picking a single cheaper vendor. All 7-8 PII tools stayed active — none were dropped — just called in a smarter order, for the right segment.

**Engineer**
> $100k/yr saved. 7-8 APIs kept active (not replaced). 3 segment configurations by geography and role type.

---

### Not-used
*(Engineer only)*

**Engineer**
> No AI or ML model in the waterfall itself — it's rule-based sequencing and segment-configuration logic, not a learned system. The intelligence here is in the workflow design, not a model.

---

### Eval methodology
*(Founder/PM brief; Engineer full)*

**Founder / PM**
> Measured as the reduction in wasted spend — duplicate and unnecessary lookups — once the waterfall and segmentation were introduced, compared against the prior uniform-calling pattern.

**Engineer**
> Cost-per-successful-lookup tracked before and after introducing the waterfall, segmented the same way the waterfall itself is segmented, isolating the saving to the sequencing change rather than a vendor swap.
