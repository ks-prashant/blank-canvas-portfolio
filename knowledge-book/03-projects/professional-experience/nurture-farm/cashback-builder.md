# Cashback & Points Builder — nurture.farm

**Identity:** Built at nurture.farm, an MSME marketplace app under UPL. Owned end to end by Prashant Singh, Product Manager (promoted from APM during this tenure). 05/2021–11/2022.

**Status:** Shipped, scaled, and still actively run as a recurring program — the sales team runs offers on roughly **half the days of the month (~15 days/month)**, not a one-off launch.

---

## 1. Problem — found through discovery, not assumed

Discovery ran through **retailer interviews and on-ground visits**, not desk research (the same discovery effort that separately surfaced the finding behind the in-app lending product — see `lending.md`). For cashback specifically, discovery surfaced that **retailers' primary purchase-deciding factor was price.** Retailers would buy wherever the effective price was lowest, and the app had no mechanism to compete on that dimension beyond the sticker price — no way to make the app cheaper than the alternative without just discounting margin away on every order.

## 2. Approach

Built a loop, not just a discount: retailers earn **points** on an order, and are incentivized to place their **next order to redeem those points before they expire** — creating a reason to come back rather than a one-time price cut.

Three things were built to make this work:

1. **A cashback designer portal for the internal sales team** — a self-serve tool letting sales configure and launch cashback campaigns and rules themselves, without needing engineering or product involvement per campaign. (This is the internal sales team, not external marketplace sellers — sales owns and runs the ongoing cadence of offers.)
2. **A points-based payment mode on the app** — points became a real, usable payment method at checkout, not just a balance shown on a dashboard.
3. **The points-crediting infrastructure** — points are credited **only once the product is delivered**, not at order placement. This ties the incentive to a completed, real transaction rather than an order that could still be cancelled or fail delivery — a deliberate trust and integrity choice in how the loop is triggered.

**Ongoing cadence:** once live, the sales team runs cashback offers on **about 15 days a month** — this is a recurring operating rhythm sales owns and runs through the self-serve portal, not a single campaign that shipped once.

## 3. Outcome

- **Month-1 retention rose from ~28% to ~40%** for retailers exposed to the cashback loop — a real, specific before/after figure. (This supersedes an earlier, rougher self-estimated range that had been recorded for this metric; 28%→40% is the number to use.)
- **$1M+ in points-based transactions per month** at scale.
- **Widely used feature** — not a niche program; it's a core, recurring part of how the sales team drives repeat purchase behavior, active roughly half of every month.
- Contributed to **Average Order Value growth**, directionally — giving retailers a reason to place larger qualifying orders to hit point thresholds. Not precisely isolated from other AOV drivers.

## 4. Why this matters as a product story

Cashback isn't a generic loyalty-points bolt-on — it's a direct response to a specific discovery finding, "price is the primary deciding factor," engineered as a repeat-purchase loop rather than a one-time discount, with delivery-gated crediting to protect the integrity of the loop, and handed to sales as a self-serve tool so the cadence (half the month, every month) could scale without product needing to run every campaign.

## 5. One-line pitch

Built a cashback and points loop for an MSME marketplace — a self-serve campaign portal for sales, a points-based payment mode, and delivery-gated points crediting — lifting Month-1 retention from ~28% to ~40% and scaling to $1M+ in points-based transactions per month, run roughly half the days of every month.

## 6. Sources

Resume; direct conversation with Prashant.
