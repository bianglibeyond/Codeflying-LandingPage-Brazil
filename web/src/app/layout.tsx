import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";
import { copy } from "@/lib/copy";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"], // latin-ext covers pt-BR diacritics (ã, ç, etc.)
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://br.codeflying.app"),
  title: {
    default: copy.meta.siteTitle,
    template: copy.meta.siteTitleTemplate,
  },
  description: copy.meta.description,
  openGraph: {
    type: "website",
    locale: copy.meta.htmlLang === "pt-BR" ? "pt_BR" : "en_US",
    url: "https://br.codeflying.app",
    siteName: "CodeFlying",
    title: copy.meta.siteTitle,
    description: copy.meta.descriptionShort,
  },
  twitter: {
    card: "summary_large_image",
    title: copy.meta.twitterTitle,
    description: copy.meta.twitterDescription,
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
    <html lang={copy.meta.htmlLang} className={`${inter.variable} h-full antialiased`}>
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
