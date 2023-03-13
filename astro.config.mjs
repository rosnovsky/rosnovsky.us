import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import { astroImageTools } from 'astro-imagetools';
import { VitePWA } from 'vite-plugin-pwa';
import images from './src/utils/imagesRemark';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          start_url: '/',
          background_color: '#ffffff',
          name: 'Rosnovsky Park',
          short_name: 'RPark',
          description: 'My Awesome App description',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        },
      }),
    ],
  },
  markdown: {
    remarkPlugins: [images],
  },
  site: 'https://rosnovsky.us',
  integrations: [mdx(), sitemap(), prefetch(), astroImageTools, tailwind()],
});
