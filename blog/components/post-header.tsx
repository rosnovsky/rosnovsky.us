import DateFormatter from './date-formatter'
import MainImage from './cover-image'
import PostTitle from './post-title'
import Author from '../types/author'
import { PortableText } from '../lib/sanity'

type Props = {
  title: string
  mainImage: string
  date: string
  author: Author
  excerpt: any
}

const PostHeader = ({ title, mainImage, date, excerpt }: Props) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return (
    <>
      <PostTitle>{title}</PostTitle>
      {/* <div className="hidden md:block md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div> */}
      <div className="object-cover mb-8 md:mb-16 sm:mx-0">
        <MainImage slug="" preview={false} title={title} src={mainImage} />
      </div>
      <div className="max-w-4xl mx-auto">
        {/* <div className="block md:hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div> */}
        <div className="mb-6 text-lg">
          <div className="mb-4 font-mono font-semibold text-gray-500">
            {new Intl.DateTimeFormat('en-US', options).format(Date.parse(date))}
          </div>
        </div>
        <div className="prose prose-2xl w-full font-black">
          <PortableText blocks={excerpt} />
        </div>
      </div>
    </>
  )
}

export default PostHeader
