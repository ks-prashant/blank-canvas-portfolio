# Lens Copy — all three views, every block

**Status:** draft by the builder. **Prashant reviews and rewrites every block below.**
**Source of truth:** `knowledge-book/`. Nothing here should contain a fact absent from it.
**Structure:** 9 blocks × 3 lenses = 27. Edit in place. The pipeline reads this file and emits `src/content/lenses.ts`.
**Revised 2026-07-19:** Blocks 00, 01 and 02 rewritten for the replaced products (Automjet → Retell v5; DocuFlow → **Grounded Governance**), and the lens rules upgraded per `BUILD-SPEC.md` §8.6 — each lens now makes a **different argument**, not the same argument in a different register.

---

## The three lenses — the rules each block must obey

| | **Recruiter** | **Founder / PM** (default) | **Engineer** |
|---|---|---|---|
| **Their real question** | Is this person real, senior enough, right for my JD? | Can I trust their judgment? Do I want them in the room? | Do they understand the system, or are they a PowerPoint PM? |
| **What they're afraid of** | Forwarding an inflated profile | Someone who builds beautifully and ships nothing; who can't say no | Claimed rigor with no artifact behind it |
| **Currency of proof** | **Evidence strength** — the credibility of a number, not its size | **Decisions where something was given up** — a costless choice is a preference | **Specificity + admitted limits** — one correct non-obvious detail beats three paragraphs |
| **The argument each block makes** | *"This is real, and every claim is tagged with how it was measured."* | *"Here's the decision, and here's what it cost."* | *"Instructions drift. Structures hold. Here's the structure."* |
| **Vocabulary ceiling** | Plain business English. Consumer AI terms ("AI agent", "LLM") fine. No product or systems jargon — explain inline if unavoidable. **Exception:** recruiting terms (shortlisting rate, time-to-hire, screening) are their native language — use them freely on the TopHire projects. | Business + product fluent. "Eval", "A/B test", "north star", "guardrail", "discovery" all bare. Deep tech gets one explanatory clause. | Fully technical, no hand-holding. "Hybrid retrieval", "entailment check", "transition condition" bare. |
| **Foreground** | Outcome, scale, ownership, duration | **The decisions.** The bet, the constraint, what got cut, how you knew | Architecture, failure modes, why this design over the obvious one |
| **Background** | Mechanism — named, not explained | Implementation detail | Business context — **one line only** |
| **Length** | Shortest, scannable | Medium | Medium-long, dense |

**Rules for every block:**
- Every number carries its method and its caveat. A caveat travels with its number, always.
- Never claim a team or company outcome as personal. (nurture.farm GMV 5x = company-wide. MTU 4k→8k = his.)
- No TopHire production prompt text, schemas, or internal artifacts. Technique described, never quoted.
- No em-dashes. Banned words: perfect, seamless, revolutionary, cutting-edge, leveraged, robust, powerful.
- If a lens has nothing real to say, **it says so** and points elsewhere. See `cashback-builder → Engineer`.
- **Never state a fact listed as unconfirmed** in a canonical knowledge-book file's closing table. Currently binding: the Retell build's construction timeline and months-live (the old "built in about a week / live 7-8 months" story belonged to the **retired** build), and any usage figure for Grounded Governance (it has no users yet).

---

# BLOCK 00 — HERO

**Headline (constant across all three lenses, per `BUILD-SPEC.md` §17.3):**
> **I build systems that stay honest under pressure. Two are in production. You're reading the third.**

Only the sub-copy below changes.

### 00 · Unlensed *(the default before a lens is chosen — the honest "unknown source" read)*
> **AI Product Manager and Builder.** Nine years across fintech, HR tech, marketplaces, mobility and regulated banking. Most recently I owned the full AI product suite at a recruitment platform. Outside of any job, I've built two AI products solo and they're both running right now: a voice agent taking real sales calls for a dealership, and a governance research assistant that refuses to answer what its sources don't cover.
>
> *I don't know why you're here yet, so this is the plain version. One question below and the rest of the site will read the way you need it to.*

### 00 · Recruiter
> Nine years across five industries: fintech, recruitment, marketplaces, ride-hailing and banking. At my last role I owned the entire AI product suite for a recruitment platform serving 150+ recruiters and 2,500+ client companies. Recruiters got through 140% more work, and hiring got roughly 25% faster.
>
> I've also built and shipped two AI products entirely on my own, outside of any job. Both are live right now.
>
> Every number on this site is tagged with how it was measured, including the ones that fell short of what I was aiming for. Those are marked too.

### 00 · Founder / PM  *(default once chosen)*
> Nine years across fintech, HR tech, marketplaces, mobility and regulated banking. At TopHire I owned the whole B2B suite reporting to the CEO: four AI products, sequenced by where recruiter time was actually going rather than by a roadmap written upfront. By the end I was the solo PM on the product, with 3-4 engineers.
>
> I also build the systems myself. Two live production AI products, shipped solo, outside any employer.
>
> What follows is nine years of decisions with the costs kept on the books. The judgment is the claim. The builds are the receipt.

### 00 · Engineer
> **AI Product Manager who writes the backend.**
>
> Two live production systems, built solo. An outbound voice agent on Retell handling ~500 calls a month for a real dealership, made loop-proof by structure rather than by instruction: the commitment ladder has no upward transition, so a declined ask cannot be re-offered. And a governance research assistant over five regulatory frameworks, where a post-generation entailment check drops any claim its cited source doesn't support, so the model is never trusted to vouch for its own grounding.
>
> Same move both times. When an instruction can drift, replace it with a structure that can't. This site is the third one.

---

# BLOCK 01 — AUTOMJET SALES AGENT
*Tier 1 · personal · not confidential · full build-essay page (§9.2)*
*Rewritten 2026-07-19 for the Retell v5 build. The retired build's "17 checkpoints" and "built in about a week" claims are gone: the first describes an architecture that no longer exists, the second is unconfirmed for the current system.*

### 01 · Recruiter
> A friend runs an Ather electric-scooter dealership in Thane. Leads would fill in the website form and nobody called them back fast enough, so they went cold.
>
> I built an AI phone agent that calls every lead, has a real conversation about what they need, and books test rides. It handles about 500 calls a month. Roughly 7 in 10 people pick up, and about 2 in 10 end up booking a test ride, booking a meeting, or becoming a warm lead. The rest are sorted into warm or cold so nobody wastes a call on them later.
>
> You can hear two real calls on this page. One books a test ride. One doesn't. I put both up on purpose.

### 01 · Founder / PM
> A real dealership with a real leak: web leads went cold because follow-up depended on whichever salesperson picked it up that day.
>
> The bet was that the fallback ladder *is* the product. Every call has to end in an asset: a booked test ride, else a meeting with the sales team, else an honestly classified lead. A call that ends in "cold, and here's why" is a win, not a failure, because the next run doesn't waste money on it.
>
> Four decisions carried it. Treat "no" as four different signals, not one, because a busy no is a callback and a declined ask is a decision. Branch the opening line on where the lead actually came from, because a first sentence that assumes a relationship you don't have breaks trust and compliance in the same breath. Hand off to a human for Hindi rather than fake it. And put the regulatory checks upstream of the conversation entirely, as a gate before anything dials.
>
> ~500 calls/month. ~70% connect, ~40% complete the full conversation, ~20% convert.

### 01 · Engineer
> Retell conversation flow: nine nodes, four globals, ten ending nodes. The interesting part is what isn't in the graph.
>
> **The ladder is one-way.** Test ride, then team connect, then classify. There is no transition back up, so a declined ask cannot be re-offered by any node, ever. Not because the prompt says not to, but because the edge doesn't exist. The objection node returns to the current rung exactly once; a second decline routes down. Earlier versions kept re-pitching through a clear no even with a prompt that explicitly forbade it, which is the whole lesson: an instruction is a suggestion a model drifts from under pressure, a missing transition is not.
>
> **The transition condition is the real instruction.** Discovery used to say "don't interrogate" in the prompt while gating advancement on five filled fields. It interrogated. The fix was the gate, not the wording: advance as soon as one recommendation is possible, one question per turn, everything else captured only if volunteered.
>
> **Outcome is read, not inferred.** `call_status` comes from which ending node the conversation actually reached, never from sentiment analysis over the transcript. Naturalness is six coordinated levers with real settings, not a voice choice: 0.92-0.95 speed, 0.7-0.9 interruption sensitivity so a "no" cuts the agent off instantly, semantic endpointing, sub-800ms to first word. Premium models only on the nodes where judgment lives; fast models everywhere else.

---

# BLOCK 02 — GROUNDED GOVERNANCE
*Tier 1 · personal · not confidential · full build-essay page (§9.3)*
*New 2026-07-19. Replaces the retired DocuFlow block entirely.*
*⚠️ Eval numbers below are the first-run figures and certify an interim configuration. Never write "groundedness is proven."*

### 02 · Recruiter
> If you build an AI feature that scores loan applicants or ranks job candidates, someone eventually tells you to "make sure it's compliant" and hands you several hundred pages of regulation. Grounded Governance reads your description of what you're building and gives you back the obligations that actually apply to it, each one pointing at the exact paragraph it came from.
>
> The part I care about is what it does when it doesn't know. Ask it something the source documents don't cover and it says so, rather than producing a confident answer that sounds right. There's a page inside the product showing its own test scores, including the run where it missed the bar I'd set.
>
> It's live. You can use it.

### 02 · Founder / PM
> A grounded document assistant over PDFs is a commodity in 2026, and I wrote that down as a product risk before building rather than discovering it afterwards. So the answer had to be structural: the output is a prioritized *map* of obligations rather than a chat box, and the product's own evaluation scores are a page inside it, not a claim in a README.
>
> One user, chosen on purpose: the PM or engineer told to make a feature compliant. Not lawyers, not auditors, not compliance analysts. Designing for all of them would have produced something tuned for none of them.
>
> Every risk became a requirement instead of a disclaimer. Liability means it never issues a verdict and never resolves a conflict between two frameworks, it shows both sides cited and lets you decide. Staleness means every claim carries the version and snapshot date it came from. Scope creep means the out-of-scope list is binding, written so that adding anything requires an explicit decision.
>
> The sequencing was the real bet: prove groundedness on one framework before touching the other four or building a single polished screen. If that gate had failed, I'd have spent the least possible effort finding out.
>
> The first full evaluation run **failed** — 93.3% groundedness against a 95% bar, 83.3% correct-refusal against 90%. Six root causes found and fixed. The comprehensive re-run is deliberately held for launch, to measure the finished product once rather than a moving one twice.

### 02 · Engineer
> Five frameworks (GDPR, EU AI Act, NIST AI RMF, CSF 2.0, SSDF) parsed deterministically into their native hierarchies: 630 parents, 1,573 child chunks, one immutable snapshot, promoted only on a clean validation gate. Retrieval runs over the small child chunks; generation receives the parent article for context. Hybrid dense plus keyword, fused with RRF, reranked, then expanded to parents. A system description fans out across all five governance dimensions by design, so cross-framework coverage isn't luck.
>
> **The fence is the point.** After generation, an entailment pass checks every claim against the specific sources it cites. Anything unsupported is dropped or flagged, never rendered as a confident citation. The model is not trusted to vouch for its own grounding, and citation chips are built from chunk metadata rather than parsed out of model text, so a hallucinated citation label has no path to the screen.
>
> Things that went wrong, all published on the page: RLS "disabled" didn't mean server-only on this platform, so the public anon key could read and write every table. Caught by an automated scan, fixed, then verified by re-attempting the exploit rather than trusting the setting. Keyword search was silently AND-ing every word, killing the keyword arm for natural-language questions. The validation gate checked child citation-label uniqueness but not parent, which would have linked children to the wrong parent with zero errors raised. And a rate limiter that looked broken under a burst test turned out to be a schema-cache lag being absorbed by the fail-open path, which is what fail-open is for.
>
> Latency was measured rather than assumed: understanding plus retrieval alone takes 4.2-5.3s, essentially the whole first-tier budget before generation starts, so streaming moved into the backend phase instead of being bolted on as UI polish later.

---

# BLOCK 03 — VOICE AI SCREENING AGENT
*Tier 2 · TopHire · confidential (technique only) · compact page*

### 03 · Recruiter
> Recruiters were spending 2-3 hours a day on screening calls: the same qualifying questions every time, typing the answers into a form.
>
> I built an AI agent that makes those calls instead. It completes the screen about 60% of the time on junior and mid-level tech roles, which is the same rate our human callers were hitting, and saves roughly 2 hours a day per recruiter. Recruiters choose per job whether to use it, rather than it being forced on every screen.
>
> For senior roles I tested it and didn't ship it. Completion dropped into the 40s, well below what a person achieves, because those conversations need more nuance than the agent could handle. Those stayed with humans.

### 03 · Founder / PM
> Screening became the next bottleneck once outreach was already automated. Recruiters were losing 2-3 hours a day to it.
>
> Four voice vendors evaluated, shipped on Retell. The approval gate was real generated call recordings played for leadership, not a deck. Cost was judged against a stated bar: ₹30/candidate was only worth it if it freed 3-4 hrs/day of recruiter bandwidth. It delivered ~2. I report that gap rather than round it up to the target.
>
> The decision I'd point at: I tested four segments and shipped two. Senior roles hit completion in the 40s against a ~60% human baseline, so they stayed human. Non-tech worked fine, but the per-call budget for those roles didn't justify it, so it wasn't a quality call, it was a cost one.
>
> The bar was human parity. Where it wasn't met, we didn't ship.

### 03 · Engineer
> Retell AI places the call and runs a structured question set with conditional branching, skipping advanced questions when stated experience is below threshold.
>
> Claude runs over the transcript to extract structured answers and auto-submit the screening form, with per-field confidence scoring. Low-confidence extractions route to human review rather than silently submitting a guess.
>
> Explicit candidate consent captured before recording. Integrates with the internal CRM to update the candidate profile and hand the recruiter a summary.
>
> Voice-only, no chat fallback. No LangGraph, no multi-agent orchestration: it didn't need either. ~60% call-completion on tech junior/mid. ~₹9/min, ~3 min average, ~₹30/candidate.

---

# BLOCK 04 — LLM RESUME SHORTLISTING
*Tier 2 · TopHire · confidential (technique only) · compact page*

### 04 · Recruiter
> Our shortlisting rate, the share of candidates we sent to a client that the client actually shortlisted, had slid from about 45% to 35% over two years. Talking to recruiters surfaced two causes: judging candidate-role fit consistently is genuinely hard across a team, and volume per role was climbing.
>
> I built a tool that reads a resume against the job and rates it Strong, Medium or Low, with a written reason attached, so a recruiter can sanity-check the call rather than just trust a label.
>
> In a controlled test on 5 live jobs and about 400 candidates, shortlisting went from 35% to 42%. Over 80% of recruiters use it.

### 04 · Founder / PM
> Shortlisting rate had slid 45%→35% over two years. Root-caused with recruiters to two things: skill variance in judging fit, and rising volume per role.
>
> The bet: an LLM's judgment is more consistent than a distribution of recruiters, provided the output is inspectable. That's why it emits a written justification rather than a bare score. A label with no reasoning is easy to distrust and easy to ignore, and a resume-scorer that's confidently wrong is worse than none at all: people try it once, get burned, and never come back.
>
> Selected by experiment, not preference. Bake-off across GPT, Claude and DeepSeek, plus input formats and prompt designs. Claude won. A/B tested on 5 jobs / ~400 candidates before platform rollout: 35%→42%.
>
> Guardrail: 1st-interview % tracked specifically so a shortlisting win couldn't be hiding a quality regression. 80%+ adoption.

### 04 · Engineer
> Resume text plus job requirements go directly into a classification prompt. No retrieval step, deliberately: RAG is the natural-seeming fit here and it isn't needed, because the job criteria are small and known at call time. Retrieval would add latency and a failure mode for nothing.
>
> Output is Strong/Medium/Low, a written justification, and a self-assessed confidence score. High-confidence classifications auto-accept and skip manual review.
>
> The prompt is role-level aware. "Strong" for a junior role is not "strong" for a senior one, so a single rubric across all roles would be wrong by construction.
>
> Model chosen by bake-off: GPT vs Claude vs DeepSeek across multiple input formats and prompt designs. Claude shipped. Validated by A/B on 5 jobs / ~400 candidates: 35%→42%.

---

# BLOCK 05 — AI DRIP CAMPAIGN TOOL
*Tier 2 · TopHire · confidential (technique only) · compact page*
> ⚠ **Review note:** the Engineer block describes prompt technique. It quotes nothing. Prashant to confirm the line is where he wants it.

### 05 · Recruiter
> Recruiters were living between two tools: copy the candidate's details out of the CRM, switch to Gmail, write the email, come back, check for replies, update the CRM by hand. And when writing is a chore done at volume, it gets templated, and templated outreach gets ignored. Positive reply rate was sitting around 20%.
>
> I built a tool that writes a genuinely personalized email per candidate, sends the follow-ups on a schedule automatically, and sorts incoming replies by intent so you aren't reading and filing every one by hand.
>
> Positive replies went up about 30%. It saves roughly 8 hours a week per recruiter, and over 90% of recruiters use it. It's simply how outreach gets written there now.

### 05 · Founder / PM
> Two options were on the table: let recruiters build their own templates and automate just the sending, or use AI to write the emails outright. Rather than choosing, I shipped both, in sequence.
>
> V1 was automation and a single pane of glass: follow-up sequences, Gmail inside the CRM, AI reply classification. Content was still job-level templates. The win was the automation, not personalization. V2 moved content to job + candidate level, once V1's automation was proven and people were already using it daily.
>
> The hard part was quality: hallucination and guideline drift. Three fixes, in impact order. Clean the input data first. Then optimize the prompt against real observed failures rather than hypothetical ones. Then add a review layer that validates the output before a recruiter ever sees it. The review layer mattered most, and it's what earned the trust behind 90%+ adoption.
>
> North star: positive reply rate. Guardrails: bounce rate and complaint rate. ~20% baseline → ~+30%.

### 05 · Engineer
> A third-party LinkedIn scraper API pulls candidate data, combined with recruiter-fed job and company context. Claude Sonnet writes per-candidate.
>
> Output is a strict JSON contract: two subject-line options, three email bodies, each with its word count. The prompt is an API contract, not a creative-writing instruction.
>
> Hard constraints are enforced in-prompt: a locked opening line, no sender sign-off, independent word caps per email in the sequence, seniority-tiered emphasis, and the current date injected as a variable so the model never guesses the year when computing years-of-experience.
>
> A second review-pass prompt validates output against the guidelines before any human sees it. That second pass is what moved this from "mostly good with the occasional embarrassing miss" to consistently send-ready.
>
> Automation logic built directly, not on n8n. Offline eval used LLM-as-judge; online was an A/B tied to reply-rate tracking.

---

# BLOCK 06 — IN-APP LENDING (NBFC-PARTNERED)
*Tier 2 · nurture.farm · confidential (technique only) · compact page*

### 06 · Recruiter
> Small retailers on our marketplace were buying from offline sellers instead of us, because those sellers gave them credit. We had no equivalent, so we were competing for a purchase we couldn't finance.
>
> I partnered with a lending company to offer credit inside our app. They decided who qualified and for how much. I owned everything the retailer actually touched.
>
> The first version failed. Their standard sign-up made retailers log into several separate portals and upload documents we already had, and almost nobody finished it. I redesigned it so most of the information came from data we already held, and the rest was collected inside our own app.
>
> That fix is why it scaled to 6,000+ retailers. Retailers using credit went on to buy 32% more often.

### 06 · Founder / PM
> Discovery through retailer interviews and on-ground visits surfaced the real thing: retailers relied on offline sellers for credit, and that was a major reason they weren't purchasing through the app at all. We were competing for a purchase decision without offering a financing mechanism they already depended on elsewhere.
>
> The decision: partner with an NBFC rather than become a lender. They owned underwriting and risk. I owned the product surface around their decision.
>
> Then the diagnosis that actually mattered. Their default KYC flow required multiple third-party portal logins, document uploads and a photo, all disconnected from the app the retailer was already in. Conversion was low as a direct result. I redesigned it to pre-fill from data we already held and pass it to them via API, keeping the remaining steps in our own UI. That fix is the mechanism behind the scale, not a side improvement to it.
>
> 6,000+ retailers. 32% MTU lift in the credit cohort. ~6% overdue, which we weren't optimizing for at the time: the priority was scaling adoption of something retailers genuinely needed.

### 06 · Engineer
> NBFC-partnered, so underwriting sits outside our system entirely. Credit decisions and limits (₹30k to ₹10L) come from them.
>
> The integration work: embedded KYC that pre-fills from data already in our backend and passes it to the NBFC over API, with their SDKs embedded in-app for the steps that required them, rather than redirecting out to third-party portals. Payment integration for credit-based purchases. Collection APIs wired to their system, with proactive reminder comms up to the due date; past due, enforcement hands over to the NBFC entirely.
>
> The failure mode being fixed was conversion drop-off from a multi-portal, multi-upload onboarding flow. The fix was recognizing that most of the data it demanded was already sitting in our own backend from the marketplace KYC the retailer had already completed.

---

# BLOCK 07 — CASHBACK & POINTS BUILDER
*Tier 2 · nurture.farm · confidential (technique only) · compact page*
> ⚠ **Review note:** the Engineer lens is deliberately thin and says so. This is the `uncovered` honesty move. Prashant to confirm he's comfortable with it.

### 07 · Recruiter
> Retailers on our marketplace decided where to buy almost entirely on price, and we had no way to compete on that without simply cutting our margin on every single order.
>
> So instead of a discount, I built a loop. Retailers earn points on an order, and those points are worth real money on their next one, so there's a reason to come back rather than a one-time price cut.
>
> I also built a tool that lets the sales team design and launch these offers themselves, without needing engineers for each one. They now run offers about 15 days a month.
>
> Month-1 retention went from about 28% to 40%, and points-based orders passed $1M a month.

### 07 · Founder / PM
> Discovery said price was retailers' primary purchase-deciding factor, and we had no mechanism to compete on it without discounting margin away on every order.
>
> So: a loop, not a discount. Points earned on an order, redeemable against the next one before they expire. A reason to return rather than a one-time cut.
>
> Two decisions I'd point at. First, points credit only on delivery, not at order placement. That ties the incentive to a completed transaction rather than one that could still cancel or fail, which protects the integrity of the whole loop. Second, I built the campaign designer for the sales team to run themselves rather than becoming their ticket queue. They run offers ~15 days a month now, with no product involvement per campaign.
>
> M1 retention 28%→40%. $1M+/month in points-based orders.

### 07 · Engineer
> Honestly, this is a business-mechanism story more than a systems one, and I'd rather say that than pad it.
>
> The engineering that mattered: points as a real payment method at checkout rather than a balance displayed on a dashboard, and delivery-gated crediting, where the points ledger only credits against a confirmed delivery event rather than an order-placed event, so a cancelled or failed order can't mint points. The rest is a rules engine so the sales team can configure campaigns without us.
>
> If you want the systems depth, Automjet and Grounded Governance are the better read.

---

# BLOCK 08 — MULTI-VENDOR PII WATERFALL
*Tier 2 · TopHire · confidential (technique only) · compact page*

### 08 · Recruiter
> To reach candidates, our recruiters needed contact details, which we bought from a set of data providers. We were using 7-8 of them and calling them carelessly: paying for the same lookup twice, or paying for a phone number when we only needed an email.
>
> I redesigned how and when each provider gets called. Cheapest first, expensive ones only if the cheap ones come back empty, and different setups depending on whether it's an India tech role, an India non-tech role, or a US role, because what you actually need differs a lot between them.
>
> It saved $100,000 a year.

### 08 · Founder / PM
> Contact-enrichment spend was leaking across 7-8 vendor APIs: duplicate lookups, and fetching data that wasn't needed for a given candidate or role.
>
> The insight was that the right question wasn't "which vendor" but "which vendor, in what order, for which segment." So rather than picking a winner and calling it uniformly, all 7-8 stay active in a cost-and-need-sequenced waterfall, segmented by geography and role type: India tech, India non-tech, US. Each segment has its own config. Some enable only the cheaper tools at all. Some fetch email only rather than email and phone.
>
> This sits alongside two straightforward bake-offs (WhatsApp → Gupshup, cloud calling → MyOperator). $100k/year saved.
>
> It's a cost-engineering story at the workflow-design level, not a procurement one.

### 08 · Engineer
> A sequenced fallback chain across 7-8 PII enrichment APIs (SalesQL, EasyLeadz, ContactOut and PeakAI among them) rather than a fan-out.
>
> Ordering is cost-ascending: cheap providers fire first, expensive ones only on a miss. Orthogonal to that, the required-fields config varies by segment, so where only an email is needed the phone/WhatsApp lookup never fires at all.
>
> Three segment configs: India-tech, India-non-tech, US. Each with its own enabled-provider set and field requirements.
>
> The waste being eliminated was duplicate lookups and unnecessary field fetches across a candidate base where the real information need varies significantly by geography and role type. $100k/year.

---

## Translation reference — how numbers change per lens

Kept here so the rule stays consistent as you edit.

Same figure, different **true facts** about it. Never different figures.

| Fact | Recruiter | Founder / PM | Engineer |
|---|---|---|---|
| GG groundedness 93.3% | "there's a page in the product showing its own test scores, including the run that missed my bar" | "first full run failed: 93.3% against a 95% bar, 83.3% correct-refusal against 90%. Six root causes fixed; comprehensive re-run held for launch" | "93.3% groundedness / 93.8% citation accuracy / 83.3% correct-refusal, 24-item GDPR subset, interim Sonnet config, judge-graded" |
| MTU 4k→8k | "twice as many retailers buying every month" | "MTU 4k→8k, my north star for that mandate" | "MTU 4k→8k" |
| Shortlisting 35%→42% | "shortlisting went from 35% to 42% in a test on 5 jobs and ~400 candidates" | "35%→42%, A/B on 5 jobs / ~400 candidates, with 1st-interview % as the guardrail so the win couldn't hide a regression" | "35%→42%, A/B, n≈400 across 5 jobs. The only instrumented A/B in the set" |
| Automjet ~20% convert | "about 2 in 10 end up booking a test ride, a meeting, or becoming a warm lead" | "~20% convert to test ride, meeting or warm lead; the other ~20% classify cold, which is also an outcome" | "~20% terminal-node conversion; ~70% connect, ~40% full completion" |
| Reply rate | "positive replies went up about 30%" | "~20% baseline → ~+30% positive reply rate; guardrails were bounce and complaint rate" | "~+30% off a ~20% baseline" |

---

## Blocks NOT lensed — single voice for everyone

Deliberate, and **said out loud on the page** (`UnlensedMark`, C23) rather than left as a silent gap. A personalization system that declares where it declines to personalize is demonstrating a principle; one that personalizes everything is demonstrating a toggle.

On the evidence blocks the marker reads:
> *This block doesn't change by lens. The evidence is the evidence.*

- The journey / career timeline
- The eight principles
- **The scorecard / numbers table, with its evidence tags** — the strongest case for the marker
- **The documented "no"** (voice screening, senior roles)
- The questions (FAQ)
- Contact
- Tier 3 projects (one-liners, no page, no CTA)

---

## Open for Prashant

1. **Block 05 · Engineer** — describes drip-campaign prompt technique (locked opening line, no sign-off, word caps, seniority tiers, date injection). Quotes nothing. Is that the right side of the line?
2. **Block 07 · Engineer** — deliberately thin, says so, points to the two personal builds instead. Keep or cut? (Reference updated from DocuFlow.)
3. **Hero · Engineer** — opens "AI Product Manager who writes the backend." Confident. Too much?
4. **Recruiter voice generally** — pitched at *plain but not condescending*. Check that it doesn't read as talking down.
5. **NEW — the hero thesis line.** *"I build systems that stay honest under pressure. Two are in production. You're reading the third."* This is the ratified D9 thesis and everything hangs off it. Does it sound like you?
6. **NEW — Block 01 · Recruiter closing line.** *"One books a test ride. One doesn't. I put both up on purpose."* Deliberately blunt. Right note, or too pleased with itself?
7. **NEW — the unlensed hero (Block 00).** It admits it doesn't know who's reading yet. Honest, or does it waste the first screen?
8. **NEW — Automjet timeline.** Every "built in a week / live 7-8 months" claim is stripped pending your confirmation of what's true for the Retell build (OQ9). If a version survives, it goes back into Blocks 00 and 01.
