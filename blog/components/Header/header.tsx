import Link from 'next/link'

const Header = () => {
  return (
    <h2 className="text-lg font-semibold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <div className="max-w-screen-xl mx-auto">
        <nav className="relative flex items-center sm:h-10">
          <div className="flex items-center flex-1 ">
            <div className="mx-auto font-black text-4xl text-red-600">
              <Link href="/" aria-label="Home">
                Rosnovsky Park
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </h2>
  )
}

export default Header
