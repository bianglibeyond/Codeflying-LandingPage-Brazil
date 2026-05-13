"""Rate limiting helpers (Redis-backed sliding window)."""

from __future__ import annotations

import redis.asyncio as aioredis
from fastapi import HTTPException, status

from .redis_client import Keys


async def enforce_rate_limit(
    redis: aioredis.Redis,
    *,
    endpoint: str,
    key: str,
    max_per_window: int,
    window_seconds: int,
) -> None:
    """Atomic incr + expire. Raises 429 if over the limit.

    Pattern: SETNX-style — first increment sets the TTL window.
    """
    redis_key = Keys.rate_limit(endpoint, key)
    count = await redis.incr(redis_key)
    if count == 1:
        await redis.expire(redis_key, window_seconds)
    if count > max_per_window:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"Muitas tentativas. Tente novamente em alguns minutos.",
        )
