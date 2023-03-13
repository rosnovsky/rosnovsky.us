import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import { astroImageTools } from 'astro-imagetools';
import { VitePWA } from 'vite-plugin-pwa';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [VitePWA()],
  },
  site: 'https://rosnovsky.us',
  integrations: [mdx(), sitemap(), prefetch(), astroImageTools, tailwind()],
});
