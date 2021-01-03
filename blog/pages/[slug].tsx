import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../components/Layout/container'
import PageBody from '../components/Pages/PageBody'
import Header from '../components/Header/header'
import PageHeader from '../components/Pages/PageHeader'
import Layout from '../components/Layout/layout'
import PostTitle from '../components/Pages/PageTitle'
import Head from 'next/head'
import { request } from 'graphql-request'
import { urlFor } from '../utils/sanity'
import Meta from '../components/Header/PageMeta'
import { useEffect } from 'react'
import { format } from 'date-fns'
import slugify from 'slugify'

const Page = ({ page, menuItems, preview }: any) => {
  const { title, mainImage, body, slug, socialCard }: any = page
  const router = useRouter()
  if (!router.isFallback && !page?.slug) {
    return <ErrorPage statusCode={404} />
  }

  useEffect(() => {
    const fetchImageUrl = async () => {
      const socialTitle = socialCard?.title || title
      const socialSubtitle = socialCard?.subtitle || 'Read More...'
      const fetchUrl = await fetch(
        `/api/generateOgImage?title=${socialTitle}&date=${format(
          Date.now(),
          'dd MMM yyyy'
        )}&category=Page&subtitle=${socialSubtitle}&coverImage=${encodeURIComponent(
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
        description={title}
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/v1609648082/social-images/${slugify(
          socialCard?.title || title
        )}.png`}
        canonicalUrl={`https://rosnovsky.us/${slug}`}
        coverAlt={title}
      />
      <Layout preview={preview} menuItems={menuItems}>
        <div className="mx-auto"></div>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-32">
                <Head>
                  <title>{title} | Rosnovsky Park</title>
                  {mainImage ? (
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
                  ) : (
                    <meta
                      property="og:image"
                      content="https://rosnovsky.us/favicon.png"
                    />
                  )}
                  <meta property="og:title" content={title} />
                  <meta property="og:type" content="article" />
                  <meta
                    property="og:url"
                    content={`https://rosnovsky.us/${slug.current}`}
                  />
                </Head>
                <PageHeader title={title} mainImage={mainImage} />
                <PageBody content={body} />
              </article>
            </>
          )}
        </Container>
      </Layout>
    </>
  )
}

export default Page

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
      menuItems: allPage(where: {menuItem: {eq: true}}) {
        title
        slug {
          current
        }
      }
      pages: allPage(where: {slug: {current: {eq: "${params.slug}"}}}) {
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
        excerpt: excerptRaw
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
      page: data.pages[0],
      menuItems: data.menuItems,
    },
  }
}

export async function getStaticPaths() {
  const paths = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    `{
    allPage{
      slug {
        current
      }
    }
  }`
  )

  return {
    paths: paths.allPage.map((slug: { slug: { current: string } }) => {
      return {
        params: { slug: `${slug.slug.current}` },
      }
    }),
    fallback: false,
  }
}
