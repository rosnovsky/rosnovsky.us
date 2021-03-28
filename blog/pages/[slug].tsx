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
import generateSocialImage from '../utils/generateSocialCards'
import type { BlogAlert, Page, BlogPage } from '..'

const PublishedPage = ({
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

  return (
    <>
      <Meta
        title={title}
        pageType="article"
        description={title}
        coverImage={generateSocialImage({
          title,
          cloudName: 'rosnovsky',
          date: new Date().getFullYear.toString(),
          postTag: 'rosnovsky.us',
          cloudinaryUrlBase: 'https://res.cloudinary.com',
          imagePublicID: 'socialCard.png',
          // titleExtraConfig: '_line_spacing_-10',
          textColor: '232129',
        })}
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

export default PublishedPage

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
