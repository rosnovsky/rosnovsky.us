import { BlogPage } from '../..'
import MainImage from '../Image/CoverImage'
import PostTitle from './PageTitle'

const PostHeader = ({ title, mainImage }: BlogPage) => {
  return (
    <div className="mx-auto max-w-4xl">
      <PostTitle>{title}</PostTitle>
      <div className="object-cover mb-8 md:mb-16 sm:mx-0">
        {mainImage ? (
          <MainImage slug="" preview={false} title={title} src={mainImage} />
        ) : null}
      </div>
    </div>
  )
}

export default PostHeader
