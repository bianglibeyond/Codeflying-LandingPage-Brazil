/**
 * Cookie consent state — stored in localStorage per LGPD §5.4.
 * Three categories: essential (always on), analytics, marketing.
 */

export type ConsentCategory = "essential" | "analytics" | "marketing";

export interface ConsentState {
  essential: true; // always on
  analytics: boolean;
  marketing: boolean;
  version: string;
  decided_at: string;
}

const STORAGE_KEY = "cf_consent_v1";
const CURRENT_VERSION = "v1.0-2026-05-13";

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (parsed.version !== CURRENT_VERSION) {
      // Version drift — re-prompt
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(consent: Omit<ConsentState, "essential" | "version" | "decided_at">): void {
  if (typeof window === "undefined") return;
  const state: ConsentState = {
    essential: true,
    analytics: consent.analytics,
    marketing: consent.marketing,
    version: CURRENT_VERSION,
    decided_at: new Date().toISOString(),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    // Notify listeners (e.g., analytics module)
    window.dispatchEvent(new CustomEvent("cf:consent-updated", { detail: state }));
  } catch {
    /* ignore */
  }
}

export function hasConsent(category: ConsentCategory): boolean {
  if (category === "essential") return true;
  const state = getConsent();
  if (!state) return false;
  return state[category] === true;
}

export function clearConsent(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
