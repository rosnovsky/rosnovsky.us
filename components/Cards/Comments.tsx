import { PostComment } from "../..";
import Comment from "./Comment";

export default function Comments(comments) {
  return (
    <div>
      {comments.comments.map(comment => (<Comment key={comment.id} {...comment} />))}
    </div>
  )
}
