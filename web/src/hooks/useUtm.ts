"use client";

import { useEffect, useState } from "react";

export type UtmParams = {
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_content?: string;
  utm_term?: string;
};

const UTM_KEYS = [
  "utm_source",
  "utm_campaign",
  "utm_medium",
  "utm_content",
  "utm_term",
] as const;

const STORAGE_KEY = "cf_utm_v1";

/**
 * Capture UTM params from the URL on first visit, persist to localStorage,
 * and return them for use in form submissions. This way, even if a user
 * bounces around the page or refreshes, we still have the original UTM data
 * when they submit.
 */
export function useUtm(): UtmParams {
  const [utm, setUtm] = useState<UtmParams>({});

  useEffect(() => {
    // 1. Check if URL has UTM params; if so, persist them
    const params = new URLSearchParams(window.location.search);
    const fromUrl: UtmParams = {};
    let hasAny = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        fromUrl[key] = value;
        hasAny = true;
      }
    }
    if (hasAny) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      } catch {
        // ignore storage failure
      }
      setUtm(fromUrl);
      return;
    }
    // 2. Otherwise, restore from localStorage
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUtm(JSON.parse(stored));
      }
    } catch {
      // ignore parse failure
    }
  }, []);

  return utm;
}
