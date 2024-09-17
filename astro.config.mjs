import alpinejs from '@astrojs/alpinejs';
import db from "@astrojs/db";
import node from '@astrojs/node';
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import webVitals from "@astrojs/web-vitals";
import icon from "astro-icon";
import { remarkMastodonEmbed } from 'astro-mastodon';
import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import { SITE } from './src/config';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
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
  }), alpinejs(), sitemap(), icon(), db(), preact(), webVitals(), mdx()],
  scopedStyleStrategy: 'where',
  output: 'hybrid',
  adapter: vercel(),
  server: {
    port: 4321,
    host: true
  }
});