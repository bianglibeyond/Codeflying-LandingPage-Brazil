"use client";

import { useState } from "react";
import { copy } from "@/lib/copy";
import { formatBRL } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Pix comparison section (PLAN §4 Section 6).
 * Desktop: table with CodeFlying row coral-highlighted.
 * Mobile: 3 stacked cards with CodeFlying elevated (coral border + shadow).
 * Plus interactive savings calculator (slider).
 */
export function PixComparison() {
  return (
    <section
      id="pix-comparison"
      className="bg-substrate"
      aria-labelledby="pix-h2"
    >
      <div className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
        <header className="flex flex-col gap-3 max-w-3xl mb-12">
          <h2 id="pix-h2" className="text-h1 text-ink leading-tight tracking-tight">
            {copy.pixComparison.h2}
          </h2>
        </header>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-md border border-hairline bg-white">
          <table className="w-full">
            <thead className="bg-warm/50">
              <tr>
                <th className="text-left px-5 py-3 text-body-sm font-semibold text-ink">
                  {copy.pixComparison.columns.platform}
                </th>
                <th className="text-left px-5 py-3 text-body-sm font-semibold text-ink">
                  {copy.pixComparison.columns.commission}
                </th>
                <th className="text-left px-5 py-3 text-body-sm font-semibold text-ink">
                  {copy.pixComparison.columns.payout}
                </th>
                <th className="text-left px-5 py-3 text-body-sm font-semibold text-ink">
                  {copy.pixComparison.columns.model}
                </th>
              </tr>
            </thead>
            <tbody>
              {copy.pixComparison.rows.map((row) => (
                <tr
                  key={row.name}
                  className={cn(
                    "border-t border-hairline",
                    row.highlight && "bg-coral/5",
                  )}
                >
                  <td
                    className={cn(
                      "px-5 py-4 text-body font-semibold",
                      row.highlight ? "text-coral" : "text-ink",
                    )}
                  >
                    {row.name}
                    {row.highlight && (
                      <span aria-hidden className="ml-2">
                        ⭐
                      </span>
                    )}
                  </td>
                  <td
                    className={cn(
                      "px-5 py-4 text-body tabular-nums",
                      row.highlight ? "text-coral font-bold" : "text-body",
                    )}
                  >
                    {row.commission}
                  </td>
                  <td className="px-5 py-4 text-body">{row.payout}</td>
                  <td className="px-5 py-4 text-body-sm text-body">{row.model}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-4">
          {copy.pixComparison.rows.map((row) => (
            <div
              key={row.name}
              className={cn(
                "rounded-md p-5 flex flex-col gap-2",
                row.highlight
                  ? "bg-white border-2 border-coral shadow-md"
                  : "bg-white border border-hairline",
              )}
            >
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    "text-h4 font-bold",
                    row.highlight ? "text-coral" : "text-ink",
                  )}
                >
                  {row.name}
                </span>
                {row.highlight && <span aria-hidden>⭐</span>}
              </div>
              <div className="text-body-sm text-muted">
                {copy.pixComparison.columns.commission}:
              </div>
              <div
                className={cn(
                  "text-body tabular-nums",
                  row.highlight ? "text-coral font-bold" : "text-ink",
                )}
              >
                {row.commission}
              </div>
              <div className="flex flex-col gap-0.5 mt-2">
                <span className="text-caption text-muted">
                  {copy.pixComparison.columns.payout}:{" "}
                  <span className="text-body-sm text-ink">{row.payout}</span>
                </span>
                <span className="text-caption text-muted">
                  {copy.pixComparison.columns.model}:{" "}
                  <span className="text-body-sm text-ink">{row.model}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 text-body-sm text-muted max-w-3xl">
          {copy.pixComparison.honestNote}
        </p>

        <SavingsCalculator />
      </div>
    </section>
  );
}

const HOTMART_RATE = 0.099;
const HOTMART_FIXED = 1;
const OUR_PRICE = 29;

function SavingsCalculator() {
  const [monthlyRevenue, setMonthlyRevenue] = useState(5000);
  const hotmartCost =
    monthlyRevenue * HOTMART_RATE + HOTMART_FIXED * (monthlyRevenue / 100); // rough: assume avg ticket R$100
  const savings = Math.max(hotmartCost - OUR_PRICE, 0);

  return (
    <div className="mt-10 rounded-md bg-white p-6 sm:p-8 border border-hairline">
      <p className="text-body text-ink">
        Se você vende{" "}
        <span className="text-coral font-bold tabular-nums">
          {formatBRL(monthlyRevenue)}
        </span>{" "}
        por mês na Hotmart...
      </p>

      <input
        type="range"
        min={1000}
        max={50000}
        step={500}
        value={monthlyRevenue}
        onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
        aria-label="Revenue per month slider"
        className="mt-4 w-full accent-coral"
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-6">
        <Stat
          label={copy.pixComparison.calculator.hotmartLabel}
          value={formatBRL(hotmartCost, { decimals: 0 })}
          tone="neutral"
        />
        <Stat
          label={copy.pixComparison.calculator.ourLabel}
          value={formatBRL(OUR_PRICE)}
          tone="brand"
        />
        <Stat
          label={copy.pixComparison.calculator.savingsLabel}
          value={formatBRL(savings, { decimals: 0 })}
          tone="success"
          highlight
        />
      </div>

      <p className="mt-4 text-caption text-muted">
        {copy.pixComparison.calculator.footnote}
      </p>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
  highlight,
}: {
  label: string;
  value: string;
  tone: "neutral" | "brand" | "success";
  highlight?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 rounded-sm p-3",
        highlight && "bg-coral/5 border border-coral/20",
      )}
    >
      <span className="text-caption text-muted">{label}</span>
      <span
        className={cn(
          "text-h4 font-bold tabular-nums",
          tone === "brand" && "text-coral",
          tone === "success" && "text-coral",
          tone === "neutral" && "text-ink",
        )}
      >
        {value}
      </span>
    </div>
  );
}
