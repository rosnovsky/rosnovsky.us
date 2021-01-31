import Link from 'next/link'
const Intro = ({ menuItems }: any) => {
  return (
    <>
      <div className="relative overflow-hidden">
        <div className="relative pt-6 md:pb-12 sm:pb-4 lg:pb-28 xl:pb-32">
          <div className="max-w-screen-xl mx-auto px-4 sm:px-6">
            <nav className="relative flex sm:h-10 justify-end lg:justify-center">
              <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                <div className="lg:hidden sm:visible font-black text-2xl text-red-600">
                  <Link href="/" aria-label="Home">
                    Rosnovsky Park
                  </Link>
                </div>
              </div>
              <div className="flex">
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
            </nav>
          </div>
          <div className="lg:visible invisible mx-0">
            <main className="mt-5 mx-auto max-w-screen-xl px-4 sm:mt-6 sm:px-6 md:mt-4 lg:mt-20 xl:mt-28">
              <div className="text-center">
                <h1 className="text-4xl lg:text-7xl tracking-tight leading-10 font-black text-red-600 sm:text-5xl sm:leading-none md:text-6xl">
                  Rosnovsky Park
                </h1>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default Intro
