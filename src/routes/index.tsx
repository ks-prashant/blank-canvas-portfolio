import { createFileRoute } from "@tanstack/react-router";

import { LedgerShell } from "../components/layout/ledger-shell";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// Design-system-shell proof (BUILD-SPEC §11 Step 2): placeholder content
// only, to confirm the bare page matches the prototype's empty shell —
// same paper, same grain, same type, same margins. Nav, lens picker, and
// real copy land in later steps.
function Index() {
  return (
    <LedgerShell
      marginContent={
        <span className="ledger-margin-note">step 02 / design system</span>
      }
    >
      <div style={{ padding: "64px 0" }}>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-11)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-faint)",
            marginBottom: "16px",
          }}
        >
          The Ledger — shell proof
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "var(--text-hero)",
            lineHeight: 1.02,
            fontWeight: 400,
            maxWidth: "24ch",
          }}
        >
          Paper, ink, and a little grain.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-17)",
            color: "var(--ink-soft)",
            maxWidth: "56ch",
            marginTop: "20px",
            lineHeight: 1.6,
          }}
        >
          This is placeholder body copy in Archivo, sitting on the paper
          token with the asymmetric grid reserving a margin column to the
          left. It exists only to prove the design system ported cleanly —
          real content arrives in a later build step.
        </p>
      </div>
    </LedgerShell>
  );
}
