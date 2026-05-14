"""Pytest config + shared fixtures."""

from __future__ import annotations

import asyncio
import os
import sys
from pathlib import Path
from unittest.mock import patch

import fakeredis.aioredis
import pytest

# Make `app` importable from this conftest.py without installing the package
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

# Force test-friendly settings BEFORE app imports
os.environ.setdefault("STRIPE_SECRET_KEY", "sk_test_dummy")
os.environ.setdefault("STRIPE_WEBHOOK_SECRET", "whsec_dummy")
os.environ.setdefault("HMAC_SECRET", "test_hmac_secret_for_tests_only")
os.environ.setdefault("REDIS_URL", "redis://localhost:6379/15")  # separate DB
os.environ.setdefault("COHORT_CAP", "100")


@pytest.fixture
def fake_redis():
    """Replace the real Redis client with fakeredis for the duration of a test."""
    fake = fakeredis.aioredis.FakeRedis(decode_responses=True)
    with patch("app.redis_client.get_redis", return_value=fake):
        yield fake


@pytest.fixture
def event_loop():
    """Per-test event loop so asyncio tests don't share state."""
    loop = asyncio.new_event_loop()
    yield loop
    loop.close()
