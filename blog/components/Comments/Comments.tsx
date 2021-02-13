import { PostComment } from '../..'
import Comment from './Comment'

const Comments = ({ comments }: any) => {
  const allComments: { comments: PostComment[] } = comments
  const sortedComments = allComments.comments.sort(
    (comment1: PostComment, comment2: PostComment) =>
      Date.parse(comment2.commentTimestamp) -
      Date.parse(comment1.commentTimestamp)
  )
  return (
    <div className="flex flex-col w-full">
      {allComments &&
        sortedComments.map((comment: PostComment) => (
          <Comment key={comment._id} comment={comment} />
        ))}
    </div>
  )
}

export default Comments
