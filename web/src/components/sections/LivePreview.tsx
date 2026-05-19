"use client";

import Image from "next/image";
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

/**
 * Per-template screenshot pair. Falls back to case1 if id isn't mapped.
 */
const TEMPLATE_IMAGES: Record<string, { website: string; phone: string; alt: string }> = {
  infoproduto: {
    website: "/cases/case1-website-infoproduct.png",
    phone: "/cases/case1-phone-telegram.png",
    alt: "Info-product storefront with Telegram VIP delivery",
  },
  restaurante: {
    website: "/cases/case2-website-restaurant.png",
    phone: "/cases/case2-phone-whatsapp.png",
    alt: "Restaurant menu with WhatsApp Flow ordering",
  },
  "bot-vip": {
    website: "/cases/case3-website-coaching.png",
    phone: "/cases/case3-phone-telegram-coaching.png",
    alt: "Online coaching site with Telegram VIP community",
  },
  salao: {
    website: "/cases/case4-website-salon.png",
    phone: "/cases/case4-phone-whatsapp-salon.png",
    alt: "Beauty salon booking site with WhatsApp scheduling",
  },
};

function imagesFor(templateId: string) {
  return TEMPLATE_IMAGES[templateId] ?? TEMPLATE_IMAGES.infoproduto;
}

export function LivePreview({ activeTemplate, variant }: LivePreviewProps) {
  const reduceMotion = useReducedMotion();
  const channel = channelFor(activeTemplate);

  if (variant === "desktop") {
    return (
      <div className="relative">
        <div className="relative">
          {/* Browser is the large canvas, filling the column */}
          <BrowserMockup
            activeTemplate={activeTemplate}
            animate={!reduceMotion}
          />
          {/* Phone overlaps bottom-right of browser, bottoms aligned */}
          <div className="absolute right-0 bottom-0 w-[28%] z-10">
            <PhoneMockup
              activeTemplate={activeTemplate}
              channel={channel}
              animate={!reduceMotion}
            />
          </div>
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
          />
        </div>
        <div className="absolute right-0 bottom-[-8%] w-[34%]">
          <PhoneMockup
            activeTemplate={activeTemplate}
            channel={channel}
            animate={!reduceMotion}
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
}: {
  activeTemplate: string;
  animate: boolean;
}) {
  const { website, alt } = imagesFor(activeTemplate);
  return (
    <div className="rounded-browser bg-white shadow-md overflow-hidden border border-hairline">
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-hairline bg-warm/50">
        <span className="size-2 rounded-full bg-[#FF5F57]" />
        <span className="size-2 rounded-full bg-[#FEBC2E]" />
        <span className="size-2 rounded-full bg-[#28C840]" />
        <div className="mx-auto text-caption text-muted tabular-nums">
          {copy.livePreview.browserUrl}
        </div>
      </div>
      {/* Website screenshot — fades in when template changes */}
      <motion.div
        key={`browser-${activeTemplate}`}
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="relative aspect-[3/2] w-full"
      >
        <Image
          src={website}
          alt={alt}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
          priority
        />
      </motion.div>
    </div>
  );
}

function PhoneMockup({
  activeTemplate,
  channel,
  animate,
}: {
  activeTemplate: string;
  channel: Channel;
  animate: boolean;
}) {
  const { phone, alt } = imagesFor(activeTemplate);
  // Border tint hints at the channel (Telegram blue / WhatsApp green) even
  // though the screenshot itself already shows the app's full UI.
  const borderClass =
    channel === "wa" ? "ring-1 ring-[#25D366]/30" : "ring-1 ring-telegram/30";

  return (
    <motion.div
      key={`phone-${activeTemplate}`}
      initial={animate ? { opacity: 0, y: 8 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "rounded-phone bg-white shadow-md overflow-hidden border border-hairline relative",
        borderClass,
      )}
      style={{ aspectRatio: "2/3" }}
    >
      <Image
        src={phone}
        alt={alt}
        fill
        sizes="(min-width: 768px) 20vw, 40vw"
        className="object-cover object-top"
        priority
      />
    </motion.div>
  );
}
