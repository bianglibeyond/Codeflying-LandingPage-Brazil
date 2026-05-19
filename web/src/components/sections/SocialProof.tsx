import { ArrowUpRight, Star } from "lucide-react";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * Social proof section (PLAN §4 Section 7).
 * "New in Brazil. With global history." — authentic positioning.
 * Includes a prominent legitimacy card linking to the global English platform,
 * followed by 3 user reviews from global creators.
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
            <div className="inline-flex items-center justify-center gap-2 shrink-0 rounded-full bg-coral text-white px-6 py-3 text-body font-semibold shadow-coral group-hover:-translate-y-0.5 transition-transform">
              <span>{copy.socialProof.legitimacyCta}</span>
              <ArrowUpRight size={18} aria-hidden />
            </div>
          </div>
        </a>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {copy.socialProof.reviews.map((r, i) => (
            <ReviewCard
              key={i}
              initials={r.initials}
              avatarColor={r.avatarColor as "coral" | "telegram" | "pink"}
              flag={r.flag}
              name={r.name}
              role={r.role}
              quote={r.quote}
            />
          ))}
        </div>

        <p className="mt-8 text-body-sm italic text-muted max-w-3xl">
          {copy.socialProof.disclosure}
        </p>
      </div>
    </section>
  );
}

function ReviewCard({
  initials,
  avatarColor,
  flag,
  name,
  role,
  quote,
}: {
  initials: string;
  avatarColor: "coral" | "telegram" | "pink";
  flag: string;
  name: string;
  role: string;
  quote: string;
}) {
  const avatarBg =
    avatarColor === "coral"
      ? "bg-coral"
      : avatarColor === "telegram"
        ? "bg-telegram"
        : "bg-pink";

  return (
    <article className="flex flex-col gap-4 rounded-md bg-white p-6 border border-hairline">
      <div className="flex gap-0.5" aria-label="5 out of 5 stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className="fill-coral text-coral"
            aria-hidden
          />
        ))}
      </div>

      <blockquote className="text-body text-ink leading-relaxed flex-1">
        &ldquo;{quote}&rdquo;
      </blockquote>

      <div className="flex items-center gap-3 mt-2">
        <span
          className={cn(
            "size-10 rounded-full text-white font-semibold text-body-sm flex items-center justify-center shrink-0",
            avatarBg,
          )}
          aria-hidden
        >
          {initials}
        </span>
        <div className="flex flex-col leading-tight">
          <span className="text-body-sm font-semibold text-ink">
            {name} <span aria-hidden>{flag}</span>
          </span>
          <span className="text-caption text-muted">{role}</span>
        </div>
      </div>
    </article>
  );
}
