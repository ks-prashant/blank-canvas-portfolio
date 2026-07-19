# blank-canvas-portfolio — working notes for Claude

This file is auto-loaded at the start of every session in this directory. Read it before doing anything else here. **This is the build repo — the active root.** `Documents/my-portfolio/` (a sibling folder) is where this project was planned; it holds the original copies of these same docs and is now a secondary reference, not the working folder. If you're pointed at `my-portfolio` instead of here, you're in the wrong place — this repo is where the actual site gets built.

## What this project is

Prashant Singh's AI PM portfolio. Lovable-scaffolded (TanStack Start), GitHub-synced. Built through iterative chat-based design (the prototype), with `BUILD-SPEC.md` as the build brief for whoever executes it.

## Start here, every session

1. **Read `BUILD-SPEC.md` §11's "Status at a glance" table.** It's the single source of truth for what's done and what's next — kept current in place, not as a separate changelog. Resume from the first non-✅ row.
2. **Read `STRATEGY-V2-PROPOSAL.md`** if you need the *why* behind any decision — it's the ratified strategy (thesis, personas, lens depth mechanisms) that `BUILD-SPEC.md` was rewritten to match.
3. **Read `DESIGN-PLAN.md`** only for design rationale (why The Ledger, why red means cost) — it feeds `BUILD-SPEC.md` §5, it's not a competing spec.

**Standing instruction:** whenever a `BUILD-SPEC.md` §11 step is completed, or a session ends mid-step with meaningful progress, update its status marker and note **in the same session, before ending the turn** — both in the status table and in the matching step's prose. Don't wait to be asked. A future session should be able to read the status table alone and know exactly where to resume.

## Current state (as of 2026-07-19)

Steps 0–1 of `BUILD-SPEC.md` §11 are done except the commit: the prototype is at `prototype/index.html` (486KB — it still shows the *retired* products, DocuFlow and the old Automjet build; that's expected, it's ported for design tokens only, never its copy). Docs, `knowledge-book/`, and `content/` are copied into this repo. `bun install` and `bun run build` are verified clean. **Nothing has been committed or pushed yet** — that was paused for explicit confirmation, since push is a shared/visible action that syncs to Lovable.

**Stack correction, load-bearing — confirmed by inspecting the actual clone, not assumed from the spec's original draft:** this is **TanStack Start** (React 19, file-based routing under `src/routes/*.tsx`), Tailwind v4, shadcn/ui already in `src/components/ui`, zod already installed, and the build targets **Cloudflare Workers** via Nitro. **Package manager is `bun`, not `npm`** — npm isn't even installed in this environment. Wherever `BUILD-SPEC.md` says `npm`, read `bun`. Wherever it implies a hand-rolled router, use TanStack Router's file-based convention (`/work/automjet` → `src/routes/work/automjet.tsx`, `/case/$slug` → TanStack's `$param` naming). The IA in `BUILD-SPEC.md` §4 is unaffected — only file locations and the exact routing API differ.

## Workflow — read `BUILD-SPEC.md` §12.1–12.2 in full, but the short version

**Claude Code owns the entire codebase. Lovable is not prompted to build features** — this project has no backend (no DB, auth, edge functions, migrations, or secrets), so Lovable's usual role has no subject here. It's the deploy target and preview, nothing more.

**Deploy sequence:** push → confirm Lovable's sandbox shows the matching commit SHA → deploy → verify the live SHA. `deploy_project` publishes Lovable's own synced sandbox tree, **not GitHub directly** — a real lesson from the sibling Grounded Governance project, where trusting a push without verifying the sandbox synced led to testing the wrong build.

**Sync discipline:** serialize access to `main` — don't have Lovable and Claude Code editing at the same time. Since Lovable isn't authoring here, this is nearly one-way: Claude Code → GitHub → Lovable pulls → deploy.

## Posture: extend the prototype, don't restart it

Read `BUILD-SPEC.md` §11.1 before touching any landing section — it's the exact keep/retire/new inventory. Roughly two-thirds of the prototype survives (design system, layout shell, journey, work index, principles, numbers, questions, contact). What's genuinely new: the hero visual, the deepened lens system (§8.6), and the two product pages (§9) — the centrepiece of the whole build.

## The three-way sync rule (still applies, now within this repo)

`prototype/index.html`, `BUILD-SPEC.md`, and `DESIGN-PLAN.md` can drift apart the same way they did during planning. **Whenever you change something in a way that contradicts or extends the spec, update the spec in the same session, before the session ends.** If a change is exploratory and not yet settled, it's fine to leave the docs alone — but say so out loud.

## Other things worth knowing

- **`knowledge-book/`** is the canonical factual source for everything on the site. `content/lens-copy.md` and `content/case-pages.md` are drafted from it for Prashant to review — never invent a fact that isn't traceable to the knowledge book. Facts marked unconfirmed in the two personal-project canonical files (`knowledge-book/03-projects/personal-projects/{automjet,grounded-governance}/`) are **binding** — they must not appear on the site in any lens.
- **`_archive/pre-2026-07-products/` does not exist in this repo** (it wasn't copied over — it's dead weight for the build). If you need it for historical reference, it's in `Documents/my-portfolio/_archive/`.
- **Confidentiality gate:** six of the eight full case studies are TopHire/nurture.farm work. Technique may be described; no verbatim prompts, schemas, or internal artifacts, ever. See `BUILD-SPEC.md` §7.3.
- **No LLM anywhere in the actual site** — not runtime, not build time. The Lens is hand-authored. Don't reintroduce a generation step without an explicit decision to do so.
- **Open questions Prashant hasn't answered yet:** `BUILD-SPEC.md` OQ1, OQ3, OQ7–OQ10. None of them block the current step.
