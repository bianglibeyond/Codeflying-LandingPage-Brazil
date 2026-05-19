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
    h1Desktop: ["Build your Website + Telegram Mini App + WhatsApp Flow", "in 10 minutes."],
    h1Highlight: "in 10 minutes",
    h1Mobile: ["Website + Telegram Mini App + WhatsApp Flow", "in 10 minutes."],
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
      { id: "bot-vip", label: "Online coaching", icon: "✈️", channel: "tg" },
      { id: "salao", label: "Beauty salon bookings", icon: "💬", channel: "wa" },
    ],
    templatePrompts: {
      infoproduto: "I want to sell my online course with Pix and a VIP group",
      restaurante: "Restaurant menu + WhatsApp orders + delivery booking",
      "bot-vip": "Online coaching with VIP Telegram community + monthly billing",
      salao: "Beauty salon: WhatsApp bookings + reminders",
    },
    ctaPrimary: "Reserve my spot — R$ 9.90",
    ctaValueCallout: "R$ 9.90 today → R$ 50 in launch credit (5× value)",
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
      { id: "coach", title: "Fitness coach", line: "Website + WhatsApp Flow: bookings, workout delivery, reminders", channel: "wa" },
      { id: "course", title: "Course seller", line: "Landing page + Telegram Mini App delivering modules + VIP group", channel: "tg" },
      { id: "nutri", title: "Nutritionist", line: "Website + WhatsApp Flow: bookings, meal plans, check-ins", channel: "wa" },
      { id: "mentor", title: "Mentor / consultant", line: "Website + WhatsApp Flow: scheduling, recurring billing, ongoing support", channel: "wa" },
    ],
    sitePreviewLabel: "Website",
    tgPreviewLabel: "Telegram Mini App",
    waPreviewLabel: "WhatsApp Flow",
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
      "We don't have Brazilian reviews yet — we're new here. But here's what creators around the world are saying about CodeFlying.",
    legitimacyHeadline: "We're already serving 500,000+ creators in English.",
    legitimacySub:
      "CodeFlying isn't new — we've been building apps with creators worldwide for years. Brazil is the new chapter. See our English platform live.",
    legitimacyCta: "Visit codeflying.app",
    legitimacyUrl: "https://www.codeflying.app/",
    disclosure:
      "Real reviews from global users. CodeFlying is in pre-launch in Brazil — you could be our first Brazilian success story.",
    encountersLabel: "Where to find us:",
    reviews: [
      {
        initials: "SK",
        avatarColor: "coral",
        flag: "🇺🇸",
        name: "Sarah K.",
        role: "Online course creator",
        quote:
          "Built my whole course site — landing page, members area, and checkout — in one afternoon. Two months in, running it without touching the code.",
      },
      {
        initials: "CM",
        avatarColor: "telegram",
        flag: "🇪🇸",
        name: "Carlos M.",
        role: "Fitness coach",
        quote:
          "Before CodeFlying I was duct-taping Wix, Calendly and Zapier. Now my whole booking site lives in one place. Cut my monthly tools bill from $187 to $29.",
      },
      {
        initials: "YT",
        avatarColor: "pink",
        flag: "🇯🇵",
        name: "Yuki T.",
        role: "Lifestyle creator",
        quote:
          "I'm not technical at all. I described what I wanted my members area to do, and CodeFlying built it. My subscribers think I hired a dev team.",
      },
    ],
    screenshotPlaceholder: "[Screenshot]",
  },

  pricing: {
    h2: "For those who join first.",
    planLabel: "Early Access plan (first 100)",
    priceLaunch: "R$ 9.90",
    priceLaunchUnit: "today (deposit)",
    creditReturn: "→ R$ 50 in launch credit (5× value)",
    bullets: [
      "Website + Telegram Mini App + WhatsApp Flow",
      "Zero sales commission",
      "Templates built for Brazilian creators",
      "Portuguese support via Discord",
      "LGPD compliant by default",
    ],
    ctaPrimary: "Reserve my spot — R$ 9.90",
    ctaValueCallout: "R$ 9.90 today → R$ 50 in launch credit (5× value)",
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
        a: "Compliant by default. Explicit consent for cookies and pixels. Privacy policy and data subject rights available via the links in our footer.",
      },
      {
        q: "And to protect PDFs from piracy?",
        a: "Individual watermark with buyer identifier (a platform feature available at launch).",
      },
      {
        q: "Is support in Portuguese?",
        a: "Yes, human, via Discord during Brazilian business hours.",
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
    ctaValueCallout: "R$ 9.90 today → R$ 50 in launch credit (5× value)",
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
          { label: "Privacy", href: "https://vvx03gck2p.feishu.cn/wiki/RmK9w8INBiN7i4kaDQUcpxZan1d", external: true },
          { label: "Terms", href: "https://vvx03gck2p.feishu.cn/wiki/VE1qwVSjTirnTSkYlGVcbYMsnze", external: true },
          { label: "My data (LGPD)", href: "/meus-dados" },
          { label: "Support (Discord)", href: "#discord", discord: true },
        ],
      },
    },
    lgpdLine: "© 2025 KUAFUAI Inc. All rights reserved.",
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
        "All set! We'll notify you when we launch.",
      errorGeneric: "Something went wrong. Try again.",
      alreadyEmailOnly:
        "You're already on our list! We'll notify you when we launch.",
      alreadyPaidUpsell: "You're already in the first batch! See your dashboard →",
      doneTitle: "All set!",
      survey: {
        title: "Quick question — what made you sign up?",
        sub: "Tick any that pulled you in. Helps us focus on what matters.",
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
        errorGeneric: "Couldn't save. Try again.",
      },
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
      "We'll notify you when it's time",
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
      "We couldn't process the refund automatically. Contact us via Discord.",
    invalidToken: "Invalid or expired link. Sign up again from the main page.",
    homeLink: "Back to home →",
    loading: "Loading...",
    refundedOnDate: "Refunded on {date}",
    softTitleEmailOnly: "All set, {firstName}! You're on our list.",
    softBodyEmailOnly:
      "We'll notify you via email when we launch.",
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
      "Your payment is still being verified by Stripe. We'll notify you as soon as it's confirmed. You can also refresh this page in a few minutes.",
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
    captionMobile: "One prompt → Website + Telegram Mini App + WhatsApp Flow, in sync.",
    browserUrl: "codeflying.app/your-app",
    miniAppBuyLabel: "Buy",
  },

  discord: {
    navAriaLabelFloating: "Join our Discord",
  },
} as const;
