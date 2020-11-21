import React from 'react'
import { graphql } from 'gatsby'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../utils/helpers'
import BlogPostPreviewList from '../components/PostGrid/blogpostcardslist'
import Container from '../components/Containers/container'
import GraphQLErrorList from '../components/Errors/graphqlerrorlist'
import SEO from '../components/SEO/seo'
import Layout from '../containers/layout'
import Header from '../components/Header/Header'

export const query = graphql`
  fragment SanityImage on SanityMainImage {
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
    }
  }

  query IndexPageQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      tags {
        label
        value
      }
    }
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      limit: 4
    ) {
      edges {
        node {
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
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            title
            slug {
              current
            }
          }
          featured
        }
      }
    }
    featuredPosts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: {
        slug: { current: { ne: null } }
        publishedAt: { ne: null }
        featured: { eq: true }
      }
    ) {
      edges {
        node {
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
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            title
            slug {
              current
            }
          }
          featured
        }
      }
    }
  }
`

const IndexPage = props => {
  const { data, errors } = props

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    )
  }

  const site = (data || {}).site
  const postNodes = (data || {}).posts
    ? mapEdgesToNodes(data.posts)
        .filter(filterOutDocsWithoutSlugs)
        .filter(filterOutDocsPublishedInTheFuture)
    : []
  const featuredPost = (data || {}).featuredPosts.edges[0].node

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server'
    )
  }

  const tagsStrings = []
  const tagValues = site.tags.forEach(tag => tagsStrings.push(tag.value))

  return (
    <Layout className="container w-full">
      <SEO
        lang="en"
        description={site.description}
        meta={[]}
        tags={tagsStrings}
        image={null}
        title={site.title}
      />
      <Container>
        <Header page={null} />
        {postNodes && (
          <BlogPostPreviewList
            title="Recent Updates"
            nodes={postNodes}
            featured={featuredPost}
            browseMoreHref="/blog/"
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
