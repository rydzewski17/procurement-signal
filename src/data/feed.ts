// Feeds of Procurement Signal stories for every list on the site. Pages only list
// our own reporting; trade-press headlines feed the newsroom, not the pages.
import wire from './wire.json';
import { categorize, CATEGORIES } from './categories.mjs';

export interface FeedItem {
  title: string; href: string; ext: boolean; source: string; t: number;
  dek?: string; post?: any; cats: string[]; why?: string; fact?: { value: string; label: string }; mins?: number;
}

// First sentence of the "Why it matters" section, for list summaries.
export const whyOf = (p: any): string => {
  const raw = p.body?.match(/## Why it matters\s+([\s\S]*?)(\n## |$)/)?.[1]?.trim().split('\n')[0] ?? '';
  const txt = raw.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_]/g, '');
  const m = txt.match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : txt).trim();
};
export const minsOf = (p: any) => Math.max(1, Math.round((p.body?.split(/\s+/).length ?? 0) / 230));

export const catsOf = (p: any): string[] => (p.data.categories?.length ? p.data.categories : categorize(`${p.data.title} ${p.data.dek}`));

export function ourItems(posts: any[]): FeedItem[] {
  return posts.map((p) => ({ title: p.data.title, href: `/articles/${p.id}/`, ext: false, source: 'Procurement Signal', t: p.data.date.valueOf(), dek: p.data.dek, post: p, cats: catsOf(p), why: whyOf(p), fact: p.data.keyfacts?.[0], mins: minsOf(p) }));
}

// Headlines that aren't useful to procurement teams: accidents and crime reports, and
// routine Federal Register paperwork notices.
const NOISE = /\b(killed|dies|died|fatal|rollover|crash(es|ed)?|shooting|arrested|sentenced|pleads guilty)\b|^Foreign-Trade Zone|Notice of Institution|Agency Information Collection|Sunshine Act|Notice of Receipt of Complaint|Request for Comments? on Information Collection/i;
export const isNoise = (title: string) => NOISE.test(title);

export function wireItems(): FeedItem[] {
  return (wire.items as any[]).filter((i) => !isNoise(i.title)).map((i) => ({ title: i.title, href: i.url, ext: true, source: String(i.source).split(' · ')[0], t: new Date(i.date).valueOf(), cats: i.categories ?? [] }));
}

// Our stories in any of the given categories, newest first. With fill, the rest of
// our stories follow so a layout never runs short.
export function feedFor(posts: any[], slugs: string[], exclude = new Set<string>(), fill = false) {
  const all = ourItems(posts).filter((x) => !exclude.has(x.href));
  const hit = all.filter((x) => x.cats.some((c) => slugs.includes(c)));
  return fill ? [...hit, ...all.filter((x) => !hit.includes(x))] : hit;
}

export const shortDate = (t: number) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
export const clip = (s: string, n = 110) => (s.length > n ? s.slice(0, s.lastIndexOf(' ', n)) + '…' : s);
export const catName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name ?? 'Industry news';
