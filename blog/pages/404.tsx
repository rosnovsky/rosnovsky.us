import Covid from '../components/Covid/CovidTracker'
import Footer from '../components/Footer/footer'
import Meta from '../components/Header/PageMeta'
import { useEffect } from 'react'
import { format } from 'date-fns'
import slugify from 'slugify'

const NotFound = () => {
  useEffect(() => {
    const fetchImageUrl = async () => {
      const socialTitle = '404: Page Not Found, damn it!'
      const socialSubtitle = "Now, let's not point fingers, ok? Ok."
      const fetchUrl = await fetch(
        `/api/generateOgImage?title=${socialTitle}&date=${format(
          Date.now(),
          'dd MMM yyyy'
        )}&category=404 Error&subtitle=${socialSubtitle}&coverImage=${encodeURIComponent(
          'https://images.unsplash.com/photo-1584824486516-0555a07fc511?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80'
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
        title="404, damn it!"
        pageType="article"
        description="404: Page not found. Let's not point fingers, ok? Ok."
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/v1609648082/social-images/${slugify(
          '404: Page Not Found, damn it!'
        )}.png`}
        canonicalUrl="https://rosnovsky.us/"
        coverAlt="Rosnovsky Park"
      />
      <div className="">
        <Covid />
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
        <Footer />
      </div>
    </>
  )
}

export default NotFound
