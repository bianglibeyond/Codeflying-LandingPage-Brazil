/**
 * Lightweight analytics dispatcher.
 * Fans out to: our Data Spirit warehouse (via /api/track proxy), Vercel
 * Analytics, Meta Pixel, TikTok Pixel, Kwai Pixel. Each marketing pixel
 * is gated by user consent (cookie consent banner).
 */

import { hasConsent } from "./consent";

export type AnalyticsEvent =
  | "view_landing"
  | "view_section"
  | "click_cta_pay"
  | "click_cta_free"
  | "click_chip"
  | "submit_pay_form"
  | "submit_email_only_form"
  | "start_checkout"
  | "complete_checkout"
  | "fail_checkout"
  | "view_dashboard"
  | "click_refund_request"
  | "complete_refund"
  | "click_discord";

export interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

declare global {
  interface Window {
    // Vercel Analytics
    va?: (...args: unknown[]) => void;
    // Meta Pixel
    fbq?: (...args: unknown[]) => void;
    // TikTok Pixel
    ttq?: { track: (event: string, params?: unknown) => void };
    // Kwai Pixel
    kwaiq?: { track: (event: string, params?: unknown) => void };
  }
}

const ANON_KEY = "ds_anon_id";
const USER_KEY = "ds_user_id";
const SESSION_KEY = "ds_session_id";

const TENANT_ID = process.env.NEXT_PUBLIC_DATA_SPIRIT_TENANT_ID ?? "codeflying";
const APP_ID = process.env.NEXT_PUBLIC_DATA_SPIRIT_APP_ID ?? "brazil-lp";

function getOrCreateId(storage: Storage, key: string): string {
  let id = storage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    storage.setItem(key, id);
  }
  return id;
}

/**
 * Bind a stable user id (e.g. Stripe customer_id) to subsequent events.
 * Persists across visits in localStorage. Call once you know who they are
 * (e.g. from the signed dashboard token on /painel).
 */
export function identify(userId: string): void {
  if (typeof window === "undefined" || !userId) return;
  try {
    localStorage.setItem(USER_KEY, userId);
  } catch {
    /* private mode / quota — ignore */
  }
}

function getUserId(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem(USER_KEY) ?? "";
  } catch {
    return "";
  }
}

function getAnonId(): string {
  if (typeof window === "undefined") return "";
  try {
    return getOrCreateId(localStorage, ANON_KEY);
  } catch {
    return "";
  }
}

function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    return getOrCreateId(sessionStorage, SESSION_KEY);
  } catch {
    return "";
  }
}

function getUtmFromUrl(): EventProperties {
  if (typeof window === "undefined") return {};
  const sp = new URLSearchParams(window.location.search);
  const utm: EventProperties = {};
  for (const key of ["utm_source", "utm_campaign", "utm_medium", "utm_content", "utm_term"]) {
    const v = sp.get(key);
    if (v) utm[key] = v;
  }
  return utm;
}

function sendToDataSpirit(event: AnalyticsEvent, properties: EventProperties): void {
  if (typeof window === "undefined") return;

  const payload = {
    event_type: event,
    user_id: getUserId() || getAnonId(),
    ts: new Date().toISOString(),
    props: {
      session_id: getSessionId(),
      page_url: window.location.pathname + window.location.search,
      referrer: document.referrer || undefined,
      lang: document.documentElement.lang || undefined,
      app_id: APP_ID,
      tenant_id: TENANT_ID,
      ...getUtmFromUrl(),
      ...properties,
    },
  };

  // Fire-and-forget. keepalive lets the request survive page unloads.
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    /* tracking must never block the user */
  });
}

export function track(
  event: AnalyticsEvent,
  properties?: EventProperties,
): void {
  if (typeof window === "undefined") return;

  // Data Spirit (our warehouse) — always on, server proxy routes it.
  try {
    sendToDataSpirit(event, properties ?? {});
  } catch {
    /* ignore */
  }

  // Vercel Analytics (essential, no consent required for our own analytics)
  try {
    window.va?.("event", { name: event, ...properties });
  } catch {
    /* ignore */
  }

  // Marketing pixels — only fire if marketing consent granted
  if (!hasConsent("marketing")) return;

  try {
    window.fbq?.("trackCustom", event, properties);
  } catch {
    /* ignore */
  }
  try {
    window.ttq?.track(event, properties);
  } catch {
    /* ignore */
  }
  try {
    window.kwaiq?.track(event, properties);
  } catch {
    /* ignore */
  }
}
