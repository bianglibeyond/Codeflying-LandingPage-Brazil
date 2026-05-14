# CodeFlying Brazil — Landing Page

Fake-door PMF test for Brazilian digital creators.

- **Frontend** (`web/`) — Next.js 16 on Vercel, pt-BR only, dual CTAs (R$ 9,90 pay + free email-only)
- **Backend** (`api/`) — FastAPI on Railway, Stripe-as-database, Redis spots counter

See [`PLAN.md`](./PLAN.md) for the full design + architecture rationale.

## Local development

### Prerequisites
- Node 22+, bun 1.3+
- Python 3.12, uv
- Redis (local install or Docker)
- Stripe test account ([dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys))

### 1. Backend

```bash
cd api
cp .env.example .env
# Edit .env: set STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, HMAC_SECRET
uv sync
redis-server --daemonize yes  # if not already running
uv run uvicorn app.main:app --reload
# → http://localhost:8000
```

### 2. Stripe webhook listener (for local end-to-end testing)

```bash
# Install Stripe CLI: brew install stripe/stripe-cli/stripe
stripe login
stripe listen --forward-to localhost:8000/api/webhooks/stripe
# Copy the printed whsec_xxx into api/.env as STRIPE_WEBHOOK_SECRET, then restart the API.
```

### 3. Frontend

```bash
cd web
bun install
echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
bun run dev
# → http://localhost:3000 (or 3001 if 3000 is in use)
```

## Deploying

### Frontend → Vercel
1. Push the repo to GitHub (already done)
2. Import the repo in Vercel; set root directory to `web/`
3. Set env vars in Vercel dashboard:
   - `NEXT_PUBLIC_API_URL` → your Railway URL (e.g. `https://api.codeflying.app`)
   - `NEXT_PUBLIC_OPS_WEBHOOK` (optional) → Slack/Discord webhook for LGPD requests
4. Deploy

### Backend → Railway
1. Create a new Railway project
2. Connect this GitHub repo, set service root to `api/`
3. Add a Redis service in the same project (Railway templates → Redis)
4. Set env vars from `api/.env.example`:
   - `STRIPE_SECRET_KEY` (sk_live_* for production)
   - `STRIPE_WEBHOOK_SECRET` (from Stripe Dashboard → Webhooks)
   - `HMAC_SECRET` (`openssl rand -hex 32`)
   - `FRONTEND_URL` → your Vercel URL
   - `REDIS_URL` → auto-populated by Railway from the Redis service
5. In Stripe Dashboard → Webhooks, add an endpoint to `https://api.your-domain.com/api/webhooks/stripe` listening for `checkout.session.completed` and `charge.refunded`.

## Architecture summary

| Concern | Choice | Why |
|---|---|---|
| Database | **Stripe Customer.metadata** (no Postgres) | Fake-door PMF test; Stripe stores all PII |
| State | Redis (spots counter, webhook idempotency, rate limits) | Atomic ops, cheap |
| Auth | Signed URL HMAC | No JWT, no magic-link; user bookmarks dashboard URL |
| Payment | Stripe Cards only in v1 | Honest start; Pix native arrives in Q3 2026 with CNPJ |
| LGPD | Privacy + ToS + Data Rights pages + cookie consent banner | Mandatory for BR launch |

## License

Proprietary. Internal CodeFlying project.
