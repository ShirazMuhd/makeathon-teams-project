# Brightloop Software — Subscription Management System

A MERN monorepo for subscription operations: authentication, role-based access, catalog, customer records, subscriptions, invoice generation, payments, billing jobs and finance reporting.

## Requirements
- Node.js 20+
- MongoDB 6/7 running locally (or Docker)
- npm 10+

## Quick start

```bash
cp .env.example server/.env
npm install
npm run dev
```

The API runs at `http://localhost:5000`, the React app at `http://localhost:5173`, and health check at `/api/health`.

### Default development administrator
- Email: `admin@brightloop.local`
- Password: `AdminPass!234`

Change these values before deployment. The first server boot creates the admin if no admin exists.

### Seed demo data

```bash
npm run seed
```

The seed command resets the local Brightloop collections and generates 2,000 customers, 10 products with variants, 6 plans, tax and discount rules, 5,000 subscriptions and a sample invoice/payment set. Run only against a disposable development database.

### Tests and build

```bash
npm test
npm run build
```

### Docker

```bash
docker compose up --build
```

## Architecture
- `server/src/models`: Mongoose schemas and indexes.
- `server/src/controllers`: HTTP orchestration; business rules are in services.
- `server/src/services`: password, pricing/tax, subscription lifecycle and invoice generation.
- `server/src/jobs`: daily billing and expiry/overdue jobs.
- `server/src/routes`: versioned REST endpoints under `/api/v1`.
- `client/src`: React pages, API client, authentication context and protected shell.
- `server/openapi.yaml`: starter OpenAPI contract.

## Main API
- Auth: `POST /auth/signup`, `/auth/login`, `/auth/logout`, `/auth/forgot-password`, `/auth/reset-password/:token`, `GET /auth/me`
- Resources: `/resources/products|plans|taxes|discounts|customers|templates`
- Subscriptions: `GET|POST /subscriptions`, `POST /subscriptions/:id/transition`
- Invoices: `GET /invoices`, `GET /invoices/:id`, `GET /invoices/:id/pdf`, `POST /invoices/:id/confirm|cancel|payments`
- Billing: `POST /billing/run`
- Reports: `GET /reports/summary`

All list endpoints accept `page`, `limit`, and supported filters. Money values are integer minor units (paise); the UI currently labels amounts as INR.

## Roles
- `admin`: full access, staff creation, catalog configuration.
- `staff`: operational access; catalog write operations are blocked.
- `customer`: own subscription/invoice reads and portal identity.

JWT is issued in an httpOnly cookie; login also returns the token for API clients. Customer invoice and subscription queries are scoped to the authenticated `customerId`.

## Assumptions and implementation notes
1. Monetary amounts are stored as integer paise. Convert rupees to paise at data-entry boundaries when integrating a production payment gateway.
2. Discounts are applied to the invoice subtotal before tax; fixed discounts are applied at subscription level. This initial implementation applies the eligible discount pool to the full invoice subtotal.
3. Fixed taxes are interpreted as a fixed amount per unit. Percentage taxes are calculated against the line amount.
4. The daily cron uses UTC server time. Configure the host timezone/operational window explicitly for production.
5. Email transport is configured through SMTP environment variables. When mail is not configured, password reset links are logged in development.
6. The included seed generator creates representative demo records but uses a smaller invoice/payment volume than the 20,000-invoice performance target in the source brief; load testing and query-plan tuning are deployment tasks.
7. The included UI is an operational starter covering the core dashboard and list/create workflows. Deep editors, quotation-to-subscription wizard, customer self-service payment collection, richer report filters, and full CRUD detail views require further product iteration.
8. Billing transaction behavior requires MongoDB replica-set support because `withTransaction` is used. Use a replica set for local testing of scheduled billing.
9. The source specification requests a sub-2-second target. This repository adds indexes, pagination and lean reads, but does not claim a measured performance SLA; benchmark against production-like hardware/data before release.

## Production checklist
Use strong secrets, HTTPS, secure cookie settings, a MongoDB replica set, SMTP credentials, backup/restore, monitoring, request size limits, audit logs, and gateway/webhook verification. Add schema-level Zod validation to each write endpoint and complete the remaining workflow pages before production use.
