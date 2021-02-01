import { PostComment } from '../..'
import Comment from './Comment'

const Comments = ({ comments }: any) => {
  const allComments: { comments: PostComment[] } = comments
  return (
    <div>
      {allComments &&
        allComments.comments.map((comment: PostComment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </div>
  )
}

export default Comments
