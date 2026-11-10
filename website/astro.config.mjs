// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://shalev.eu.org',
  // Instant navigation: prefetch links as they enter the viewport.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },
  integrations: [sitemap()],
  build: {
    inlineStylesheets: 'auto',
  },
});
