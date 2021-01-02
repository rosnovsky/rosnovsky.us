import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../utils/sanity'

const MainImage = ({ title, src, slug, preview, featured }: any) => {
  const imageFile =
    urlFor(src.asset.url).width(710).height(455).format('jpg').url() || ''

  const image = featured ? (
    <div className="relative overflow-hidden inner-shadow shadow-xl hover:shadow-2xl transition-shadow duration-200">
      <span className="absolute xl:top-10 xl:right-10 top-5 right-5 xs:text-lg xl:text-3xl lg:text-xl md:text-lg font-black z-50 inline-flex items-center px-3 py-1 lg:px-8 lg:py-3 rounded-full text-sm bg-red-100 text-red-800 transform rotate-6">
        FEATURED
      </span>
      {/* <div className="absolute overflow-hidden object-cover mx-auto my-auto">
          <Image
            src={src.asset.metadata.lqip}
            alt={`Cover Image for ${src.asset.title}`}
            width={710}
            height={455}
            loading="eager"
            objectFit="contain"
          />
        </div> */}
      <Image
        src={imageFile}
        width={710}
        height={455}
        alt={`Cover Image for ${title}`}
        layout={'responsive'}
        loading="lazy"
        // priority={preview ? false : true}
        className="object-cover shadow-inner hover:shadow-md transition-opacity ease-out opacity-100 duration-500"
      />
    </div>
  ) : (
    <div className="relative overflow-hidden inner-shadow shadow-xl hover:shadow-2xl transition-shadow duration-200">
      {/* <div className="absolute overflow-hidden object-cover mx-auto my-auto">
          <Image
            src={src.asset.metadata.lqip}
            alt={`Cover Image for ${src.asset.caption}`}
            // width={preview ? 710 : 1496}
            // height={
            //   preview
            //     ? 710 / src.asset.metadata.dimensions.aspectRatio - 100
            //     : 1496 / src.asset.metadata.dimensions.aspectRatio - 200
            // }
            width={preview ? 710 : 1560}
            height={
              preview
                ? 710 / src.asset.metadata.dimensions.aspectRatio - 100
                : 710
            }
            loading="eager"
            objectFit="contain"
          />
        </div>
      </div> */}
      <Image
        src={
          urlFor(src.asset.url)
            .width(preview ? 710 : 1500)
            .height(preview ? 455 : 1000)
            .format('jpg')
            .url() || ''
        }
        width={preview ? 710 : 1500}
        height={preview ? 455 : 1000}
        alt={`Cover Image for ${title}`}
        layout={'responsive'}
        loading="lazy"
        className="object-cover shadow-inner hover:shadow-md transition-opacity ease-out opacity-100 duration-500"
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
