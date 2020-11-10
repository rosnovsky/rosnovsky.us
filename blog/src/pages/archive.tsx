import React from 'react'
import { graphql } from 'gatsby'
import { mapEdgesToNodes } from '../utils/helpers'
import BlogPostPreviewGrid from '../components/PostGrid/blogpostcardsgrid'
import Container from '../components/Containers/container'
import GraphQLErrorList from '../components/Errors/graphqlerrorlist'
import SEO from '../components/SEO/seo'
import Layout from '../containers/layout'
import Header from '../components/Header/header'

export const query = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
          }
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            title
            description
            slug {
              current
            }
          }
        }
      }
    }
  }
`

const ArchivePage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts)

  return (
    <Layout>
      <SEO lang="en" meta={[]} keywords={[]} image={null} title="Archive" />
      <Header />
      <Container>
        <div className="mx-auto">
          <h1 className="mt-10 font-semibold text-center text-4xl">Archive</h1>
          {postNodes && postNodes.length > 0 && (
            <BlogPostPreviewGrid nodes={postNodes} />
          )}
        </div>
      </Container>
    </Layout>
  )
}

export default ArchivePage
