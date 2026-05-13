"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LivePreviewProps {
  activeTemplate: string;
  /** "desktop" = side-by-side. "mobile-overlap" = staggered overlap pattern. */
  variant: "desktop" | "mobile-overlap";
}

/**
 * Dual-output animated mockup.
 * Desktop: browser + phone frames side by side, content fills in together.
 * Mobile: staggered overlap — browser at 80% width, phone overlaps bottom-right.
 * Both share the same data: "Um prompt → site + bot Telegram sincronizados".
 * Respects prefers-reduced-motion (renders static end-state if reduced).
 */
export function LivePreview({ activeTemplate, variant }: LivePreviewProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "desktop") {
    return (
      <div className="relative">
        <div className="grid grid-cols-[1.4fr_1fr] gap-4 items-end">
          <BrowserMockup
            activeTemplate={activeTemplate}
            animate={!reduceMotion}
          />
          <PhoneMockup
            activeTemplate={activeTemplate}
            animate={!reduceMotion}
          />
        </div>
        <p className="mt-6 text-center text-body-sm text-muted">
          Um prompt. Dois canais. Sincronizados.
        </p>
      </div>
    );
  }

  // Mobile staggered overlap pattern (PLAN §4 Section 2 mobile)
  return (
    <div className="relative w-full mt-4">
      <div className="relative">
        <div className="w-[82%]">
          <BrowserMockup
            activeTemplate={activeTemplate}
            animate={!reduceMotion}
            compact
          />
        </div>
        <div className="absolute right-0 bottom-[-8%] w-[38%]">
          <PhoneMockup
            activeTemplate={activeTemplate}
            animate={!reduceMotion}
            compact
          />
        </div>
      </div>
      <p className="mt-12 text-body-sm text-muted text-center">
        Um prompt → site + bot Telegram, sincronizados.
      </p>
    </div>
  );
}

function BrowserMockup({
  activeTemplate,
  animate,
  compact = false,
}: {
  activeTemplate: string;
  animate: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-browser bg-white shadow-md overflow-hidden border border-hairline",
      )}
      style={{ aspectRatio: compact ? "16/11" : "16/10" }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-hairline bg-warm/50">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <div className="mx-auto text-caption text-muted tabular-nums">
          codeflying.app/seu-app
        </div>
      </div>
      {/* Browser content — varies by template */}
      <div className="p-4 flex flex-col gap-3">
        {/* Animated coral header */}
        <motion.div
          key={`browser-header-${activeTemplate}`}
          initial={animate ? { width: "30%" } : false}
          animate={{ width: "70%" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="h-3 rounded-sm bg-coral/80"
        />
        <motion.div
          key={`browser-sub-${activeTemplate}`}
          initial={animate ? { width: "20%" } : false}
          animate={{ width: "55%" }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="h-2 rounded-sm bg-hairline"
        />
        <motion.div
          initial={animate ? { width: "15%" } : false}
          animate={{ width: "40%" }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="h-2 rounded-sm bg-hairline"
        />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <motion.div
            initial={animate ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="aspect-square rounded-sm bg-coral/15"
          />
          <motion.div
            initial={animate ? { opacity: 0, y: 6 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="aspect-square rounded-sm bg-pink/15"
          />
        </div>
        {/* Pay button mockup */}
        <motion.div
          initial={animate ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-2 h-7 rounded-full bg-ink flex items-center justify-center"
        >
          <span className="text-[10px] text-white font-semibold">Comprar</span>
        </motion.div>
      </div>
    </div>
  );
}

function PhoneMockup({
  activeTemplate,
  animate,
  compact = false,
}: {
  activeTemplate: string;
  animate: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-phone bg-white shadow-md overflow-hidden border border-hairline relative",
      )}
      style={{ aspectRatio: "9/16" }}
    >
      {/* Telegram header */}
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{ background: "var(--color-telegram)" }}
      >
        <div className="size-6 rounded-full bg-white/30" />
        <div className="text-[9px] text-white font-semibold">@seucanalbot</div>
      </div>
      {/* Chat content */}
      <div className="flex flex-col gap-2 p-3 bg-white">
        {/* Mini App card animated in */}
        <motion.div
          key={`phone-card-${activeTemplate}`}
          initial={animate ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-md border border-hairline p-2 bg-warm/30 flex flex-col gap-1.5"
        >
          <div className="h-12 rounded-sm bg-coral/20" />
          <div className="h-2 rounded-sm bg-hairline w-3/4" />
          <div className="h-1.5 rounded-sm bg-hairline w-1/2" />
          <motion.div
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className="mt-1 h-5 rounded-full bg-ink flex items-center justify-center"
          >
            <span className="text-[8px] text-white font-semibold">
              Comprar
            </span>
          </motion.div>
        </motion.div>
        {/* Telegram-style chat message */}
        {!compact && (
          <motion.div
            initial={animate ? { opacity: 0, x: -6 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className="self-start max-w-[80%] rounded-md bg-warm px-2 py-1"
          >
            <div className="h-1.5 rounded-sm bg-hairline w-16" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
