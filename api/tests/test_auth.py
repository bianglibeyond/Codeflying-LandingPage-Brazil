"""Tests for HMAC signed-URL dashboard auth."""

from __future__ import annotations

from app.auth import sign_customer_id, verify_token


def test_round_trip():
    """Signing and verifying the same id should return the original."""
    customer_id = "cus_TEST_abc123"
    token = sign_customer_id(customer_id)
    assert verify_token(token) == customer_id


def test_tampered_token_rejected():
    """Any single-character tamper invalidates the signature."""
    customer_id = "cus_TEST_abc"
    token = sign_customer_id(customer_id)
    head, tail = token.split(".", 1)
    tampered = head + "X." + tail
    assert verify_token(tampered) is None


def test_empty_token_rejected():
    assert verify_token("") is None
    assert verify_token("nodothere") is None


def test_different_ids_yield_different_signatures():
    a = sign_customer_id("cus_A")
    b = sign_customer_id("cus_B")
    assert a != b


def test_signature_deterministic():
    """Same input + same secret → identical signature."""
    a = sign_customer_id("cus_X")
    b = sign_customer_id("cus_X")
    assert a == b
