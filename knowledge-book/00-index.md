# Prashant Singh — Knowledge Book

**Purpose:** a detailed, factual reference on Prashant Singh's work and career — built to be used as a personal second brain and as a grounding source for a chatbot. Written to be retrieved in fragments: every file and section here stands on its own, without needing the rest of the book for context.

**Subject:** Prashant Singh, AI Product Manager and Builder, based in Bengaluru. Career start May 2016. Most recently Product Manager at TopHire, April 2023 to May 2026, plus two solo-built, live AI products (Automjet Sales Agent, Grounded Governance) outside of employment.

## How this book is organized

| File | Contents |
|---|---|
| [01-identity.md](01-identity.md) | Who he is, current status, career arc in one page |
| [02-career-timeline.md](02-career-timeline.md) | Every role, dated |
| `03-projects/` | The core of the book, split into two groups — see below. |
| [04-domain-expertise.md](04-domain-expertise.md) | Cross-project expertise: payments/fintech, generative & agentic AI, classical ML, HR tech, marketplace |
| [05-methodology.md](05-methodology.md) | How he works — with systems (discovery, vendor selection, rollout, eval) and with people (prioritizing with leadership, stakeholder ownership) |
| [06-positioning.md](06-positioning.md) | A narrative summary and framing of the career arc |

### `03-projects/` layout

Two groups, split by what can be shown and how it's owned:

- **`professional-experience/`** — work built inside a company (TopHire, nurture.farm, Ola, Infosys, Prashaste). Described in depth, but these are internal builds at each employer — no public demo or source code to share for the TopHire and nurture.farm products.
- **`personal-projects/`** — two products built entirely solo, outside any employer: **Automjet Sales Agent** (a Retell conversation-flow voice agent, live at a real Ather dealership in Thane) and **Grounded Governance** (an AI-governance research assistant, live at pact-wise-guide.lovable.app). Because there's no employer confidentiality involved, these are documented even more exhaustively — each folder holds a canonical summary plus its full primary-source build documents.

Within `professional-experience/`, the two employers with rich source material (TopHire, nurture.farm) keep one file per shipped feature, plus a `company-context.md` overview covering the company, his role, and org structure. The three employers with resume-level source material only (Ola, Infosys, Prashaste) get a single consolidated file with a short overview and one section per distinct feature — splitting them into many thin files would outrun what's actually documented.

```
03-projects/
  professional-experience/
    tophire/            company-context.md (org structure, hiring funnel, how the 4 products sequence),
                         drip-campaign.md (+ drip-campaign-prompt.md, the full production prompt),
                         resume-shortlisting.md, voice-screening.md, support-chatbot.md, integrations.md
    nurture-farm/        company-context.md (overview), checkout-optimization.md, cashback-builder.md,
                         lending.md, seller-payouts.md
    ola/                 experience.md (overview + 4 features: fare prediction, billing simulation,
                         dashboards, EU launch)
    infosys/              experience.md (overview + 2 items: AML workflows, trainee program)
    prashaste/           experience.md (overview + 2 features: trackers/training, business evaluations)
  personal-projects/
    automjet/            voice-agent.md (canonical summary: the Retell v5 conversation-flow build —
                         architecture, register, "no" taxonomy, cost, compliance, v1→v5 learnings)
                         + retell-build-guide-v5.md (the full primary-source build document)
                         + two call recordings (booked + cold) [PENDING from Prashant]
    grounded-governance/ grounded-governance.md (canonical summary: obligation map, corpus, pipeline
                         + citation-validation fence, eval results reported honestly, incident log)
                         + source-prd.md and source-build-plan.md (the full primary sources)
```

`professional-experience/tophire/drip-campaign-prompt.md` reproduces its source artifact (the production prompt) in full. The two personal-project folders co-locate their complete primary-source build documents beside the canonical summaries — nothing about either product may be claimed that isn't traceable to those files. **The pre-2026-07 versions of both personal products (the 17-checkpoint Automjet build, DocuFlow) are retired and archived in `_archive/pre-2026-07-products/` — do not cite them.** Other project files are as detailed as their underlying material supports.

## How to read figures in this book

Most figures are exact, resume- or system-sourced numbers. A small number are explicitly marked as **self-reported estimates** rather than instrumented metrics — for example, the Month-1 retention lift from nurture.farm's cashback builder. Where a figure is marked that way, treat it as directional rather than precise, and don't round it up into a harder-sounding stat than it is.
