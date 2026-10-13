# Procurement Signal: Newsroom Runbook

This file is the standing instruction set for each automated newsroom run. A run starts with no memory, so everything it needs is here, in `newsroom/SOURCES.md`, and in the repo itself.

## Mission

Publish the procurement stories that matter to CPOs, category managers and buyers, each with a clear "what it means for procurement" angle. Quality over volume: 2–4 strong stories per run beats 10 thin ones. Google rewards original synthesis and penalizes mass-produced rewrites. Every story must earn its place.

## Each run, in order

1. **Check what's already published.** List `src/content/articles/` and read the frontmatter of the last ~40 files (title, date, tags). Never publish a story already covered unless there is material new information. If so, update the existing article (add `updated:` and a new section) instead of writing a new one.
2. **Scan for news.** Run web searches across the beats in `SOURCES.md` for the last 24–48 hours. Use at least 12 distinct searches spanning all beats. Fetch the most promising articles and primary sources.
3. **Select 2–4 stories.** Score candidates on: impact on buyers' cost/risk/operations (most important), recency, breadth (how many buyers it affects), and whether a primary source exists. Assign `signal` 1–5 (5 = every procurement leader needs to know today). Skip anything below 3. Skip pure vendor marketing, minor product updates, webinars and sponsored content.
4. **Research each story** from at least 2 independent sources, at least one primary where possible (government notice, company release, filing, official data).
5. **Write each article** to the template below.
6. **Update trackers** in `src/data/trackers/*.json` when a story adds or changes an entry. Update `updated` to today's date.
7. **Update the ticker** in `src/data/signals.json` with 4–6 current indicators you verified this run (see SOURCES.md). If you can't verify a figure, drop it. Never guess.
8. **Build to verify:** run `npm ci` (first time) then `npm run build`. Fix any errors. Never push a broken build.
9. **Commit and push** to `main` with message `newsroom: <date> — <n> stories`. Cloudflare Pages deploys automatically.
10. **Report:** end with a short summary listing stories published, trackers updated, and anything that failed.

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

Leave `image` out. The site draws original topic artwork for every story automatically. Only add an `image` if you have a photo that is clearly public domain or officially provided for press use (e.g., a U.S. government photo), with `src`, `alt` and `credit`. Never use copyrighted news or stock photos.

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
