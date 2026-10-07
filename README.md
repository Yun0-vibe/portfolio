# Yuno — Portfolio v2 (fresh revamp)

Live: https://vibeyuno.me · Repo: https://github.com/Yun0-vibe/portfolio

Complete redesign of the old dark-purple portfolio. New in v2:

- **Light editorial theme + dark mode** (persisted, system-aware) — no more purple glass / custom cursor / inspect-blocking
- **4 routes**: `/` home · `/projects` searchable archive · `/notes` reader · `/uses` setup & colophon
- **Command palette** (`Ctrl/⌘ + K`): jump to pages, projects, toggle theme, copy email
- **Project archive**: live search + category/status filters + detail modals
- **Live Kathmandu clock**, scroll progress, availability badge, stats
- **Contact form** via Vercel serverless `POST /api/contact` (optional `CONTACT_WEBHOOK_URL` forwarding to Discord/Slack)
- **Guestbook** (localStorage, no login), copy-email buttons, resume-friendly SEO (OG tags, sitemap, robots, JSON-LD)

## Run locally

```powershell
npm install
npm run dev      # http://localhost:5173
```

Contact API locally: the Vite proxy forwards `/api/*` to `http://localhost:3001`.
For a quick local API test, deploy preview on Vercel or run `vercel dev`.

## Deploy (Vercel, auto-deploy on push)

1. Vercel project settings:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (repo root — v2 moved out of `frontend/`, delete any old `frontend` root setting and the old `services` config)
   - **Build Command:** `npm run build` · **Output:** `dist`
2. Optional env var: `CONTACT_WEBHOOK_URL` (Discord/Slack webhook to receive contact messages)
3. Push to `main` — Vercel rebuilds automatically. Custom domain `vibeyuno.me` stays as-is.

## Push this revamp to GitHub

```powershell
git add -A
git commit -m "v2: fresh revamp — editorial theme, palette, archive, notes, serverless contact"
git push origin main
```

## Content

Same content as v1 (8 projects, 19 stack items, same contact handles), restructured:
`src/data.ts` is the single source — edit projects, stack groups, journey, services, notes, contacts there.
