# Portfolio Traffic Backend

Bun + Express REST API for counting portfolio visitors with Neon Postgres, Drizzle, and Upstash Redis.

## Setup

```bash
bun install
cp .env.example .env
bun run db:generate
bun run db:migrate
bun run dev
```

## API

`POST /api/visits`

```json
{
  "path": "/projects",
  "referrer": "https://example.com"
}
```

Response:

```json
{
  "uniqueVisitors": 12,
  "todayUniqueVisitors": 3,
  "pageViews": 45,
  "isNewDailyVisitor": true
}
```
