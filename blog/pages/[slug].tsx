import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../components/Layout/container'
import PageBody from '../components/Pages/PageBody'
import Header from '../components/Header/header'
import PageHeader from '../components/Pages/PageHeader'
import Layout from '../components/Layout/layout'
import PostTitle from '../components/Pages/PageTitle'
import { request } from 'graphql-request'
import Meta from '../components/Header/PageMeta'
import { useEffect } from 'react'
import { format } from 'date-fns'
import slugify from 'slugify'
import { BlogAlert, Page, BlogPage } from '..'

const Page = ({
  page,
  menuItems,
  alert,
}: {
  page: BlogPage
  menuItems: Page[]
  alert: BlogAlert
}) => {
  const { title, mainImage, body, slug, socialCard }: any = page
  const router = useRouter()
  if (!router.isFallback && !page?.slug) {
    return <ErrorPage menuItems={menuItems} statusCode={404} />
  }

  useEffect(() => {
    const fetchImageUrl = async () => {
      const socialTitle = socialCard?.title || title
      const socialSubtitle = socialCard?.subtitle || 'Read More...'
      const fetchUrl = await fetch(
        `https://api.rosnovsky.us/api/generateOgImage?title=${socialTitle}&date=${format(
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
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/social-images/${slugify(
          socialCard?.title || title
        )}.png`}
        canonicalUrl={`https://rosnovsky.us/${slug}`}
        coverAlt={title}
        slug={slug}
      />
      <Layout alert={alert} menuItems={menuItems}>
        <div className="mx-auto"></div>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-32">
                <PageHeader title={title} mainImage={mainImage} slug={slug} />
                <PageBody content={body} title={title} slug={slug} />
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
      alert: allAlert {
        message
        alertLink
        internal
        active
      }
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
      alert: data.alert[0],
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
