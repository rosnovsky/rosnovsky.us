import Container from '../components/Layout/container'
import MoreStories from '../components/Posts/MorePosts'
import HeroPost from '../components/Posts/HeroPost'
import Intro from '../components/Header/intro'
import Layout from '../components/Layout/layout'
import Head from 'next/head'
import { request } from 'graphql-request'
import Meta from '../components/Header/PageMeta'
import { format } from 'date-fns'

const Index = ({ posts, menuItems, alert }: any) => {
  const featuredPost = posts.filter((post: any) => post.featured === true)
  const notFeaturedPosts = posts.filter((post: any) => post.featured !== true)

  const randomFeaturedPost = featuredPost && featuredPost[0]
  return (
    <>
      <Meta
        title="Rosnovsky Park"
        pageType="article"
        description=""
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/c_fill,w_1200,e_blur:400/c_fit,l_og_template,w_1000/w_500,c_fit,l_text:mono.ttf_24_bold:From Pacific Northwest to the World,g_north_west,x_160,y_523,co_rgb:A6A6A6FF/w_300,c_fit,l_text:mono.ttf_36_bold:Visit,g_north_west,x_150,y_130,co_rgb:D03801FF/w_700,c_fit,l_text:fira.ttf_96_bold:Rosnovsky Park,g_north_west,x_150,y_290/v1607201491/b920c2fab2f915bd9a11f621ce40002c157293d2-1800x1013_napjjt.png`}
        canonicalUrl="https://rosnovsky.us/"
        coverAlt="Rosnovsky Park"
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
      posts: allPost(sort: [ { publishedAt: DESC } ]){
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
      posts: data.posts,
      menuItems: data.menuItems,
      alert: data.alert[0],
    },
  }
}
