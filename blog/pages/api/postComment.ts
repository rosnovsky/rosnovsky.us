import { NowRequest, NowResponse } from '@vercel/node'
const mongoose = require('mongoose')

const { Schema } = mongoose

const CommentSchema = new Schema({
  id: { type: mongoose.ObjectId, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: String, required: true },
})
// CommentSchema.index({ id: 1, author: 1 }, { unique: true })
const CommentModel = mongoose.model('comments', CommentSchema)

export default async (req: NowRequest, res: NowResponse) => {
  const body = JSON.parse(req.body)
  console.log(body)
  const Comment = new CommentModel({
    author: body.meta.author,
    content: body.content,
    timestamp: body.meta.timestamp,
  })
  res.status(200).send({ status: 'ok', Comment })
}
