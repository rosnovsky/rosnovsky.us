import { PortableText } from '../lib/sanity'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-3xl font-proper mx-auto prose xl:prose-2xl lg:prose-xl md:prose-lg sm:prose-lg">
      <PortableText className="" blocks={content} />
    </div>
  )
}

export default PostBody
