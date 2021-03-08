const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'development',
    register: true,
    dest: 'public',
    runtimeCaching: [
      {
        urlPattern: 'https://rosnovsky.us/',
        handler: 'NetworkFirst',
        options: {
          cacheName: 'start-url',
          expiration: {
            maxEntries: 200,
          },
        },
      },
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  reactStrictMode: true,
  preventAssignment: true,
  images: {
    domains: [
      'images.unsplash.com',
      'cdn.sanity.io',
      'avatars0.githubusercontent.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/blog/:year/:month/:day/:slug',
        destination: '/blog/:slug', // Matched parameters can be used in the destination
      },
    ]
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(gif|png|webp|jpe?g)$/i,
      use: [
        {
          loader: 'lqip-modern-loader',
        },
      ],
    })
    return config
  },
})
