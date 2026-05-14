import type { Metadata } from "next";
import { LegalShell } from "@/components/LegalShell";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade da CodeFlying em conformidade com a LGPD.",
};

export default function PrivacidadePage() {
  return (
    <LegalShell title="Política de Privacidade">
      <p className="text-body-sm text-muted">Atualizado em 13/05/2026 · Versão v1.0-2026-05-13</p>

      <Section title="1. Identidade do Controlador">
        <p>
          O Controlador dos dados pessoais coletados nesta landing page é a{" "}
          <strong>CodeFlying</strong>, sediada em [endereço internacional do controlador].
        </p>
        <p>
          DPO (Encarregado de Proteção de Dados): <a href="mailto:dpo@codeflying.app" className="text-coral underline">dpo@codeflying.app</a>
        </p>
      </Section>

      <Section title="2. Dados que coletamos">
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong>Identificação:</strong> nome, email, WhatsApp</li>
          <li><strong>Comportamento:</strong> caso de uso selecionado, parâmetros UTM da campanha de origem</li>
          <li><strong>Técnicos:</strong> endereço IP, user-agent, país inferido</li>
          <li><strong>Consentimentos:</strong> versão dos termos e da política aceitos, data e hora do consentimento</li>
          <li><strong>Pagamento (somente Tier 1):</strong> processado e armazenado pela Stripe; não armazenamos dados de cartão</li>
        </ul>
      </Section>

      <Section title="3. Finalidades e bases legais">
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li><strong>Pré-cadastro na lista de espera (consentimento + execução de contrato):</strong> entregar a vaga, comunicar o lançamento, aplicar crédito promocional</li>
          <li><strong>Análise de campanha (legítimo interesse):</strong> medir conversão e otimizar anúncios — sujeito ao seu consentimento de cookies de marketing</li>
          <li><strong>Segurança (legítimo interesse):</strong> prevenção de fraude e proteção do serviço</li>
        </ul>
      </Section>

      <Section title="4. Subprocessadores (lista de operadores)">
        <p>
          Compartilhamos dados estritamente necessários com os seguintes operadores. Cada um opera sob Cláusulas Contratuais Padrão (CCP) da ANPD para transferências internacionais.
        </p>
        <table className="w-full text-body-sm border-collapse mt-3">
          <thead className="bg-warm/50">
            <tr>
              <th className="border border-hairline p-2 text-left">Operador</th>
              <th className="border border-hairline p-2 text-left">Finalidade</th>
              <th className="border border-hairline p-2 text-left">Localidade</th>
            </tr>
          </thead>
          <tbody>
            {subprocessors.map((sp) => (
              <tr key={sp.name}>
                <td className="border border-hairline p-2">{sp.name}</td>
                <td className="border border-hairline p-2">{sp.purpose}</td>
                <td className="border border-hairline p-2">{sp.region}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>

      <Section title="5. Transferência internacional de dados">
        <p>
          Seus dados podem ser transferidos para os Estados Unidos e União Europeia para processamento por nossos operadores. Adotamos as <strong>Cláusulas Contratuais Padrão</strong> aprovadas pela ANPD em 23 de agosto de 2025 como mecanismo legal de transferência.
        </p>
        <p>
          <strong>Dados de cidadãos brasileiros NÃO são transferidos para a China</strong>, mesmo que tenhamos operações lá. Bancos de dados regionais isolados.
        </p>
      </Section>

      <Section title="6. Retenção">
        <ul className="list-disc pl-6 flex flex-col gap-2">
          <li>Dados de cadastro: enquanto sua conta de Cliente Stripe existir</li>
          <li>Dados de pagamento: conforme retenção da Stripe (mínimo 5 anos por obrigação fiscal)</li>
          <li>Logs de segurança: 90 dias</li>
          <li>Consentimentos: indefinidamente (prova de consentimento)</li>
        </ul>
      </Section>

      <Section title="7. Seus direitos (LGPD Art. 18)">
        <p>
          Você tem direito a: acessar seus dados, corrigir, deletar, exportar (portabilidade), revogar consentimento, ser informado sobre operadores, e ser notificado sobre incidentes que possam afetar você.
        </p>
        <p>
          Exerça qualquer direito em <a href="/meus-dados" className="text-coral underline">codeflying.app/br/meus-dados</a>. Respondemos em até 15 dias.
        </p>
      </Section>

      <Section title="8. Cookies">
        <p>
          Usamos cookies essenciais (sempre ativos), analytics (opt-in) e marketing (opt-in). Você gerencia preferências pelo banner que aparece na primeira visita ou apagando o localStorage.
        </p>
      </Section>

      <Section title="9. Contato">
        <p>
          Dúvidas sobre privacidade: <a href="mailto:dpo@codeflying.app" className="text-coral underline">dpo@codeflying.app</a>
        </p>
        <p>
          Reclamações: você também pode acionar a ANPD (Autoridade Nacional de Proteção de Dados) em <a href="https://www.gov.br/anpd/pt-br" target="_blank" rel="noopener noreferrer" className="text-coral underline">gov.br/anpd</a>.
        </p>
      </Section>
    </LegalShell>
  );
}

const subprocessors = [
  { name: "Stripe Inc.", purpose: "Processamento de pagamento + armazenamento de dados de cliente", region: "EUA / Irlanda" },
  { name: "Railway", purpose: "Hospedagem do backend + Redis", region: "EUA" },
  { name: "Vercel", purpose: "Hospedagem do frontend + analytics", region: "EUA / borda global" },
  { name: "Cloudflare", purpose: "DNS + Turnstile (proteção contra bots)", region: "EUA / borda global" },
  { name: "Meta Platforms", purpose: "Meta Pixel (somente com consentimento de marketing)", region: "EUA" },
  { name: "TikTok Pte. Ltd.", purpose: "TikTok Pixel (somente com consentimento de marketing)", region: "EUA / Singapura" },
  { name: "Kuaishou Technology", purpose: "Kwai Pixel (somente com consentimento de marketing)", region: "Brasil / Singapura" },
  { name: "Google LLC", purpose: "Google Analytics (somente com consentimento de analytics)", region: "EUA" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="text-h3 text-ink mt-4">{title}</h2>
      <div className="flex flex-col gap-3 text-body">{children}</div>
    </section>
  );
}
