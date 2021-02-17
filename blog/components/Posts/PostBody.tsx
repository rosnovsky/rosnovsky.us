// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import { BlogPost } from '../..'
import serializers from '../PortableText/serializers'

type Props = {
  content: Record<any, any>[]
}

const PostBody = ({ content }: { content: BlogPost['body'] }) => {
  return (
    <>
      <div className="max-w-4xl font-body prose prose-xl text-gray-700 mx-auto leading-9 z-0">
        <PortableText className="" blocks={content} serializers={serializers} />
      </div>
      {/*  */}
    </>
  )
}

export default PostBody
