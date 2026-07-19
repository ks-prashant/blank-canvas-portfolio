# LLM-Based Resume Shortlisting — TopHire

**Identity:** Built at TopHire. Owned end to end by Prashant Singh, Product Manager.

**Status:** Live. 80%+ adoption across the platform. Internal build — no public demo or code to share.

---

## 1. Problem

The client shortlisting rate — the share of candidates TopHire submits that a client actually shortlists — had been sliding for two years (from roughly 45% down to roughly 35%). Talking to recruiters surfaced two root causes: a **skill gap** in judging candidate-role fit consistently across recruiters, and **rising effort** per role as volume grew. A weaker shortlist hurts everyone in the loop: the client loses confidence in submissions, the recruiter burns effort for less return, and good candidates don't get seen.

## 2. Approach

Built an LLM workflow that takes the candidate's resume text and the job requirements and classifies the resume as **Strong / Medium / Low** match — with a **written justification** for the call. The justification is the point: a bare label is easy to distrust and ignore, but reasoning a recruiter can sanity-check is something they'll actually use.

Two decisions made it work:
- **Personalized by role type.** A "strong match" for a junior role isn't a strong match for a senior one, so the prompt adapts to role level rather than applying one rubric to everything.
- **Selected by experiment, not by faith.** Evaluated **GPT, Claude, and DeepSeek**, and tested different input formats and prompt designs, to see what actually performed best — **Claude won** and was shipped. Validated with an A/B test on **5 jobs, ~400 candidates total,** before committing to a platform-wide rollout.

**Confidence scoring is shipped**, not just a roadmap item: the model assesses its own confidence in each classification, and high-confidence cases can be auto-accepted, reducing manual review load.

## 3. Challenges

The real work was making the judgment **trustworthy and consistent** — a resume-scorer that's confidently wrong is worse than none at all; recruiters try it once, get burned, and never come back. That's why the output carries a justification (so the reasoning is inspectable), why the prompt is role-aware (so "strong" means the right thing per role), and why the model/prompt/input-format choices were run as a measured experiment instead of a guess. Getting fit-judgment right *and* legible was the whole game.

**RAG is not used** for retrieving job criteria in this feature — the job requirements and resume text are passed directly into the classification prompt, with no retrieval step.

## 4. Metrics

- **A/B test (5 jobs, ~400 candidates): shortlisting rate 35% → 42%** — a ~7-percentage-point lift.
- **Guardrail metric: 1st interview %** — tracked to ensure quality didn't degrade even as shortlisting volume/rate improved.
- Scaled across the platform to **80%+ adoption.**

## 5. Roadmap

1. **Extend to candidates without resumes** — apply the same shortlisting logic to LinkedIn profile data via a third-party API already available at no extra cost, rather than requiring a parsed resume.
2. **Apply at the sourcing stage**, earlier in the funnel — filter candidates before recruiters spend time on them, rather than only at the shortlisting stage.

## 6. Interview story

Strong interview narrative: a clear, quantified problem (shortlisting rate sliding from 45% to 35% over two years), diagnostic rigor (recruiter variance vs. volume-vs-quality), a measured vendor bake-off (GPT vs. Claude vs. DeepSeek, Claude won), a real A/B result (35%→42% on 5 jobs / ~400 candidates), and a concrete near-term roadmap (LinkedIn-data extension, sourcing-stage application).

## 7. One-line pitch

Built an LLM resume-shortlisting workflow that scores candidate-job fit with a justification, personalized by role level — evaluated GPT/Claude/DeepSeek and shipped on Claude, A/B tested (35%→42% shortlisting across 5 jobs / ~400 candidates), then scaled platform-wide to 80%+ adoption with confidence-scored auto-accept live.

## 8. Sources

Direct conversation with Prashant.
