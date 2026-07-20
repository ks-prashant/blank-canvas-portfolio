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

function isLens(value: string | null | undefined): value is Lens {
  return value != null && (VALID_LENSES as readonly string[]).includes(value);
}

/**
 * Route `validateSearch` for every route that mounts `LensProvider`
 * (`/`, `/work/automjet`, `/work/grounded-governance`). Reading `?lens=`
 * this way — through the router's search-param validation, available
 * identically during SSR and on the client — is what makes a direct link
 * like `/work/automjet?lens=engineer` actually render that lens server-side,
 * instead of the un-lensed default with a client-side upgrade after
 * hydration (the previous bug: `window.location.search` is only readable
 * inside a `useEffect`, so a crawler or a curl request — no JS execution —
 * always saw the un-lensed default, contradicting §9.4's documented
 * "a visitor may land here directly ... without ever visiting /" claim).
 * An invalid or absent `lens` param resolves to `undefined`, preserving the
 * "no silent pre-selection" default exactly as before.
 */
export function validateLensSearch(search: Record<string, unknown>): { lens?: Lens } {
  const raw = typeof search.lens === "string" ? search.lens : null;
  return isLens(raw) ? { lens: raw } : {};
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

export function LensProvider({
  children,
  initialLens = null,
}: {
  children: ReactNode;
  /** From the route's validated `?lens=` search param (see
   * `validateLensSearch` above) — identical on server and client, so
   * seeding state with it here causes no hydration mismatch. Omit (or pass
   * `null`) when the route doesn't read search params; the un-lensed
   * default renders exactly as before, then the effect below still upgrades
   * from localStorage on mount. */
  initialLens?: Lens | null;
}) {
  // First paint renders `initialLens` (server and client agree, since both
  // derive it from the same URL) — `null` when the URL carries no `?lens=`,
  // which is still the honest "no silent pre-selection" default (BUILD-SPEC
  // §4.1). Only localStorage, which the server can never see, is upgraded
  // to after mount, in the effect below.
  const [lens, setLensState] = useState<Lens | null>(initialLens);

  useEffect(() => {
    if (initialLens) return; // the URL already won; don't let storage override it
    const initial = readInitialLens();
    if (initial) setLensState(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
