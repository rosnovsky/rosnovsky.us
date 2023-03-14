import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import { astroImageTools } from 'astro-imagetools';
import { replaceImgWithComponent } from './src/utils/replaceImgWithComponent';
import image from '@astrojs/image';

// https://astro.build/config
export default defineConfig({
  markdown: {
    remarkPlugins: [replaceImgWithComponent],
  },
  site: 'https://rosnovsky.us',
  integrations: [
    image(),
    mdx(),
    sitemap(),
    prefetch(),
    astroImageTools,
    tailwind(),
  ],
});
