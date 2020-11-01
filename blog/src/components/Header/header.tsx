import { Link } from 'gatsby'
import React, { useState } from 'react'
// import { useAuth0 } from '../../utils/auth'

const Header = () => {
  // const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()

  return (
    <>
      <div className="w-max-full relative bg-gray-20">
        <div className="bg-white">
          <div className="w-full max-w-7xl mx-auto px-4">
            <div className="flex align-middle justify-center items-center py-6">
              <div className="flex-col text-center">
                <Link
                  to="/"
                  className="text-3xl xs:text-xl sm:text-xl md:text-2xl lg:text-2xl align-middle inline-flex"
                >
                  <h1 className="align-middle font-semibold">Rosnovsky Park</h1>
                </Link>
                <p className="text-sm align-middle text-gray-300">
                  From Pacific Northwest to the World
                </p>
              </div>
              {/* {!isAuthenticated && !loading && (
                <div className="lg:flex xl:flex md:flex sm:flex-1 items-center justify-end space-x-8 lg:w-0">
                  <button
                    className="whitespace-no-wrap inline-flex items-center justify-center text-gray-500 px-4 py-2 transition ease-in-out duration-150"
                    onClick={() =>
                      loginWithRedirect({
                        appState: `${window.location.pathname}`
                      })
                    }
                  >
                    Sign in
                  </button>
                </div>
              )}
              {isAuthenticated && (
                <div className="hidden lg:flex xl:flex md:flex sm:flex-1 items-center justify-end space-x-8 lg:w-0">
                  <Link to="/account">My Account</Link>
                  <button onClick={() => logout()}>Log out</button>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
