import { VscVerified } from 'react-icons/vsc'
import { useState, useEffect } from 'react'
import { PostComment } from '../..'

const Comments = ({ comments }: any) => {
  const allComments: { comments: PostComment[] } = comments
  console.log(allComments)
  return (
    <div>
      {allComments &&
        allComments.comments.map((comment) => (
          <div className="border-2 border-gray-100 my-3">
            <div>
              <span className="font-mono font-semibold">Author ID: </span>
              {comment.authorId}
            </div>
            <div>
              <span className="font-mono font-semibold">Comment content: </span>
              {comment.content}
            </div>
            <div>
              <span className="font-mono font-semibold">
                Comment timestamp:{' '}
              </span>
              {comment.commentTimestamp}
            </div>
          </div>
        ))}
    </div>
  )
}

export default Comments
