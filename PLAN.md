# CodeFlying Brazil — Landing Page Plan

**Goal:** Test PMF for "AI-native dual-output (website + Telegram Mini App) zero-code builder for Brazilian digital creators" via a R$1-deposit whitelist.

**Stack:** Next.js 16 (App Router) on Vercel · pt-BR-only · FastAPI on Railway · **Stripe Cards-only in v1** (R$9,90 deposit → R$50 future credit; Pix is Q3 2026 / Phase 2) · Postgres on Railway

---

## 1. Strategic frame (carry into every design decision)

| Dimension | Decision | Why |
|---|---|---|
| **Wedge** | Dual-output: website **+ Telegram Mini App**, generated from one prompt | This is the only thing Lovable/Base44/Hotmart can't claim today. It's the wedge. |
| **Primary positioning** | "Crie seu app no Telegram + site em 10 minutos. Sem comissão sobre venda." | Anti-Hotmart on the fee math (defensible claim) — NOT on account freezes (unsubstantiated accusation). Reposition as "canal próprio + sem comissão" rather than direct attack. |
| **Audience** | BR digital creators, 25-40, SP/RJ/BH/CWB. Self-select via case cards (fitness coach / course seller / nutritionist / mentor). | "Generic + self-select" per user direction. Broader TAM than single vertical. |
| **Anti-positioning** | Vs **Hotmart's 9.9% commission** + **PF withdrawal cap** — substantiated, documentable. NOT vs "account freezes" — that's a Reclame-Aqui anecdote, not a defensible claim. | Stay on numeric ground we can prove. Avoid copy that could trigger ad disapproval or legal letter. |
| **Payment method (v1)** | **Stripe Cards-only** (BR-issued or international credit cards). **No Pix in v1.** | Honest start. Pix via Stripe+EBANX is technically possible but adds IOF + EBANX disclosure complexity that erodes trust. We tell users: "começamos com cartão; Pix em Q3 2026". Filters tire-kickers (R$9,90 on a card is real intent). |
| **CTA** | "Garantir minha vaga — R$9,90" → Stripe Cards Checkout → R$50 future credit | R$9,90 is Codex's recommended friction floor (real commitment, not curiosity). R$50 credit makes net cost effectively R$ –40,10 at launch. |
| **Default language** | **pt-BR at `/br/`** | Per user requirement: single-locale subpath on codeflying.app. No EN variant. |
| **Cohort cap** | 100 paid signups counted toward cap. `intent_recognized` (clicked-pay-failed) and `email_only` (no payment attempt) tracked separately and **do NOT count toward the cap or the PMF metric**. | Per Codex critique: only paid is PMF signal. The other two tiers are diagnostic, not pollution. |

**The two things this LP must make a Brazilian creator feel in 5 seconds:**
1. "Isso entende meu problema." (Hotmart 9,9% commission pain → 0% commission with our model)
2. "Isso funciona dentro do Telegram." (the unique wedge)

If those two land, the rest of the page just removes friction to the R$9,90 button.

---

## 2. Visual identity

Inherits CodeFlying's existing brand. Localized via context, not palette overhaul.

### 2.1 Palette

| Role | Hex | Use |
|---|---|---|
| Substrate | `#FBF9F5` | Page background (warm off-white — already Latin-feeling) |
| Primary brand | `#FF7F53` | Coral — primary CTA, headlines, brand accents |
| Secondary brand | `#ED73DC` | Pink — gradient pairings, secondary accents |
| Tertiary | `#F77A95` | Soft pink — quiet accents |
| Telegram accent | `#229ED9` | **Only** inside Telegram feature module |
| Pix accent | `#32BCAD` | **Only** inside payment proof row |
| Ink | `#1A1A1A` | Headings on light substrate |
| Body | `#444444` | Body copy |
| Muted | `#888888` | Captions, meta |
| Hairline | `#E8E4DD` | Borders, dividers (warm-tinted, not pure gray) |

**No Brazil-flag literal colors** (no full yellow/green/blue palette). That reads tier-3/amateur per BR research. The two saturated accents (Telegram-blue, Pix-green) appear in their proper modules only — to signal authenticity without polluting the brand.

### 2.2 Typography

| Slot | Family | Why |
|---|---|---|
| Headings | **Inter** (700/600) | Reads modern, performs well in BR (already used by Hotmart, Kiwify, Telebot) |
| Body | **Inter** (400/500) | Single-family system to keep weight low |
| Numerals (Pix amounts, R$ values) | **Inter tabular-nums** | Locks digit alignment in pricing comparison module |

Stick with Inter — already a CodeFlying brand choice per page audit, performs in pt-BR diacritics, ships free via `next/font`.

### 2.3 Motion

Restrained per BR convention.
- Hero: subtle animated coral gradient + token-by-token typing animation in the rotating prompt placeholder
- Scroll-revealed numbers (counters animate from 0 → final on viewport entry)
- Hover states on cards (lift 2px + shadow)
- Telegram + website live preview animation: ~3-second loop showing "prompt → output"
- **No parallax. No aggressive scroll-jacking. No video-bg in hero** (too heavy + autoplay-on-mobile is unreliable on BR networks).

### 2.4 Imagery

- **Real photos:** diverse Brazilian creators (Black, brown, mixed-race, varying ages within 25-40), casual settings (home office, gym, kitchen). Source: Unsplash BR collection + paid stock (Pexels filter "Brazilian people").
- **Illustrations:** geometric, warm-toned, matching coral/pink palette. No corporate gringo cartoons.
- **Product mockups:** real-looking Telegram chat screens + real-looking desktop browser frames. Render with framer-motion or Lottie, **not** static images — the magic is in the motion.

### 2.5 Iconography

- Lucide React (free, MIT, ships with shadcn/ui)
- Custom inline SVG for: Pix logo, Telegram logomark, WhatsApp icon, R$ glyph

### 2.6 Section rhythm (avoids cookie-cutter AI-slop)

To prevent every section looking the same, alternate substrate, full-bleed vs constrained, and accent treatment:

| # | Section | Substrate | Width | Accent treatment |
|---|---|---|---|---|
| 1 | Nav | Transparent → white-on-scroll | Full-bleed | None |
| 2 | Hero | Light + animated coral gradient | Edge-to-edge | Coral gradient on H1 word |
| 3 | Dual output | Light | Wide-margin (max-w-7xl) | Soft pink hairline divider between panels |
| 4 | Trust strip | **Dark (#1A1A1A)** | **Full-bleed** | White tabular-nums |
| 5 | Use cases | Light | Constrained (max-w-6xl) | Coral on "Ver template →" links |
| 6 | Pix comparison | Light | Constrained (max-w-5xl) | Coral on CodeFlying row, muted on competitors |
| 7 | Social proof | **Warm-tinted (#F5F1E8 — slightly darker substrate)** | Constrained (max-w-6xl) | None — let cases speak |
| 8 | Pricing | Light | Constrained (max-w-4xl) | Coral pill CTA |
| 9 | FAQ | Light | Constrained (max-w-4xl) | None |
| 10 | Final CTA | **Dark (#1A1A1A)** | **Full-bleed** | Coral pill CTA |
| 11 | Footer | **Dark (#0F0F0F)** | Full-bleed | Muted text |

Pattern: light → dark → light → light → light → light-warm → light → light → dark → dark. Three dark moments (trust, final CTA, footer) prevent monotony. The warm-tint on social proof creates a "warmer" reading area for testimonials. Hero uses an animated coral gradient (not flat coral substrate) for one-of-a-kind feel.

### 2.7 Border-radius scale (avoids bubbly-uniform AI-slop)

| Element | Radius | Tailwind |
|---|---|---|
| Inputs (text, select, textarea) | 4px | `rounded-sm` |
| Small buttons, secondary actions | 4px | `rounded-sm` |
| Cards, modals, drawers | 8px | `rounded-md` |
| Pills, badges, primary CTA | 9999px | `rounded-full` |
| Full-bleed sections, dividers, hero gradient | 0px | `rounded-none` |
| Browser/phone mockup frames | 12px (browser) / 32px (phone) | custom |

**Rule:** never use `rounded-lg`, `rounded-xl`, `rounded-2xl`, or `rounded-3xl` outside of the listed mockup frames. Tight scale prevents the bubbly feel.

### 2.8 Design tokens

The single source of truth. Implementation lives in `web/lib/design.ts` exported as TypeScript constants AND consumed by `tailwind.config.ts` `theme.extend` so utility classes match tokens.

**Spacing scale (px):** `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`. Map to Tailwind: `1, 2, 3, 4, 6, 8, 12, 16, 24, 32`. Use only these values — no arbitrary spacing.

**Type scale (px / line-height ratio):**

| Token | Size | Line-height | Weight | Tracking | Use |
|---|---|---|---|---|---|
| `display` | 64 | 1.05 | 700 | -0.02em | Hero H1 only |
| `h1` | 48 | 1.15 | 700 | -0.015em | Section H2 |
| `h2` | 36 | 1.2 | 700 | -0.01em | Subsection headers |
| `h3` | 24 | 1.3 | 600 | normal | Card titles |
| `h4` | 20 | 1.35 | 600 | normal | Sub-card |
| `body-lg` | 18 | 1.55 | 400 | normal | Sub-H1, intro |
| `body` | 16 | 1.55 | 400 | normal | Body text |
| `body-sm` | 14 | 1.5 | 400 | normal | Captions, FAQ body |
| `caption` | 12 | 1.4 | 500 | 0.02em | Meta, eyebrows |
| `numeral` | inherit | inherit | inherit | tabular-nums | R$ values, counters |

Mobile (≤768px): scale display/h1/h2 down by 25% (display 48, h1 36, h2 28). Body sizes unchanged.

**Shadow scale:**

| Token | Use | Value |
|---|---|---|
| `shadow-none` | Default flat surfaces | none |
| `shadow-sm` | Hover lift on cards | `0 1px 2px rgba(26,26,26,0.05)` |
| `shadow-md` | Floating elements (sticky nav scrolled, dropdown) | `0 4px 12px rgba(26,26,26,0.08)` |
| `shadow-lg` | Modal, dialog | `0 12px 32px rgba(26,26,26,0.12)` |
| `shadow-coral` | Primary CTA hover state | `0 4px 16px rgba(255,127,83,0.3)` |

**Motion timing scale:**

| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-instant` | 100ms | `ease-out` | Toggle states (chip select, FAQ open) |
| `motion-fast` | 150ms | `ease-out` | Hover transitions, micro-interactions |
| `motion-base` | 200ms | `ease-out` | Card lift, modal scale-in, accordion |
| `motion-slow` | 350ms | `cubic-bezier(0.2,0.8,0.2,1)` | Section reveals, page transitions |
| `motion-hero-loop` | 8000ms | `linear` | Hero preview animation loop |

All motion is gated by `@media (prefers-reduced-motion: reduce)` → durations collapse to 0ms, animations replaced with static end-states.

### 2.9 Component vocabulary

**Use shadcn/ui for these primitives** (don't reinvent, customize via CSS variables):
- `Button` — primary, secondary, ghost variants; coral primary, ghost outline
- `Input` — text, email, tel
- `Dialog` — R$1 CTA modal, refund modal
- `Accordion` — FAQ
- `Toast` — error notifications, copy-to-clipboard confirmations
- `Tooltip` — inline help on form fields
- `Tabs` — could be used for template chip row alternative
- `Slider` — Pix comparison calculator
- `Skeleton` — loading states for dashboard cards, spots counter
- `Avatar` — testimonial photos (Phase 2)

**Custom-built (not in shadcn, unique to this LP):**
- `HeroSplitScreen` — left H1+prompt+chips+CTA, right dual-output animation
- `DualOutputPanel` — website frame on left + Telegram frame on right with vertical "↓ Um prompt. Dois canais." arrow
- `PixCompareTable` — Hotmart / Kiwify / CodeFlying comparison with row highlighting
- `PixCalculator` — slider + live BRL math output
- `UseCaseCard` — stacked website+TG mockup pair + name + line + link
- `SpotsCounter` — live count with urgency states (95+ coral pulse)
- `TestimonialCard` — global-region testimonial with flag + screenshot + quote
- `DashboardCard` — position, credit, referral code cards
- `LangSwitcher` — pt/en flag pill

**Forbid:**
- shadcn `Card` everywhere — too generic, screams AI-slop
- shadcn `Carousel` — testimonials are 3 max, just show all
- shadcn `Sheet` — no slide-out drawers in this LP
- shadcn `NavigationMenu` — nav is too minimal to need it

### 2.10 Spacing rhythm (sections)

| Element | Vertical rhythm |
|---|---|
| Section vertical padding (desktop) | `py-24` (96px top + bottom) |
| Section vertical padding (mobile) | `py-16` (64px top + bottom) |
| Section H2 to content | `mb-12` (48px) |
| Card grid gap | `gap-8` (32px) desktop / `gap-6` (24px) mobile |
| Paragraph spacing | `mb-4` (16px) between, `mb-6` (24px) before next subhead |
| Hero vertical padding | `py-32` desktop / `py-20` mobile (more breathing room for first impression) |

### 2.11 Accessibility baseline (loose — trust shadcn defaults)

For Phase 1 we accept shadcn/ui's a11y defaults rather than auditing every interaction. This keeps ship velocity high while still meeting reasonable standards on the primitives we use (shadcn is built on Radix UI, which has strong a11y out of the box).

**Hard requirements we DO enforce:**
- All images have descriptive `alt` text. Decorative-only images: `alt=""`.
- The hero live preview animation has `aria-hidden="true"` (it's decorative) PLUS a screen-reader-only sibling `<p>` describing the dual-output concept: *"A animação acima mostra como uma única descrição gera um site e um Mini App no Telegram simultaneamente."*
- All interactive elements have visible focus states (don't override Tailwind's default focus ring without replacing it).
- All animations respect `prefers-reduced-motion: reduce` per §2.8 motion tokens.
- Color contrast: spot-check H1/body/button color combinations at ≥4.5:1 (use Tailwind's color-with-substrate combos which mostly already comply; verify before launch with WebAIM contrast checker on the 5-6 most-used pairs).
- All form inputs have visible `<label>` (not placeholder-as-label).
- Modal traps focus + closes on Esc (shadcn Dialog does this for free).

**Deferred to Phase 2:**
- Full ARIA landmark audit (`<main>`, `<nav>`, `<section aria-labelledby=...>` everywhere) — Next.js layout already provides `<main>`, that's enough for v1
- Keyboard nav for custom components (hero split-screen, Pix calculator slider) — Radix Slider in shadcn covers the slider; hero is mostly static
- Screen reader walkthrough QA — defer to Phase 2 unless we get user complaints
- WCAG 2.1 AA full audit — Phase 2 / pre-public-launch concern

---

## 3. Information architecture

**Total sections: 11.** Dense by US standards, normal by BR standards (Hotmart has 11, Kiwify has 16). Order matters: trust → wedge → proof → price → reassurance.

```
1. Nav (sticky, minimal: logo + language switcher + CTA)
2. Hero — split-screen dual-output prompt + live preview
   ↳ Visual anchor: H1 + prompt input (left panel dominant). Live preview is supporting proof, not the anchor.
3. Dual output — "Mesma ideia. Dois canais." — website + Telegram side-by-side
4. Trust strip — "500k+ criadores · 1M+ apps · 16Bi linhas de código IA"
   ↳ Placed AFTER the wedge proof, not before. Matches Hotmart/Telebot trust-after-pitch convention for an unknown-in-BR brand.
5. Use cases — 4 case cards (fitness coach, course seller, nutritionist, mentor)
6. Pix advantage — comparison strip vs Hotmart + Kiwify
7. Social proof — 3 named creator testimonials with R$ revenue numbers
   ↳ Moved BEFORE pricing. User is socially validated before seeing price (Hotmart/Kiwify convention).
8. Pricing — R$ 29/mês + R$1 deposit module
9. FAQ — 10 questions in pt-BR
10. Final CTA — R$1 deposit button (repeat)
11. Footer — WhatsApp, LGPD line, DPO contact, language switcher, links
```

---

## 4. Section-by-section specs

### Section 1 — Nav (sticky, ~64px tall)

- **Left:** CodeFlying logomark + wordmark
- **Right:** language switcher REMOVED for v1 · "Entrar" link (link to app.codeflying.app) · primary CTA "Garantir vaga — R$ 9,90" (coral pill)
- **Mobile:** logo + CTA only; language switcher folds into hamburger
- **Scrolled state:** white substrate with subtle shadow; in default state, transparent over hero gradient

### Section 2 — Hero (split-screen dual output)

**Visual anchor:** H1 + prompt input (left panel dominant). The live preview on the right is supporting proof, not the anchor. This protects the page from looking empty if the animation fails to load and keeps "Crie seu app... em 10 minutos" as the first thing the eye grabs.

**Layout (desktop ≥1024px):**
```
┌────────────────────────────────────┬──────────────────────────────────┐
│ (left ~55%)                        │ (right ~45%)                     │
│                                    │                                  │
│ H1 — 2 lines, coral gradient on    │ Animated live preview:           │
│ "10 minutos"                       │                                  │
│                                    │ ┌─ Desktop frame ──┐ ┌─ Phone ┐  │
│ Sub-H1                             │ │ website preview  │ │ TG chat│  │
│                                    │ │ generating       │ │ Mini   │  │
│ [Prompt input — rotating placeholder]│ │ blocks-by-block  │ │ App    │  │
│                                    │ └──────────────────┘ └────────┘  │
│ Chip row of 5 templates            │                                  │
│                                    │ Both panels animate together —   │
│ Primary CTA: "Garantir vaga — R$1" │ same data model, two outputs.    │
│ Sub-CTA: "Ver demo (90s) ↓"        │                                  │
└────────────────────────────────────┴──────────────────────────────────┘
```

**Mobile (≤768px) — "Staggered Overlap" pattern, not a vertical stack:**

A naive vertical stack would push the form below the fold and waste the mobile "first impression." Use staggered overlap instead:

```
┌─────────────────────────────────────┐
│ [eyebrow italic, muted]             │ ← ≤35% of viewport
│ H1 (compressed: 2 lines max)        │
│ Sub-H1 (1 line, very tight)         │
├─────────────────────────────────────┤
│ Micro-hint: "O que você quer       │
│ construir hoje?"                    │
│                                     │
│  ┌──────────────────────────┐       │
│  │ Browser frame (web)      │       │
│  │ at ~80% width, left-     │       │
│  │ aligned                  │       │
│  │              ┌─────────┐ │       │
│  │              │ Phone   │ │       │
│  │              │ Telegram│ │       │
│  │              │ frame   │ │       │
│  │              │ overlaps│ │       │
│  │              │ bottom- │ │       │
│  │              │ right   │ │       │
│  │              └─────────┘ │       │
│  └──────────────────────────┘       │
├─────────────────────────────────────┤
│ Template chips horizontal scroll    │
│ (chips matter more than typing on   │
│ mobile — typing is high friction)   │
│                                     │
│ [Prompt input — smaller height]     │
│                                     │
│ [Primary CTA — full-width pill]     │
└─────────────────────────────────────┘
```

**Why staggered overlap:** Communicates "dual output" in roughly half the vertical space of a clean stack. The Telegram phone frame overlapping the browser bottom-right tells the story "both at once" without needing a second full section above the fold. This becomes the visceral "wedge" moment on mobile.

**Compressed copy variant for mobile H1 (tighter than desktop):**
> "Crie seu site e bot **em segundos**."
> Sub-H1: "Site + Mini App no Telegram. R$ 29/mês. Sem comissão sobre venda."

The "em segundos" is a deliberate compression of "em 10 minutos" — mobile users have less attention budget; the smaller claim still lands the wedge. Desktop keeps "em 10 minutos."

**Template chips on mobile:** Horizontal scroll with snap-points (`scroll-snap-type: x mandatory`). User can swipe through chips. Tapping a chip pre-fills the prompt + animates the right-panel preview to that template — same as desktop.

**Micro-hint above prompt:** "O que você quer construir hoje?" — 13px muted body text, sets the input's purpose without occupying H1-level real estate.

**Mobile stack order rationale:** Eyebrow → H1 → Sub-H1 → micro-hint → staggered preview → chips → input → CTA. The preview sits BETWEEN the headlines (which explain the value) and the form (which captures the commitment). Form-first violates the "show proof before asking" principle; preview-only at the bottom buries the wedge.

**H1 (pt-BR):**
> *"Pra criadores brasileiros, em português. Cartão hoje, Pix em breve."* (eyebrow — small italic muted line, 14px, sits above H1)
>
> "Crie seu app no Telegram + site **em 10 minutos**." (H1)

(Coral gradient on "em 10 minutos". Eyebrow addresses anti-gringo skepticism AND honestly sets payment expectation in the first second.)

**Sub-H1:**
> "Descreva sua ideia pra IA. A gente entrega site + Mini App no Telegram + checkout pronto. R$ 29/mês fixo. Sem comissão sobre venda."

**Prompt input placeholder rotates every 4s through:**
1. "Quero vender meu curso de maquiagem com Pix e grupo VIP no Telegram"
2. "Coach de academia: site + bot do Telegram pra entregar treinos"
3. "Mentoria mensal: site de captura + comunidade VIP com cobrança recorrente"
4. "Nutricionista: agenda online + entrega de planos via Telegram"

**Chip row (5 templates — mix of website + Telegram outputs):**
- 🌐 Loja de infoproduto
- ✈️ Bot VIP Telegram + Pix
- 🌐 Site de mentoria com agenda
- ✈️ Loja no Telegram com catálogo
- 🌐 Página de captura

Clicking a chip pre-fills the prompt with a relevant example AND highlights that template in the right-panel preview.

**Right-panel live preview animation:**
- Two frames side-by-side: desktop browser (showing website) and iPhone (showing Telegram chat with Mini App card)
- Both animate together: as the website renders blocks-by-blocks, the Telegram Mini App also fills in
- Looping 8s animation, pauses on user interaction with prompt
- Built with framer-motion (not Lottie — needs to feel reactive)

**Primary CTA:** coral pill, "Garantir minha vaga — R$ 9,90" → scrolls to pricing section (or opens pay-modal directly, see Section 8)
**Secondary CTA:** small grey-text link directly below the primary, "Só quero ser avisado quando lançar (grátis) →" → opens email-only modal
**Tertiary CTA:** "Ver demo (90s) ↓" → scrolls to dual-output section with embedded video

The dual-CTA pattern (primary pay + secondary free) repeats at every CTA location on the page: hero, pricing module, final CTA. Always together, at the same decision moment, so users self-select their commitment level without having to click "pay" to discover a free option exists.

### Section 4 — Trust strip (narrow, dark band)

Sub-100px tall, dark substrate (#1A1A1A), tabular nums.

> **500.000+ criadores** no mundo · **1.000.000+ apps** já criados · **16.000.000.000** linhas de código IA

Use animated count-up on scroll-into-view. Periods as BR thousands separator.

### Section 5 — Use cases ("Pra quem é?")

Four cards in a 2x2 grid (desktop) / vertical stack (mobile). **No emoji icons. No abstract circles.** Each card shows a small **product mockup thumbnail** of the actual app/site that this use case generates — this differentiates from generic AI-builder card grids and reinforces the dual-output wedge.

Each card contains:
- **Top half:** stacked thumbnail pair — small website browser frame ON TOP of small Telegram chat frame (e.g., 220×140 each on desktop)
- **Vertical name** (e.g., "Coach fitness")
- **1-line use case** in pt-BR
- **"Ver template →"** link in coral, anchors to template gallery

```
┌─────────────────────────┬─────────────────────────┐
│ [website mockup]        │ [website mockup]        │
│ [TG chat mockup]        │ [TG chat mockup]        │
│ Coach fitness           │ Vendedor de cursos      │
│ Site SEO + bot VIP      │ Página de captura +     │
│ entregando treino       │ bot VIP entregando      │
│ Ver template →          │ Ver template →          │
└─────────────────────────┴─────────────────────────┘
┌─────────────────────────┬─────────────────────────┐
│ [website mockup]        │ [website mockup]        │
│ [TG chat mockup]        │ [TG chat mockup]        │
│ Nutricionista           │ Mentor / consultor      │
│ Agenda online + bot     │ Site + comunidade VIP   │
│ entregando plano        │ + cobrança recorrente   │
│ Ver template →          │ Ver template →          │
└─────────────────────────┴─────────────────────────┘
```

**Implementation note:** Use 4 distinct, real-looking mockups (not the same template recolored). For Phase 1, even hand-drawn-looking SVG sketches are better than emoji — they signal "this is what you get" not "we're a SaaS template."

**Caption above grid:** "Se você cria conteúdo, vende infoproduto, ou cobra por mês — tem template pronto."

### Section 3 — Dual output ("Mesma ideia. Dois canais.")

The most important section after hero. Hammers the differentiation.

**H2:** "Mesma ideia. Dois canais. Um único produto criado pela IA."
**Sub:** "Enquanto Hotmart te cobra 9,9% como marketplace e Lovable te dá só site, a CodeFlying entrega o pacote completo: site + Mini App no Telegram, no seu canal próprio, sem comissão sobre venda."

**Layout:**
```
┌───────────────────────────────┬───────────────────────────────┐
│ 🌐 SITE                       │ ✈️ TELEGRAM MINI APP          │
│                               │                               │
│ [Desktop browser mockup —     │ [Phone mockup — Telegram chat │
│  shows generated landing     │  with Mini App card open,    │
│  page with hero + checkout    │  product list + checkout     │
│  + course curriculum]         │  visible]                    │
│                               │                               │
│ ✓ SEO (Google encontra)       │ ✓ Viralização nativa do TG   │
│ ✓ Captura de leads            │ ✓ Pagamento sem sair do chat │
│ ✓ Domínio próprio             │ ✓ Entrega instantânea de PDF │
│ ✓ Analytics                   │ ✓ Comunidade VIP integrada   │
└───────────────────────────────┴───────────────────────────────┘
        ↓ One arrow pointing down between both panels ↓
        "Um prompt. Dois canais. Sincronizados."
```

Below: a short 90-second embedded video (placeholder for now — we record this in Phase 2) showing the dual-output flow.

### Section 6 — Pix advantage (comparison strip)

The wedge punch. Bold, scannable, numeric.

**H2:** "Veja quanto da sua receita fica com você."

**Desktop layout — comparison table:**

| Plataforma | Comissão por venda | Saque | Modelo |
|---|---|---|---|
| **Hotmart** | 9,9% + R$ 1,00 | 2 dias | Marketplace |
| **Kiwify** | 8,99% + R$ 2,49 | 2 dias | Marketplace |
| **CodeFlying** | **0%** ⭐ | **Sua conta, seu controle** | **Canal próprio (SaaS R$ 29/mês)** |

**Mobile layout — 3 stacked cards (one per platform):**

```
┌─────────────────────────────┐
│ Hotmart                     │
│ Comissão: 9,9% + R$ 1       │
│ Saque: 2 dias               │
│ Modelo: Marketplace         │
└─────────────────────────────┘
┌─────────────────────────────┐
│ Kiwify                      │
│ Comissão: 8,99% + R$ 2,49   │
│ Saque: 2 dias               │
│ Modelo: Marketplace         │
└─────────────────────────────┘
┌─────────────────────────────┐  ← coral border, slightly elevated
│ CodeFlying                  │
│ Comissão: 0%                │
│ Modelo: Canal próprio       │
│ SaaS R$ 29/mês fixo         │
└─────────────────────────────┘
```

**Honest comparison framing:** We're not a Hotmart-killer marketplace — we're a different business model entirely. They charge per-sale commission as a marketplace; we charge a fixed monthly SaaS fee for the canal próprio (your own owned channel) — site + Telegram Mini App. Your revenue flows directly through the payment processor of YOUR choice into YOUR account.

The CodeFlying card is visually elevated (coral border + subtle `shadow-md`), so even when scanned the eye lands on it as the answer.

Below the table — interactive calculator:

```
"Se você vende R$ ___ por mês na Hotmart, você paga..."
[Slider: R$ 1.000 — R$ 50.000]

→ "Hotmart cobra ~R$ 999/mês de comissão · CodeFlying cobra R$ 29/mês fixo"
→ "Você economiza R$ 970/mês com a CodeFlying"

Pequena nota legal: Cálculo baseado na taxa pública divulgada da Hotmart
(9,9% + R$1 por venda em 9/2025). Atual em codeflying.app/br/sources.
```

The numbers update live as the slider moves. Showing **actual BRL math** beats any superlative — and it's the Kiwify-attacks-Hotmart playbook turned up to 11.

### Section 8 — Pricing (with R$9,90 deposit module + free email-only option)

**H2:** "Pra quem entra primeiro."

```
┌────────────────────────────────────────────────────┐
│           Plano Early Access (primeiros 100)       │
│                                                    │
│              R$ 29 /mês                            │
│        ~~R$ 49/mês~~ depois do lançamento          │
│                                                    │
│   ✓ Site + Telegram Mini App                       │
│   ✓ Sem comissão sobre venda                       │
│   ✓ Templates pra creator brasileiro               │
│   ✓ Suporte em português via WhatsApp              │
│   ✓ LGPD compliant by default                      │
│                                                    │
│   ┌──────────────────────────────────────────┐    │
│   │ Garantir minha vaga — R$ 9,90            │    │  ← primary (coral pill)
│   │ (vira R$ 50 de crédito quando lançarmos) │    │
│   └──────────────────────────────────────────┘    │
│                                                    │
│   Pagamento via cartão (Stripe). Pix em breve.    │
│   Reembolso integral em 7 dias se desistir.       │
│                                                    │
│   ─────────────────────────────────────────       │
│                                                    │
│   Só quero ser avisado quando lançar (grátis) →   │  ← secondary
│                                                    │  (grey text link)
└────────────────────────────────────────────────────┘
```

**The R$9,90 framing copy is critical:**
- "R$ 9,90 para garantir sua vaga" (main button label)
- Below: "Vira R$ 50 de crédito no lançamento" (in coral, smaller — net cost is R$ –40,10 at launch)
- Below: "Pagamento via cartão. Pix está na roadmap para Q3 2026." (muted, smaller — honest disclosure)
- Below: "Reembolso integral em 7 dias se desistir." (muted, smaller)

**The free email-only option (secondary):**
- Smaller grey text link below the divider: "Só quero ser avisado quando lançar (grátis) →"
- Click → opens email-only modal (same form fields as pay modal, minus payment copy)
- Submits to `/api/leads/email-only` → creates Stripe Customer with `status='email_only'` → confirmation page
- No R$ 50 credit promise (that's reserved for paid signups)
- No position in waitlist (Tier 3 doesn't get a numbered slot)
- Confirmation copy: "Beleza! Te avisaremos pelo WhatsApp e por aqui quando lançar."

**On click → see §5 for both flows.**

### 8.0 PMF intent philosophy — three signal tiers (all tracked, only paid counts toward cap)

This is a fake-door PMF test. We track **three tiers of signal** because each tells us something different about demand. **Only Tier 1 counts toward the 100-spot cap and the primary PMF metric**; Tier 2 and Tier 3 are diagnostic — they show the funnel and the soft-demand surface.

| Tier | What happened | Where it lives | Counts toward 100 cap? | Signal weight |
|---|---|---|---|---|
| **Tier 1 — `paid`** | User clicked pay → completed Stripe Cards Checkout → R$ 9,90 cleared | Stripe Customer + Customer.metadata.status='paid' + PaymentIntent succeeded | **Yes** | **Strongest** — real money intent |
| **Tier 2 — `clicked_pay`** | User clicked pay button → modal submitted → Stripe Checkout opened → didn't complete (declined / canceled / abandoned) | Stripe Customer with metadata.status='intent_pending' (never updated to paid) | No | Medium — declared intent but didn't finish |
| **Tier 3 — `email_only`** | User clicked the secondary "Só quero ser avisado quando lançar" link → submitted form → no payment attempted | Stripe Customer with metadata.status='email_only' (no PaymentIntent ever created) | No | Weakest — soft curiosity / "tell me more" |

**All three live as Stripe Customer records** — Stripe is the unified storage. No Postgres. Querying tier counts = `stripe.Customer.list(limit=100)` filtered by `metadata.status`. The 100-cap counter in Redis only increments on `metadata.status` transitions to `paid`.

**Why we keep Tier 2 and Tier 3 separate (not collapsed into "soft signal"):**
- **Tier 2 = active intent** — user reached for their wallet. If lots of Tier 2 but few Tier 1, the conversion problem is at the card-acceptance step (foreign Stripe issuer rejection, 3DS friction). Different fix.
- **Tier 3 = passive interest** — user explicitly chose "tell me later." If lots of Tier 3 but few Tier 1, the price-friction is the problem; R$ 9,90 may be too high for our audience. Different fix.

**Counter behavior:**
- Spots-remaining counter on the LP = Redis `waitlist:paid_count`, increments only on `checkout.session.completed` webhook
- Tier 2 / Tier 3 signups DO NOT appear in the spots counter
- Refunds within 7 days decrement the counter; after 7 days, the seat stays taken
- Counter is cached server-side for 60s (max 1 update per minute, no live flash)

**Reporting (post-launch, weekly):**
- A small admin script `python scripts/tier_report.py` queries Stripe Customers, groups by metadata.status, outputs:
  - `paid: 47 / 100 (47%)` — primary PMF metric
  - `clicked_pay (not completed): 23` — funnel drop-off
  - `email_only: 84` — soft-demand surface
- Conversion ratios computed against analytics page-view + click events (§5.7)

### Section 7 — Social proof

**H2:** "Nova no Brasil. Mas com história global."
**Sub:** "Ainda não temos cases brasileiros pra mostrar — somos novos aqui. Mas veja o que criadores em outros mercados já construíram com a CodeFlying."

This is the authentic positioning. **No fake-BR testimonials with stock photos.** Instead, show 3 real global creator success stories with verified screenshots, original-currency revenue numbers (with BRL conversion shown), and clear regional attribution. BR users respect honesty (Reclame Aqui culture); they smell fake instantly.

Three cards, each showing a real success case from a different region:

```
┌─────────────────────┬─────────────────────┬─────────────────────┐
│ [app screenshot]    │ [app screenshot]    │ [app screenshot]    │
│ 🇨🇳 China           │ 🌐 Global            │ 🌐 Global            │
│ WeChat Mini App     │ Web app             │ Web app             │
│                     │                     │                     │
│ "Loja de cosméticos │ "[Real case quote   │ "[Real case quote   │
│ vendeu ¥X em Y dias"│ from CodeFlying]"   │ from CodeFlying]"   │
│                     │                     │                     │
│ Equivalente a       │ App: [link/preview] │ App: [link/preview] │
│ R$ X mil/mês        │                     │                     │
└─────────────────────┴─────────────────────┴─────────────────────┘
```

**Selection criteria for each case:**
1. **Real screenshot** of the live app (not concept art)
2. **Verifiable metric** (revenue, user count, time-to-launch)
3. **Clear regional flag** so BR user knows this isn't a BR-faked case
4. **Direct copy from the creator** if available, with attribution

**Curation responsibility:** Pull 3 strongest from CodeFlying's 500k+ creator base. Suggested categories:
- One Chinese WeChat mini-app creator (the proven home-market win)
- One English-market app (broader recognition)
- One from an adjacent emerging market (Mexico / Vietnam / etc — adds Latin/SE Asia parallel relevance)

**Footer disclosure (honest):**
> *"Casos reais. CodeFlying está em pré-lançamento no Brasil — você pode ser nosso primeiro caso brasileiro de sucesso."*

This converts skepticism into invitation. "You could be the next case study" is a much stronger BR pitch than fake stock testimonials.

**Replace with real BR testimonials in Phase 2** once first 10-20 paid signups have built apps. Update Section 11 (footer) note accordingly.

Below testimonials: **"Onde nos encontramos:"** logo strip (Influent Summit 2026, Hotmart Fire 2026 conference targets). Use language *"Onde nos encontramos"* not *"Visto em"* — the latter implies endorsement we don't have.

### Section 9 — FAQ (10 questions)

Accordion, all closed by default. The 10 questions are tuned to address Hotmart-refugee anxieties surfaced in market research:

1. **Preciso ter CNPJ?** — Não. O CodeFlying é um SaaS que entrega o canal (site + Mini App). Você opera com CPF ou CNPJ, como preferir.
2. **Como o dinheiro das minhas vendas chega na minha conta?** — Você conecta seu próprio processador de pagamento (Mercado Pago, Pagar.me, ou Stripe — sua escolha). O dinheiro flui direto da venda pro processador, e do processador pra sua conta bancária. A CodeFlying não intermedia o pagamento das suas vendas; cobramos só o SaaS fixo de R$ 29/mês.
3. **Como é o pagamento da minha assinatura CodeFlying?** — Em v1 (pré-lançamento), aceitamos cartão de crédito via Stripe. Estamos integrando Pix nativo brasileiro para Q3 2026 — esse é o plano público. Pedimos sua paciência: estamos novos no Brasil e começamos pelo método mais rápido de implementar com segurança.
4. **Por que cartão e não Pix agora?** — Honestidade primeiro: Pix via processador internacional (com IOF e disclosure de EBANX) ia gerar mais atrito de confiança do que aceitar cartão direto. Preferimos começar com cartão e migrar pra Pix nativo quando tivermos CNPJ brasileiro. Q3 2026.
5. **E se a Hotmart bloqueou minha conta?** — Você pode migrar pra cá com seus produtos atuais quando lançarmos.
6. **Quanto tempo leva pra ficar pronto?** — 10 minutos do início ao fim, em média (no lançamento Q3 2026).
7. **Funciona com WhatsApp também?** — No momento focamos em Telegram + site. WhatsApp na roadmap.
8. **Como fica a LGPD?** — Conformidade por padrão. DPO designado (`dpo@codeflying.app`). Lista de subprocessadores publicada em `/br/privacidade`. Consentimento explícito para cookies e pixels. Direitos do titular em `/br/meus-dados`.
9. **E pra proteger PDF de pirataria?** — Marca d'água individual com identificador do comprador (recurso da plataforma no lançamento).
10. **Suporte é em português?** — Sim, humano, via WhatsApp em horário comercial BR.
11. **R$ 9,90 é reembolsável?** — Sim, em 7 dias se desistir, processado direto pelo cartão original via Stripe. Após 7 dias, R$ 50 de crédito permanece reservado pra você usar no lançamento.
12. **Quando lança oficialmente?** — Q3 2026. Os primeiros 100 entram agora.

### Section 10 — Final CTA

Slim, full-bleed, dark substrate, dual CTAs (primary pay + secondary free).

> **"Só 100 vagas. R$ 9,90 garante a sua."**
> [ Garantir minha vaga — R$ 9,90 ]   ← primary (coral pill)
>
> *Pagamento via cartão (Stripe). Pix em Q3 2026.*
>
> Só quero ser avisado quando lançar (grátis) →   ← secondary (grey text link)

### Section 11 — Footer

Three columns + bottom strip:

**Column 1 — Brand:** CodeFlying logo + tagline + "Crie sem código. Canal próprio. Sem comissão sobre venda."
**Column 2 — Produto:** Como funciona / Templates / Pricing / Demo / Status
**Column 3 — Empresa:** Sobre / Blog / Suporte / WhatsApp (with click-to-chat)

**Bottom strip:**
- "© 2026 CodeFlying · Em conformidade com a LGPD · DPO: dpo@codeflying.app"
- Language switcher repeat
- Social links (Instagram, Telegram, YouTube)

---

## 5. Payment flow (Stripe Pix + R$1 deposit)

### 5.0 Interaction state table — every state for every feature

This table is the source of truth for every non-happy-path the engineer must build. **Empty states are features.** Every cell either specifies an experience or is marked N/A.

| Feature | Loading | Empty | Error | Success | Partial / Edge |
|---|---|---|---|---|---|
| **Hero prompt input** | n/a (always inline) | Placeholder copy rotates through 4 BR examples every 4s | Submit with empty input → coral inline hint "Conta pra gente sua ideia primeiro" + shake animation (respects `prefers-reduced-motion`) | Submit → smooth scroll to pricing section + pre-fill modal with prompt | If > 240 chars: trim + show "(continua nos templates)" |
| **Hero live preview animation** | Skeleton shimmer in both frames (desktop + phone) for ~300ms while assets load | n/a | If framer-motion fails to mount: render static end-state image of both frames | Animation loops 8s, pauses on tab-blur | `prefers-reduced-motion: reduce` → static end-state image only, no animation |
| **Template chip click** | Coral fill animates from left to right (~200ms) | n/a | If template unknown: silent fallback to default placeholder | Chip becomes selected (coral bg, white text) + right-panel preview updates | If user clicks 2 chips fast: cancel first animation, start second |
| **R$ 9,90 CTA (primary)** | Modal mounts with 200ms ease-out fade + scale-from-95% | n/a | n/a | Focus trapped on first input. Esc closes. Outside click closes. | Background scroll locked. Body padding adjusted for scrollbar (no layout shift) |
| **Free email CTA (secondary)** | Modal mounts with 200ms ease-out fade + scale-from-95%; copy differs (no R$ 9,90, no Stripe disclosure) | n/a | n/a | Focus trapped. Same form fields. Submit button reads "Me avisar quando lançar". | Same scroll lock + padding adjustment as pay-modal |
| **Pay-modal form submit** | Button text → "Indo pro checkout..." with spinner. Form disabled. ~1-2s before redirect. | n/a | API 5xx → toast "Tivemos um problema. Tente de novo." (stay in modal, no auto-grant) | 302 to Stripe Checkout in same tab | Email already exists as `paid` Customer → "Você já está na lista! Aqui está seu dashboard →" + redirect to dashboard URL. Email exists as `email_only` Customer → upgrade to `intent_pending`, proceed to Stripe. Email exists as `intent_pending` → reuse same customer, new checkout session. |
| **Email-only modal form submit** | Button text → "Salvando..." with spinner. ~500ms. | n/a | API 5xx → toast "Tivemos um problema. Tente de novo." | Confirmation page in-modal: "Beleza! Te avisaremos pelo WhatsApp e por aqui quando lançar." + close button | Email already exists as `paid` → "Você já está na lista pra primeira leva! [Ver dashboard →]". Email exists as `email_only` → idempotent (already saved, show same confirmation). |
| **Stripe Checkout (Cards)** | Stripe-hosted | n/a | Card declined → user returns to `cancel_url` → "Cartão não autorizado. Tentar de novo? [Reabrir modal]" (Customer stays at status='intent_pending' — Tier 2 signal preserved) | Card succeeded → redirect to `success_url` → polling state | Card processed but 3DS challenge pending → Stripe shows their own state |
| **Stripe `success_url` (`/br/obrigado`)** | "Confirmando seu pagamento..." with animated dot trio. Poll `/api/me?token=<signed>` every 2s for ≤30s. | n/a | Poll timeout 30s → "Pagamento processando. Sua vaga está sendo registrada. Salve este link e volte em alguns minutos: [dashboard URL]" | Webhook fired → "Pagamento confirmado!" → 1.5s celebration → dashboard with `status=paid` | Tab closed during poll → on next visit to dashboard URL, /api/me reflects webhook state |
| **Stripe `cancel_url` (`/br/cancelado`)** | n/a (immediate redirect) | n/a | n/a | "Cartão não autorizado. Sem problema — tentar de novo? [Reabrir modal]" — Stripe Customer remains at status='intent_pending' (Tier 2 signal). | n/a |
| **Pricing comparison slider** | n/a (instant computation) | Default position R$ 5.000/mês | If user drags below R$ 0: clamp at R$ 100 with visual nudge. If above R$ 100k: clamp + "Vamos conversar diretamente →" with WhatsApp link | Computed savings update with smooth count animation (~150ms) | Touch device: slider has 48px touch zone, visible thumb |
| **Spots-remaining counter** | Skeleton text "Restam — vagas de 100" on first load | "0 vagas restantes" → triggers `full` state below | API 5xx → hide counter silently (don't show error to user) + log to Sentry | Decrement only when a Tier 1 (paid) signup is confirmed via webhook. Never increments backwards from refunds within 7 days (frees seat). Refunds after 7 days do not free the seat. Updates at most every 60s server-side to avoid jitter. | **95+ filled → counter turns coral + small animated dot pulse** (subtle pressure, respects reduced-motion) |
| **Counter full (0 left)** | n/a | "Lista cheia. Entre na fila de espera 2.0 (grátis, sem depósito)" + free email signup form below | n/a | Email-only signup confirmation: "Te avisamos quando abrir o próximo lote" | Spots may free up via refunds — if so, counter goes back to N>0 and primary CTA returns |
| **Waitlist dashboard `/br/painel`** | Skeleton cards for: position, credit, referral code, status | If `token` missing or invalid HMAC: redirect to home with toast "Link inválido. Você precisa entrar pela página principal." | Token valid but Stripe Customer not yet `paid` (webhook lag): "Confirmando pagamento..." with retry-in-30s | All cards render from Stripe Customer metadata | Stripe API down: skeleton stays, retry every 5s with backoff |
| **Refund request form** | "Processando seu pedido..." | n/a | > 7 days since signup → "Janela de reembolso fechou. Mas seu R$ 50 de crédito continua válido!" | Refund initiated → "Reembolso solicitado. Aparece na sua conta em até 24h." | Already refunded → "Você já foi reembolsado em DD/MM/AAAA" |
| **Language switcher (PT ↔ EN)** | n/a (client-side route change) | n/a | If locale missing → fall back to pt-BR + log | Smooth route change, scroll position preserved, layout flash minimal | Direct URL to `/en` from a pt-BR user: respect URL, don't auto-redirect back |
| **FAQ accordion** | n/a | n/a | n/a | Smooth height transition (~200ms), one open at a time, keyboard navigable | Mobile: tap chevron icon also works, not just header text |
| **Footer / WhatsApp button (floating)** | n/a | n/a | n/a | Tap → `wa.me` link in new tab with pre-filled greeting "Olá! Vim do site da CodeFlying e queria saber mais." | Mobile: bottom-right, 56×56px, respects bottom safe-area-inset |

### 5.0a v1 payment scope — Cards Only, Pix in Q3 2026

**v1 accepts Stripe Cards only.** No Pix in v1.

This is a deliberate choice over the technically-possible Stripe+EBANX Pix routing:

| Approach | What's offered | UX | Trust cost | Implementation |
|---|---|---|---|---|
| Stripe Cards only (chosen) | BR-issued + international credit cards | Standard Stripe Checkout, pt-BR locale | None (no IOF surprise, no EBANX disclosure) | Simplest |
| Stripe Pix via EBANX | Pix QR + cards | Pix QR works, but IOF (~3,5%) appears at checkout + "processado por EBANX" shows | High (BR user sees foreign-routed cross-border purchase = bait-and-switch feeling) | Medium |
| Native Brazilian Pix (Mercado Pago / Pagar.me) | True direct Pix into BR bank | Cleanest, instant settlement | None — but requires CNPJ | Heaviest (CNPJ + KYC + integration) |

**v1 = Cards Only.** Q3 2026 = native Pix. The honest copy is everywhere: "Pagamento via cartão (Stripe). Pix em Q3 2026."

**Banned copy claims in v1** (none of these may appear anywhere on the page):
- ❌ "Pix nativo"
- ❌ "Pix direto"
- ❌ "Sem limite" (PF withdrawal claim — we don't process customer revenue)
- ❌ "A gente não toca no seu dinheiro" (we never process their revenue; this conflates us with marketplace platforms we aren't)
- ❌ "Sem congelar sua conta" (unsubstantiated accusation against Hotmart)
- ❌ "Pix integrado" (we don't offer Pix in v1)
- ❌ "Receba com Pix" (same)
- ❌ Any explicit comparison of seller-revenue flows (we don't process seller revenue in v1; we sell SaaS subscription)

**Allowed and substantiated claims:**
- ✅ "Sem comissão sobre venda" (true; we charge fixed SaaS, not per-sale)
- ✅ "Canal próprio" (true; user owns the channel — site + Telegram Mini App)
- ✅ "0% de comissão" (true; we charge a flat monthly fee, no per-sale cut)
- ✅ "R$ 29/mês fixo" (true; the planned launch price)
- ✅ "Em conformidade com a LGPD" (true once we publish privacy policy + subprocessors)
- ✅ "Pix em Q3 2026" (true; published roadmap commitment)
- ✅ Comparisons to Hotmart/Kiwify on their published commission rates (fact-based, sourced)

**Why this matters:** BR creators are Reclame-Aqui-sensitive. Overclaiming Pix availability or making accusations against Hotmart will burn trust on the second visit (when they actually see the checkout). Honest framing — "começamos com cartão, Pix vem no Q3" — converts skepticism into "they're transparent." This is the same authenticity playbook as Section 7's "Nova no Brasil. Mas com história global."

### 5.1 User journey (v1: Cards Only, Stripe-as-DB, dual CTA paths)

There are TWO submission paths from the LP, captured by two CTAs side-by-side at every CTA location (hero, pricing, final CTA):

**Path A — Pay path (Tier 1 → 2):**

```
Click "Garantir minha vaga — R$ 9,90" (primary CTA)
        ↓
Pay-modal opens — captures: nome, email, WhatsApp, use_case, LGPD consent
        ↓
POST /api/checkout/create (FastAPI)
  - Rate limit check (Redis)
  - Cloudflare Turnstile verification
  - Create Stripe Customer with metadata = {name, whatsapp, instagram, use_case,
      utm_*, terms_version, ip_country, consent_at, status='intent_pending'}
  - Create Stripe Checkout Session: payment_method_types=['card'], amount=990,
      currency='brl', locale='pt-BR', customer=<id>
  - Return checkout URL
        ↓
302 to Stripe-hosted Checkout (cards form)
        ↓
User enters card  →  Stripe processes
        ↓                              ↓
   Card SUCCEEDS               Card FAILS / 3DS abort / cancel
        ↓                              ↓
Stripe redirects to              Stripe redirects to /br/cancelado
  /br/obrigado?session_id=X        ↓
        ↓                       Page shows "Cartão não autorizado. Tentar
Page polls /api/me every          de novo?" with retry button (reopens
  2s for ≤30s for webhook         pay-modal)
        ↓                       (Customer stays at status='intent_pending'
Webhook arrives:                  = Tier 2 signal, queryable from Stripe)
  → Redis INCR waitlist:paid_count
  → Stripe Customer.metadata.status='paid'
  → Customer.metadata.position, referral_code, paid_at
        ↓
Confetti + dashboard:
  /br/painel?token=<base64(customer_id):hmac>
```

**Path B — Email-only path (Tier 3):**

```
Click "Só quero ser avisado quando lançar (grátis) →" (secondary CTA)
        ↓
Email-modal opens — same form fields as pay-modal (nome, email, WhatsApp,
  use_case, LGPD consent). Different copy:
  - Title: "Te avisamos quando lançar"
  - No mention of R$ 9,90, no Stripe disclosure, no R$ 50 credit
  - Submit button: "Me avisar quando lançar"
        ↓
POST /api/leads/email-only (FastAPI)
  - Rate limit check (Redis): 3/min per IP, 2/hour per email
  - Cloudflare Turnstile verification
  - Create Stripe Customer with metadata = {name, whatsapp, instagram, use_case,
      utm_*, terms_version, ip_country, consent_at, status='email_only'}
  - NO Stripe Checkout Session created
        ↓
Return small confirmation: "Beleza! Te avisaremos pelo WhatsApp e por aqui
  quando lançar. Enquanto isso, segue a gente no Instagram: @codeflying"
        ↓
(End of journey. No dashboard, no token, no R$ 50 credit, no position.)
```

**Tier mobility:**
- Tier 3 → Tier 2/1: if a Tier 3 user later clicks the pay CTA with the same email, we detect their existing Stripe Customer (`stripe.Customer.list(email=...)`) and upgrade its `metadata.status` accordingly when they progress
- Tier 2 → Tier 1: if a Tier 2 user retries and successfully pays, the same Stripe Customer transitions to `status='paid'` via the webhook (Customer ID stays the same)
- Tier 1 → refunded: handled per §5.3

**State machine (Stripe Customer.metadata.status transitions):**

```
                ┌─────────────┐
                │             │
   email_only   │             │   intent_pending  →  paid  →  refunded
   (Tier 3,     │  Tier 3-→2  │   (Tier 2)           (Tier 1)
   terminal)    │  upgrade    │           ↑              │
                │  by re-click│           │ retry        │ refund
                │             │           └──────────────┘
                └─────────────┘
```

- `email_only` is terminal unless the user later clicks pay CTA with the same email → upgrade to `intent_pending`
- `intent_pending` is terminal unless the user successfully pays → upgrades to `paid` via webhook
- `paid` only transitions to `refunded` (via charge.refunded webhook)
- Status transitions are monotonic except `intent_pending → email_only` (which never happens)

**Stripe webhook handler (idempotent via Redis):**

See §5.2 for the code. Key properties:
- Reads raw bytes for signature verification (FastAPI `request.body()`)
- Redis `SETNX` with 7-day TTL guards against duplicate events
- Atomic `INCR` on spots counter; if over 100, immediate refund-on-server (race)
- Updates Stripe Customer metadata for position + referral_code + paid_at
- No DB transactions; Redis ops are atomic

**Webhook gotchas explicitly handled:**
- Out-of-order events: Customer.metadata fields are only written by the webhook; idempotency key (Redis SETNX) coordinates concurrent webhooks
- Duplicate events: Redis `SETNX` per `event.id` with 7-day TTL
- Webhook lag past 30s poll: client falls through to "processing" copy; subsequent /api/me poll picks it up
- Race condition on 100th spot: atomic INCR caps at 100; over-counted intents get auto-refunded immediately

### 5.5 Success criteria (kill/continue gates)

Before launch, commit to these thresholds. Re-evaluate at 4 weeks of paid traffic.

| Signal | Source | Kill threshold | Continue threshold | "Strong PMF" |
|---|---|---|---|---|
| **Tier 1 conversion: visitor → paid (R$9,90)** | Stripe `paid` Customers / unique LP visitors | < 1.0% | ≥ 2.5% | ≥ 5% |
| **Tier 2 conversion: visitor → clicked_pay** | Stripe `intent_pending` + `paid` Customers / unique LP visitors | < 3% | ≥ 6% | ≥ 12% |
| **Tier 3 conversion: visitor → email_only** | Stripe `email_only` Customers / unique LP visitors | < 5% | ≥ 10% | ≥ 20% |
| **Tier 2 → Tier 1 close rate** | paid / (paid + intent_pending) | < 30% | ≥ 50% | ≥ 75% |
| **Refund rate (within 7 days)** | refunded / paid | > 25% | < 15% | < 5% |
| **Pricing pre-commitment**: "would pay R$29/mo today" follow-up survey | Tier 1 users only, sent via WhatsApp 48h after signup | < 20% yes | ≥ 30% yes | ≥ 50% yes |
| **Onboarding interest**: book a 15-min Zoom call with founder | CTA on dashboard, optional | < 5 bookings total | ≥ 10 bookings | ≥ 25 bookings |
| **WhatsApp engagement**: replies to our outreach message | WhatsApp Business stats | < 10% reply rate | ≥ 30% reply rate | ≥ 50% reply rate |

**Reading the data:**
- High Tier 3, low Tier 2 → price is too high; lower R$ 9,90 in Phase 2
- High Tier 2, low Tier 1 → card friction (foreign issuer rejection, 3DS); investigate Stripe Radar logs + consider Pix migration
- Low Tier 3 AND low Tier 2 AND low Tier 1 → message-market fit problem; rethink positioning before fixing payment
- High Tier 1 → green-light Phase 2 MVP regardless of Tier 2/3 numbers

**Decision rule:** If 3+ signals hit "Kill" → pivot or shut down BR wedge. If 3+ hit "Continue" → green-light Phase 2 MVP. If "Strong PMF" on any 2 signals → fast-track Phase 2 + raise.

### 5.6 Fraud / rate limiting / abuse guards (Codex's missing #2)

- **Rate limits**:
  - `POST /api/leads`: 5/min per IP, 3/hour per email
  - `POST /api/checkout/create`: 3/min per IP, 2/hour per email
  - `POST /api/auth/magic-link`: 3/hour per email
  - `POST /api/lgpd/request`: 5/day per email
- **Bot detection**:
  - Cloudflare Turnstile on the modal form (invisible challenge unless suspicious)
  - Honeypot field (hidden input filled by bots, never by humans)
- **Stripe fraud signals**: enable Stripe Radar (free tier) — auto-decline high-risk cards
- **Email validation**: reject disposable email domains via a small blocklist
- **Email + WhatsApp uniqueness**: same email or WhatsApp can only signup once (DB unique constraint + `409 Conflict` response)
- **Geo restriction**: optional — only accept signups with `ip_country='BR'` (warn but don't block — could exclude legitimate diaspora)

### 5.7 Analytics event taxonomy (Codex's missing #3)

Track these events explicitly. Each fires to Vercel Analytics + Meta Pixel + TikTok Pixel + Kwai Pixel. Naming convention: `verb_noun`.

| Event | When | Properties | Tier |
|---|---|---|---|
| `view_landing` | Page mount | utm_source, utm_campaign, referrer | — |
| `view_section_X` | Section enters viewport (50%+) | section_name | — |
| `click_cta_hero` | Hero "Garantir vaga" clicked | utm context | — |
| `click_cta_pricing` | Pricing CTA clicked | — | — |
| `click_cta_final` | Final-CTA clicked | — | — |
| `click_chip` | Hero template chip clicked | chip_name | — |
| `click_cta_free` | Free secondary CTA clicked (any location) | source_section | — |
| `submit_pay_form` | Pay-modal form submitted | use_case | Path A start |
| `submit_email_only_form` | Email-only modal form submitted | use_case | Tier 3 captured |
| `start_checkout` | Stripe Checkout redirect initiated | amount=990 | — |
| `complete_checkout` | Stripe webhook confirms paid | position | **Tier 1** |
| `fail_checkout` | success_url returned without webhook OR cancel_url | failure_type | Tier 2 confirmed |
| `view_dashboard` | Dashboard mount | tier (paid / intent_recognized) | — |
| `click_refund_request` | Refund button clicked | days_since_paid | — |
| `complete_refund` | Refund Stripe webhook confirms | — | — |
| `click_whatsapp_owner` | WhatsApp button clicked | source_section | — |

**Why this taxonomy matters:** without it we can't distinguish curiosity (Tier 3) from real intent (Tier 1) and Codex's "the click is not the same as the payment" critique can't be measured. Every event must be wired before launch.

```
LP "Garantir vaga R$ 9,90" CTA (any of 4 places: hero, pricing, final CTA, sticky nav)
        ↓
Modal opens — captures: nome, email, WhatsApp, use_case (dropdown), LGPD consent checkbox (required)
        ↓
POST /api/leads  → stores Tier 3 (email_only) record immediately
        ↓
POST /api/checkout/create (FastAPI)  → creates Stripe Checkout Session
  - payment_method_types: ['card']   ← cards only in v1
  - amount: 990 (R$ 9,90 in cents)
  - currency: 'brl'
  - mode: 'payment'
  - locale: 'pt-BR'
  - metadata: {lead_id, utm_*, terms_version}
  - On record: upsert whitelist_signups row with status='intent_pending', stripe_session_id, checkout_expires_at
        ↓
302 to Stripe-hosted Checkout (cards form)
        ↓
User enters card  →  Stripe processes
        ↓                              ↓
   Card SUCCEEDS               Card FAILS (declined / 3DS abort / network)
        ↓                              ↓
Stripe redirects to              Stripe redirects to
  /br/obrigado?session_id=X        /br/cancelado?session_id=X
        ↓                              ↓
Page polls /api/me every          Page transitions row to status='intent_recognized'
  2s for ≤30s, watching for         (Tier 2 — does NOT count toward cap)
  webhook confirmation              shows "Cartão não autorizado, mas sua intenção
        ↓                              está registrada. Tente novamente em 24h
Webhook arrives → status='paid'    para garantir vaga (R$ 50 de crédito).
  (Tier 1 — counts toward cap)      Pagamento opcional pra entrar pra fila."
        ↓                              ↓
Confetti + dashboard               Email-only confirmation page (no dashboard)
  /br/painel?welcome=1
```

**Stripe webhook handler (idempotent):**

```
POST /api/webhooks/stripe (FastAPI, raw body preserved)
  - Verify signature with STRIPE_WEBHOOK_SECRET
  - Parse event.id, event.type, event.created
  - INSERT INTO stripe_events (event_id, type, received_at) ON CONFLICT DO NOTHING
      → if conflict (duplicate event), return 200 immediately (no-op)
  - BEGIN TRANSACTION
  -   SELECT FOR UPDATE the whitelist_signups row by stripe_session_id (row lock)
  -   Check current status; only transition forward (intent_pending → paid OK; paid → paid no-op)
  -   On 'checkout.session.completed' or 'payment_intent.succeeded':
        UPDATE whitelist_signups SET status='paid', paid_at=now()
        INSERT INTO signup_events (signup_id, event_type='paid', source='stripe_webhook')
        Generate referral_code (unique constraint enforces no dupes)
        Compute waitlist_position (next monotonic int, unique constraint)
        Set credit_brl_cents=5000, refund_deadline_at=paid_at + interval '7 days'
  -   On 'charge.refunded':
        UPDATE whitelist_signups SET status='refunded', refunded_at=now()
        INSERT INTO signup_events (signup_id, event_type='refunded', source='stripe_webhook')
  -   UPDATE stripe_events SET processed_at=now() WHERE event_id=...
  - COMMIT
  - Return 200
```

State machine (monotonic — never goes backwards except `refunded` from `paid`):

```
   intent_pending  →  paid  →  refunded
        ↓
   intent_recognized (Tier 2 — terminal unless retried)
   email_only (Tier 3 — terminal unless user later signs up)
```

**Webhook gotchas explicitly handled:**
- Out-of-order events: lock row + check status; never overwrite `paid` with anything except `refunded`
- Duplicate events: `stripe_events.event_id` unique constraint
- Webhook lag past 30s poll: client falls through to "processing in background" copy; webhook arriving later still updates status correctly
- Refund webhook arrives before our refund request finished writing: row lock prevents race

### 5.2 Backend (FastAPI on Railway) — Stripe-as-database architecture

**Architecture principle (fake-door PMF):** This LP lives a few days to a few weeks. Don't build a real backend. **Stripe is the source of truth.** All paid signups live in Stripe; we keep a tiny counter in Redis (or a JSON file) for fast reads of "spots remaining."

This trades long-term operability for short-term ship velocity. When v2 needs richer state (referrals, real subscriptions), we migrate to Postgres then.

**State we own (minimal):**

| Data | Where it lives | Why |
|---|---|---|
| Lead info (name, email, whatsapp, instagram, use_case, utm_*) | **Stripe Customer metadata** (created at /api/checkout/create) | Stripe stores it for us; we query via API |
| Payment status (intent_pending / paid / refunded) | **Stripe PaymentIntent + Stripe Customer + Stripe Events** | Stripe is the source of truth |
| Position in waitlist (1..100) | **Redis SET + atomic INCR**, key `waitlist:positions` | Cheap, atomic |
| Referral code → customer email | **Redis HASH**, key `waitlist:referrals` | Cheap lookup |
| LGPD consent version + timestamp | **Stripe Customer metadata** (terms_version, terms_accepted_at) | Auditable, no separate table |
| Webhook idempotency | **Redis SET with TTL**, key `stripe:processed_events`, 7-day TTL | Stripe retries within 3 days; 7-day TTL safe |
| Rate limit counters | **Redis** with TTL per key | Standard pattern |
| Spots-remaining counter | **Redis INCR**, key `waitlist:paid_count`, max 100 | Atomic counter |

**No Postgres. No Alembic. No migrations. No 7-table schema.**

**Endpoints (6, includes email-only path):**
- `POST /api/checkout/create` — Tier 1/2 path: create Stripe Customer (status='intent_pending', with all lead info as metadata) + Stripe Checkout Session
- `POST /api/leads/email-only` — Tier 3 path: create Stripe Customer (status='email_only', with all lead info as metadata). No Checkout Session created. Same form fields as pay path.
- `POST /api/webhooks/stripe` — handle `checkout.session.completed` + `charge.refunded`; idempotent via Redis event-id set
- `GET /api/me?token=<signed>` — return user's whitelist status (Tier 1 only — Tier 2/3 have no dashboard)
- `POST /api/me/refund?token=<signed>` — trigger refund via Stripe Refund API
- `GET /api/stats` — public spots-remaining counter (Tier 1 count only; cached 60s)

**Tier 3 → Tier 2/1 upgrade flow:**

When `/api/checkout/create` is called with an email that already exists as a Stripe Customer with `status='email_only'`:
1. Query `stripe.Customer.list(email=email, limit=1)` to find the existing customer
2. Update the existing customer's metadata: `status='intent_pending'`, merge new lead data (don't overwrite)
3. Create the Checkout Session against the existing customer ID
4. Webhook upgrade to `status='paid'` follows the normal path

No duplicate customer created. Stripe customer ID is the stable identifier across tier transitions.

**Tier 2 retry flow:**

When `/api/checkout/create` is called with an email that exists as `status='intent_pending'` (Tier 2):
1. Find existing customer
2. Create a NEW Checkout Session against the same customer ID
3. On successful payment, webhook transitions to `status='paid'`

**Webhook handler (Redis idempotency):**

```python
@app.post("/api/webhooks/stripe")
async def stripe_webhook(request: Request, redis: Redis):
    payload = await request.body()  # raw bytes for signature
    sig = request.headers["stripe-signature"]
    try:
        event = stripe.Webhook.construct_event(payload, sig, WEBHOOK_SECRET)
    except SignatureVerificationError:
        return Response(status_code=400)

    # Idempotency: SETNX with 7-day TTL
    if not redis.set(f"stripe:event:{event.id}", "1", nx=True, ex=604800):
        return Response(status_code=200)  # already processed

    if event.type == "checkout.session.completed":
        await handle_paid(event, redis)
    elif event.type == "charge.refunded":
        await handle_refunded(event, redis)
    # Other event types: ignore safely

    return Response(status_code=200)


async def handle_paid(event, redis):
    customer_id = event.data.object.customer
    # Atomic counter increment, capped at 100
    pos = redis.incr("waitlist:paid_count")
    if pos > 100:
        # Race: someone else got the last spot. Refund this one.
        redis.decr("waitlist:paid_count")
        stripe.Refund.create(
            payment_intent=event.data.object.payment_intent,
            reason="requested_by_customer",
            metadata={"reason": "waitlist_full_race"}
        )
        return
    # Generate referral code
    code = secrets.token_urlsafe(8)
    redis.hset("waitlist:referrals", code, customer_id)
    # Update Stripe Customer metadata with position + referral code
    stripe.Customer.modify(
        customer_id,
        metadata={"position": pos, "referral_code": code, "paid_at": int(time.time())}
    )
```

**Auth (signed URLs, no JWT, no magic-link):**

After Stripe Checkout success, we redirect to `/br/painel?token=<base64(customer_id):hmac>`. The HMAC is signed with a server secret. On every dashboard render, we verify the HMAC + fetch the Stripe Customer to display data. The URL becomes the user's persistent dashboard link — they bookmark it. Token never expires (until they refund); revocation = refund the customer.

**Rate limiting (Redis):**

```python
async def rate_limit(redis: Redis, key: str, max_per_window: int, window_seconds: int):
    count = redis.incr(f"rl:{key}")
    if count == 1:
        redis.expire(f"rl:{key}", window_seconds)
    if count > max_per_window:
        raise HTTPException(status_code=429, detail="Rate limit exceeded")
```

Applied to `POST /api/checkout/create`: 5/min per IP, 3/hour per email.

**LGPD data rights (simplified):**

`POST /api/lgpd/request` accepts an email, sends a verification request manually to an ops inbox (no email service). When verified, ops runs `stripe.Customer.delete(customer_id)` from a small admin CLI — Stripe purges the customer; we're done. No `lgpd_requests` table.

**No `signup_events` audit log:**

Stripe's Events API IS the audit log. Query `stripe.Event.list(customer=customer_id)` for full history. Free, complete, always current.

**FastAPI / Railway production guards (unchanged + simplified):**
- **Webhook handler reads raw bytes** (`request.body()`) — never `request.json()`
- Sentry for errors
- Structured JSON logging (Railway log shipping)
- Railway-provisioned Redis (free tier)
- `X-Forwarded-For` proxy header config
- CORS: permissive in v1 (no Vercel-preview-allowlist work — accept the wildcard for the temp page)
- `/healthz` endpoint
- Refund cron job: SKIP for v1 — refunds are user-initiated only via dashboard button. "Project killed" refund path is a manual Stripe Dashboard operation if needed.
- No webhook secret rotation in v1 (temporary page; rotate only on incident)

### 5.3 Refund mechanics (simplified)

**Path A — Self-serve refund within 7 days (per-user)**
- User clicks "Solicitar reembolso" on dashboard (only visible when `now() - paid_at < 7 days`, computed from Stripe Customer metadata)
- POST /api/me/refund?token=<signed>
- Backend calls `stripe.Refund.create(payment_intent=...)`
- On Stripe success: update Stripe Customer metadata `status=refunded`, decrement Redis spots counter (frees the seat)
- On Stripe failure: surface to user "Não conseguimos processar o reembolso automaticamente. Entre em contato pelo WhatsApp."

**Path B — Project killed: manual bulk refund**
- Use Stripe Dashboard or a small one-off admin script (`python scripts/refund_all.py --confirm`) to refund all Customers with metadata `status=paid`
- For paid signups older than 90 days: Stripe API can't refund; case-by-case via Stripe Dashboard or wire/Pix

**Refund window terms** (published in `/br/termos`):
- 7-day self-serve refund window from `paid_at`
- After 90 days, automatic Stripe Refund is technically unavailable; manual refund issued case-by-case
- Refund processed to original card on file; appears in 5-10 business days
- R$50 future credit is forfeit when refund is requested

### 5.4 LGPD compliance baseline (simplified for Stripe-as-DB)

**v1 requirements (must ship Day 1):**
- **Privacy policy page** at `/br/privacidade` with:
  - Controller identity: company legal name + HK/CN/SG address + DPO contact
  - **Subprocessors list**: Stripe (US/IE — payment + data store), Railway (US — hosting + Redis), Vercel (US/global edge — frontend), Cloudflare (US/global — DNS/Turnstile), Meta Pixel (US), TikTok Pixel (US/SG), Kwai Pixel (BR), Google Analytics (US)
  - Legal bases per processing purpose: consent (marketing) + contract execution (whitelist signup) + legitimate interest (security logs)
  - Data retention: while Stripe Customer exists (no separate retention to manage); analytics retention per processor defaults
  - **International transfer disclosure**: BR personal data flows to US/EU via Stripe/Vercel/Railway. We rely on ANPD Standard Contractual Clauses (SCC) signed with each subprocessor. Effective Aug 23, 2025 per ANPD Resolution.
  - Data subject rights: access, deletion, correction, portability, consent revocation — request at `/br/meus-dados`
  - DPO contact: `dpo@codeflying.app`
- **Terms of service page** at `/br/termos`: refund terms, cohort terms, R$ 50 credit terms, project kill clause, jurisdiction
- **Cookie consent banner** (LGPD Art. 7):
  - First-visit banner blocks all non-essential cookies until consent
  - Three categories: Essential (always on), Analytics (Vercel Analytics, GA4), Marketing (Meta/TikTok/Kwai pixels)
  - Granular toggle per category
  - "Aceitar todos" / "Aceitar essenciais" / "Personalizar" buttons
  - Stored in `localStorage` (`codeflying_consent_v1`) — NOT in a DB
  - Re-prompt if banner version changes
- **Data subject rights form** at `/br/meus-dados`:
  - Email input + request type radio (access / delete / export)
  - Submits to `/api/lgpd/request` — sends to ops inbox via Slack/Discord webhook (NOT email)
  - Ops manually verifies the requester (reply via WhatsApp from the phone number on Stripe Customer)
  - For deletion: ops runs `stripe.Customer.delete(customer_id)` — Stripe purges the customer; we're done
  - Fulfilled within 15 days per LGPD
- **DPO email alias** `dpo@codeflying.app` — auto-forwards to ops inbox; not a hired role for v1

**Data minimization (enforced):**
- Don't collect CPF on the form
- All PII lives only in Stripe (Customer metadata)
- Don't store payment card details (Stripe handles)
- Cookie consent storage is purely client-side; if user clears localStorage, banner re-shows

---

## 6. i18n architecture

### 6.1 Routing — `codeflying.app/br/` subpath strategy

We deploy the BR LP as a subpath on the existing `codeflying.app` domain, not as a separate domain. Trade-off: saves the cost + ops of a second domain, loses some BR-trust signal vs `.com.br`. Mitigated by: pt-BR copy, BRL currency, LGPD line, WhatsApp button, BR-shaped social proof.

**Route structure:**
- `codeflying.app/` → English (existing CodeFlying landing — out of scope for this project)
- `codeflying.app/br/` → Brazilian Portuguese (this project's primary surface)
- `codeflying.app/br/painel` → waitlist dashboard
- `codeflying.app/br/privacidade` → privacy policy
- `codeflying.app/br/meus-dados` → LGPD data rights form
- `codeflying.app/br/obrigado` → post-Stripe success thank-you (redirects to /br/painel)

**Default locale logic:**
- `codeflying.app/br/*` is its own pt-BR-locked surface; we don't auto-detect `Accept-Language` and redirect, because user lands on `/br/` deliberately (from a BR-targeted ad)
- No EN variant of THIS LP is required for v1 — internationals can read the English main site `codeflying.app/`. (Removed from acceptance criteria.)

**Implementation note:** Since this LP lives under a subpath on the existing codeflying.app domain, deployment must NOT replace the root site. Options:
- **Option A:** Build the LP as a separate Next.js app deployed at `br.codeflying.app` (subdomain), then add a redirect from `codeflying.app/br/*` → `br.codeflying.app/*`. Cleanest. (recommended)
- **Option B:** Build as a sub-app deployed to Vercel and use Vercel rewrites on the main codeflying.app project to route `/br/*` through. Requires touching the main project's Vercel config.

**Default to A** unless the main codeflying.app is already on Vercel and can take a rewrite cheaply.

### 6.2 Content management

- All copy in JSON files: `messages/pt.json` only (single locale, no EN variant for v1)
- Native speaker review pass (BR Portuguese, not Portugal) before launch
- Diacritics tested: ã, ç, ê, ó, é, ú, etc. with Inter font subset
- Date format: `DD/MM/AAAA`
- Currency: `R$ 29,90` (space, comma decimal)
- Plurals: handled via ICU MessageFormat (next-intl supports natively)

### 6.3 Files structure

```
/messages/
  pt.json       # primary, only locale for v1
/app/
  layout.tsx
  page.tsx                 # the LP (all 11 sections)
  privacidade/page.tsx     # privacy policy
  meus-dados/page.tsx      # LGPD data rights form
  painel/page.tsx          # waitlist dashboard
  obrigado/page.tsx        # post-Stripe redirect thank-you
```

No `[locale]` dynamic segment — single-locale deployment. If EN is added later, refactor to `[locale]` and add `en.json`.

---

## 7. Waitlist dashboard (`/br/painel`)

Reached only after successful Stripe Checkout. Authenticated via signed URL `?token=<base64(customer_id):hmac>` — user bookmarks this URL after payment. No JWT cookie, no magic-link recovery.

**No email confirmation in v1** — the dashboard IS the confirmation. The post-payment thank-you page emphasizes bookmarking: "**Salve esta página agora**: codeflying.app/br/painel?token=... — é o único link pra sua vaga."

**Implication:** if a user loses the URL, they must use the LGPD data-rights flow (`/br/meus-dados`) to recover access. Ops verifies via WhatsApp and re-issues the token manually. Acceptable for v1 PMF-test volume.

### 7.1 Celebration moment (on first arrival)

For users who just completed payment (Stripe → success_url poll resolved with `status=paid`), trigger a celebration on first dashboard mount, gated by `?welcome=1` query param:

- **Confetti burst** — subtle, brand-coral particles, ~1.5s, fires once, respects `prefers-reduced-motion: reduce`
- **Headline overlay** "Bem-vindo, [Primeiro Nome]! Você entrou pra primeira leva." — fades in/out over 2s
- Then settles into the standard dashboard cards

Suggested library: `canvas-confetti` (lightweight, no deps). Single fire on mount.

### 7.2 Sections
1. **Posição na fila** — large coral number, e.g., "Você é o #34 de 100"
2. **Crédito acumulado** — "R$ 50 de crédito reservado pra você"
3. **Código de referral** — copy-to-clipboard widget: "Indique amigos e ganhe R$ 50 a mais por indicação que pagar"
4. **Status** — "Pago em 13/05/2026" (DD/MM/AAAA)
5. **Próximos passos** — bulleted timeline: "Q3 2026: lançamento · Você é notificado via WhatsApp · Crédito aplicado automaticamente"
6. **Compartilhar** — pre-formatted WhatsApp share / Instagram story share / Telegram channel share with referral link
7. **Solicitar reembolso** — small ghost button at the bottom, links to refund request form (only visible within 7-day window)

Mobile-first design. ~5 screens of vertical scroll on phone, mostly self-contained.

---

## 8. Tech stack

### 8.1 Frontend (Vercel)

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) | Native i18n, RSC, Vercel-first deployment |
| Styling | Tailwind CSS 4 | shadcn/ui compatibility, fast dev |
| Components | shadcn/ui | Production-quality accessible primitives, copy-paste |
| Forms | react-hook-form + zod | Validation co-located with schema |
| Animation | framer-motion | Required for hero live-preview |
| Icons | lucide-react | MIT, tree-shakable |
| i18n | next-intl | Server-component-friendly, ICU MessageFormat |
| Analytics | Vercel Analytics + Meta Pixel + TikTok Pixel + Kwai Pixel | All channels we plan to test |
| Fonts | next/font with Inter subset | Includes Latin Extended (BR diacritics) |
| State | React Server Components default; useState client-only when needed | Minimize client JS |

### 8.2 Backend (Railway)

| Concern | Choice | Why |
|---|---|---|
| Framework | FastAPI | Per user direction |
| Persistence | **None (Stripe as DB) + Redis** | This is a fake-door PMF test; Stripe stores all lead/payment data; Redis stores spots counter + idempotency set + rate limit counters |
| Database | **No Postgres in v1** | Skipped per §5.2. Add when v2 needs real subscriptions. |
| Redis | Railway Redis (free tier) | Tiny: ~5 keys total |
| Payments | Stripe Python SDK | Cards-only in v1, foreign-entity-compatible |
| Email | **Removed for v1** | No email confirmation. Dashboard URL + WhatsApp click-to-chat carry all follow-up. LGPD verification handled manually via ops inbox. |
| Queue | **None** | No background jobs in v1 (refund cron skipped). Webhooks handle everything. |
| Auth | **Signed URLs (HMAC)** | No JWT, no magic-link. Dashboard URL contains `?token=<base64(customer_id):hmac>`. User bookmarks it. |
| Webhook signing | `stripe.Webhook.construct_event` | Standard practice |
| Env | Railway env vars | |

### 8.3 Repo layout

```
/Brazil/
  /web/                    # Next.js app
    /app/[locale]/...
    /components/
    /messages/
    /lib/
    /public/
    package.json
    next.config.js
  /api/                    # FastAPI app
    /app/
      main.py
      models.py
      routes/
      webhooks/
      services/
    /migrations/
    pyproject.toml
    railway.json
  PLAN.md                  # this file
  README.md                # setup + deploy instructions
  .env.example
```

Two separate deployments:
- `web/` → Vercel project, domain `codeflying.com.br`
- `api/` → Railway service, subdomain `api.codeflying.com.br`

CORS configured on FastAPI to accept the Vercel domain.

---

## 9. Acceptance criteria

This LP is "done for Phase 1" when:

- [ ] `codeflying.app/br/` (or `br.codeflying.app`) serves the LP in pt-BR with native-reviewed copy
- [ ] All 11 sections render in pt-BR with section rhythm (light/dark alternation) applied
- [ ] Hero prompt input rotates through 4+ BR-localized placeholders
- [ ] Hero live preview animates via framer-motion (both website + Telegram panels animate together) with reduced-motion fallback to static end-state
- [ ] Mobile hero uses the staggered-overlap pattern (not vertical stack)
- [ ] Use-case cards show product mockup thumbnails (not emoji icons)
- [ ] Pix comparison renders as a table on desktop, 3 stacked cards on mobile, with CodeFlying card visually elevated. Uses honest "marketplace vs SaaS" framing — NO "sem limite" or "Pix" claims for v1.
- [ ] Pricing calculator slider updates BRL math live with smooth count animation and footnote citing public Hotmart fee source
- [ ] **R$ 9,90 CTA (primary) + "Só quero ser avisado (grátis)" CTA (secondary)** appear side-by-side at every CTA location (hero, pricing, final CTA)
- [ ] Pay-modal opens on primary CTA → POST /api/checkout/create → Stripe Cards Checkout → on paid: dashboard + confetti; on failure: retry page (Customer stays at status='intent_pending' = Tier 2 signal)
- [ ] Email-only modal opens on secondary CTA → POST /api/leads/email-only → Stripe Customer with status='email_only' → in-modal confirmation page
- [ ] **All three tiers (paid / intent_pending / email_only) tracked as Stripe Customers** with metadata.status. Only paid counts toward 100-cap.
- [ ] Tier upgrade logic: email_only → intent_pending → paid (same Customer ID, monotonic transitions)
- [ ] Stripe webhook handler: raw-body signature verification, Redis SETNX idempotency, atomic INCR on spots counter with 100-cap race protection (auto-refund if over)
- [ ] Webhook-lag handling: `success_url` polls /api/me every 2s for ≤30s; falls through to "save this URL, come back later" copy
- [ ] Waitlist dashboard `/br/painel?token=<signed>` shows position, R$ 50 credit reserved, referral code, status, share buttons — pulled from Stripe Customer metadata
- [ ] Dashboard confetti fires once on first arrival (gated by `?welcome=1`), respects reduced-motion
- [ ] Spots-remaining counter reads from Redis, cached 60s server-side
- [ ] Privacy policy `/br/privacidade` published with: controller identity, subprocessors list (incl. Stripe as data store), legal bases, international transfer + SCC disclosure, data subject rights, DPO contact
- [ ] Terms of service `/br/termos` published with refund terms (7-day self-serve, 90-day Stripe window, manual after), credit terms, project kill clause
- [ ] LGPD data rights form `/br/meus-dados` posts to ops Slack/Discord webhook; ops verifies via WhatsApp; deletion executed via `stripe.Customer.delete` admin script
- [ ] Cookie consent banner with 3 categories (Essential / Analytics / Marketing); state stored in `localStorage`
- [ ] **Banned copy claims verified absent**: "Pix nativo", "Pix direto", "Sem limite", "a gente não toca no seu dinheiro", "Sem congelar sua conta", "Pix integrado", "Receba com Pix"
- [ ] **Honest copy verified present**: "Pagamento via cartão. Pix em Q3 2026.", "Sem comissão sobre venda", "Canal próprio"
- [ ] Refund-within-7-days button works end-to-end via Stripe Refund API. Refund deadline checked from Stripe Customer metadata.
- [ ] Rate limiting on `/api/checkout/create` (Redis-backed; 5/min per IP, 3/hour per email)
- [ ] Cloudflare Turnstile on modal form + honeypot field
- [ ] Stripe Radar enabled
- [ ] All copy reviewed by a native pt-BR speaker WITH BR legal awareness
- [ ] Analytics events firing: view_landing, view_section_*, click_cta_*, click_chip, submit_form, start_checkout, complete_checkout, fail_checkout, view_dashboard, click_refund_request, complete_refund, click_whatsapp_owner — to Vercel Analytics + Meta + TikTok + Kwai Pixel
- [ ] Success criteria published internally (kill/continue thresholds documented + agreed)
- [ ] Page hits 90+ Lighthouse score on mobile
- [ ] Domain DNS + SSL for `br.codeflying.app` (or path rewrite on codeflying.app)
- [ ] DPO email alias `dpo@codeflying.app` set up (auto-forward to ops)
- [ ] Sentry configured for FastAPI + Next.js
- [ ] **Test pyramid:** pytest unit + Stripe Test Mode integration + 1 Playwright E2E happy path. Critical paths covered: (1) webhook idempotency replay test, (2) 100-cap race protection (parallel webhooks), (3) signed URL HMAC verification, (4) refund flow at 7/90 day boundaries, (5) Stripe Checkout pt-BR locale renders, (6) rate-limit enforcement on /api/checkout/create. Tests run in CI before deploy.
- [ ] **NO Postgres in v1** — Stripe is the database, Redis is the counter
- [ ] **NO email service in v1** — dashboard URL is the sole confirmation surface; LGPD ops uses Slack/WhatsApp
- [ ] **NO Pix in v1** — `payment_method_types=['card']` only
- [ ] No EN variant required for v1

---

## 10. Phasing

### Phase 1 — Ship the LP (≈6-7 days, full test pyramid added)
- Day 1: Next.js bootstrap, Tailwind/shadcn setup, design tokens in `web/lib/design.ts`, FastAPI scaffolding, Railway Redis provisioning, DNS for `br.codeflying.app`
- Day 2: Hero (static + prompt rotation + framer-motion live preview) + nav + trust strip + section rhythm framework
- Day 3: Dual output + use cases (with product mockup thumbnails) + Pix comparison + pricing calculator
- Day 4: Social proof (global cases, honest framing) + FAQ + final CTA + privacy policy `/br/privacidade` + ToS `/br/termos` + cookie consent banner + LGPD data rights form `/br/meus-dados`
- Day 5: FastAPI backend (5 endpoints) + Stripe Customer + Checkout integration + webhook with Redis idempotency + rate limiting + signed-URL dashboard auth + pytest unit tests for webhook handler, signed URL, rate limit, atomic counter
- Day 6: Waitlist dashboard + confetti celebration + refund flow + spots counter + Turnstile + Stripe Test Mode integration tests (idempotency replay, 100-cap race, refund flow at boundaries) + 1 Playwright E2E happy path (form → checkout → dashboard)
- Day 7: Native pt-BR copy review + analytics taxonomy wiring (Meta/TikTok/Kwai pixels) + QA + Lighthouse + deploy + banned-copy grep verification

### Phase 2 — Iterate based on PMF signal (post-launch)
- Replace placeholder testimonials with real BR creators
- Record 90s embedded demo video
- Add email service (Resend or Postmark) for richer follow-up
- A/B test hero headline variants
- A/B test deposit amount (R$ 9,90 vs R$ 29 vs other)
- **Migrate to native BR Pix** via Pagar.me/Mercado Pago with CNPJ
- Add Pix support to v1 page copy (lift "Pix em Q3 2026" promise)
- Add EN variant if international traffic warrants
- Move from Tier 2 to recovery flow ("Tentar pagar de novo" CTA via WhatsApp)

### Phase 3 — Pre-MVP scale
- WhatsApp confirmation flow (in addition to email)
- Telegram channel integration (auto-invite to VIP waitlist channel)
- Multi-LP variants for sub-niches (`/coaches`, `/cursos` per existing strategy doc)
- Influencer / paid traffic launch

---

## 11. Risks & mitigations

| Risk | Probability | Mitigation |
|---|---|---|
| Stripe BR cards-only setup denies our foreign Stripe account | Medium | Confirm Stripe entity acceptance day 1. Have alternate: Stripe Atlas Delaware setup as backup. |
| pt-BR copy reads "gringo" → conversion tanks | Medium | Mandatory native speaker review WITH BR legal awareness. Budget $200-300 USD for senior Upwork BR copywriter. |
| LGPD complaint filed (ANPD or Reclame Aqui) | Medium | Full privacy policy + subprocessors list + cookie consent + DPO + data rights form + ToS published Day 1. Track all consents in DB. |
| Live preview animation too heavy → mobile perf bad | Medium | framer-motion-only, no Lottie, no video bg. Lighthouse mobile ≥ 90 hard gate. |
| R$ 9,90 conversion is weaker than expected | Medium | Success criteria are Tier 1 conversion ≥ 2.5% to continue; if below, kill or pivot the friction model in Phase 2. |
| Cards-only excludes a chunk of BR audience that prefers Pix | High | Acknowledged — this is the trust trade-off. We bet honest "Pix in Q3" beats overpromised "Pix nativo." If conversion proves too low, pivot to native Pix faster (move Phase 2 earlier). |
| Stripe Checkout in pt-BR has UX gaps for BR cards (Elo, Hipercard) | Medium | Stripe supports BR card networks. Test on a real BR-issued Elo card before launch. |
| "100 spots" perceived as fake scarcity | Low | Counter only counts Tier 1 paid. 60s server-side update rate. Refunds within 7d free seats; after 7d, no. Documented in `/br/termos`. |
| Reclame Aqui complaint about Hotmart comparison ("anti-competitive") | Low | All comparison claims based on published Hotmart fee schedule, cited in /br/sources page. No accusations ("freezes accounts" etc.) — only public-pricing math. |
| Webhook duplicate/out-of-order corrupts data | Low | `stripe_events` idempotency table + row locks + monotonic state transitions per §5.1. |
| Refund window past 90 days hits Stripe API limit | Low | Documented in `/br/termos`. After 90 days, manual refund path. `refund_provider_status='manual_required'` flag in DB. |

---

## 12. Open questions to resolve before code

1. **Vercel project setup** — does the existing `codeflying.app` project on Vercel allow a path rewrite for `/br/*`, OR should we deploy as `br.codeflying.app` subdomain? (Action: check Vercel project access day 1.)
2. **Existing CodeFlying entity that Stripe will accept** — China/HK/SG? Stripe acceptance + BRL settlement varies. (Action: confirm day 1.)
3. **Real global testimonial sourcing** — which 3 creator success stories from CodeFlying's 500k+ base are strongest? Need real screenshots + verified revenue. (Action: pull from CodeFlying ops day 2.)
4. **90s demo video** — defer to Phase 2; ship LP with embedded YouTube placeholder.
5. **WhatsApp Business API setup** — for the "kill the project" notification path + Phase 2 confirmation messages. (Defer until Phase 2.)
6. **BR card processor confirmation** — verify Stripe accepts BR Elo / Hipercard / domestic Visa with our entity. (Action: test charge day 5.)
7. **BR legal counsel for ToS + Privacy review** — recommended before launch but Phase 1 can ship with self-drafted versions; legal review in Phase 2. ~R$3-5k budget.
8. **DPO email volume** — auto-forward to ops works for v1; if LGPD requests exceed 5/week in Phase 2, consider a dedicated DPO role.

---

## 13. What this plan deliberately excludes

- **Multi-language beyond pt-BR** — English, Spanish (MX), Japanese, Vietnamese, Thai are separate wedges and out of scope.
- **Real product** — fake-door PMF test. The "build app in 10 min" promise is a wait-list promise, not a live product.
- **CodeFlying main app integration** — no SSO, no actual app generation. Standalone marketing LP + waitlist backend.
- **Email service** — no transactional email beyond the single LGPD-verification email. Dashboard URL + WhatsApp click-to-chat carry confirmation/follow-up.
- **Pricing experimentation beyond R$ 29 / R$ 49** — single price anchor for Phase 1.
- **A/B testing infrastructure** — Phase 2.
- **Pix in v1** — Cards-only. Native Pix in Q3 2026 with CNPJ. Stripe+EBANX cross-border Pix rejected as too-much-trust-cost.
- **Real BR creator testimonials** — Phase 1 uses global success cases with honest "new to BR" framing.
- **Hotmart "account freezes" accusations** — unsubstantiated, banned in copy. Comparisons stay on public-pricing math.
- **Auto-grant whitelist on payment failure** — replaced with three explicit tiers (paid / intent_recognized / email_only). Only paid counts toward cap.
- **Full WCAG AA audit** — loose a11y (shadcn defaults + explicit musts) for v1.

---

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | — | not run |
| Codex Review | `/codex review` | Independent 2nd opinion | 1 | CLEAR | 13 findings, all addressed |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 1 | CLEAR (PLAN) | 4 architecture decisions, full test pyramid added, Stripe-as-DB simplification |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | CLEAR (PLAN) | score: 6/10 → 9/10, 15 decisions added |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | — | not run |

- **CROSS-MODEL:** Claude (design + eng reviews) + Codex (adversarial review) agree on: section rhythm, mobile staggered overlap, authentic positioning, PMF state model rigor, webhook idempotency depth. Eng review simplification (Stripe-as-DB, drop Postgres + Tier 2/3 tracking) was user-driven, after Codex flagged over-engineering.
- **UNRESOLVED:** 0 design decisions; ~8 open practical questions for day 1 (see §12)
- **VERDICT:** Design + Codex + Eng reviews CLEARED. Ready to implement.

**End of plan.** Total scope: ~6-7 days (Stripe-as-DB simplification + full test pyramid). Total cost: ~$15-50/mo in services (Vercel + Railway free tiers; Stripe fees on R$ 9,90 cards negligible; Cloudflare Turnstile free; Sentry free tier). The "is this PMF" decision arrives after ~$500-2000 of paid traffic spend in Phase 2 + measuring against §5.5 success criteria.
