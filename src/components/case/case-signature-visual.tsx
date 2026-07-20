import { UnlensedMark } from "../lens/unlensed-mark";
import type { Project } from "../../content/types";

/**
 * `CaseSignatureVisual` (BUILD-SPEC §8.5's shared page frame, third
 * element) — "the project's one signature diagram... visible to all
 * three lenses, unchanged — it's the argument, not the framing." Rendered
 * once per case page, above the lens-composed sections, and never
 * swapped when the lens changes — that constancy is itself the point,
 * which is why it always carries `UnlensedMark` (§8.6's "blocks that
 * refuse to personalize").
 *
 * No canvas/diagram library (§9.4, generalized site-wide) — semantic
 * HTML/CSS only. Each shape below is hand-derived directly from that
 * project's own already-compiled, already-vetted `lenses[*].sections`
 * prose in `projects.ts` (never re-derived from `knowledge-book/`,
 * per §7.3) — the same "no structured field exists yet, so the rows are
 * pulled from already-sourced body text" approach `block-visuals.tsx`
 * documents for the two product-essay pages.
 */
export function CaseSignatureVisual({ project }: { project: Project }) {
  if (!project.signatureVisual) return null;

  return (
    <figure className="ledger-case-signature">
      <div className="ledger-case-signature-body">
        <VisualFor slug={project.slug} />
      </div>
      <figcaption className="ledger-case-signature-caption">
        {project.signatureVisual}
        <UnlensedMark />
      </figcaption>
    </figure>
  );
}

function VisualFor({ slug }: { slug: string }) {
  switch (slug) {
    case "voice-screening":
      return <GoNoGoMatrix />;
    case "resume-shortlisting":
      return <DeclineRecoveryLine />;
    case "drip-campaign":
      return <TimelineAndFixLadder />;
    case "lending":
      return <KycBeforeAfter />;
    case "cashback-builder":
      return <EarnOnDeliveryLoop />;
    case "pii-waterfall":
      return <CostWaterfall />;
    default:
      return null;
  }
}

/** voice-screening — the three segments actually tested, and the two
 * decisions made about them (source: this project's `didntShip` field
 * plus the operator/engineer `didntShip` section bodies in projects.ts). */
function GoNoGoMatrix() {
  const rows = [
    { segment: "Tech junior/mid", verdict: "go" as const, note: "~60% completion — matches the human baseline" },
    { segment: "Non-tech", verdict: "no-go" as const, note: "worked, but the per-call budget didn't justify it — a cost call" },
    { segment: "Senior roles", verdict: "no-go" as const, note: "low 40s% completion, vs a ~60% human bar" },
  ];
  return (
    <table className="ledger-gonogo-matrix">
      <caption className="sr-only">Role-level go/no-go, by segment</caption>
      <thead>
        <tr>
          <th scope="col">Segment</th>
          <th scope="col">Shipped?</th>
          <th scope="col">Why</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.segment} className={row.verdict === "go" ? "is-go" : "is-nogo"}>
            <td>{row.segment}</td>
            <td className="ledger-gonogo-verdict">{row.verdict === "go" ? "Shipped" : "Not shipped"}</td>
            <td>{row.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** resume-shortlisting — 45% (two years prior) -> 35% (the slide that
 * triggered the project) -> 42% (the A/B result), per the recruiter/
 * operator `problem` and `metrics` section bodies. */
function DeclineRecoveryLine() {
  const points = [
    { label: "2 years prior", value: "~45%" },
    { label: "Before the fix", value: "35%" },
    { label: "After the fix (A/B)", value: "42%" },
  ];
  return (
    <div className="ledger-decline-line">
      {points.map((point, i) => (
        <div className={`ledger-decline-point${i === 1 ? " is-low" : ""}`} key={point.label}>
          <span className="ledger-decline-value tabular">{point.value}</span>
          <span className="ledger-decline-label">{point.label}</span>
        </div>
      ))}
    </div>
  );
}

/** drip-campaign — V1 -> V2, then the three fixes in the order they
 * mattered, per the `fixOrder` section bodies. */
function TimelineAndFixLadder() {
  const timeline = [
    { label: "V1", detail: "automation + job-level templates" },
    { label: "V2", detail: "AI-personalized content, layered on top" },
  ];
  const fixes = [
    "Clean the input data",
    "Optimize the prompt against real observed failures",
    "Add a review-pass that validates output before a recruiter sees it",
  ];
  return (
    <div className="ledger-timeline-ladder">
      <ol className="ledger-mini-timeline">
        {timeline.map((step) => (
          <li key={step.label}>
            <span className="ledger-mini-timeline-label">{step.label}</span>
            <span className="ledger-mini-timeline-detail">{step.detail}</span>
          </li>
        ))}
      </ol>
      <ol className="ledger-fix-ladder">
        {fixes.map((fix, i) => (
          <li className={i === fixes.length - 1 ? "is-highest-impact" : undefined} key={fix}>
            <span className="ledger-fix-rank tabular">{i + 1}</span>
            <span className="ledger-fix-body">{fix}</span>
            {i === fixes.length - 1 ? <span className="ledger-fix-tag">mattered most</span> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

/** lending — the embedded-KYC redesign, per the `fixOrder` section
 * bodies (multi-portal/document-upload flow vs. pre-filled + in-app). */
function KycBeforeAfter() {
  return (
    <div className="ledger-kyc-before-after">
      <div className="ledger-kyc-col">
        <p className="ledger-kyc-col-label">Before</p>
        <ul>
          <li>Multiple separate third-party portal logins</li>
          <li>Document uploads and a location share, repeated</li>
          <li>Entirely outside the app the retailer was already using</li>
        </ul>
      </div>
      <div className="ledger-kyc-arrow" aria-hidden>
        →
      </div>
      <div className="ledger-kyc-col is-after">
        <p className="ledger-kyc-col-label">After</p>
        <ul>
          <li>Pre-filled from KYC data the retailer had already given the app</li>
          <li>Remaining steps collected inside nurture.farm's own UI</li>
          <li>Scaled to 6,000+ retailers on in-app credit</li>
        </ul>
      </div>
    </div>
  );
}

/** cashback-builder — the loop mechanism, per the `decision`/`approach`
 * section bodies (delivery-gated crediting, redeemable next order). */
function EarnOnDeliveryLoop() {
  const steps = ["Order placed", "Delivered → points credited", "Points redeemable next order"];
  return (
    <ol className="ledger-loop-diagram">
      {steps.map((step, i) => (
        <li key={step}>
          <span className="ledger-loop-step-num tabular">{i + 1}</span>
          <span className="ledger-loop-step-body">{step}</span>
        </li>
      ))}
      <li className="ledger-loop-wrap" aria-hidden>
        <span className="ledger-loop-wrap-arrow">↻ back to order</span>
      </li>
    </ol>
  );
}

/** pii-waterfall — the cost-ascending fallback chain, repeated per
 * segment, per the `approach`/`decision` section bodies. */
function CostWaterfall() {
  const segments = ["India — tech", "India — non-tech", "US"];
  const tiers = ["Cheapest provider(s) tried first", "Next tier — only on a miss", "Most expensive — last resort"];
  return (
    <div className="ledger-cost-waterfall">
      {segments.map((segment) => (
        <div className="ledger-waterfall-col" key={segment}>
          <p className="ledger-waterfall-col-label">{segment}</p>
          <ol>
            {tiers.map((tier, i) => (
              <li key={tier} style={{ marginLeft: `${i * 10}px` }}>
                {tier}
              </li>
            ))}
          </ol>
        </div>
      ))}
      <p className="ledger-waterfall-note">
        Each segment enables a different subset of the 7-8 providers and required fields — some configurations skip
        the phone/WhatsApp lookup entirely when only an email is needed.
      </p>
    </div>
  );
}
