# HealthAI Summarizer Backend

The backend is isolated under `server/`; the existing frontend is unchanged.

## Run locally

```bash
cd server
cp .env.example .env
npm install
npm run prisma:generate
npm run prisma:migrate -- --name init
npm run dev
```

The API listens on `http://localhost:4000`. Until authentication is added, send an optional `x-user-id` header; otherwise the development identity `demo-user` is used.

## Endpoints

- `GET /api/health` — API and database readiness check
- `GET|PUT /api/profile`
- `GET|POST /api/vitals`
- `GET|POST /api/journal`
- `GET|POST /api/reports` (multipart field: `file`)
- `GET /api/alerts`, `PATCH /api/alerts/:id/read`
- `GET /api/timeline`
- `GET /api/specialists?organId=spine`
- `POST /api/chat/query` with `{ "question": "..." }`

## Build verification

```bash
npm run build
```

Report uploads currently store metadata and files locally. OCR/LLM processing should be added behind a service layer before production use. Do not expose uploaded files publicly without authorization.
