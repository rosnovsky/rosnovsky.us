import Link from 'next/link'
import Head from 'next/head'

const Header = () => {
  return (
    <>
      <Head>
        <link
          rel="preconnect"
          href="https://vitals.vercel-insights.com"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.usefathom.com"
          as="fetch"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://img3.usefathom.com"
          as="fetch"
          crossOrigin="anonymous"
        />
      </Head>
      <h2 className="text-lg font-semibold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
        <div className="max-w-screen-xl mx-auto">
          <nav className="relative flex items-center sm:h-10">
            <div className="flex items-center flex-1 ">
              <div className="mx-auto font-black font-heading text-4xl text-green-900">
                <Link href="/" aria-label="Home">
                  Rosnovsky Park
                </Link>
              </div>
            </div>
          </nav>
        </div>
      </h2>
    </>
  )
}

export default Header
