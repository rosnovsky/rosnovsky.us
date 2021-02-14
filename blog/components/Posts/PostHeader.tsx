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
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return (
    <div className="relative py-16 overflow-hidden">
      <PostTitle>{title}</PostTitle>
      <div className="mx-0 mb-8 md:mb-16 sm:mx-0 border-1 rounded-xl">
        <MainImage preview={false} title={title} src={mainImage} />
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-lg">
          <div className="mb-4 font-mono text-gray-700">
            {new Intl.DateTimeFormat('en-US', options).format(
              Date.parse(publishedAt)
            )}{' '}
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
    </div>
  )
}

export default PostHeader
