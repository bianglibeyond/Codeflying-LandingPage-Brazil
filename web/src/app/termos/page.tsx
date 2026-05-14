import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso da CodeFlying — vaga de pré-cadastro.",
};

export default function TermosPage() {
  return (
    <LegalShell title="Termos de Uso">
      <p className="text-body-sm text-muted">Atualizado em 13/05/2026 · Versão v1.0-2026-05-13</p>

      <Section title="1. Sobre a CodeFlying">
        <p>
          A CodeFlying é uma plataforma de criação de aplicativos zero-code via IA, atualmente em pré-lançamento no Brasil. Esta página oferece um pré-cadastro com pagamento de R$ 9,90 para garantir vaga na primeira leva (limitada a 100 vagas).
        </p>
      </Section>

      <Section title="2. O que você recebe ao pagar R$ 9,90">
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Vaga reservada na primeira leva de 100 lançamentos (Q3 2026)</li>
          <li>R$ 50 de crédito aplicado automaticamente ao ativar sua assinatura no lançamento</li>
          <li>Acesso ao painel de acompanhamento (codeflying.app/br/painel)</li>
          <li>Comunicação direta via WhatsApp sobre o progresso da plataforma</li>
        </ul>
      </Section>

      <Section title="3. Reembolso">
        <p>
          <strong>Janela de 7 dias:</strong> Você pode solicitar reembolso integral pelo painel da CodeFlying em até 7 dias após o pagamento. O valor é estornado no cartão original via Stripe e aparece na sua fatura em 5-10 dias úteis.
        </p>
        <p>
          <strong>Após 7 dias:</strong> O R$ 50 de crédito permanece reservado. Para situações excepcionais após 7 dias, contate <a href="mailto:dpo@codeflying.app" className="text-coral underline">dpo@codeflying.app</a> — após 90 dias o reembolso via Stripe não é mais técnicamente possível e seria emitido manualmente.
        </p>
      </Section>

      <Section title="4. Se o projeto for cancelado">
        <p>
          Caso decidamos não lançar a CodeFlying no Brasil, reembolsaremos todos os R$ 9,90 pagos, sem necessidade de solicitação individual. Comunicaremos a decisão via WhatsApp e pelo painel.
        </p>
      </Section>

      <Section title="5. R$ 50 de crédito">
        <p>
          O crédito é vinculado à sua conta CodeFlying (identificada pelo email/Customer Stripe) e aplicado automaticamente na primeira assinatura mensal. Não é resgatável em dinheiro. Não é transferível.
        </p>
        <p>
          Se você solicitar reembolso dos R$ 9,90, o crédito de R$ 50 é cancelado simultaneamente — você não pode receber o reembolso E manter o crédito.
        </p>
      </Section>

      <Section title="6. Sobre o pagamento via cartão">
        <p>
          Em v1 (pré-lançamento), aceitamos somente cartão de crédito processado pela Stripe. Em Q3 2026 integraremos Pix nativo brasileiro. Cobranças aparecerão na fatura como &ldquo;CODEFLYING&rdquo; ou &ldquo;STRIPE *CODEFLYING&rdquo;.
        </p>
      </Section>

      <Section title="7. Cancelamento e suspensão pela CodeFlying">
        <p>
          A CodeFlying se reserva o direito de cancelar pré-cadastros por suspeita de fraude, abuso de bot, ou violação destes termos. Em caso de cancelamento por nossa parte, o reembolso é integral.
        </p>
      </Section>

      <Section title="8. Limitação de responsabilidade">
        <p>
          Em caso de qualquer disputa, nossa responsabilidade limita-se ao valor pago pelo Cliente (R$ 9,90). Não nos responsabilizamos por lucros cessantes, danos indiretos, ou expectativas geradas pelo pré-cadastro.
        </p>
      </Section>

      <Section title="9. Jurisdição e foro">
        <p>
          Estes termos seguem a legislação brasileira. Eventuais disputas serão resolvidas no foro do consumidor (artigo 101 do CDC).
        </p>
      </Section>

      <Section title="10. Alterações nestes termos">
        <p>
          Podemos atualizar estes termos. Mudanças materiais serão comunicadas pelo painel e via WhatsApp. Continuar usando a plataforma após mudanças significa aceitação da nova versão.
        </p>
      </Section>

      <p className="text-body-sm text-muted mt-8">
        Ver também: <a href="/privacidade" className="text-coral underline">Política de Privacidade</a> · <a href="/meus-dados" className="text-coral underline">Meus Dados (LGPD)</a>
      </p>
    </LegalShell>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-h3 text-ink mt-4">{title}</h2>
      <div className="flex flex-col gap-3 text-body">{children}</div>
    </section>
  );
}
