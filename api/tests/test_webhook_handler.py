"""Integration tests for the Stripe webhook handler.

These tests exercise the actual `_handle_paid` and `_handle_refunded` functions
in app.routes.webhooks — NOT just the Redis primitives they call. They mock
the Stripe SDK and assert against both Redis state AND the calls made into
Stripe (Customer.modify, Refund.create).

If you mutate `_handle_paid` to skip the cap check, these tests fail.
If you mutate it to forget to call Customer.modify, these tests fail.
If you mutate it to skip the duplicate-status check (idempotency v2), the
double-paid test fails.
"""

from __future__ import annotations

from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest

from app.redis_client import Keys
from app.routes.webhooks import _handle_paid, _handle_refunded


def _make_event(event_type: str, *, customer_id: str, payment_intent: str = "pi_test_1"):
    """Build a minimal Stripe-event-shaped object suitable for our handlers."""
    return SimpleNamespace(
        id=f"evt_test_{customer_id}",
        type=event_type,
        data=SimpleNamespace(
            object=SimpleNamespace(
                customer=customer_id,
                payment_intent=payment_intent,
                metadata={"customer_id": customer_id},
            )
        ),
    )


def _make_customer(*, id_: str, status: str = "intent_pending"):
    """A fake Stripe Customer object retrieved by `s.Customer.retrieve`."""
    return SimpleNamespace(id=id_, metadata={"status": status})


@pytest.fixture
def mock_stripe():
    """Patch app.routes.webhooks.stripe_client AND .update_customer_status AND .refund_payment_intent.

    Returns the mocked stripe module + a `customer_status_writes` list capturing
    every call to update_customer_status(customer_id, new_status, extra=).
    """
    customer_writes: list[dict] = []
    refund_calls: list[dict] = []

    fake_stripe = MagicMock()
    fake_stripe.Customer.retrieve = MagicMock()

    def record_update(customer_id, *, new_status, extra=None):
        customer_writes.append({"customer_id": customer_id, "new_status": new_status, "extra": extra or {}})

    def record_refund(payment_intent_id, *, reason="requested_by_customer"):
        refund_calls.append({"payment_intent_id": payment_intent_id, "reason": reason})

    with patch("app.routes.webhooks.stripe_client", return_value=fake_stripe), patch(
        "app.routes.webhooks.update_customer_status", side_effect=record_update
    ) as mock_update, patch(
        "app.routes.webhooks.refund_payment_intent", side_effect=record_refund
    ) as mock_refund:
        yield SimpleNamespace(
            stripe=fake_stripe,
            customer_writes=customer_writes,
            refund_calls=refund_calls,
            update_customer_status=mock_update,
            refund_payment_intent=mock_refund,
        )


# ---------------------------------------------------------------------------
# _handle_paid
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_handle_paid_normal_first_signup(fake_redis, mock_stripe):
    """A normal paid event: counter goes to 1, customer marked paid, referral set."""
    mock_stripe.stripe.Customer.retrieve.return_value = _make_customer(
        id_="cus_abc", status="intent_pending"
    )

    event = _make_event("checkout.session.completed", customer_id="cus_abc")
    with patch("app.routes.webhooks.get_redis", return_value=fake_redis):
        await _handle_paid(event)

    # Counter incremented to 1
    assert int(await fake_redis.get(Keys.paid_count)) == 1

    # Referral code stored under that customer
    referrals = await fake_redis.hgetall(Keys.referrals)
    assert "cus_abc" in referrals.values()

    # Customer marked as paid with position 1
    assert len(mock_stripe.customer_writes) == 1
    write = mock_stripe.customer_writes[0]
    assert write["customer_id"] == "cus_abc"
    assert write["new_status"] == "paid"
    assert write["extra"]["position"] == "1"
    assert write["extra"]["credit_brl_cents"] == "5000"
    assert "referral_code" in write["extra"]
    assert "paid_at" in write["extra"]
    assert "refund_deadline_at" in write["extra"]

    # No refund issued
    assert mock_stripe.refund_calls == []


@pytest.mark.asyncio
async def test_handle_paid_over_cap_auto_refunds(fake_redis, mock_stripe):
    """If the 101st paid event arrives, it gets auto-refunded + counter decremented."""
    # Pre-fill counter to the cap
    await fake_redis.set(Keys.paid_count, 100)

    mock_stripe.stripe.Customer.retrieve.return_value = _make_customer(
        id_="cus_late", status="intent_pending"
    )
    event = _make_event(
        "checkout.session.completed", customer_id="cus_late", payment_intent="pi_late"
    )
    with patch("app.routes.webhooks.get_redis", return_value=fake_redis):
        await _handle_paid(event)

    # Counter should be back to 100 (incremented to 101, then decremented)
    assert int(await fake_redis.get(Keys.paid_count)) == 100

    # Refund should have been issued for the over-cap payment intent
    assert len(mock_stripe.refund_calls) == 1
    assert mock_stripe.refund_calls[0]["payment_intent_id"] == "pi_late"

    # Customer should NOT have been marked paid (no Customer.modify call for status=paid w/o position_over_cap)
    paid_writes = [w for w in mock_stripe.customer_writes if w["new_status"] == "paid" and "position" in w["extra"]]
    assert paid_writes == []


@pytest.mark.asyncio
async def test_handle_paid_idempotent_when_already_paid(fake_redis, mock_stripe):
    """If the same customer is already status='paid', a redelivery does nothing."""
    mock_stripe.stripe.Customer.retrieve.return_value = _make_customer(
        id_="cus_dup", status="paid"
    )
    event = _make_event("checkout.session.completed", customer_id="cus_dup")

    with patch("app.routes.webhooks.get_redis", return_value=fake_redis):
        await _handle_paid(event)

    # Counter NOT incremented
    raw = await fake_redis.get(Keys.paid_count)
    assert raw is None or int(raw) == 0

    # No writes to Stripe Customer
    assert mock_stripe.customer_writes == []
    assert mock_stripe.refund_calls == []


@pytest.mark.asyncio
async def test_handle_paid_skips_when_no_customer_id(fake_redis, mock_stripe):
    """Defensive: event missing customer_id should no-op."""
    event = SimpleNamespace(
        id="evt_no_cust",
        type="checkout.session.completed",
        data=SimpleNamespace(
            object=SimpleNamespace(
                customer=None,
                payment_intent="pi_x",
                metadata={},
            )
        ),
    )
    with patch("app.routes.webhooks.get_redis", return_value=fake_redis):
        await _handle_paid(event)

    assert await fake_redis.get(Keys.paid_count) is None
    assert mock_stripe.customer_writes == []
    assert mock_stripe.refund_calls == []


# ---------------------------------------------------------------------------
# _handle_refunded
# ---------------------------------------------------------------------------


@pytest.mark.asyncio
async def test_handle_refunded_within_window_decrements(fake_redis, mock_stripe):
    """Refund within the 7-day window frees the seat (counter goes down)."""
    from datetime import datetime, timezone, timedelta

    await fake_redis.set(Keys.paid_count, 50)
    deadline = (datetime.now(timezone.utc) + timedelta(days=3)).isoformat()
    mock_stripe.stripe.Customer.retrieve.return_value = SimpleNamespace(
        id="cus_refund",
        metadata={"status": "paid", "refund_deadline_at": deadline},
    )

    event = _make_event("charge.refunded", customer_id="cus_refund")
    with patch("app.routes.webhooks.get_redis", return_value=fake_redis):
        await _handle_refunded(event)

    # Counter decremented
    assert int(await fake_redis.get(Keys.paid_count)) == 49

    # Customer marked refunded
    assert any(
        w["new_status"] == "refunded" and w["customer_id"] == "cus_refund"
        for w in mock_stripe.customer_writes
    )


@pytest.mark.asyncio
async def test_handle_refunded_after_window_keeps_seat(fake_redis, mock_stripe):
    """Refund AFTER 7 days marks the customer but does NOT free the seat."""
    from datetime import datetime, timezone, timedelta

    await fake_redis.set(Keys.paid_count, 50)
    deadline = (datetime.now(timezone.utc) - timedelta(days=1)).isoformat()
    mock_stripe.stripe.Customer.retrieve.return_value = SimpleNamespace(
        id="cus_late_refund",
        metadata={"status": "paid", "refund_deadline_at": deadline},
    )

    event = _make_event("charge.refunded", customer_id="cus_late_refund")
    with patch("app.routes.webhooks.get_redis", return_value=fake_redis):
        await _handle_refunded(event)

    # Counter unchanged — seat stays taken
    assert int(await fake_redis.get(Keys.paid_count)) == 50

    # But customer IS marked refunded
    assert any(w["new_status"] == "refunded" for w in mock_stripe.customer_writes)


@pytest.mark.asyncio
async def test_handle_refunded_idempotent(fake_redis, mock_stripe):
    """If customer is already refunded, redelivery does nothing."""
    await fake_redis.set(Keys.paid_count, 50)
    mock_stripe.stripe.Customer.retrieve.return_value = SimpleNamespace(
        id="cus_dup_refund",
        metadata={"status": "refunded"},
    )

    event = _make_event("charge.refunded", customer_id="cus_dup_refund")
    with patch("app.routes.webhooks.get_redis", return_value=fake_redis):
        await _handle_refunded(event)

    # Counter unchanged
    assert int(await fake_redis.get(Keys.paid_count)) == 50
    # No writes
    assert mock_stripe.customer_writes == []
