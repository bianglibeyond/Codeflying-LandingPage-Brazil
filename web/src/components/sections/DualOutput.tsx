import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

interface UseCaseCard {
  id: string;
  title: string;
  line: string;
}

/**
 * Dual-output section (PLAN §4 Section 3).
 * Side-by-side site + Telegram Mini App mockups + bullet lists + sync arrow.
 */
export function DualOutput() {
  return (
    <section
      id="dual-output"
      className="bg-substrate"
      aria-labelledby="dual-output-h2"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24">
        <header className="flex flex-col gap-4 max-w-3xl mb-12">
          <h2
            id="dual-output-h2"
            className="text-h1 text-ink leading-tight tracking-tight"
          >
            {copy.dualOutput.h2}
          </h2>
          <p className="text-body-lg text-body">{copy.dualOutput.sub}</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-8 items-stretch">
          {/* Site panel */}
          <Panel
            title={copy.dualOutput.siteTitle}
            icon="🌐"
            bullets={copy.dualOutput.siteBullets as unknown as string[]}
            accent="coral"
          />

          {/* Divider with sync caption */}
          <div className="flex md:flex-col items-center justify-center gap-3 text-muted">
            <div className="hidden md:block size-px w-12 bg-hairline" />
            <div aria-hidden className="text-2xl">
              ⇄
            </div>
            <div className="md:size-px md:w-12 bg-hairline hidden md:block" />
          </div>

          {/* Telegram panel */}
          <Panel
            title={copy.dualOutput.tgTitle}
            icon="✈️"
            bullets={copy.dualOutput.tgBullets as unknown as string[]}
            accent="telegram"
          />
        </div>

        <p className="mt-10 text-center text-body-lg text-ink">
          {copy.dualOutput.syncCaption}
        </p>
      </div>
    </section>
  );
}

function Panel({
  title,
  icon,
  bullets,
  accent,
}: {
  title: string;
  icon: string;
  bullets: string[];
  accent: "coral" | "telegram";
}) {
  return (
    <div className="flex flex-col gap-5 rounded-md bg-white p-6 sm:p-8 border border-hairline">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-h3">
          {icon}
        </span>
        <h3 className="text-h3 text-ink">{title}</h3>
      </div>

      {/* Mockup placeholder — visual differentiator */}
      <div
        className={cn(
          "aspect-[4/3] rounded-sm overflow-hidden",
          accent === "coral" ? "bg-coral/8" : "bg-telegram/8",
        )}
        style={{
          backgroundColor:
            accent === "coral"
              ? "rgba(255, 127, 83, 0.08)"
              : "rgba(34, 158, 217, 0.08)",
        }}
      >
        <div className="h-full w-full flex items-center justify-center text-muted text-body-sm">
          {accent === "coral" ? "Site gerado" : "Mini App no Telegram"}
        </div>
      </div>

      <ul className="flex flex-col gap-2 text-body">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              aria-hidden
              className={cn(
                "mt-1 inline-block size-1.5 rounded-full",
                accent === "coral" ? "bg-coral" : "bg-telegram",
              )}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
