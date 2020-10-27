import { Link } from 'gatsby'
import React, { useState } from 'react'
import Icon from '../icon'
import { useAuth0 } from '../../utils/auth'

const Header = () => {
  const [isOn, setIsOn] = useState(false)
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0()

  return (
    <>
      <div className="relative bg-yellow-300">
        <div className="max-w-screen-xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="pr-16 sm:text-center sm:px-16">
            <p className="font-medium text-black text-center">
              <p className="ml-3 text-xl font-medium truncate">
                <span>Work in Progress!</span>
              </p>
              <span className="ml-2 inline-block">
                <Link
                  to="/blog/2020/10/26/building-this-website/"
                  className="font-bold underline"
                >
                  Learn more &rarr;
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="w-max-full relative bg-gray-50">
        <div className="relative bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex align-middle justify-between items-center py-6 md:justify-between lg:justify-between">
              <div className="flex items-center align-middle">
                <Link to="/" className="text-xl align-middle inline-flex">
                  <img
                    className="h-8 w-auto mr-5"
                    src="https://rosnovsky.us/favicon.png"
                    alt="Workflow"
                  />
                  <h1 className="align-middle font-semibold">Rosnovsky Park</h1>
                </Link>
              </div>
              <div className="-mr-2 -my-2 xl:hidden lg:hidden md:hidden">
                <button
                  onClick={e => (isOn ? setIsOn(false) : setIsOn(true))}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                >
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth=""
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              <nav className="hidden lg:flex xl:flex md:flex space-x-10">
                <Link
                  to="/archive"
                  className="text-gray-500 inline-flex items-center space-x-2 text-base leading-6 font-medium hover:text-gray-900 transition ease-in-out duration-150"
                >
                  Archive
                </Link>
                <Link
                  to="/about"
                  className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150"
                >
                  About Me
                </Link>
                <Link
                  to="/projects"
                  className="text-base leading-6 font-medium text-gray-500 hover:text-gray-900 transition ease-in-out duration-150"
                >
                  Projects
                </Link>
              </nav>
              {!isAuthenticated && !loading && (
                <div className="hidden lg:flex xl:flex md:flex sm:flex-1 items-center justify-end space-x-8 lg:w-0">
                  <button
                    className="whitespace-no-wrap inline-flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition ease-in-out duration-150"
                    onClick={() =>
                      loginWithRedirect({
                        appState: `${window.location.pathname}`
                      })
                    }
                  >
                    Sign in
                  </button>
                  <span className="inline-flex rounded-md shadow-sm"></span>
                </div>
              )}
              {isAuthenticated && (
                <div className="hidden lg:flex xl:flex md:flex sm:flex-1 items-center justify-end space-x-8 lg:w-0">
                  <Link to="/account">My Account</Link>
                  <button onClick={() => logout()}>Log out</button>
                </div>
              )}
            </div>
          </div>
          <div
            className={`${
              isOn ? 'visible' : 'hidden'
            } absolute top-0 inset-x-0 z-10 p-2 transition transform origin-top-right md:hidden`}
          >
            <div className="rounded-lg shadow-lg">
              <div className="rounded-lg shadow-xs bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 space-y-6">
                  <div className="flex items-center justify-between">
                    <Link to="/" className="text-xl align-middle inline-flex">
                      <img
                        className="h-8 w-auto mr-5"
                        src="https://rosnovsky.us/favicon.png"
                        alt="Workflow"
                      />
                      <h1 className="align-middle font-semibold">
                        Rosnovsky Park
                      </h1>
                    </Link>
                    <div className="-mr-2">
                      <button
                        onClick={e => (isOn ? setIsOn(false) : setIsOn(true))}
                        type="button"
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth=""
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div>
                    <nav className="grid gap-y-8">
                      <Link
                        to="/archive"
                        className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth=""
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Archive
                        </div>
                      </Link>
                      <path
                        to="/about"
                        className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth=""
                            d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                          />
                        </svg>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          About Me
                        </div>
                      </path>
                      <Link
                        to="/projects"
                        className="-m-3 p-3 flex items-center space-x-3 rounded-md hover:bg-gray-50 transition ease-in-out duration-150"
                      >
                        <svg
                          className="flex-shrink-0 h-6 w-6 text-indigo-600"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth=""
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                          />
                        </svg>
                        <div className="text-base leading-6 font-medium text-gray-900">
                          Projects
                        </div>
                      </Link>
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                  <div className="space-y-6">
                    {!isAuthenticated && !loading && (
                      <>
                        <span className="w-full flex rounded-md shadow-sm">
                          <button
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition ease-in-out duration-150"
                            onClick={() =>
                              loginWithRedirect({
                                appState: `${window.location.pathname}`
                              })
                            }
                          >
                            Member Account
                          </button>
                        </span>
                        <p className="text-center text-base leading-6 font-medium text-gray-500">
                          Login on Join
                        </p>
                      </>
                    )}
                    {isAuthenticated && (
                      <>
                        <span className="w-full text-center flex rounded-md shadow-sm">
                          <Link
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange active:bg-orange-700 transition ease-in-out duration-150"
                            to="/account"
                          >
                            My Account
                          </Link>
                        </span>
                        <button
                          className="w-full align-center mx-auto text-center text-base leading-6 font-medium text-gray-500"
                          onClick={() => logout()}
                        >
                          Log out
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <main className="lg:relative">
    <div className="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
      <div className="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
        <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
          Welcome&nbsp;to
          <br className="xl:hidden" />
          <span className="text-orange-600"> {siteTitle}</span>
        </h2>
        <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-5 md:max-w-3xl">
          Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
        </p>
        <div className="mt-10 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-700 focus:shadow-outline-orange transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
              Get started
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a href="#" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-orange-600 bg-white hover:text-orange-500 focus:outline-none focus:border-orange-300 focus:shadow-outline-orange transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10">
              Live demo
            </a>
          </div>
        </div>
      </div>
    </div>
    <div className="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
      <img className="absolute inset-0 w-full h-full object-cover" src="https://s3.us-west-1.wasabisys.com/rosnovsky-media/IMG_0700.jpeg" alt="Woman on her phone" />
    </div>
  </main> */}
      </div>
    </>
  )
}

export default Header
