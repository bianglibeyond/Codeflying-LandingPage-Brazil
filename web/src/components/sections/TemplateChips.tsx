"use client";

import { copy } from "@/lib/copy";
import { cn } from "@/lib/utils";

interface TemplateChipsProps {
  activeId: string;
  onChipClick: (id: string) => void;
}

export function TemplateChips({ activeId, onChipClick }: TemplateChipsProps) {
  return (
    <div
      className={cn(
        "flex gap-2 overflow-x-auto sm:flex-wrap sm:overflow-x-visible",
        "scroll-snap-x scrollbar-hidden -mx-2 px-2 sm:mx-0 sm:px-0",
      )}
      role="radiogroup"
      aria-label="Templates"
    >
      {copy.hero.templates.map((template) => {
        const active = template.id === activeId;
        return (
          <button
            key={template.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChipClick(template.id)}
            className={cn(
              "shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5",
              "text-body-sm font-medium border transition-colors duration-150",
              active
                ? "bg-coral text-white border-coral"
                : "bg-white text-ink border-hairline hover:border-coral",
            )}
          >
            <span aria-hidden>{template.icon}</span>
            <span>{template.label}</span>
          </button>
        );
      })}
    </div>
  );
}
