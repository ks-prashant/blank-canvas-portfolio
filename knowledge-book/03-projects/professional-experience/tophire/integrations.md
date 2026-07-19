# Multi-Vendor API Orchestration & Integrations — TopHire

**Identity:** Built at TopHire. Owned end to end by Prashant Singh, Product Manager.

**Status:** Live, foundational infrastructure underlying the other TopHire AI products.

**Timeline:** Built roughly a year before this writing — **after** the drip campaign tool and resume shortlisting, **before** the voice screening agent (which is more recent). See `company-context.md`, "Sequencing note," for how this fits the broader order the four AI products were built in.

---

## Overview

"Integrations" at TopHire is really three separate vendor-selection efforts, each solving a different problem: WhatsApp messaging, cloud calling, and PII (contact) enrichment. The PII enrichment work is where the headline **$100k/year saved** actually comes from — it's a cost-engineering story, not a generic "we integrated some APIs" line, and it's described in full below.

## 1. WhatsApp vendor selection

**Evaluated:** AiSensy, Wati, and Gupshup.
**Chosen:** **Gupshup.**

## 2. Cloud calling vendor selection

**Evaluated:** MyOperator, Servetel, and Exotel.
**Chosen:** **MyOperator.**

## 3. PII enrichment waterfall — where the $100k/year comes from

**Problem:** TopHire's recruiters need candidate contact information (email, phone) to reach out — sourced through PII/lead-enrichment APIs (tools like SalesQL, EasyLeadz, ContactOut, and PeakAI were in the mix, **7–8 APIs total**). Called naively, these tools waste spend on duplicate lookups and on fetching data that isn't actually needed for a given candidate or role.

**Approach:** Designed a **waterfall workflow** — a sequenced fallback chain across the 7–8 PII APIs — rather than calling all of them per candidate. Two things drove the sequence and configuration:

- **Cost** — cheaper tools are tried first in the waterfall; more expensive ones are only called if the cheaper ones fail to return usable data.
- **What's actually needed** — some configurations only need email; others need both email and phone/WhatsApp. The workflow only enables the lookups actually required for a given case, rather than always fetching both.

The workflow was also **segmented by candidate/role type**, with separate configurations for:
- **India, tech roles**
- **India, non-tech roles**
- **US roles**

Each segment has its own API configuration — for some, only lower-cost PII tools are enabled at all; for others, the email-only vs. email+phone decision differs. This segmentation is what let the system avoid uniformly expensive lookups across a candidate base where the real information need varies a lot by geography and role type.

**Outcome:** Eliminated wasted spend on duplicate and unnecessary lookups across 7–8 PII APIs, **saving $100k/year** in operational costs.

## What this demonstrates

Three separate, measured vendor bake-offs (WhatsApp, calling, PII enrichment) — consistent with the pattern seen everywhere else in his AI work (Voice AI: ElevenLabs/Bolna/Retell/Gnani; resume shortlisting: GPT/Claude/DeepSeek) — applied here to plain infrastructure vendors, not just AI model providers. The PII waterfall specifically shows cost-engineering discipline at the workflow-design level: not just picking a cheaper vendor, but restructuring *how and when* each vendor gets called, segmented by where the real cost/value tradeoff actually differs (geography, role type, which contact channels are needed).

## One-line pitch

Ran three separate vendor bake-offs at TopHire (Gupshup for WhatsApp, MyOperator for cloud calling, and a 7–8-tool PII enrichment stack) and designed a cost-and-need-sequenced waterfall across the PII tools, segmented by geography and role type, saving $100k/year in operational costs.

## Sources

Resume; direct conversation with Prashant.
