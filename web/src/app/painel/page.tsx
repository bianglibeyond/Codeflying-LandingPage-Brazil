"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Copy, Check } from "lucide-react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/Button";
import { api, type MeResponse } from "@/lib/api";
import { copy } from "@/lib/copy";
import { formatBRL, formatBRDate } from "@/lib/utils";
import { track } from "@/lib/analytics";
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
 * Dashboard (PLAN §7).
 * Auth via signed URL HMAC token. No JWT, no cookie.
 * Renders position, credit, referral code, share buttons, refund flow.
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

  const referralLink =
    typeof window !== "undefined" && data.referral_code
      ? `${window.location.origin}/?ref=${data.referral_code}`
      : "";

  return (
    <Shell>
      {welcome && (
        <header className="rounded-md bg-coral/5 border border-coral/20 p-5">
          <h1 className="text-h2 text-ink">
            {copy.painel.welcome.replace("{firstName}", firstName)}
          </h1>
        </header>
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
        <Label>{copy.painel.referralLabel}</Label>
        {data.referral_code ? (
          <CopyField text={referralLink} />
        ) : (
          <p className="text-body-sm text-muted">Aguardando confirmação...</p>
        )}
        <p className="text-body-sm text-muted">{copy.painel.referralHelp}</p>
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

      <Card>
        <Label>{copy.painel.shareLabel}</Label>
        <ShareButtons link={referralLink} />
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

function CopyField({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="flex items-center gap-2 rounded-sm bg-warm/50 border border-hairline px-3 py-2">
      <code className="flex-1 truncate text-body-sm text-ink">{text}</code>
      <button
        type="button"
        onClick={() => {
          navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        }}
        aria-label="Copiar"
        className="rounded-sm p-1.5 text-muted hover:text-ink hover:bg-white transition-colors"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

function ShareButtons({ link }: { link: string }) {
  if (!link) return null;
  const message = encodeURIComponent(
    copy.shareTemplates.referralMessage.replace("{link}", link),
  );
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      <a
        href={`https://wa.me/?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#25D366]/10 text-[#25D366] px-4 py-2 text-body-sm font-semibold hover:bg-[#25D366]/20 transition-colors"
      >
        WhatsApp
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-telegram/10 text-telegram px-4 py-2 text-body-sm font-semibold hover:bg-telegram/20 transition-colors"
      >
        Telegram
      </a>
      <a
        href={`https://x.com/intent/tweet?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-ink/10 text-ink px-4 py-2 text-body-sm font-semibold hover:bg-ink/20 transition-colors"
      >
        X / Twitter
      </a>
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
