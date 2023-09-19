import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import { astroImageTools } from "astro-imagetools";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.my-site.dev',
  buildOptions: {
    site: {
      title: 'Astro',
      description: 'The best way to build web apps in pure JavaScript.',
      mastodon: '@rosnovsky@lounge.town',
      url: {
        pathname: 'https://astro.build'
      }
    }
  },
  integrations: [tailwind(), mdx(), astroImageTools]
});
