// scripts/build-content.ts
//
// Compiles knowledge-book/ + content/lens-copy.md + content/case-pages.md +
// content/product-essays.md into the four typed modules under src/content/.
// Deterministic markdown/text parser + compiler. No LLM call anywhere in this
// file, and none should ever be added to it (BUILD-SPEC.md §7, §12.4).
//
// Run: `bun run scripts/build-content.ts` (see package.json's "content:build").
//
// Fails loudly (throws, non-zero exit) on:
//   - any zod schema violation in the compiled output
//   - any ContentBlock missing a `source` anchor
//   - any confidential project carrying an `essay`/`recordings` payload
//   - any confidential project's lensed prose containing something that looks
//     like a verbatim internal artifact (a raw JSON-shaped blob, §7.3)

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { z } from 'zod';

const ROOT = process.cwd();
const kb = (p: string) => join(ROOT, 'knowledge-book', p);
const contentPath = (p: string) => join(ROOT, 'content', p);
const outPath = (p: string) => join(ROOT, 'src', 'content', p);

function read(path: string): string {
  if (!existsSync(path)) {
    throw new Error(`[build-content] Missing required source file: ${path}`);
  }
  return readFileSync(path, 'utf-8');
}

// ─────────────────────────────────────────────────────────────────────────
// Zod mirrors of src/content/types.ts — the build's actual validation gate.
// ─────────────────────────────────────────────────────────────────────────

const SourceLabel = z.enum(['instrumented', 'directional', 'disclosed-gap']);
const Org = z.enum(['tophire', 'nurture-farm', 'ola', 'infosys', 'prashaste', 'personal']);
const Lens = z.enum(['recruiter', 'operator', 'engineer']);
const LensDepth = z.enum(['lead', 'full', 'brief', 'omit']);
const BlockKind = z.enum(['fact', 'decision', 'mechanism', 'incident', 'metric', 'visual', 'quote']);
const CaseSectionKind = z.enum([
  'problem',
  'discovery',
  'decision',
  'approach',
  'fixOrder',
  'metrics',
  'guardrail',
  'didntShip',
  'notUsed',
  'eval',
  'roadmap',
]);
const CaseSectionDepth = z.enum(['short', 'full', 'omit']);

const MetricSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  method: z.string().min(1),
  sourceLabel: SourceLabel,
  caveat: z.string().optional(),
});

const LensTreatmentSchema = z.object({
  depth: LensDepth,
  variant: z.string().optional(),
  receipt: z.string().optional(),
});

const ContentBlockSchema = z.object({
  id: z.string().min(1),
  kind: BlockKind,
  body: z.string().min(1),
  visual: z.string().optional(),
  source: z.string().min(3, '[build-content] ContentBlock.source is required and must be a real anchor'),
  treatments: z.object({
    recruiter: LensTreatmentSchema,
    operator: LensTreatmentSchema,
    engineer: LensTreatmentSchema,
  }),
});

const ProductEssaySchema = z.object({
  slug: z.enum(['automjet', 'grounded-governance']),
  artifact: z.object({
    recruiter: z.object({ genre: z.enum(['record', 'memo', 'review']), order: z.array(z.string()) }),
    operator: z.object({ genre: z.enum(['record', 'memo', 'review']), order: z.array(z.string()) }),
    engineer: z.object({ genre: z.enum(['record', 'memo', 'review']), order: z.array(z.string()) }),
  }),
  blocks: z.array(ContentBlockSchema).min(1),
});

const RecordingSchema = z.object({
  label: z.string().min(1),
  src: z.string().optional(),
  record: z.record(z.string(), z.string()),
  annotations: z.array(z.object({ turn: z.number(), node: z.string(), note: z.string().optional() })).optional(),
  caveat: z.string().min(1, '[build-content] Recording.caveat is REQUIRED (§9.6)'),
});

const DidntShipSchema = z.object({
  what: z.string().min(1),
  why: z.string().min(1),
  number: z.string().optional(),
});

const CaseSectionSchema = z.object({
  kind: CaseSectionKind,
  depth: CaseSectionDepth,
  body: z.string(),
});

const LensCopySchema = z.object({
  lens: Lens,
  summary: z.string().min(1),
  sections: z.array(CaseSectionSchema).optional(),
});

const ProjectSchema = z
  .object({
    slug: z.string().min(1),
    name: z.string().min(1),
    org: Org,
    confidential: z.boolean(),
    status: z.string().min(1),
    metrics: z.array(MetricSchema),
    essay: ProductEssaySchema.optional(),
    recordings: z.array(RecordingSchema).optional(),
    principles: z.array(z.string()),
    didntShip: DidntShipSchema.optional(),
    liveUrl: z.string().optional(),
    sourceFile: z.string().min(1),
    depth: z.enum(['full', 'short']),
    signatureVisual: z.string().optional(),
    lenses: z.object({ recruiter: LensCopySchema, operator: LensCopySchema, engineer: LensCopySchema }),
  })
  .superRefine((project, ctx) => {
    // ⚠ The confidentiality gate (BUILD-SPEC.md §7.3). Personal projects only
    // may carry a raw build-essay pool or call recordings.
    if (project.confidential && (project.essay || project.recordings)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `[build-content] CONFIDENTIALITY VIOLATION: "${project.slug}" is confidential:true but carries an essay/recordings payload. Only automjet and grounded-governance may.`,
      });
    }
    if (!project.confidential && project.org !== 'personal') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `[build-content] "${project.slug}" is confidential:false but org is "${project.org}", not "personal". Per §7.3 only the two personal projects may be non-confidential.`,
      });
    }
  });

const PrincipleSchema = z.object({
  slug: z.string().min(1),
  num: z.number().int().positive(),
  group: z.enum(['before-i-build', 'how-i-decide', 'how-i-ship', 'what-i-trust']),
  title: z.string().min(1),
  body: z.string().min(1),
  evidence: z.array(z.object({ projectSlug: z.string().min(1), note: z.string().min(1) })).min(2),
});

// A raw-artifact guard: throws in dev if a confidential project's prose looks
// like it's carrying a verbatim internal artifact (JSON blob / prompt dump)
// rather than a technique description. Heuristic, deliberately conservative.
function assertNoLeakedArtifact(slug: string, confidential: boolean, text: string) {
  if (!confidential) return;
  const looksLikeRawJsonPromptDump = /\{\s*"[a-zA-Z_]+"\s*:/.test(text);
  const looksLikeAVerbatimSystemPromptHeader = /^(you are|system:|SYSTEM PROMPT)/im.test(text);
  if (looksLikeRawJsonPromptDump || looksLikeAVerbatimSystemPromptHeader) {
    throw new Error(
      `[build-content] CONFIDENTIALITY VIOLATION: "${slug}" (confidential) contains what looks like a raw internal artifact (JSON contract or system-prompt dump). Technique only, never verbatim (§7.3).`,
    );
  }
}

// Exported for component-layer use (§7.3 layer 2): throw in dev if any
// component tries to render a raw-artifact payload for a confidential project.
export function assertProjectCanRenderRawArtifact(project: { slug: string; confidential: boolean }) {
  if (project.confidential) {
    throw new Error(
      `[content-guard] Refusing to render a raw-artifact view for "${project.slug}": confidential === true.`,
    );
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 1. Parse content/lens-copy.md — hero + 8 project summary blocks × 3 lenses.
// ─────────────────────────────────────────────────────────────────────────

type LensKey = 'recruiter' | 'operator' | 'engineer';

const LENS_HEADER_TO_KEY: Record<string, LensKey> = {
  Recruiter: 'recruiter',
  'Founder / PM': 'operator',
  Engineer: 'engineer',
};

// Block number → project slug (00 is the hero, not a project).
const LENS_BLOCK_TO_SLUG: Record<string, string> = {
  '01': 'automjet',
  '02': 'grounded-governance',
  '03': 'voice-screening',
  '04': 'resume-shortlisting',
  '05': 'drip-campaign',
  '06': 'lending',
  '07': 'cashback-builder',
  '08': 'pii-waterfall',
};

function parseLensCopy(raw: string) {
  const summaries: Record<string, Record<LensKey, string>> = {};
  let heroCopy: Record<LensKey, string> | undefined;

  const blockRe = /^# BLOCK (\d\d)[^\n]*\n([\s\S]*?)(?=^# BLOCK \d\d|^\#\# Translation reference)/gm;
  let m: RegExpExecArray | null;
  while ((m = blockRe.exec(raw))) {
    const num = m[1];
    const body = m[2];
    const lensRe = /^### \d\d · (Unlensed|Recruiter|Founder \/ PM|Engineer)[^\n]*\n([\s\S]*?)(?=^### \d\d ·|^---|(?![\s\S]))/gm;
    const found: Partial<Record<LensKey | 'unlensed', string>> = {};
    let lm: RegExpExecArray | null;
    while ((lm = lensRe.exec(body))) {
      const label = lm[1];
      const chunk = lm[2];
      const quoteLines = chunk
        .split('\n')
        .filter((l) => l.trim().startsWith('>'))
        .map((l) => l.replace(/^>\s?/, '').trim())
        .filter(Boolean);
      const text = quoteLines.join(' ').replace(/\*[^*]+\*$/, '').trim();
      if (label === 'Unlensed') found.unlensed = text;
      else found[LENS_HEADER_TO_KEY[label]] = text;
    }
    if (num === '00') {
      if (!found.recruiter || !found.operator || !found.engineer) {
        throw new Error('[build-content] lens-copy.md BLOCK 00 (hero) is missing a lens variant.');
      }
      heroCopy = { recruiter: found.recruiter, operator: found.operator, engineer: found.engineer };
    } else {
      const slug = LENS_BLOCK_TO_SLUG[num];
      if (!slug) throw new Error(`[build-content] lens-copy.md BLOCK ${num} has no known project mapping.`);
      if (!found.recruiter || !found.operator || !found.engineer) {
        throw new Error(`[build-content] lens-copy.md BLOCK ${num} (${slug}) is missing a lens variant.`);
      }
      summaries[slug] = { recruiter: found.recruiter, operator: found.operator, engineer: found.engineer };
    }
  }

  if (!heroCopy) throw new Error('[build-content] lens-copy.md: hero block (00) not found.');
  if (Object.keys(summaries).length !== 8) {
    throw new Error(
      `[build-content] lens-copy.md: expected 8 project summary blocks (01-08), found ${Object.keys(summaries).length}.`,
    );
  }
  return { heroCopy, summaries };
}

// ─────────────────────────────────────────────────────────────────────────
// 2. Parse content/case-pages.md — six Tier-2 projects × up to 11 sections.
// ─────────────────────────────────────────────────────────────────────────

const CASE_SECTION_HEADER_TO_KIND: Record<string, z.infer<typeof CaseSectionKind>> = {
  Problem: 'problem',
  Discovery: 'discovery',
  Decision: 'decision',
  Approach: 'approach',
  'Fix-in-order': 'fixOrder',
  Metrics: 'metrics',
  Guardrail: 'guardrail',
  "Didn't ship / gaps": 'didntShip',
  'Not-used': 'notUsed',
  'Eval methodology': 'eval',
  Roadmap: 'roadmap',
};

// The §8.5 depth table, reproduced as data. Overridden per-block to 'omit'
// whenever the source markdown has no content for that lens (declared gap,
// or omission over invention per the project's own review notes).
const CASE_DEPTH_TABLE: Record<z.infer<typeof CaseSectionKind>, Record<LensKey, z.infer<typeof CaseSectionDepth>>> = {
  problem: { recruiter: 'short', operator: 'full', engineer: 'short' },
  discovery: { recruiter: 'omit', operator: 'full', engineer: 'short' },
  decision: { recruiter: 'omit', operator: 'full', engineer: 'short' }, // engineer = "technical framing" in §8.5; mapped to 'short' (present, condensed) — see build report
  approach: { recruiter: 'short', operator: 'full', engineer: 'full' },
  fixOrder: { recruiter: 'omit', operator: 'full', engineer: 'full' },
  metrics: { recruiter: 'short', operator: 'full', engineer: 'full' },
  guardrail: { recruiter: 'omit', operator: 'full', engineer: 'full' },
  didntShip: { recruiter: 'short', operator: 'full', engineer: 'full' },
  notUsed: { recruiter: 'omit', operator: 'omit', engineer: 'full' },
  eval: { recruiter: 'omit', operator: 'short', engineer: 'full' },
  roadmap: { recruiter: 'omit', operator: 'full', engineer: 'full' },
};

const HONEST_GAP_MARKERS = ['not specified in the source material', 'omitted rather than', 'omitted —'];

function parseCasePages(raw: string) {
  const projects: Record<string, Record<LensKey, z.infer<typeof CaseSectionSchema>[]>> = {};

  const projectRe = /^# PROJECT: ([\w-]+)\n([\s\S]*?)(?=^# PROJECT: |(?![\s\S]))/gm;
  let pm: RegExpExecArray | null;
  while ((pm = projectRe.exec(raw))) {
    const slug = pm[1];
    const body = pm[2];

    const sectionHeaderNames = Object.keys(CASE_SECTION_HEADER_TO_KIND)
      .map((h) => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
      .join('|');
    const sectionRe = new RegExp(`^### (${sectionHeaderNames})\\n([\\s\\S]*?)(?=^### (?:${sectionHeaderNames})|^---\\n---|^# PROJECT: |(?![\\s\\S]))`, 'gm');

    const perLens: Record<LensKey, z.infer<typeof CaseSectionSchema>[]> = { recruiter: [], operator: [], engineer: [] };

    let sm: RegExpExecArray | null;
    while ((sm = sectionRe.exec(body))) {
      const headerName = sm[1];
      const kind = CASE_SECTION_HEADER_TO_KIND[headerName];
      const sectionBody = sm[2];

      const lensBlockRe = /\*\*(Recruiter|Founder \/ PM|Engineer)\*\*\n([\s\S]*?)(?=\*\*(?:Recruiter|Founder \/ PM|Engineer)\*\*|^---|(?![\s\S]))/gm;
      const perLensBody: Partial<Record<LensKey, string>> = {};
      let lm: RegExpExecArray | null;
      while ((lm = lensBlockRe.exec(sectionBody))) {
        const key = LENS_HEADER_TO_KEY[lm[1]];
        const quoteLines = lm[2]
          .split('\n')
          .filter((l) => l.trim().startsWith('>'))
          .map((l) => l.replace(/^>\s?/, '').trim())
          .filter(Boolean);
        perLensBody[key] = quoteLines.join(' ').trim();
      }

      (['recruiter', 'operator', 'engineer'] as LensKey[]).forEach((lensKey) => {
        const tableDepth = CASE_DEPTH_TABLE[kind][lensKey];
        const bodyText = perLensBody[lensKey] ?? '';
        const isHonestGap = HONEST_GAP_MARKERS.some((marker) => bodyText.toLowerCase().includes(marker));
        const depth: z.infer<typeof CaseSectionDepth> = !bodyText || isHonestGap ? 'omit' : tableDepth === 'omit' ? 'omit' : tableDepth;
        perLens[lensKey].push({ kind, depth, body: depth === 'omit' ? '' : bodyText });
      });
    }

    projects[slug] = perLens;
  }

  return projects;
}

// ─────────────────────────────────────────────────────────────────────────
// 3. Parse content/product-essays.md — the two Tier-1 essay pools.
// ─────────────────────────────────────────────────────────────────────────

function extractBlockquote(chunk: string): string {
  return chunk
    .split('\n')
    .filter((l) => l.trim().startsWith('>'))
    .map((l) => l.replace(/^>\s?/, '').trim())
    .join(' ')
    .trim();
}

function parseProductEssays(raw: string): Record<'automjet' | 'grounded-governance', z.infer<typeof ProductEssaySchema>> {
  const productRe = /^## PRODUCT: ([\w-]+)\n([\s\S]*?)(?=^## PRODUCT: |(?![\s\S]))/gm;
  const out: Partial<Record<'automjet' | 'grounded-governance', z.infer<typeof ProductEssaySchema>>> = {};

  let pm: RegExpExecArray | null;
  while ((pm = productRe.exec(raw))) {
    const slugRaw = pm[1];
    const slug = (slugRaw === 'grounded-governance' ? 'grounded-governance' : 'automjet') as 'automjet' | 'grounded-governance';
    const body = pm[2];

    // Artifact composition table
    const artifactSectionMatch = /### Artifact composition\n([\s\S]*?)(?=^---)/m.exec(body);
    if (!artifactSectionMatch) throw new Error(`[build-content] product-essays.md: no "Artifact composition" table for ${slug}.`);
    const artifactSection = artifactSectionMatch[1];
    const artifactLineRe = /\*\*(Recruiter|Founder \/ PM|Engineer) — genre: (\w+)\*\*\nOrder: (.+)/g;
    const artifact: Partial<Record<LensKey, { genre: 'record' | 'memo' | 'review'; order: string[] }>> = {};
    let am: RegExpExecArray | null;
    while ((am = artifactLineRe.exec(artifactSection))) {
      const key = LENS_HEADER_TO_KEY[am[1]];
      artifact[key] = {
        genre: am[2] as 'record' | 'memo' | 'review',
        order: am[3].split(',').map((s) => s.trim()).filter(Boolean),
      };
    }
    if (!artifact.recruiter || !artifact.operator || !artifact.engineer) {
      throw new Error(`[build-content] product-essays.md: ${slug} is missing an artifact composition for one or more lenses.`);
    }

    // Blocks
    const blockRe = /^### BLOCK ([\w-]+) — [^\n]*\n\*kind:\s*(\w+)\s*·\s*source:\s*(.+?)\s*·\s*visual:\s*(.+?)\*\n([\s\S]*?)(?=^### BLOCK |^---\n---|(?![\s\S]))/gm;
    const blocks: z.infer<typeof ContentBlockSchema>[] = [];
    let bm: RegExpExecArray | null;
    while ((bm = blockRe.exec(body))) {
      const id = bm[1];
      const kind = bm[2] as z.infer<typeof BlockKind>;
      const source = bm[3].trim();
      const visualRaw = bm[4].trim();
      const chunk = bm[5];

      // Canonical body: blockquote lines before the first lens header.
      const firstLensIdx = chunk.search(/\*\*(Recruiter|Founder \/ PM|Engineer) — depth:/);
      const canonicalChunk = firstLensIdx === -1 ? chunk : chunk.slice(0, firstLensIdx);
      const canonicalBody = extractBlockquote(canonicalChunk);
      if (!canonicalBody) throw new Error(`[build-content] product-essays.md block ${id} has no canonical body.`);

      const lensRe = /\*\*(Recruiter|Founder \/ PM|Engineer) — depth: (\w+)\*\*\n([\s\S]*?)(?=\*\*(?:Recruiter|Founder \/ PM|Engineer) — depth:|^---|(?![\s\S]))/gm;
      const treatments: Partial<Record<LensKey, z.infer<typeof LensTreatmentSchema>>> = {};
      let lm: RegExpExecArray | null;
      while ((lm = lensRe.exec(chunk))) {
        const key = LENS_HEADER_TO_KEY[lm[1]];
        const depth = lm[2] as z.infer<typeof LensDepth>;
        const lensChunk = lm[3];
        const variantMatch = /\*\*variant:\*\*\s*(.+)/.exec(lensChunk);
        const receiptMatch = /\*Receipt:\s*(.+?)\*/.exec(lensChunk);
        treatments[key] = {
          depth,
          ...(variantMatch ? { variant: variantMatch[1].trim() } : {}),
          ...(receiptMatch ? { receipt: receiptMatch[1].trim() } : {}),
        };
      }
      if (!treatments.recruiter || !treatments.operator || !treatments.engineer) {
        throw new Error(`[build-content] product-essays.md block ${id} is missing a treatment for one or more lenses.`);
      }

      blocks.push({
        id,
        kind,
        body: canonicalBody,
        ...(visualRaw && visualRaw !== 'none' ? { visual: visualRaw } : {}),
        source,
        treatments: { recruiter: treatments.recruiter, operator: treatments.operator, engineer: treatments.engineer },
      });
    }

    if (blocks.length === 0) throw new Error(`[build-content] product-essays.md: no blocks parsed for ${slug}.`);

    // Confidentiality / leak guard on every block body, even though both
    // products are confidential:false — defensive, cheap, and catches a
    // pasted-in verbatim artifact before it ever ships.
    blocks.forEach((b) => assertNoLeakedArtifact(slug, false, b.body));

    out[slug] = {
      slug,
      artifact: { recruiter: artifact.recruiter, operator: artifact.operator, engineer: artifact.engineer },
      blocks,
    };
  }

  if (!out.automjet || !out['grounded-governance']) {
    throw new Error('[build-content] product-essays.md: expected both PRODUCT: automjet and PRODUCT: grounded-governance.');
  }
  return out as Record<'automjet' | 'grounded-governance', z.infer<typeof ProductEssaySchema>>;
}

// ─────────────────────────────────────────────────────────────────────────
// 4. Principles (from knowledge-book/05-methodology.md, §7.5's fixed roster).
//    Curated, not prose-parsed: the methodology file is written as flowing
//    argument, not a structured list, so each principle + its cross-company
//    evidence is transcribed by hand from the sourced sections below and
//    validated (zod: every principle needs ≥2 evidence entries from
//    different projects, per BUILD-SPEC.md §7.5's closing rule).
// ─────────────────────────────────────────────────────────────────────────

const PRINCIPLES: z.infer<typeof PrincipleSchema>[] = [
  {
    slug: 'chase-the-bottleneck',
    num: 1,
    group: 'before-i-build',
    title: 'Chase the bottleneck',
    body: 'Sequenced by where time was actually going next, not a fixed roadmap written upfront. At TopHire the four AI products were never one simultaneous suite; each one addressed whatever bottleneck the last fix had just exposed.',
    evidence: [
      { projectSlug: 'voice-screening', note: 'Explicitly framed as the next project because outreach was already automated and screening was now the largest time sink.' },
      { projectSlug: 'drip-campaign', note: 'Addressed the outreach bottleneck that, once cleared, made screening the next visible drain on recruiter time.' },
    ],
  },
  {
    slug: 'discovery-first',
    num: 2,
    group: 'before-i-build',
    title: 'Discovery, before building',
    body: 'Talk to the people doing the work, or the people the product is for, before building. Real interviews and on-ground visits, not desk research, surface the actual friction a feature should address.',
    evidence: [
      { projectSlug: 'lending', note: 'Retailer interviews and on-ground visits surfaced that offline sellers’ credit was the reason retailers weren’t buying through the app.' },
      { projectSlug: 'cashback-builder', note: 'The same field research separately surfaced that price was retailers’ primary purchase-deciding factor.' },
      { projectSlug: 'drip-campaign', note: 'Recruiter interviews plus a dedicated 50-candidate email-quality test, before the prompt work started.' },
    ],
  },
  {
    slug: 'vendor-choice-is-an-experiment',
    num: 3,
    group: 'how-i-decide',
    title: 'Vendor choice is an experiment',
    body: 'Every build-vs-buy or model choice ran as a measured comparison, not a default pick. Five documented bake-offs, spanning AI models and plain infrastructure vendors alike.',
    evidence: [
      { projectSlug: 'voice-screening', note: 'Four voice vendors evaluated (ElevenLabs, Bolna, Retell AI, Gnani) before shipping on Retell AI.' },
      { projectSlug: 'resume-shortlisting', note: 'GPT, Claude, and DeepSeek bake-off across input formats and prompt designs; Claude won.' },
      { projectSlug: 'pii-waterfall', note: 'WhatsApp (AiSensy/Wati/Gupshup) and cloud calling (MyOperator/Servetel/Exotel) vendor bake-offs run the same period.' },
    ],
  },
  {
    slug: 'cost-against-a-stated-bar',
    num: 4,
    group: 'how-i-decide',
    title: 'Cost against a stated bar',
    body: 'A cost figure means nothing judged in isolation. Every cost decision is measured against a specific, stated outcome bar decided in advance, and the real result is reported against that bar even when it falls short.',
    evidence: [
      { projectSlug: 'voice-screening', note: '₹30/candidate was only worth it if it freed 3-4 hrs/day of recruiter time; the measured result was ~2 hrs/day, reported as the real number.' },
      { projectSlug: 'pii-waterfall', note: 'Vendor spend re-sequenced by cost-and-need rather than picking a single cheaper vendor, saving $100k/year at the workflow-design level.' },
    ],
  },
  {
    slug: 'phased-rollout',
    num: 5,
    group: 'how-i-ship',
    title: 'Phased rollout',
    body: '1 client/recruiter, then 5, then 10, then all, with 2-3 weeks at each stage to observe and fix issues before expanding. The shape maps onto the real org structure it launches into, not an arbitrary headcount split.',
    evidence: [
      { projectSlug: 'voice-screening', note: 'Phased 1→5 rollout used to segment-test tech junior/mid/non-tech/senior before scoping down to two segments.' },
      { projectSlug: 'drip-campaign', note: 'Same 1→5→10 rollout shape for both V1 and V2, 2-3 weeks per stage.' },
    ],
  },
  {
    slug: 'north-star-plus-guardrail',
    num: 6,
    group: 'how-i-ship',
    title: 'North star plus guardrail',
    body: 'A single headline number is never the whole story. Every shipped metric is paired with an explicit guardrail, tracked specifically so a win on the primary number couldn’t hide a regression underneath it.',
    evidence: [
      { projectSlug: 'resume-shortlisting', note: '35%→42% shortlisting rate shipped with 1st-interview % tracked as the explicit guardrail.' },
      { projectSlug: 'drip-campaign', note: 'Positive reply rate as the north star; bounce rate and complaint rate as the guardrails.' },
    ],
  },
  {
    slug: 'real-demo-not-a-deck',
    num: 7,
    group: 'what-i-trust',
    title: 'A real demo, not a deck',
    body: 'A running artifact is the approval gate, not a slide deck or a script mockup. The same instinct shows up again outside any employer: both personal products are shared as live, running systems.',
    evidence: [
      { projectSlug: 'voice-screening', note: 'Leadership sign-off came from real generated call recordings played live, not a deck.' },
      { projectSlug: 'automjet', note: 'Shared as a live production system taking real calls, not a screenshot or a slide.' },
      { projectSlug: 'grounded-governance', note: 'Shared as a live, public URL with an in-product evaluation page showing its own measured quality.' },
    ],
  },
  {
    slug: 'deterministic-not-inferred',
    num: 8,
    group: 'what-i-trust',
    title: 'Deterministic, not inferred',
    body: 'Wherever a system needs to record what happened, the design reads the actual, deterministic result rather than inferring or guessing one after the fact.',
    evidence: [
      { projectSlug: 'automjet', note: '`call_status` is read directly off the ending node the conversation actually reached, never inferred from sentiment or keywords.' },
      { projectSlug: 'grounded-governance', note: 'A post-generation entailment check verifies every claim against its cited source; the model is never trusted to vouch for its own grounding.' },
      { projectSlug: 'voice-screening', note: 'Low-confidence extractions route to human review rather than guessing at an answer and shipping it silently.' },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────
// 5. Project roster (§7.4) — metrics, didn't-ship, live URLs, source files.
//    Curated per-project data grounded in the knowledge-book files already
//    read for this build; each metric traces to the project's own
//    case-pages.md "Metrics" section or its knowledge-book source file.
// ─────────────────────────────────────────────────────────────────────────

type ProjectMeta = Omit<z.infer<typeof ProjectSchema>, 'lenses' | 'essay'>;

const PROJECT_META: ProjectMeta[] = [
  // ── Tier 1 — full build-essay page (essay + recordings attached later) ──
  {
    slug: 'automjet',
    name: 'Automjet Sales Agent',
    org: 'personal',
    confidential: false,
    status: 'Live in production, Thane dealership, ~500 calls/month',
    metrics: [
      { label: 'Connect rate', value: '~70%', method: 'Live production funnel, ~500 calls/month', sourceLabel: 'instrumented' },
      { label: 'Full-conversation completion', value: '~40%', method: 'Live production funnel', sourceLabel: 'instrumented' },
      { label: 'Terminal-node conversion (test ride / meeting / warm lead)', value: '~20%', method: 'Live production funnel', sourceLabel: 'instrumented' },
      { label: 'Classified cold', value: '~20%', method: 'Live production funnel', sourceLabel: 'instrumented', caveat: 'Classification is a read outcome, not a failure — the fourth funnel state, not a disclaimer.' },
    ],
    principles: ['real-demo-not-a-deck', 'deterministic-not-inferred'],
    liveUrl: undefined,
    sourceFile: 'automjet/voice-agent.md',
    depth: 'full',
  },
  {
    slug: 'grounded-governance',
    name: 'Grounded Governance',
    org: 'personal',
    confidential: false,
    status: 'Live, pact-wise-guide.lovable.app',
    metrics: [
      { label: 'Retrieval gate (GDPR slice)', value: '7/7', method: 'Direct-lookup + adversarial retrieval eval', sourceLabel: 'instrumented' },
      { label: 'Groundedness (first full run)', value: '93.3% vs 95% target', method: '24-item GDPR gate, interim Sonnet-5 generation config', sourceLabel: 'disclosed-gap', caveat: 'Interim config, not the final comprehensive re-run; certifies the interim setup only.' },
      { label: 'Correct-refusal (first full run)', value: '83.3% vs 90% target', method: '24-item GDPR gate, interim Sonnet-5 generation config', sourceLabel: 'disclosed-gap', caveat: 'Interim config, not the final comprehensive re-run.' },
      { label: 'Citation accuracy (first full run)', value: '93.8% vs 90% target', method: '24-item GDPR gate, interim Sonnet-5 generation config', sourceLabel: 'directional', caveat: 'Passed, but still an interim-config number.' },
      { label: 'Corpus', value: '630 parents / 1,573 chunks, 5 frameworks', method: 'Deterministic parse to native hierarchy, one immutable snapshot', sourceLabel: 'instrumented' },
    ],
    principles: ['real-demo-not-a-deck', 'deterministic-not-inferred'],
    liveUrl: 'https://pact-wise-guide.lovable.app',
    sourceFile: 'grounded-governance/grounded-governance.md',
    depth: 'full',
  },

  // ── Tier 2 — full case study, lens-adaptive ──
  {
    slug: 'voice-screening',
    name: 'Voice AI Screening Agent',
    org: 'tophire',
    confidential: true,
    status: 'Live for tech junior/mid roles, opt-in per job',
    metrics: [
      { label: 'Call-completion, tech junior/mid', value: '~60%', method: 'Segment-tested through a 1→5 client phased rollout, vs. ~60% human baseline', sourceLabel: 'instrumented' },
      { label: 'Call-completion, senior roles', value: 'Low 40s%', method: 'Same phased rollout', sourceLabel: 'disclosed-gap', caveat: 'Below the ~60% human-parity bar; not shipped for this segment.' },
      { label: 'Cost per candidate', value: '~₹30', method: '~₹9/min × ~3 min average call', sourceLabel: 'instrumented' },
      { label: 'Recruiter time saved', value: '~2 hrs/day', method: 'Measured against a 3-4 hrs/day target', sourceLabel: 'disclosed-gap', caveat: 'Below the original 3-4 hr/day target; reported as measured, not rounded up.' },
    ],
    principles: ['vendor-choice-is-an-experiment', 'cost-against-a-stated-bar', 'phased-rollout', 'real-demo-not-a-deck'],
    didntShip: {
      what: 'Voice screening for senior roles',
      why: 'Call-completion dropped into the 40s against a ~60% human baseline; senior conversations needed more nuance than the agent could match.',
      number: 'Low 40s% vs ~60% human baseline',
    },
    sourceFile: 'professional-experience/tophire/voice-screening.md',
    depth: 'full',
    signatureVisual: 'role-level go/no-go matrix',
  },
  {
    slug: 'resume-shortlisting',
    name: 'LLM Resume Shortlisting',
    org: 'tophire',
    confidential: true,
    status: 'Live, platform-wide, 80%+ adoption',
    metrics: [
      { label: 'Shortlisting rate', value: '35% → 42%', method: 'A/B test, 5 jobs, ~400 candidates', sourceLabel: 'instrumented' },
      { label: 'Adoption', value: '80%+', method: 'Platform-wide usage', sourceLabel: 'instrumented' },
    ],
    principles: ['vendor-choice-is-an-experiment', 'north-star-plus-guardrail'],
    sourceFile: 'professional-experience/tophire/resume-shortlisting.md',
    depth: 'full',
    signatureVisual: 'decline-then-recovery line',
  },
  {
    slug: 'drip-campaign',
    name: 'AI Drip Campaign Tool',
    org: 'tophire',
    confidential: true,
    status: 'Live, 90%+ adoption, default outreach tool',
    metrics: [
      { label: 'Positive reply rate', value: '~20% → ~+30%', method: 'Online A/B tied to reply-rate tracking', sourceLabel: 'instrumented' },
      { label: 'Recruiter time saved', value: '~8 hrs/week', method: '3-month post-launch survey mirroring a pre-launch baseline', sourceLabel: 'directional', caveat: 'Survey-based, not instrumented.' },
      { label: 'Adoption', value: '90%+', method: 'Platform-wide usage', sourceLabel: 'instrumented' },
    ],
    principles: ['discovery-first', 'north-star-plus-guardrail'],
    sourceFile: 'professional-experience/tophire/drip-campaign.md',
    depth: 'full',
    signatureVisual: 'V1→V2 timeline + 3-fix ladder',
  },
  {
    slug: 'lending',
    name: 'In-App Lending (NBFC-partnered)',
    org: 'nurture-farm',
    confidential: true,
    status: 'Shipped, scaled to 6,000+ retailers',
    metrics: [
      { label: 'Retailers on in-app credit', value: '6,000+', method: 'Platform scale at end of tenure', sourceLabel: 'instrumented' },
      { label: 'MTU lift, credit cohort', value: '32%', method: 'Credit cohort vs. non-credit retailers', sourceLabel: 'instrumented' },
      { label: 'Overdue rate', value: '~6%', method: 'Reported alongside growth metrics, not the period’s optimization target', sourceLabel: 'disclosed-gap', caveat: 'Not optimized for in this period; disclosed rather than omitted.' },
    ],
    principles: ['discovery-first', 'real-demo-not-a-deck'],
    sourceFile: 'professional-experience/nurture-farm/lending.md',
    depth: 'full',
    signatureVisual: 'KYC flow, before → after',
  },
  {
    slug: 'cashback-builder',
    name: 'Cashback & Points Builder',
    org: 'nurture-farm',
    confidential: true,
    status: 'Shipped, scaled, still run ~15 days/month',
    metrics: [
      { label: 'Month-1 retention', value: '28% → 40%', method: 'Cohort before/after comparison, exposed to the loop vs. not', sourceLabel: 'instrumented' },
      { label: 'Points-based transaction volume', value: '$1M+/month', method: 'Ongoing tracking at scale', sourceLabel: 'instrumented' },
      { label: 'AOV contribution', value: 'Directional', method: 'Plausible mechanism, not isolated from other AOV drivers', sourceLabel: 'directional', caveat: 'Not precisely isolated from nurture.farm’s other AOV drivers over the same period.' },
    ],
    principles: ['discovery-first', 'cost-against-a-stated-bar'],
    sourceFile: 'professional-experience/nurture-farm/cashback-builder.md',
    depth: 'full',
    signatureVisual: 'earn-on-delivery → redeem-next loop',
  },
  {
    slug: 'pii-waterfall',
    name: 'Multi-Vendor PII Waterfall',
    org: 'tophire',
    confidential: true,
    status: 'Live, foundational infrastructure',
    metrics: [
      { label: 'Operational savings', value: '$100k/year', method: 'Cost-per-successful-lookup, before vs. after the waterfall', sourceLabel: 'instrumented' },
      { label: 'Segment configurations', value: '3 (India-tech, India-non-tech, US)', method: 'Provider set + field requirements per segment', sourceLabel: 'instrumented' },
    ],
    principles: ['vendor-choice-is-an-experiment', 'cost-against-a-stated-bar'],
    sourceFile: 'professional-experience/tophire/integrations.md',
    depth: 'full',
    signatureVisual: 'cost-ascending waterfall × 3 segments',
  },

  // ── Tier 3 — one line, no page, no CTA ──
  {
    slug: 'seller-payouts',
    name: 'Automated Seller Payouts',
    org: 'nurture-farm',
    confidential: true,
    status: 'Shipped, live across the seller base',
    metrics: [{ label: 'On-time payment rate', value: '99%', method: 'RBI-compliant payout automation across 6 payment modes', sourceLabel: 'instrumented' }],
    principles: [],
    sourceFile: 'professional-experience/nurture-farm/seller-payouts.md',
    depth: 'short',
  },
  {
    slug: 'checkout-optimization',
    name: 'Checkout & Payment-Mode Optimization',
    org: 'nurture-farm',
    confidential: true,
    status: 'Shipped, live across the retailer base',
    metrics: [{ label: 'Checkout friction', value: 'Reduced', method: 'A/B tests across payment-mode ordering, amount UI, address flow', sourceLabel: 'directional' }],
    principles: [],
    sourceFile: 'professional-experience/nurture-farm/checkout-optimization.md',
    depth: 'short',
  },
  {
    slug: 'support-chatbot',
    name: 'Tech Support Chatbot',
    org: 'tophire',
    confidential: true,
    status: 'Live',
    metrics: [{ label: 'Queries handled end to end', value: '~40%', method: 'Slack + Gmail ingestion, fine-tuned on real Q&A', sourceLabel: 'instrumented' }],
    principles: [],
    sourceFile: 'professional-experience/tophire/support-chatbot.md',
    depth: 'short',
  },
  {
    slug: 'ola-billing',
    name: 'Ola: Fare Prediction, Billing Compliance & Analytics',
    org: 'ola',
    confidential: true,
    status: 'Shipped across four initiatives, 2019-2021',
    metrics: [
      { label: 'Billing disputes cut', value: '$200k/year', method: 'Decision-tree fare-prediction model, top 5 cities', sourceLabel: 'instrumented' },
      { label: 'Bill accuracy', value: '91% → ~99%', method: 'Billing workflow simulation + compliance fix coordination', sourceLabel: 'instrumented' },
    ],
    principles: [],
    sourceFile: 'professional-experience/ola/experience.md',
    depth: 'short',
  },
  {
    slug: 'early-career',
    name: 'Early Career — Infosys & Prashaste',
    org: 'infosys',
    confidential: true,
    status: 'Completed, 2016-2019, resume-level source material',
    metrics: [
      { label: 'AML transactions flagged/month', value: '10,000+', method: 'UK bank client, ~40% accuracy', sourceLabel: 'directional' },
      { label: 'Dealership PAT lift', value: '~6 pts', method: 'Prashaste business evaluations, 6 dealerships, implemented directly', sourceLabel: 'instrumented' },
    ],
    principles: [],
    sourceFile: 'professional-experience/infosys/experience.md + professional-experience/prashaste/experience.md',
    depth: 'short',
  },
];

// ─────────────────────────────────────────────────────────────────────────
// 6. Assemble, validate, and write.
// ─────────────────────────────────────────────────────────────────────────

// Tier-3 projects (§7.4) get no case-page and no per-lens rewrite — they are
// listed among lens-copy.md's own "Blocks NOT lensed" (one-liners, no page,
// no CTA), so the same one-line pitch renders in all three lenses. Each line
// is transcribed from that project's knowledge-book "One-line pitch" section.
const TIER3_ONE_LINERS: Record<string, string> = {
  'seller-payouts':
    'Automated RBI-compliant seller payouts across six payment modes for an MSME marketplace, with reconciliation and exception handling built in, achieving a 99% on-time payment rate.',
  'checkout-optimization':
    'Ran structured A/B tests across payment-mode ordering, amount-calculation UI, and the address-page flow for an MSME marketplace’s checkout, reducing friction and drop-off at the payment step.',
  'support-chatbot':
    'Built an internal support chatbot across Slack and email, fine-tuned on real Q&A and grounded in a docs knowledge base, that answers routine doubts and auto-routes the rest, handling ~40% of incoming queries.',
  'ola-billing':
    'At Ola’s driver billing pod, shipped an ML fare-prediction model that cut billing disputes $200k/year and complaints 40% across the top 5 cities, separately lifted bill accuracy from 91% to ~99%, built 20+ product-decision dashboards, and owned billing/driver-onboarding tracking within a three-country EU launch.',
  'early-career':
    'At Infosys, built anti-money-laundering workflows for a UK bank client, flagging 10,000+ transactions/month at ~40% accuracy; at Prashaste, built sales/finance trackers used across 200+ auto dealerships and led full business evaluations for six, lifting their monthly PAT by ~6 points.',
};

function buildLensCopyForProject(
  slug: string,
  summaries: Record<string, Record<LensKey, string>>,
  caseSections: Record<string, Record<LensKey, z.infer<typeof CaseSectionSchema>[]>>,
): Record<LensKey, z.infer<typeof LensCopySchema>> {
  const oneLiner = TIER3_ONE_LINERS[slug];
  const summary = summaries[slug] ?? (oneLiner ? { recruiter: oneLiner, operator: oneLiner, engineer: oneLiner } : undefined);
  if (!summary) throw new Error(`[build-content] No lens-copy.md summary block (or Tier-3 one-liner) found for project "${slug}".`);
  const sections = caseSections[slug];

  const build = (lens: LensKey): z.infer<typeof LensCopySchema> => ({
    lens: lens === 'operator' ? 'operator' : lens,
    summary: summary[lens],
    ...(sections ? { sections: sections[lens] } : {}),
  });

  return { recruiter: build('recruiter'), operator: build('operator'), engineer: build('engineer') };
}

function main() {
  console.log('[build-content] Reading knowledge-book/ and content/ sources...');

  // Touch the primary knowledge-book sources so a missing file fails loudly,
  // even though the actual facts below were curated by hand against them.
  read(kb('05-methodology.md'));
  read(kb('03-projects/personal-projects/automjet/voice-agent.md'));
  read(kb('03-projects/personal-projects/automjet/retell-build-guide-v5.md'));
  read(kb('03-projects/personal-projects/grounded-governance/grounded-governance.md'));
  read(kb('03-projects/personal-projects/grounded-governance/source-prd.md'));
  read(kb('03-projects/personal-projects/grounded-governance/source-build-plan.md'));

  const lensCopyRaw = read(contentPath('lens-copy.md'));
  const casePagesRaw = read(contentPath('case-pages.md'));
  const productEssaysRaw = read(contentPath('product-essays.md'));

  const { heroCopy, summaries } = parseLensCopy(lensCopyRaw);
  const caseSections = parseCasePages(casePagesRaw);
  const essays = parseProductEssays(productEssaysRaw);

  console.log('[build-content] Parsed lens-copy.md (hero + 8 summaries), case-pages.md (6 projects), product-essays.md (2 essays).');

  // Confidential projects must never carry lensed prose that looks like a
  // leaked internal artifact — check every case-section body, all lenses.
  for (const [slug, perLens] of Object.entries(caseSections)) {
    const meta = PROJECT_META.find((p) => p.slug === slug);
    if (!meta) continue;
    for (const lensKey of ['recruiter', 'operator', 'engineer'] as LensKey[]) {
      for (const section of perLens[lensKey]) {
        assertNoLeakedArtifact(slug, meta.confidential, section.body);
      }
    }
  }

  const projects: z.infer<typeof ProjectSchema>[] = PROJECT_META.map((meta) => {
    const lenses = buildLensCopyForProject(meta.slug, summaries, caseSections);
    const essay = meta.slug === 'automjet' || meta.slug === 'grounded-governance' ? essays[meta.slug as 'automjet' | 'grounded-governance'] : undefined;

    const recordings =
      meta.slug === 'automjet'
        ? [
            {
              label: 'Booked test ride',
              record: {
                call_status: 'test_drive_booked',
                model_of_interest: 'Rizta',
                purchase_timeline: 'this_month',
              },
              caveat: '~500 calls/month: ~70% connect, ~40% complete, ~20% convert, ~20% end cold. This is one specific call, not the average — shown beside its cold-lead pair on purpose.',
            },
            {
              label: 'Cold lead',
              record: {
                call_status: 'cold_lead',
                model_of_interest: 'undecided',
                purchase_timeline: 'exploring',
              },
              caveat: '~500 calls/month: ~70% connect, ~40% complete, ~20% convert, ~20% end cold. A cold classification is a read outcome, not a failure — the ladder reached its honest end.',
            },
          ]
        : undefined;

    return {
      ...meta,
      essay,
      recordings,
      lenses,
    } as z.infer<typeof ProjectSchema>;
  });

  console.log('[build-content] Validating projects against the zod schema (confidentiality gate included)...');
  const projectsResult = z.array(ProjectSchema).safeParse(projects);
  if (!projectsResult.success) {
    console.error(projectsResult.error.format());
    throw new Error('[build-content] Project validation failed. See above.');
  }

  const principlesResult = z.array(PrincipleSchema).safeParse(PRINCIPLES);
  if (!principlesResult.success) {
    console.error(principlesResult.error.format());
    throw new Error('[build-content] Principles validation failed. See above.');
  }
  if (PRINCIPLES.length !== 8) {
    throw new Error(`[build-content] Expected exactly 8 principles per §7.5, found ${PRINCIPLES.length}.`);
  }

  // metrics.ts: every metric across every project, flattened with its
  // project for traceability.
  const metrics = projects.flatMap((p) => p.metrics.map((metric) => ({ projectSlug: p.slug, metric })));

  const heroResult = z.object({ recruiter: z.string().min(1), operator: z.string().min(1), engineer: z.string().min(1) }).safeParse(heroCopy);
  if (!heroResult.success) {
    console.error(heroResult.error.format());
    throw new Error('[build-content] Hero copy validation failed.');
  }

  // ── Write the four output modules ──
  const header = (name: string) =>
    `// AUTO-GENERATED by scripts/build-content.ts from knowledge-book/ + content/*.md.\n// Do not hand-edit — edit the markdown sources and re-run \`bun run content:build\`.\n\nimport type { ${name} } from './types';\n\n`;

  mkdirSync(dirname(outPath('projects.ts')), { recursive: true });

  writeFileSync(
    outPath('projects.ts'),
    header('Project') + `export const projects: Project[] = ${JSON.stringify(projects, null, 2)};\n`,
  );

  writeFileSync(
    outPath('principles.ts'),
    header('Principle') + `export const principles: Principle[] = ${JSON.stringify(PRINCIPLES, null, 2)};\n`,
  );

  writeFileSync(
    outPath('metrics.ts'),
    `// AUTO-GENERATED by scripts/build-content.ts from knowledge-book/ + content/*.md.\n// Do not hand-edit — edit the markdown sources and re-run \`bun run content:build\`.\n\nimport type { Metric } from './types';\n\nexport const metrics: { projectSlug: string; metric: Metric }[] = ${JSON.stringify(metrics, null, 2)};\n`,
  );

  writeFileSync(
    outPath('lenses.ts'),
    `// AUTO-GENERATED by scripts/build-content.ts from content/lens-copy.md.\n// Do not hand-edit — edit the markdown source and re-run \`bun run content:build\`.\n\nexport const heroCopy = ${JSON.stringify(heroCopy, null, 2)} as const;\n`,
  );

  console.log(`[build-content] Wrote src/content/{projects,principles,metrics,lenses}.ts`);
  console.log(`[build-content]   ${projects.length} projects (2 full essays, 6 case studies, 5 one-liners)`);
  console.log(`[build-content]   ${PRINCIPLES.length} principles`);
  console.log(`[build-content]   ${metrics.length} metrics`);
  console.log(
    `[build-content]   ${essays.automjet.blocks.length} automjet blocks, ${essays['grounded-governance'].blocks.length} grounded-governance blocks`,
  );
  console.log('[build-content] Done.');
}

main();
