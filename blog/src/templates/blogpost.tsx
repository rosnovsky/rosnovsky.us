import React from 'react'
import { graphql } from 'gatsby'
import Container from '../components/Containers/container'
import GraphQLErrorList from '../components/Errors/graphqlerrorlist'
import BlogPost from '../components/Post/blogpost'
import SEO from '../components/SEO/seo'
import Layout from '../containers/layout'
import { toPlainText } from '../utils/helpers'

export const query = graphql`
  query BlogPostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
        slug {
          current
        }
      }
      mainImage {
        ...SanityImage
        alt
        asset {
          fluid(maxWidth: 600) {
            ...GatsbySanityImageFluid
          }
        }
      }
      title
      slug {
        current
      }
      featured
      _rawExcerpt(resolveReferences: { maxDepth: 5 })
      _rawBody(resolveReferences: { maxDepth: 5 })
      authors {
        _key
        author {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
              fluid(maxWidth: 700) {
                ...GatsbySanityImageFluid
              }
            }
          }
          name
        }
      }
    }
  }
`

const BlogPostTemplate = props => {
  const { data, errors } = props
  const post: Post = data && data.post

  return (
    <Layout>
      {errors && (
        <SEO lang="en" meta={[]} image={null} title="GraphQL Errors" />
      )}
      {post && (
        <SEO
          title={post.title || 'Untitled'}
          description={toPlainText(post._rawExcerpt)}
          image={post.mainImage}
        />
      )}

      {errors && (
        <Container>
          <GraphQLErrorList errors={errors} />
        </Container>
      )}

      {post && <BlogPost {...post} />}
    </Layout>
  )
}

export default BlogPostTemplate
