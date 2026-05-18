"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Turnstile } from "@/components/ui/Turnstile";
import { copy } from "@/lib/copy";
import { useModal } from "@/lib/modal-context";
import { useUtm } from "@/hooks/useUtm";
import { api, ApiError } from "@/lib/api";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, copy.modal.common.required),
  email: z.string().email(copy.modal.common.invalidEmail),
  whatsapp: z
    .string()
    .min(8, copy.modal.common.invalidWhatsapp)
    .regex(/^[+0-9\s()-]+$/, copy.modal.common.invalidWhatsapp),
  use_case: z.string().min(1, copy.modal.common.required),
  lgpd: z.literal(true, { message: copy.modal.common.required }),
});

type FormData = z.infer<typeof schema>;

export function Modal() {
  const { open, close } = useModal();
  const isOpen = open !== null;

  return (
    <div
      aria-hidden={!isOpen}
      className={cn(
        "fixed inset-0 z-50",
        isOpen ? "pointer-events-auto" : "pointer-events-none",
      )}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={cn(
          "absolute inset-0 bg-ink/40 transition-opacity duration-200",
          isOpen ? "opacity-100" : "opacity-0",
        )}
      />
      {/* Panel */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="absolute inset-x-4 top-8 mx-auto max-w-md sm:inset-x-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2"
        >
          <div className="relative rounded-md bg-white shadow-lg max-h-[90vh] overflow-y-auto">
            <button
              onClick={close}
              aria-label={copy.modal.common.close}
              className="absolute right-4 top-4 z-10 rounded-sm p-1 text-muted hover:bg-warm hover:text-ink transition-colors"
            >
              <X size={20} />
            </button>
            {open === "pay" && <PayForm />}
            {open === "email" && <EmailForm />}
          </div>
        </div>
      )}
    </div>
  );
}

function PayForm() {
  const utm = useUtm();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setSubmitting(true);
    track("submit_pay_form", { use_case: data.use_case });
    try {
      const resp = await api.createCheckout({
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        use_case: data.use_case,
        turnstile_token: turnstileToken || undefined,
        ...utm,
      });
      track("start_checkout", { amount: 990 });
      window.location.href = resp.checkout_url;
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        // Backend returns the dashboard URL in the detail
        if (err.message?.startsWith("http")) {
          window.location.href = err.message;
          return;
        }
        setServerError(copy.modal.pay.alreadyPaid);
      } else if (err instanceof ApiError && err.status === 429) {
        // Rate-limited — surface backend's user-friendly detail message
        setServerError(err.message || copy.modal.pay.errorGeneric);
      } else {
        setServerError(copy.modal.pay.errorGeneric);
      }
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 flex flex-col gap-4">
      <header className="flex flex-col gap-1 mb-2">
        <h2 id="modal-title" className="text-h3 text-ink">
          {copy.modal.pay.title}
        </h2>
        <p className="text-body-sm text-muted">{copy.modal.pay.sub}</p>
      </header>

      <Input
        autoFocus
        autoComplete="name"
        label={copy.modal.pay.fields.name}
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        type="email"
        autoComplete="email"
        label={copy.modal.pay.fields.email}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        type="tel"
        autoComplete="tel"
        placeholder="+55 11 99999-9999"
        label={copy.modal.pay.fields.whatsapp}
        error={errors.whatsapp?.message}
        {...register("whatsapp")}
      />
      <Select
        label={copy.modal.pay.fields.useCase}
        error={errors.use_case?.message}
        options={[...copy.modal.pay.fields.useCaseOptions]}
        {...register("use_case")}
      />

      <label className="flex items-start gap-2 text-body-sm text-body">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded-sm border-hairline accent-coral"
          {...register("lgpd")}
        />
        <span>
          {copy.modal.pay.fields.lgpd}{" "}
          <a
            href="/privacidade"
            target="_blank"
            className="text-coral underline"
          >
            {copy.modal.pay.fields.lgpdReadLink}
          </a>
        </span>
      </label>
      {errors.lgpd && (
        <p className="text-caption text-coral -mt-2" role="alert">
          {errors.lgpd.message}
        </p>
      )}

      {serverError && (
        <p className="text-body-sm text-coral bg-coral/5 rounded-sm p-3" role="alert">
          {serverError}
        </p>
      )}

      <Turnstile onVerify={setTurnstileToken} />

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={submitting}
        className="mt-2 w-full"
      >
        {submitting ? copy.modal.pay.submitLoading : copy.modal.pay.submit}
      </Button>

      <p className="text-caption text-muted text-center">
        {copy.modal.pay.paymentNote}
      </p>
    </form>
  );
}

function EmailForm() {
  const utm = useUtm();
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [surveyToken, setSurveyToken] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: FormData) => {
    setServerError(null);
    setSubmitting(true);
    track("submit_email_only_form", { use_case: data.use_case });
    try {
      const resp = await api.submitEmailOnly({
        name: data.name,
        email: data.email,
        whatsapp: data.whatsapp,
        use_case: data.use_case,
        turnstile_token: turnstileToken || undefined,
        ...utm,
      });
      if (resp.status === "already_paid" && resp.dashboard_url) {
        window.location.href = resp.dashboard_url;
        return;
      }
      // Pull the auth token out of the dashboard_url so the success-state
      // survey can authenticate against /api/me/survey.
      if (resp.dashboard_url) {
        try {
          const u = new URL(resp.dashboard_url, window.location.origin);
          const t = u.searchParams.get("token");
          if (t) setSurveyToken(t);
        } catch {
          /* malformed URL — survey just won't render */
        }
      }
      setSuccess(
        resp.status === "already_email_only"
          ? copy.modal.emailOnly.alreadyEmailOnly
          : copy.modal.emailOnly.confirmation,
      );
    } catch (err) {
      if (err instanceof ApiError && err.status === 429) {
        setServerError(err.message || copy.modal.emailOnly.errorGeneric);
      } else {
        setServerError(copy.modal.emailOnly.errorGeneric);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 sm:p-8 flex flex-col gap-5">
        <div className="text-center flex flex-col items-center gap-3">
          <div className="size-12 rounded-full bg-coral/10 flex items-center justify-center text-2xl">
            ✓
          </div>
          <h2 id="modal-title" className="text-h3 text-ink">
            {copy.modal.emailOnly.doneTitle}
          </h2>
          <p className="text-body text-body">{success}</p>
        </div>
        {surveyToken && <EmailOnlySurvey token={surveyToken} />}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 sm:p-8 flex flex-col gap-4">
      <header className="flex flex-col gap-1 mb-2">
        <h2 id="modal-title" className="text-h3 text-ink">
          {copy.modal.emailOnly.title}
        </h2>
        <p className="text-body-sm text-muted">{copy.modal.emailOnly.sub}</p>
      </header>

      <Input
        autoFocus
        autoComplete="name"
        label={copy.modal.pay.fields.name}
        error={errors.name?.message}
        {...register("name")}
      />
      <Input
        type="email"
        autoComplete="email"
        label={copy.modal.pay.fields.email}
        error={errors.email?.message}
        {...register("email")}
      />
      <Input
        type="tel"
        autoComplete="tel"
        placeholder="+55 11 99999-9999"
        label={copy.modal.pay.fields.whatsapp}
        error={errors.whatsapp?.message}
        {...register("whatsapp")}
      />
      <Select
        label={copy.modal.pay.fields.useCase}
        error={errors.use_case?.message}
        options={[...copy.modal.pay.fields.useCaseOptions]}
        {...register("use_case")}
      />

      <label className="flex items-start gap-2 text-body-sm text-body">
        <input
          type="checkbox"
          className="mt-1 size-4 rounded-sm border-hairline accent-coral"
          {...register("lgpd")}
        />
        <span>
          {copy.modal.pay.fields.lgpd}{" "}
          <a
            href="/privacidade"
            target="_blank"
            className="text-coral underline"
          >
            {copy.modal.pay.fields.lgpdReadLink}
          </a>
        </span>
      </label>
      {errors.lgpd && (
        <p className="text-caption text-coral -mt-2" role="alert">
          {errors.lgpd.message}
        </p>
      )}

      {serverError && (
        <p className="text-body-sm text-coral bg-coral/5 rounded-sm p-3" role="alert">
          {serverError}
        </p>
      )}

      <Turnstile onVerify={setTurnstileToken} />

      <Button
        type="submit"
        variant="secondary"
        size="lg"
        disabled={submitting}
        className="mt-2 w-full"
      >
        {submitting ? copy.modal.emailOnly.submitLoading : copy.modal.emailOnly.submit}
      </Button>
    </form>
  );
}

/**
 * Post-signup survey shown to free-tier users in the email-only modal's
 * success state. Asks which factors pulled them in. Optional — closing
 * the modal without submitting is fine.
 */
function EmailOnlySurvey({ token }: { token: string }) {
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
      setErrorMsg(copy.modal.emailOnly.survey.errorGeneric);
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-md bg-coral/5 border border-coral/20 p-4 text-center">
        <p className="text-body-sm text-coral font-semibold">
          ✓ {copy.modal.emailOnly.survey.thanks}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md bg-coral/5 border border-coral/20 p-5 flex flex-col gap-3">
      <div className="flex flex-col gap-0.5">
        <h3 className="text-body-lg font-semibold text-ink">
          {copy.modal.emailOnly.survey.title}
        </h3>
        <p className="text-body-sm text-muted">{copy.modal.emailOnly.survey.sub}</p>
      </div>

      <div className="flex flex-col gap-1">
        {copy.modal.emailOnly.survey.factors.map((f) => (
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
            <span className="text-body-sm text-ink">{f.label}</span>
          </label>
        ))}
      </div>

      {factors.includes("other") && (
        <textarea
          value={otherText}
          onChange={(e) => setOtherText(e.target.value)}
          placeholder={copy.modal.emailOnly.survey.otherPlaceholder}
          rows={3}
          className="w-full rounded-sm border border-hairline bg-white px-3 py-2 text-body-sm placeholder:text-muted focus:outline-none focus:border-coral focus:ring-2 focus:ring-coral/20 resize-none"
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
        size="sm"
        onClick={submit}
        disabled={state === "loading" || factors.length === 0}
        className="self-start"
      >
        {state === "loading"
          ? copy.modal.emailOnly.survey.submitLoading
          : copy.modal.emailOnly.survey.submit}
      </Button>
    </div>
  );
}

/**
 * Handle Escape key to close + focus trap.
 * Wrapped in a separate hook to keep main Modal component focused on layout.
 */
export function useModalAria() {
  const { open, close } = useModal();

  useEffect(() => {
    if (!open) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      }
    };
    window.addEventListener("keydown", handleKeydown);

    // Lock body scroll
    const originalOverflow = document.body.style.overflow;
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = "";
    };
  }, [open, close]);
}
