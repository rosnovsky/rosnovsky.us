import { VscVerified } from 'react-icons/vsc'
import { PostComment } from '../..'

const Comment = ({ comment }: { comment: PostComment }) => {
  console.log(comment.author)
  return (
    <div>
      <div className="border-2 border-gray-100 my-3" key={comment._id}>
        <div>
          <span className="font-mono font-semibold">Author ID: </span>
          {/* {authors.map((author: any) => author.id === comment.authorId)} */}
        </div>
        <div>
          <span className="font-mono font-semibold">Comment content: </span>
          {comment.content}
        </div>
        <div>
          <span className="font-mono font-semibold">Comment timestamp: </span>
          {comment.commentTimestamp}
        </div>
      </div>
    </div>
  )
}

export default Comment
