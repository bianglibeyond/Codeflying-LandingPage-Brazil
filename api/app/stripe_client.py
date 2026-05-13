"""Stripe SDK wrapper + helpers.

PLAN §5.2: Stripe is the database. All lead/payment data is stored as
Stripe Customer.metadata fields. We never persist customer-identifying
data in Postgres (no Postgres in v1).
"""

from __future__ import annotations

from typing import Any

import stripe

from .settings import settings


def stripe_client() -> Any:
    """Initialize the Stripe API key (idempotent)."""
    stripe.api_key = settings().stripe_secret_key
    return stripe


def find_customer_by_email(email: str) -> Any | None:
    """Look up an existing Stripe Customer by email. Returns the first match or None."""
    s = stripe_client()
    result = s.Customer.list(email=email, limit=1)
    if result.data:
        return result.data[0]
    return None


def create_customer(
    *,
    email: str,
    name: str,
    whatsapp: str,
    use_case: str,
    status: str,  # 'intent_pending' or 'email_only'
    utm_source: str = "",
    utm_campaign: str = "",
    utm_medium: str = "",
    utm_content: str = "",
    utm_term: str = "",
    ip_country: str = "",
) -> Any:
    """Create a new Stripe Customer with metadata."""
    s = stripe_client()
    return s.Customer.create(
        email=email,
        name=name,
        phone=whatsapp,  # native field; also stored in metadata.whatsapp for redundancy
        metadata={
            "status": status,
            "whatsapp": whatsapp,
            "use_case": use_case,
            "terms_version": settings().terms_version,
            "privacy_version": settings().privacy_version,
            "consent_at": _now_iso(),
            "utm_source": utm_source,
            "utm_campaign": utm_campaign,
            "utm_medium": utm_medium,
            "utm_content": utm_content,
            "utm_term": utm_term,
            "ip_country": ip_country,
        },
    )


def update_customer_status(customer_id: str, *, new_status: str, extra: dict[str, str] | None = None) -> Any:
    """Update a Stripe Customer's metadata.status (and optional additional fields)."""
    s = stripe_client()
    metadata: dict[str, str] = {"status": new_status}
    if extra:
        metadata.update(extra)
    return s.Customer.modify(customer_id, metadata=metadata)


def create_checkout_session(
    *,
    customer_id: str,
    lead_id: str = "",
) -> Any:
    """Create a Stripe Checkout Session for cards-only R$ 9,90 deposit."""
    s = stripe_client()
    cfg = settings()
    return s.checkout.Session.create(
        customer=customer_id,
        mode="payment",
        payment_method_types=["card"],
        locale="pt-BR",
        line_items=[
            {
                "price_data": {
                    "currency": "brl",
                    "product_data": {
                        "name": "CodeFlying Early Access — Vaga garantida",
                        "description": "R$ 9,90 vira R$ 50 de crédito quando lançarmos.",
                    },
                    "unit_amount": cfg.stripe_price_brl_cents,
                },
                "quantity": 1,
            }
        ],
        success_url=f"{cfg.frontend_url}/obrigado?session_id={{CHECKOUT_SESSION_ID}}",
        cancel_url=f"{cfg.frontend_url}/cancelado",
        metadata={
            "customer_id": customer_id,
            "lead_id": lead_id,
            "terms_version": cfg.terms_version,
        },
    )


def refund_payment_intent(payment_intent_id: str, *, reason: str = "requested_by_customer") -> Any:
    """Issue a refund for a PaymentIntent."""
    s = stripe_client()
    return s.Refund.create(
        payment_intent=payment_intent_id,
        reason=reason,
    )


def verify_webhook_signature(payload_bytes: bytes, sig_header: str) -> Any:
    """Verify a Stripe webhook signature and return the parsed event.

    Raises stripe.error.SignatureVerificationError on bad signature.
    """
    s = stripe_client()
    return s.Webhook.construct_event(
        payload_bytes, sig_header, settings().stripe_webhook_secret
    )


def _now_iso() -> str:
    from datetime import datetime, timezone
    return datetime.now(timezone.utc).isoformat()
