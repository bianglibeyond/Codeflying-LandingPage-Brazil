"""Checkout endpoint — Tier 1/2 path.

Creates a Stripe Customer (status='intent_pending') and a Checkout Session,
then returns the hosted checkout URL.
"""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, Request, status

from ..auth import dashboard_url
from ..rate_limit import enforce_rate_limit
from ..redis_client import get_redis
from ..schemas import CheckoutCreateResponse, LeadForm
from ..stripe_client import (
    create_checkout_session,
    create_customer,
    find_customer_by_email,
    update_customer_status,
)
from ..turnstile import verify_turnstile


router = APIRouter(prefix="/api", tags=["checkout"])


@router.post("/checkout/create", response_model=CheckoutCreateResponse)
async def create_checkout(form: LeadForm, request: Request):
    """Tier 1/2 path: create Stripe Customer + Checkout Session, redirect to Stripe.

    State transitions on the Stripe Customer:
        new email                → status='intent_pending', new Customer
        status='email_only'      → upgrade to 'intent_pending' (same Customer ID)
        status='intent_pending'  → reuse Customer, new Checkout Session
        status='paid'            → 409 Conflict with dashboard URL
        status='refunded'        → upgrade to 'intent_pending' (rejoining)
    """
    redis = get_redis()
    client_host = request.client.host if request.client else ""

    # Rate limit: 3/min per IP, 2/hour per email
    await enforce_rate_limit(
        redis,
        endpoint="checkout",
        key=client_host or "unknown",
        max_per_window=5,
        window_seconds=60,
    )
    await enforce_rate_limit(
        redis,
        endpoint="checkout-email",
        key=form.email,
        max_per_window=3,
        window_seconds=3600,
    )

    # Bot guard
    ok = await verify_turnstile(form.turnstile_token, client_host)
    if not ok:
        raise HTTPException(status_code=400, detail="Bot detection failed")

    # Look up existing Stripe Customer by email
    existing = find_customer_by_email(form.email)

    if existing:
        current_status = (existing.metadata or {}).get("status", "")
        if current_status == "paid":
            # Already-paid user — redirect to their dashboard
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=dashboard_url(existing.id),
            )
        # Upgrade email_only → intent_pending, or reuse intent_pending
        if current_status != "intent_pending":
            update_customer_status(existing.id, new_status="intent_pending")
        customer = existing
    else:
        customer = create_customer(
            email=form.email,
            name=form.name,
            whatsapp=form.whatsapp,
            use_case=form.use_case,
            status="intent_pending",
            utm_source=form.utm_source,
            utm_campaign=form.utm_campaign,
            utm_medium=form.utm_medium,
            utm_content=form.utm_content,
            utm_term=form.utm_term,
            ip_country=request.headers.get("cf-ipcountry", ""),
        )

    # Create the Checkout Session
    session = create_checkout_session(customer_id=customer.id, lead_id=customer.id)

    return CheckoutCreateResponse(checkout_url=session.url)
