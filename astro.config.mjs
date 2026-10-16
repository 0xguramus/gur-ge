import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import rehypeSections from './src/lib/rehype-sections.mjs';
export default defineConfig({
  site: 'https://genius.ge',
  integrations: [sitemap()],
  markdown: { rehypePlugins: [rehypeSections] },
});
