// Category watch: joins each purchase category's price trend (cost monitor) with the
// latest matching headline (our stories first, then the RSS wire) and a short buyer stance.
import { categories, STATUS } from './costs';
import wire from './wire.json';
import impact from './category-impact.json';

export const STANCE: Record<string, string> = {
  'rising-fast': 'Lock in pricing',
  'rising': 'Add index-linked escalators',
  'stable': 'Good window to bid',
  'easing': 'Renegotiate or re-bid',
};

// Words that tie a headline to a purchase category.
const MATCH: Record<string, RegExp> = {
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
    const theirs = wire.items.filter((i: any) => re && re.test(i.title))
      .map((i: any) => ({ title: i.title, href: i.url, source: i.source.split(' · ')[0], t: new Date(i.date).valueOf(), ext: true }));
    const pick = [...ours, ...theirs].sort((a, b) => b.t - a.t).find((x) => !used.has(x.href)) ?? null;
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
  });
}

function count(id: string, posts: any[]) {
  const re = MATCH[id];
  return posts.filter((p) => re.test(`${p.data.title} ${p.data.dek}`)).length + wire.items.filter((i: any) => re.test(i.title)).length;
}
