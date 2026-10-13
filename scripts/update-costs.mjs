// Refreshes the Cost Pressure Monitor from official U.S. producer price data
// published on FRED (Federal Reserve Bank of St. Louis). No API key required.
// Keeps the last 25 months per category and picks up BLS revisions.
import fs from 'node:fs';

const FILE = new URL('../src/data/cost-monitor.json', import.meta.url);
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));

async function series(id) {
  const res = await fetch(`https://fred.stlouisfed.org/data/${id}.txt`, { signal: AbortSignal.timeout(20000), headers: { 'user-agent': 'ProcurementSignalCostMonitor/1.0' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const rows = [];
  for (const line of (await res.text()).split('\n')) {
    const m = line.match(/^(\d{4}-\d{2}-\d{2})\s+([\d.]+)\s*$/);
    if (m) rows.push({ date: m[1], value: Number(m[2]) });
  }
  if (rows.length < 25) throw new Error('too few observations');
  return rows.slice(-25);
}

let changed = false, latest = data.dataThrough;
for (const c of data.categories) {
  try {
    const h = await series(c.series);
    if (JSON.stringify(h) !== JSON.stringify(c.history)) { c.history = h; changed = true; }
    const through = h[h.length - 1].date.slice(0, 7);
    if (through > latest) latest = through;
    console.log(`${c.series}: through ${through}`);
  } catch (e) {
    console.log(`${c.series}: failed (${e.message}); keeping existing data`);
  }
}

// Only advance "data through" when every category has reached the new month.
const allThrough = data.categories.map((c) => c.history[c.history.length - 1].date.slice(0, 7));
const common = allThrough.sort()[0];
if (changed) {
  data.dataThrough = common;
  data.updated = new Date().toISOString().slice(0, 10);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 1) + '\n');
  console.log(`Updated. Data through ${common}.`);
} else {
  console.log('No changes.');
}
