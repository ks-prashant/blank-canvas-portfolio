import { createFileRoute } from "@tanstack/react-router";

import { LedgerShell } from "../components/layout/ledger-shell";
import { LensPill } from "../components/lens/lens-pill";
import { ContactSection } from "../components/sections/contact-section";
import { HeroSection } from "../components/sections/hero-section";
import { JourneySection } from "../components/sections/journey-section";
import { NumbersSection } from "../components/sections/numbers-section";
import { PrinciplesSection } from "../components/sections/principles-section";
import { QuestionsSection } from "../components/sections/questions-section";
import { WorkIndexSection } from "../components/sections/work-index-section";
import { LensProvider } from "../content/lens-context";
// Side-effect import: new CSS for the six sections below, deliberately
// NOT folded into src/styles.css (off-limits for BUILD-SPEC §11 Step 4 —
// see landing-sections.css's header comment for why).
import "../styles/landing-sections.css";
// Same pattern, extended for Step 5's new hero + lens system — see that
// file's header comment.
import "../styles/hero-lens.css";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  component: Index,
});

// BUILD-SPEC §11 Step 5: the new hero + deepened lens, assembled above the
// six Step 4 sections. `LensProvider` wraps the whole page (not just the
// hero) so `LensPill` reads as genuinely global/sticky and any section —
// Step 4's six included — can adopt `useLens()` incrementally; only
// `NumbersSection` does so today, to render its `UnlensedMark`s.
//
// LedgerShell is used bare here (no page-level marginContent) because
// each section below carries its own per-section margin annotation via
// `SectionGrid` (see src/components/sections/section-heading.tsx) — the
// same pattern the prototype uses, where every `<section>` repeats its
// own two-column `.grid` rather than sharing one page-level split.
function Index() {
  return (
    <LensProvider>
      <LedgerShell>
        <LensPill />
        <HeroSection />
        <JourneySection />
        <WorkIndexSection />
        <PrinciplesSection />
        <NumbersSection />
        <QuestionsSection />
        <ContactSection />
      </LedgerShell>
    </LensProvider>
  );
}
