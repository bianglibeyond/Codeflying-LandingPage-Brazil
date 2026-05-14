import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"], // latin-ext covers pt-BR diacritics (ã, ç, etc.)
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://br.codeflying.app"),
  title: {
    default: "CodeFlying — Crie seu app no Telegram + site em 10 minutos",
    template: "%s · CodeFlying",
  },
  description:
    "Pra criadores brasileiros: site + Mini App no Telegram, sem comissão sobre venda. R$ 29/mês fixo. Os primeiros 100 entram por R$ 9,90.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://br.codeflying.app",
    siteName: "CodeFlying",
    title: "CodeFlying — Crie seu app no Telegram + site em 10 minutos",
    description:
      "Pra criadores brasileiros: site + Mini App no Telegram, sem comissão sobre venda. R$ 29/mês fixo.",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeFlying — Crie seu app em 10 minutos",
    description:
      "Site + Mini App no Telegram. Sem comissão. R$ 29/mês. Os primeiros 100 entram por R$ 9,90.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FBF9F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-substrate text-ink">
        <ClientProviders>{children}</ClientProviders>
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
          <Script
            src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
            strategy="afterInteractive"
            async
            defer
          />
        )}
      </body>
    </html>
  );
}
