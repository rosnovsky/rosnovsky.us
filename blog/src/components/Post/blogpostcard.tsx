import { Link } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import { getBlogUrl, relativeDate } from '../../utils/helpers'
import PortableText from '../PortableText/portableText'

function BlogPostPreview(props) {
  const categoryUrl = `/category/${props.categories[0].slug.current}`

  return (
    <div className="flex flex-col xs:text-center md:max-w-lg lg:w-5xl xl:w-5xl h-full mb-5">
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
            <h3 className="mt-2 xs:text-4xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-4xl leading-6 font-semibold mb-2 text-gray-900">
              {props.title}
            </h3>
            <h4 className="text-gray-500 text-sm mb-2">
              {relativeDate(props.publishedAt)}
            </h4>
            <div className="h-sm">
              <Img
                className="h-64"
                fluid={props.mainImage.asset.fluid}
                alt={props.mainImage.alt}
              />
            </div>
          </Link>
          <div className="mt-5 xs:hidden text-lg leading-6 text-gray-800">
            {props._rawExcerpt && (
              <div>
                <PortableText blocks={props._rawExcerpt} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogPostPreview
