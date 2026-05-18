"use client";

import { Button } from "@/components/ui/Button";
import { copy } from "@/lib/copy";
import { useModal } from "@/lib/modal-context";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface DualCtaProps {
  source: string; // analytics tag: 'hero' | 'pricing' | 'final' | 'nav'
  /** Layout: "stacked" (vertical, secondary below primary) | "inline" (horizontal). */
  layout?: "stacked" | "inline";
  /**
   * Alignment for stacked layout.
   * "start" = left-aligned on desktop (used by hero).
   * "center" = centered on all viewports (used by pricing + final CTA).
   */
  align?: "start" | "center";
  /** Display variant for the primary button. */
  primaryVariant?: "primary" | "dark";
  /** Pre-fill prompt to pass to pay-modal (for hero use). */
  prefillPrompt?: string;
  /** Custom primary label (defaults to "Garantir minha vaga — R$ 9,90"). */
  primaryLabel?: string;
  /** Hide the payment note text under primary (sometimes redundant). */
  hidePaymentNote?: boolean;
  /** Value-prop callout shown as a pill above the primary button (e.g. "R$9.90 → R$50 credit"). */
  valueCallout?: string;
  className?: string;
}

/**
 * Dual-CTA pattern (PLAN §4 hero, §4 pricing, §4 final-CTA).
 * Primary: pay (R$ 9,90 → Stripe). Secondary: free email-only.
 * Both rendered as full buttons so the free option is unmistakable.
 */
export function DualCta({
  source,
  layout = "stacked",
  align = "start",
  primaryVariant = "primary",
  prefillPrompt,
  primaryLabel,
  hidePaymentNote = false,
  valueCallout,
  className,
}: DualCtaProps) {
  const { openPay, openEmail } = useModal();

  const handlePay = () => {
    track("click_cta_pay", { source });
    openPay(prefillPrompt);
  };

  const handleEmail = () => {
    track("click_cta_free", { source });
    openEmail();
  };

  const stackedAlign =
    align === "center" ? "items-center" : "items-center sm:items-start";

  return (
    <div
      className={cn(
        "flex",
        layout === "stacked"
          ? `flex-col gap-3 ${stackedAlign}`
          : "flex-col sm:flex-row sm:items-center gap-3",
        className,
      )}
    >
      {valueCallout && (
        <span
          className={cn(
            "inline-flex items-center rounded-full bg-coral/10 px-3 py-1.5",
            "text-caption font-semibold text-coral tabular-nums",
            "ring-1 ring-coral/20",
          )}
        >
          {valueCallout}
        </span>
      )}

      <Button
        type="button"
        variant={primaryVariant}
        size="lg"
        onClick={handlePay}
        className={
          layout === "stacked"
            ? align === "center"
              ? "w-full sm:w-auto"
              : "w-full sm:w-auto"
            : ""
        }
      >
        {primaryLabel ?? copy.hero.ctaPrimary}
      </Button>

      {!hidePaymentNote && layout === "stacked" && (
        <p
          className={cn(
            "text-caption text-muted sm:-mt-1",
            align === "center" && "text-center",
          )}
        >
          {copy.hero.ctaPaymentNote}
        </p>
      )}

      <Button
        type="button"
        variant="secondary"
        size="lg"
        onClick={handleEmail}
        className={
          layout === "stacked"
            ? "w-full sm:w-auto"
            : ""
        }
      >
        {copy.hero.ctaSecondary}
      </Button>
    </div>
  );
}
