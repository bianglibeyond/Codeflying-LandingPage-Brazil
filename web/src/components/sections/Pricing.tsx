"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { copy } from "@/lib/copy";
import { DualCta } from "@/components/ui/DualCta";
import { api } from "@/lib/api";

/**
 * Pricing section (PLAN §4 Section 8).
 * R$ 29/mês headline + R$ 9,90 CTA + secondary free-email CTA.
 * Live spots-remaining counter (Redis-backed).
 */
export function Pricing() {
  const [remaining, setRemaining] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    api
      .getStats()
      .then((stats) => {
        if (!cancelled) setRemaining(stats.remaining);
      })
      .catch(() => {
        // Silently hide counter on API failure
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const urgent = remaining !== null && remaining <= 5;
  const sold = remaining === 0;

  return (
    <section id="pricing" className="bg-substrate" aria-labelledby="pricing-h2">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <header className="flex flex-col gap-3 mb-8 text-center">
          <h2
            id="pricing-h2"
            className="text-h1 text-ink leading-tight tracking-tight"
          >
            {copy.pricing.h2}
          </h2>
          {remaining !== null && !sold && (
            <p
              className={`text-body-sm tabular-nums ${
                urgent ? "text-coral animate-pulse" : "text-muted"
              }`}
            >
              {copy.pricing.spotsRemainingLabel.replace("{n}", String(remaining))}
            </p>
          )}
        </header>

        <div className="rounded-md bg-white p-6 sm:p-10 border border-hairline shadow-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-body-sm uppercase tracking-wider text-muted font-semibold">
              {copy.pricing.planLabel}
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-display font-bold text-ink tabular-nums">
                {copy.pricing.priceLaunch}
              </span>
              <span className="text-h4 text-muted">{copy.pricing.priceLaunchUnit}</span>
            </div>
            <p className="text-body text-coral font-semibold">
              {copy.pricing.creditReturn}
            </p>
            <p className="text-body-sm text-muted max-w-md">
              {copy.pricing.subscriptionNote}
            </p>
          </div>

          <ul className="mt-8 flex flex-col gap-3 max-w-md mx-auto">
            {copy.pricing.bullets.map((bullet, i) => (
              <li key={i} className="flex items-start gap-3 text-body">
                <Check size={20} className="mt-0.5 text-coral shrink-0" aria-hidden />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-md mx-auto flex flex-col items-center gap-4">
            {sold ? (
              <SoldOutNotice />
            ) : (
              <>
                <DualCta
                  source="pricing"
                  layout="stacked"
                  align="center"
                  primaryLabel={copy.pricing.ctaPrimary}
                  hidePaymentNote
                  className="w-full"
                />
                <p className="text-caption text-muted text-center">
                  {copy.pricing.paymentNote}
                </p>
                <p className="text-caption text-muted text-center">
                  {copy.pricing.refundNote}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function SoldOutNotice() {
  return (
    <div className="w-full flex flex-col gap-3 text-center">
      <p className="text-body-lg font-bold text-coral">
        {copy.pricing.spotsFullLabel}
      </p>
      <p className="text-body-sm text-muted">
        {copy.pricing.soldOutSub}
      </p>
    </div>
  );
}
