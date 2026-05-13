"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { copy } from "@/lib/copy";

/**
 * Dark trust strip (PLAN §4 Section 4).
 * Large numbers, animated count-up on scroll-into-view, tabular nums.
 * Placed AFTER the dual-output wedge per IA decision (PLAN §3).
 */
export function TrustStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      aria-label="Números de credibilidade"
      className="bg-dark text-white"
    >
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {copy.trustStrip.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex flex-col gap-1 text-center sm:text-left"
            >
              <span className="text-h1 font-bold tabular-nums tracking-tight text-white">
                {item.number}
              </span>
              <span className="text-body-sm text-white/70">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
