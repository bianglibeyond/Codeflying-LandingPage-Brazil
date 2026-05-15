"""Redis client + key conventions.

Keys used:
  - waitlist:paid_count             (atomic counter of Tier 1 signups)
  - stripe:event:<event_id>         (idempotency, 7-day TTL)
  - rl:<endpoint>:<key>             (rate limit counters, short TTL)
  - dashboard:<customer_id>         (cached Stripe Customer object, 60s TTL)
"""

from __future__ import annotations

import redis.asyncio as aioredis
from .settings import settings


_client: aioredis.Redis | None = None


def get_redis() -> aioredis.Redis:
    """Singleton async Redis client."""
    global _client
    if _client is None:
        _client = aioredis.from_url(
            settings().redis_url,
            encoding="utf-8",
            decode_responses=True,
        )
    return _client


async def close_redis() -> None:
    global _client
    if _client is not None:
        await _client.aclose()
        _client = None


# Convenience constants
class Keys:
    paid_count = "waitlist:paid_count"

    @staticmethod
    def stripe_event(event_id: str) -> str:
        return f"stripe:event:{event_id}"

    @staticmethod
    def rate_limit(endpoint: str, key: str) -> str:
        return f"rl:{endpoint}:{key}"

    @staticmethod
    def dashboard_cache(customer_id: str) -> str:
        return f"dashboard:{customer_id}"


# 7 days in seconds
STRIPE_EVENT_TTL = 7 * 24 * 60 * 60
DASHBOARD_CACHE_TTL = 60
