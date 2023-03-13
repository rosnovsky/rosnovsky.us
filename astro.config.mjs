import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import netlify from '@astrojs/netlify/functions';
import webmanifest from 'astro-webmanifest';
import markdoc from '@astrojs/markdoc';
import image from '@astrojs/image';
import { astroImageTools } from 'astro-imagetools';

// https://astro.build/config
export default defineConfig({
  site: 'https://rosnovsky.us',
  integrations: [
    mdx(),
    sitemap(),
    prefetch(),
    webmanifest({
      /**
       * required
       **/
      name: 'Your App name',
      /**
       * optional
       **/
      icon: 'src/images/your-icon.svg',
      // source for favicon & icons

      short_name: 'App',
      description: 'Here is your app description',
      start_url: '/',
      theme_color: '#3367D6',
      background_color: '#3367D6',
      display: 'standalone',
    }),
    // markdoc(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
    }),
    astroImageTools,
    tailwind(),
  ],
});
