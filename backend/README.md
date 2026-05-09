# BeatFlow API (Discover backend)

Minimal Express service for **Discover** personalised shelves, catalogue search, and durable play / remix stats.

## Endpoints

- `GET /health` → `{ ok: true }`
- `GET /api/discover?q=` → Featured beat, trending / fresh / popular rails, remix section, flattened `beats`.
- `POST /api/play` → Body `{ beatId }` or `{ remixId }` increments play counters (persisted in `data/state.json`).
- `POST /api/like` → Same pattern for `{ beatId }` or `{ remixId }`.

## Run

```bash
cd backend && npm install && npm run dev
```

Defaults to **http://localhost:4000**.

## Frontend

Set in `frontend/.env.local`:

```
NEXT_PUBLIC_BEATFLOW_API_URL=http://localhost:4000
```

If unset, the Discover page falls back to in-browser catalogue data (`mockData`).

## Data

- `data/catalog.json` — beat catalogue seed.
- `data/remixes.json` — remix rail seed (with `producerSolana` for tips).
- `data/state.json` — **generated** deltas for plays/likes (gitignored).
