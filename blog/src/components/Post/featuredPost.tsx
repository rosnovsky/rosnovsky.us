import { format } from 'date-fns'
import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj, getBlogUrl } from '../../utils/helpers'
import { imageUrlFor } from '../../utils/imageUrl'
import PortableText from '../PortableText/portableText'

function FeaturedPost({ post }) {
  const {
    title,
    mainImage,
    publishedAt,
    slug,
    categories,
    _rawExcerpt
  } = post[0]
  console.warn(post)

  return (
    <div className="flex flex-row xl:rounded-lg md:rounded-md shadow-lg overflow-hidden h-full mt-10">
      <div className="">
        <Link className="block" to={getBlogUrl(publishedAt, slug.current)}>
          {mainImage && mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(mainImage))
                .width(635)
                .height(Math.floor((9 / 16) * 600))
                .auto('format')
                .url()}
              alt={mainImage.alt}
            />
          )}
        </Link>
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm leading-5 font-medium text-orange-600">
            <Link to="/" className="hover:underline">
              {categories}
            </Link>
          </p>
          <Link className="block" to={getBlogUrl(publishedAt, slug.current)}>
            <h3 className="text-5xl leading-normal font-bold text-black">
              {title}
            </h3>
            <div className="mt-3 text-base leading-6 text-gray-500">
              {_rawExcerpt && (
                <div>
                  <PortableText blocks={_rawExcerpt} />
                </div>
              )}
            </div>
          </Link>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex-shrink-0">
            <div className="ml-3">
              <p className="text-sm leading-5 font-medium text-gray-900">
                <Link to="/" className="hover:underline">
                  Roel Aufderhar
                </Link>
              </p>
              <div className="flex text-sm leading-5 text-gray-500">
                <time dateTime={format(Date.parse(publishedAt), 'yyyy-mm-dd')}>
                  {format(Date.parse(publishedAt), 'MMMM do, yyyy')}
                </time>
                <span className="mx-1">&middot;</span>
                <span>6 min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost
