import { format } from 'date-fns'
import MainImage from '../Image/CoverImage'
import Link from 'next/link'
// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import serializers from '../PortableText/serializers'

const HeroPost = ({
  title,
  mainImage,
  date,
  excerpt,
  slug,
  categories,
}: any) => {
  const postDate = new Date(date)
  const postUrl = `${format(postDate, 'yyyy/MM/dd')}`
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return (
    <div className="relative bg-white overflow-hidden shadow-2xl rounded-xl my-20 border-4 border-blue-900">
      <div className="max-w-7xl mx-auto">
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-2/3">
          <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full">
            <MainImage
              featured
              preview={false}
              title={title}
              src={mainImage}
              slug={`${postUrl}/${slug}`}
            />
          </div>
        </div>
        <div className="relative z-10 pb-2 bg-white lg:max-w-2xl lg:w-full">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative py-2 px-4 sm:px-6 lg:px-8"></div>

          <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden"></div>
          </div>

          <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-3 md:mt-3 lg:mt-3 lg:px-3 xl:mt-8">
            <div className="sm:text-center lg:text-left">
              <span className="block xl:inline">
                <h3 className="mb-4 mx-5 font-black text-4xl lg:text-6xl leading-tight">
                  <Link
                    href={`/blog/${postUrl}/${slug}`}
                    as={`/blog/${postUrl}/${slug}`}
                  >
                    <a className="hover:underline">{title}</a>
                  </Link>
                </h3>
              </span>
              <div className="mb-4 mx-5 font-mono font-semibold text-gray-500">
                {new Intl.DateTimeFormat('en-US', options).format(
                  Date.parse(date)
                )}{' '}
                | <span className="text-red-800">{categories[0].title}</span>
              </div>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                <p className="text-xl mx-5 font-proper leading-relaxed mb-4 prose prose-lg">
                  <PortableText blocks={excerpt} serializers={serializers} />
                </p>
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start"></div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default HeroPost
