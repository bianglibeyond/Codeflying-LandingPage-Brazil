"""Dashboard endpoints — /api/me, /api/me/refund, /api/me/survey."""

from __future__ import annotations

import json
import time

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, Field

from ..auth import verify_token
from ..redis_client import DASHBOARD_CACHE_TTL, Keys, get_redis
from ..schemas import MeResponse, RefundResponse
from ..stripe_client import refund_payment_intent, stripe_client, update_customer_status


router = APIRouter(prefix="/api/me", tags=["dashboard"])


class SurveyPayload(BaseModel):
    factors: list[str] = Field(default_factory=list)
    other_text: str = ""


@router.get("", response_model=MeResponse)
async def me(token: str = Query(...)):
    """Return user's whitelist status. Auth via signed URL HMAC."""
    customer_id = verify_token(token)
    if not customer_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    customer = await _fetch_customer_cached(customer_id)
    md = customer.get("metadata", {}) or {}

    return MeResponse(
        status=md.get("status", "intent_pending"),
        name=customer.get("name", "") or "",
        email=customer.get("email", "") or "",
        position=_int_or_none(md.get("position")),
        credit_brl_cents=_int_or_none(md.get("credit_brl_cents")),
        referral_code=md.get("referral_code") or None,
        paid_at=md.get("paid_at") or None,
        refund_deadline_at=md.get("refund_deadline_at") or None,
        refunded_at=md.get("refunded_at") or None,
        survey_submitted_at=md.get("survey_submitted_at") or None,
    )


@router.post("/survey")
async def submit_survey(
    payload: SurveyPayload,
    token: str = Query(...),
):
    """Save post-payment survey responses to Stripe Customer metadata."""
    customer_id = verify_token(token)
    if not customer_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    s = stripe_client()
    customer = s.Customer.retrieve(customer_id)
    md = customer.metadata.to_dict() if customer.metadata else {}

    # Idempotency: if already submitted, just acknowledge
    if md.get("survey_submitted_at"):
        return {"status": "already_submitted"}

    # Sanitize factors — only allow known values + truncate length
    allowed = {"language", "telegram", "whatsapp", "pricing", "other"}
    factors = [f for f in payload.factors if f in allowed][:10]
    other_text = (payload.other_text or "")[:500]  # Stripe metadata max 500 chars/value

    update_customer_status(
        customer_id,
        new_status=md.get("status", "paid"),  # don't change status
        extra={
            "survey_factors": ",".join(factors),
            "survey_other": other_text,
            "survey_submitted_at": _iso(int(time.time())),
        },
    )

    # Invalidate dashboard cache
    redis = get_redis()
    await redis.delete(Keys.dashboard_cache(customer_id))

    return {"status": "saved"}


@router.post("/refund", response_model=RefundResponse)
async def refund(token: str = Query(...)):
    """Trigger refund for a paid signup within the 7-day window."""
    customer_id = verify_token(token)
    if not customer_id:
        raise HTTPException(status_code=401, detail="Invalid token")

    s = stripe_client()
    customer = s.Customer.retrieve(customer_id)
    md = customer.metadata.to_dict() if customer.metadata else {}
    if md.get("status") != "paid":
        raise HTTPException(status_code=400, detail="Not refundable: status is not 'paid'")

    deadline = md.get("refund_deadline_at", "")
    if deadline:
        from datetime import datetime
        try:
            deadline_ts = datetime.fromisoformat(deadline).timestamp()
            if time.time() > deadline_ts:
                raise HTTPException(
                    status_code=400,
                    detail="A janela de 7 dias para reembolso já expirou.",
                )
        except ValueError:
            pass

    pi_id = md.get("payment_intent_id", "")
    if not pi_id:
        raise HTTPException(status_code=500, detail="Missing payment_intent_id")

    try:
        refund_payment_intent(pi_id, reason="requested_by_customer")
    except Exception as exc:  # noqa: BLE001
        return RefundResponse(status="error", message=str(exc))

    # The webhook handler (charge.refunded) will mark the Customer + free the seat.
    # As a safety, also mark refund_requested_at so ops can track requests:
    update_customer_status(
        customer_id,
        new_status="paid",  # webhook will flip to 'refunded'
        extra={"refund_requested_at": _iso(int(time.time()))},
    )

    # Invalidate dashboard cache so the next GET reflects the new state
    redis = get_redis()
    await redis.delete(Keys.dashboard_cache(customer_id))

    return RefundResponse(status="refunded")


async def _fetch_customer_cached(customer_id: str) -> dict:
    """Fetch a Stripe Customer with 60s Redis cache to reduce API quota usage."""
    redis = get_redis()
    cache_key = Keys.dashboard_cache(customer_id)
    cached = await redis.get(cache_key)
    if cached:
        return json.loads(cached)

    s = stripe_client()
    customer = s.Customer.retrieve(customer_id)
    payload = {
        "id": customer.id,
        "email": customer.email,
        "name": customer.name,
        "metadata": customer.metadata.to_dict() if customer.metadata else {},
    }
    await redis.set(cache_key, json.dumps(payload), ex=DASHBOARD_CACHE_TTL)
    return payload


def _int_or_none(s: str | None) -> int | None:
    if s is None or s == "":
        return None
    try:
        return int(s)
    except (TypeError, ValueError):
        return None


def _iso(ts: int) -> str:
    from datetime import datetime, timezone
    return datetime.fromtimestamp(ts, tz=timezone.utc).isoformat()
