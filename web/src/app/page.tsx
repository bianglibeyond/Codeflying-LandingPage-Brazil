import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { DualOutput } from "@/components/sections/DualOutput";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { UseCases } from "@/components/sections/UseCases";
import { PixComparison } from "@/components/sections/PixComparison";
import { SocialProof } from "@/components/sections/SocialProof";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCta } from "@/components/sections/FinalCta";
import { Footer } from "@/components/sections/Footer";
import { CookieConsent } from "@/components/sections/CookieConsent";

/**
 * Landing page composition (PLAN §3 IA order).
 *
 *  1. Nav (sticky)
 *  2. Hero — split-screen dual-output prompt + live preview
 *  3. Dual output — "Mesma ideia. Dois canais."
 *  4. Trust strip — dark, 500k+ creators (after wedge proof)
 *  5. Use cases — 4 case cards with mockup thumbnails
 *  6. Pix comparison — Hotmart/Kiwify/CodeFlying + calculator
 *  7. Social proof — global cases ("Nova no Brasil. Mas com história global.")
 *  8. Pricing — R$ 29/mês + R$ 9,90 deposit + free email-only secondary
 *  9. FAQ — 12 questions
 * 10. Final CTA — dark, dual CTAs
 * 11. Footer — dark, LGPD, WhatsApp
 *
 * Cookie consent banner renders on first visit until decision is recorded.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <DualOutput />
        <TrustStrip />
        <UseCases />
        <PixComparison />
        <SocialProof />
        <Pricing />
        <FAQ />
        <FinalCta />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}
