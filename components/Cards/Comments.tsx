import Link from "next/link";
import { PostComment } from "../..";
import Comment from "./Comment";

export default function Comments({ comments, postId, postTitle }: {postId: string, postTitle: string, comments: PostComment[]}) {
  const sortedComments = comments.sort((a, b) => {
      return a.published_at > b.published_at ? -1 : 1;
  })

  return (
    <div className="my-10 w-full">
      <div className="text-right dark:text-white">ℹ <Link href="/blog/dynamic-comments-for-a-static-website" passHref><span className="text-xs text-black hover:underline cursor-pointer dark:text-white">How these comments work</span></Link></div>
      {sortedComments.filter(comment => comment.deleted !== true).map(comment => (<Comment key={comment.id} postComment={comment} postId={postId} postTitle={postTitle} />))}
    </div>
  )
}
