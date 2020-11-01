import { Link } from 'gatsby'
import React from 'react'
import { getBlogUrl } from '../../utils/helpers'
import PortableText from '../PortableText/portableText'

function FeaturedPost({ post }) {
  const { title, publishedAt, slug, categories, _rawExcerpt } = post[0]

  return (
    <div className="flex flex-col md:w-1/2 lg:w-1/2 xl:w-1/2 h-full">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <span className="inline-flex items-center px-3 py-0.5 mb-3 rounded-full text-sm font-medium leading-5 bg-orange-100 text-orange-800">
            Featured
          </span>
          <Link className="block" to={getBlogUrl(publishedAt, slug.current)}>
            <h3 className="mt-2 mb-5 text-5xl leading-7 font-semibold text-gray-900">
              {title}
            </h3>
            <p className="text-sm xs:hidden leading-5 font-medium text-orange-600"></p>
            <div className="mt-3 text-lg leading-relaxed text-gray-800 xs:hidden">
              {_rawExcerpt && (
                <div>
                  <PortableText blocks={_rawExcerpt} />
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default FeaturedPost
