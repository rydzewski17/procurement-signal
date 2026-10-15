# Procurement Signal: Newsroom Runbook

This file is the standing instruction set for each automated newsroom run. A run starts with no memory, so everything it needs is here, in `newsroom/SOURCES.md`, and in the repo itself.

## Mission

**Audience:** B2B procurement, sourcing and supply chain professionals: CPOs, category managers, sourcing leads, supply chain and logistics leaders, and the finance and operations teams who work with them. Every story must matter to someone who buys, sources or moves goods for a business. Skip consumer news, retail deals and general business stories without a procurement angle.

Publish the procurement stories that matter to CPOs, category managers and sourcing teams, each with a clear "what it means for procurement" angle. Quality over volume: 2–4 strong stories per run beats 10 thin ones. Google rewards original synthesis and penalizes mass-produced rewrites. Every story must earn its place.

## Each run, in order

1. **Check what's already published.** List `src/content/articles/` and read the frontmatter of the last ~40 files (title, date, tags). Never publish a story already covered unless there is material new information. If so, update the existing article (add `updated:` and a new section) instead of writing a new one.
2. **Scan for news.** Run web searches across the beats in `SOURCES.md` for the last 24–48 hours. Use at least 12 distinct searches spanning all beats. Fetch the most promising articles and primary sources.
3. **Select 2–4 stories.** Score candidates on: impact on procurement teams' cost/risk/operations (most important), recency, breadth (how many procurement teams it affects), and whether a primary source exists. Assign `signal` 1–5 (5 = every procurement leader needs to know today). Skip anything below 3. Skip pure vendor marketing, minor product updates, webinars and sponsored content.
4. **Research each story** from at least 2 independent sources, at least one primary where possible (government notice, company release, filing, official data).
5. **Write each article** to the template below.
6. **Update trackers** in `src/data/trackers/*.json` when a story adds or changes an entry. Update `updated` to today's date.
7. **Update the events bar** in `src/data/events.json`: add any new dated event a story covers (an effective date, deadline, expiry or vote) with `date` (YYYY-MM-DD), a short `label` (under 50 characters) and `href` to our story. Remove events more than 60 days old. The bar shows countdowns, price alerts and trending topics automatically.
8. **Update category analysis** in `src/data/category-impact.json` when a story or the monthly price data changes a category's picture. For each affected category, `now` must be factual and cite a source in `sources` (our article or the original publisher); `meaning` is our analysis of what it means for category strategy and suppliers, in one or two sentences. Also keep our assessment fields current: `leverage` (1 = suppliers hold it, 5 = procurement teams hold it), `risk` (low, elevated or high), `riskWhy` (factual, sourced), `move` (the first action we recommend) and `when` (the window to act). Price direction is one input, not the verdict. Update `asOf` to today's date. Never state a figure that is not in a cited source.
9. **Build to verify:** run `npm ci` (first time) then `npm run build`. Fix any errors. Never push a broken build.
10. **Commit and deploy.** Commit on a branch with message `newsroom: <date> — <n> stories`, push it, then open a pull request to `main` and squash-merge it with the GitHub REST API (`gh api`), not GraphQL. If a direct push to `main` is allowed, that is fine too. Cloudflare deploys from `main` automatically; confirm the "Workers Builds" check on the merge commit succeeded.
11. **Report:** end with a short summary listing stories published, trackers updated, and anything that failed.

## Run types

- **Morning run (weekdays):** the full run above, publishing 2–4 stories. The first story should be the day's most important development, written to lead the homepage (set `featured: true` on it and remove `featured` from the previous lead).
- **Afternoon run (weekdays):** check for material developments since the morning. Publish 1–2 new stories only if they meet the signal bar; otherwise update existing articles with new facts (add `updated:` and revise the relevant sections and FAQs). Refresh `events.json` and `category-impact.json` if anything changed.
- **Monday extras (morning run):**
  - Re-check G2 ratings and review counts for every vendor in `src/data/software.json` (update `g2.rating`, `g2.reviews`, `g2.checked`, and the root `updated` date). Update a vendor's `web` market view when there is material news (funding, acquisition, analyst recognition, major launch), with the source added to `webSources`. Never add JAGGAER.
  - Check `src/data/conferences.json` dates and add major procurement and supply chain events in the next 12 months with official links.
  - Remove expired entries from trackers and `events.json`.
  - Publish one `type: signal` weekly briefing on the week ahead: deadlines, data releases and what procurement teams should prepare for.
  - Publish or refresh one evergreen guide in `src/content/guides/` (title, description, updated, topic, 3–6 takeaways, 3–5 FAQs, sources), 1,000+ words, targeting a question procurement teams search for. Link it from related articles and add related glossary terms in `src/content/glossary/`.
  - Add any new dated deadlines to `src/data/trackers/tariff-deadlines.json` (rows sorted newest first).

## Interactive features and how they stay current

- **Cost Pressure Monitor and Market outlook:** refreshed by the daily GitHub Action from producer price data. When a new month's data lands, publish the monthly signal story described below.
- **Most popular / Top stories / Trending:** computed at build time from `signal` and freshness, so accurate `signal` scores matter.
- **Category outlook** (homepage "Your categories this quarter", `/outlook/`, section pages and the rail): reads `category-impact.json`; keep it current as described in step 8.
- **Software rankings, widget and Finder:** read `software.json`; refreshed on Mondays.

## Article template

File: `src/content/articles/YYYY-MM-DD-short-slug.md` (slug: 3–7 lowercase words, hyphenated, keyword-first).

```markdown
---
title: "Our own headline: specific, factual, includes the key entity and number and the procurement angle. Never copy the source headline. Max ~110 chars."
dek: "One sentence, 20–35 words, that adds information beyond the headline."
date: 2026-10-12
topic: tariffs-trade   # tariffs-trade | supplier-risk | proc-tech | commodities | public-sector | esg-regulation | ai-procurement | people-moves | logistics | industry
type: news             # news | signal | analysis
signal: 4              # 1-5
featured: false        # true only for the single most important story of the day
keyfacts:              # 2-4 key figures shown as a band at the top of the story. Short values, verified.
  - value: "178"
    label: "product exclusions still in force"
categories: ["freight", "contracts"]  # 1-3 slugs from src/data/categories.mjs, most important first (decides section and breadcrumb)
tags: ["..."]          # 3-6 tags. Reuse existing tag names exactly (check recent articles) so tag pages and Trending topics group well.
sources:
  - name: "Publisher — Article or document title"
    url: "https://..."
faqs:                  # 2-3 questions procurement teams search for, answered in 1-2 factual sentences. Rendered on the page with FAQPage schema.
  - q: "...?"
    a: "..."
---

## Why it matters

1–2 sentences. The direct consequence for procurement teams. This is shown on the homepage.

## The details

3–6 short paragraphs or bullets: who, what, when, how much. Specific numbers, dates, names. Attribute claims ("according to the Commerce Department notice...").

## What procurement teams should do

3–5 concrete, practical bullets (e.g., "Review contracts with X-origin suppliers for tariff pass-through clauses"). General guidance, never legal advice.

## What to watch next

3 bullets: dated events, decisions or data releases that will change the picture, grounded in the sources.

## The bigger picture

1–2 paragraphs of context: how this connects to trends, prior events, or other stories. Link to related Procurement Signal articles where relevant, using `/articles/<slug>/`.
```

Length: 900–1,400 words for news, 1,200–1,800 for signal reports and analysis. "The details" should carry most of the length: the numbers, the background, how it compares with prior years, who is affected and what the original reporting and primary documents say, each point sourced. Every article also needs a table or framework, "What procurement teams should do", "What to watch next" and 3–5 FAQs.

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

## Our pages only

Every list on the site (homepage, sections, categories, article rails, related stories) shows only Procurement Signal articles. Trade-press headlines in `wire.json` are research input for the newsroom, never displayed. To cover a story you found there, write our own article: our headline, our analysis, the procurement angle, and link the original in `sources`. Write for procurement teams and category managers, not "buyers" as a generic audience.

## Voice and style

- Smart, direct, scannable. Short paragraphs. Write for a busy CPO reading on a phone.
- Specific beats vague: "$2.1B", "effective Nov. 1", "38 suppliers", not "significant" or "soon".
- No hype words: game-changing, revolutionary, unprecedented, landscape, delve, navigate, in today's fast-paced world.
- Neutral and fair. No promotion of any vendor. Vendor news is covered for its impact on procurement teams.
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
5. Publish one `type: signal` story on the month's readings: which categories changed label, the biggest movers, and what procurement teams should do. Use only numbers computed from the data file. Run `node -e` against the JSON to compute them rather than estimating.

Never invent or estimate an index value. If FRED is unreachable, skip the update and say so in the run report.


## Category deep dives, links and ads

- **Category deep dives** live in `src/content/outlook/{category}.md` and render at `/outlook/{category}/`. When `category-impact.json` changes a category's rating or move, update that file's takeaways and the "What is driving prices now" section, cite sources in frontmatter, and set `updated`. Educational sections (how the market works, how to buy it) change rarely.
- **In-text links** are added automatically by `src/data/autolinks.ts`: first mentions of key terms link to our stories, guides, category analysis and glossary, and the first mention of each cited publisher links to its source. When you publish a story about a new company or topic, add a rule for it so other pages link to it. Still write 2–4 deliberate internal links into every new article.
- **Ads**: the house advertiser is AdMesh (`src/components/AdMesh.astro`). Do not change ad copy or add advertisers without Jason's approval.
- **Tariff tracker rows** (`src/data/trackers/tariff-deadlines.json`) need `date` (ISO), `authority` (Section 232, Section 301, Section 122, IEEPA, Trade deal, USMCA or EU rules), `kind` (start, increase, decrease, end, review, refund, compliance), `article` (our coverage) and `affects` (short labels) so they appear on the timeline and countdown. Update the "tariff layers in force" cards in `src/pages/trackers/[slug].astro` when a rate changes.
