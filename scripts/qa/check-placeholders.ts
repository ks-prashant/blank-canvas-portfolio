// Regression check: scans every visitor-facing string in the compiled
// content pool for leaked authoring artifacts — bracket placeholders
// ("[PENDING]", "[PLACEHOLDER ...]"), internal open-question ticket ids
// ("OQ8"), and internal build-pipeline vocabulary ("compiled content pool")
// that should never reach a reader. Written after a real incident: the
// Automjet product page shipped exactly this class of leak (a build-review
// caught it, not this script) — see the "Item 3" fix in project history.
// Run standalone with `bun run scripts/qa/check-placeholders.ts`, or
// `bun run qa:check` to run all QA scripts together. Re-run after any edit
// to content/*.md or scripts/build-content.ts's hand-authored data (e.g.
// the Automjet `recordings` literals).
import { projects } from "../../src/content/projects";
import type { Lens } from "../../src/content/types";

const SUSPECT_PATTERNS: { pattern: RegExp; label: string }[] = [
  { pattern: /\[PENDING\]/i, label: "bracket [PENDING] marker" },
  { pattern: /\[PLACEHOLDER/i, label: "bracket [PLACEHOLDER ...] marker" },
  { pattern: /\bOQ\d+\b/, label: "internal open-question ticket id (OQ#)" },
  { pattern: /compiled content pool/i, label: "internal build-pipeline vocabulary" },
];

const LENSES: readonly Lens[] = ["recruiter", "operator", "engineer"];

let flagged = 0;

function check(where: string, text: string | undefined) {
  if (!text) return;
  for (const { pattern, label } of SUSPECT_PATTERNS) {
    if (pattern.test(text)) {
      console.log(`LEAK: ${where}: ${label} in "${text.slice(0, 90)}..."`);
      flagged++;
    }
  }
}

for (const project of projects) {
  // Case-page / hero sections, all three lenses.
  for (const lens of LENSES) {
    const copy = project.lenses[lens];
    check(`${project.slug} / ${lens} / summary`, copy?.summary);
    for (const section of copy?.sections ?? []) {
      if (section.depth === "omit") continue;
      check(`${project.slug} / ${lens} / section:${section.kind}`, section.body);
    }
  }

  // Metrics — value, method, caveat.
  for (const m of project.metrics) {
    check(`${project.slug} / metric:${m.label} / value`, m.value);
    check(`${project.slug} / metric:${m.label} / method`, m.method);
    check(`${project.slug} / metric:${m.label} / caveat`, m.caveat);
  }

  // Product-essay content pool: canonical body + every lens's variant/receipt.
  for (const block of project.essay?.blocks ?? []) {
    check(`${project.slug} / essay block ${block.id} / body`, block.body);
    for (const lens of LENSES) {
      const t = block.treatments[lens];
      check(`${project.slug} / essay block ${block.id} / ${lens} variant`, t?.variant);
      check(`${project.slug} / essay block ${block.id} / ${lens} receipt`, t?.receipt);
    }
  }

  // Recordings — every extracted record field + the required caveat.
  for (const recording of project.recordings ?? []) {
    check(`${project.slug} / recording "${recording.label}" / caveat`, recording.caveat);
    for (const [field, value] of Object.entries(recording.record)) {
      check(`${project.slug} / recording "${recording.label}" / record.${field}`, value);
    }
    for (const annotation of recording.annotations ?? []) {
      check(`${project.slug} / recording "${recording.label}" / annotation note`, annotation.note);
    }
  }

  // "What was cut" block, where present.
  if (project.didntShip) {
    check(`${project.slug} / didntShip / what`, project.didntShip.what);
    check(`${project.slug} / didntShip / why`, project.didntShip.why);
  }
}

console.log(
  flagged === 0
    ? "No leaked placeholders/internal vocabulary found across the compiled content pool."
    : `${flagged} leak(s) found.`,
);

if (flagged > 0) {
  process.exit(1);
}
