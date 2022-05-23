/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */

const withPWA = require('next-pwa');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const withTM = require('next-transpile-modules')([
  '@here/maps-api-for-javascript',
]);

module.exports = withTM(
  withBundleAnalyzer(
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
          's.gravatar.com',
          'avatars.githubusercontent.com',
          'lh3.googleusercontent.com',
        ],
      },
      swcMinify: true,

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
  )
);

// const ContentSecurityPolicy = `
//   default-src 'self';
//   script-src 'self' 'unsafe-eval' 'unsafe-inline'  *.youtube.com *.twitter.com *.github.com localhost:3000 llama.rosnovsky.us usefathom.com js.api.here.com *.hereapi.com;
//   child-src *.youtube.com *.google.com *.twitter.com localhost:3000 rosnovsky.us *.vercel.app llama.rosnovsky.us;
//   style-src 'self' 'unsafe-inline' *.googleapis.com js.api.here.com;
//   img-src * blob: data:;
//   worker-src *.vercel.app localhost:3000 rosnovsky.us llama.rosnovsky.us;
//   media-src  *;
//   connect-src 'self' blob: *.hereapi.com ws://localhost:3000 localhost:3000 rosnovsky.us llama.rosnovsky.us js.api.here.com;
//   font-src *;
// `;

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
