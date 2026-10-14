// One feed of Procurement Signal stories and tagged trade-press headlines, so
// every page can fill its layout. Our stories always come first.
import wire from './wire.json';
import { categorize, CATEGORIES } from './categories.mjs';

export interface FeedItem {
  title: string; href: string; ext: boolean; source: string; t: number;
  dek?: string; post?: any; cats: string[];
}

export const catsOf = (p: any): string[] => categorize(`${p.data.title} ${p.data.dek}`);

export function ourItems(posts: any[]): FeedItem[] {
  return posts.map((p) => ({ title: p.data.title, href: `/articles/${p.id}/`, ext: false, source: 'Procurement Signal', t: p.data.date.valueOf(), dek: p.data.dek, post: p, cats: catsOf(p) }));
}

// Headlines that aren't useful to buyers: accidents and crime reports, and
// routine Federal Register paperwork notices.
const NOISE = /\b(killed|dies|died|fatal|rollover|crash(es|ed)?|shooting|arrested|sentenced|pleads guilty)\b|^Foreign-Trade Zone|Notice of Institution|Agency Information Collection|Sunshine Act|Notice of Receipt of Complaint|Request for Comments? on Information Collection/i;
export const isNoise = (title: string) => NOISE.test(title);

export function wireItems(): FeedItem[] {
  return (wire.items as any[]).filter((i) => !isNoise(i.title)).map((i) => ({ title: i.title, href: i.url, ext: true, source: String(i.source).split(' · ')[0], t: new Date(i.date).valueOf(), cats: i.categories ?? [] }));
}

// Items in any of the given categories: ours newest first, then headlines newest first.
export function feedFor(posts: any[], slugs: string[], exclude = new Set<string>()) {
  const hit = (x: FeedItem) => x.cats.some((c) => slugs.includes(c)) && !exclude.has(x.href);
  return [...ourItems(posts).filter(hit), ...wireItems().filter(hit).sort((a, b) => b.t - a.t)];
}

export const shortDate = (t: number) => new Date(t).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'America/New_York' });
export const clip = (s: string, n = 110) => (s.length > n ? s.slice(0, s.lastIndexOf(' ', n)) + '…' : s);
export const catName = (slug: string) => CATEGORIES.find((c) => c.slug === slug)?.name ?? 'Industry news';
