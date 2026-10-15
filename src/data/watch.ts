// Category watch: joins each purchase category's price trend (cost monitor) with the
// latest of our stories on it, and a recommended category strategy.
import { categories, STATUS } from './costs';
import impact from './category-impact.json';

export const STANCE: Record<string, string> = {
  'rising-fast': 'Secure supply and fix pricing',
  'rising': 'Move to index-linked pricing',
  'stable': 'Run a competitive sourcing event',
  'easing': 'Re-bid or renegotiate now',
};

// Words that tie a headline to a purchase category.
export const MATCH: Record<string, RegExp> = {
  steel: /\bsteel\b/i,
  aluminum: /alumin/i,
  copper: /\bcopper\b|\bbrass\b/i,
  resins: /\bresin|plastic|polymer/i,
  chemicals: /chemical/i,
  diesel: /diesel|fuel price|\bfuel\b/i,
  ocean: /ocean|container|vessel|trans-?pacific|port of|\bport\b|shipping rate|panama canal/i,
  trucking: /truck|linehaul|\bTL\b|\bLTL\b|freight broker/i,
  semis: /semiconductor|\bchips?\b|wafer|foundry/i,
  electrical: /electrical|transformer|motor|switchgear/i,
  lumber: /lumber|timber|\bwood\b/i,
  paper: /paper|packaging|corrugated|cardboard|\bboxes\b/i,
};

const clip = (t: string, n = 110) => (t.length > n ? t.slice(0, t.lastIndexOf(' ', n)) + '…' : t);

export const impactAsOf = impact.asOf;

// Our assessment of who holds negotiating leverage (1 = suppliers, 5 = procurement teams).
export const LEVERAGE: Record<number, { label: string; short: string }> = {
  1: { label: 'Suppliers hold the leverage', short: 'Suppliers' },
  2: { label: 'Suppliers have the edge', short: 'Leaning suppliers' },
  3: { label: 'Balanced', short: 'Balanced' },
  4: { label: 'Procurement has the edge', short: 'Leaning procurement' },
  5: { label: 'Procurement holds the leverage', short: 'Procurement' },
};
export const RISK: Record<string, string> = { high: 'High supply risk', elevated: 'Elevated supply risk', low: 'Low supply risk' };
const RISK_ORDER: Record<string, number> = { high: 0, elevated: 1, low: 2 };
const ORDER: Record<string, number> = { 'rising-fast': 0, 'rising': 1, 'easing': 2, 'stable': 3 };

export function categoryWatch(posts: any[]) {
  const used = new Set<string>();
  // Assign headlines to the categories with the fewest matches first, so niche categories keep theirs.
  const order = [...categories].sort((a, b) => count(a.id, posts) - count(b.id, posts));
  const assigned = new Map<string, any>();
  for (const c of order) {
    const re = MATCH[c.id];
    const ours = posts.filter((p) => re && re.test(`${p.data.title} ${p.data.dek}`))
      .map((p) => ({ title: p.data.title, href: `/articles/${p.id}/`, source: 'Procurement Signal', t: p.data.date.valueOf(), ext: false }));
    const pick = ours.sort((a, b) => b.t - a.t).find((x) => !used.has(x.href)) ?? null;
    if (pick) used.add(pick.href);
    assigned.set(c.id, pick ? { ...pick, title: clip(pick.title) } : null);
  }
  return [...categories].sort((a, b) => ORDER[a.status] - ORDER[b.status] || Math.abs(b.y1) - Math.abs(a.y1)).map((c) => {
    const h = c.history, n = h.length;
    const m3 = ((h[n - 1].value / h[n - 4].value) - 1) * 100;
    const m1 = ((h[n - 1].value / h[n - 2].value) - 1) * 100;
    const latest = assigned.get(c.id);
    return {
      id: c.id, name: c.name.replace(/ \(.*\)$/, ''), group: c.group,
      y1: c.y1, m3, m1, status: c.status, statusLabel: STATUS[c.status].label,
      stance: STANCE[c.status], posture: STATUS[c.status].posture, latest,
      impact: (impact.items as any)[c.id] ?? null,
    };
  }).map((r) => ({ ...r, latest: pickRead(r, posts), name: r.impact?.label ?? r.name, leverage: r.impact?.leverage ?? 3, risk: r.impact?.risk ?? 'elevated' }));
}

// Ordered for action: highest supply risk first, then where suppliers hold the most leverage.
export function categoryOutlook(posts: any[]) {
  return categoryWatch(posts).sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk] || a.leverage - b.leverage);
}

function count(id: string, posts: any[]) {
  const re = MATCH[id];
  return posts.filter((p) => re.test(`${p.data.title} ${p.data.dek}`)).length;
}

// Prefer the most relevant story cited on the card over a keyword match.
function pickRead(r: any, posts: any[]) {
  const cited = (r.impact?.sources ?? []).map((x: any) => x.url).filter((u: string) => u.startsWith('/articles/') && !u.includes('cost-pressure-monitor'));
  const post = cited.map((u: string) => posts.find((p) => `/articles/${p.id}/` === u)).filter(Boolean)
    .sort((a: any, b: any) => b.data.date.valueOf() - a.data.date.valueOf())[0];
  return post ? { title: clip(post.data.title), href: `/articles/${post.id}/` } : r.latest;
}
