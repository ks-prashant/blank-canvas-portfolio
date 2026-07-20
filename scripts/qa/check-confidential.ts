// Regression check: scans every confidential:true project's compiled section
// bodies (all three lenses) for text that looks like a leaked internal
// artifact - JSON-contract fragments, code fences, verbatim system-prompt
// phrasing. Run standalone with `bun run scripts/qa/check-confidential.ts`,
// or `bun run qa:check` to run both QA scripts together. Re-run this after
// any edit to content/case-pages.md or content/product-essays.md.
import { projects } from "../../src/content/projects";

// Heuristics for "this looks like a leaked internal artifact" - JSON-contract-
// looking fragments, code-fence markers, or verbatim system-prompt phrasing -
// checked against every rendered string on every confidential: true project,
// across all three lenses.
const SUSPECT_PATTERNS = [
  /```/,
  /\{\s*"[a-z_]+":/i,
  /^\s*Rule \d+:/im,
  /you are an? (assistant|agent|ai)/i,
];

let flagged = 0;
for (const project of projects) {
  if (!project.confidential) continue;
  for (const lens of ["recruiter", "operator", "engineer"] as const) {
    const sections = project.lenses[lens]?.sections ?? [];
    for (const section of sections) {
      if (section.depth === "omit") continue;
      for (const pattern of SUSPECT_PATTERNS) {
        if (pattern.test(section.body)) {
          console.log(
            `SUSPECT: ${project.slug} / ${lens} / ${section.kind}: matched ${pattern} in "${section.body.slice(0, 80)}..."`,
          );
          flagged++;
        }
      }
    }
  }
}
console.log(flagged === 0 ? "No suspect content found across all confidential projects/lenses." : `${flagged} flagged.`);
