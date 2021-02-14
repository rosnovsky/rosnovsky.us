import Meta from '../components/Header/PageMeta'
import Layout from '../components/Layout/layout'
import { request } from 'graphql-request'
import slugify from 'slugify'
import Header from '../components/Header/header'
import Container from '../components/Layout/container'
import { BlogAlert, BlogProps } from '..'

const NotFound = ({
  menuItems,
  alert,
}: {
  menuItems: BlogProps['menuItems']
  alert: BlogAlert
}) => {
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
      <Layout alert={alert} menuItems={menuItems}>
        <Container>
          <Header />
          <div>
            <div className="bg-white">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:py-14 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-base font-semibold text-orange font-mono tracking-wide uppercase mb-5">
                    Error 404
                  </h2>
                  <p className="mt-1 text-4xl font-black font-mono text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl pb-5">
                    Page Not Found
                  </p>
                  <div className="text-gray-400 prose-2xl my-10">
                    <p>It's probably you.</p>
                    <p>Or maybe it's me.</p>
                    <img src="404.gif" className="mx-auto" />
                    <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                      Let's not point fingers, ok? Ok.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
