import alpinejs from '@astrojs/alpinejs';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import AstroPWA from '@vite-pwa/astro';
import icon from 'astro-icon';
import { remarkMastodonEmbed } from 'astro-mastodon';
import { defineConfig } from 'astro/config';
import { toString } from 'mdast-util-to-string';
import getReadingTime from 'reading-time';
import { SITE } from './src/config';

import react from '@astrojs/react';

import netlify from '@astrojs/netlify';

// import markdoc from '@astrojs/markdoc';

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
  vite: {
    logLevel: 'info',
    define: {
      __DATE__: `'${new Date().toISOString()}'`,
    },
    server: {
      fs: {
        // Allow serving files from hoisted root node_modules
        allow: ['../..']
      }
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime, remarkMastodonEmbed],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
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
    AstroPWA({
      mode: 'production',
      base: '/',
      scope: '/',
      includeAssets: ['favicon.png,og.png,apple-touch-icon.png,android-chrome-192x192.png,favicon-32x32.png'],
      registerType: 'autoUpdate',
      manifest: {
        name: 'Rosnovsky Park™',
        short_name: 'RPark',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png',
          },
          {
            src: 'favicon-16x16.png',
            sizes: '16x16',
            type: 'image/png',
          }
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 3000000,
        navigateFallback: '/',
        globPatterns: ['**/*.{css,js,html,svg,png,ico,txt}'],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\//],
      },
      experimental: {
        directoryAndTrailingSlashHandler: true,
      }
    }),
    // markdoc(),
  ],
  scopedStyleStrategy: 'where',
  adapter: netlify(),
  output: 'server',
  server: {
    port: 4321,
    host: true,
  },
  optimizeDeps: {
    include: ['react/jsx-runtime']
  }
});
