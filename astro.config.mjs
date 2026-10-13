import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Change SITE to your custom domain once you add one.
export default defineConfig({
  site: 'https://procurement-signal.pages.dev',
  integrations: [sitemap()],
});
