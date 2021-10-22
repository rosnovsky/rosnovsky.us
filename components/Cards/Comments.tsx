import { PostComment } from "../..";
import Comment from "./Comment";

export default function Comments(comments: { comments: PostComment[] }) {
  const sortedComments = comments.comments.sort((a, b) => {
      return a.published_at > b.published_at ? -1 : 1;
  })

  return (
    <div className="my-10">
      {sortedComments.filter(comment => comment.deleted !== true).map(comment => (<Comment key={comment.id} {...comment} />))}
    </div>
  )
}
