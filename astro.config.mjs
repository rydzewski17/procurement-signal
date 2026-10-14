import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change site to your custom domain once you add one (also in public/robots.txt).
export default defineConfig({
  site: 'https://procurement-signal.rydzewski-jason.workers.dev',
  // Draft sections (Top Software rankings, Market Outlook) stay out of the sitemap
  // until they are published. Remove a prefix here when its section goes live.
  integrations: [sitemap({ filter: (page) => !['/software/', '/outlook/'].some((p) => new URL(page).pathname.startsWith(p)) })],
});
