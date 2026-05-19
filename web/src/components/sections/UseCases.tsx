import Image from "next/image";
import { copy } from "@/lib/copy";

/**
 * Use cases section (PLAN §4 Section 5).
 * 4 cards (coach / course seller / nutritionist / mentor) each with a stacked
 * website + phone screenshot pair illustrating the channel mix for that persona.
 */

const CARD_IMAGES: Record<
  string,
  { website: string; phone: string; websiteAlt: string; phoneAlt: string }
> = {
  coach: {
    website: "/use-cases/whois-1a-fitness-website.png",
    phone: "/use-cases/whois-1b-fitness-whatsapp.png",
    websiteAlt: "Fitness coach website",
    phoneAlt: "WhatsApp Flow for booking workouts",
  },
  course: {
    website: "/use-cases/whois-2a-course-website.png",
    phone: "/use-cases/whois-2b-course-telegram.png",
    websiteAlt: "Course seller landing page",
    phoneAlt: "Telegram Mini App for course modules",
  },
  nutri: {
    website: "/use-cases/whois-3a-nutritionist-website.png",
    phone: "/use-cases/whois-3b-nutritionist-whatsapp.png",
    websiteAlt: "Nutritionist website",
    phoneAlt: "WhatsApp Flow for meal plans",
  },
  mentor: {
    website: "/use-cases/whois-4a-mentor-website.png",
    phone: "/use-cases/whois-4b-mentor-whatsapp.png",
    websiteAlt: "Mentor / consultant website",
    phoneAlt: "WhatsApp Flow for scheduling and billing",
  },
};

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
          {copy.useCases.cards.map((card) => {
            const imgs = CARD_IMAGES[card.id];
            return (
              <article
                key={card.id}
                className="flex flex-col gap-5 rounded-md bg-white p-5 sm:p-6 border border-hairline transition-shadow duration-150 hover:shadow-md"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="text-h3 text-ink font-bold">{card.title}</h3>
                  <p className="text-body text-body">{card.line}</p>
                </div>
                {/* Stacked screenshot pair: website + WhatsApp/Telegram */}
                <div className="flex flex-col gap-2">
                  <div className="relative aspect-[3/2] rounded-sm overflow-hidden bg-warm/40 border border-hairline">
                    {imgs && (
                      <Image
                        src={imgs.website}
                        alt={imgs.websiteAlt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                  <div className="relative aspect-[3/2] rounded-sm overflow-hidden bg-warm/40 border border-hairline">
                    {imgs && (
                      <Image
                        src={imgs.phone}
                        alt={imgs.phoneAlt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover object-top"
                      />
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
