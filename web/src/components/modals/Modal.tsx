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
      setSuccess(
        resp.status === "already_email_only"
          ? copy.modal.emailOnly.alreadyEmailOnly
          : copy.modal.emailOnly.confirmation,
      );
    } catch {
      setServerError(copy.modal.emailOnly.errorGeneric);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="p-6 sm:p-8 flex flex-col gap-4 text-center">
        <div className="mx-auto size-12 rounded-full bg-coral/10 flex items-center justify-center text-2xl">
          ✓
        </div>
        <h2 id="modal-title" className="text-h3 text-ink">
          {copy.modal.emailOnly.doneTitle}
        </h2>
        <p className="text-body text-body">{success}</p>
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
