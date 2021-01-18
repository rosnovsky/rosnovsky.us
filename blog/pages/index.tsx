import Container from '../components/Layout/container'
import MoreStories from '../components/Posts/MorePosts'
import HeroPost from '../components/Posts/HeroPost'
import Intro from '../components/Header/intro'
import Layout from '../components/Layout/layout'
import Head from 'next/head'
import { request } from 'graphql-request'
import {useState, useEffect} from 'react'
import { Post } from '..'
// import { GenerateSocialCards } from '../utils/generateSocialCards'
import Meta from '../components/Header/PageMeta'

const Index = ({ posts, featuredPosts, menuItems, alert }: any) => {
  const [allPosts, setAllPosts] = useState([])
  const [index, setIndex] = useState(1)
  const [loading, setLoading] = useState(false)
  const [noMorePosts, setNoMorePosts] = useState(false)
  useEffect(()=> {
    setAllPosts(posts)
  }, [])

  const notFeaturedPosts: Post[] = posts.filter(
    (post: any) => post.featured !== true
  )
  const randomFeaturedPost = featuredPosts && featuredPosts[0]
  
  const loadMore = async () => {
    setLoading(true)
    const morePosts = await request('https://n3o7a5dl.api.sanity.io/v1/graphql/production/default', `{
      posts: allPost(limit: 6, offset: ${6*index}, sort: [ { publishedAt: DESC } ], where: { featured: { neq: true }}){
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
    }`).then(morePosts => {
      if(morePosts.posts.length < 6){
        setNoMorePosts(true)
        setAllPosts(allPosts => [...allPosts, ...morePosts.posts])
        setLoading(false)
        return
      }
        setAllPosts(allPosts => [...allPosts, ...morePosts.posts])
        setLoading(false)
        setIndex(index+1)
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
          {featuredPosts && (
            <HeroPost
              title={randomFeaturedPost.title}
              mainImage={randomFeaturedPost.mainImage}
              date={randomFeaturedPost.publishedAt}
              slug={randomFeaturedPost.slug.current}
              excerpt={randomFeaturedPost.excerpt}
              categories={randomFeaturedPost.categories}
              socialCard={randomFeaturedPost.socialCard}
            />
          )}
          <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
            More Posts
          </h2>
          <MoreStories posts={allPosts} />
          <div className="text-center my-20">
          {noMorePosts ? "You've reached the end of the internet." : <button onClick={loadMore} className="font-bold text-xl ring-cool-gray-200 ring-4 px-10 py-5 hover:bg-gray-100">
              {loading ? "Loading..." : "Load More"}
            </button>
          }
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {
  const data = await request(
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
      featuredPosts: allPost(where: {featured: {eq: true}}){
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
      posts: allPost(limit: 6, sort: [ { publishedAt: DESC } ], where: { featured: { neq: true }}){
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
  )

  // GenerateSocialCards(data.posts)
  return {
    props: {
      preview,
      posts: data.posts,
      featuredPosts: data.featuredPosts,
      menuItems: data.menuItems,
      alert: data.alert[0],
    },
  }
}


/*




*/
