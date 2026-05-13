/**
 * Design tokens — single source of truth for runtime values.
 * Tailwind CSS variables live in globals.css; this file mirrors them for use
 * in framer-motion, canvas-confetti, inline styles, and runtime-computed values.
 *
 * Aligned with PLAN.md §2.1–§2.10.
 */

export const palette = {
  substrate: "#FBF9F5", // warm off-white page background
  coralPrimary: "#FF7F53", // primary brand accent (CTA, headlines)
  pinkSecondary: "#ED73DC", // secondary brand accent (gradients)
  softPink: "#F77A95", // quiet accent
  telegramAccent: "#229ED9", // ONLY inside Telegram feature module
  pixAccent: "#32BCAD", // (kept for v2; banned from user copy in v1)
  ink: "#1A1A1A", // headings on light substrate
  body: "#444444", // body copy
  muted: "#888888", // captions, meta
  hairline: "#E8E4DD", // warm-tinted borders/dividers
  darkBg: "#1A1A1A", // dark sections
  darkBgDeeper: "#0F0F0F", // footer
  warmTint: "#F5F1E8", // warm-tinted section (social proof)
} as const;

export const typography = {
  fontFamily: "Inter, system-ui, sans-serif",
  display: { size: 64, lineHeight: 1.05, weight: 700, tracking: "-0.02em" },
  h1: { size: 48, lineHeight: 1.15, weight: 700, tracking: "-0.015em" },
  h2: { size: 36, lineHeight: 1.2, weight: 700, tracking: "-0.01em" },
  h3: { size: 24, lineHeight: 1.3, weight: 600, tracking: "normal" },
  h4: { size: 20, lineHeight: 1.35, weight: 600, tracking: "normal" },
  bodyLg: { size: 18, lineHeight: 1.55, weight: 400, tracking: "normal" },
  body: { size: 16, lineHeight: 1.55, weight: 400, tracking: "normal" },
  bodySm: { size: 14, lineHeight: 1.5, weight: 400, tracking: "normal" },
  caption: { size: 12, lineHeight: 1.4, weight: 500, tracking: "0.02em" },
} as const;

export const spacing = {
  // px values; map to Tailwind units in CSS theme
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  6: 24,
  8: 32,
  12: 48,
  16: 64,
  24: 96,
  32: 128,
} as const;

export const motion = {
  instant: { duration: 100, easing: "ease-out" }, // toggle states
  fast: { duration: 150, easing: "ease-out" }, // hover, micro
  base: { duration: 200, easing: "ease-out" }, // card lift, modal, accordion
  slow: { duration: 350, easing: [0.2, 0.8, 0.2, 1] as const }, // reveals, page tx
  heroLoop: { duration: 8000, easing: "linear" }, // hero preview loop
} as const;

export const radius = {
  sm: 4, // inputs, small buttons
  md: 8, // cards, modals
  full: 9999, // pills, primary CTA
  none: 0, // full-bleed sections
  browser: 12, // browser frame mockups
  phone: 32, // phone frame mockups
} as const;

export const shadow = {
  none: "none",
  sm: "0 1px 2px rgba(26,26,26,0.05)",
  md: "0 4px 12px rgba(26,26,26,0.08)",
  lg: "0 12px 32px rgba(26,26,26,0.12)",
  coral: "0 4px 16px rgba(255,127,83,0.3)",
} as const;

/**
 * Confetti particle palette — brand coral + pink, never multi-rainbow.
 * Used in canvas-confetti for the dashboard celebration moment.
 */
export const confettiColors = [
  palette.coralPrimary,
  palette.pinkSecondary,
  palette.softPink,
];

/**
 * Reduced-motion helper. Always check before firing any animation.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
