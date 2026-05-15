/**
 * English copy — review/dev default while you can't read pt-BR comfortably.
 * Production build sets NEXT_PUBLIC_LANG=pt to flip back to copy-pt.ts.
 *
 * IMPORTANT: This file is structurally identical to copy-pt.ts. Keep keys
 * in sync. If you add a key in one, add it in the other.
 */

export const copy = {
  brand: {
    name: "CodeFlying",
    tagline: "Build without code. Your own channel. Zero sales commission.",
  },

  nav: {
    ctaPrimary: "Reserve spot — R$ 9.90",
    ctaLogin: "Log in",
  },

  hero: {
    eyebrow: "For Brazilian creators and SMBs, in Portuguese. Card today, Pix soon.",
    h1Desktop: ["Build your site + Telegram + WhatsApp", "in 10 minutes."],
    h1Highlight: "in 10 minutes",
    h1Mobile: ["Site + Telegram + WhatsApp", "in 10 minutes."],
    h1MobileHighlight: "in 10 minutes",
    subDesktop:
      "Describe your idea to the AI. We deliver Website + Telegram Mini App + WhatsApp Flow + checkout — all from one prompt. R$ 29/month flat. Zero sales commission.",
    subMobile: "Website + Telegram Mini App + WhatsApp Flow. R$ 29/month. Zero sales commission.",
    promptMicroHint: "What do you want to build today?",
    promptPlaceholders: [
      "I want to sell my online course with Pix and a VIP Telegram group",
      "Gym coach: Website + Telegram Mini App to deliver workouts",
      "Restaurant menu + orders via WhatsApp + delivery booking",
      "Beauty salon: WhatsApp bookings + reminders + loyalty",
    ],
    templates: [
      { id: "infoproduto", label: "Info-product store", icon: "🌐", channel: "tg" },
      { id: "restaurante", label: "Restaurant + WhatsApp Flow", icon: "💬", channel: "wa" },
      { id: "bot-vip", label: "VIP Telegram Mini App", icon: "✈️", channel: "tg" },
      { id: "salao", label: "Beauty salon bookings", icon: "💬", channel: "wa" },
      { id: "mentoria", label: "Mentorship + bookings", icon: "🌐", channel: "tg" },
      { id: "loja-retail", label: "Boutique store catalog", icon: "💬", channel: "wa" },
      { id: "loja-tg", label: "Telegram Mini App store", icon: "✈️", channel: "tg" },
      { id: "b2b", label: "B2B consulting funnel", icon: "💬", channel: "wa" },
      { id: "captura", label: "Landing page", icon: "🌐", channel: "tg" },
    ],
    templatePrompts: {
      infoproduto: "I want to sell my online course with Pix and a VIP group",
      "bot-vip": "VIP Telegram Mini App with recurring billing",
      mentoria: "Mentorship site with scheduling and monthly billing",
      "loja-tg": "Telegram Mini App store with catalog and checkout",
      captura: "Landing page for my lead magnet",
      restaurante: "Restaurant menu + WhatsApp orders + delivery booking",
      salao: "Beauty salon: WhatsApp bookings + reminders",
      "loja-retail": "Boutique catalog + WhatsApp checkout",
      b2b: "B2B consulting funnel + WhatsApp follow-up",
    },
    ctaPrimary: "Reserve my spot — R$ 9.90",
    ctaPaymentNote: "Payment by card (Stripe). Pix in Q3 2026.",
    ctaSecondary: "Just notify me when it launches (free)",
    ctaTertiary: "See demo (90s) ↓",
  },

  dualOutput: {
    h2: "One idea. Three channels. One product built by AI.",
    sub:
      "While Hotmart charges 9.9% as a marketplace and Lovable gives you only a website, CodeFlying delivers the full bundle: your Website + Telegram Mini App + WhatsApp Flow — on your own channels, zero sales commission.",
    siteTitle: "Website",
    siteBullets: [
      "SEO (Google finds you)",
      "Lead capture",
      "Custom domain",
      "Analytics",
    ],
    tgTitle: "Telegram Mini App",
    tgBullets: [
      "Native Telegram virality",
      "Pay without leaving the chat",
      "Instant PDF delivery",
      "VIP community built in",
    ],
    waTitle: "WhatsApp Flow",
    waBullets: [
      "Where your customers already are (99% of Brazilians)",
      "Catalog + bookings + Flows",
      "Auto-reply + delivery follow-up",
      "Pay via Pix link",
    ],
    syncCaption: "One prompt. Three channels. In sync.",
  },

  trustStrip: {
    items: [
      { number: "500,000+", label: "creators worldwide" },
      { number: "1,000,000+", label: "apps built" },
      { number: "16,000,000,000", label: "lines of AI-generated code" },
    ],
  },

  useCases: {
    h2: "Who is it for?",
    caption:
      "If you create content, sell info-products, or charge monthly — there's a template ready.",
    cards: [
      { id: "coach", title: "Fitness coach", line: "SEO site + VIP bot delivering workouts" },
      { id: "course", title: "Course seller", line: "Landing page + VIP bot delivering modules" },
      { id: "nutri", title: "Nutritionist", line: "Online booking + bot delivering meal plans" },
      { id: "mentor", title: "Mentor / consultant", line: "Site + VIP community + recurring billing" },
    ],
    cardLink: "See template →",
    sitePreviewLabel: "Website",
    tgPreviewLabel: "Telegram Mini App",
  },

  pixComparison: {
    h2: "See how much of your revenue you keep.",
    rows: [
      { name: "Hotmart", commission: "9.9% + R$ 1.00", payout: "2 days", model: "Marketplace", highlight: false },
      { name: "Kiwify", commission: "8.99% + R$ 2.49", payout: "2 days", model: "Marketplace", highlight: false },
      { name: "CodeFlying", commission: "0%", payout: "Your account, your rules", model: "Own channel (SaaS R$ 29/month)", highlight: true },
    ],
    columns: {
      platform: "Platform",
      commission: "Per-sale commission",
      payout: "Payout",
      model: "Model",
    },
    honestNote:
      "We aren't a marketplace — we're SaaS. You use your own payment processor (Mercado Pago, Pagar.me, Stripe — your choice) and the money flows straight to your account. We charge only the fixed SaaS fee.",
    calculator: {
      label: "If you sell R$ {value} per month on Hotmart, you pay...",
      hotmartLabel: "Hotmart charges",
      ourLabel: "CodeFlying charges",
      savingsLabel: "You save per month with CodeFlying",
      footnote:
        "Calculation based on Hotmart's publicly disclosed rate (9.9% + R$ 1 per sale).",
    },
  },

  socialProof: {
    h2: "New in Brazil. With global history.",
    sub:
      "We don't have Brazilian cases yet — we're new here. But take a look at what creators in other markets have already built with CodeFlying.",
    legitimacyHeadline: "We're already serving 500,000+ creators in English.",
    legitimacySub:
      "CodeFlying isn't new — we've been building apps with creators worldwide for years. Brazil is the new chapter. See our English platform live.",
    legitimacyCta: "Visit codeflying.app",
    legitimacyUrl: "https://www.codeflying.app/",
    disclosure:
      "Real cases. CodeFlying is in pre-launch in Brazil — you could be our first Brazilian success story.",
    encountersLabel: "Where to find us:",
    cards: [
      {
        flag: "🇨🇳",
        region: "China",
        kind: "WeChat Mini App",
        quote: "Cosmetics store: ¥2M+/month in sales through a WeChat Mini App built with CodeFlying.",
        metric: "≈ R$ 1.3M/month",
      },
      {
        flag: "🌐",
        region: "Global",
        kind: "Web app",
        quote: "Course platform: 50,000+ active students on the app generated by CodeFlying.",
        metric: "50K users",
      },
      {
        flag: "🇲🇽",
        region: "Mexico",
        kind: "WhatsApp Flow",
        quote: "Restaurant: 3x more orders via a WhatsApp Catalog generated in 10 minutes.",
        metric: "+200% in orders",
      },
    ],
    screenshotPlaceholder: "[Screenshot]",
  },

  pricing: {
    h2: "For those who join first.",
    planLabel: "Early Access plan (first 100)",
    priceLaunch: "R$ 29",
    priceLaunchUnit: "/mo",
    pricePostLaunch: "R$ 49",
    pricePostLaunchSuffix: "after public launch",
    bullets: [
      "Website + Telegram Mini App + WhatsApp Flow",
      "Zero sales commission",
      "Templates built for Brazilian creators",
      "Portuguese support via WhatsApp",
      "LGPD compliant by default",
    ],
    ctaPrimary: "Reserve my spot — R$ 9.90",
    creditNote: "Becomes R$ 50 in credit when we launch",
    paymentNote: "Payment by card (Stripe). Pix in Q3 2026.",
    refundNote: "Full refund within 7 days if you change your mind.",
    ctaSecondary: "Just notify me when it launches (free)",
    spotsRemainingLabel: "{n} spots left of 100",
    spotsFullLabel: "Full list. Drop your email for the next batch.",
    soldOutSub: "Next batch: Q3 2026. We'll let you know when it opens.",
  },

  faq: {
    h2: "Frequently asked questions",
    items: [
      {
        q: "Do I need a CNPJ?",
        a: "No. CodeFlying is a SaaS that delivers the channel (site + Mini App). You can operate as an individual (CPF) or company (CNPJ), your choice.",
      },
      {
        q: "How does the money from my sales reach my account?",
        a: "You connect your own payment processor (Mercado Pago, Pagar.me, or Stripe — your choice). Money flows straight from the sale to the processor, and from the processor to your bank account. CodeFlying does not intermediate your sales payments; we only charge the flat R$ 29/month SaaS fee.",
      },
      {
        q: "How does my CodeFlying subscription payment work?",
        a: "In v1 (pre-launch) we accept credit cards via Stripe. We're integrating native Brazilian Pix for Q3 2026 — that's the public plan. Thanks for your patience: we're new in Brazil and started with the fastest method we could ship safely.",
      },
      {
        q: "Why card and not Pix right now?",
        a: "Honesty first: starting with Pix via an international processor would create more trust friction than just accepting a card. We prefer to start with card and migrate to native Pix when we have a Brazilian CNPJ. Q3 2026.",
      },
      {
        q: "What if Hotmart blocked my account?",
        a: "You can migrate over with your current products when we launch.",
      },
      {
        q: "How long does it take to be ready?",
        a: "10 minutes from start to finish on average (at the Q3 2026 launch).",
      },
      {
        q: "Does it work with WhatsApp too?",
        a: "Yes, day one. We generate Website + Telegram Mini App + WhatsApp Flow from a single prompt. Click any 'WhatsApp' template chip on the hero to see what gets built.",
      },
      {
        q: "What about LGPD?",
        a: "Compliant by default. Designated DPO (dpo@codeflying.app). Subprocessors list published at /privacidade. Explicit consent for cookies and pixels. Data subject rights at /meus-dados.",
      },
      {
        q: "And to protect PDFs from piracy?",
        a: "Individual watermark with buyer identifier (a platform feature available at launch).",
      },
      {
        q: "Is support in Portuguese?",
        a: "Yes, human, via WhatsApp during Brazilian business hours.",
      },
      {
        q: "Is the R$ 9.90 refundable?",
        a: "Yes, within 7 days if you change your mind, refunded straight to the original card via Stripe. After 7 days the R$ 50 credit remains reserved for you to use at launch.",
      },
      {
        q: "When does it officially launch?",
        a: "Q3 2026. The first 100 get in now.",
      },
    ],
  },

  finalCta: {
    h2: "Only 100 spots. R$ 9.90 secures yours.",
    ctaPrimary: "Reserve my spot — R$ 9.90",
    paymentNote: "Payment by card (Stripe). Pix in Q3 2026.",
    ctaSecondary: "Just notify me when it launches (free)",
  },

  footer: {
    columns: {
      brand: {
        tagline: "Build without code. Your own channel. Zero sales commission.",
      },
      product: {
        title: "Product",
        links: [
          { label: "How it works", href: "#dual-output" },
          { label: "Templates", href: "#use-cases" },
          { label: "Pricing", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      company: {
        title: "Company",
        links: [
          { label: "Privacy", href: "/privacidade" },
          { label: "Terms", href: "/termos" },
          { label: "My data (LGPD)", href: "/meus-dados" },
          { label: "Support (WhatsApp)", href: "#whatsapp", whatsapp: true },
        ],
      },
    },
    lgpdLine: "© 2026 CodeFlying · LGPD compliant · DPO: dpo@codeflying.app",
    navAriaLabel: "Main navigation",
  },

  modal: {
    pay: {
      title: "Reserve your spot",
      sub: "The first 100 get in at R$ 29/month flat.",
      fields: {
        name: "Full name",
        email: "Email",
        whatsapp: "WhatsApp",
        useCase: "What do you want to build?",
        useCaseOptions: [
          { value: "coach", label: "Fitness coach" },
          { value: "course", label: "Course seller" },
          { value: "nutri", label: "Nutritionist" },
          { value: "mentor", label: "Mentor / consultant" },
          { value: "other", label: "Other" },
        ],
        lgpd: "I agree to the Privacy Policy",
        lgpdReadLink: "(read)",
      },
      submit: "Reserve my spot — R$ 9.90",
      submitLoading: "Going to checkout...",
      paymentNote: "Payment by card (Stripe). Pix in Q3 2026.",
      errorGeneric: "Something went wrong. Try again.",
      alreadyPaid: "You're already on the list! Taking you to your dashboard →",
    },
    emailOnly: {
      title: "We'll notify you when it launches",
      sub: "No payment, no commitment. Just so you don't miss the launch.",
      submit: "Notify me when it launches",
      submitLoading: "Saving...",
      confirmation:
        "All set! We'll notify you via WhatsApp and here when we launch. In the meantime, follow us on Instagram: @codeflying",
      errorGeneric: "Something went wrong. Try again.",
      alreadyEmailOnly:
        "You're already on our list! We'll notify you when we launch.",
      alreadyPaidUpsell: "You're already in the first batch! See your dashboard →",
      doneTitle: "All set!",
    },
    common: {
      close: "Close",
      required: "Required",
      invalidEmail: "Invalid email",
      invalidWhatsapp: "Invalid WhatsApp — use the format +55...",
    },
  },

  cookies: {
    title: "We use cookies",
    body:
      "We use essential cookies to make the site work, and optional analytics/marketing cookies to understand how to improve. You choose.",
    categories: {
      essential: {
        label: "Essential",
        desc: "Needed for the site to work. Cannot be disabled.",
      },
      analytics: {
        label: "Analytics",
        desc: "To understand how the site is used (Vercel Analytics, GA4).",
      },
      marketing: {
        label: "Marketing",
        desc: "To measure ad performance (Meta, TikTok, Kwai pixels).",
      },
    },
    acceptAll: "Accept all",
    acceptEssential: "Essential only",
    customize: "Customize",
    save: "Save preferences",
  },

  cancelado: {
    title: "Card not authorized",
    body:
      "No problem. Your intent has been recorded. Want to try with a different card?",
    retry: "Try again",
    home: "Back to home",
  },

  painel: {
    welcome: "Welcome, {firstName}! You're in the first batch.",
    welcomeSoft: "Your intent counts. R$ 50 in credit reserved.",
    bookmark: "Save this page: it's the only link to your spot.",
    positionLabel: "Your position in line",
    positionOf: "of 100",
    creditLabel: "Credit accumulated",
    creditValue: "R$ 50 in credit reserved for you",
    statusLabel: "Status",
    statusPaid: "Paid on {date}",
    nextStepsLabel: "Next steps",
    nextSteps: [
      "Q3 2026: official launch",
      "We'll notify you via WhatsApp",
      "Credit applied automatically",
    ],
    refundLabel: "Request refund",
    refundWithinWindow:
      "Refund available for {days} more days.",
    refundExpired:
      "Refund window closed. Your R$ 50 credit remains valid!",
    refundLoading: "Processing...",
    refundConfirming: "Confirm refund",
    refundSuccess:
      "Refund requested. Will appear in your account within 5-10 business days.",
    refundError:
      "We couldn't process the refund automatically. Contact us via WhatsApp.",
    invalidToken: "Invalid or expired link. Sign up again from the main page.",
    homeLink: "Back to home →",
    loading: "Loading...",
    refundedOnDate: "Refunded on {date}",
    softTitleEmailOnly: "All set, {firstName}! You're on our list.",
    softBodyEmailOnly:
      "We'll notify you via WhatsApp and the email you provided when we launch.",
    softBodyIntent:
      "Your payment hasn't been confirmed yet. If you'd like to try again, head back to the main page.",
    survey: {
      title: "What pushed you to reserve your spot?",
      sub: "Tick any that helped you decide. We use this to focus on what matters.",
      factors: [
        { value: "language", label: "It's in Portuguese / Brazilian-first" },
        { value: "whatsapp", label: "WhatsApp Mini App is included" },
        { value: "telegram", label: "Telegram Mini App is included" },
        { value: "other", label: "Other (please specify)" },
      ],
      otherPlaceholder: "Tell us in your own words...",
      submit: "Submit",
      submitLoading: "Saving...",
      thanks: "Thanks! That helps a lot.",
      errorGeneric: "Something went wrong. Try again.",
    },
  },

  obrigado: {
    confirming: "Confirming your payment...",
    confirmingSub: "May take a few seconds. Don't close this page.",
    attempt: "Attempt {n}/{max}",
    paidTitle: "Payment confirmed!",
    paidSub: "Taking you to the dashboard...",
    timeoutTitle: "Payment processing",
    timeoutBody:
      "Your payment is still being verified by Stripe. We'll notify you via WhatsApp as soon as it's confirmed. You can also refresh this page in a few minutes.",
    homeLink: "Back to home",
  },

  meta: {
    htmlLang: "en",
    siteTitle: "CodeFlying — Build your Telegram app + website in 10 minutes",
    siteTitleTemplate: "%s · CodeFlying",
    description:
      "For Brazilian creators: site + Mini App on Telegram, zero sales commission. R$ 29/mo flat. First 100 get in for R$ 9.90.",
    descriptionShort:
      "For Brazilian creators: site + Mini App on Telegram, zero commission. R$ 29/mo flat.",
    twitterTitle: "CodeFlying — Build your app in 10 minutes",
    twitterDescription:
      "Site + Mini App on Telegram. Zero commission. R$ 29/mo. First 100 get in for R$ 9.90.",
  },

  livePreview: {
    captionDesktop: "One prompt. Multiple channels. In sync.",
    captionMobile: "One prompt → site + Telegram + WhatsApp, in sync.",
    browserUrl: "codeflying.app/your-app",
    miniAppBuyLabel: "Buy",
  },

  whatsapp: {
    greeting: "Hi! I came from the CodeFlying site and wanted to know more.",
    navAriaLabelFloating: "Chat on WhatsApp",
  },
} as const;
