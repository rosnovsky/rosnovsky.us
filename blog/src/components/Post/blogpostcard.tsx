import { Link } from 'gatsby'
import React from 'react'
import { getBlogUrl } from '../../utils/helpers'
import PortableText from '../PortableText/portableText'
import { relativeDate } from '../../utils/helpers'

function BlogPostPreview(props) {
  const categoryUrl = `/category/${props.categories[0].slug.current}`

  return (
    <div className="flex flex-col xs:text-center  md:max-w-lg lg:w-5xl xl:w-5xl h-full">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-md leading-5 font-medium text-orange-600">
            <Link to={categoryUrl} className="hover:underline">
              {props.categories[0].title}
            </Link>
          </p>
          <Link
            className="block"
            to={getBlogUrl(props.publishedAt, props.slug.current)}
          >
            <h3 className="mt-2 xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl leading-6 font-semibold text-gray-900">
              {props.title}
            </h3>
            <h4 className="text-gray-500 text-sm">
              {relativeDate(props.publishedAt)}
            </h4>
            <div className="mt-3 xs:hidden text-base leading-6 text-gray-500">
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
