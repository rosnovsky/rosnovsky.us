import { Link } from 'gatsby'
import React from 'react'
// import { useAuth0 } from '../../utils/auth'
import Search from '../Search'
const searchIndices = [{ name: `blog_posts`, title: `title` }]

const Header = ({ page }) => {
  // const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()

  if (page === 'post') {
    return (
      <>
        <section className="flex-col flex items-left xl:justify-between mt-9 mb-16 xs:mb-6 md:mb-12 pl-5 xl:pl-0 lg:pl-0 xs:text-gray-600 sm:text-gray-600 md:text-gray-600">
          <h1 className="text-4xl md:text-4xl xs:text-2xl sm:text-2xl font-bold tracking-tighter leading-tight md:pr-8">
            <Link to="/">Rosnovsky Park.</Link>
          </h1>
          <h2 className="text-md md:text-md xs:text-md sm:text-md tracking-tighter leading-tight">
            Blog. Projects. Ideas.
            <Search indices={searchIndices} />
          </h2>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="flex-col xl:flex-row flex items-center xl:justify-between mt-16 mb-16 md:mb-12 xs:my-6">
        <h1 className="text-6xl md:text-6xl xs:text-5xl sm:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link to="/">Rosnovsky Park.</Link>
        </h1>
        <h2 className="text-center text-2xl md:text-xl xs:text-xl sm:text-xl tracking-tighter leading-tight mx-3">
          Blog. Projects. Ideas.
        </h2>
        <Search indices={searchIndices} />
      </section>
    </>
  )
}

export default Header
