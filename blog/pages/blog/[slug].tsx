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
import { format } from 'date-fns'
import Meta from '../../components/Header/PageMeta'

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

  const cloudinaryTitleCleanup = (title: string) => {
    const commas = title.split(',').join('%252C')
    const colons = commas.split(':').join('%253A')
    const questionMarks = colons.split('?').join('%253F')
    return questionMarks
  }

  return (
    <>
      <Meta title={title} />
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
                    content={`https://res.cloudinary.com/rosnovsky/image/upload/c_fill,w_1200,e_blur:400/c_fit,l_og_template,w_1000/w_200,c_fit,l_text:mono.ttf_24_bold:${format(
                      Date.parse(publishedAt),
                      'dd MMM yyyy'
                    )},g_north_west,x_160,y_523,co_rgb:A6A6A6FF/w_300,c_fit,l_text:mono.ttf_24_bold:${
                      categories[0].title
                    },g_north_west,x_150,y_130,co_rgb:D03801FF/w_700,c_fit,l_text:fira.ttf_76_bold:${cloudinaryTitleCleanup(
                      title
                    )},g_north_west,x_150,y_190/v1607201491/b920c2fab2f915bd9a11f621ce40002c157293d2-1800x1013_napjjt.png`}
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
    </>
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
