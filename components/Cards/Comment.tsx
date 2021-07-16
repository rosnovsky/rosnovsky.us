import { PostComment } from "../..";
import {useUser} from "@auth0/nextjs-auth0"


export default function Comment(comment) {
  const { user } = useUser();
  return (
    <div className="my-10">
      <div>{comment.user_id}</div>
      <div>{comment.published_at}</div> 
      <div>{comment.comment}</div> 
      <div>{comment.flagged ? "Flagged" : "Flag"}</div>
      {user?.sub === comment.user_id ? <div>Delete</div> : null}
      {user?.sub === comment.user_id ? <div>Edit</div> : null}
    </div>
  )
}
