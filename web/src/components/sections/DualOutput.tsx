import Image from "next/image";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * Multi-output section (PLAN §4 Section 3).
 * Three panels: site + Telegram store + WhatsApp catalog.
 * Driven by one prompt, kept in sync.
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          <Panel
            title={copy.dualOutput.siteTitle}
            icon="🌐"
            bullets={copy.dualOutput.siteBullets as unknown as string[]}
            accent="coral"
            imageSrc="/demo/website.png"
            imageAlt="Generated website preview"
          />
          <Panel
            title={copy.dualOutput.tgTitle}
            icon="✈️"
            bullets={copy.dualOutput.tgBullets as unknown as string[]}
            accent="telegram"
            imageSrc="/demo/telegram-mini-app.png"
            imageAlt="Generated Telegram Mini App preview"
          />
          <Panel
            title={copy.dualOutput.waTitle}
            icon="💬"
            bullets={copy.dualOutput.waBullets as unknown as string[]}
            accent="whatsapp"
            imageSrc="/demo/whatsapp-flow.png"
            imageAlt="Generated WhatsApp Flow preview"
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
  imageSrc,
  imageAlt,
}: {
  title: string;
  icon: string;
  bullets: string[];
  accent: "coral" | "telegram" | "whatsapp";
  imageSrc: string;
  imageAlt: string;
}) {
  const accentBg =
    accent === "coral"
      ? "rgba(255, 127, 83, 0.08)"
      : accent === "telegram"
        ? "rgba(34, 158, 217, 0.08)"
        : "rgba(37, 211, 102, 0.08)";
  const dotColor =
    accent === "coral"
      ? "bg-coral"
      : accent === "telegram"
        ? "bg-telegram"
        : "bg-[#25D366]";

  return (
    <div className="flex flex-col gap-5 rounded-md bg-white p-6 sm:p-8 border border-hairline">
      <div className="flex items-center gap-2">
        <span aria-hidden className="text-h3">
          {icon}
        </span>
        <h3 className="text-h3 text-ink">{title}</h3>
      </div>

      <div
        className="relative aspect-[3/2] rounded-sm overflow-hidden"
        style={{ backgroundColor: accentBg }}
      >
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>

      <ul className="flex flex-col gap-2 text-body">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <span
              aria-hidden
              className={cn("mt-2 inline-block size-1.5 rounded-full shrink-0", dotColor)}
            />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
