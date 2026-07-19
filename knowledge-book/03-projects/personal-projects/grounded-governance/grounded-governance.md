# Grounded Governance — an AI-governance research assistant that refuses to lie

**Identity:** Built independently by Prashant Singh, solo. **Replaces DocuFlow** as the second personal product (DocuFlow is retired and archived; do not reference it).

**Live:** https://pact-wise-guide.lovable.app (confirmed by Prashant 2026-07-19 as the live, ready URL).

**Build workflow:** Lovable (scaffold, secrets, deploy) ⇄ GitHub two-way sync ⇄ Claude Code (authored most code and commits). Stack: TanStack Start (React 19) on Cloudflare Workers; Lovable Cloud's Supabase Postgres with pgvector + full-text search; Voyage embeddings (`voyage-3-large`, 1024-dim); Anthropic models per pipeline step (Haiku for classification/validation, Opus 4.8 for generation — temporarily Sonnet 5 as an explicit, documented cost measure with a written revert condition).

**Primary sources in this folder:** `source-prd.md` (the PRD) and `source-build-plan.md` (the build plan + dated session logs). This file is the canonical summary; every site claim must be traceable here or to those two documents.

---

## 1. Problem and user

A PM or engineer shipping an AI feature — scoring loan applicants, ranking candidates, summarizing customer records — gets told "make sure it's compliant" and handed hundreds of pages spread across privacy law, AI regulation, AI-risk practice, cybersecurity, and secure-development guidance that don't cross-reference each other. Generic search can't reason across them; general assistants produce plausible, subtly wrong answers. **In a domain where the user may act on the answer, a wrong answer is worse than no answer.**

**One user, chosen on purpose.** The PRD designs for exactly this person and explicitly defers compliance analysts, auditors, and lawyers: *"designing for all of them at once would produce a product tuned for none of them."*

**The job:** *translate a description of the system I'm building into a prioritized, cited list of the governance obligations that apply to it — quickly, and without receiving a confident answer that is subtly wrong.* A mapping-and-triage job, not document search.

## 2. The product

The user describes their system in plain language; the product returns an **Obligation Map** — not a chat answer:

- **Three priority tiers:** Applies — act on these / Likely relevant — review / Possibly relevant.
- Every card: a plain-language obligation, a **"why this applies to *your* system"** rationale referencing the user's own described attributes, one or more citations, and an **applicability label** — Direct / Inferred / Possible. Labels, never false-precision percentages.
- **One clarifying question, never a form:** if a critical attribute is missing and would change the obligations, the product asks exactly one targeted question and pauses. It never silently invents missing attributes.
- **Restated understanding:** the result opens with what the product understood the system to be, with an inline "Not quite? Refine" — the user can correct a misread before trusting the output.
- **Source viewer:** every citation opens the exact source paragraph, highlighted in surrounding context, with full hierarchy path (framework → chapter → article → paragraph), framework version, snapshot date, and a link to the official source.
- **Honesty states as first-class UI, not error states:** refusal cards for out-of-corpus questions (no fabricated answer, ever); an honest empty state ("nothing in the current corpus clearly applies"); a low-confidence banner; **conflicts shown as paired cards under "These frameworks pull in different directions," fully cited, with no resolution asserted**; a persistent "Corpus as of [date]" indicator; "Decision support, not legal advice" at the point of every answer, not just a footer.
- **An in-product evaluation page** showing the product's own measured quality — each metric with target, latest value, run date, and plain-language method — including an honest "no published run yet" state when that is the truth (which it currently is).

**Non-goals, binding:** no legal verdicts ("you are compliant") — ever; no accounts, saved sessions, or export in MVP; no frameworks beyond the five. The PRD names the out-of-scope list explicitly *"so that adding them requires an explicit decision."*

## 3. Risk → requirement (the PRD's signature move)

Every product risk is converted into a hard requirement, not a disclaimer:

| Risk | Requirement |
|---|---|
| User acts on a wrong answer (liability) | Never a verdict; decision-support framing at the point of answer; conflicts surfaced, not resolved; out-of-corpus refused |
| Frameworks change (staleness) | Every retrieved unit carries version + snapshot date; corpus refresh is a *data operation*, not a redeploy |
| Grounded RAG over PDFs is a commodity ("so what") | The eval report is a first-class in-product page; refusal is visible and intentional; the hero output is a *map*, not chat |
| Solo build sprawls and never ships (scope) | The out-of-scope list is binding; phase gates govern additions |
| Subtly wrong cross-framework synthesis | Restated understanding; one clarifying question; every claim cited; post-generation citation validation; applicability labels; adversarial eval set |

## 4. The corpus

Five complementary frameworks, one per governance dimension — GDPR (privacy), EU AI Act (AI regulation), NIST AI RMF (AI risk), NIST CSF 2.0 (cybersecurity), NIST SSDF (secure development). Intentionally narrow: depth on a small, well-modeled corpus beats breadth.

- Each framework parsed **deterministically to its native hierarchy** into committed, reviewable JSON (no embeddings in the artifact). Totals: **630 parents / 1,573 child chunks** in one combined snapshot. GDPR: 99/99 articles + 173/173 recitals. EU AI Act: 113/113 articles, 180/180 recitals, 13 annexes (`Annex III(5)(b)` resolves). CSF: 22 categories / 106 subcategories. SSDF: 19 practices / 42 tasks — its flattened 3-column PDF tables are filed by **id prefix, never position**. AI RMF: the 7 trustworthiness characteristics + 72 core subcategories.
- **Parent–child chunking:** retrieval operates over small child chunks (paragraph/point); generation receives the surrounding parent (article) for context.
- **Snapshots are immutable** and promoted only on a clean validation gate; every answer records its `snapshot_id`. Recitals are included deliberately — retrieval itself surfaced GDPR **Recital 71** (the *reasoning* behind Art. 22's automated-decision rule) above the operative article, which upgraded "include recitals" from nice-to-have to a real quality lever.

## 5. The pipeline, and the fence

`understand` (Haiku, structured output: input type, sufficiency, subqueries — a system description fans out across all **five dimensions** by design, so cross-framework coverage isn't luck) → **hybrid retrieval** (pgvector dense + Postgres FTS keyword, fused with RRF, plus citation-pinning for named units like "Article 22") → **rerank** → parent expansion → **generation** (structured output; grounding fence: `supporting_chunk_ids` must come from the supplied set) → **Step B, the citation-validation fence:** a post-generation entailment check verifying each claim is actually supported by the parents it cites — **unsupported claims are dropped or flagged, never shown as confident cited statements. The model is never trusted to ground itself.** → assembly (citation chips built from chunk *metadata*, never from model text; tiers computed from applicability + impact + retrieval confidence) → SSE streaming, first tier first.

**Two design facts worth quoting:**
- **Latency was measured, not assumed:** query understanding + retrieval alone measured **4.2–5.3s** against the deployed system — essentially the whole 5s first-tier budget before generation starts. Streaming was pulled *into the backend phase* as a requirement rather than bolted on later as UI polish.
- **A real API constraint, designed around:** forced tool-use (the structured-output mechanism) is incompatible with extended thinking — the combination had to be explicitly resolved per pipeline step, not assumed.

## 6. Evaluation — a core deliverable, honestly reported

**The golden set:** 64 questions with human-verified expectations, deliberately weighted toward hard cases — cross-framework synthesis, out-of-corpus (should refuse), adversarial (designed to bait a confident unsupported answer), direct lookup as baseline. Targets: **groundedness ≥95% · citation accuracy ≥90% · correct-refusal ≥90%**. The harness runs against the *deployed* product and can publish results to the in-product eval page (secret-gated write, so the "honest numbers" page can't be spoofed).

**What has actually been measured — state exactly this, nothing stronger:**
- **Retrieval: proven.** 7/7 on the GDPR gate slice; the retrieval eval itself found and fixed two real bugs (see §7).
- **The first full generation eval run FAILED:** groundedness 93.3% (target 95) ✗ · correct-refusal 83.3% (target 90) ✗ · citation accuracy 93.8% ✓. Six gaps were root-caused, fixed, and individually re-verified live against every previously-failing item; no known open item-level issue remains.
- **The comprehensive re-run is deliberately deferred** to one measurement of the finished product before launch (with the generation model reverted from the temporary Sonnet 5 to Opus 4.8 first). This is a written, standing sequencing decision — "measure the finished product once rather than twice" — not an omission. Interim first-run numbers are quotable **only** with the caveat that they certify the interim config.
- **The build plan's own instruction, verbatim (quote this on the site):** *"Don't repeat 'groundedness is proven' to a stakeholder yet — say 'the foundation it depends on is proven.'"*

**The Article 99 story (the pitch in one example):** asked what GDPR Article 99 says about AI training data — a real article that's actually about entry into force — the system retrieves the actual text and says what it really says, and that it isn't what was asked, rather than dodging or fabricating. Verified live. (Bonus nuance it caught: the EU AI Act has its own, different Article 99.)

## 7. The incident log (all real, all documented in the session logs)

1. **The RLS find (security, critical).** "RLS disabled" did not mean server-only on this hosting platform — its default grants meant the public, non-secret anon key could **read and write every table**, bypassing the app. Caught by the platform's automated scan, **verified empirically by attempting the access, fixed the same day** (RLS on with zero policies; service-role bypasses), then **verified again by re-attempting the exploit** — trusting the test, not the setting. No real users existed yet; that's why the check happens *before* launch.
2. **The dead keyword arm.** `websearch_to_tsquery` silently AND-ed every word, killing keyword retrieval for natural-language questions. Found by the retrieval eval, not by a user.
3. **The silent wrong-parent risk.** The validation gate checked child citation-label uniqueness but not *parent* — a collision would have linked children to the wrong parent with zero error, anywhere. Found by tracing load logic end-to-end before it ever fired; fixed with the missing check plus a defense-in-depth throw.
4. **Fix the class, not the field.** Three malformed-tool-call crashes in one session (three different fields) → stopped patching individual fields and wrapped the whole parse in a bounded retry.
5. **The rate limiter that "didn't work."** Live burst test: 10 rapid requests, all 200s, no 429. Root cause: a transient schema-cache lag right after the migration, silently absorbed by the **fail-open** path — *which is exactly what fail-open is for*. Minutes later: blocks at precisely request 9 of 10, as configured, re-verified clean.

## 8. Cost discipline

The Phase D eval was **costed from the harness's actual call structure before spending**: 24 items = 7 generations + 13 refusals + 4 clarifies, only the 7 generations expensive → estimated ~$1.6 (worst case ~$3.4) against a $5 budget, with re-runs scoped to failing IDs only. The generation model was downshifted Opus→Sonnet as an explicit temporary lever with a written revert condition. Model choice is per-step (Haiku where classification suffices), prompt-caching on the stable prefix (verified live: `cache_read_input_tokens` on the second call), and rate limiting per-session/per-IP.

## 9. Current status

Phases A–I built, deployed, and verified live (ingestion, retrieval, grounded generation + fence, hero UI, honesty states, eval page + CI workflow, follow-ups, rate limiting, WCAG AA verified computationally, prompt-injection posture, corpus-refresh dry run round-tripping all 5 frameworks with zero coverage loss). **Remaining before "launched": one item** — the comprehensive 64-item eval run with the generation model reverted to Opus 4.8, plus the manual `EVAL_WRITE_SECRET` setup that lets the harness publish to the eval page.

## 10. Facts needing confirmation before use on the site

| Fact | Status |
|---|---|
| Live URL `pact-wise-guide.lovable.app` | ✅ Confirmed 2026-07-19 ("consider it live, it is ready") |
| First-run eval numbers quotable with interim-config caveat | ✅ Sourced (build plan §0/§D); present exactly per §6 above |
| Build dates / duration ("built over N days/weeks") | ❌ UNCONFIRMED — session logs are dated 2026-07-17/18 but total build duration is not stated; don't claim one |
| Any usage/traffic numbers | ❌ NONE EXIST — the product has no real users yet; never imply otherwise |
