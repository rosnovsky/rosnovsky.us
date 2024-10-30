import alpinejs from '@astrojs/alpinejs';
import db from "@astrojs/db";
import mdx from '@astrojs/mdx';
import preact from "@astrojs/preact";
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import vercel from '@astrojs/vercel/serverless';
import webVitals from "@astrojs/web-vitals";
import icon from "astro-icon";
import { remarkMastodonEmbed } from 'astro-mastodon';
import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import { SITE } from './src/config';

function remarkReadingTime() {
  return function (tree, {
    data
  }) {
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
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imagesConfig: {
      sizes: [320, 640, 1280],
      domains: ["*"]
    },
    imageService: true,
    isr: false,
    edgeMiddleware: true
  }),
  output: 'server',
  server: {
    port: 4321,
    host: true
  }
});
