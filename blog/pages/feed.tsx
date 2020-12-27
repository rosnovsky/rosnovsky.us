import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import Head from 'next/head'
import Post from '../types/post'
import { groq } from 'next-sanity'
import { getClient } from '../lib/sanity'

const postQuery = groq`
  *[_type == "post"] {
    title,
    excerpt,
    publishedAt,
    mainImage,
    categories[]->,
    "slug": slug.current
  } | order(publishedAt desc)
`

const Feed = ({ data }: any) => {
  return (
    <>
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
      <MoreStories posts={data.posts} />
    </>
  )
}

export default Feed

export async function getStaticProps({ preview = false }) {
  const posts = await getClient(preview).fetch(postQuery)
  return {
    props: {
      preview,
      data: { posts },
    },
  }
}
