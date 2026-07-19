import { createFileRoute } from "@tanstack/react-router";

import { LedgerShell } from "../components/layout/ledger-shell";
import { ContactSection } from "../components/sections/contact-section";
import { JourneySection } from "../components/sections/journey-section";
import { NumbersSection } from "../components/sections/numbers-section";
import { PrinciplesSection } from "../components/sections/principles-section";
import { QuestionsSection } from "../components/sections/questions-section";
import { WorkIndexSection } from "../components/sections/work-index-section";
// Side-effect import: new CSS for the six sections below, deliberately
// NOT folded into src/styles.css (off-limits for BUILD-SPEC §11 Step 4 —
// see landing-sections.css's header comment for why).
import "../styles/landing-sections.css";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// BUILD-SPEC §11 Step 4: the six surviving landing sections, ported from
// the prototype and re-sourced from the content pipeline. No hero, no
// lens picker, no live-product entries yet — those are Step 5. The page
// deliberately starts partway down; Step 5 adds the hero above this.
//
// LedgerShell is used bare here (no page-level marginContent) because
// each section below carries its own per-section margin annotation via
// `SectionGrid` (see src/components/sections/section-heading.tsx) — the
// same pattern the prototype uses, where every `<section>` repeats its
// own two-column `.grid` rather than sharing one page-level split.
function Index() {
  return (
    <LedgerShell>
      <JourneySection />
      <WorkIndexSection />
      <PrinciplesSection />
      <NumbersSection />
      <QuestionsSection />
      <ContactSection />
    </LedgerShell>
  );
}
