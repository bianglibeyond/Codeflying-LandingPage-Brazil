import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class strings, deduplicating conflicting utilities.
 * Standard shadcn pattern.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a Brazilian Real value: 29 → "R$ 29", 29.9 → "R$ 29,90".
 * Comma decimal, period thousands, space after R$.
 */
export function formatBRL(value: number, options?: { decimals?: number }): string {
  const decimals = options?.decimals ?? (value % 1 === 0 ? 0 : 2);
  const formatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `R$ ${formatter.format(value)}`;
}

/**
 * Format a Brazilian date: 2026-05-13 → "13/05/2026".
 */
export function formatBRDate(input: Date | string): string {
  const date = typeof input === "string" ? new Date(input) : input;
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
