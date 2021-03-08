import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../utils/sanity'

const MainImage = ({ title, src, slug, preview, featured }: any) => {
  const imageFile =
    urlFor(src.asset.url).width(710).height(455).format('jpg').url() || ''
  const lqip =
    urlFor(src.asset.url)
      .format('jpg')
      .width(45)
      .height(30)
      .quality(10)
      .url() || 'https://rosnovsky.us/favicon.png'

  const image = featured ? (
    <div className="relative overflow-hidden rounded-lg">
      <Image
        src={imageFile}
        width={710}
        height={455}
        alt={`Cover Image for ${title}`}
        layout={'responsive'}
        priority
        // priority={preview ? false : true}
        className="object-cover shadow-inner rounded-lg"
      />
    </div>
  ) : (
    <div className="relative overflow-hidden inner-shadow">
      <div className="absolute overflow-hidden object-cover">
        <Image
          src={lqip}
          alt={`Cover Image for ${src.asset.title}`}
          width={1500}
          height={1000}
          objectFit="contain"
          priority
        />
      </div>
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
        className={`shadow-inner hover:shadow-md transition-opacity ease-out opacity-100 duration-500 ${
          preview ? '' : 'rounded-lg'
        }`}
      />
    </div>
  )

  return (
    <div className="sm:mx-0 z-0">
      {slug ? (
        <Link
          href={{
            pathname: '/blog/[post]/',
            query: { post: slug },
          }}
        >
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default MainImage
