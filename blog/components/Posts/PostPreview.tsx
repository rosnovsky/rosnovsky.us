import { format } from 'date-fns'
import MainImage from '../Image/CoverImage'
import Link from 'next/link'
// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import serializers from '../PortableText/serializers'
import { Post } from '../..'

const PostPreview = ({
  title,
  mainImage,
  publishedAt,
  excerpt,
  categories,
  slug,
  socialCard,
}: Post) => {
  const postUrl = `${format(Date.parse(publishedAt), 'yyyy/MM/dd')}`
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

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
          <p className="text-sm font-medium text-indigo-600">
            <span className="text-red-900">
              {categories.map((category) => category.title + ' | ')}
            </span>
          </p>
          <div className="block mt-2">
            <p className="text-xl font-semibold text-gray-900">
              <Link as={`/blog/${postUrl}/${slug.current}`} href="/blog/[slug]">
                <span className="hover:underline text-3xl font-black cursor-pointer">
                  {title}
                </span>
              </Link>
            </p>
          </div>
          <p className="mt-3 text-base text-gray-500">
            <PortableText blocks={excerpt} serializers={serializers} />
          </p>
        </div>
        <div className="mt-6 flex items-center">
          <div className="flex space-x-1 text-sm text-gray-500">
            <time
              dateTime={new Intl.DateTimeFormat('en-US', options).format(
                Date.parse(publishedAt)
              )}
            >
              {new Intl.DateTimeFormat('en-US', options).format(
                Date.parse(publishedAt)
              )}{' '}
              |{' '}
            </time>
            <span aria-hidden="true">&middot;</span>
            <span>6 min read</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostPreview
