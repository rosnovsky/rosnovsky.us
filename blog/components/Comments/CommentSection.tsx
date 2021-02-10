import CommentForm from './CommentForm'
import Comments from './Comments'
import { BlogPost, PostComment } from '../..'
import { useUser } from '@auth0/nextjs-auth0'

const CommentSection = ({
  comments,
  postId,
}: {
  comments: PostComment[]
  postId: BlogPost['_id']
}) => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="mx-auto prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl">
      <h3 className="text-center">Comments</h3>
      <div className="flex flex-col w-full">
        <CommentForm user={user} postId={postId} />
        <Comments comments={comments} />
      </div>
    </div>
  )
}

export default CommentSection
