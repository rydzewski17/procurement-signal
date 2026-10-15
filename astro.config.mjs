import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change site to your custom domain once you add one (also in public/robots.txt).
export default defineConfig({
  site: 'https://procurement-signal.rydzewski-jason.workers.dev',
  integrations: [sitemap()],
  redirects: {
    '/software/source-to-pay': '/software/procure-to-pay/',
    '/simulator': '/software/',
    '/tariffs': '/categories/',
    '/markets': '/outlook/',
  },
});
