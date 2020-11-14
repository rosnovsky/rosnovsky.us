import { Link } from 'gatsby'
import React from 'react'
// import { useAuth0 } from '../../utils/auth'

const Header = () => {
  // const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()

  return (
    <>
      <section className="flex-col xl:flex-row flex items-center xl:justify-between mt-16 mb-16 md:mb-12 xs:my-6">
        <h1 className="text-6xl md:text-6xl xs:text-5xl sm:text-5xl font-bold tracking-tighter leading-tight md:pr-8">
          <Link to="/">Rosnovsky Park.</Link>
        </h1>
        <h2 className="text-center md:text-left sm:text-md xs:text-sm xs:text-gray-600 text-lg mt-5 md:pl-8">
          From Pacific Northwest to the World
        </h2>
      </section>
    </>
  )
}

export default Header
