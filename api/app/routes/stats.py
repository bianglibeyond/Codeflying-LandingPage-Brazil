"""Public stats endpoint — spots-remaining counter."""

from __future__ import annotations

from fastapi import APIRouter

from ..redis_client import Keys, get_redis
from ..schemas import StatsResponse
from ..settings import settings


router = APIRouter(prefix="/api", tags=["stats"])


@router.get("/stats", response_model=StatsResponse)
async def stats():
    """Return paid_count / cap / remaining. No auth required."""
    redis = get_redis()
    cfg = settings()
    raw = await redis.get(Keys.paid_count)
    paid_count = int(raw) if raw else 0
    remaining = max(cfg.cohort_cap - paid_count, 0)
    return StatsResponse(paid_count=paid_count, cap=cfg.cohort_cap, remaining=remaining)
