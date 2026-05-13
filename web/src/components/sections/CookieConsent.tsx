"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { getConsent, setConsent } from "@/lib/consent";
import { cn } from "@/lib/utils";

/**
 * LGPD cookie consent banner (PLAN §5.4).
 * 3 categories: essential (always on), analytics, marketing.
 * Stored in localStorage, re-prompts on version drift.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      // Slight delay so it doesn't fight the hero render for attention
      const id = window.setTimeout(() => setVisible(true), 800);
      return () => window.clearTimeout(id);
    }
  }, []);

  const handleAcceptAll = () => {
    setConsent({ analytics: true, marketing: true });
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    setConsent({ analytics: false, marketing: false });
    setVisible(false);
  };

  const handleSave = () => {
    setConsent({ analytics, marketing });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-labelledby="cookie-title"
      className={cn(
        "fixed inset-x-4 bottom-4 z-30 mx-auto max-w-2xl rounded-md bg-white shadow-lg border border-hairline",
        "sm:inset-x-auto sm:left-4 sm:right-auto sm:max-w-md",
      )}
      style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div className="p-5 flex flex-col gap-3">
        <h2 id="cookie-title" className="text-h4 text-ink">
          {copy.cookies.title}
        </h2>
        <p className="text-body-sm text-body">{copy.cookies.body}</p>

        {expanded && (
          <div className="flex flex-col gap-3 mt-2 border-t border-hairline pt-3">
            <CategoryRow
              label={copy.cookies.categories.essential.label}
              desc={copy.cookies.categories.essential.desc}
              checked
              disabled
              onChange={() => {}}
            />
            <CategoryRow
              label={copy.cookies.categories.analytics.label}
              desc={copy.cookies.categories.analytics.desc}
              checked={analytics}
              onChange={setAnalytics}
            />
            <CategoryRow
              label={copy.cookies.categories.marketing.label}
              desc={copy.cookies.categories.marketing.desc}
              checked={marketing}
              onChange={setMarketing}
            />
          </div>
        )}

        <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
          {!expanded && (
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="text-body-sm text-muted hover:text-ink underline mr-auto"
            >
              {copy.cookies.customize}
            </button>
          )}
          <Button variant="secondary" size="sm" onClick={handleEssentialOnly}>
            {copy.cookies.acceptEssential}
          </Button>
          {expanded ? (
            <Button variant="primary" size="sm" onClick={handleSave}>
              {copy.cookies.save}
            </Button>
          ) : (
            <Button variant="primary" size="sm" onClick={handleAcceptAll}>
              {copy.cookies.acceptAll}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function CategoryRow({
  label,
  desc,
  checked,
  disabled,
  onChange,
}: {
  label: string;
  desc: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 size-4 rounded-sm border-hairline accent-coral disabled:opacity-50"
      />
      <div className="flex-1">
        <div className="text-body-sm font-semibold text-ink">{label}</div>
        <div className="text-caption text-muted">{desc}</div>
      </div>
    </label>
  );
}
