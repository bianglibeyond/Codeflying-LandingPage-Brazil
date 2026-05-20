/**
 * pt-BR copy constants — single source of truth for all visible page copy.
 * Structurally identical to copy-en.ts. Keep keys in sync.
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
    tagline: "Crie sem código. Seus próprios canais. Sem comissão por venda.",
  },

  nav: {
    ctaPrimary: "Garanta sua vaga — R$ 9,90",
    ctaLogin: "Entrar",
  },

  hero: {
    eyebrow: "Pra criadores e pequenos negócios brasileiros, em português. Cartão agora, Pix em breve.",
    h1Desktop: ["Crie seu site + Telegram Mini App + fluxo no WhatsApp", "em 10 minutos."],
    h1Highlight: "em 10 minutos",
    h1Mobile: ["Site + Telegram Mini App + fluxo no WhatsApp", "em 10 minutos."],
    h1MobileHighlight: "em 10 minutos",
    subDesktop:
      "Descreva sua ideia para a IA. A gente cria site + Telegram Mini App + fluxo no WhatsApp + checkout — tudo a partir de um único prompt. R$ 29/mês fixos. Sem comissão por venda.",
    subMobile: "Site + Telegram Mini App + fluxo no WhatsApp. R$ 29/mês. Sem comissão por venda.",
    promptMicroHint: "O que você quer construir hoje?",
    promptPlaceholders: [
      "Quero vender meu curso online com Pix e grupo VIP no Telegram",
      "Personal trainer: site + Telegram Mini App pra entregar treinos",
      "Restaurante: cardápio + pedidos no WhatsApp + entrega e retirada",
      "Salão de beleza: agendamento no WhatsApp + lembretes + fidelidade",
    ],
    templates: [
      { id: "infoproduto", label: "Loja de infoprodutos", icon: "🌐", channel: "tg" },
      { id: "restaurante", label: "Restaurante + fluxo no WhatsApp", icon: "💬", channel: "wa" },
      { id: "bot-vip", label: "Mentoria online", icon: "✈️", channel: "tg" },
      { id: "salao", label: "Salão de beleza no WhatsApp", icon: "💬", channel: "wa" },
    ],
    templatePrompts: {
      infoproduto: "Quero vender meu curso online com Pix e grupo VIP",
      restaurante: "Cardápio do restaurante + pedidos no WhatsApp + agendamento",
      "bot-vip": "Mentoria online com comunidade VIP no Telegram + assinatura mensal",
      salao: "Salão: agendamento no WhatsApp + lembretes",
    },
    ctaPrimary: "Garantir minha vaga — R$ 9,90",
    ctaValueCallout: "R$ 9,90 agora viram R$ 50 em crédito no lançamento (5× de valor)",
    ctaPaymentNote: "Pagamento por cartão via Stripe. Pix no 3º trimestre de 2026.",
    ctaSecondary: "Quero só ser avisado quando lançar (grátis)",
    ctaTertiary: "Ver demonstração (90s) ↓",
  },

  dualOutput: {
    h2: "Uma ideia. Três canais. Um produto criado pela IA.",
    sub:
      "Enquanto a Hotmart cobra 9,9% como marketplace e a Lovable entrega só um site, a CodeFlying cria o pacote completo: site + Telegram Mini App + fluxo no WhatsApp — nos seus próprios canais, sem comissão por venda.",
    siteTitle: "Site",
    siteBullets: [
      "SEO para aparecer no Google",
      "Captura de leads",
      "Domínio próprio",
      "Analytics",
    ],
    tgTitle: "Telegram Mini App",
    tgBullets: [
      "Compartilhamento fácil dentro do Telegram",
      "Pagamento sem sair da conversa",
      "Entrega instantânea de PDF",
      "Comunidade VIP integrada",
    ],
    waTitle: "Fluxo no WhatsApp",
    waBullets: [
      "Onde seus clientes já estão (99% dos brasileiros)",
      "Catálogo, agendamentos e fluxos automatizados",
      "Resposta automática e acompanhamento da entrega",
      "Pagamento por link Pix",
    ],
    syncCaption: "Um prompt. Três canais. Sincronizados.",
  },

  trustStrip: {
    items: [
      { number: "500.000+", label: "criadores no mundo todo" },
      { number: "1.000.000+", label: "apps já criados" },
      { number: "16.000.000.000", label: "linhas de código geradas por IA" },
    ],
  },

  useCases: {
    h2: "Pra quem é?",
    caption:
      "Se você cria conteúdo, vende infoprodutos ou cobra mensalidade, tem template pronto.",
    cards: [
      {
        id: "coach",
        title: "Personal trainer",
        line: "Site + fluxo no WhatsApp: agendamento, envio de treinos e lembretes",
        channel: "wa",
      },
      {
        id: "course",
        title: "Criador de cursos",
        line: "Página de captura + Telegram Mini App para entregar módulos + grupo VIP",
        channel: "tg",
      },
      {
        id: "nutri",
        title: "Nutricionista",
        line: "Site + fluxo no WhatsApp: agenda, plano alimentar e check-ins",
        channel: "wa",
      },
      {
        id: "mentor",
        title: "Mentor ou consultor",
        line: "Site + fluxo no WhatsApp: agendamento, cobrança recorrente e suporte contínuo",
        channel: "wa",
      },
    ],
    sitePreviewLabel: "Site",
    tgPreviewLabel: "Telegram Mini App",
    waPreviewLabel: "Fluxo no WhatsApp",
  },

  pixComparison: {
    h2: "Veja quanto da sua receita fica no seu bolso.",
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
        payout: "Direto na sua conta",
        model: "Canais próprios (SaaS R$ 29/mês)",
        highlight: true,
      },
    ],
    columns: {
      platform: "Plataforma",
      commission: "Comissão por venda",
      payout: "Recebimento",
      model: "Modelo",
    },
    honestNote:
      "A CodeFlying não é marketplace, é SaaS. Você usa seu próprio processador de pagamento, como Mercado Pago, Pagar.me ou Stripe, e o dinheiro cai direto na sua conta. A gente cobra só a mensalidade fixa.",
    calculator: {
      label: "Se você vende R$ {value} por mês na Hotmart, paga...",
      hotmartLabel: "Hotmart cobra",
      ourLabel: "CodeFlying cobra",
      savingsLabel: "Você economiza por mês com a CodeFlying",
      footnote:
        "Cálculo baseado na taxa pública divulgada pela Hotmart: 9,9% + R$ 1 por venda.",
    },
  },

  socialProof: {
    h2: "Nova no Brasil, mas com história lá fora.",
    sub:
      "Ainda não temos avaliações brasileiras para mostrar, porque estamos chegando agora. Veja o que criadores de outros países falam da CodeFlying.",
    legitimacyHeadline: "Já atendemos mais de 500 mil criadores na versão em inglês.",
    legitimacySub:
      "A CodeFlying não nasceu agora: há anos ajudamos criadores do mundo todo a criar apps. O Brasil é nossa nova fase. Veja a plataforma em inglês funcionando ao vivo.",
    legitimacyCta: "Visitar codeflying.app",
    legitimacyUrl: "https://www.codeflying.app/",
    disclosure:
      "Avaliações reais de usuários de outros países. A CodeFlying está em pré-lançamento no Brasil, e você pode ser um dos nossos primeiros cases brasileiros.",
    encountersLabel: "Onde estamos presentes:",
    reviews: [
      {
        initials: "SK",
        avatarColor: "coral",
        flag: "🇺🇸",
        name: "Sarah K.",
        role: "Criadora de cursos online",
        quote:
          "Criei toda a minha plataforma de curso, com site, área de membros e checkout, em uma tarde. Dois meses depois, tudo rodando sem encostar em código.",
      },
      {
        initials: "CM",
        avatarColor: "telegram",
        flag: "🇪🇸",
        name: "Carlos M.",
        role: "Personal trainer",
        quote:
          "Antes da CodeFlying, eu vivia juntando Wix, Calendly e Zapier. Agora meu agendamento fica todo em um só lugar. Reduzi a conta de ferramentas de US$ 187 para US$ 29 por mês.",
      },
      {
        initials: "YT",
        avatarColor: "pink",
        flag: "🇯🇵",
        name: "Yuki T.",
        role: "Criadora de lifestyle",
        quote:
          "Não sou nada técnica. Descrevi o que queria para a área de membros, e a CodeFlying criou tudo. Minha audiência acha que contratei um time de devs.",
      },
    ],
    screenshotPlaceholder: "[Captura de tela]",
  },

  pricing: {
    h2: "Para quem entrar primeiro.",
    planLabel: "Plano de acesso antecipado (primeiros 100)",
    priceLaunch: "R$ 9,90",
    priceLaunchUnit: "hoje (reserva)",
    creditReturn: "→ R$ 50 em crédito no lançamento (5× de valor)",
    bullets: [
      "Site + Telegram Mini App + fluxo no WhatsApp",
      "Sem comissão por venda",
      "Templates para criadores brasileiros",
      "Suporte em português via Discord",
      "Em conformidade com a LGPD desde o início",
    ],
    ctaPrimary: "Garantir minha vaga — R$ 9,90",
    ctaValueCallout: "R$ 9,90 agora viram R$ 50 em crédito no lançamento (5× de valor)",
    creditNote: "Viram R$ 50 de crédito quando lançarmos",
    paymentNote: "Pagamento por cartão via Stripe. Pix no 3º trimestre de 2026.",
    refundNote: "Reembolso integral em 7 dias se desistir.",
    ctaSecondary: "Quero só ser avisado quando lançar (grátis)",
    spotsRemainingLabel: "Restam {n} vagas de 100",
    spotsFullLabel: "Lista cheia. Deixe seu e-mail para a próxima leva.",
    soldOutSub: "Próximo lote: 3º trimestre de 2026. A gente te avisa quando abrir.",
  },

  faq: {
    h2: "Perguntas frequentes",
    items: [
      {
        q: "Preciso ter CNPJ?",
        a: "Não. A CodeFlying é um SaaS que cria seus canais de venda, como site e Mini App. Você opera com CPF ou CNPJ, como preferir.",
      },
      {
        q: "Como o dinheiro das minhas vendas chega na minha conta?",
        a: "Você conecta seu próprio processador de pagamento, como Mercado Pago, Pagar.me ou Stripe. O dinheiro vai da venda para o processador e depois cai na sua conta bancária. A CodeFlying não intermedia suas vendas; cobramos só a mensalidade fixa de R$ 29/mês.",
      },
      {
        q: "Como pago minha assinatura da CodeFlying?",
        a: "Na versão de pré-lançamento, aceitamos cartão de crédito via Stripe. Estamos trabalhando para oferecer Pix no 3º trimestre de 2026. Começamos pelo método mais rápido de implementar com segurança enquanto estruturamos a operação no Brasil.",
      },
      {
        q: "Por que cartão e não Pix agora?",
        a: "Transparência: começar com Pix usando um processador internacional poderia gerar mais atrito de confiança do que aceitar cartão. Preferimos começar com cartão e oferecer Pix quando tivermos CNPJ no Brasil, previsto para o 3º trimestre de 2026.",
      },
      {
        q: "E se minha conta na Hotmart foi bloqueada?",
        a: "Você pode migrar pra cá com seus produtos atuais quando lançarmos.",
      },
      {
        q: "Quanto tempo leva pra ficar pronto?",
        a: "10 minutos do início ao fim, em média (no lançamento do 3º trimestre de 2026).",
      },
      {
        q: "Funciona com WhatsApp também?",
        a: "Sim, desde o primeiro dia. Geramos site + Telegram Mini App + fluxo no WhatsApp a partir de um único prompt. Clique em qualquer template de WhatsApp no topo da página para ver o resultado.",
      },
      {
        q: "Como fica a LGPD?",
        a: "A plataforma já nasce em conformidade com a LGPD: consentimento explícito para cookies e pixels, política de privacidade e direitos do titular disponíveis nos links do rodapé.",
      },
      {
        q: "E para proteger PDFs contra pirataria?",
        a: "Marca d'água individual com identificador do comprador, disponível no lançamento.",
      },
      {
        q: "Suporte é em português?",
        a: "Sim, com atendimento humano via Discord em horário comercial do Brasil.",
      },
      {
        q: "R$ 9,90 é reembolsável?",
        a: "Sim. Você pode pedir reembolso em até 7 dias, processado no cartão original via Stripe. Depois desse prazo, os R$ 50 de crédito ficam reservados para você usar no lançamento.",
      },
      {
        q: "Quando lança oficialmente?",
        a: "No 3º trimestre de 2026. Os primeiros 100 entram agora.",
      },
    ],
  },

  finalCta: {
    h2: "São só 100 vagas. R$ 9,90 garantem a sua.",
    ctaPrimary: "Garantir minha vaga — R$ 9,90",
    ctaValueCallout: "R$ 9,90 agora viram R$ 50 em crédito no lançamento (5× de valor)",
    paymentNote: "Pagamento por cartão via Stripe. Pix no 3º trimestre de 2026.",
    ctaSecondary: "Quero só ser avisado quando lançar (grátis)",
  },

  footer: {
    columns: {
      brand: {
        tagline: "Crie sem código. Seus próprios canais. Sem comissão por venda.",
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
          { label: "Privacidade", href: "https://vvx03gck2p.feishu.cn/wiki/RmK9w8INBiN7i4kaDQUcpxZan1d", external: true },
          { label: "Termos", href: "https://vvx03gck2p.feishu.cn/wiki/VE1qwVSjTirnTSkYlGVcbYMsnze", external: true },
          { label: "Suporte (Discord)", href: "#discord", discord: true },
        ],
      },
    },
    lgpdLine: "© 2025 KUAFUAI Inc. Todos os direitos reservados.",
    navAriaLabel: "Navegação principal",
  },

  modal: {
    pay: {
      title: "Garanta sua vaga",
      sub: "Os primeiros 100 garantem o preço fixo de R$ 29/mês.",
      fields: {
        name: "Nome completo",
        email: "E-mail",
        whatsapp: "WhatsApp",
        useCase: "O que você quer construir?",
        useCaseOptions: [
          { value: "coach", label: "Personal trainer" },
          { value: "course", label: "Criador de cursos" },
          { value: "nutri", label: "Nutricionista" },
          { value: "mentor", label: "Mentor ou consultor" },
          { value: "other", label: "Outro" },
        ],
        lgpd: "Concordo com a Política de Privacidade",
        lgpdReadLink: "(ler)",
      },
      submit: "Garantir minha vaga — R$ 9,90",
      submitLoading: "Levando você para o checkout...",
      paymentNote: "Pagamento por cartão via Stripe. Pix no 3º trimestre de 2026.",
      errorGeneric: "Tivemos um problema. Tente de novo.",
      alreadyPaid: "Você já está na lista! Levando você para o seu painel →",
    },
    emailOnly: {
      title: "A gente te avisa quando lançar",
      sub: "Sem pagamento, sem compromisso. Só pra você não perder o lançamento.",
      submit: "Me avisar quando lançar",
      submitLoading: "Salvando...",
      confirmation:
        "Beleza! A gente te avisa quando lançar.",
      errorGeneric: "Tivemos um problema. Tente de novo.",
      alreadyEmailOnly:
        "Você já está na nossa lista! A gente te avisa quando lançar.",
      alreadyPaidUpsell:
        "Você já está na primeira leva! Veja seu painel →",
      doneTitle: "Pronto!",
      survey: {
        title: "Pergunta rápida — o que te fez se cadastrar?",
        sub: "Marque tudo que chamou sua atenção. Isso ajuda a gente a focar no que importa.",
        factors: [
          { value: "language", label: "É em português / focado no Brasil" },
          { value: "whatsapp", label: "Inclui fluxo no WhatsApp" },
          { value: "telegram", label: "Inclui Telegram Mini App" },
          { value: "other", label: "Outro (especifique)" },
        ],
        otherPlaceholder: "Conta pra gente com suas palavras...",
        submit: "Enviar",
        submitLoading: "Salvando...",
        thanks: "Valeu! Isso ajuda muito.",
        errorGeneric: "Não conseguimos salvar. Tente de novo.",
      },
    },
    common: {
      close: "Fechar",
      required: "Obrigatório",
      invalidEmail: "E-mail inválido",
      invalidWhatsapp: "WhatsApp inválido — use o formato +55...",
    },
  },

  cookies: {
    title: "A gente usa cookies",
    body:
      "Usamos cookies essenciais para o site funcionar e cookies opcionais de análise e marketing para melhorar sua experiência. Você escolhe.",
    categories: {
      essential: {
        label: "Essenciais",
        desc: "Necessários para o site funcionar. Não podem ser desativados.",
      },
      analytics: {
        label: "Análise",
        desc: "Para entender como o site é usado, com Vercel Analytics e GA4.",
      },
      marketing: {
        label: "Marketing",
        desc: "Para medir o desempenho dos anúncios, com pixels da Meta, TikTok e Kwai.",
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
      "Sem problemas! Sua intenção já está registrada. Quer tentar com outro cartão?",
    retry: "Tentar de novo",
    home: "Voltar para o início",
  },

  painel: {
    welcome: "Bem-vindo, {firstName}! Você entrou na primeira leva.",
    welcomeSoft: "Seu interesse conta. R$ 50 de crédito reservados para você.",
    bookmark:
      "Salve esta página: este é o único link da sua vaga.",
    positionLabel: "Sua posição na fila",
    positionOf: "de 100 vagas",
    creditLabel: "Crédito acumulado",
    creditValue: "R$ 50 de crédito reservado pra você",
    statusLabel: "Status",
    statusPaid: "Pago em {date}",
    nextStepsLabel: "Próximos passos",
    nextSteps: [
      "3º trimestre de 2026: lançamento oficial",
      "Vamos te avisar quando chegar a hora",
      "Crédito aplicado automaticamente no lançamento",
    ],
    refundLabel: "Solicitar reembolso",
    refundWithinWindow:
      "Reembolso disponível por mais {days} dias.",
    refundExpired:
      "O prazo de reembolso acabou. Seus R$ 50 de crédito continuam válidos!",
    refundLoading: "Processando...",
    refundConfirming: "Confirmar reembolso",
    refundSuccess:
      "Reembolso solicitado. O valor deve aparecer na sua conta em até 5 a 10 dias úteis.",
    refundError:
      "Não conseguimos processar o reembolso automaticamente. Entre em contato pelo Discord.",
    invalidToken: "Link inválido ou expirado. Entre de novo pela página principal.",
    homeLink: "Voltar para o início →",
    loading: "Carregando...",
    refundedOnDate: "Reembolsado em {date}",
    softTitleEmailOnly: "Beleza, {firstName}! Você está na nossa lista.",
    softBodyEmailOnly:
      "Vamos te avisar pelo e-mail cadastrado quando lançarmos.",
    softBodyIntent:
      "Seu pagamento ainda não foi confirmado. Para tentar novamente, volte para a página principal.",
    survey: {
      title: "O que te fez garantir sua vaga?",
      sub: "Marque tudo o que ajudou você a decidir. A gente usa isso para focar no que importa.",
      factors: [
        { value: "language", label: "É em português / focado no Brasil" },
        { value: "whatsapp", label: "Inclui fluxo no WhatsApp" },
        { value: "telegram", label: "Inclui Telegram Mini App" },
        { value: "other", label: "Outro (especifique)" },
      ],
      otherPlaceholder: "Conta pra gente com suas palavras...",
      submit: "Enviar",
      submitLoading: "Salvando...",
      thanks: "Valeu! Isso ajuda muito.",
      errorGeneric: "Tivemos um problema. Tente de novo.",
    },
  },

  obrigado: {
    confirming: "Confirmando seu pagamento...",
    confirmingSub: "Pode levar alguns segundos. Não feche esta página.",
    attempt: "Tentativa {n}/{max}",
    paidTitle: "Pagamento confirmado!",
    paidSub: "Levando você para o painel...",
    timeoutTitle: "Pagamento em processamento",
    timeoutBody:
      "Seu pagamento ainda está sendo verificado pela Stripe. Vamos te avisar assim que for confirmado. Você também pode atualizar esta página em alguns minutos.",
    homeLink: "Voltar para o início",
  },

  meta: {
    htmlLang: "pt-BR",
    siteTitle: "CodeFlying — Crie seu site e app no Telegram em 10 minutos",
    siteTitleTemplate: "%s · CodeFlying",
    description:
      "Para criadores brasileiros: site + Mini App no Telegram + fluxo no WhatsApp, sem comissão por venda. R$ 29/mês fixos. Os primeiros 100 entram por R$ 9,90.",
    descriptionShort:
      "Para criadores brasileiros: site + Mini App no Telegram + fluxo no WhatsApp, sem comissão. R$ 29/mês fixos.",
    twitterTitle: "CodeFlying — Crie seu app em 10 minutos",
    twitterDescription:
      "Site + Mini App no Telegram + fluxo no WhatsApp. Sem comissão. R$ 29/mês. Os primeiros 100 entram por R$ 9,90.",
  },

  livePreview: {
    captionDesktop: "Um prompt. Vários canais sincronizados.",
    captionMobile: "Um prompt → site + Telegram Mini App + fluxo no WhatsApp, sincronizados.",
    browserUrl: "codeflying.app/seu-app",
    miniAppBuyLabel: "Comprar",
  },

  discord: {
    navAriaLabelFloating: "Entrar no Discord",
  },
} as const;
