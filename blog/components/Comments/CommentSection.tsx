import CommentLogin from './CommentLogin'
import CommentForm from './CommentForm'
import Comment from './Comment'

const CommentSection = () => {
  return (
    <div className="mx-auto prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl">
      <h3 className="text-center">Comments</h3>
      <CommentForm />
      <CommentLogin />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  )
}

export default CommentSection
