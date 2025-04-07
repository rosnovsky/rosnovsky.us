import alpinejs from '@astrojs/alpinejs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { remarkMastodonEmbed } from 'astro-mastodon';
import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import { SITE } from './src/config';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

import markdoc from '@astrojs/markdoc';

function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}

// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: 'never',
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [remarkReadingTime, remarkMastodonEmbed],
  },
  prefetch: {
    defaultStrategy: 'viewport',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    alpinejs(),
    sitemap(),
    icon(),
    mdx(),
    react(),
    markdoc(),
  ],
  scopedStyleStrategy: 'where',
  adapter: netlify(),
  output: 'server',
  server: {
    port: 4321,
    host: true,
  },
  optimizeDeps: {
    include: ['react/jsx-runtime'],
  },
});
