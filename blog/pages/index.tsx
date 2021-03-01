import Container from '../components/Layout/container'
import MoreStories from '../components/Posts/MorePosts'
import Intro from '../components/Header/intro'
import Layout from '../components/Layout/layout'
import { request } from 'graphql-request'
import { useState, useEffect } from 'react'
import { BlogAlert, BlogPost, Page } from '..'
import Covid from '../components/Covid/CovidTracker'
// import { GenerateSocialCards } from '../utils/generateSocialCards'
import Meta from '../components/Header/PageMeta'
import ReactPlaceholder from 'react-placeholder'
import 'react-placeholder/lib/reactPlaceholder'

const Index = ({
  posts,
  menuItems,
  alert,
}: {
  posts: BlogPost[]
  menuItems: Page[]
  alert: BlogAlert
}) => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>()!
  const [index, setIndex] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false)

  // Infinite Scroll, pretty rudimentary
  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (!noMorePosts && !loading) {
          loadMore()
        }
      }
    }
  }

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
    ).then((morePosts: { posts: BlogPost[] }): void => {
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
        <Container>
          <Intro />
          <div className="bg-red-700 rounded-t-xl bg-opacity-10 py-5">
            <Covid />
          </div>
          <div className="relative bg-gray-50 pt-10 pb-5 px-4 sm:px-6 lg:pt-14 lg:pb-8 lg:px-8">
            <ReactPlaceholder
              showLoadingAnimation
              ready={allPosts !== undefined}
              delay={300}
              type="rect"
              rows={5}
              firstLaunchOnly
            >
              <MoreStories posts={allPosts!} />
            </ReactPlaceholder>

            <div className="text-center font-semibold font-mono text-lg mt-5">
              {noMorePosts ? (
                <img className="mx-auto" src="the-end.png" />
              ) : loading ? (
                'Loading More Posts...'
              ) : (
                ''
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
  const data: {
    alert: BlogAlert[]
    posts: BlogPost[]
    menuItems: Page[]
  } = await request(
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
