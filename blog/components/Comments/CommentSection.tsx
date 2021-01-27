import CommentForm from './CommentForm'
import Comment from './Comment'
import { useFetchUser } from '../../utils/user'

const CommentSection = ({ postId }: any) => {
  const { user, loading } = useFetchUser()
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
