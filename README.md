# Procurement Signal

The intelligence feed for procurement leaders. Static Astro site, deployed free on Cloudflare Pages. Articles are markdown files in `src/content/articles/`, written by a scheduled Claude newsroom run that follows `newsroom/NEWSROOM.md`.

## Local
npm install && npm run dev

## Deploy (Cloudflare Pages)
Framework preset: Astro · Build command: `npm run build` · Output: `dist`

## Structure
- `src/content/articles/` — stories (frontmatter schema in `src/content.config.ts`)
- `src/data/trackers/*.json` — tracker pages
- `src/data/signals.json` — top ticker
- `newsroom/` — newsroom runbook and source list
