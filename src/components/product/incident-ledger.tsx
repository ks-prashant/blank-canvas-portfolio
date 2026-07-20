import { Prose } from "../../components/prose";
import type { ContentBlock } from "../../content/types";

/**
 * `IncidentLedger` (C6, BUILD-SPEC §6/§9.3) — Grounded Governance's five
 * incidents as ruled ledger rows: what happened / how caught / fix /
 * verification, real `<table>` markup (§9.5: "readable linearly," not
 * styled divs). No red except where a cost is genuinely stated (none of
 * these five carry a stated cost figure, so none render in `--red` — the
 * design system's convention, applied honestly rather than for drama).
 *
 * DATA GAP, flagged for the report: `ContentBlock` (§7.2) carries a single
 * prose `body` per incident, not four discrete fields. Rather than
 * fabricate detail the compiled content pool doesn't contain, each
 * incident's four cells below are hand-split from that exact `body`
 * string (verified against `src/content/projects.ts`, gg-16..gg-20) —
 * no new facts, only re-structuring of already-sourced prose. Where the
 * source genuinely doesn't separate a sub-field (e.g. gg-17's fix isn't
 * narrated separately from "found by the eval"), the cell says so rather
 * than inventing a fix. A future content-pipeline revision could add a
 * structured `IncidentDetail` type so this split lives in `projects.ts`
 * instead of a component-level map — see this step's report.
 */

interface IncidentRow {
  what: string;
  caught: string;
  fix: string;
  verified: string;
}

// Two cells (gg-17's fix, gg-19's verification) genuinely aren't narrated as
// a separate step anywhere in the source material — rather than fabricate
// one, this says so plainly, in the same visitor-facing register as the rest
// of the table, not as an internal build-pipeline note.
const NOT_NARRATED = "Not narrated as a separate step in the build record.";

const INCIDENT_SPLITS: Record<string, IncidentRow> = {
  "gg-16": {
    what: '"RLS disabled" did not mean server-only on this hosting platform — its default grants meant the public anon key could read and write every table, bypassing the app.',
    caught: "The platform's automated scan.",
    fix: "RLS turned on, zero policies, service-role bypasses added.",
    verified: "Re-attempted the exploit rather than trusting the setting.",
  },
  "gg-17": {
    what: "`websearch_to_tsquery` was silently AND-ing every word, killing keyword retrieval for natural-language questions.",
    caught: "The retrieval eval, not a user.",
    fix: NOT_NARRATED,
    verified: "`evals/check_retrieval.mjs`, the reusable retrieval-eval script, re-run clean afterward — the same harness reruns against every later corpus expansion.",
  },
  "gg-18": {
    what: "The validation gate checked child citation-label uniqueness but not parent — a collision would have linked children to the wrong parent with zero errors raised, anywhere.",
    caught: "Tracing load logic end-to-end, before it ever fired.",
    fix: "The missing parent-uniqueness check added, plus a defense-in-depth throw if it's ever violated again.",
    verified: "Confirmed via the same trace — never reached a live occurrence.",
  },
  "gg-19": {
    what: "Three malformed-tool-call crashes in one session, three different fields.",
    caught: "Surfaced directly as crashes during the session.",
    fix: "Stopped patching individual fields; wrapped the whole parse in a bounded retry instead.",
    verified: NOT_NARRATED,
  },
  "gg-20": {
    what: "A live burst test of 10 rapid requests returned all 200s, no 429s — looked broken.",
    caught: "Root-caused to a transient schema-cache lag right after a migration, silently absorbed by the fail-open path.",
    fix: "None needed — fail-open behaved as designed.",
    verified: "Minutes later it blocked at precisely request 9 of 10, as configured, and was re-verified clean.",
  },
};

export function IncidentLedger({ incidents }: { incidents: ContentBlock[] }) {
  return (
    <div className="ledger-incident-ledger-wrap">
      <table className="ledger-incident-table">
        <caption className="sr-only">
          Grounded Governance incident log: what happened, how it was caught, the fix, and how it was
          verified
        </caption>
        <thead>
          <tr>
            <th scope="col">What happened</th>
            <th scope="col">How caught</th>
            <th scope="col">Fix</th>
            <th scope="col">Verification</th>
          </tr>
        </thead>
        <tbody>
          {incidents.map((incident) => {
            const row = INCIDENT_SPLITS[incident.id];
            if (!row) {
              // Defensive fallback for an incident id this map hasn't been
              // extended to cover yet (e.g. an Automjet incident later) —
              // render the full prose in one cell rather than silently
              // drop the row.
              return (
                <tr key={incident.id} id={`grounded-governance-${incident.id}`}>
                  <td colSpan={4}>
                    <Prose text={incident.body} />
                  </td>
                </tr>
              );
            }
            return (
              <tr key={incident.id} id={`grounded-governance-${incident.id}`}>
                <td>
                  <Prose text={row.what} />
                </td>
                <td>
                  <Prose text={row.caught} />
                </td>
                <td>
                  <Prose text={row.fix} />
                </td>
                <td>
                  <Prose text={row.verified} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
