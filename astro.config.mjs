import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import remarkToc from 'remark-toc';
import remarkCollapse from 'remark-collapse';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config';
import node from '@astrojs/node';
import mdx from "@astrojs/mdx";

import mastodon, { remarkMastodonEmbed } from "astro-mastodon";

// https://astro.build/config
export default defineConfig({
  server: {
    port: 4321,
    host: true
  },
  site: SITE.website,
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), sitemap(), mdx(), mastodon()],
  markdown: {
    remarkPlugins: [remarkMastodonEmbed, remarkToc, [remarkCollapse, {
      test: 'Table of contents'
    }]],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
      langs: ['javascript', 'typescript', 'bash', 'json', 'yaml', 'markdown']
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['@resvg/resvg-js']
    },
    ssr: {
      noExternal: ['astro-mastodon']
    }
  },
  scopedStyleStrategy: 'where',
  output: 'hybrid',
  adapter: node({
    mode: 'standalone'
  })
});
