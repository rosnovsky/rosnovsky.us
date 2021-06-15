import { PostComment } from "../..";


export default function Comment({ author, postedAt, content, status }: PostComment) {
  return (
    <div>
      <div>{author.user!.name}</div>
      <div>{postedAt.date}</div> 
      <div>{content}</div> 
      <div>{status.flagged === "other" ? "Flagged" : "Flag"}</div>
    </div>
  )
}
