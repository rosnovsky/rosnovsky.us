import { VscVerified } from 'react-icons/vsc'
import { PostComment } from '../..'

const Comment = ({ comment }: { comment: PostComment }) => {
  // console.info(comment)
  return (
    <div className="p-10 flex space-x-10 my-6 bg-gray-100 rounded-lg">
      <div className="flex flex-col w-1/5 items-center space-y-5">
        <img
          className="w-20 h-20 rounded-full bg-gray-400 flex ring-8 ring-white"
          src={comment.author.picture}
          alt=""
        />
        <div className="flex-1 text-2xl">
          <div className="text-sm">
            <a href="#" className="font-medium text-lg text-gray-900">
              {comment.author?.name || comment.author?.nickname}
            </a>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            {new Date(comment.comment.commentTimestamp).toLocaleString(
              'en-US',
              {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              }
            )}
          </p>
        </div>
      </div>
      <div className="text-gray-800 text-2xl w-4/5">
        {comment.comment.content}
      </div>
    </div>
  )
}

export default Comment
