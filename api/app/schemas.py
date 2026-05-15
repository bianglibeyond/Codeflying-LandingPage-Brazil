"""Pydantic schemas for request/response bodies."""

from __future__ import annotations

from pydantic import BaseModel, EmailStr, Field


class LeadForm(BaseModel):
    """Form submitted by the modal (pay or email-only paths)."""

    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    whatsapp: str = Field(min_length=8, max_length=32)
    use_case: str = Field(min_length=1, max_length=40)
    utm_source: str = ""
    utm_campaign: str = ""
    utm_medium: str = ""
    utm_content: str = ""
    utm_term: str = ""
    turnstile_token: str | None = None


class CheckoutCreateResponse(BaseModel):
    checkout_url: str


class EmailOnlyResponse(BaseModel):
    status: str  # 'email_only' | 'already_email_only' | 'already_paid'
    dashboard_url: str | None = None


class MeResponse(BaseModel):
    status: str  # 'paid' | 'intent_pending' | 'email_only' | 'refunded'
    name: str
    email: str
    position: int | None = None
    credit_brl_cents: int | None = None
    referral_code: str | None = None
    paid_at: str | None = None
    refund_deadline_at: str | None = None
    refunded_at: str | None = None
    survey_submitted_at: str | None = None


class StatsResponse(BaseModel):
    paid_count: int
    cap: int
    remaining: int


class RefundResponse(BaseModel):
    status: str  # 'refunded' | 'error'
    message: str | None = None
