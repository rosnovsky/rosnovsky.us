// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import { BlogPost } from '../..'
import serializers from '../PortableText/serializers'

const PostBody = ({ body }: { body: BlogPost['body'] }) => {
  return (
    <>
      <div className="max-w-4xl font-body prose font-thin prose-xl text-gray-700 mx-auto leading-9 z-0">
        <PortableText className="" blocks={body} serializers={serializers} />
      </div>
      {/*  */}
    </>
  )
}

export default PostBody
