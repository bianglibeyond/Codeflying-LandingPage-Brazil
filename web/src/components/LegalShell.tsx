/**
 * Shared layout primitive for legal/secondary pages
 * (privacidade, termos, meus-dados, obrigado, cancelado).
 * Same nav + footer + cookie banner, narrower content column.
 */

import type { ReactNode } from "react";
import Link from "next/link";

export function LegalShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-substrate min-h-screen flex flex-col">
      <header className="bg-substrate border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-h4 font-bold text-ink">
            CodeFlying
          </Link>
          <Link href="/" className="text-body-sm text-muted hover:text-ink transition-colors">
            Voltar pra home →
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
          © 2026 CodeFlying · Em conformidade com a LGPD · DPO: dpo@codeflying.app
        </div>
      </footer>
    </div>
  );
}
