module.exports = {
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
}
