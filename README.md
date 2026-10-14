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

## Top Software and Market Outlook
- `src/data/software.ts` — software rankings: our six criterion scores (1–10), analysis, and optional G2 ratings. Categories ship as `status: 'draft'` (noindexed, "Draft" label). Review, then set `status: 'published'` and `reviewed`. Add `g2` only from G2's own pages, with the date checked.
- `src/data/outlook.ts` — our editorial call per Cost Monitor category (buyer leverage, 90-day price direction, supply risk, view, moves). The site flags calls the monthly data has moved against.
- While these sections are draft they are also excluded from the sitemap (`astro.config.mjs`); remove the prefix there when publishing.
- `/software/finder/` — the Software Finder quiz, matched in the browser from `software.ts`.
