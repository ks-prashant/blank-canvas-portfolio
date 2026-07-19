# Domain Expertise

Cross-project synthesis. Each claim here is backed by a specific project in `03-projects/` — see the linked file for full detail and sources.

Across his career, his domain range spans **fintech, HR tech, marketplaces, mobility, and regulated banking** — five genuinely different industries, not one domain revisited under different job titles.

## Mobility and regulated banking (early career)

Two domains from earlier in his career that still shape how he approaches later work:

- **Mobility**, at Ola: shipped a classical ML fare-prediction feature — a trained model on driver-behavior data, not an LLM — across the top 5 cities, simulated the driver-billing workflow to fix compliance issues, and built 20+ funnel/retention/feature dashboards for the driver-billing pod. This is his one genuine classical-ML project; his later AI work (TopHire, Automjet, Grounded Governance) is generative and agentic AI, a different technique — see below. See `03-projects/professional-experience/ola/experience.md`.
- **Regulated banking**, at Infosys: built anti-money-laundering workflows for a UK bank client, flagging 10,000+ transactions/month. This is his earliest exposure to building classification systems with a stated accuracy figure inside a compliance-heavy domain — a pattern that recurs at nurture.farm (RBI-compliant payouts) and later in AI-agent design (see "Compliance and trust engineering," below). See `03-projects/professional-experience/infosys/experience.md`.

## Payments, billing, and regulated fintech

Built at nurture.farm (`03-projects/professional-experience/nurture-farm/checkout-optimization.md`, `cashback-builder.md`, `lending.md`, `seller-payouts.md`): checkout-funnel A/B testing across payment-mode ordering, amount-calculation UI, and address-page flow; a cashback and points loop built for the internal sales team to run as a recurring program; automated seller payouts across six payment modes with RBI compliance and 99% on-time payment; and an NBFC-partnered in-app lending product with an embedded KYC flow that fixed a real onboarding failure, scaled to 6,000+ retailers. This is direct experience with regulated payments (RBI-adjacent compliance), not adjacent or theoretical — it predates and is separate from his generative and agentic AI work at TopHire.

**This background shows up later as a design instinct, not just a résumé line** — see "Compliance and trust engineering carried into AI system design" below.

## Generative and agentic AI product management

**A precision worth holding:** most of his AI product work is generative AI (LLM-based classification and generation) and agentic AI (multi-step voice/decision workflows) — not classical machine learning. The one project that's genuinely classical ML is Ola's fare-prediction model, covered above under "Mobility." Calling everything "AI/ML" would blur a real technical distinction; the specific technique matters, and each project below is described by what it actually is.

Spans four concrete, shipped mechanisms at TopHire alone, each with a different generative or agentic technique, plus two more built solo outside any employer:
- **LLM classification with justification** (`03-projects/professional-experience/tophire/resume-shortlisting.md`) — resume-to-job fit scoring, personalized by role level, with a measured model bake-off (GPT vs. Claude vs. DeepSeek).
- **Voice AI + LLM extraction** (`03-projects/professional-experience/tophire/voice-screening.md`, `03-projects/personal-projects/automjet/voice-agent.md`) — two separate production voice agents, one internal (TopHire) and one built solo for a friend's real business (Automjet), both using Retell AI for the call layer and an LLM for post-call structured extraction.
- **Retrieval-augmented generation with enforced grounding** (`03-projects/personal-projects/grounded-governance/grounded-governance.md`) — parent–child chunking over five governance frameworks, hybrid dense+keyword retrieval fused with RRF, reranking, and a post-generation citation-validation fence that mechanically drops any claim its cited source doesn't support — the model is never trusted to ground itself.
- **Fine-tuned classification + routing** (`03-projects/professional-experience/tophire/support-chatbot.md`) — a model fine-tuned on real internal Q&A pairs to decide "answer directly" vs. "route to a human."

The recurring pattern across all: **model/vendor selection is always run as an experiment** (documented bake-offs in three of the four TopHire products — see `05-methodology.md`), and **every one of them has an explicit statement of where it doesn't work or isn't claimed to work** — voice screening excludes senior roles by design, Grounded Governance publishes its own failing first eval run and defers claiming "proven" until the comprehensive re-run, resume shortlisting states RAG was *not* used despite being a natural-seeming fit.

### A second cross-cutting pattern: structured output contracts, not freeform text

Every one of the six shipped AI systems in this book outputs to a **strict, typed contract**, never a loose block of generated prose the rest of the system has to parse informally:
- The drip campaign prompt's output is a defined JSON schema — two subject lines, three email bodies each with a word count (`03-projects/professional-experience/tophire/drip-campaign-prompt.md`).
- Voice screening extracts the call transcript into named form fields with per-field confidence scoring (`03-projects/professional-experience/tophire/voice-screening.md` §3).
- Automjet's post-call record produces named fields — `call_status` (read off the ending node reached), `model_of_interest`, `purchase_timeline`, `test_drive_preferred_time`, plus handoff/DNC flags — not a transcript summary a human has to re-read (`03-projects/personal-projects/automjet/voice-agent.md` §8).
- Grounded Governance's generation step emits a typed structure (obligations with `supporting_chunk_ids`, applicability, impact) whose citation chips are built from chunk *metadata*, never parsed out of model text (`03-projects/personal-projects/grounded-governance/grounded-governance.md` §5).
- The tech-support chatbot's output is binary at the routing layer: answer directly, or tag a specific named person (`03-projects/professional-experience/tophire/support-chatbot.md` §2).

This is a consistent architectural choice, not a coincidence of tooling: it means every downstream system (a CRM field, a database record, a dashboard) can consume AI output without a human or a second AI pass re-interpreting free text first.

### A third cross-cutting pattern: compliance and trust engineering carried into AI system design

The nurture.farm regulated-payments background (RBI compliance, embedded KYC) reappears as a concrete design instinct in later AI-agent work, not just as a resume credential:
- **Grounded Governance's eval-results endpoint is write-gated by a bearer secret** — the one page whose entire pitch is "honest, unfakeable numbers" would otherwise be spoofable by anyone with a POST client (`03-projects/personal-projects/grounded-governance/grounded-governance.md` §6) — the same integrity-verification instinct that regulated-payments and fraud-prevention systems require as standard practice.
- **Automjet's compliance enforcement happens before a single call is placed** — DND/NCPR scrubbing per batch, correct sender-number series per consent basis, permitted calling windows, DLT registration — a hard pre-dial gate, not an in-conversation feature or an after-the-fact audit (`03-projects/personal-projects/automjet/voice-agent.md` §7) — structurally identical to nurture.farm's "consent is a record, not an assumption" requirement in the embedded-KYC lending flow.
- **Voice screening captures explicit candidate consent before recording** (`03-projects/professional-experience/tophire/voice-screening.md` §3) — the same pattern applied to a different regulated concern (data privacy in an HR context rather than a financial one).
- **Grounded Governance's snapshot design** — corpus snapshots are immutable, promoted only on a clean validation gate, and every answer records the `snapshot_id` it was generated against (`03-projects/personal-projects/grounded-governance/grounded-governance.md` §4) — is an audit-trail architecture: any answer can be traced to exactly the corpus state that produced it, the same shape regulated systems require of financial records.

## HR tech / recruitment operations

Deep, TopHire-specific: the full recruiter workflow (sourcing → outreach → screening → shortlisting → client review → interview → offer, detailed in `03-projects/professional-experience/tophire/company-context.md`), the metrics that matter at each stage (positive reply rate, shortlisting rate, 1st-interview % as a guardrail, call-completion rate), and the operational reality of a 150+-recruiter, 2,500+-client agency (a hiring agency, not just a job board — TopHire's own recruiters use the CRM to work client roles).

**Org-structure fluency, not just workflow fluency:** knows the internal hierarchy beneath the "150+ recruiters" headline figure — each account-management pod has a head recruiter, multiple associate recruiters, and multiple telecallers, sitting alongside a separate sales team that owns client leads (`03-projects/professional-experience/tophire/company-context.md`). This level of internal-org detail is what let product rollouts consistently follow a 1 → 5 → 10 → all pattern through a small number of pods before going company-wide, rather than an all-or-nothing launch.

## Marketplace & B2B SaaS

An SME marketplace (nurture.farm — retailers ordering from sellers, MTU/GMV as core metrics) and a B2B SaaS recruitment platform (TopHire — enterprise clients, internal-recruiter productivity) are structurally different marketplace shapes, and he's owned monetization in both: transaction-based (payments/lending/cashback at nurture.farm) and productivity/efficiency-based (AI automation lifting throughput at TopHire).

## Solo technical build capability

Both Grounded Governance and Automjet Sales Agent were built entirely outside employment, solo — Grounded Governance with Claude Code for the pipeline/backend and Lovable for frontend/DB/deploy, Automjet on Retell's conversation-flow platform — meaning the generative and agentic AI product judgment described above isn't only exercised through an employer's engineering team; he can specify, build, and ship the same class of system independently. Automjet is a **live, revenue-relevant production system for a real business**, not a demo — ~500 real calls/month for a real dealership, loop-proof by structural design (a one-way commitment ladder, a four-way "no" taxonomy, per-node model routing; `03-projects/personal-projects/automjet/voice-agent.md` §§3–6). Grounded Governance is a full retrieval product with its own ingestion pipeline, evaluation harness, and in-product eval page (`03-projects/personal-projects/grounded-governance/grounded-governance.md`) — comparable in architectural depth to anything built with a 6–10 person engineering team at TopHire, despite being one-person builds.

## Sources

Synthesized from `03-projects/*`. No new claims introduced here — every statement traces to a specific project file and section, cited inline above.
