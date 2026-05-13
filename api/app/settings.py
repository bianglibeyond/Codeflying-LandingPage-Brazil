"""Configuration via environment variables."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application settings loaded from env vars (and optionally .env)."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # Stripe
    stripe_secret_key: str = "sk_test_replace_me"
    stripe_webhook_secret: str = "whsec_replace_me"
    stripe_price_brl_cents: int = 990  # R$ 9,90

    # Redis
    redis_url: str = "redis://localhost:6379/0"

    # Auth
    hmac_secret: str = "change_me_in_production"

    # Frontend URLs (Stripe checkout success/cancel)
    frontend_url: str = "http://localhost:3001"

    # CORS
    cors_allowed_origins: str = (
        "http://localhost:3000,http://localhost:3001,"
        "https://codeflying.app,https://br.codeflying.app"
    )

    # Cohort
    cohort_cap: int = 100
    signup_credit_brl_cents: int = 5000  # R$ 50

    # Cloudflare Turnstile (optional — empty disables verification)
    turnstile_secret_key: str = ""

    # Terms version (stored in Stripe Customer metadata)
    terms_version: str = "v1.0-2026-05-13"
    privacy_version: str = "v1.0-2026-05-13"

    @property
    def cors_origins(self) -> list[str]:
        return [o.strip() for o in self.cors_allowed_origins.split(",") if o.strip()]


_settings: Settings | None = None


def settings() -> Settings:
    """Lazy-initialized settings singleton."""
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings
