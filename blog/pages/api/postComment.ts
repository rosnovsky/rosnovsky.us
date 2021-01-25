import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: { type: String, required: true },
  postId: { type: String, requires: true },
  content: { type: String, required: true },
  commentTimestamp: { type: Date, required: true },
  savedTimestamp: { type: Date, default: Date.now() },
})

const Comment = mongoose.model('comments', CommentSchema)

export default async (req: NowRequest, res: NowResponse) => {
  const body = JSON.parse(req.body)

  const NewComment = new Comment({
    author: body.meta.author,
    content: body.content,
    commentTimestamp: body.meta.timestamp,
    postId: body.meta.postId,
  })

  await mongoose.connect(process.env.DB_URL || "default", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  NewComment.save({ checkKeys: false }, (err) => {
    if (err) return console.error(err)
    res.status(200).send(NewComment)
  })
}
