import CommentForm from './CommentForm'
import Comment from './Comment'
import { useState, useEffect } from 'react'
import { useFetchUser } from '../../utils/user'

const CommentSection = ({ postId }: any) => {
  const { user, loading } = useFetchUser()
  const [comments, setComments]: any = useState()

  useEffect(() => {
    const fetchComments = async () => {
      await fetch(`/api/get?postId=${postId}`, {
        method: 'GET',
      })
        .then((result) => result.json())
        .then((comments: any) => {
          setComments(comments)
        })
    }
    fetchComments()
  }, [])
  console.log(comments)

  return (
    <div className="mx-auto prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl">
      <h3 className="text-center">Comments</h3>
      {/* {comments.lenght > 0 ? comments[0].content : null} */}
      <div className="flex flex-col w-full">
        <CommentForm user={user} postId={postId} />
      </div>
    </div>
  )
}

export default CommentSection
