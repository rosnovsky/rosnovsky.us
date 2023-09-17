import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  buildOptions: {
    site: {
      title: 'Astro',
      description: 'The best way to build web apps in pure JavaScript.',
      twitter: 'astrodotbuild',
      url: {
        pathname: 'https://astro.build'
      }
    }
  },
  integrations: [tailwind()]
});