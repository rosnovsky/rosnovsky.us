import { format } from 'date-fns'
import { Link } from 'gatsby'
import React from 'react'
import { getBlogUrl } from '../../utils/helpers'
import PortableText from '../PortableText/portableText'

function BlogPostPreview(props) {
  return (
    <div className="flex flex-col md:w-1/2 lg:w-1/2 xl:w-1/2 h-full">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm leading-5 font-medium text-orange-600">
            <Link
              to={props.categories[0].slug.current}
              className="hover:underline"
            >
              {props.categories[0].title}
            </Link>
          </p>
          <Link
            className="block"
            to={getBlogUrl(props.publishedAt, props.slug.current)}
          >
            <h3 className="mt-2 text-3xl leading-7 font-semibold text-gray-900">
              {props.title}
            </h3>
            <div className="mt-3 xs:hidden text-base leading-6 text-gray-500 sm:truncate">
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
