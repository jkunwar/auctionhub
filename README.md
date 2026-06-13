# AuctionHub Nepal

A timed online auction marketplace for Nepal — built with Next.js, Fastify, PostgreSQL, and Redis.

**Model:** Operator-consignment. Sellers bring items to the operator's store; the operator lists them. Buyers bid online; the winner schedules an in-store pickup and pays on collection.

## Tech Stack

| Layer           | Technology                                              |
| --------------- | ------------------------------------------------------- |
| Frontend        | Next.js 16 (App Router) + TypeScript + Tailwind CSS v4  |
| Backend         | Fastify + TypeScript                                    |
| Database        | PostgreSQL 15 via Prisma ORM                            |
| Cache / Pub-Sub | Redis 7                                                 |
| Object Storage  | Supabase Storage                                        |
| Background Jobs | BullMQ                                                  |
| Email           | Resend                                                  |

> **v1.1 (not in MVP):** eSewa / Khalti / Stripe payments, automated payouts, self-serve seller KYC, dispute system, native mobile app.

## Project Structure

```
auctionhub/
├── apps/
│   ├── backend/               # Fastify API server
│   └── frontend/              # Next.js web app
├── packages/
│   └── shared/                # Shared TypeScript types (keep in sync with Prisma enums)
├── infrastructure/
│   ├── database/              # Prisma schema, migrations, prisma.config.ts
│   └── docker/                # Postgres init SQL, Redis config
├── docker-compose.yml         # Runs Postgres + Redis locally
└── .env.example               # Copy to .env and fill in values
```

## Getting Started

### Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — for Postgres and Redis
- [Node.js 20+](https://nodejs.org/)
- [pnpm 9+](https://pnpm.io/installation) — `npm install -g pnpm`

### 1. Clone and configure

```bash
git clone https://github.com/YOUR_USERNAME/auctionhub.git
cd auctionhub

# Create your local env file and fill in the values
cp .env.example .env
```

Open `.env` and update every placeholder. Pay attention to:

- `POSTGRES_PASSWORD` — choose any password, but use the **same value** in `DATABASE_URL`
- `DATABASE_URL` — port must be **5434** (docker-compose maps Postgres to 5434 to avoid conflicts with any local Postgres installation)
- `JWT_SECRET` / `EMAIL_VERIFY_SECRET` — generate a secure value with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

### 2. Start Postgres and Redis

```bash
docker compose up -d
```

Verify both containers are healthy:

```bash
docker compose ps
```

### 3. Install dependencies

```bash
pnpm install
```

### 4. Run database migrations

```bash
pnpm db:migrate
```

### 5. Start the development servers

Open two terminals:

```bash
# Terminal 1 — Backend API (http://localhost:3001)
pnpm dev:backend

# Terminal 2 — Frontend (http://localhost:3000)
pnpm dev:frontend
```

### Verify everything is running

| Service       | URL                          |
| ------------- | ---------------------------- |
| Frontend      | http://localhost:3000        |
| Backend API   | http://localhost:3001        |
| Health check  | http://localhost:3001/health |
| Prisma Studio | `pnpm db:studio`             |

## Useful Commands

```bash
pnpm dev:backend        # Start Fastify in watch mode
pnpm dev:frontend       # Start Next.js dev server
pnpm db:migrate         # Run pending Prisma migrations
pnpm db:generate        # Regenerate Prisma client after schema changes
pnpm db:studio          # Open Prisma Studio (visual DB browser)
pnpm build              # Build all apps
pnpm lint               # Lint all apps
```

## Environment Variables

All variables are documented in [`.env.example`](.env.example).
Never commit `.env` — it is in `.gitignore`.

## Development Phases

- [x] **Phase 1** — Foundation: monorepo, Docker, DB schema, Fastify + Next.js skeletons
- [ ] **Phase 2** — Auth: registration, email verification, JWT login/logout
- [ ] **Phase 3** — Listings: admin CRUD, image upload to Supabase Storage
- [ ] **Phase 4** — Auctions & Bidding: real-time WebSockets, proxy bidding, anti-sniping
- [ ] **Phase 5** — Orders & Pickup: winner flow, slot scheduling, admin pickup dashboard
- [ ] **Phase 6** — Notifications: Resend email + in-app, BullMQ workers
- [ ] **Phase 7** — Admin dashboard, ratings, audit log, security hardening

## Key Design Decisions

| Decision | Choice | Reason |
| --- | --- | --- |
| Prices | Integer (NPR paisa) | Avoids float rounding errors |
| Auth | Custom JWT in Fastify | Supabase used for storage only, not auth |
| Roles | DB roles table (buyer / seller / staff / admin) | Multi-role support; a supplier can also be a buyer |
| Sellers (MVP) | Operator manages offline | No self-serve seller registration until v1.1 |
| Payments (MVP) | In-store cash on pickup | Online gateways (eSewa, Khalti) deferred to v1.1 |
| Anti-sniping | 2-min trigger → 5-min extension, unlimited | Prevents last-second bid sniping |
