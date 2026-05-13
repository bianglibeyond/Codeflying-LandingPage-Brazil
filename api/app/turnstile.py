"""Cloudflare Turnstile bot-detection verifier.

If TURNSTILE_SECRET_KEY is empty (dev mode), verification is bypassed.
"""

from __future__ import annotations

import httpx

from .settings import settings


TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify"


async def verify_turnstile(token: str | None, remote_ip: str | None = None) -> bool:
    """Verify a Turnstile token. Returns True if valid OR if verification is disabled.

    Network errors are treated as a soft failure (return True) so the API doesn't
    block legitimate users during Cloudflare outages.
    """
    secret = settings().turnstile_secret_key
    if not secret:
        # Dev / no Turnstile configured — bypass
        return True

    if not token:
        return False

    payload: dict[str, str] = {"secret": secret, "response": token}
    if remote_ip:
        payload["remoteip"] = remote_ip

    try:
        async with httpx.AsyncClient(timeout=4.0) as client:
            resp = await client.post(TURNSTILE_VERIFY_URL, data=payload)
            data = resp.json()
            return bool(data.get("success", False))
    except (httpx.HTTPError, ValueError):
        # Network / parse failure — soft-pass so we don't block users
        return True
