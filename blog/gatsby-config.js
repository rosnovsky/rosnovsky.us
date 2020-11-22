// Load variables from `.env` as soon as possible
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const resolveConfig = require('tailwindcss/resolveConfig')
const tailwindConfig = require('./tailwind.config.js')

const fullConfig = resolveConfig(tailwindConfig)

const clientConfig = require('./client-config')

const isProd = process.env.NODE_ENV === 'production'

const myQuery = `
  {
    allSanityPost {
      edges {
        node {
          title
          _rawExcerpt
          objectID: id
          publishedAt
          mainImage {
            asset {
              url
            }
            alt
          }
          slug {
            current
          }
          categories {
            slug {
              current
            }
            title
          }
        }
      }
    }
  }
`

const queries = [
  {
    query: myQuery,
    transformer: ({ data }) => {
      const posts = data.allSanityPost.edges.map(({ node }) => ({
        objectID: node.objectID,
        title: node.title,
        excerpt: node._rawExcerpt[0].children[0].text,
        publishedAt: node.publishedAt,
        slug: node.slug.current,
        coverImage: node.mainImage.asset.url,
        categories: node.categories.map(category => category.title)
      }))
      return posts
    }, // optional
    indexName: 'blog_posts', // overrides main index name, optional
    settings: {
      // optional, any index settings
    },
    matchFields: ['slug', 'publishedAt'] // Array<String> overrides main match fields, optional
  }
]

module.exports = {
  siteMetadata: {
    siteUrl: `https://next.rosnovsky.us`
  },
  polyfill: false,
  plugins: [
    `gatsby-plugin-preact`,
    `gatsby-plugin-preload-link-crossorigin`,
    'gatsby-plugin-postcss',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-webpack-bundle-analyser-v2',
    'gatsby-plugin-sitemap',
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: 'https://next.rosnovsky.us',
        sitemap: 'https://next.rosnovsky.us/sitemap.xml',
        policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        ...clientConfig.sanity,
        token: process.env.SANITY_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
        useCdn: true,
        imageOptions: { maxWidth: '800' }
      }
    },
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`tailwindcss`)(tailwindConfig),
          require(`autoprefixer`),
          ...(process.env.NODE_ENV === `production`
            ? [
                require(`cssnano`)({
                  preset: `default`
                })
              ]
            : [])
        ]
      }
    },
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        tailwind: true,
        purgeOnly: [`src/styles/stles.css`]
      }
    },
    {
      // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
      resolve: `gatsby-plugin-algolia`,
      options: {
        appId: process.env.ALGOLIA_APP_ID,
        // Use Admin API key without GATSBY_ prefix, so that the key isn't exposed in the application
        // Tip: use Search API key with GATSBY_ prefix to access the service from within components
        apiKey: process.env.ALGOLIA_API_KEY,
        indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
        queries,
        chunkSize: 10000, // default: 1000
        settings: {
          // optional, any index settings
        },
        enablePartialUpdates: false, // default: false
        matchFields: ['slug', 'publishedAt'], // Array<String> default: ['modified']
        concurrentQueries: true, // default: true
        skipIndexing: false // default: false, useful for e.g. preview deploys or local development
      }
    }
  ]
}
