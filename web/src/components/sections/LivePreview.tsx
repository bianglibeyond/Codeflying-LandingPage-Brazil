"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { copy } from "@/lib/copy";

type Channel = "tg" | "wa";

interface LivePreviewProps {
  activeTemplate: string;
  /** "desktop" = side-by-side. "mobile-overlap" = staggered overlap pattern. */
  variant: "desktop" | "mobile-overlap";
}

/**
 * Multi-output animated mockup.
 * Phone frame swaps between Telegram and WhatsApp based on the active template's
 * channel attribute (creator chips → Telegram; SMB chips → WhatsApp).
 * Desktop: browser + phone side-by-side. Mobile: staggered overlap.
 */
function channelFor(templateId: string): Channel {
  const template = copy.hero.templates.find((t) => t.id === templateId);
  return ((template as { channel?: Channel } | undefined)?.channel ?? "tg") as Channel;
}

export function LivePreview({ activeTemplate, variant }: LivePreviewProps) {
  const reduceMotion = useReducedMotion();
  const channel = channelFor(activeTemplate);

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
            channel={channel}
            animate={!reduceMotion}
          />
        </div>
        <p className="mt-6 text-center text-body-sm text-muted">
          {copy.livePreview.captionDesktop}
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
            channel={channel}
            animate={!reduceMotion}
            compact
          />
        </div>
      </div>
      <p className="mt-12 text-body-sm text-muted text-center">
        {copy.livePreview.captionMobile}
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
          {copy.livePreview.browserUrl}
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
          <span className="text-[10px] text-white font-semibold">{copy.livePreview.miniAppBuyLabel}</span>
        </motion.div>
      </div>
    </div>
  );
}

function PhoneMockup({
  activeTemplate,
  channel,
  animate,
  compact = false,
}: {
  activeTemplate: string;
  channel: Channel;
  animate: boolean;
  compact?: boolean;
}) {
  const isWa = channel === "wa";
  // WhatsApp green vs Telegram blue
  const headerBg = isWa ? "#075E54" : "var(--color-telegram)";
  const handleLabel = isWa ? "Sua Loja" : "@seucanalbot";
  const accentBg = isWa ? "bg-[#25D366]" : "bg-coral/20";

  return (
    <div
      className={cn(
        "rounded-phone bg-white shadow-md overflow-hidden border border-hairline relative",
      )}
      style={{ aspectRatio: "9/16" }}
    >
      {/* Header */}
      <div
        className="px-3 py-2 flex items-center gap-2"
        style={{ background: headerBg }}
      >
        <div className="size-6 rounded-full bg-white/30" />
        <div className="text-[9px] text-white font-semibold">{handleLabel}</div>
      </div>
      {/* Chat content */}
      <div className={cn("flex flex-col gap-2 p-3", isWa ? "bg-[#ECE5DD]" : "bg-white")}>
        {/* Product/booking card animated in */}
        <motion.div
          key={`phone-card-${activeTemplate}`}
          initial={animate ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className={cn(
            "rounded-md border border-hairline p-2 flex flex-col gap-1.5",
            isWa ? "bg-white" : "bg-warm/30",
          )}
        >
          <div className={cn("h-12 rounded-sm", accentBg)} />
          <div className="h-2 rounded-sm bg-hairline w-3/4" />
          <div className="h-1.5 rounded-sm bg-hairline w-1/2" />
          <motion.div
            initial={animate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.7 }}
            className={cn(
              "mt-1 h-5 rounded-full flex items-center justify-center",
              isWa ? "bg-[#25D366]" : "bg-ink",
            )}
          >
            <span className="text-[8px] text-white font-semibold">
              {copy.livePreview.miniAppBuyLabel}
            </span>
          </motion.div>
        </motion.div>
        {/* Chat message bubble */}
        {!compact && (
          <motion.div
            initial={animate ? { opacity: 0, x: -6 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
            className={cn(
              "self-start max-w-[80%] rounded-md px-2 py-1",
              isWa ? "bg-white" : "bg-warm",
            )}
          >
            <div className="h-1.5 rounded-sm bg-hairline w-16" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
