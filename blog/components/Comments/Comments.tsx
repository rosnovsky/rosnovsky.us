import { PostComment } from '../..'
import Comment from './Comment'
import useSWR from 'swr'

const Comments = ({ comments, postId }: any) => {
  const allComments: { comments: PostComment[] } = comments

  const fetcher = (url: string) => fetch(url).then((res) => res.json())

  const { data, error }: any = useSWR(
    `http://localhost:3000/api/get?postId=${postId}`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 60000,
      revalidateOnReconnect: true,
      errorRetryInterval: 10,
    }
  )

  const sortedComments = data
    ? data.comments.sort(
        (comment1: PostComment, comment2: PostComment) =>
          Date.parse(comment2.commentTimestamp) -
          Date.parse(comment1.commentTimestamp)
      )
    : allComments.comments.sort(
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
