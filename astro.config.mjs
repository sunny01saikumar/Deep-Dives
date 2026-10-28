// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The site is served from https://sunny01saikumar.github.io/deep-dives/ on GitHub Pages.
// If you move to a custom domain, set `site` to that domain and change `base` to '/'.
export default defineConfig({
  site: 'https://sunny01saikumar.github.io',
  base: '/deep-dives',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-dimmed' },
    },
  },
});
