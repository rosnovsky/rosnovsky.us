import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../utils/sanity'

const MainImage = ({ title, src, slug, preview, featured }: any) => {
  const imageFile =
    urlFor(src.asset.url).width(710).height(455).format('jpg').url() || ''

  const image = featured ? (
    <div className="relative overflow-hidden">
      <Image
        src={imageFile}
        width={710}
        height={455}
        alt={`Cover Image for ${title}`}
        layout={'responsive'}
        priority
        // priority={preview ? false : true}
        className="object-cover shadow-inner"
      />
    </div>
  ) : (
    <div className="relative overflow-hidden inner-shadow">
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
