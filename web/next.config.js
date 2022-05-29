/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: 'public',
      register: true,
      skipWaiting: true,
      disable: process.env.NODE_ENV === 'development',
    },
    images: {
      domains: [
        'cdn.sanity.io',
        'n3o7a5dl.apicdn.sanity.io',
        's.gravatar.com',
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com',
      ],
    },
    swcMinify: true,

    async rewrites() {
      return [
        {
          source: '/blog/:year/:month/:day/:slug',
          destination: '/blog/:slug',
          // Since the :first parameter is used in the destination the :second parameter
          // will not automatically be added in the query although we can manually add it
          // as shown above
        },
      ];
    },

    reactStrictMode: true,
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: securityHeaders,
        },
      ];
    },
    webpack: (config, { isServer }) => {
      // Fixes npm packages that depend on `fs` module
      if (!isServer) {
        config.resolve.fallback = {
          fs: false,
        };
      }

      return config;
    },
  })
);

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'  *.youtube.com *.twitter.com *.github.com localhost:3000 llama.rosnovsky.us usefathom.com api.mapbox.com fonts.gstatic.com;
  child-src *.youtube.com *.google.com *.twitter.com localhost:3000 rosnovsky.us *.vercel.app llama.rosnovsky.us api.mapbox.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com api.mapbox.com fonts.gstatic.com;
  img-src * blob: data: api.mapbox.com n3o7a5dl.apicdn.sanity.io;
  worker-src blob: *.vercel.app localhost:3000 rosnovsky.us llama.rosnovsky.us;
  media-src  *;
  connect-src 'self' blob: rosnovsky.us llama.rosnovsky.us api.mapbox.com n3o7a5dl.apicdn.sanity.io fonts.gstatic.com *.algolianet.com *.algolia.net;
  font-src fonts.gstatic.com vitals.vercel-insights.com;
`;

const securityHeaders = [
  // // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy
  {
    key: 'Referrer-Policy',
    value: 'origin-when-cross-origin',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains; preload',
  },
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Feature-Policy
  // Opt-out of Google FLoC: https://amifloced.org/
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];
