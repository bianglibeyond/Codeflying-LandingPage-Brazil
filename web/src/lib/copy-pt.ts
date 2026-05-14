/**
 * pt-BR copy constants — single source of truth for all visible page copy.
 * Reviewed by native pt-BR speaker before launch (see PLAN.md §10 Day 7).
 *
 * Banned phrases (NEVER use, see PLAN §5.0a):
 * - "Pix nativo" / "Pix direto"
 * - "Sem limite"
 * - "a gente não toca no seu dinheiro"
 * - "Sem congelar sua conta"
 * - "Pix integrado" / "Receba com Pix"
 */

export const copy = {
  brand: {
    name: "CodeFlying",
    tagline: "Crie sem código. Canal próprio. Sem comissão sobre venda.",
  },

  nav: {
    ctaPrimary: "Garantir vaga — R$ 9,90",
    ctaLogin: "Entrar",
  },

  hero: {
    eyebrow: "Pra criadores e SMBs brasileiros, em português. Cartão hoje, Pix em breve.",
    h1Desktop: ["Crie seu site + Telegram + WhatsApp", "em 10 minutos."],
    h1Highlight: "em 10 minutos",
    h1Mobile: ["Site + Telegram + WhatsApp", "em 10 minutos."],
    h1MobileHighlight: "em 10 minutos",
    subDesktop:
      "Descreva sua ideia pra IA. A gente entrega Website + Telegram Mini App + WhatsApp Flow + checkout — tudo de um prompt. R$ 29/mês fixo. Sem comissão sobre venda.",
    subMobile:
      "Website + Telegram Mini App + WhatsApp Flow. R$ 29/mês. Sem comissão sobre venda.",
    promptMicroHint: "O que você quer construir hoje?",
    promptPlaceholders: [
      "Quero vender meu curso online com Pix e grupo VIP no Telegram",
      "Coach de academia: Website + Telegram Mini App pra entregar treinos",
      "Restaurante: cardápio + pedidos no WhatsApp + agendamento de delivery",
      "Salão de beleza: agendamento no WhatsApp + lembretes + fidelidade",
    ],
    templates: [
      { id: "infoproduto", label: "Loja de infoproduto", icon: "🌐", channel: "tg" },
      { id: "restaurante", label: "Restaurante + WhatsApp Flow", icon: "💬", channel: "wa" },
      { id: "bot-vip", label: "Telegram Mini App VIP", icon: "✈️", channel: "tg" },
      { id: "salao", label: "Salão de beleza no WhatsApp", icon: "💬", channel: "wa" },
      { id: "mentoria", label: "Site de mentoria com agenda", icon: "🌐", channel: "tg" },
      { id: "loja-retail", label: "Catálogo da loja", icon: "💬", channel: "wa" },
      { id: "loja-tg", label: "Loja Telegram Mini App", icon: "✈️", channel: "tg" },
      { id: "b2b", label: "Funil B2B no WhatsApp", icon: "💬", channel: "wa" },
      { id: "captura", label: "Página de captura", icon: "🌐", channel: "tg" },
    ],
    templatePrompts: {
      infoproduto: "Quero vender meu curso online com Pix e grupo VIP",
      "bot-vip": "Telegram Mini App VIP com cobrança recorrente",
      mentoria: "Site de mentoria com agenda e cobrança mensal",
      "loja-tg": "Loja Telegram Mini App com catálogo e checkout",
      captura: "Página de captura pra meu lead magnet",
      restaurante: "Cardápio do restaurante + pedidos no WhatsApp + agendamento",
      salao: "Salão: agendamento no WhatsApp + lembretes",
      "loja-retail": "Catálogo da loja + checkout no WhatsApp",
      b2b: "Funil B2B + follow-up no WhatsApp",
    },
    ctaPrimary: "Garantir minha vaga — R$ 9,90",
    ctaPaymentNote: "Pagamento via cartão (Stripe). Pix em Q3 2026.",
    ctaSecondary: "Só quero ser avisado quando lançar (grátis)",
    ctaTertiary: "Ver demo (90s) ↓",
  },

  dualOutput: {
    h2: "Mesma ideia. Três canais. Um único produto criado pela IA.",
    sub:
      "Enquanto a Hotmart cobra 9,9% como marketplace e a Lovable te dá só site, a CodeFlying entrega o pacote completo: Website + Telegram Mini App + WhatsApp Flow — nos seus canais próprios, sem comissão sobre venda.",
    siteTitle: "Website",
    siteBullets: [
      "SEO (Google encontra)",
      "Captura de leads",
      "Domínio próprio",
      "Analytics",
    ],
    tgTitle: "Telegram Mini App",
    tgBullets: [
      "Viralização nativa do Telegram",
      "Pagamento sem sair do chat",
      "Entrega instantânea de PDF",
      "Comunidade VIP integrada",
    ],
    waTitle: "WhatsApp Flow",
    waBullets: [
      "Onde seus clientes já estão (99% dos brasileiros)",
      "Catálogo + agendamento + Flows",
      "Auto-resposta + follow-up de entrega",
      "Pagamento via link Pix",
    ],
    syncCaption: "Um prompt. Três canais. Sincronizados.",
  },

  trustStrip: {
    items: [
      { number: "500.000+", label: "criadores no mundo" },
      { number: "1.000.000+", label: "apps já criados" },
      { number: "16.000.000.000", label: "linhas de código IA" },
    ],
  },

  useCases: {
    h2: "Pra quem é?",
    caption:
      "Se você cria conteúdo, vende infoproduto, ou cobra por mês — tem template pronto.",
    cards: [
      {
        id: "coach",
        title: "Coach fitness",
        line: "Site SEO + bot VIP entregando treino",
      },
      {
        id: "course",
        title: "Vendedor de cursos",
        line: "Página de captura + bot VIP entregando módulos",
      },
      {
        id: "nutri",
        title: "Nutricionista",
        line: "Agenda online + bot entregando plano",
      },
      {
        id: "mentor",
        title: "Mentor / consultor",
        line: "Site + comunidade VIP + cobrança recorrente",
      },
    ],
    cardLink: "Ver template →",
    sitePreviewLabel: "Website",
    tgPreviewLabel: "Telegram Mini App",
  },

  pixComparison: {
    h2: "Veja quanto da sua receita fica com você.",
    rows: [
      {
        name: "Hotmart",
        commission: "9,9% + R$ 1,00",
        payout: "2 dias",
        model: "Marketplace",
        highlight: false,
      },
      {
        name: "Kiwify",
        commission: "8,99% + R$ 2,49",
        payout: "2 dias",
        model: "Marketplace",
        highlight: false,
      },
      {
        name: "CodeFlying",
        commission: "0%",
        payout: "Sua conta, seu controle",
        model: "Canal próprio (SaaS R$ 29/mês)",
        highlight: true,
      },
    ],
    columns: {
      platform: "Plataforma",
      commission: "Comissão por venda",
      payout: "Saque",
      model: "Modelo",
    },
    honestNote:
      "Não somos marketplace — somos SaaS. Você usa seu próprio processador de pagamento (Mercado Pago, Pagar.me, Stripe — escolha sua) e o dinheiro flui direto pra sua conta. A gente cobra só o SaaS fixo.",
    calculator: {
      label: "Se você vende R$ {value} por mês na Hotmart, você paga...",
      hotmartLabel: "Hotmart cobra",
      ourLabel: "CodeFlying cobra",
      savingsLabel: "Você economiza por mês com a CodeFlying",
      footnote:
        "Cálculo baseado na taxa pública divulgada da Hotmart (9,9% + R$1 por venda).",
    },
  },

  socialProof: {
    h2: "Nova no Brasil. Mas com história global.",
    sub:
      "Ainda não temos cases brasileiros pra mostrar — somos novos aqui. Mas veja o que criadores em outros mercados já construíram com a CodeFlying.",
    legitimacyLabel: "Confira nossas operações em outros mercados:",
    legitimacyLinks: [
      {
        flag: "🌐",
        url: "https://www.codeflying.app/",
        label: "codeflying.app",
        context: "Site global em inglês",
      },
    ],
    disclosure:
      "Casos reais. CodeFlying está em pré-lançamento no Brasil — você pode ser nosso primeiro caso brasileiro de sucesso.",
    encountersLabel: "Onde nos encontramos:",
    cards: [
      {
        flag: "🇨🇳",
        region: "China",
        kind: "WeChat Mini App",
        quote: "Loja de cosméticos: ¥2M+/mês em vendas pelo WeChat Mini App, criado com CodeFlying.",
        metric: "Equivalente a R$ 1,3M/mês",
      },
      {
        flag: "🌐",
        region: "Global",
        kind: "Web app",
        quote: "Plataforma de cursos: 50.000+ alunos ativos no app gerado pela CodeFlying.",
        metric: "50K usuários",
      },
      {
        flag: "🇲🇽",
        region: "México",
        kind: "WhatsApp Flow",
        quote: "Restaurante: 3x mais pedidos via WhatsApp Catalog gerado em 10 minutos.",
        metric: "+200% em pedidos",
      },
    ],
    screenshotPlaceholder: "[Screenshot]",
  },

  pricing: {
    h2: "Pra quem entra primeiro.",
    planLabel: "Plano Early Access (primeiros 100)",
    priceLaunch: "R$ 29",
    priceLaunchUnit: "/mês",
    pricePostLaunch: "R$ 49",
    pricePostLaunchSuffix: "depois do lançamento",
    bullets: [
      "Website + Telegram Mini App + WhatsApp Flow",
      "Sem comissão sobre venda",
      "Templates pra creator brasileiro",
      "Suporte em português via WhatsApp",
      "LGPD compliant by default",
    ],
    ctaPrimary: "Garantir minha vaga — R$ 9,90",
    creditNote: "Vira R$ 50 de crédito quando lançarmos",
    paymentNote: "Pagamento via cartão (Stripe). Pix em Q3 2026.",
    refundNote: "Reembolso integral em 7 dias se desistir.",
    ctaSecondary: "Só quero ser avisado quando lançar (grátis)",
    spotsRemainingLabel: "Restam {n} vagas de 100",
    spotsFullLabel: "Lista cheia. Deixa seu email pra próxima leva.",
    soldOutSub: "Próximo lote: Q3 2026. Te avisamos quando abrir.",
  },

  faq: {
    h2: "Perguntas frequentes",
    items: [
      {
        q: "Preciso ter CNPJ?",
        a: "Não. O CodeFlying é um SaaS que entrega o canal (site + Mini App). Você opera com CPF ou CNPJ, como preferir.",
      },
      {
        q: "Como o dinheiro das minhas vendas chega na minha conta?",
        a: "Você conecta seu próprio processador de pagamento (Mercado Pago, Pagar.me, ou Stripe — sua escolha). O dinheiro flui direto da venda pro processador, e do processador pra sua conta bancária. A CodeFlying não intermedia o pagamento das suas vendas; cobramos só o SaaS fixo de R$ 29/mês.",
      },
      {
        q: "Como é o pagamento da minha assinatura CodeFlying?",
        a: "Em v1 (pré-lançamento), aceitamos cartão de crédito via Stripe. Estamos integrando Pix nativo brasileiro para Q3 2026 — esse é o plano público. Pedimos sua paciência: estamos novos no Brasil e começamos pelo método mais rápido de implementar com segurança.",
      },
      {
        q: "Por que cartão e não Pix agora?",
        a: "Honestidade primeiro: começar com Pix via processador internacional traz mais atrito de confiança do que aceitar cartão direto. Preferimos começar com cartão e migrar pra Pix nativo quando tivermos CNPJ brasileiro. Q3 2026.",
      },
      {
        q: "E se a Hotmart bloqueou minha conta?",
        a: "Você pode migrar pra cá com seus produtos atuais quando lançarmos.",
      },
      {
        q: "Quanto tempo leva pra ficar pronto?",
        a: "10 minutos do início ao fim, em média (no lançamento Q3 2026).",
      },
      {
        q: "Funciona com WhatsApp também?",
        a: "Sim, no dia 1. Geramos Website + Telegram Mini App + WhatsApp Flow a partir de um único prompt. Clique em qualquer template 'WhatsApp' no topo da página para ver o que é gerado.",
      },
      {
        q: "Como fica a LGPD?",
        a: "Conformidade por padrão. DPO designado (dpo@codeflying.app). Lista de subprocessadores publicada em /privacidade. Consentimento explícito para cookies e pixels. Direitos do titular em /meus-dados.",
      },
      {
        q: "E pra proteger PDF de pirataria?",
        a: "Marca d'água individual com identificador do comprador (recurso da plataforma no lançamento).",
      },
      {
        q: "Suporte é em português?",
        a: "Sim, humano, via WhatsApp em horário comercial BR.",
      },
      {
        q: "R$ 9,90 é reembolsável?",
        a: "Sim, em 7 dias se desistir, processado direto pelo cartão original via Stripe. Após 7 dias, R$ 50 de crédito permanece reservado pra você usar no lançamento.",
      },
      {
        q: "Quando lança oficialmente?",
        a: "Q3 2026. Os primeiros 100 entram agora.",
      },
    ],
  },

  finalCta: {
    h2: "Só 100 vagas. R$ 9,90 garante a sua.",
    ctaPrimary: "Garantir minha vaga — R$ 9,90",
    paymentNote: "Pagamento via cartão (Stripe). Pix em Q3 2026.",
    ctaSecondary: "Só quero ser avisado quando lançar (grátis)",
  },

  footer: {
    columns: {
      brand: {
        tagline: "Crie sem código. Canal próprio. Sem comissão sobre venda.",
      },
      product: {
        title: "Produto",
        links: [
          { label: "Como funciona", href: "#dual-output" },
          { label: "Templates", href: "#use-cases" },
          { label: "Preço", href: "#pricing" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      company: {
        title: "Empresa",
        links: [
          { label: "Privacidade", href: "/privacidade" },
          { label: "Termos", href: "/termos" },
          { label: "Meus dados (LGPD)", href: "/meus-dados" },
          { label: "Suporte (WhatsApp)", href: "#whatsapp", whatsapp: true },
        ],
      },
    },
    lgpdLine: "© 2026 CodeFlying · Em conformidade com a LGPD · DPO: dpo@codeflying.app",
    navAriaLabel: "Navegação principal",
  },

  modal: {
    pay: {
      title: "Garantir sua vaga",
      sub: "Os primeiros 100 entram por R$ 29/mês fixo.",
      fields: {
        name: "Nome completo",
        email: "Email",
        whatsapp: "WhatsApp",
        useCase: "O que você quer construir?",
        useCaseOptions: [
          { value: "coach", label: "Coach fitness" },
          { value: "course", label: "Vendedor de cursos" },
          { value: "nutri", label: "Nutricionista" },
          { value: "mentor", label: "Mentor / consultor" },
          { value: "other", label: "Outro" },
        ],
        lgpd: "Concordo com a Política de Privacidade",
        lgpdReadLink: "(ler)",
      },
      submit: "Garantir minha vaga — R$ 9,90",
      submitLoading: "Indo pro checkout...",
      paymentNote: "Pagamento via cartão (Stripe). Pix em Q3 2026.",
      errorGeneric: "Tivemos um problema. Tente de novo.",
      alreadyPaid: "Você já está na lista! Levando você para a sua dashboard →",
    },
    emailOnly: {
      title: "Te avisamos quando lançar",
      sub: "Sem pagamento, sem compromisso. Só pra você não perder o lançamento.",
      submit: "Me avisar quando lançar",
      submitLoading: "Salvando...",
      confirmation:
        "Beleza! Te avisaremos pelo WhatsApp e por aqui quando lançar. Enquanto isso, segue a gente no Instagram: @codeflying",
      errorGeneric: "Tivemos um problema. Tente de novo.",
      alreadyEmailOnly:
        "Você já está na nossa lista! Te avisaremos quando lançar.",
      alreadyPaidUpsell:
        "Você já está na primeira leva! Veja sua dashboard →",
      doneTitle: "Pronto!",
    },
    common: {
      close: "Fechar",
      required: "Obrigatório",
      invalidEmail: "Email inválido",
      invalidWhatsapp: "WhatsApp inválido — use o formato +55...",
    },
  },

  cookies: {
    title: "A gente usa cookies",
    body:
      "Usamos cookies essenciais pra fazer o site funcionar, e cookies opcionais de analytics/marketing pra entender como melhorar. Você escolhe.",
    categories: {
      essential: {
        label: "Essenciais",
        desc: "Necessários pro site funcionar. Não desligáveis.",
      },
      analytics: {
        label: "Analytics",
        desc: "Pra entender como o site é usado (Vercel Analytics, GA4).",
      },
      marketing: {
        label: "Marketing",
        desc: "Pra medir performance de anúncios (Meta, TikTok, Kwai pixels).",
      },
    },
    acceptAll: "Aceitar todos",
    acceptEssential: "Só essenciais",
    customize: "Personalizar",
    save: "Salvar preferências",
  },

  cancelado: {
    title: "Cartão não autorizado",
    body:
      "Sem problema. Sua intenção ficou registrada. Quer tentar com outro cartão?",
    retry: "Tentar de novo",
    home: "Voltar pra home",
  },

  painel: {
    welcome: "Bem-vindo, {firstName}! Você entrou pra primeira leva.",
    welcomeSoft: "Sua intenção conta. R$ 50 de crédito reservados.",
    bookmark:
      "Salve esta página: é o único link pra sua vaga.",
    positionLabel: "Sua posição na fila",
    positionOf: "de 100",
    creditLabel: "Crédito acumulado",
    creditValue: "R$ 50 de crédito reservado pra você",
    referralLabel: "Código de indicação",
    referralCopy: "Copiar link",
    referralCopied: "Copiado!",
    referralHelp:
      "Indique amigos e ganhe R$ 50 a mais por indicação que pagar.",
    statusLabel: "Status",
    statusPaid: "Pago em {date}",
    nextStepsLabel: "Próximos passos",
    nextSteps: [
      "Q3 2026: lançamento oficial",
      "Você é notificado via WhatsApp",
      "Crédito aplicado automaticamente",
    ],
    shareLabel: "Compartilhe sua vaga",
    shareWhatsapp: "WhatsApp",
    shareInstagram: "Instagram",
    shareTelegram: "Telegram",
    refundLabel: "Solicitar reembolso",
    refundWithinWindow:
      "Reembolso disponível por mais {days} dias.",
    refundExpired:
      "Janela de reembolso fechou. Seu R$ 50 de crédito continua válido!",
    refundLoading: "Processando...",
    refundConfirming: "Confirmar reembolso",
    refundSuccess:
      "Reembolso solicitado. Aparece na sua conta em até 5-10 dias úteis.",
    refundError:
      "Não conseguimos processar o reembolso automaticamente. Entre em contato pelo WhatsApp.",
    invalidToken: "Link inválido ou expirado. Entre de novo pela página principal.",
    homeLink: "Voltar pra home →",
    loading: "Carregando...",
    refundedOnDate: "Reembolsado em {date}",
    softTitleEmailOnly: "Beleza, {firstName}! Você está na nossa lista.",
    softBodyEmailOnly:
      "Vamos te avisar pelo WhatsApp e pelo email cadastrado quando lançarmos.",
    softBodyIntent:
      "Seu pagamento ainda não foi confirmado. Caso queira tentar novamente, volte pra página principal.",
  },

  obrigado: {
    confirming: "Confirmando seu pagamento...",
    confirmingSub: "Pode levar uns segundos. Não feche essa página.",
    attempt: "Tentativa {n}/{max}",
    paidTitle: "Pagamento confirmado!",
    paidSub: "Levando você pra dashboard...",
    timeoutTitle: "Pagamento processando",
    timeoutBody:
      "Seu pagamento ainda está sendo verificado pelo Stripe. Vamos te avisar pelo WhatsApp assim que confirmarmos. Você também pode tentar atualizar esta página em alguns minutos.",
    homeLink: "Voltar pra home",
  },

  meta: {
    htmlLang: "pt-BR",
    siteTitle: "CodeFlying — Crie seu app no Telegram + site em 10 minutos",
    siteTitleTemplate: "%s · CodeFlying",
    description:
      "Pra criadores brasileiros: Website + Telegram Mini App + WhatsApp Flow, sem comissão sobre venda. R$ 29/mês fixo. Os primeiros 100 entram por R$ 9,90.",
    descriptionShort:
      "Pra criadores brasileiros: Website + Telegram Mini App + WhatsApp Flow, sem comissão. R$ 29/mês fixo.",
    twitterTitle: "CodeFlying — Crie seu app em 10 minutos",
    twitterDescription:
      "Website + Telegram Mini App + WhatsApp Flow. Sem comissão. R$ 29/mês. Os primeiros 100 entram por R$ 9,90.",
  },

  livePreview: {
    captionDesktop: "Um prompt. Vários canais. Sincronizados.",
    captionMobile: "Um prompt → site + Telegram + WhatsApp, sincronizados.",
    browserUrl: "codeflying.app/seu-app",
    miniAppBuyLabel: "Comprar",
  },

  whatsapp: {
    greeting: "Olá! Vim do site da CodeFlying e queria saber mais.",
    navAriaLabelFloating: "Conversar no WhatsApp",
  },

  shareTemplates: {
    referralMessage:
      "Acabei de garantir minha vaga na CodeFlying — IA que cria Website + Telegram Mini App + WhatsApp Flow em 10 minutos. Pega a sua: {link}",
  },
} as const;
