"""FastAPI entry point — wires routes, CORS, lifespan."""

from __future__ import annotations

from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .redis_client import close_redis, get_redis
from .routes import checkout, email_only, me, stats, webhooks
from .settings import settings


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Verify Redis on startup (fail fast if unreachable)
    redis = get_redis()
    try:
        await redis.ping()
    except Exception as exc:  # noqa: BLE001
        # Log + continue — Redis may come up shortly; the app will surface errors per-request
        print(f"[startup] WARNING: Redis ping failed: {exc}")
    yield
    await close_redis()


app = FastAPI(
    title="CodeFlying BR — Waitlist API",
    description="Fake-door PMF backend. Stripe-as-database + Redis counter.",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings().cors_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(checkout.router)
app.include_router(email_only.router)
app.include_router(webhooks.router)
app.include_router(me.router)
app.include_router(stats.router)


@app.get("/healthz")
async def healthz():
    """Health check for Railway."""
    return {"status": "ok"}
