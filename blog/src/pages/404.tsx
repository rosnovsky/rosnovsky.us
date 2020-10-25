import React from 'react'

import Layout from '../components/Layout/layout'
import SEO from '../components/SEO/seo'

const NotFoundPage = () => (
  <Layout>
    <SEO
      lang="en"
      meta={[]}
      keywords={[]}
      image={null}
      title="Error 404: Page Not Found"
    />
    <h1>NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
