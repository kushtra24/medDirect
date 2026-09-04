# Med Direct — Frontend

Nuxt 4 patient portal (i18n: English, Arabic, Kurdish).

## Docker (recommended)

From the **repository root** (`med-direct/`):

```bash
cp .env.docker.example .env.docker
docker compose up --build
```

Open http://localhost:3000. See the [root README](../README.md) for full setup, API URLs, and troubleshooting.

## Local development

```bash
npm install
cp .env.example .env
npm run dev
```

`NUXT_PUBLIC_API_BASE` in `.env` must point at the Laravel API (default `http://localhost:8000`).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Dev server on port 3000 |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
