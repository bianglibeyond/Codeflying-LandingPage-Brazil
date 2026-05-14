"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

export default function ObrigadoPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <ObrigadoInner />
    </Suspense>
  );
}

function LoadingShell() {
  return (
    <div className="bg-substrate min-h-screen flex flex-col items-center justify-center px-6">
      <p className="text-body-lg text-muted">Carregando...</p>
    </div>
  );
}

/**
 * Stripe success redirect.
 * Receives ?session_id=cs_test_xxx, polls the backend session-status endpoint
 * until the webhook fires and the Customer.metadata.status flips to 'paid',
 * then redirects to the dashboard with a signed token.
 */
function ObrigadoInner() {
  const params = useSearchParams();
  const router = useRouter();
  const sessionId = params.get("session_id");

  const [status, setStatus] = useState<"polling" | "error" | "redirecting">(
    "polling",
  );
  const [tries, setTries] = useState(0);
  const MAX_TRIES = 15; // 30 seconds @ 2s interval

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      return;
    }
    let cancelled = false;
    let attempts = 0;

    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

    const poll = async () => {
      if (cancelled) return;
      attempts++;
      setTries(attempts);

      try {
        const res = await fetch(
          `${apiBase}/api/checkout/session-status?session_id=${encodeURIComponent(sessionId)}`,
          { cache: "no-store" },
        );
        if (res.ok) {
          const data: { ready: boolean; dashboard_url?: string } = await res.json();
          if (data.ready && data.dashboard_url) {
            setStatus("redirecting");
            window.location.href = data.dashboard_url + "&welcome=1";
            return;
          }
        }
      } catch {
        // network blip — keep polling
      }

      if (attempts >= MAX_TRIES) {
        // Webhook hasn't fired yet — show the "save this page" fallback
        setStatus("error");
        return;
      }
      window.setTimeout(poll, 2000);
    };
    poll();

    return () => {
      cancelled = true;
    };
  }, [sessionId, router]);

  return (
    <div className="bg-substrate min-h-screen flex flex-col items-center justify-center px-6 py-12 gap-6">
      <div className="max-w-md text-center flex flex-col gap-4">
        {status === "polling" && (
          <>
            <h1 className="text-h2 text-ink">Confirmando seu pagamento...</h1>
            <p className="text-body text-body">
              Pode levar uns segundos. Não feche essa página.
            </p>
            <div className="flex justify-center gap-1.5 mt-2" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-2 rounded-full bg-coral"
                  style={{
                    animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`,
                  }}
                />
              ))}
            </div>
            <p className="text-caption text-muted">Tentativa {tries}/{MAX_TRIES}</p>
          </>
        )}
        {status === "redirecting" && (
          <>
            <h1 className="text-h2 text-ink">Pagamento confirmado!</h1>
            <p className="text-body text-body">Levando você pra dashboard...</p>
          </>
        )}
        {status === "error" && (
          <>
            <h1 className="text-h2 text-ink">Pagamento processando</h1>
            <p className="text-body text-body">
              Seu pagamento ainda está sendo verificado pelo Stripe. Vamos te avisar
              pelo WhatsApp assim que confirmarmos. Você também pode tentar atualizar
              esta página em alguns minutos.
            </p>
            <Link href="/" className="text-body-sm text-coral underline mt-4">
              Voltar pra home
            </Link>
          </>
        )}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
}
