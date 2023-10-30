import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { astroImageTools } from 'astro-imagetools';
import mdx from '@astrojs/mdx';
import node from '@astrojs/node';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  root: './',
  srcDir: './src',
  publicDir: './public',
  site: 'https://rosnovsky.us',
  buildOptions: {
    site: {
      title: 'Rosnovsky Park™',
      description: 'Welcome to the Rosnovsky Park!',
      mastodon: '@rosnovsky@lounge.town',
      url: {
        pathname: 'https://rosnovsky.us',
      },
    },
  },
  integrations: [tailwind(), mdx(), astroImageTools, react()],
  output: 'hybrid',
  server: {
    port: 4321,
    host: true,
  },
  adapter: node({
    mode: 'standalone',
  }),
});
