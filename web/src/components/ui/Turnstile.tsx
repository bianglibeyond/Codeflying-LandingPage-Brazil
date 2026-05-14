"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "invisible";
        },
      ) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
    };
  }
}

interface TurnstileProps {
  onVerify: (token: string) => void;
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/**
 * Cloudflare Turnstile invisible bot challenge.
 * Renders inline (compact) only if a site key is configured.
 * No site key → renders nothing; backend `verify_turnstile` also bypasses.
 */
export function Turnstile({ onVerify }: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [widgetId, setWidgetId] = useState<string | null>(null);

  useEffect(() => {
    if (!SITE_KEY || !containerRef.current) return;

    let cancelled = false;

    const renderWidget = () => {
      if (!window.turnstile || cancelled || !containerRef.current) return;
      const id = window.turnstile.render(containerRef.current, {
        sitekey: SITE_KEY,
        callback: (token: string) => {
          onVerify(token);
        },
        theme: "light",
        size: "compact",
      });
      setWidgetId(id);
    };

    if (window.turnstile) {
      renderWidget();
    } else {
      // Wait for the script (loaded in layout.tsx) to attach window.turnstile
      const id = window.setInterval(() => {
        if (window.turnstile) {
          window.clearInterval(id);
          renderWidget();
        }
      }, 100);
      return () => {
        window.clearInterval(id);
      };
    }

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={containerRef} className="my-2" />;
}
