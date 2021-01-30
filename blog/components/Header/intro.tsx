import Link from 'next/link'
const Intro = ({ menuItems }: any) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
          <div className="relative h-full max-w-screen-xl mx-auto">
            <svg
              className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    className="text-gray-200"
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              ></rect>
            </svg>
            <svg
              className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
              width="404"
              height="784"
              fill="none"
              viewBox="0 0 404 784"
            >
              <defs>
                <pattern
                  id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    className="text-gray-200"
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    fill="currentColor"
                  ></rect>
                </pattern>
              </defs>
              <rect
                width="404"
                height="784"
                fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)"
              ></rect>
            </svg>
          </div>
        </div>
        <div className="relative pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            <nav className="relative flex items-center justify-between sm:h-10 md:justify-center">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="flex items-center justify-between w-full md:w-auto font-bold text-xl text-red-900">
                  <Link href="/" aria-label="Home">
                    Rosnovsky Park
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex md:space-x-10">
                {menuItems
                  ? menuItems.map((menuItem: any) => (
                      <div
                        className="px-5 py-2 text-md text-gray-800 hover:text-gray-900"
                        key={menuItem.slug.current}
                      >
                        <Link href={`/${menuItem.slug.current}/`}>
                          {menuItem.title}
                        </Link>
                      </div>
                    ))
                  : null}
              </div>
              <div className="md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                <span className="inline-flex rounded-md shadow">
                  <a
                    className="inline-flex items-center px-4 py-2 border border-transparent text-base leading-6 font-medium rounded-md text-red-600 bg-white hover:text-red-500 focus:outline-none focus:border-red-300 focus:shadow-outline-red active:bg-gray-50 active:text-red-700 transition duration-150 ease-in-out"
                    href="#"
                  >
                    Log in
                  </a>
                </span>
              </div>
            </nav>
          </div>
          <main className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 xl:mt-28">
            <div className="text-center">
              <h1 className="text-4xl lg:text-7xl tracking-tight leading-10 font-black text-red-600 sm:text-5xl sm:leading-none md:text-6xl">
                Rosnovsky Park
              </h1>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default Intro
