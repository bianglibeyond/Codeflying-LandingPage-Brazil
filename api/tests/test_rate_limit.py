"""Tests for rate limiting helper."""

from __future__ import annotations

import pytest
from fastapi import HTTPException

from app.rate_limit import enforce_rate_limit


@pytest.mark.asyncio
async def test_within_limit_passes(fake_redis):
    for _ in range(5):
        await enforce_rate_limit(
            fake_redis,
            endpoint="test",
            key="ip:1.2.3.4",
            max_per_window=5,
            window_seconds=60,
        )


@pytest.mark.asyncio
async def test_over_limit_raises(fake_redis):
    for _ in range(5):
        await enforce_rate_limit(
            fake_redis,
            endpoint="test",
            key="ip:1.2.3.4",
            max_per_window=5,
            window_seconds=60,
        )
    with pytest.raises(HTTPException) as exc:
        await enforce_rate_limit(
            fake_redis,
            endpoint="test",
            key="ip:1.2.3.4",
            max_per_window=5,
            window_seconds=60,
        )
    assert exc.value.status_code == 429


@pytest.mark.asyncio
async def test_different_keys_have_separate_quotas(fake_redis):
    for _ in range(5):
        await enforce_rate_limit(
            fake_redis,
            endpoint="test",
            key="ip:1.2.3.4",
            max_per_window=5,
            window_seconds=60,
        )
    # Different IP should still pass
    await enforce_rate_limit(
        fake_redis,
        endpoint="test",
        key="ip:5.6.7.8",
        max_per_window=5,
        window_seconds=60,
    )
