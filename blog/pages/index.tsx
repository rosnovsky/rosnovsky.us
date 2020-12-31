import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import { request } from 'graphql-request'
// import { useState } from 'react'
// import { useSWRInfinite } from 'swr'

// const fetcher = async (query: any) => {
//   const result = await request(
//     'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
//     query
//   ).then((response) => {
//     return response
//   })
//   return result
// }

const Index = ({ posts }: any) => {
  // const [morePosts, setMorePosts] = useState([])
  // const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
  //   (index) => `{
  //     allPost(offset: 5 + ${index * 10}, limit: 5){
  //     _id
  //     title
  //     body: bodyRaw
  //     slug {
  //       current
  //     }
  //     categories {
  //       title
  //       slug {
  //         current
  //       }
  //     }
  //     publishedAt
  //     exerpt: excerptRaw
  //     featured
  //     mainImage {
  //       alt
  //       caption
  //       asset {
  //         metadata{
  //           dimensions {
  //             aspectRatio
  //             width
  //             height
  //           }
  //           lqip
  //         }
  //         url
  //       }
  //     }
  //   }
  // }`,
  //   fetcher
  // )
  // setMorePosts(data[0])
  // const isLoadingInitialData = !data && !error
  // const isLoadingMore =
  //   isLoadingInitialData ||
  //   (size > 0 && data && typeof data[size - 1] === 'undefined')
  // const isEmpty = data?.[0]?.length === 0
  // const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 10)

  const featuredPost = posts.filter((post: any) => post.featured === true)
  const notFeaturedPosts = posts.filter((post: any) => post.featured !== true)

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
          {/* {console.log(morePosts, size)}
          {isEmpty ? (
            <p>Yay, no issues found.</p>
          ) : morePosts.length < 2 ? null : (
            <MoreStories posts={morePosts[size + 1].allPost} />
          )}
          <button
            disabled={isLoadingMore || isReachingEnd}
            onClick={() => setSize(size + 1)}
          >
            {isLoadingMore
              ? 'loading...'
              : isReachingEnd
              ? 'no more issues'
              : 'load more'}
          </button> */}
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
      allPost(sort: [ { publishedAt: DESC } ]){
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
      excerpt: excerptRaw
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
