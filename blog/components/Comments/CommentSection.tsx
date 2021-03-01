import CommentForm from './CommentForm'
import Comments from './Comments'
import { BlogPost, PostComment } from '../..'
import { useUser } from '@auth0/nextjs-auth0'

const CommentSection = ({
  comments,
  _id,
}: {
  comments: BlogPost['comments']
  _id: PostComment['comment']['_id']
}) => {
  const { user, error, isLoading } = useUser()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div className="container font-body max-w-5xl mx-auto">
      <h3
        className="text-center font-heading text-4xl font-black my-10"
        id="comments"
      >
        Comments
      </h3>
      <div className="flex w-full flex-wrap">
        <div className="w-full">
          <CommentForm user={user} postId={_id} />
        </div>
        <Comments comments={comments} postId={_id} />
      </div>
    </div>
  )
}

export default CommentSection
