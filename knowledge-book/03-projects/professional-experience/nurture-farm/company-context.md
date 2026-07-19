# nurture.farm — Company & Role Context

This file captures the organizational and business context that every feature file in this folder assumes: `checkout-optimization.md`, `cashback-builder.md`, `lending.md`, and `seller-payouts.md`.

---

## What nurture.farm is

nurture.farm is an **MSME marketplace app**, a subsidiary of **UPL** (a global agrochemical company), selling **agri-input products** to retailers. Retailers on the platform order products, pay through the app, and receive fulfillment and payouts through the same system — the same core marketplace loop (order → pay → fulfill → payout) that his payments and lending work was built around.

## Prashant's role and mandate

**Product Manager**, promoted from Associate Product Manager during his tenure (05/2021–11/2022) based on impact. Led the **payments and monetization roadmap** end to end — covering checkout/payment-mode optimization, the cashback and points system, an NBFC-partnered in-app lending product, and automated seller payouts, all owned by him across the same period. See `checkout-optimization.md`, `cashback-builder.md`, `lending.md`, and `seller-payouts.md` for the individual feature write-ups.

## Roadmap-level outcome

Across the whole payments and monetization roadmap (not any single feature in isolation): **MTU (monthly transacting users) grew from ~4k to ~8k in one year** — his directly owned north-star metric for this mandate. Checkout optimization, the cashback loop, and the lending product all fed into this number together; each feature file states its own specific, attributable outcome rather than re-claiming the full MTU figure.

Over the same period, the business's overall **GMV grew 5x, from $15M to $80M** — a company-wide outcome that sales and other teams also drove alongside this product work. He states MTU as the metric he owned and GMV as business context his work contributed to, not one he claims sole credit for.

## How the business was run, and who he worked with

**The business was heavily sales-team driven**, especially earlier in his tenure. That shaped the role substantially: his closest stakeholders were the **sales team** and the **business finance team**, both of which were deeply involved in the features he built rather than being downstream recipients of them.

**He was the PM for any sales-team requirement at nurture.farm** — a single named point of ownership for that entire relationship, not a rotating or shared assignment.

How that relationship actually ran:
- **Sales was involved directly in discovery** — in understanding the problems, and in setting up customer interviews with retailers.
- **He sat inside the sales groups** where queries were shared regularly, seeing raw problems as they surfaced rather than receiving them filtered into tickets.
- **A standing monthly meeting** to discuss and prioritize sales-driven product development.

**Why this matters for the feature work:** both the lending product and the cashback loop trace back to the same discovery work — **retailer interviews and on-ground visits**, run before either feature was designed, that surfaced two concrete frictions: retailers relied on offline sellers for credit (→ lending, `lending.md`), and price was retailers' primary purchase driver (→ cashback, `cashback-builder.md`). Read against this context, that discovery wasn't a one-off research exercise — it's what a PM already embedded in the sales org, seeing raw retailer problems firsthand, would naturally run. The self-serve design of the cashback designer portal (built for the **internal sales team**, not external marketplace sellers, to configure and run their own campaigns) is the same instinct expressed in the architecture: give the sales org a tool, rather than becoming their ticket queue.

See `../../../05-methodology.md`, "How he works with people," for how this pattern compares to his stakeholder work at Ola and TopHire.

## Still not documented

Exact team size, engineering headcount, and reporting line at nurture.farm are **not confirmed from any source** — unlike TopHire, where those specifics are documented in `../tophire/company-context.md`. Nothing here is invented to fill that gap.

## Sources

Resume; direct conversation with Prashant.
