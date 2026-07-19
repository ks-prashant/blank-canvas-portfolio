# Tech Support Chatbot — TopHire

**Identity:** Built at TopHire (internal). Owned end to end by Prashant Singh, Product Manager.

**Status:** Live. Handles ~40% of incoming support queries. Internal build — no public demo or code to share.

---

## 1. Problem

TopHire's core product is internal, so its tech-support queries are internal too — and as the company hired, they grew. Queries arrived from everywhere: emails, Slack channels, personal DMs. Prashant owned all of them, which meant constant triage: what's a real bug to route to devs, what needs analysis, and what's just a doubt someone needs cleared up. The triage itself — not the fixing — was the time sink, and it scaled with headcount.

## 2. Approach

The insight was that queries split cleanly into two buckets: things that need a human (bugs, analysis) and simple doubts that just need an answer. Built to **answer the second bucket and route the first.**

- **Meet queries where they arrive.** Integrated Slack and Gmail so the bot sees questions in the channels and inboxes they actually come through, not a separate portal nobody would visit.
- **Ground it in real knowledge.** Built a knowledge base from documentation, kept expanding it toward exhaustive coverage; collected real question-and-answer pairs and used them to **fine-tune the model** on how these questions actually get answered here — not generic support tone.
- **Answer or tag.** The chatbot either answers the doubt directly, or auto-tags the right person — Prashant or a dev — for anything that needs a human.

## 3. Challenges

The judgment call was knowing what it can safely answer versus what to escalate. The two failure modes pull against each other: answer a real bug as if it were a doubt and you've hidden a problem; escalate every doubt and you've rebuilt the bottleneck the tool was meant to remove. Grounding answers in a curated, growing knowledge base — and fine-tuning on real Q&A rather than off-the-shelf data — is what made the "answer vs. tag" decision reliable enough to sit in the live flow and be trusted with it.

## 4. Stack

Slack API + Gmail API for ingestion where queries actually arrive; a fine-tuned model trained on real Q&A pairs; a documentation knowledge base grown toward exhaustive coverage.

## 5. Outcome

- **Handles ~40% of incoming queries end to end** — answering routine doubts or correctly routing the rest — removing that triage load from Prashant and giving employees faster answers.

## 6. One-line pitch

Built an internal support chatbot across Slack and email — fine-tuned on real Q&A and grounded in a docs knowledge base — that answers routine doubts and auto-routes the rest, handling ~40% of incoming queries.

## 7. Sources

Direct conversation with Prashant.
