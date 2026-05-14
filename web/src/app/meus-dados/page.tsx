"use client";

import { useState } from "react";
import { LegalShell } from "@/components/LegalShell";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

const REQUEST_TYPES = [
  { value: "access", label: "Acessar meus dados" },
  { value: "export", label: "Exportar meus dados (portabilidade)" },
  { value: "delete", label: "Deletar meus dados" },
  { value: "correct", label: "Corrigir meus dados" },
  { value: "revoke", label: "Revogar consentimento" },
];

const OPS_INBOX = process.env.NEXT_PUBLIC_OPS_WEBHOOK ?? "";

/**
 * LGPD data subject rights form (PLAN §5.4).
 * v1: posts the request to an ops Slack/Discord webhook (no email service).
 * Ops manually verifies via WhatsApp + executes via `stripe.Customer.delete()`.
 */
export default function MeusDadosPage() {
  return (
    <LegalShell title="Meus Dados (LGPD)">
      <p className="text-body-lg">
        Aqui você exerce seus direitos sobre os dados pessoais que coletamos. Respondemos em até 15 dias, conforme a LGPD Art. 18.
      </p>
      <DataRightsForm />
      <p className="text-body-sm text-muted mt-6">
        Não está conseguindo? Contate diretamente <a href="mailto:dpo@codeflying.app" className="text-coral underline">dpo@codeflying.app</a>.
      </p>
    </LegalShell>
  );
}

function DataRightsForm() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      email: data.get("email"),
      request_type: data.get("request_type"),
      notes: data.get("notes"),
      submitted_at: new Date().toISOString(),
      // We don't post directly to a server endpoint in v1.
      // The dev/prod env can wire NEXT_PUBLIC_OPS_WEBHOOK to a Slack/Discord webhook URL.
    };
    try {
      if (OPS_INBOX) {
        await fetch(OPS_INBOX, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `[LGPD] ${payload.request_type} request from ${payload.email}\nNotes: ${payload.notes || "(none)"}`,
          }),
        });
      } else {
        console.log("[dev] LGPD request:", payload);
      }
      setDone(true);
    } catch {
      setError("Não conseguimos enviar agora. Mande direto para dpo@codeflying.app.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div className="rounded-md bg-coral/5 border border-coral/30 p-5 flex flex-col gap-2">
        <h2 className="text-h4 text-coral">Pedido recebido</h2>
        <p className="text-body">
          A gente vai verificar sua identidade via WhatsApp e responder em até 15 dias úteis. Você receberá um e-mail confirmando.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 rounded-md bg-white border border-hairline p-6 mt-4">
      <Input
        type="email"
        name="email"
        autoComplete="email"
        required
        label="Email cadastrado"
        hint="Use o mesmo email que você cadastrou no pré-cadastro."
      />
      <Select
        name="request_type"
        required
        label="O que você quer fazer?"
        options={REQUEST_TYPES}
      />
      <div>
        <label htmlFor="notes" className="text-body-sm font-medium text-ink mb-1.5 block">
          Observações (opcional)
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          className="w-full rounded-sm border border-hairline bg-white px-3 py-2.5 text-body placeholder:text-muted focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20"
          placeholder="Algum detalhe adicional pra gente entender melhor."
        />
      </div>
      {error && (
        <p className="text-body-sm text-coral bg-coral/5 rounded-sm p-3" role="alert">
          {error}
        </p>
      )}
      <Button type="submit" variant="primary" disabled={submitting} className="self-start">
        {submitting ? "Enviando..." : "Enviar pedido"}
      </Button>
      <p className="text-caption text-muted">
        Vamos te contatar pelo WhatsApp cadastrado para verificar sua identidade antes de processar.
      </p>
    </form>
  );
}
