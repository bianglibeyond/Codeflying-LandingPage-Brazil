"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";
import { DualCta } from "@/components/ui/DualCta";
import { LivePreview } from "@/components/sections/LivePreview";
import { TemplateChips } from "@/components/sections/TemplateChips";
import { track } from "@/lib/analytics";

/**
 * Hero (PLAN §4 Section 2).
 *
 * Removed the "What do you want to build today?" prompt input — we can't
 * actually generate anything from a prompt yet, so showing a fake input
 * creates uncanny-valley friction. Template chips remain: clicking one
 * updates the right-panel live preview so the user can see what kind of
 * output they'd get for each scenario.
 */
export function Hero() {
  const [activeTemplate, setActiveTemplate] = useState<string>(
    copy.hero.templates[0].id,
  );

  const handleChipClick = (id: string) => {
    setActiveTemplate(id);
    track("click_chip", { chip_name: id });
  };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-substrate"
      aria-labelledby="hero-h1"
    >
      {/* Animated coral gradient backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, rgba(255,127,83,0.18) 0%, transparent 50%), " +
            "radial-gradient(ellipse at 80% 100%, rgba(237,115,220,0.15) 0%, transparent 50%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:py-32">
        {/* Tablet+: 2-column split. Phone: stacked with staggered overlap. */}
        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-12 md:gap-10 lg:gap-16 items-center">
          {/* LEFT — copy + chips + CTAs */}
          <div className="flex flex-col gap-6">
            <p className="text-caption italic text-muted">
              {copy.hero.eyebrow}
            </p>

            <h1
              id="hero-h1"
              className="text-display text-ink leading-tight tracking-tight"
            >
              {/* Wider screens: full H1 */}
              <span className="hidden sm:inline">
                {copy.hero.h1Desktop[0]}{" "}
                <span className="text-coral-gradient">
                  {copy.hero.h1Highlight}
                </span>
                .
              </span>
              {/* Phone: compressed H1 */}
              <span className="sm:hidden">
                {copy.hero.h1Mobile[0]}{" "}
                <span className="text-coral-gradient">
                  {copy.hero.h1MobileHighlight}
                </span>
                .
              </span>
            </h1>

            <p className="text-body-lg text-body max-w-xl">
              <span className="hidden sm:inline">{copy.hero.subDesktop}</span>
              <span className="sm:hidden">{copy.hero.subMobile}</span>
            </p>

            {/* Phone-only: staggered preview between text and CTAs */}
            <div className="md:hidden">
              <LivePreview
                activeTemplate={activeTemplate}
                variant="mobile-overlap"
              />
            </div>

            {/* Template chips — clicking updates the right-panel preview */}
            <div className="mt-2">
              <TemplateChips
                activeId={activeTemplate}
                onChipClick={handleChipClick}
              />
            </div>

            {/* Dual CTAs */}
            <DualCta source="hero" />

            {/* Tertiary text link to demo */}
            <a
              href="#dual-output"
              className="text-body-sm text-muted hover:text-ink transition-colors -mt-2"
            >
              {copy.hero.ctaTertiary}
            </a>
          </div>

          {/* RIGHT — live preview (tablet+ only; phone gets staggered version above) */}
          <div className="hidden md:block">
            <LivePreview activeTemplate={activeTemplate} variant="desktop" />
          </div>
        </div>
      </div>
    </section>
  );
}
