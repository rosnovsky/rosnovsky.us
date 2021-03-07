const withPWA = require('next-pwa')

module.exports = withPWA({
  pwa: {
    disable: process.env.NODE_ENV === 'production',
    register: true,
    scope: '/',
    sw: 'sw.js',
  },
})

module.exports = {
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
}
