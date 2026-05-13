"""Signed URL helpers for dashboard auth.

The dashboard URL contains ?token=<base64(customer_id):hmac>, signed with a
server secret. No JWT, no cookies, no DB session.

When a user finishes Stripe Checkout, we redirect them to:
  /painel?token=<sign(customer_id)>&welcome=1

They bookmark this URL. On every dashboard render, we verify the HMAC and fetch
the Stripe Customer to display data.
"""

from __future__ import annotations

import base64
import hashlib
import hmac
from urllib.parse import quote, urlencode

from .settings import settings


def sign_customer_id(customer_id: str) -> str:
    """Produce a URL-safe token: base64(customer_id):base64(hmac)."""
    secret = settings().hmac_secret.encode("utf-8")
    payload = customer_id.encode("utf-8")
    sig = hmac.new(secret, payload, hashlib.sha256).digest()
    return f"{_b64(payload)}.{_b64(sig)}"


def verify_token(token: str) -> str | None:
    """Verify a signed token and return the customer_id, or None if invalid.

    Constant-time comparison to avoid timing side channels.
    """
    if not token or "." not in token:
        return None
    try:
        payload_b64, sig_b64 = token.split(".", 1)
        payload = _b64decode(payload_b64)
        sig = _b64decode(sig_b64)
    except (ValueError, Exception):  # noqa: BLE001 — base64 decoding raises various exceptions
        return None

    secret = settings().hmac_secret.encode("utf-8")
    expected = hmac.new(secret, payload, hashlib.sha256).digest()
    if not hmac.compare_digest(expected, sig):
        return None

    try:
        return payload.decode("utf-8")
    except UnicodeDecodeError:
        return None


def dashboard_url(customer_id: str, *, welcome: bool = False) -> str:
    """Build a fully-qualified dashboard URL for a Stripe Customer."""
    token = sign_customer_id(customer_id)
    params: dict[str, str] = {"token": token}
    if welcome:
        params["welcome"] = "1"
    return f"{settings().frontend_url}/painel?{urlencode(params, quote_via=quote)}"


def _b64(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).decode("ascii").rstrip("=")


def _b64decode(s: str) -> bytes:
    # Add padding back
    padding = "=" * (-len(s) % 4)
    return base64.urlsafe_b64decode(s + padding)
