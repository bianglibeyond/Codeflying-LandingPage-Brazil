"""Stripe webhook handler — idempotent via Redis.

PLAN §5.1: handles checkout.session.completed (Tier 1 transition) and
charge.refunded events. Idempotency via Redis SETNX with 7-day TTL.
"""

from __future__ import annotations

import time

import stripe
from fastapi import APIRouter, HTTPException, Request, Response

from ..redis_client import STRIPE_EVENT_TTL, Keys, get_redis
from ..settings import settings
from ..stripe_client import refund_payment_intent, stripe_client, update_customer_status, verify_webhook_signature


router = APIRouter(prefix="/api/webhooks", tags=["webhooks"])


@router.post("/stripe", include_in_schema=False)
async def stripe_webhook(request: Request):
    """Receive + verify + process Stripe events with Redis idempotency."""
    # Raw bytes — NEVER request.json() — signature requires the exact payload
    payload = await request.body()
    sig_header = request.headers.get("stripe-signature", "")

    try:
        event = verify_webhook_signature(payload, sig_header)
    except stripe.SignatureVerificationError:
        raise HTTPException(status_code=400, detail="Invalid signature")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid payload")

    # Idempotency: SETNX returns False if the key already exists
    redis = get_redis()
    event_key = Keys.stripe_event(event.id)
    first_time = await redis.set(event_key, "1", nx=True, ex=STRIPE_EVENT_TTL)
    if not first_time:
        # Already processed — ack and skip
        return Response(status_code=200)

    event_type = event.type

    if event_type in {"checkout.session.completed", "payment_intent.succeeded"}:
        await _handle_paid(event)
    elif event_type == "charge.refunded":
        await _handle_refunded(event)
    else:
        # We don't care about this event type — already ack'd via idempotency key
        pass

    return Response(status_code=200)


async def _handle_paid(event) -> None:
    """Transition a Stripe Customer to paid status + atomic INCR on counter."""
    redis = get_redis()
    s = stripe_client()

    obj = event.data.object
    customer_id: str | None = getattr(obj, "customer", None)
    if not customer_id and hasattr(obj, "metadata") and obj.metadata:
        customer_id = obj.metadata.to_dict().get("customer_id")
    payment_intent_id: str | None = getattr(obj, "payment_intent", None)
    if isinstance(payment_intent_id, dict):
        payment_intent_id = payment_intent_id.get("id")

    if not customer_id:
        return

    # Fetch the customer to check current status (idempotency v2 — if metadata.status
    # is already 'paid', this is a redelivery for an event we processed)
    customer = s.Customer.retrieve(customer_id)
    current_status = (customer.metadata.to_dict() if customer.metadata else {}).get("status", "")
    if current_status == "paid":
        return  # already processed

    # Atomic counter increment, capped at cohort_cap
    cfg = settings()
    pos = await redis.incr(Keys.paid_count)
    if pos > cfg.cohort_cap:
        # Race: someone else got the last spot. Refund this one.
        await redis.decr(Keys.paid_count)
        if payment_intent_id:
            try:
                refund_payment_intent(payment_intent_id, reason="requested_by_customer")
            except Exception:
                # If refund fails, leave the customer in a degraded state for ops review
                update_customer_status(
                    customer_id,
                    new_status="paid",  # they paid; we just couldn't refund
                    extra={"position_over_cap": "1"},
                )
        else:
            update_customer_status(
                customer_id,
                new_status="paid",
                extra={"position_over_cap": "1"},
            )
        return

    now_ts = int(time.time())
    refund_deadline_ts = now_ts + 7 * 24 * 60 * 60

    update_customer_status(
        customer_id,
        new_status="paid",
        extra={
            "position": str(pos),
            "credit_brl_cents": str(cfg.signup_credit_brl_cents),
            "paid_at": _iso(now_ts),
            "refund_deadline_at": _iso(refund_deadline_ts),
            "payment_intent_id": payment_intent_id or "",
        },
    )


async def _handle_refunded(event) -> None:
    """Mark a Stripe Customer as refunded + free their seat if within 7 days."""
    redis = get_redis()
    s = stripe_client()

    obj = event.data.object  # charge or refund object
    customer_id = getattr(obj, "customer", None)
    if not customer_id:
        # Try to recover via payment_intent
        payment_intent_id = getattr(obj, "payment_intent", None)
        if payment_intent_id:
            pi = s.PaymentIntent.retrieve(payment_intent_id)
            customer_id = pi.customer
        if not customer_id:
            return

    customer = s.Customer.retrieve(customer_id)
    md = customer.metadata.to_dict() if customer.metadata else {}
    if md.get("status") == "refunded":
        return  # already processed

    # Free the seat if within 7 days
    refund_deadline = md.get("refund_deadline_at", "")
    if refund_deadline:
        try:
            deadline_ts = _from_iso(refund_deadline)
            if time.time() < deadline_ts:
                # Within window — decrement counter
                await redis.decr(Keys.paid_count)
        except ValueError:
            pass

    update_customer_status(
        customer_id,
        new_status="refunded",
        extra={"refunded_at": _iso(int(time.time()))},
    )


def _iso(ts: int) -> str:
    from datetime import datetime, timezone
    return datetime.fromtimestamp(ts, tz=timezone.utc).isoformat()


def _from_iso(s: str) -> float:
    from datetime import datetime
    return datetime.fromisoformat(s).timestamp()
