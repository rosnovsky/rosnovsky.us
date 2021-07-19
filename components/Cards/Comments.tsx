import { PostComment } from "../..";
import Comment from "./Comment";

export default function Comments(comments: {comments: PostComment[]}) {
  return (
    <div className="my-10">
      {comments.comments.map(comment => (<Comment key={comment.id} {...comment} />))}
    </div>
  )
}
