"use client";

import { MessageCircle } from "lucide-react";
import { copy } from "@/lib/copy";
import { track } from "@/lib/analytics";

/**
 * Instagram glyph (lucide-react v1 dropped brand icons).
 */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * Telegram glyph (paper plane).
 */
function TelegramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M9.04 16.7l-.39 5.5c.55 0 .79-.24 1.08-.52l2.6-2.49 5.4 3.93c.99.55 1.7.26 1.96-.91l3.56-16.65c.31-1.45-.52-2.02-1.5-1.66L1.93 9.07C.5 9.64.52 10.45 1.69 10.81l5.14 1.6 11.93-7.51c.56-.37 1.07-.17.65.2z" />
    </svg>
  );
}

const WHATSAPP_NUMBER = "5511999999999"; // placeholder; replace before launch

/**
 * Footer (PLAN §4 Section 11).
 * Dark substrate, 3 columns + bottom LGPD line.
 */
export function Footer() {
  const greeting = encodeURIComponent(copy.whatsapp.greeting);
  return (
    <footer className="bg-dark-deeper text-white/80 mt-auto">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <span className="text-h3 font-bold text-white">{copy.brand.name}</span>
            <p className="text-body-sm text-white/60 max-w-xs">
              {copy.footer.columns.brand.tagline}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${greeting}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                onClick={() =>
                  track("click_whatsapp_owner", { source_section: "footer" })
                }
                className="rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <MessageCircle size={18} aria-hidden />
              </a>
              <a
                href="https://instagram.com/kuafuai0829"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://x.com/CodeFlyingAI"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <XIcon size={18} />
              </a>
              <a
                href="https://t.me/codeflying"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className="rounded-full p-2 bg-white/5 hover:bg-white/10 transition-colors"
              >
                <TelegramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Product column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-body-sm font-bold uppercase tracking-wider text-white">
              {copy.footer.columns.product.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {copy.footer.columns.product.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-body-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="flex flex-col gap-3">
            <h3 className="text-body-sm font-bold uppercase tracking-wider text-white">
              {copy.footer.columns.company.title}
            </h3>
            <ul className="flex flex-col gap-2">
              {copy.footer.columns.company.links.map((link) => (
                <li key={link.label}>
                  {"whatsapp" in link && link.whatsapp ? (
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}?text=${greeting}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        track("click_whatsapp_owner", {
                          source_section: "footer-link",
                        })
                      }
                      className="text-body-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : "external" in link && link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <a
                      href={link.href}
                      className="text-body-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <p className="text-caption text-white/50">{copy.footer.lgpdLine}</p>
        </div>
      </div>

      {/* Floating WhatsApp button (mobile + desktop) */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${greeting}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={copy.whatsapp.navAriaLabelFloating}
        onClick={() =>
          track("click_whatsapp_owner", { source_section: "floating" })
        }
        className="fixed bottom-4 right-4 z-30 rounded-full bg-[#25D366] p-3.5 shadow-lg text-white hover:scale-105 transition-transform"
        style={{ paddingBottom: "calc(0.875rem + env(safe-area-inset-bottom, 0px))" }}
      >
        <MessageCircle size={24} aria-hidden />
      </a>
    </footer>
  );
}
