import { copy } from "@/lib/copy";
import { DualCta } from "@/components/ui/DualCta";

/**
 * Final CTA — full-bleed dark band (PLAN §4 Section 10).
 */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      aria-labelledby="final-h2"
      className="bg-dark text-white"
    >
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20 flex flex-col items-center gap-6 text-center">
        <h2
          id="final-h2"
          className="text-h1 text-white leading-tight tracking-tight"
        >
          {copy.finalCta.h2}
        </h2>
        <DualCta
          source="final"
          align="center"
          primaryLabel={copy.finalCta.ctaPrimary}
          valueCallout={copy.finalCta.ctaValueCallout}
          hidePaymentNote
        />
        <p className="text-caption text-white/60">{copy.finalCta.paymentNote}</p>
      </div>
    </section>
  );
}
