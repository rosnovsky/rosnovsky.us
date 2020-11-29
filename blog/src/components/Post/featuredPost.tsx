import { Link } from 'gatsby';
import Img from 'gatsby-image';
import React from 'react';
import { getBlogUrl, relativeDate } from '../../utils/helpers';
import PortableText from '../PortableText/portableText';

function FeaturedPost({ post }) {
  const { title, publishedAt, slug, _rawExcerpt, mainImage } = post;

  return (
    <div className="flex flex-col xs:text-center md:w-xl lg:w-5xl xl:w-5xl h-full">
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          {/* <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium leading-5 bg-orange-100 text-orange-800">
            Featured
          </span> */}
          <Link className="block" to={getBlogUrl(publishedAt, slug.current)}>
            <h3 className="text-5xl leading-relaxed font-black text-orange-900">
              {title}
            </h3>
            <h4 className="text-gray-500 text-md mb-4">
              {relativeDate(publishedAt)}
            </h4>
            <Img
              className="w-full max-h-96"
              fluid={mainImage.asset.fluid}
              alt={mainImage.alt}
            />
            <div className="mt-3 prose prose-2xl leading-relaxed text-gray-800 xs:hidden">
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
  );
}

export default FeaturedPost;
