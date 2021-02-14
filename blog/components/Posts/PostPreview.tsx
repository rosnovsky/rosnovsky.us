import { format } from 'date-fns'
import MainImage from '../Image/CoverImage'
import Link from 'next/link'
// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import serializers from '../PortableText/serializers'
import { BlogPost } from '../..'

const PostPreview = ({
  title,
  mainImage,
  publishedAt,
  excerpt,
  categories,
  slug,
  socialCard,
}: BlogPost) => {
  const postUrl = `${format(Date.parse(publishedAt), 'yyyy/MM/dd')}`
  return (
    <div className="flex flex-col rounded-lg shadow-lg mb-10 overflow-hidden">
      <div className="flex-shrink-0">
        <MainImage
          preview={true}
          slug={`${postUrl}/${slug.current}`}
          title={title}
          src={mainImage}
        />
      </div>
      <div className="flex-1 bg-white p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-md font-mono text-green-900">
            <span className="text-green-900">
              {categories.map((category) =>
                categories.length > 1
                  ? ` * ${category.title}`
                  : `${category.title}`
              )}
            </span>
            <span className="flex mt-2 items-center">
              <div className="flex space-x-1 text-sm text-gray-700">
                <time
                  dateTime={new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(Date.parse(publishedAt))}
                >
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  }).format(Date.parse(publishedAt))}{' '}
                </time>
                {/* <span aria-hidden="true">&middot;</span>
            <span>6 min read</span> */}
              </div>
            </span>
          </p>
          <div className="block my-10">
            <p className="text-xl font-semibold text-gray-900">
              <Link as={`/blog/${postUrl}/${slug.current}`} href="/blog/[slug]">
                <span className="hover:underline text-3xl text-green-900 font-black cursor-pointer">
                  {title}
                </span>
              </Link>
            </p>
          </div>
          <p className="mt-3 prose prose-lg text-gray-600">
            <PortableText blocks={excerpt} serializers={serializers} />
          </p>
        </div>
      </div>
    </div>
  )
}

export default PostPreview
