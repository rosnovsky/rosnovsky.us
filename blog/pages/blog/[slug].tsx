import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/Layout/container'
import PostBody from '../../components/Posts/PostBody'
import Header from '../../components/Header/header'
import PostHeader from '../../components/Posts/PostHeader'
import Layout from '../../components/Layout/layout'
import PostTitle from '../../components/Posts/PostTitle'
import Head from 'next/head'
import { request } from 'graphql-request'
import { urlFor } from '../../utils/sanity'
import { format } from 'date-fns'

type Props = {
  post: Post
  preview?: boolean
  menuItems: {
    title: string
    slug: { current: string }
  }[]
}

const Post = ({ post, preview, menuItems }: Props) => {
  const {
    title,
    mainImage,
    publishedAt,
    body,
    slug,
    excerpt,
    categories,
  }: any = post
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Layout menuItems={menuItems} preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title} | Rosnovsky Park</title>
                <meta
                  property="og:image"
                  content={
                    urlFor(mainImage.asset.url)
                      .width(1010)
                      .height(655)
                      .format('jpg')
                      .url() || ''
                  }
                />
                <meta property="og:title" content={title} />
                <meta property="og:type" content="article" />
                <meta
                  property="og:url"
                  content={`https://rosnovsky.us/blog/${format(
                    Date.parse(publishedAt),
                    'yyyy/MM/dd'
                  )}/${slug.current}`}
                />
              </Head>
              <PostHeader
                title={title}
                mainImage={mainImage}
                date={publishedAt}
                excerpt={excerpt}
                categories={categories}
              />
              <PostBody content={body} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: any
  preview: boolean
}) {
  const data = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    `{
      menuItems: allPage(where: {menuItem: {eq: true }}){
        title
        slug {
          current
        }
      }
      posts: allPost(where: {slug: {current: {eq: "${params.slug}"}}}) {
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
      post: data.posts[0],
      menuItems: data.menuItems,
    },
  }
}

export async function getStaticPaths() {
  const paths = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    `{
    allPost{
      publishedAt
      slug {
        current
      }
    }
  }`
  )

  return {
    paths: paths.allPost.map(
      (slug: { slug: { current: string }; publishedAt: string }) => {
        return {
          params: { slug: `${slug.slug.current}`, date: slug.publishedAt },
        }
      }
    ),
    fallback: false,
  }
}
