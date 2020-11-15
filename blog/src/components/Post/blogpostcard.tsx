import { Link } from 'gatsby'
import React from 'react'
import { getBlogUrl, relativeDate } from '../../utils/helpers'
import PortableText from '../PortableText/portableText'
import Figure from '../PortableText/figure'

function BlogPostPreview(props) {
  const categoryUrl = `/category/${props.categories[0].slug.current}`

  return (
    <div className="flex flex-col xs:text-center  md:max-w-lg lg:w-5xl xl:w-5xl h-full">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-lg leading-6 font-semibold text-orange-600">
            <Link to={categoryUrl} className="hover:underline">
              {props.categories[0].title}
            </Link>
          </p>
          <Link
            className="block"
            to={getBlogUrl(props.publishedAt, props.slug.current)}
          >
            <h3 className="mt-2 xs:text-2xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-5xl leading-6 font-black mb-5 text-gray-900">
              {props.title}
            </h3>
            <Figure node={props.mainImage} />
            <h4 className="text-gray-500 text-sm">
              {relativeDate(props.publishedAt)}
            </h4>
            <div className="mt-3 xs:hidden text-lg leading-6 text-gray-800">
              {props._rawExcerpt && (
                <div>
                  <PortableText blocks={props._rawExcerpt} />
                </div>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogPostPreview
