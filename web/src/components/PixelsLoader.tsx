"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { getConsent, type ConsentState } from "@/lib/consent";

/**
 * Consent-gated pixel loader.
 * Loads Meta / TikTok / Kwai pixel scripts only when the user has granted
 * marketing consent. Listens for the cf:consent-updated event to react to
 * changes after page load.
 *
 * Pixel IDs come from NEXT_PUBLIC_* env vars; empty = skip that pixel.
 */
export function PixelsLoader() {
  const [consent, setConsentState] = useState<ConsentState | null>(null);

  useEffect(() => {
    setConsentState(getConsent());
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<ConsentState>).detail;
      setConsentState(detail);
    };
    window.addEventListener("cf:consent-updated", handler as EventListener);
    return () => {
      window.removeEventListener(
        "cf:consent-updated",
        handler as EventListener,
      );
    };
  }, []);

  if (!consent?.marketing) return null;

  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const tiktokPixelId = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
  const kwaiPixelId = process.env.NEXT_PUBLIC_KWAI_PIXEL_ID;

  return (
    <>
      {metaPixelId && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${metaPixelId}');fbq('track','PageView');
            `,
          }}
        />
      )}
      {tiktokPixelId && (
        <Script
          id="tiktok-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=
["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=i,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript",o.async=!0,o.src=i+"?sdkid="+e+"&lib="+t;var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
ttq.load('${tiktokPixelId}');ttq.page();
}(window,document,'ttq');
            `,
          }}
        />
      )}
      {kwaiPixelId && (
        <Script
          id="kwai-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
!function(t,e,n,o,a,c,r){t.kwaiq=t.kwaiq||[];function s(){var n=e.createElement('script');n.async=!0,n.src=o,r=e.getElementsByTagName('script')[0],r.parentNode.insertBefore(n,r)}s();t.kwaiq.push({pixelId:'${kwaiPixelId}'});
}(window,document,'script','https://s1.kwai.net/kos/s101/nlav11187/pixel/events.js');
            `,
          }}
        />
      )}
    </>
  );
}
