/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(
  withPWA({
    pwa: {
      dest: 'public',
      register: true,
      runtimeCaching,
      sw: '/sw.js',
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

const securityHeaders = [
  // // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
  // {
  //   key: 'Content-Security-Policy',
  //   value: ContentSecurityPolicy.replace(/\n/g, ''),
  // },
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
