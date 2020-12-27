import { PortableText } from '../lib/sanity'
import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-3xl mx-auto prose prose-lg">
      <PortableText className="" blocks={content} />
    </div>
  )
}

export default PostBody
