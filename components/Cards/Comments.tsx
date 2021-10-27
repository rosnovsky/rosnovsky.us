import { PostComment } from "../..";
import Comment from "./Comment";

export default function Comments({ comments, postId, postTitle }: {postId: string, postTitle: string, comments: PostComment[]}) {
  const sortedComments = comments.sort((a, b) => {
      return a.published_at > b.published_at ? -1 : 1;
  })

  return (
    <div className="my-10">
      {sortedComments.filter(comment => comment.deleted !== true).map(comment => (<Comment key={comment.id} postComment={comment} postId={postId} postTitle={postTitle} />))}
    </div>
  )
}
