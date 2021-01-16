import Container from '../components/Layout/container'
import MoreStories from '../components/Posts/MorePosts'
import HeroPost from '../components/Posts/HeroPost'
import Intro from '../components/Header/intro'
import Layout from '../components/Layout/layout'
import Head from 'next/head'
import { request } from 'graphql-request'
import { Post } from '..'
// import { GenerateSocialCards } from '../utils/generateSocialCards'
import Meta from '../components/Header/PageMeta'

const Index = ({ posts, menuItems, alert }: any) => {
  const featuredPost: Post[] = posts.filter(
    (post: any) => post.featured === true
  )
  const notFeaturedPosts: Post[] = posts.filter(
    (post: any) => post.featured !== true
  )

  const randomFeaturedPost = featuredPost && featuredPost[0]

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
          {featuredPost && (
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
          <MoreStories posts={notFeaturedPosts} />
          <div className="text-center my-20">
            <button className="font-bold text-xl ring-cool-gray-200 ring-4 px-10 py-5 hover:bg-gray-100">
              Load More
            </button>
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
      posts: allPost(limit: 7, sort: [ { publishedAt: DESC } ]){
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
      menuItems: data.menuItems,
      alert: data.alert[0],
    },
  }
}
