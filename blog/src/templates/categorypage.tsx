import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/Containers/container'
import GraphQLErrorList from '../components/Errors/graphqlerrorlist'
import SEO from '../components/SEO/seo'
import Layout from '../containers/layout'
import BlogPostPreviewGrid from '../components/PostGrid/blogpostcardslist'
import Header from '../components/Header/Header'

// Add “posts” to the GraphQL query
export const query = graphql`
  query CategoryTemplateQuery($id: String!) {
    category: sanityCategory(id: { eq: $id }) {
      title
      description
      slug {
        current
      }
      posts {
        id
        publishedAt
        mainImage {
          ...SanityImage
          asset {
            fluid(maxWidth: 800) {
              ...GatsbySanityImageFluid
            }
          }
          alt
        }
        categories {
          title
          description
          slug {
            current
          }
        }
        title
        _rawExcerpt
        slug {
          current
        }
      }
    }
  }
`
const CategoryPostTemplate = props => {
  const { data = {}, errors } = props
  const { title, description = '', posts } = data.category || {}

  const visiblePosts =
    // process.env.NODE_ENV === 'production'
    // ? posts.filter(post => !post.publishedAt === null)
    posts

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO
        lang="en"
        tags={[]}
        description={''}
        meta={[]}
        image={null}
        title={title}
      />
      <Container>
        <Header page={null} />
        <h1>{title}</h1>
        <p>{description}</p>
        {posts && posts.length > 0 && (
          <BlogPostPreviewGrid nodes={visiblePosts} />
        )}
      </Container>
    </Layout>
  )
}

export default CategoryPostTemplate
