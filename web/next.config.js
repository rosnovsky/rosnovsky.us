// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html',
};

module.exports = {
  rewrites: () => [STUDIO_REWRITE],
};

module.exports = withBundleAnalyzer({
  pwa: {
    dest: 'public',
  },
  swcMinify: true,
  future: {
    strictPostcssConfiguration: true,
    concurrentFeatures: false,
  },
  reactStrictMode: true,
  experimental: {
    turboMode: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: [
      'cdn.sanity.io',
      'i.scdn.co', // Spotify Album Art
      'pbs.twimg.com', // Twitter Profile Picture
      's.gravatar.com', // Gravatar
      'media-exp1.licdn.com', // Linkedin Profile Picture
      'image.mux.com',
      'images.unsplash.com',
      'avatars.githubusercontent.com',
      'lh3.googleusercontent.com',
      'current-music.vercel.app',
      'is4-ssl.mzstatic.com',
      'is5-ssl.mzstatic.com',
      'mzstatic.com',
      'is3-ssl.mzstatic.com',
      'is2-ssl.mzstatic.com',
      'is1-ssl.mzstatic.com',
      'static.cascadiajs.com',
      'loremflickr.com',
      'res.cloudinary.com',
    ],
    disableStaticImages: false,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      require('./scripts/generate-sitemap.ts');
      require('./scripts/generate-rss.ts');
    }

    // Replace React with Preact only in client production build
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    return config;
  },
});

// https://securityheaders.com
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline'  *.plausible.io  *.youtube.com *.twitter.com *.github.com cdn.usefathom.com;
  child-src *.youtube.com *.google.com *.twitter.com localhost rosnovsky.us *.vercel.app;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src * blob: data:;
  worker-src *.vercel.app localhost:3000 rosnovsky.us;
  media-src  *;
  connect-src *;
  font-src *;
`;

const securityHeaders = [
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP
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