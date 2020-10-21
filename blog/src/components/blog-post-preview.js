import { format } from 'date-fns'
import { Link } from 'gatsby'
import React from 'react'
import { buildImageObj, cn, getBlogUrl } from '../lib/helpers'
import { imageUrlFor } from '../lib/image-url'
import PortableText from './portableText'


function BlogPostPreview(props) {
  return (
    <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
      <div className="flex-shrink-0">
        <Link
          className="block"
          to={getBlogUrl(props.publishedAt, props.slug.current)}
        >
          {props.mainImage && props.mainImage.asset && (
            <img
              src={imageUrlFor(buildImageObj(props.mainImage))
                .width(600)
                .height(Math.floor((9 / 16) * 600))
                .auto('format')
                .url()}
              alt={props.mainImage.alt}
            />
          )}
        </Link>
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm leading-5 font-medium text-orange-600">
            <Link to="/" className="hover:underline">
              {props.categories}
            </Link>
          </p>
          <Link
            className="block"
            to={getBlogUrl(props.publishedAt, props.slug.current)}
          >
            <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
              {props.title}
            </h3>
            <div className="mt-3 text-base leading-6 text-gray-500">
              {props._rawExcerpt && (
                <div>
                  <PortableText blocks={props._rawExcerpt} />
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
                <time datetime={format(Date.parse(props.publishedAt), 'yyyy-mm-dd')}>
                  {format(Date.parse(props.publishedAt), 'MMMM do, yyyy')}
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

export default BlogPostPreview
