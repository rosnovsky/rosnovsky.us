import { PortableText } from '../lib/sanity'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-4xl font-proper mx-auto prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl">
      <PortableText className="" blocks={content} />
    </div>
  )
}

export default PostBody
