/**
 * Shared layout primitive for legal/secondary pages
 * (privacidade, termos, meus-dados, obrigado, cancelado).
 * Same nav + footer + cookie banner, narrower content column.
 */

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { copy } from "@/lib/copy";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-substrate min-h-screen flex flex-col">
      <header className="bg-substrate border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label={copy.brand.name}>
            <Image
              src="/codeflying-logo.svg"
              alt={copy.brand.name}
              width={156}
              height={32}
              className="h-7 w-auto"
            />
          </Link>
          <Link href="/" className="text-body-sm text-muted hover:text-ink transition-colors">
            {copy.painel.homeLink}
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
          <h1 className="text-h1 text-ink mb-8 tracking-tight">{title}</h1>
          <div className="flex flex-col gap-6 text-body leading-relaxed">{children}</div>
        </div>
      </main>
      <footer className="bg-dark-deeper text-white/70 mt-auto">
        <div className="mx-auto max-w-7xl px-6 py-8 text-caption">
          {copy.footer.lgpdLine}
        </div>
      </footer>
    </div>
  );
}
