# Procurement Signal: Newsroom Runbook

This file is the standing instruction set for each automated newsroom run. A run starts with no memory, so everything it needs is here, in `newsroom/SOURCES.md`, and in the repo itself.

## Mission

**Audience:** B2B procurement, sourcing and supply chain professionals: CPOs, category managers, buyers, supply chain and logistics leaders, and the finance and operations teams who work with them. Every story must matter to someone who buys, sources or moves goods for a business. Skip consumer news, retail deals and general business stories without a procurement angle.

Publish the procurement stories that matter to CPOs, category managers and buyers, each with a clear "what it means for procurement" angle. Quality over volume: 2–4 strong stories per run beats 10 thin ones. Google rewards original synthesis and penalizes mass-produced rewrites. Every story must earn its place.

## Each run, in order

1. **Check what's already published.** List `src/content/articles/` and read the frontmatter of the last ~40 files (title, date, tags). Never publish a story already covered unless there is material new information. If so, update the existing article (add `updated:` and a new section) instead of writing a new one.
2. **Scan for news.** Run web searches across the beats in `SOURCES.md` for the last 24–48 hours. Use at least 12 distinct searches spanning all beats. Fetch the most promising articles and primary sources.
3. **Select 2–4 stories.** Score candidates on: impact on buyers' cost/risk/operations (most important), recency, breadth (how many buyers it affects), and whether a primary source exists. Assign `signal` 1–5 (5 = every procurement leader needs to know today). Skip anything below 3. Skip pure vendor marketing, minor product updates, webinars and sponsored content.
4. **Research each story** from at least 2 independent sources, at least one primary where possible (government notice, company release, filing, official data).
5. **Write each article** to the template below.
6. **Update trackers** in `src/data/trackers/*.json` when a story adds or changes an entry. Update `updated` to today's date.
7. **Update the events bar** in `src/data/events.json`: add any new dated event a story covers (an effective date, deadline, expiry or vote) with `date` (YYYY-MM-DD), a short `label` (under 50 characters) and `href` to our story. Remove events more than 60 days old. The bar shows countdowns, price alerts and trending topics automatically.
8. **Update category analysis** in `src/data/category-impact.json` when a story or the monthly price data changes a category's picture. For each affected category, `now` must be factual and cite a source in `sources` (our article or the original publisher); `meaning` is our analysis of what it means for buyers and suppliers, in one or two sentences. Update `asOf` to today's date. Never state a figure that is not in a cited source.
9. **Build to verify:** run `npm ci` (first time) then `npm run build`. Fix any errors. Never push a broken build.
10. **Commit and push** to `main` with message `newsroom: <date> — <n> stories`. Cloudflare Pages deploys automatically.
11. **Report:** end with a short summary listing stories published, trackers updated, and anything that failed.

## Article template

File: `src/content/articles/YYYY-MM-DD-short-slug.md` (slug: 3–7 lowercase words, hyphenated, keyword-first).

```markdown
---
title: "Headline: specific, factual, includes the key entity and number. Max ~90 chars."
dek: "One sentence, 20–35 words, that adds information beyond the headline."
date: 2026-10-12
topic: tariffs-trade   # tariffs-trade | supplier-risk | proc-tech | commodities | public-sector | esg-regulation | ai-procurement | people-moves
type: news             # news | signal | analysis
signal: 4              # 1-5
featured: false        # true only for the single most important story of the day
keyfacts:              # 2-4 key figures shown as a band at the top of the story. Short values, verified.
  - value: "178"
    label: "product exclusions still in force"
tags: ["..."]          # 3-6 tags. Reuse existing tag names exactly (check recent articles) so tag pages and Trending topics group well.
sources:
  - name: "Publisher — Article or document title"
    url: "https://..."
---

## Why it matters

1–2 sentences. The direct consequence for procurement teams. This is shown on the homepage.

## The details

3–6 short paragraphs or bullets: who, what, when, how much. Specific numbers, dates, names. Attribute claims ("according to the Commerce Department notice...").

## What buyers should do

3–5 concrete, practical bullets (e.g., "Review contracts with X-origin suppliers for tariff pass-through clauses"). General guidance, never legal advice.

## The bigger picture

1–2 paragraphs of context: how this connects to trends, prior events, or other stories. Link to related Procurement Signal articles where relevant, using `/articles/<slug>/`.
```

Length: 450–800 words for news, 700–1,200 for signal reports and analysis.

## Images

Every story needs a real photo with correct credit. Allowed sources only:

1. **Unsplash (default).** Fetch `https://unsplash.com/napi/search/photos?query=<3-4 keywords>&per_page=10` and pick a result where `premium` is false (never `plus.unsplash.com` URLs). Use `src: https://images.unsplash.com/photo-...?ixlib=rb-4.1.0` (from `urls.raw`, without other params), `credit:` the photographer's name, `creditUrl:` the photo's `links.html`, `license: "Unsplash"`.
2. **U.S. federal government photos** (public domain), e.g. CBP, DoD/DVIDS, NASA, USDA. Use `license: "Public domain (U.S. government)"` and credit the agency.
3. **Company press/media kits** explicitly offered for editorial use. Use `license: "Courtesy of <Company>"`.

Never use photos from news outlets, trade publications, Getty, AP, Reuters or any site that doesn't grant reuse, even with a credit line. A citation does not make an unlicensed photo legal.

Pick photos that illustrate the subject literally (port and containers for tariffs, pills for pharma, a steel mill for steel). Avoid photos of identifiable people for negative stories (bankruptcies, forced labor, fraud), so no one is implied to be involved. If nothing suitable is found, omit `image`; the topic's default photo is used.

```yaml
image:
  src: "https://images.unsplash.com/photo-1590496793907-4d66e2994b4d?ixlib=rb-4.1.0"
  alt: "A container ship being loaded by cranes at an industrial port at dusk"
  credit: "Timelab"
  creditUrl: "https://unsplash.com/photos/container-ship-at-industrial-port-yx20mpDyr2I"
  license: "Unsplash"
```

## Voice and style

- Smart, direct, scannable. Short paragraphs. Write for a busy CPO reading on a phone.
- Specific beats vague: "$2.1B", "effective Nov. 1", "38 suppliers", not "significant" or "soon".
- No hype words: game-changing, revolutionary, unprecedented, landscape, delve, navigate, in today's fast-paced world.
- Neutral and fair. No promotion of any vendor. Vendor news is covered for its impact on buyers.
- American English. Headlines in sentence case.

## Hard rules

- **Never fabricate.** Every fact, number, quote and date must come from a source you actually read this run. If you can't verify it, leave it out.
- **No copying.** Write entirely in your own words. Quotes only if essential, under 15 words, max one per source, attributed.
- **Always cite.** Every source used goes in `sources`. Link the most important ones inline too.
- **Don't predict as fact.** Label analysis and expectations as such.
- **Independence.** The site is a personal project. Do not mention the editor's employer. Cover all vendors on news value alone.
- If a run finds nothing that clears signal 3, publish nothing and report that. An empty day is fine; a weak story isn't.

## Weekly items

- **Mondays:** publish one `type: analysis` piece: "The week ahead in procurement" (key deadlines, tariff dates, earnings, regulatory events), using the trackers.
- **Fridays:** publish one `type: signal` report built from data (e.g., a commodity price roundup, week's major contract awards, proc-tech deal roundup).

## Monthly: Cost Pressure Monitor update

The monitor lives in `src/data/cost-monitor.json` (12 categories, 25 months of history each). The Bureau of Labor Statistics releases Producer Price Index data around mid-month.

On the first run on or after the 15th of each month:

1. For each category, fetch `https://fred.stlouisfed.org/data/<series>.txt` and read the latest observations.
2. If a new month exists, append it to that category's `history` and drop the oldest month, so each series keeps exactly 25 points. BLS revises recent months, so also overwrite the previous four months with the current values.
3. Set `dataThrough` to the new month (`YYYY-MM`) and `updated` to today.
4. Build. The site recalculates the changes and pressure labels automatically.
5. Publish one `type: signal` story on the month's readings: which categories changed label, the biggest movers, and what buyers should do. Use only numbers computed from the data file. Run `node -e` against the JSON to compute them rather than estimating.

Never invent or estimate an index value. If FRED is unreachable, skip the update and say so in the run report.
