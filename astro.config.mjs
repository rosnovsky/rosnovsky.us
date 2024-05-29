import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import alpinejs from '@astrojs/alpinejs';
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config';
import { remarkMastodonEmbed } from 'astro-mastodon';
import icon from "astro-icon";
import node from '@astrojs/node';
import db from "@astrojs/db";
import preact from "@astrojs/preact";
import webVitals from "@astrojs/web-vitals";
function remarkReadingTime() {
  return function (tree, {
    data
  }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}


// https://astro.build/config
export default defineConfig({
  site: SITE.website,
  trailingSlash: 'never',
  markdown: {
    syntaxHighlight: 'prism',
    // shikiConfig: {
    //   theme: 'github-dark',
    //   wrap: true,
    //   langs: ['javascript', 'typescript', 'bash', 'json', 'yaml', 'markdown', 'mdx']
    // },
    remarkPlugins: [remarkReadingTime, remarkMastodonEmbed]
  },
  prefetch: {
    defaultStrategy: 'viewport'
  },
  integrations: [tailwind({
    applyBaseStyles: false
  }), alpinejs(), sitemap(), icon(), db(), preact(), webVitals()],
  scopedStyleStrategy: 'where',
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  }),
  server: {
    port: 4321,
    host: true
  }
});