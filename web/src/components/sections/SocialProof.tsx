import { ArrowUpRight } from "lucide-react";
import { copy } from "@/lib/copy";

/**
 * Social proof section (PLAN §4 Section 7).
 * "New in Brazil. With global history." — authentic positioning.
 * Includes a prominent legitimacy card linking to the global English platform
 * so BR users can verify CodeFlying exists at scale elsewhere.
 * 3 cards: global creator success cases. Warm-tinted substrate.
 */
export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="bg-warm"
      aria-labelledby="social-h2"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <header className="flex flex-col gap-3 max-w-3xl mb-8">
          <h2
            id="social-h2"
            className="text-h1 text-ink leading-tight tracking-tight"
          >
            {copy.socialProof.h2}
          </h2>
          <p className="text-body-lg text-body">{copy.socialProof.sub}</p>
        </header>

        {/* Legitimacy proof — prominent card with live English platform link */}
        <a
          href={copy.socialProof.legitimacyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-12 block rounded-md bg-white border-2 border-coral/30 hover:border-coral hover:shadow-lg transition-all p-6 sm:p-8 relative overflow-hidden"
        >
          {/* Soft coral gradient backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 -z-0 opacity-40 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 100% 0%, rgba(255,127,83,0.18) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-5">
            <div className="flex-1 flex flex-col gap-2">
              <h3 className="text-h3 sm:text-h2 text-ink leading-tight tracking-tight">
                {copy.socialProof.legitimacyHeadline}
              </h3>
              <p className="text-body text-body max-w-2xl">
                {copy.socialProof.legitimacySub}
              </p>
            </div>
            <div
              className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-coral text-white px-6 py-3 text-body font-semibold shadow-coral group-hover:-translate-y-0.5 transition-transform"
            >
              <span>{copy.socialProof.legitimacyCta}</span>
              <ArrowUpRight size={18} aria-hidden />
            </div>
          </div>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {copy.socialProof.cards.map((c, i) => (
            <article
              key={i}
              className="flex flex-col gap-3 rounded-md bg-white p-5 sm:p-6 border border-hairline"
            >
              <div className="aspect-[4/3] rounded-sm bg-warm/60 border border-hairline flex items-center justify-center text-caption text-muted">
                {copy.socialProof.screenshotPlaceholder}
              </div>
              <div className="flex items-center gap-2">
                <span aria-hidden className="text-h4">
                  {c.flag}
                </span>
                <span className="text-body-sm text-muted">
                  {c.region} · {c.kind}
                </span>
              </div>
              <blockquote className="text-body text-ink leading-snug">
                &ldquo;{c.quote}&rdquo;
              </blockquote>
              <p className="text-body-sm font-semibold text-coral tabular-nums">
                {c.metric}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-body-sm italic text-muted max-w-3xl">
          {copy.socialProof.disclosure}
        </p>
      </div>
    </section>
  );
}
