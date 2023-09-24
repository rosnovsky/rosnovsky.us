import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { astroImageTools } from 'astro-imagetools';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://rosnovsky.us',
  buildOptions: {
    site: {
      title: 'Rosnovsky Park',
      description: 'Welcome to the Rosnovsky Park!',
      mastodon: '@rosnovsky@lounge.town',
      url: {
        pathname: 'https://rosnovsky.us',
      },
    },
  },
  integrations: [tailwind(), mdx(), astroImageTools],
});
