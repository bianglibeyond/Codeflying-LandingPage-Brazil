"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

/**
 * FAQ section (PLAN §4 Section 9).
 * 12 questions tuned to Hotmart-refugee anxieties.
 * Smooth accordion, keyboard navigable, one open at a time.
 */
export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-substrate" aria-labelledby="faq-h2">
      <div className="mx-auto max-w-4xl px-6 py-20 sm:py-24">
        <header className="flex flex-col gap-3 mb-10">
          <h2
            id="faq-h2"
            className="text-h1 text-ink leading-tight tracking-tight"
          >
            {copy.faq.h2}
          </h2>
        </header>

        <div className="flex flex-col gap-2">
          {copy.faq.items.map((item, i) => {
            const open = openIndex === i;
            return (
              <article
                key={i}
                className="rounded-md bg-white border border-hairline overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-warm/30 transition-colors"
                >
                  <span className="text-body font-semibold text-ink">
                    {item.q}
                  </span>
                  <ChevronDown
                    size={20}
                    aria-hidden
                    className={cn(
                      "shrink-0 text-muted transition-transform duration-150",
                      open && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-body text-body">{item.a}</p>
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
