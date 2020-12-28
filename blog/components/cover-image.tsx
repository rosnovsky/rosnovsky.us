import Link from 'next/link'
import Image from 'next/image'
import ProgressiveImage from 'react-progressive-image'

const MainImage = ({ title, src, slug, preview, featured }: any) => {
  const image = featured ? (
    <div className="relative overflow-hidden inner-shadow shadow-xl hover:shadow-2xl transition-shadow duration-200">
      <span className="absolute xl:top-10 xl:right-10 top-5 right-5 xs:text-lg xl:text-3xl lg:text-xl md:text-lg font-black z-50 inline-flex items-center px-3 py-1 lg:px-8 lg:py-3 rounded-full text-sm bg-red-100 text-red-800 transform rotate-6">
        FEATURED
      </span>
      <ProgressiveImage
        delay={3000}
        src={src.url}
        placeholder={src.asset.metadata.lqip}
      >
        {(src: string) => (
          <div>
            <Image
              src={src}
              width={preview ? 840 : 1560}
              height={preview ? 344 : 1000}
              alt={`Cover Image for ${title}`}
              layout={'responsive'}
              priority
              className="object-cover shadow-inner hover:shadow-md transition-opacity ease-out opacity-100 duration-500"
            />
          </div>
        )}
      </ProgressiveImage>
    </div>
  ) : (
    <div className="inner-shadow shadow-sm">
      <ProgressiveImage
        delay={2000}
        src={src.url}
        placeholder={src.asset.metadata.lqip}
      >
        {(src: string) => (
          <Image
            src={src}
            loading="lazy"
            width={preview ? 840 : 1560}
            height={preview ? 344 : 1000}
            alt={`Cover Image for ${title}`}
            layout={'responsive'}
            className="object-cover shadow-inner hover:shadow-md"
          />
        )}
      </ProgressiveImage>
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
