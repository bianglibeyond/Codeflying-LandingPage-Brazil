"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { api, type MeResponse } from "@/lib/api";
import { copy } from "@/lib/copy";
import { formatBRL, formatBRDate } from "@/lib/utils";
import { track, identify } from "@/lib/analytics";
import { confettiColors, prefersReducedMotion } from "@/lib/design";

export default function PainelPage() {
  return (
    <Suspense fallback={<LoadingShell />}>
      <PainelInner />
    </Suspense>
  );
}

function LoadingShell() {
  return (
    <div className="bg-substrate min-h-screen flex flex-col items-center justify-center px-6">
      <p className="text-body-lg text-muted">{copy.painel.loading}</p>
    </div>
  );
}

/**
 * The dashboard token is `base64url(customer_id).hmac`. We can derive the
 * Stripe customer_id client-side without trusting it (the API still verifies
 * the HMAC). This is used purely to attach analytics events to a stable id.
 */
function decodeCustomerIdFromToken(token: string | null): string {
  if (!token) return "";
  try {
    const [encoded] = token.split(".");
    if (!encoded) return "";
    const b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    return atob(b64);
  } catch {
    return "";
  }
}

/**
 * Dashboard (PLAN §7).
 * Auth via signed URL HMAC token. No JWT, no cookie.
 * Renders position, credit, status, post-payment survey, refund flow.
 * Fires confetti on first visit (welcome=1 param).
 */
function PainelInner() {
  const params = useSearchParams();
  const router = useRouter();
  const token = params.get("token");
  const welcome = params.get("welcome") === "1";

  const [data, setData] = useState<MeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.replace("/");
      return;
    }
    let cancelled = false;
    const customerId = decodeCustomerIdFromToken(token);
    if (customerId) identify(customerId);
    api
      .getMe(token)
      .then((resp) => {
        if (cancelled) return;
        setData(resp);
        track("view_dashboard", { tier: resp.status });
      })
      .catch(() => {
        if (cancelled) return;
        setError("Link inválido ou expirado. Entre de novo pela página principal.");
      });
    return () => {
      cancelled = true;
    };
  }, [token, router]);

  useEffect(() => {
    if (welcome && data?.status === "paid" && !prefersReducedMotion()) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: confettiColors,
        ticks: 200,
      });
    }
  }, [welcome, data]);

  if (error) {
    return (
      <Shell>
        <p className="text-body-lg text-coral">{copy.painel.invalidToken}</p>
        <Link href="/" className="text-body-sm text-muted underline mt-4">
          {copy.painel.homeLink}
        </Link>
      </Shell>
    );
  }

  if (!data) {
    return (
      <Shell>
        <Skeleton />
      </Shell>
    );
  }

  if (data.status === "paid" || data.status === "refunded") {
    return <PaidDashboard data={data} token={token!} welcome={welcome} />;
  }

  // intent_pending or email_only — soft welcome
  return <SoftDashboard data={data} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-substrate min-h-screen flex flex-col">
      <header className="bg-substrate border-b border-hairline">
        <div className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
          <Link href="/" className="text-h4 font-bold text-ink">
            CodeFlying
          </Link>
        </div>
      </header>
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-10 flex flex-col gap-6">{children}</div>
      </main>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="flex flex-col gap-4 animate-pulse">
      <div className="h-12 w-2/3 bg-warm rounded-sm" />
      <div className="h-32 bg-warm rounded-md" />
      <div className="h-32 bg-warm rounded-md" />
      <div className="h-32 bg-warm rounded-md" />
    </div>
  );
}

function PaidDashboard({
  data,
  token,
  welcome,
}: {
  data: MeResponse;
  token: string;
  welcome: boolean;
}) {
  const firstName = data.name.split(" ")[0];
  const refunded = data.status === "refunded";
  const refundOpen =
    !refunded &&
    data.refund_deadline_at &&
    new Date(data.refund_deadline_at).getTime() > Date.now();
  const daysLeft = data.refund_deadline_at
    ? Math.max(0, Math.ceil((new Date(data.refund_deadline_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 0;

  return (
    <Shell>
      {welcome && (
        <header className="rounded-md bg-coral/5 border border-coral/20 p-5">
          <h1 className="text-h2 text-ink">
            {copy.painel.welcome.replace("{firstName}", firstName)}
          </h1>
        </header>
      )}

      {!data.survey_submitted_at && data.status === "paid" && (
        <SurveyCard token={token} />
      )}

      <p className="text-body-sm text-muted">{copy.painel.bookmark}</p>

      <Card>
        <Label>{copy.painel.positionLabel}</Label>
        <div className="flex items-baseline gap-2">
          <span className="text-display text-coral font-bold tabular-nums">
            #{data.position ?? "—"}
          </span>
          <span className="text-h4 text-muted">{copy.painel.positionOf}</span>
        </div>
      </Card>

      <Card>
        <Label>{copy.painel.creditLabel}</Label>
        <p className="text-h2 text-ink tabular-nums">
          {formatBRL((data.credit_brl_cents ?? 5000) / 100)}
        </p>
        <p className="text-body-sm text-muted">{copy.painel.creditValue}</p>
      </Card>

      <Card>
        <Label>{copy.painel.statusLabel}</Label>
        {refunded ? (
          <p className="text-body text-muted">
            {copy.painel.refundedOnDate.replace(
              "{date}",
              data.refunded_at ? formatBRDate(data.refunded_at) : "—",
            )}
          </p>
        ) : (
          <p className="text-body text-ink">
            ✓ {copy.painel.statusPaid.replace("{date}", data.paid_at ? formatBRDate(data.paid_at) : "—")}
          </p>
        )}
      </Card>

      <Card>
        <Label>{copy.painel.nextStepsLabel}</Label>
        <ul className="flex flex-col gap-2">
          {copy.painel.nextSteps.map((step, i) => (
            <li key={i} className="flex items-start gap-2 text-body">
              <span className="mt-1.5 size-1.5 rounded-full bg-coral shrink-0" aria-hidden />
              {step}
            </li>
          ))}
        </ul>
      </Card>

      {refundOpen && (
        <Card>
          <Label>{copy.painel.refundLabel}</Label>
          <p className="text-body-sm text-muted">
            {copy.painel.refundWithinWindow.replace("{days}", String(daysLeft))}
          </p>
          <RefundButton token={token} />
        </Card>
      )}
    </Shell>
  );
}

function SoftDashboard({ data }: { data: MeResponse }) {
  const firstName = data.name.split(" ")[0];
  return (
    <Shell>
      <header className="rounded-md bg-warm border border-hairline p-5">
        <h1 className="text-h2 text-ink">
          {data.status === "email_only"
            ? copy.painel.softTitleEmailOnly.replace("{firstName}", firstName)
            : copy.painel.welcomeSoft}
        </h1>
        <p className="text-body text-body mt-2">
          {data.status === "email_only"
            ? copy.painel.softBodyEmailOnly
            : copy.painel.softBodyIntent}
        </p>
      </header>
      <Link href="/" className="text-body-sm text-coral underline self-start">
        {copy.painel.homeLink}
      </Link>
    </Shell>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-md bg-white border border-hairline p-5 flex flex-col gap-2">
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-caption uppercase tracking-wider text-muted font-semibold">
      {children}
    </span>
  );
}

function SurveyCard({ token }: { token: string }) {
  const [factors, setFactors] = useState<string[]>([]);
  const [otherText, setOtherText] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const toggle = (value: string) => {
    setFactors((prev) =>
      prev.includes(value) ? prev.filter((f) => f !== value) : [...prev, value],
    );
  };

  const submit = async () => {
    if (factors.length === 0) return;
    setState("loading");
    try {
      await api.submitSurvey(token, {
        factors,
        other_text: factors.includes("other") ? otherText : "",
      });
      setState("done");
    } catch {
      setErrorMsg(copy.painel.survey.errorGeneric);
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-md bg-coral/5 border border-coral/20 p-5">
        <p className="text-body text-coral font-semibold">
          ✓ {copy.painel.survey.thanks}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-coral/5 border border-coral/30 p-5 sm:p-6 flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-h3 text-ink">{copy.painel.survey.title}</h3>
        <p className="text-body-sm text-muted">{copy.painel.survey.sub}</p>
      </div>

      <div className="flex flex-col gap-2">
        {copy.painel.survey.factors.map((f) => (
          <label
            key={f.value}
            className="flex items-start gap-3 cursor-pointer rounded-sm hover:bg-white/50 -mx-2 px-2 py-1.5 transition-colors"
          >
            <input
              type="checkbox"
              checked={factors.includes(f.value)}
              onChange={() => toggle(f.value)}
              className="mt-1 size-4 rounded-sm border-hairline accent-coral shrink-0"
            />
            <span className="text-body text-ink">{f.label}</span>
          </label>
        ))}
      </div>

      {factors.includes("other") && (
        <textarea
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
          placeholder={copy.painel.survey.otherPlaceholder}
          rows={3}
          className="w-full rounded-sm border border-hairline bg-white px-3 py-2.5 text-body placeholder:text-muted focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 resize-none"
          maxLength={500}
        />
      )}

      {errorMsg && (
        <p className="text-body-sm text-coral" role="alert">
          {errorMsg}
        </p>
      )}

      <Button
        type="button"
        variant="primary"
        onClick={submit}
        disabled={state === "loading" || factors.length === 0}
        className="self-start"
      >
        {state === "loading"
          ? copy.painel.survey.submitLoading
          : copy.painel.survey.submit}
      </Button>
    </div>
  );
}

function RefundButton({ token }: { token: string }) {
  const [state, setState] = useState<"idle" | "confirming" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleClick = async () => {
    if (state === "idle") {
      setState("confirming");
      return;
    }
    if (state === "confirming") {
      setState("loading");
      track("click_refund_request");
      try {
        const resp = await api.requestRefund(token);
        if (resp.status === "refunded") {
          setState("done");
          track("complete_refund");
        } else {
          setErrorMsg(resp.message ?? copy.painel.refundError);
          setState("error");
        }
      } catch {
        setErrorMsg(copy.painel.refundError);
        setState("error");
      }
    }
  };

  if (state === "done") {
    return (
      <p className="text-body text-coral bg-coral/5 rounded-sm p-3" role="status">
        {copy.painel.refundSuccess}
      </p>
    );
  }
  if (state === "error" && errorMsg) {
    return (
      <p className="text-body text-coral bg-coral/5 rounded-sm p-3" role="alert">
        {errorMsg}
      </p>
    );
  }

  return (
    <Button
      type="button"
      variant={state === "confirming" ? "primary" : "ghost"}
      size="sm"
      onClick={handleClick}
      disabled={state === "loading"}
    >
      {state === "loading"
        ? copy.painel.refundLoading
        : state === "confirming"
          ? copy.painel.refundConfirming
          : copy.painel.refundLabel}
    </Button>
  );
}
