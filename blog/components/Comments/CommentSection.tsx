import CommentForm from './CommentForm'
import Comment from './Comment'

const CommentSection = ({ user = 'Tema', postId }: any) => {
  return (
    <div className="mx-auto prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl">
      <h3 className="text-center">Comments</h3>
      <div className="flex flex-col w-full">
        <CommentForm user={user} postId={postId} />
      </div>
      <Comment postId={postId} />
    </div>
  )
}

export default CommentSection
