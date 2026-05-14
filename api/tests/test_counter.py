"""Tests for the spots counter atomic increment + 100-cap race protection.

PLAN §5.2: webhook handler does `INCR waitlist:paid_count` atomically. If the
count goes over the configured cap, the handler must auto-refund the over-cap
payment. These tests exercise the atomic operation directly to verify the
race protection logic.
"""

from __future__ import annotations

import asyncio

import pytest

from app.redis_client import Keys


@pytest.mark.asyncio
async def test_incr_starts_at_one(fake_redis):
    pos = await fake_redis.incr(Keys.paid_count)
    assert pos == 1


@pytest.mark.asyncio
async def test_concurrent_incrs_are_sequential(fake_redis):
    """100 concurrent INCRs should yield each integer 1..100 exactly once."""
    tasks = [fake_redis.incr(Keys.paid_count) for _ in range(100)]
    positions = await asyncio.gather(*tasks)
    assert sorted(positions) == list(range(1, 101))


@pytest.mark.asyncio
async def test_over_cap_decrement(fake_redis):
    """If INCR yields > cap, a corresponding DECR brings us back."""
    cap = 100
    for _ in range(cap):
        await fake_redis.incr(Keys.paid_count)
    overflow = await fake_redis.incr(Keys.paid_count)
    assert overflow == cap + 1
    # Webhook handler would refund + decrement
    await fake_redis.decr(Keys.paid_count)
    final = await fake_redis.get(Keys.paid_count)
    assert int(final) == cap


@pytest.mark.asyncio
async def test_stripe_event_idempotency(fake_redis):
    """SETNX with TTL — first call succeeds, second is no-op."""
    first = await fake_redis.set("stripe:event:evt_test_1", "1", nx=True, ex=604800)
    second = await fake_redis.set("stripe:event:evt_test_1", "1", nx=True, ex=604800)
    assert first is True
    assert second is None  # SET NX on existing key returns None
