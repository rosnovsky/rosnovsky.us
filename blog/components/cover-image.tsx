import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'

const MainImage = ({ title, src, slug, preview, featured }: any) => {
  const image = featured ? (
    <div className="relative object-cover inner-shadow shadow-xl hover:shadow-2xl transition-shadow duration-200">
      <span className="absolute xl:top-10 xl:right-10 top-5 right-5 xs:text-lg xl:text-3xl lg:text-xl md:text-lg font-black z-50 inline-flex items-center px-3 py-1 lg:px-8 lg:py-3 rounded-full text-sm bg-red-100 text-red-800 transform rotate-6">
        FEATURED
      </span>
      <Image
        src={
          urlFor(src.asset)
            .format('jpg')
            .maxWidth(1500)
            .maxHeight(1000)
            .url() || 'default.jpg'
        }
        priority
        quality={100}
        width={preview ? 840 : 1500}
        height={preview ? 344 : 1000}
        alt={`Cover Image for ${title}`}
        layout={'responsive'}
        className="object-cover inner-shadow shadow-xl hover:shadow-2xl transition-shadow duration-200"
      />
    </div>
  ) : (
    <div className="object-cover inner-shadow shadow-sm transition-shadow duration-200">
      <Image
        src={
          urlFor(src.asset)
            .format('jpg')
            .maxWidth(1500)
            .maxHeight(1000)
            .url() || 'default.jpg'
        }
        width={preview ? 840 : 1560}
        height={preview ? 344 : 1000}
        alt={`Cover Image for ${title}`}
        layout={'responsive'}
        className="object-cover shadow-inner hover:shadow-md transition-shadow duration-200"
      />
    </div>
  )

  return (
    <div className="sm:mx-0 z-0">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default MainImage
