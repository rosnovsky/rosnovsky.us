import { request } from 'graphql-request'
import useLoadMore from '../utils/useLoadMore'
import Container from '../components/Layout/container'
import MoreStories from '../components/Posts/MorePosts'
import Intro from '../components/Header/intro'
import Layout from '../components/Layout/layout'
import CovidTracker from '../components/Covid/CovidTracker'
import Meta from '../components/Header/PageMeta'
import { postsQuery } from '../utils/queries'
import type { BlogAlert, BlogPost, CovidFetchData, Page } from '..'

const Index = ({
  posts,
  menuItems,
  alert,
  covidData,
}: {
  posts: BlogPost[]
  menuItems: Page[]
  alert: BlogAlert
  covidData: CovidFetchData
}) => {
  const { isLoading, noMorePosts, allPosts, loadMore } = useLoadMore(posts)
  // const { data, error, loading, today } = useCovidData()

  if (typeof window !== 'undefined') {
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        if (!noMorePosts && !isLoading) {
          loadMore()
        }
      }
    }
  }

  return (
    <>
      <Meta
        title="Rosnovsky Park™"
        pageType="website"
        description="A blog and a website of Art Rosnovsky"
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/v1609810012/social-images/About-Me.png`}
        canonicalUrl={`https://rosnovsky.us`}
        coverAlt="Rosnovsky Park™"
      />
      <Layout menuItems={menuItems} alert={alert}>
        <Container>
          <Intro />
          <div className="bg-red-700 rounded-t-xl bg-opacity-10 py-5">
            <CovidTracker data={covidData} />
          </div>
          <div className="relative bg-gray-50 pt-10 pb-5 px-4 sm:px-6 lg:pt-14 lg:pb-8 lg:px-8">
            {allPosts && allPosts.length > 0 ? (
              <MoreStories posts={allPosts!} />
            ) : (
              <div className="text-center font-mono text-lg mt-5">
                <p className="text-3xl font-semibold">No Posts.</p>
                <br /> This quite likely is an error. I mean, it's a blog, there
                must be something here, right?
              </div>
            )}

            <div className="text-center font-semibold font-mono text-lg mt-5">
              {noMorePosts ? (
                <img
                  className="mx-auto"
                  src="the-end.png"
                  role="img"
                  alt="No more internet"
                />
              ) : isLoading ? (
                'Loading More Posts...'
              ) : (
                ''
              )}
            </div>
          </div>
        </Container>
      </Layout>
    </>
  )
}

export default Index

export async function getStaticProps({ preview = false }) {
  const data: {
    alert: BlogAlert[]
    posts: BlogPost[]
    menuItems: Page[]
  } = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    postsQuery
  )

  const fetchCovidData = await fetch(
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api/covid'
      : 'https://rosnovsky.us/api/covid'
  )

  const covidDataJSON = await fetchCovidData.json()

  const covidData: CovidFetchData = {
    date: covidDataJSON.covidData[0].date,
    positive: covidDataJSON.covidData[0].confirmed,
    positiveIncrease: covidDataJSON.covidData[0].confirmed_daily,
    death: covidDataJSON.covidData[0].deaths,
    deathIncrease: covidDataJSON.covidData[0].deaths_daily,
    snoDeaths: covidDataJSON.snoData[0].deaths,
    snoDeathsIncrease: covidDataJSON.snoData[0].deaths_daily,
  }

  return {
    props: {
      preview,
      posts: data.posts,
      menuItems: data.menuItems,
      alert: data.alert[0],
      covidData,
    },
    revalidate: 1,
  }
}
