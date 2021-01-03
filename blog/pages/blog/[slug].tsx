import { useRouter } from 'next/router'
import { useEffect } from 'react'
import slugify from 'slugify'
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
    socialCard,
  }: any = post
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    const fetchImageUrl = async () => {
      const socialTitle = socialCard?.title || title
      const socialSubtitle = socialCard?.subtitle || 'Read More...'
      const fetchUrl = await fetch(
        `/api/generateOgImage?title=${socialTitle}&date=${format(
          Date.parse(publishedAt),
          'dd MMM yyyy'
        )}&category=${
          categories[0].title
        }&subtitle=${socialSubtitle}&coverImage=${encodeURIComponent(
          mainImage.asset.url
        )}`
      )
      const urlJSON = await fetchUrl
      const url = await urlJSON.json()
      return url
    }
    fetchImageUrl()
  }, [])

  return (
    <>
      <Meta
        title={title}
        pageType="article"
        description=""
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/v1609648082/social-images/${slugify(
          title
        )}.png`}
        canonicalUrl={`https://rosnovsky.us/blog/${format(
          Date.parse(publishedAt),
          'yyyy/MM/dd'
        )}/${slug.current}`}
        coverAlt={title}
      />
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
        socialCard {
          title
          subtitle
        }
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
