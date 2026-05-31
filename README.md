# AuctionHub Nepal

A timed online auction marketplace for Nepal — built with Next.js, Fastify, Postgres, and Redis.

## Tech Stack

| Layer           | Technology                                          |
| --------------- | --------------------------------------------------- |
| Frontend        | Next.js 14 (App Router) + TypeScript + Tailwind CSS |
| Backend         | Fastify (Node.js) + TypeScript                      |
| Database        | PostgreSQL 15 via Prisma ORM                        |
| Cache / Pub-Sub | Redis 7                                             |
| Object Storage  | Supabase Storage                                    |
| Background Jobs | BullMQ                                              |
| Payments        | eSewa, Khalti, connectIPS, Stripe                   |
| Email           | Resend                                              |

## Project Structure

```
auctionhub/
├── apps/
│   ├── backend/          # Fastify API server
│   └── frontend/         # Next.js web app
├── packages/
│   └── shared/           # Shared TypeScript types and constants
├── infrastructure/
│   ├── database/         # Prisma schema and migrations
│   └── docker/           # Docker config files
├── docker-compose.yml    # Starts Postgres + Redis + backend + frontend
└── .env.example          # Copy this to .env and fill in your values
```

## Getting Started

### 1. Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running
- [Node.js 20+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed

### 2. Clone and set up environment

```bash
git clone https://github.com/YOUR_USERNAME/auctionhub.git
cd auctionhub

# Copy the example environment file and fill in your values
cp .env.example .env
```

### 3. Start the development environment

```bash
# Start Postgres and Redis in Docker
docker compose up -d

# Install all dependencies
npm install

# Run database migrations
cd infrastructure/database
npx prisma migrate dev

# Start backend (in a new terminal)
npm run dev:backend

# Start frontend (in a new terminal)
npm run dev:frontend
```

### 4. Verify everything is running

| Service       | URL                                                |
| ------------- | -------------------------------------------------- |
| Frontend      | http://localhost:3000                              |
| Backend API   | http://localhost:3001                              |
| Health check  | http://localhost:3001/health                       |
| Prisma Studio | Run `npx prisma studio` in infrastructure/database |

## Development Phases

- [x] **Phase 1** — Foundation (monorepo, Docker, DB schema, API & UI skeletons)
- [ ] **Phase 2** — Authentication (registration, email verify, JWT login)
- [ ] **Phase 3** — Listings (CRUD, image upload, admin approval)
- [ ] **Phase 4** — Auctions & Bidding (real-time WebSockets, anti-sniping)
- [ ] **Phase 5** — Payments (eSewa, Khalti, Stripe, payouts)
- [ ] **Phase 6** — Trust & Finishing (KYC, disputes, emails, admin dashboard)

## Environment Variables

Copy `.env.example` to `.env` and fill in all values before running the project.
Never commit the `.env` file — it is listed in `.gitignore`.
