import raw from './cost-monitor.json';

export type Status = 'rising-fast' | 'rising' | 'stable' | 'easing';
export const STATUS: Record<Status, { label: string; icon: string; posture: string }> = {
  'rising-fast': { label: 'Rising fast', icon: '▲▲', posture: 'Lock in pricing where you can: extend fixed-price terms, consider forward buys, and expect suppliers to push increases.' },
  'rising': { label: 'Rising', icon: '▲', posture: 'Add index-linked escalation clauses rather than accepting flat increases, and shorten quote validity windows.' },
  'stable': { label: 'Stable', icon: '●', posture: 'Normal sourcing cadence. A good window to run competitive events without price noise.' },
  'easing': { label: 'Easing', icon: '▼', posture: 'Avoid long fixed-price commitments and use the decline to renegotiate or re-bid.' },
};

const pct = (a: number, b: number) => ((a / b) - 1) * 100;

export interface Category {
  id: string; name: string; series: string; group: string; tariff: string;
  history: { date: string; value: number }[];
  latest: number; m1: number; m3ann: number; y1: number; status: Status;
  peak12: number; fromPeak: number;
}

export function classify(m1: number, m3ann: number, y1: number): Status {
  if (m3ann >= 15 || (m3ann >= 8 && y1 >= 15) || (m1 >= 5 && y1 >= 15)) return 'rising-fast';
  if (m3ann >= 4 || m1 >= 3) return 'rising';
  if (m3ann <= -4 && m1 <= 1) return 'easing';
  return 'stable';
}

export const categories: Category[] = raw.categories.map((c) => {
  const h = c.history, n = h.length, v = (i: number) => h[n - 1 - i].value;
  const m3ann = (Math.pow(v(0) / v(3), 4) - 1) * 100;
  const y1 = pct(v(0), v(12));
  const peak12 = Math.max(...h.slice(-12).map((x) => x.value));
  const m1 = pct(v(0), v(1));
  return { ...c, latest: v(0), m1, m3ann, y1, status: classify(m1, m3ann, y1), peak12, fromPeak: pct(v(0), peak12) };
});

export const meta = { updated: raw.updated, dataThrough: raw.dataThrough, source: raw.source };
export const monthLabel = (d: string) => new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', { month: 'short', year: 'numeric', timeZone: 'UTC' });
export const fmtPct = (x: number) => `${x > 0 ? '+' : x < 0 ? '−' : ''}${Math.abs(x).toFixed(1)}%`;
export const groups = [...new Set(categories.map((c) => c.group))];
