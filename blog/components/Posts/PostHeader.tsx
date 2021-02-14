import MainImage from '../Image/CoverImage'
import PostTitle from './PostTitle'

// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import { BlogPost } from '../..'

const PostHeader = ({
  title,
  mainImage,
  publishedAt,
  excerpt,
  categories,
}: {
  title: BlogPost['title']
  mainImage: BlogPost['mainImage']
  publishedAt: BlogPost['publishedAt']
  excerpt: BlogPost['excerpt']
  categories: BlogPost['categories']
}) => {
  return (
    <div className="relative py-16 overflow-hidden">
      <PostTitle>{title}</PostTitle>
      <div className="mx-0 mb-8 md:mb-16 sm:mx-0 border-1 rounded-xl">
        <MainImage preview={false} title={title} src={mainImage} />
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-lg">
          <div className="mb-4 font-mono text-gray-700">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            }).format(Date.parse(publishedAt))}{' '}
            *{' '}
            <span className="text-green-900 font-medium">
              {categories.map((category) =>
                categories.length > 1
                  ? `${category.title} * `
                  : `${category.title}`
              )}
            </span>
          </div>
        </div>
        <div className="text-2xl text-gray-600 font-medium leading-8">
          <PortableText blocks={excerpt} />
        </div>
      </div>
      <div className="hidden lg:block lg:absolute lg:inset-1 lg:h-full lg:w-5/6">
        <div className="relative h-full text-lg max-w-prose mx-auto z-50">
          <svg
            className="absolute top-12 left-full transform translate-x-32"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  className="text-green-900 opacity-10"
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
            ></rect>
          </svg>
          <svg
            className="absolute top-1/2 right-full transform -translate-1/2 -translate-x-32"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  className="text-green-900 opacity-10"
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
            ></rect>
          </svg>
          <svg
            className="absolute bottom-12 left-full transform translate-x-32"
            width="404"
            height="384"
            fill="none"
            viewBox="0 0 404 384"
          >
            <defs>
              <pattern
                id="d3eb07ae-5182-43e6-857d-35c643af9034"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect
                  className="text-green-900 opacity-10"
                  x="0"
                  y="0"
                  width="4"
                  height="4"
                  fill="currentColor"
                ></rect>
              </pattern>
            </defs>
            <rect
              width="404"
              height="384"
              fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
            ></rect>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default PostHeader
