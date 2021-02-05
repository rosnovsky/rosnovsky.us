import { VscVerified } from 'react-icons/vsc'
import { PostComment } from '../..'

const Comment = ({ comment }: { comment: PostComment }) => {
  return (
    <div className="bg-white px-4 py-5 sm:px-6">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={comment.author.picture}
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            <div className="hover:underline">
              {comment.author?.name || comment.author?.nickname}
            </div>
          </p>
          <p className="text-sm text-gray-500">
            <div className="hover:underline">
              {new Date(comment.commentTimestamp).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </p>
          <div>{comment.content}</div>
        </div>
      </div>
    </div>
    // <div>
    //   <div className="border-2 border-gray-100 my-3" key={comment._id}>
    //     <div>
    //       <span className="font-mono font-semibold">Author ID: </span>
    //       {comment.author?.profile.name || comment.author?.profile.email}
    //     </div>
    //     <div>
    //       <span className="font-mono font-semibold">Comment content: </span>
    //       {comment.content}
    //     </div>
    //     <div>
    //       <span className="font-mono font-semibold">Comment timestamp: </span>
    //       {new Date(comment.commentTimestamp).toLocaleString('en-US', {
    //         year: 'numeric',
    //         month: 'long',
    //         day: 'numeric',
    //       })}
    //     </div>
    //   </div>
    // </div>
  )
}

export default Comment
