import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Lens } from "./types";

/**
 * `LensProvider` — the client-side lens state for the whole landing page
 * (BUILD-SPEC §4.1). This is the "light adaptation" the Step 5 brief asks
 * for: Step 4's six section components don't take a lens prop yet, so
 * rather than rewriting all six, this context sits at the route level and
 * any section can opt in to `useLens()` incrementally. Only the numbers
 * section (via `UnlensedMark`) and the new hero/lens components consume it
 * so far — see this step's report for the full list.
 *
 * Precedence, per §4.1: URL param (`?lens=`) → `localStorage` → the honest
 * un-lensed default (`null`). `null` is a real, meaningful state — it is
 * NOT "operator" pre-selected. Once a lens is picked, it's written to both
 * the URL and localStorage so it persists across reloads and is shareable.
 */

const STORAGE_KEY = "ledger:lens";
const VALID_LENSES: readonly Lens[] = ["recruiter", "operator", "engineer"];

function isLens(value: string | null): value is Lens {
  return value !== null && (VALID_LENSES as readonly string[]).includes(value);
}

function readInitialLens(): Lens | null {
  if (typeof window === "undefined") return null;
  const fromUrl = new URLSearchParams(window.location.search).get("lens");
  if (isLens(fromUrl)) return fromUrl;
  try {
    const fromStorage = window.localStorage.getItem(STORAGE_KEY);
    if (isLens(fromStorage)) return fromStorage;
  } catch {
    // localStorage can throw in locked-down/private browsing contexts —
    // fall through to the honest un-lensed default rather than crash.
  }
  return null;
}

interface LensContextValue {
  /** `null` = the honest un-lensed default; no lens has been chosen yet. */
  lens: Lens | null;
  setLens: (lens: Lens) => void;
}

const LensContext = createContext<LensContextValue | null>(null);

export function LensProvider({ children }: { children: ReactNode }) {
  // Server/first paint always renders the un-lensed default (`null`) so
  // there is no mismatch between server and client and no flash of a
  // silently pre-selected lens — the honest default is genuinely the
  // first thing rendered, then upgraded on mount if the URL/storage says
  // otherwise (BUILD-SPEC §4.1: "no silent pre-selection").
  const [lens, setLensState] = useState<Lens | null>(null);

  useEffect(() => {
    const initial = readInitialLens();
    if (initial) setLensState(initial);
  }, []);

  const setLens = useCallback((next: Lens) => {
    setLensState(next);
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Ignore storage failures — the URL param still carries the choice.
    }
    const url = new URL(window.location.href);
    url.searchParams.set("lens", next);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  const value = useMemo(() => ({ lens, setLens }), [lens, setLens]);

  return <LensContext.Provider value={value}>{children}</LensContext.Provider>;
}

export function useLens(): LensContextValue {
  const ctx = useContext(LensContext);
  if (!ctx) {
    throw new Error("useLens() must be called within a LensProvider");
  }
  return ctx;
}

export const LENS_LABELS: Record<Lens, string> = {
  recruiter: "Recruiter",
  operator: "Founder / PM",
  engineer: "Engineer",
};
