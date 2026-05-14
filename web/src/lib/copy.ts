/**
 * Copy selector — switches between English (review/dev) and pt-BR (production).
 *
 * Set NEXT_PUBLIC_LANG=en in web/.env.local during dev/review.
 * Set NEXT_PUBLIC_LANG=pt before shipping to Brazilian audience.
 *
 * Both copy-en.ts and copy-pt.ts have identical key shapes; only values differ.
 * Adding a new key requires updating BOTH files.
 */

import { copy as copyPt } from "./copy-pt";
import { copy as copyEn } from "./copy-en";

const lang = process.env.NEXT_PUBLIC_LANG ?? "en";

export const copy = lang === "pt" ? copyPt : copyEn;
export const copyLang: "en" | "pt" = lang === "pt" ? "pt" : "en";
