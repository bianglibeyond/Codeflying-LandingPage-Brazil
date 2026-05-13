/**
 * Lightweight analytics dispatcher.
 * Fires events to Vercel Analytics, Meta Pixel, TikTok Pixel, Kwai Pixel.
 * Each pixel is gated by user consent (see cookie consent banner).
 * Falls through silently if pixels aren't loaded.
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
  | "click_whatsapp_owner";

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

export function track(
  event: AnalyticsEvent,
  properties?: EventProperties,
): void {
  if (typeof window === "undefined") return;

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
