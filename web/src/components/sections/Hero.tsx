"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { copy } from "@/lib/copy";
import { DualCta } from "@/components/ui/DualCta";
import { LivePreview } from "@/components/sections/LivePreview";
import { TemplateChips } from "@/components/sections/TemplateChips";
import { track } from "@/lib/analytics";

export function Hero() {
  const [activeTemplate, setActiveTemplate] = useState<string>(
    copy.hero.templates[0].id,
  );
  const [promptValue, setPromptValue] = useState("");
  const reduceMotion = useReducedMotion();

  // Rotate the prompt placeholder every 4s when the input is empty
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  useEffect(() => {
    if (promptValue || reduceMotion) return;
    const id = window.setInterval(() => {
      setPlaceholderIndex(
        (i) => (i + 1) % copy.hero.promptPlaceholders.length,
      );
    }, 4000);
    return () => window.clearInterval(id);
  }, [promptValue, reduceMotion]);

  const handleChipClick = (id: string) => {
    setActiveTemplate(id);
    const template = copy.hero.templates.find((t) => t.id === id);
    if (template) {
      const promptByTemplate: Record<string, string> = {
        infoproduto: "Quero vender meu curso online com Pix e grupo VIP",
        "bot-vip": "Bot VIP no Telegram com cobrança recorrente",
        mentoria: "Site de mentoria com agenda e cobrança mensal",
        "loja-tg": "Loja no Telegram com catálogo e checkout",
        captura: "Página de captura pra meu lead magnet",
      };
      setPromptValue(promptByTemplate[id] ?? "");
      track("click_chip", { chip_name: id });
    }
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
        {/* Desktop: 2-column split. Mobile: stacked with staggered overlap. */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT — copy + form */}
          <div className="flex flex-col gap-6">
            <p className="text-caption italic text-muted">
              {copy.hero.eyebrow}
            </p>

            <h1
              id="hero-h1"
              className="text-display text-ink leading-tight tracking-tight"
            >
              {/* Desktop H1 */}
              <span className="hidden sm:inline">
                {copy.hero.h1Desktop[0]}{" "}
                <span className="text-coral-gradient">
                  {copy.hero.h1Highlight}
                </span>
                .
              </span>
              {/* Mobile H1 */}
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

            {/* Mobile-only: staggered preview between text and form */}
            <div className="lg:hidden">
              <LivePreview
                activeTemplate={activeTemplate}
                variant="mobile-overlap"
              />
            </div>

            {/* Micro-hint + prompt input */}
            <div className="flex flex-col gap-3 mt-2">
              <p className="text-body-sm text-muted">
                {copy.hero.promptMicroHint}
              </p>

              <div className="relative">
                <input
                  type="text"
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  className="w-full rounded-md border border-hairline bg-white px-4 py-3 text-body placeholder:text-muted focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
                  placeholder={copy.hero.promptPlaceholders[placeholderIndex]}
                  aria-label="Descreva sua ideia"
                />
                {/* Rotating placeholder animation indicator (only when empty + motion allowed) */}
                {!promptValue && !reduceMotion && (
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={placeholderIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0 }} // fully transparent — placeholder is in the input
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                )}
              </div>

              <TemplateChips
                activeId={activeTemplate}
                onChipClick={handleChipClick}
              />
            </div>

            {/* Dual CTAs */}
            <DualCta source="hero" prefillPrompt={promptValue} />

            {/* Tertiary text link to demo */}
            <a
              href="#dual-output"
              className="text-body-sm text-muted hover:text-ink transition-colors -mt-2"
            >
              {copy.hero.ctaTertiary}
            </a>
          </div>

          {/* RIGHT — live preview (desktop only; mobile gets staggered version above) */}
          <div className="hidden lg:block">
            <LivePreview activeTemplate={activeTemplate} variant="desktop" />
          </div>
        </div>
      </div>
    </section>
  );
}
