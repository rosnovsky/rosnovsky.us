import React from 'react'
import {
  mapEdgesToNodes,
  filterOutDocsWithoutSlugs,
  filterOutDocsPublishedInTheFuture
} from '../utils/helpers'
import BlogPostPreviewList from '../components/PostGrid/blogpostcardslist'
import Container from '../components/Containers/container'
import GraphQLErrorList from '../components/Errors/graphqlerrorlist'
import SEO from '../components/SEO/seo'
import Layout from './layout'

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

  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server'
    )
  }

  return (
    <Layout>
      <SEO
        lang="en"
        image={[]}
        title={site.title}
        description={site.description}
        keywords={site.keywords}
      />
      <Container>
        <h1 hidden>Welcome to {site.title}</h1>
        {postNodes && (
          <BlogPostPreviewList
            title="Latest blog posts"
            nodes={postNodes}
            browseMoreHref="/archive/"
          />
        )}
      </Container>
    </Layout>
  )
}

export default IndexPage
