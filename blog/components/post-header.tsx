import DateFormatter from './date-formatter'
import MainImage from './cover-image'
import PostTitle from './post-title'
import Author from '../types/author'
// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'

type Props = {
  title: string
  mainImage: string
  date: string
  author: Author
  excerpt: any
  categories: Record<any, any>[]
}

const PostHeader = ({ title, mainImage, date, excerpt, categories }: Props) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="object-cover mb-8 md:mb-16 sm:mx-0">
        <MainImage slug="" preview={false} title={title} src={mainImage} />
      </div>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 text-lg">
          <div className="mb-4 font-mono text-gray-500">
            {new Intl.DateTimeFormat('en-US', options).format(Date.parse(date))}{' '}
            |{' '}
            <span className="text-yellow-600">
              {categories.map((category) => category.title + ' | ')}
            </span>
          </div>
        </div>
        <div className="prose prose-2xl w-full font-proper leading-relaxed font-bold">
          <PortableText blocks={excerpt} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
