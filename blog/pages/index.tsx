import Container from '../components/Layout/container'
import MoreStories from '../components/Posts/MorePosts'
import Intro from '../components/Header/intro'
import Layout from '../components/Layout/layout'
import { request } from 'graphql-request'
import { useState, useEffect } from 'react'
import { BlogAlert, BlogPost, Page } from '..'
import Covid from '../components/Covid/CovidTracker'
import Meta from '../components/Header/PageMeta'
import 'react-placeholder/lib/reactPlaceholder.css'
import { postsQuery, morePostsQuery } from '../utils/queries'

const Index = ({
  posts,
  menuItems,
  alert,
}: {
  posts: BlogPost[]
  menuItems: Page[]
  alert: BlogAlert
}) => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(posts)
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

    await request(
      'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
      morePostsQuery(index)
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
            {allPosts && allPosts.length > 0 ? (
              <MoreStories posts={allPosts!} />
            ) : (
              <div className="text-center font-mono text-lg mt-5">
                <p className="text-3xl font-semibold">No Posts.</p>
                <br /> This quite likely is an error. I mean, it's a blog, there
                must be something here, right?
              </div>
            )}

            <div className="text-center font-semibold font-mono text-lg mt-5">
              {noMorePosts ? (
                <img
                  className="mx-auto"
                  src="the-end.png"
                  role="img"
                  alt="No more internet"
                />
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
    postsQuery
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
