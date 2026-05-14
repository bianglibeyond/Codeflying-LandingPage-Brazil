import { copy } from "@/lib/copy";

/**
 * Social proof section (PLAN §4 Section 7).
 * "New in Brazil. With global history." — authentic positioning.
 * 3 cards: global creator success cases. Real screenshots in Phase 2.
 * Warm-tinted substrate for reading area.
 */
export function SocialProof() {
  return (
    <section
      id="social-proof"
      className="bg-warm"
      aria-labelledby="social-h2"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <header className="flex flex-col gap-3 max-w-3xl mb-12">
          <h2
            id="social-h2"
            className="text-h1 text-ink leading-tight tracking-tight"
          >
            {copy.socialProof.h2}
          </h2>
          <p className="text-body-lg text-body">{copy.socialProof.sub}</p>
        </header>

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
