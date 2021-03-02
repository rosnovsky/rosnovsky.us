import { PostComment } from '../..'
import Comment from './Comment'
import useSWR from 'swr'

const Comments = ({ comments, postId }: any) => {
  const allComments: { comments: PostComment[] } = comments

  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error }: any = useSWR(
    process.env.NODE_ENV === 'production'
      ? `https://rosnovsky.us/api/get?postId=${postId}`
      : `http://localhost:3000/api/get?postId=${postId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 1000,
      revalidateOnReconnect: true,
      errorRetryInterval: 10000,
    }
  )

  const sortedComments = data
    ? data.comments.sort(
        (comment1: PostComment, comment2: PostComment) =>
          comment2.comment.commentTimestamp - comment1.comment.commentTimestamp
      )
    : allComments.comments.sort(
        (comment1: PostComment, comment2: PostComment) =>
          comment2.comment.commentTimestamp - comment1.comment.commentTimestamp
      )

  return (
    <div className="flex flex-col w-full">
      {allComments &&
        sortedComments.map((comment: PostComment) => (
          <Comment key={comment.comment._id} comment={comment} />
        ))}
    </div>
  )
}

export default Comments
