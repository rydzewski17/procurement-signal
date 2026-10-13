export const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// Tags ranked by how often they appear in recent stories (last 30 days of coverage).
export function trending(posts: any[], limit = 10) {
  const newest = posts[0]?.data.date.valueOf() ?? 0;
  const counts = new Map<string, { name: string; n: number }>();
  for (const p of posts) {
    if (newest - p.data.date.valueOf() > 30 * 864e5) continue;
    for (const t of p.data.tags) {
      const k = slugify(t);
      counts.set(k, { name: t, n: (counts.get(k)?.n ?? 0) + 1 + p.data.signal / 10 });
    }
  }
  return [...counts].sort((a, b) => b[1].n - a[1].n).slice(0, limit).map(([slug, v]) => ({ slug, name: v.name }));
}
