# In-App Lending (NBFC-Partnered Credit) — nurture.farm

**Identity:** Built at nurture.farm, an MSME marketplace app under UPL. Owned end to end by Prashant Singh, Product Manager (promoted from APM during this tenure). 05/2021–11/2022.

**Status:** Shipped, scaled to 6,000+ retailers during his tenure.

---

## 1. Problem — found through discovery, not assumed

Discovery ran through **retailer interviews and on-ground visits**, not desk research. It surfaced a specific, concrete friction: **retailers were getting credit from offline sellers when they purchased offline** — and that offline credit access was a major reason they weren't purchasing through the nurture.farm app at all. A retailer who wanted to buy on credit simply had no equivalent option in the app; the marketplace was competing for a purchase decision without offering a financing mechanism the retailer already relied on elsewhere.

Beyond the discovery finding itself, the mechanics of getting credit were also a problem in their own right: traditional lending was slow, high-friction, and not integrated with the ordering flow — a retailer who wanted credit had to leave the app entirely and go through a separate, slow process.

## 2. Approach

**Partnered with an NBFC** to launch in-app credit. Underwriting itself — who gets credit and at what limit — was **owned by the NBFC**, not by Prashant or nurture.farm; his ownership was the product surface around that decision:

- **KYC flow, embedded in-app**, rather than sending retailers to a separate process.
- **Payment integration** for credit-based purchases.
- **Collection integration** — nurture.farm integrated the NBFC's collection APIs, and Prashant additionally set up **proactive payment-reminder communication up to the due date**; once a payment went overdue, the **NBFC took over enforcement and collections** directly.
- **Credit limits ranged from ₹30,000 to ₹10 lakh** per retailer, set by the NBFC's underwriting.

All of this — the KYC data-sharing design, the collection handoff point, the underwriting relationship — was **planned jointly between Prashant, the NBFC, and nurture.farm's business finance team**, not decided by product alone.

## 3. The KYC problem, and the fix that made this feature actually work

**What went wrong initially:** the NBFC's standard KYC flow required a retailer to complete **multiple separate logins to third-party portals**, upload documents, share location, and submit a photo — a long, high-friction, multi-step process completely disconnected from the app the retailer was already using. Conversion into the credit product was low as a direct result.

**The fix:** Prashant designed an **embedded KYC flow** that avoided re-collecting data nurture.farm already had. Because retailers had already completed KYC to use the core marketplace app, a meaningful share of the required information could be **pre-filled and passed to the NBFC directly from nurture.farm's backend via API**, rather than asked of the retailer again. The remaining required information was collected **inside nurture.farm's own app UI** — not via redirect to a third-party portal — with the NBFC's SDKs embedded in-app at some steps, and the resulting data passed to the NBFC through API integration.

**Result:** onboarding became meaningfully faster and easier, which directly lifted both onboarding volume and conversion into the credit product — this fix is the specific mechanism behind the lending feature's scale (6,000+ retailers), not a separate side improvement.

**GTM, once the flow was fixed:** drove awareness and adoption through **SMS, WhatsApp, and in-app banners.**

## 4. Repayment performance

**Overdue rate was approximately 6%.** Stated plainly and without spin: this was not treated as the primary metric to optimize at the time — the priority was scaling adoption of a genuinely useful product for retailers, not minimizing delinquency as a first-order goal. This is an honest, moderate figure, not a polished one; it's included because a real lending product without a repayment number is a red flag to anyone with fintech experience, and 6% is a plausible, defensible number to have in an unoptimized-for-risk, scale-focused period.

## 5. Outcome

- Scaled in-app lending to **6,000+ retailers.**
- **32% lift in MTU** (monthly transacting users) for the credit-cohort retailers — those who used credit transacted meaningfully more often than non-credit retailers.
- **~6% overdue rate** on repayments (see §4 for context).
- Opened a new revenue lever (interest/fees on credit extended, accruing to the NBFC/nurture.farm partnership).
- Increased order volume and retention among credit users.

## 6. Why this matters as a fintech story

Identified a real SME working-capital need, orchestrated an NBFC partnership from scratch, and — critically — **diagnosed and fixed a real onboarding failure** (the multi-portal KYC flow) that was actively suppressing adoption, by redesigning the data flow around information the business already had rather than accepting the NBFC's default flow as fixed. This is the same "identify a specific point of friction, then fix the mechanism, not just the messaging" discipline seen in TopHire's drip campaign work — applied here to a regulated onboarding flow instead of an AI output.

## 7. One-line pitch

Partnered with an NBFC to launch in-app lending for an MSME marketplace — redesigned a failing multi-portal KYC flow into an embedded one using data the business already had, scaling to 6,000+ retailers (₹30k–₹10L credit limits) with a 32% MTU lift in the credit cohort and a ~6% overdue rate.

## 8. Sources

Resume; direct conversation with Prashant.
