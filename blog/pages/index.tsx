import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { request } from 'graphql-request'
// import useSWR from 'swr'

const fetcher = async (query: any) => {
  const result = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    query
  ).then((response) => {
    return response
  })
  return result
}

const Index = ({ posts }: any) => {
  const featuredPost = posts.filter((post: any) => post.featured === true)
  const notFeaturedPosts = posts.filter((post: any) => post.featured !== true)
  // && post.slug.current === featuredPost[0].slug.current

  const randomFeaturedPost = featuredPost && featuredPost[0]
  return (
    <>
      <Layout>
        <Head>
          <title>Rosnovsky Park</title>
          <link
            rel="preload"
            href="https://api.covidtracking.com/v1/us/current.json"
            as="fetch"
            crossOrigin="anonymous"
          />
          <script
            src="https://llama.rosnovsky.us/script.js"
            data-site="UHVHKTPD"
            honor-dnt="true"
            excluded-domains="rosnovskyus.vercel.app,localhost"
            defer
          ></script>
        </Head>
        <Container>
          <Intro />
          {featuredPost && (
            <HeroPost
              title={randomFeaturedPost.title}
              mainImage={randomFeaturedPost.mainImage}
              date={randomFeaturedPost.publishedAt}
              slug={randomFeaturedPost.slug.current}
              excerpt={randomFeaturedPost.excerpt}
              categories={randomFeaturedPost.categories}
            />
          )}
          <MoreStories posts={notFeaturedPosts} />
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {
  const posts = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    `{
      allPost(offset: 0, limit: 20){
      _id
      title
      body: bodyRaw
      slug {
        current
      }
      categories {
        title
        slug {
          current
        }
      }
      publishedAt
      exerpt: excerptRaw
      featured
      mainImage {
        alt
        caption
        asset {
          metadata{
            dimensions {
              aspectRatio
              width
              height
            }
            lqip
          }
          url
        }
      }
    }
  }`
  )
  return {
    props: {
      preview,
      posts: posts.allPost,
    },
  }
}
