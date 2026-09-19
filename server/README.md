# HealthAI Summarizer Backend

This backend is intentionally isolated under `server/`; the existing Vite frontend is unchanged.

## Stack

- Express + TypeScript
- Prisma + PostgreSQL
- Zod validation
- Multipart report uploads

## Run locally

```bash
cd server
cp .env.example .env
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

The API listens on `http://localhost:4000` by default. Use the `x-user-id` header to select a patient during development; it defaults to `demo-user`.

## Endpoints

- `GET /api/health`
- `GET|PUT /api/profile`
- `GET|POST /api/vitals`
- `GET|POST /api/journal`
- `GET|POST /api/reports`
- `GET /api/alerts`
- `PATCH /api/alerts/:id/read`
- `GET /api/timeline`
- `GET /api/specialists`

Report processing currently stores metadata and a text preview. OCR/LLM processing should be added behind `services/reportProcessor.ts` without changing the API contract.
