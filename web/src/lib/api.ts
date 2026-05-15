/**
 * API client for FastAPI backend.
 * Backend URL configurable via NEXT_PUBLIC_API_URL.
 * In dev, defaults to http://localhost:8000.
 */

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface LeadForm {
  name: string;
  email: string;
  whatsapp: string;
  use_case: string;
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  utm_content?: string;
  utm_term?: string;
  turnstile_token?: string;
}

export interface CheckoutCreateResponse {
  checkout_url: string;
}

export interface EmailOnlyResponse {
  status: "email_only" | "already_email_only" | "already_paid";
  dashboard_url?: string; // present if status='already_paid'
}

export interface MeResponse {
  status: "paid" | "intent_pending" | "email_only" | "refunded";
  name: string;
  email: string;
  position?: number;
  credit_brl_cents?: number;
  paid_at?: string;
  refund_deadline_at?: string;
  refunded_at?: string;
  survey_submitted_at?: string;
}

export interface StatsResponse {
  paid_count: number;
  cap: number;
  remaining: number;
}

class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetcher<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });
  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail ?? detail;
    } catch {
      // ignore body parse failure
    }
    throw new ApiError(res.status, detail);
  }
  return res.json();
}

export const api = {
  createCheckout: (payload: LeadForm) =>
    fetcher<CheckoutCreateResponse>("/api/checkout/create", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  submitEmailOnly: (payload: LeadForm) =>
    fetcher<EmailOnlyResponse>("/api/leads/email-only", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getMe: (token: string) =>
    fetcher<MeResponse>(`/api/me?token=${encodeURIComponent(token)}`),

  requestRefund: (token: string) =>
    fetcher<{ status: "refunded" | "error"; message?: string }>(
      `/api/me/refund?token=${encodeURIComponent(token)}`,
      { method: "POST" },
    ),

  submitSurvey: (
    token: string,
    payload: { factors: string[]; other_text: string },
  ) =>
    fetcher<{ status: "saved" | "already_submitted" }>(
      `/api/me/survey?token=${encodeURIComponent(token)}`,
      {
        method: "POST",
        body: JSON.stringify(payload),
      },
    ),

  getStats: () => fetcher<StatsResponse>("/api/stats"),
};

export { ApiError };
