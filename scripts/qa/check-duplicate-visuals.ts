// Regression check: for each product essay's three lens compositions, flags
// any two blocks in the same `order` array that share a `visual` key
// (excluding `kind: "incident"` blocks, which are deliberately grouped into
// one IncidentLedger by design). BlockRenderer already de-duplicates this at
// render time - a signature visual only renders once per page regardless -
// but a flag here still means the content pool has an authoring redundancy
// worth cleaning up. Run standalone with
// `bun run scripts/qa/check-duplicate-visuals.ts`, or `bun run qa:check` to
// run both QA scripts together. Re-run after any edit to
// content/product-essays.md.
import { projects } from "../../src/content/projects";

let found = 0;
for (const project of projects) {
  if (!project.essay) continue;
  for (const lens of ["recruiter", "operator", "engineer"] as const) {
    const artifact = project.essay.artifact[lens];
    const seen = new Map<string, string>();
    for (const id of artifact.order) {
      const block = project.essay.blocks.find((b) => b.id === id);
      if (!block || !block.visual || block.kind === "incident") continue;
      if (seen.has(block.visual)) {
        console.log(
          `DUP: ${project.slug} / ${lens}: visual "${block.visual}" used by both ${seen.get(block.visual)} and ${id}`,
        );
        found++;
      } else {
        seen.set(block.visual, id);
      }
    }
  }
}
console.log(found === 0 ? "No duplicate visuals found." : `${found} duplicate(s) found.`);
