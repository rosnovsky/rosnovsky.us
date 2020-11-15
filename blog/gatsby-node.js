const { isFuture, format } = require('date-fns')

async function createBlogPostPages(graphql, actions, reporter) {
  const { createPage } = actions
  const result = await graphql(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
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
  `)

  if (result.errors) throw result.errors

  const postEdges = (result.data.allSanityPost || {}).edges || []

  postEdges
    .filter(edge => {
      if (
        isFuture(Date.parse(edge.node.publishedAt)) ||
        edge.node.publishedAt === null
      ) {
        reporter.warn(
          `Can't create pages with empty or future publish dates. Skipping ${edge.node.title} because the date is ${edge.node.publishedAt}`
        )
      }
      return (
        !isFuture(Date.parse(edge.node.publishedAt)) &&
        edge.node.publishedAt !== null
      )
    })
    .forEach((edge, index) => {
      const { id, slug = {}, publishedAt } = edge.node
      const dateSegment = format(Date.parse(publishedAt), 'yyyy/MM/dd')
      const path = `/blog/${dateSegment}/${slug.current}/`

      createPage({
        path,
        component: require.resolve('./src/templates/blogpost.tsx'),
        context: { id }
      })
    })
}

async function createCategoryPages(graphql, actions, reporter) {
  // Get Gatsby‘s method for creating new pages
  const { createPage } = actions
  // Query Gatsby‘s GraphAPI for all the categories that come from Sanity
  // You can query this API on http://localhost:8000/___graphql
  const result = await graphql(`
    {
      allSanityCategory {
        edges {
          node {
            id
            title
            description
            slug {
              current
            }
          }
        }
      }
    }
  `)

  // If there are any errors in the query, cancel the build and tell us
  if (result.errors) throw result.errors

  // Let‘s gracefully handle if allSanityCatgogy is null
  const categoryNodes = (result.data.allSanityCategory || {}).edges || []

  categoryNodes
    // Loop through the category nodes, but don't return anything
    .forEach(node => {
      // Desctructure the id and slug fields for each category
      const { id, slug, title } = node.node
      // If there isn't a slug, we want to do nothing
      if (!id || !slug.current) {
        reporter.warn(
          `Category ${title} has no id or slug. Make sure you've added 'slug' to category schema in Sanity.`
        )
      }

      // Make the URL with the current slug
      const path = `/category/${slug.current}`

      // Create the page using the URL path and the template file, and pass down the id
      // that we can use to query for the right category in the template file
      createPage({
        path,
        component: require.resolve('./src/templates/categorypage.tsx'),
        context: { id }
      })
    })
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SanityCategory: {
      posts: {
        type: ['SanityPost'],
        resolve(source, args, context, info) {
          return context.nodeModel.runQuery({
            type: 'SanityPost',
            query: {
              filter: {
                categories: {
                  elemMatch: {
                    _id: {
                      eq: source._id
                    }
                  }
                }
              }
            }
          })
        }
      }
    }
  }
  createResolvers(resolvers)
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (['build-html', 'develop-html'].includes(stage)) {
    /*
     * During the build step, `auth0-spa-js` will break because it relies on
     * browser-specific APIs. Fortunately, we don’t need it during the build.
     * Using Webpack’s null loader, we’re able to effectively ignore `auth0-spa-js`
     * during the build. (See `src/utils/auth.js` to see how we prevent this
     * from breaking the app.)
     */
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /auth0-spa-js/,
            use: loaders.null()
          }
        ]
      }
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createBlogPostPages(graphql, actions, reporter)
  await createCategoryPages(graphql, actions, reporter)
}
