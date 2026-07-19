# TopHire — Company & Role Context

This file captures the organizational and product context that every other file in `tophire/` assumes. Source: Prashant's own first-person notes (`TopHire Context.docx`), transcribed closely rather than summarized, plus resume-sourced scale figures.

---

## What TopHire is

A **hiring agency**, not a job board — TopHire's own internal recruiters do the hiring work for client companies, using an internal recruiter CRM as their operating system. Clients: **2,500+ enterprises**, ranging from small companies to large MNCs, but mostly **mid-size organizations (50–500 employees).**

## The hiring funnel the CRM manages, end to end

The recruiter CRM is used for the full hiring process, stage by stage:

1. **Sourcing** — finding candidates.
2. **Candidate outreach** — the drip campaign tool's domain.
3. **Candidate screening and shortlisting** — the voice screening agent's and resume shortlisting model's domain.
4. **Sending the profile to the client for shortlisting** — the client-side decision point that the resume shortlisting rate (35%→42%) is measured against.
5. **Interview process management**, once the client shortlists.
6. **Offer discussion.**

## Prashant's role and mandate

Product Manager, handling the **entire B2B product suite** with the recruiter CRM as the core product. His own stated mandate: *"transform the CRM to empower our recruiters to take on more jobs at the same time, and also reduce the overall time to hire for enterprises."* Both halves of that mandate map directly onto the resume's headline numbers — **140% productivity gain** (recruiters taking on more jobs) and **~25% time-to-hire reduction.**

## Org structure

- **Reports directly to the co-founders** — no PM or product layer in between.
- A **sales team** works client leads (the 2,500+ enterprise relationships).
- An **account management team** — which is, in practice, the team of recruiters who use the recruiter CRM day to day.
- **Each accounts team has a head recruiter, multiple associate recruiters, and multiple telecallers** — a specific internal hierarchy within the 150+-recruiter base, not a flat pool.

### The product team, and how it changed over his tenure

The product org **contracted over his three years**, and this is important context for reading everything else in this folder:

| | Product managers | Engineers |
|---|---|---|
| Earlier in his tenure | 2 (including him) | 7–8 |
| By the time he left (05/2026) | **1 — him, solo** | **3–4** |

At the earlier end of that range he also worked with a designer and an analyst on the product side. By the end, he was the **solo product manager** on the product — a scope expansion driven by team contraction, not by promotion.

**Why this matters for reading the rest of this book:** the four shipped AI products documented in this folder — the drip campaign tool, resume shortlisting, the voice screening agent, and the support chatbot — plus the multi-vendor orchestration layer, were delivered across this period, much of it with a shrinking team and, by the end, with him as the only PM on it. The output should be read against that constraint. It is also the reason he left; see `../../../01-identity.md`, "Why he left TopHire."

## What this org structure explains

- Why the resume figure is **150+ internal recruiters**, not 150+ "PMs" or "engineers" — they're the account management / delivery layer, organized in head-recruiter-led pods.
- Why product rollouts at TopHire consistently follow a **1 → 5 → 10 → all** phased pattern (see `../../../05-methodology.md`): with a small engineering team and a recruiter base organized into pods under head recruiters, a phased rollout through a small number of pods first is the natural shape, not an arbitrary choice.
- Why GTM for a feature isn't just "ship it" — with a sales team and an account-management team as two distinct internal stakeholder groups beyond the recruiters actually using a tool, adoption requires deliberate communication to both, which is reflected in the drip campaign's GTM approach (see `drip-campaign.md` §7).

## How prioritization actually happened

Feature prioritization ran through a **standing monthly meeting with the CEO, the CTO, and the Head of Sales.** He brought **test results and cost analysis** into that meeting to drive the prioritization decision — evidence first, rather than a roadmap argument. The same forum handled **feature demos and launch alignment** before a feature shipped. See `../../../05-methodology.md`, "How he works with people," for the fuller pattern.

## Sequencing note: how the products and infrastructure relate to each other

Per Prashant's own framing, the voice screening agent was built **after** outreach automation was already in place — his own words introducing that project: *"I have already automated high volume emails and whatsapp follow ups across the hiring funnel. Screening is one of the workflows where recruiters spend the maximum time now."* This means the four TopHire AI products weren't planned as a simultaneous suite — they were sequenced by **where recruiter time was going next**, once the prior bottleneck was addressed: outreach first (drip campaign), then screening (voice AI), with resume shortlisting and the support chatbot addressing separate, parallel bottlenecks (client-facing shortlist quality, and internal support load, respectively).

**Confirmed order:** drip campaign → resume shortlisting → **multi-vendor integrations / PII waterfall** (built roughly a year before this writing — see `integrations.md`) → voice screening agent (the most recent of the four). The integrations work sits between resume shortlisting and voice screening chronologically — it's infrastructure work, not a fifth "feature," but it followed the same "fix the current bottleneck" logic: by the time it was built, outreach and shortlisting were both live, and vendor cost/reliability across calling, WhatsApp, and PII lookups had become the next thing worth fixing.

## Sources

Prashant's own notes on TopHire, transcribed directly; resume for scale figures.
