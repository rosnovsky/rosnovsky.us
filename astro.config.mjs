import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import { astroImageTools } from 'astro-imagetools';
import image from '@astrojs/image';

import netlify from '@astrojs/netlify/functions';

// https://astro.build/config
export default defineConfig({
  site: 'https://rosnovsky.us',
  output: 'server',
  integrations: [
    image(),
    mdx(),
    sitemap(),
    prefetch(),
    astroImageTools,
    tailwind(),
  ],
  adapter: netlify({
    builders: true,
  }),
});
