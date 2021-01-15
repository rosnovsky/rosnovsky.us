import Footer from '../components/Footer/footer'
import Meta from '../components/Header/PageMeta'
import Layout from '../components/Layout/layout'
import { request } from 'graphql-request'
import slugify from 'slugify'
import Header from '../components/Header/header'
import Container from '../components/Layout/container'

const NotFound = ({ menuItems }: any) => {
  console.log(menuItems)
  return (
    <>
      <Meta
        title="404, damn it!"
        pageType="article"
        description="404: Page not found. Let's not point fingers, ok? Ok."
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/social-images/${slugify(
          '404: Page Not Found, damn it!'
        )}.png`}
        canonicalUrl="https://rosnovsky.us/"
        coverAlt="Rosnovsky Park"
      />
      <Layout menuItems={menuItems}>
        <Container>
          <Header />
          <div className="">
            <div className="bg-white h-auto ">
              <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-base font-semibold text-orange font-mono tracking-wide uppercase mb-5">
                    Error 404
                  </h2>
                  <p className="mt-1 text-4xl font-black font-mono text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl pb-5">
                    Page Not Found
                  </p>
                  <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                    Let's not point fingers, ok? Ok.
                  </p>
                </div>
              </div>
            </div>
            <Footer menuItems={menuItems} />
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default NotFound

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
    }`
  )

  return {
    props: {
      preview,
      menuItems: data.menuItems,
    },
  }
}
