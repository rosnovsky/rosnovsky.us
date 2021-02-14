import Container from '../components/Layout/container'
import MoreStories from '../components/Posts/MorePosts'
import Intro from '../components/Header/intro'
import Layout from '../components/Layout/layout'
import Head from 'next/head'
import { request } from 'graphql-request'
import { useState, useEffect } from 'react'
import { BlogAlert, BlogProps } from '..'
import Covid from '../components/Covid/CovidTracker'
// import { GenerateSocialCards } from '../utils/generateSocialCards'
import Meta from '../components/Header/PageMeta'

const Index = ({
  posts,
  menuItems,
  alert,
}: {
  posts: BlogProps['posts']
  menuItems: BlogProps['menuItems']
  alert: BlogAlert
}) => {
  const [allPosts, setAllPosts] = useState<BlogProps['posts']>()!
  const [index, setIndex] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false)
  useEffect(() => {
    setAllPosts(posts)
  }, [])

  const loadMore = async () => {
    setLoading(true)

    const morePosts = await request(
      'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
      `{
      posts: allPost(limit: 6, offset: ${
        6 * index
      }, sort: [ { publishedAt: DESC } ], where: { featured: { neq: true }}){
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
        socialCard {
          title
          subtitle
        }
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
    ).then((morePosts: { posts: BlogProps['posts'] }): void => {
      if (morePosts.posts.length < 6) {
        setNoMorePosts(true)
        // @ts-ignore
        setAllPosts((allPosts) => [...allPosts, ...morePosts.posts])
        setLoading(false)
        return
      }
      // @ts-ignore
      setAllPosts((allPosts) => [...allPosts, ...morePosts.posts])
      setIndex(index + 1)
      setLoading(false)
      return
    })
  }

  return (
    <>
      <Meta
        title="Rosnovsky Park™"
        pageType="website"
        description="A blog and a website of Art Rosnovsky"
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/v1609810012/social-images/About-Me.png`}
        canonicalUrl={`https://rosnovsky.us`}
        coverAlt="Rosnovsky Park™"
      />
      <Layout menuItems={menuItems} alert={alert}>
        <Head>
          <title>Rosnovsky Park</title>
          <link
            rel="preconnect"
            href="https://api.covidtracking.com/v1/us/current.json"
            as="fetch"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://vitals.vercel-insights.com"
            as="fetch"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://cdn.usefathom.com"
            as="fetch"
            crossOrigin="anonymous"
          />
          <link
            rel="preconnect"
            href="https://img3.usefathom.com"
            as="fetch"
            crossOrigin="anonymous"
          />
        </Head>
        <Container>
          <Intro />
          <div className="bg-red-700 rounded-t-xl bg-opacity-10 py-5">
            <Covid />
          </div>
          <div className="relative bg-gray-50 pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
            {allPosts !== undefined ? (
              <MoreStories posts={allPosts} />
            ) : (
              'Nothing here'
            )}

            <div className="text-center mt-20">
              {noMorePosts ? (
                "You've reached the end of the internet."
              ) : (
                <button
                  onClick={loadMore}
                  className="font-bold text-xl ring-cool-gray-300 ring-4 px-10 py-5 hover:bg-green-100 text-green-900"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              )}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {
  const data: BlogProps = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    `{
      alert: allAlert {
        message
        alertLink
        internal
        active
      }
      menuItems: allPage(where: {menuItem: {eq: true}}){
        title
        slug {
          current
        }
      }
      posts: allPost(limit: 6, sort: [ { publishedAt: DESC } ]){
      _id
      title
      body: bodyRaw
      featured
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
      socialCard {
        title
        subtitle
      }
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

  // GenerateSocialCards(data.posts)
  return {
    props: {
      preview,
      posts: data.posts,
      menuItems: data.menuItems,
      alert: data.alert[0],
    },
  }
}

/*




*/
