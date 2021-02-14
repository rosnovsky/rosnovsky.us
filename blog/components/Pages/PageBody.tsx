// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import serializers from '../PortableText/serializers'

type Props = {
  content: Record<any, any>[]
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-4xl mx-auto prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl">
      <PortableText className="" blocks={content} serializers={serializers} />
    </div>
  )
}

export default PostBody
