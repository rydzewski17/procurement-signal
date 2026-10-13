export interface Tracker {
  slug: string;
  title: string;
  description: string;
  intro: string;
  updated: string;
  columns: string[];
  rows: { cells: string[]; source?: string }[];
}

const files = import.meta.glob<{ default: Omit<Tracker, 'slug'> }>('./trackers/*.json', { eager: true });

export const trackers: Tracker[] = Object.entries(files)
  .map(([path, mod]) => ({ slug: path.split('/').pop()!.replace('.json', ''), ...mod.default }))
  .sort((a, b) => a.title.localeCompare(b.title));
