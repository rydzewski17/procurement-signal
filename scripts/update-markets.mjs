// Refreshes the Markets page from Polymarket's public market data (no API key).
// Keeps only open markets whose question matches procurement-relevant keywords.
// On any failure the existing file is kept, so the page never breaks.
import fs from 'node:fs';

const FILE = new URL('../src/data/markets.json', import.meta.url);
const KEYWORDS = /tariff|trade war|section 301|section 232|import dut|customs|china trade|supply chain|shipping|freight|port strike|oil price|crude|brent|steel|copper|aluminum|semiconductor|chip|recession|federal reserve|fed (cut|hike|raise)|interest rate|inflation|cpi|pmi/i;

const DIRECT = 'https://gamma-api.polymarket.com/markets?active=true&closed=false&limit=500&order=volume24hr&ascending=false';

function parsePrices(raw) {
  try {
    const arr = typeof raw === 'string' ? JSON.parse(raw) : raw;
    return Array.isArray(arr) ? arr.map(Number) : null;
  } catch { return null; }
}

try {
  const res = await fetch(DIRECT, { signal: AbortSignal.timeout(20000), headers: { accept: 'application/json', 'user-agent': 'ProcurementSignalMarkets/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const list = await res.json();
  if (!Array.isArray(list)) throw new Error('unexpected response shape');

  const markets = list
    .filter((m) => m.question && KEYWORDS.test(m.question))
    .map((m) => {
      const prices = parsePrices(m.outcomePrices);
      return {
        question: m.question,
        url: `https://polymarket.com/event/${m.slug ?? ''}`,
        yes: prices ? Math.round(prices[0] * 1000) / 10 : null,
        volume24h: Math.round(Number(m.volume24hr ?? 0)),
        change24h: m.oneDayPriceChange != null ? Math.round(Number(m.oneDayPriceChange) * 1000) / 10 : null,
        endDate: m.endDate ? String(m.endDate).slice(0, 10) : null,
      };
    })
    .filter((m) => m.yes !== null)
    .slice(0, 25);

  const out = { updated: new Date().toISOString().slice(0, 10), source: 'Polymarket public market data (gamma-api.polymarket.com)', markets };
  fs.writeFileSync(FILE, JSON.stringify(out, null, 2) + '\n');
  console.log(`markets: ${markets.length} matched`);
} catch (e) {
  console.log(`markets: refresh failed (${e.message}); keeping existing data`);
}
