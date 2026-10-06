# Records workspace

A small prototype for editing catalog and content records. Persistence currently lives only in process memory, initialized from the JSON files in `fixtures/`. Restarting the backend restores those fixtures. There is no database, ORM, account provider, or deployment-provider configuration.

The React interface loads a collection, opens a record as JSON, and saves edits. Both collections expose the same API:

- `GET /api/catalog` and `GET /api/content`: list records.
- `GET /api/{collection}/{id}`: retrieve one record (404 if absent).
- `PUT /api/{collection}/{id}`: create or replace a record; URL and body IDs must match.
- `GET /health`: readiness check.

`ownerId` is an opaque identifier supplied by an external identity service. This app does not store users, orders, invoices, or other owner entities. Example data is synthetic. The two feature areas are independent.

Catalog records contain category-specific attributes and nested variants. Content records contain versioned shapes and heterogeneous blocks. Current API behavior is list/read/save; database-backed filtering, targeted nested updates, and recurring reports are future work.

## Run

Python 3.11+: `python -m venv .venv`, then `.venv/bin/pip install -r requirements.lock` and `.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8000`. In another terminal: `cd frontend && npm ci && npm run dev` (Node.js 22+) starts the React UI on port 5173.
