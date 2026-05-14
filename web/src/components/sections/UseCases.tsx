import { copy } from "@/lib/copy";

/**
 * Use cases section (PLAN §4 Section 5).
 * 4 cards (coach / course seller / nutritionist / mentor) with mockup thumbnail
 * placeholders (real mockups in Phase 2 per PLAN.md §10).
 */
export function UseCases() {
  return (
    <section
      id="use-cases"
      className="bg-substrate"
      aria-labelledby="use-cases-h2"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <header className="flex flex-col gap-3 max-w-2xl mb-12">
          <h2
            id="use-cases-h2"
            className="text-h1 text-ink leading-tight tracking-tight"
          >
            {copy.useCases.h2}
          </h2>
          <p className="text-body-lg text-body">{copy.useCases.caption}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
          {copy.useCases.cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col gap-4 rounded-md bg-white p-5 sm:p-6 border border-hairline transition-shadow duration-150 hover:shadow-md"
            >
              {/* Stacked mockup pair: site + TG */}
              <div className="flex flex-col gap-2">
                <div className="aspect-[16/10] rounded-sm bg-coral/8 border border-coral/15 flex items-center justify-center text-caption text-coral/80">
                  {copy.useCases.sitePreviewLabel}
                </div>
                <div className="aspect-[16/10] rounded-sm bg-telegram/8 border border-telegram/15 flex items-center justify-center text-caption text-telegram/80">
                  {copy.useCases.tgPreviewLabel}
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-h4 text-ink">{card.title}</h3>
                <p className="text-body-sm text-body">{card.line}</p>
              </div>
              <a
                href={`#pricing`}
                className="text-body-sm text-coral hover:underline"
              >
                {copy.useCases.cardLink}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
