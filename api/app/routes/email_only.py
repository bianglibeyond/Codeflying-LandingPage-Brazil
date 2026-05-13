"""Email-only endpoint — Tier 3 path.

User chose the secondary "Só quero ser avisado quando lançar (grátis)" CTA.
We create a Stripe Customer with status='email_only' and skip Stripe Checkout.
"""

from __future__ import annotations

from fastapi import APIRouter, HTTPException, Request

from ..auth import dashboard_url
from ..rate_limit import enforce_rate_limit
from ..redis_client import get_redis
from ..schemas import EmailOnlyResponse, LeadForm
from ..stripe_client import create_customer, find_customer_by_email
from ..turnstile import verify_turnstile


router = APIRouter(prefix="/api", tags=["leads"])


@router.post("/leads/email-only", response_model=EmailOnlyResponse)
async def email_only(form: LeadForm, request: Request):
    """Tier 3 path: capture name + email + WhatsApp without payment.

    State transitions:
        new email                 → create Customer with status='email_only'
        status='email_only'       → idempotent, return 'already_email_only'
        status='intent_pending'   → keep status; user did not complete pay either
        status='paid'             → return 'already_paid' with dashboard URL
    """
    redis = get_redis()
    client_host = request.client.host if request.client else ""

    # Rate limit: 3/min per IP, 2/hour per email
    await enforce_rate_limit(
        redis,
        endpoint="email-only",
        key=client_host or "unknown",
        max_per_window=3,
        window_seconds=60,
    )
    await enforce_rate_limit(
        redis,
        endpoint="email-only-email",
        key=form.email,
        max_per_window=2,
        window_seconds=3600,
    )

    ok = await verify_turnstile(form.turnstile_token, client_host)
    if not ok:
        raise HTTPException(status_code=400, detail="Bot detection failed")

    existing = find_customer_by_email(form.email)
    if existing:
        current_status = (existing.metadata or {}).get("status", "")
        if current_status == "paid":
            return EmailOnlyResponse(
                status="already_paid",
                dashboard_url=dashboard_url(existing.id),
            )
        # Already in our list (any non-paid status) — idempotent ack
        return EmailOnlyResponse(status="already_email_only")

    create_customer(
        email=form.email,
        name=form.name,
        whatsapp=form.whatsapp,
        use_case=form.use_case,
        status="email_only",
        utm_source=form.utm_source,
        utm_campaign=form.utm_campaign,
        utm_medium=form.utm_medium,
        utm_content=form.utm_content,
        utm_term=form.utm_term,
        ip_country=request.headers.get("cf-ipcountry", ""),
    )
    return EmailOnlyResponse(status="email_only")
