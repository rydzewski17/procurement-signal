import raw from './software.json';

export interface TeamScores { [criterionId: string]: number }
export interface Vendor {
  name: string; team: TeamScores | null;
  g2: { rating: number | null; reviews: number; url: string; checked: string };
  seller?: string | null; founded?: number | null; hq?: string | null;
  mix?: { small?: number; mid?: number; large?: number } | null;
  bestFor?: string; what?: string; likes?: string[]; flags?: string[];
  scores?: Record<string, number> | null; affiliated?: boolean; note?: string | null;
}
export interface SoftwareCategory {
  slug: string; name: string; short: string; accent: string; blurb: string; answer: string;
  g2: { category: string; url: string; products: number; avg: number | null; updated: string };
  scoreAvg: Record<string, number>; choose: [string, string][]; pricing: string; implementation: string;
  candidates: string[]; vendors: Vendor[];
}

export const SOFTWARE = raw as unknown as { updated: string; minReviews: number; rubric: { id: string; label: string }[]; method: string; disclosure: string; categories: SoftwareCategory[] };

export const slugify = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const fmtDate = (s: string) => new Date(s + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });

// Team score = average of the rubric scores entered for a vendor (null until your team has scored it).
export function teamAverage(v: Vendor): number | null {
  if (!v.team || v.affiliated) return null; // affiliated vendors are never team-scored
  const vals = SOFTWARE.rubric.map((r) => v.team![r.id]).filter((x): x is number => typeof x === 'number');
  if (vals.length < SOFTWARE.rubric.length) return null;
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100) / 100;
}

export function rankTeam(c: SoftwareCategory) {
  const scored = c.vendors.map((v) => ({ v, avg: teamAverage(v) })).filter((x) => x.avg !== null)
    .sort((a, b) => (b.avg! - a.avg!));
  return { ranked: scored, pending: c.vendors.filter((v) => teamAverage(v) === null) };
}

export function rankG2(c: SoftwareCategory) {
  const min = SOFTWARE.minReviews;
  const ranked = c.vendors.filter((v) => v.g2.rating !== null && v.g2.reviews >= min)
    .sort((a, b) => (b.g2.rating! - a.g2.rating!) || (b.g2.reviews - a.g2.reviews));
  return { ranked, unranked: c.vendors.filter((v) => !ranked.includes(v)) };
}

// A category is "ranked" once either ranking has data. Otherwise it is in progress.
export function status(c: SoftwareCategory) {
  const g = rankG2(c).ranked.length > 0, t = rankTeam(c).ranked.length > 0;
  return g || t ? 'ranked' : 'in-progress';
}

export const allCategories = () => SOFTWARE.categories;
export const categoryBySlugSW = (slug: string) => SOFTWARE.categories.find((c) => c.slug === slug);

// ---------- Derived views used by the ranking pages ----------
export const TIE = 0.3;
const pct = (n?: number) => (typeof n === 'number' ? n : 0);

// G2 size buckets: small business (50 or fewer employees), mid-market (51-1,000), enterprise (more than 1,000).
export function mixOf(v: Vendor) {
  if (!v.mix) return null;
  const m = v.mix as Record<string, number | undefined>;
  const keys = ['small', 'mid', 'large'] as const;
  const missing = keys.filter((k) => typeof m[k] !== 'number');
  const known = keys.reduce((s, k) => s + (m[k] ?? 0), 0);
  // G2 publishes the two largest segments; the third is the remainder of 100%.
  const fill = missing.length === 1 ? Math.max(0, 100 - known) : 0;
  const get = (k: typeof keys[number]) => (typeof m[k] === 'number' ? m[k]! : fill);
  return { small: get('small'), mid: get('mid'), large: get('large') };
}

// Groups the G2 ranking into tiers: each tier holds vendors within TIE points of the tier's leader.
export function g2Tiers(c: SoftwareCategory) {
  const tiers: { lo: number; hi: number; vendors: Vendor[] }[] = [];
  for (const v of rankG2(c).ranked) {
    const t = tiers[tiers.length - 1];
    if (t && t.hi - v.g2.rating! < TIE - 1e-9) { t.vendors.push(v); t.lo = v.g2.rating!; }
    else tiers.push({ hi: v.g2.rating!, lo: v.g2.rating!, vendors: [v] });
  }
  return tiers;
}

export function quickPicks(c: SoftwareCategory) {
  const r = rankG2(c).ranked;
  if (!r.length) return [];
  const by = (f: (v: Vendor) => number) => [...r].sort((a, b) => f(b) - f(a) || b.g2.reviews - a.g2.reviews)[0];
  const ent = by((v) => mixOf(v)?.large ?? -1);
  const sm = by((v) => mixOf(v)?.small ?? -1);
  return [
    { label: 'Highest G2 rating', v: r[0], stat: `${r[0].g2.rating!.toFixed(1)} / 5` },
    { label: 'Most reviewed on G2', v: by((v) => v.g2.reviews), stat: `${by((v) => v.g2.reviews).g2.reviews.toLocaleString('en-US')} reviews` },
    { label: 'Most used by enterprises', v: ent, stat: `${mixOf(ent)?.large ?? 0}% of reviewers at 1,000+ employees` },
    { label: 'Most used by small businesses', v: sm, stat: `${mixOf(sm)?.small ?? 0}% of reviewers at 50 or fewer employees` },
  ];
}

// Pairs worth comparing head to head: the top three, plus the most-reviewed product against the leader.
export function headToHead(c: SoftwareCategory) {
  const r = rankG2(c).ranked;
  const pairs: [Vendor, Vendor][] = [];
  const add = (a?: Vendor, b?: Vendor) => { if (a && b && a !== b && !pairs.some(([x, y]) => (x === a && y === b) || (x === b && y === a))) pairs.push([a, b]); };
  add(r[0], r[1]); add(r[0], r[2]); add(r[1], r[2]);
  const most = [...r].sort((a, b) => b.g2.reviews - a.g2.reviews)[0];
  add(r[0], most);
  return pairs.slice(0, 4);
}

// Vendors listed in more than one ranking (by name).
export function crossCategory(min = 3) {
  const m = new Map<string, { name: string; cats: string[] }>();
  for (const c of SOFTWARE.categories) for (const v of c.vendors) {
    const e = m.get(v.name) ?? { name: v.name, cats: [] };
    e.cats.push(c.slug); m.set(v.name, e);
  }
  return [...m.values()].filter((e) => e.cats.length >= min).sort((a, b) => b.cats.length - a.cats.length || a.name.localeCompare(b.name));
}
