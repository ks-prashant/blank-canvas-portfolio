import { Prose } from "../../components/prose";
import type { Metric, Recording } from "../../content/types";

/**
 * Automjet-only visuals (BUILD-SPEC §9.2/§9.4). Same convention as
 * `block-visuals.tsx`: static, semantic-HTML-only (no canvas/SVG diagram
 * library, §9.4's hard rule), hand-derived from the already-sourced knowledge
 * book text cited inline, not new facts.
 *
 * - `StateGraph` (C5) — the nine conversation nodes, four global nodes, and
 *   ten ending nodes from `retell-build-guide-v5.md` Part 4-7/Appendix A,
 *   plus the edges that were deliberately never wired (the one-way ladder).
 * - `AnnotatedTranscript` (C4) — a single call's masked-record view, with
 *   margin marks from `Recording.annotations` when present.
 * - `PairedRecordings` (C3) — the two calls side by side, equal weight, with
 *   the funnel distribution beside (not under) the pair.
 */

/* ------------------------------- StateGraph ------------------------------ */

interface FlowNode {
  id: string;
  label: string;
  edges: { to: string; condition: string }[];
}

// Source: retell-build-guide-v5.md Part 4 (Steps 4.1-4.9) + Part 7's
// one-way-ladder confirmation checklist + Appendix A's flow sketch.
const CONVERSATION_NODES: FlowNode[] = [
  {
    id: "N1",
    label: "Greeting & Identity",
    edges: [
      { to: "N2", condition: "confirms they're the right person" },
      { to: "END · Wrong Number", condition: "wrong number / not this person" },
      { to: "END · Callback (Warm)", condition: "right person unavailable" },
    ],
  },
  {
    id: "N2",
    label: "Reason & Permission",
    edges: [
      { to: "N3", condition: "willing to talk now" },
      { to: "END · Callback (Warm)", condition: "busy / call later" },
      { to: "N8", condition: "not interested, not hostile" },
    ],
  },
  {
    id: "N3",
    label: "Discovery (lite)",
    edges: [
      { to: "N4", condition: "a model can be suggested or affirmed" },
      { to: "N5", condition: "has a model, wants to skip straight to it" },
      { to: "N8", condition: "clearly no buying intent" },
    ],
  },
  {
    id: "N4",
    label: "Suggest / Affirm Model",
    edges: [
      { to: "N5", condition: "model suggested or affirmed, they're listening" },
      { to: "N9", condition: "raises a concern or objection" },
    ],
  },
  {
    id: "N5",
    label: "Invite Test Ride — PRIMARY ASK",
    edges: [
      { to: "N6", condition: "agrees to a test ride" },
      { to: "N7", condition: "declines, not hostile" },
      { to: "N9", condition: "raises an objection (a question, not a flat no)" },
    ],
  },
  {
    id: "N6",
    label: "Capture Visit",
    edges: [{ to: "END · Test Ride Booked", condition: "visit day/time captured" }],
  },
  {
    id: "N7",
    label: "Offer Team Connect — FALLBACK ASK",
    edges: [
      { to: "END · Meeting Scheduled", condition: "agrees, gives a callback time" },
      { to: "N8", condition: "declines the team connect" },
    ],
  },
  {
    id: "N8",
    label: "Nurture & Classify",
    edges: [
      { to: "END · Warm Lead", condition: "genuine interest or a real timeline" },
      { to: "END · Cold Lead", condition: "no real buying intent" },
    ],
  },
  {
    id: "N9",
    label: "Objection Handling",
    edges: [
      { to: "N5", condition: "handled, rung was test_ride — re-offer once" },
      { to: "N7", condition: "handled, rung was sales_connect — re-offer once" },
      { to: "N8", condition: "declined again after handling — step down" },
    ],
  },
];

const GLOBAL_NODES: { id: string; label: string; trigger: string; to: string }[] = [
  { id: "GK", label: "Factual Question", trigger: "price, specs, finance, range, charging, warranty", to: "returns to the node the caller was on" },
  { id: "GD", label: "Do-Not-Call / Stop", trigger: "\"stop calling\", \"remove me\", clear hostility", to: "END · DNC" },
  { id: "GL", label: "Language Switch", trigger: "asks for Hindi, replies only in Hindi, can't continue in English", to: "END · Language Callback" },
  { id: "GH", label: "Human / Out-of-scope", trigger: "service, spares, live negotiation, \"let me talk to a person\"", to: "END · Human Callback" },
];

// Ten ending nodes, Part 5's table — call_status is read off which one the
// call actually reached, never inferred from sentiment (automjet-11/gg-parallel
// "outcome read, not inferred" argument).
const ENDING_NODES: string[] = [
  "Test Ride Booked",
  "Meeting Scheduled",
  "Warm Lead",
  "Callback (Warm)",
  "Cold Lead",
  "Language Callback",
  "Human Callback",
  "Wrong Number",
  "DNC",
  "Voicemail",
];

// The back-edges that were never wired — Part 7's "loop-proof by structure"
// checklist, walked in reverse. These are not decorative: the missing edges
// are the actual argument (automjet-07/automjet-14).
const REMOVED_EDGES: { from: string; to: string; reason: string }[] = [
  {
    from: "N7",
    to: "N5",
    reason: "no node re-offers a declined test ride once N7 has been reached",
  },
  {
    from: "N8",
    to: "N7",
    reason: "no node re-offers a declined team connect once N8 has been reached",
  },
  {
    from: "N8",
    to: "N5",
    reason: "the ladder only steps down (N5 → N7 → N8 → close), never back up",
  },
  {
    from: "N9",
    to: "N9",
    reason: "a second decline after the one re-offer routes down — the objection node cannot re-enter itself for the same ask",
  },
];

export function StateGraph() {
  return (
    <div className="ledger-state-graph-wrap">
      <ol className="ledger-state-graph">
        {CONVERSATION_NODES.map((node) => (
          <li className="ledger-state-graph-node" key={node.id} id={`automjet-node-${node.id}`}>
            <p className="ledger-state-graph-node-head">
              <span className="ledger-state-graph-node-id">{node.id}</span>
              <span className="ledger-state-graph-node-label">{node.label}</span>
            </p>
            <ul className="ledger-state-graph-edges">
              {node.edges.map((edge) => (
                <li key={edge.to}>
                  <span aria-hidden className="ledger-state-graph-arrow">
                    →
                  </span>{" "}
                  <span className="ledger-state-graph-edge-to">{edge.to}</span>
                  <span className="ledger-state-graph-edge-condition"> — {edge.condition}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <div className="ledger-state-graph-side">
        <div className="ledger-state-graph-globals">
          <h4 className="ledger-state-graph-side-heading">Global nodes — reachable from anywhere</h4>
          <ul>
            {GLOBAL_NODES.map((g) => (
              <li key={g.id}>
                <span className="ledger-state-graph-node-id">{g.id}</span> {g.label}
                <span className="ledger-state-graph-edge-condition"> — {g.trigger} → {g.to}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ledger-state-graph-endings">
          <h4 className="ledger-state-graph-side-heading">Ending nodes (10)</h4>
          <ul className="ledger-state-graph-ending-list">
            {ENDING_NODES.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="ledger-state-graph-removed">
        <p className="ledger-state-graph-removed-label">REMOVED BY DESIGN</p>
        <ul>
          {REMOVED_EDGES.map((edge) => (
            <li key={`${edge.from}-${edge.to}`} className="ledger-state-graph-removed-edge">
              <s>
                {edge.from} → {edge.to}
              </s>
              <span className="ledger-state-graph-removed-reason"> — {edge.reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* --------------------------- AnnotatedTranscript -------------------------- */

const RECORD_FIELD_LABELS: Record<string, string> = {
  call_status: "Call status",
  model_of_interest: "Model of interest",
  purchase_timeline: "Purchase timeline",
  key_notes_for_followup: "Notes for follow-up",
};

/**
 * `AnnotatedTranscript` (C4). Per §9.4: named `<audio>` if `Recording.src`
 * exists, the full transcript always adjacent, margin marks per turn from
 * `Recording.annotations`, no color-only meaning.
 *
 * DATA GAP, flagged for the report: the compiled content pool's two
 * recordings (`src/content/projects.ts`) carry neither `src` (absent on
 * purpose, gated on OQ8 consent) nor `annotations` (the array is entirely
 * unset for both calls, not merely empty) nor turn-by-turn transcript text —
 * only the four extracted `record` fields, one of which
 * (`key_notes_for_followup`) is itself an authored `[PENDING]` placeholder.
 * No transcript dialogue or per-turn node annotations were ever authored in
 * Step 3's content pass. Rather than invent either, this renders the real
 * masked-record fields plus an explicit, honest note that the annotated
 * margin marks await real transcript text — not a silent omission.
 */
export function AnnotatedTranscript({ recording }: { recording: Recording }) {
  const hasAudio = Boolean(recording.src);
  const hasAnnotations = Boolean(recording.annotations && recording.annotations.length > 0);

  return (
    <div className="ledger-annotated-transcript">
      <p className="ledger-annotated-transcript-label">{recording.label}</p>

      {hasAudio ? (
        <audio controls src={recording.src} aria-label={`Recording: ${recording.label}`}>
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p className="ledger-annotated-transcript-fallback">
          No audio ships without confirmed consent (OQ8 — pending). Shown instead: the masked
          post-call record below, in the source docs' own masking convention
          (<code className="ledger-inline-code">+9193***7036</code>).
        </p>
      )}

      <dl className="ledger-record-fields">
        {Object.entries(recording.record).map(([key, value]) => (
          <div className="ledger-record-field" key={key}>
            <dt>{RECORD_FIELD_LABELS[key] ?? key}</dt>
            <dd>
              <Prose text={value} />
            </dd>
          </div>
        ))}
      </dl>

      {hasAnnotations ? (
        <ol className="ledger-annotated-transcript-marks">
          {recording.annotations!.map((mark, i) => (
            <li key={i}>
              <span className="ledger-annotated-transcript-turn">Turn {mark.turn}</span>
              <span className="ledger-annotated-transcript-node">{mark.node}</span>
              {mark.note ? <span className="ledger-annotated-transcript-note"> — {mark.note}</span> : null}
            </li>
          ))}
        </ol>
      ) : (
        <p className="ledger-annotated-transcript-gap">
          No turn-by-turn transcript or per-node margin marks have been authored for this call yet
          — real annotations are pending the same consent gate as the audio (OQ8), not omitted.
        </p>
      )}

      <p className="ledger-annotated-transcript-caveat">
        <Prose text={recording.caveat} />
      </p>
    </div>
  );
}

/* ----------------------------- PairedRecordings ---------------------------- */

const FUNNEL_LABELS = [
  "Connect rate",
  "Full-conversation completion",
  "Terminal-node conversion (test ride / meeting / warm lead)",
  "Classified cold",
];

/**
 * `PairedRecordings` (C3). Two calls, equal visual weight, each with its
 * `AnnotatedTranscript` (record fields + masked-transcript-fallback framing)
 * beneath it; the funnel distribution renders beside the pair (§9.6.1), not
 * under it, and each recording's required `caveat` always renders alongside
 * its own card (see `AnnotatedTranscript` above) — never silently omitted.
 */
export function PairedRecordings({
  recordings,
  metrics,
}: {
  recordings: Recording[];
  metrics: Metric[];
}) {
  if (recordings.length === 0) {
    return (
      <p className="ledger-annotated-transcript-gap">
        No paired recordings are available in the compiled content pool.
      </p>
    );
  }

  const funnel = FUNNEL_LABELS.map((label) => metrics.find((m) => m.label === label)).filter(
    (m): m is Metric => Boolean(m),
  );

  return (
    <div className="ledger-paired-recordings">
      <div className="ledger-paired-recordings-pair">
        {recordings.map((recording) => (
          <AnnotatedTranscript recording={recording} key={recording.label} />
        ))}
      </div>
      {funnel.length > 0 ? (
        <aside className="ledger-paired-recordings-funnel" aria-label="Live production funnel">
          <p className="ledger-paired-recordings-funnel-label">Live funnel</p>
          <ul>
            {funnel.map((m) => (
              <li key={m.label}>
                <span className="ledger-paired-recordings-funnel-value tabular">{m.value}</span>
                <span className="ledger-paired-recordings-funnel-metric-label">{m.label}</span>
                {m.caveat ? (
                  <span className="ledger-paired-recordings-funnel-caveat">
                    <Prose text={m.caveat} />
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </div>
  );
}
