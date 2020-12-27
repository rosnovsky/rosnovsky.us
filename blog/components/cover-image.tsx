import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../lib/sanity'

const MainImage = ({ title, src, slug, preview, featured }: any) => {
  const image = featured ? (
    <div className="relative">
      <span className="absolute xl:top-10 xl:right-10 top-5 right-5 xs:text-lg xl:text-3xl lg:text-xl md:text-lg font-black text-red-500 z-50 inline-flex items-center px-3 py-1 lg:px-8 lg:py-3 rounded-full text-sm font-medium bg-red-100 text-red-800 transform rotate-6">
        FEATURED
      </span>
      <Image
        src={
          urlFor(src.asset)
            .format('jpg')
            .maxWidth(1860)
            .maxHeight(1000)
            .url() || 'default.jpg'
        }
        priority
        loading="eager"
        width={preview ? 840 : 1860}
        height={preview ? 344 : 1000}
        alt={`Cover Image for ${title}`}
        layout={'responsive'}
        className={cn('object-cover shadow-small', {
          'hover:shadow-medium object-cover transition-shadow duration-200': slug,
        })}
      />
    </div>
  ) : (
    <Image
      src={
        urlFor(src.asset).format('jpg').maxWidth(1860).maxHeight(1000).url() ||
        'default.jpg'
      }
      priority
      loading="eager"
      width={preview ? 840 : 1860}
      height={preview ? 344 : 1000}
      alt={`Cover Image for ${title}`}
      layout={'responsive'}
      className={cn('object-cover shadow-small', {
        'hover:shadow-medium object-cover transition-shadow duration-200': slug,
      })}
    />
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
