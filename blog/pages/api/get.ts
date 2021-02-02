import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
import Comment from './commentSchema'
const Schema = mongoose.Schema
mongoose.set('debug', true)

export default async (req: NowRequest, res: NowResponse) => {
  const postId = req.query.postId

  await mongoose.connect(process.env.DB_URL || 'default', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  const comments = await Comment.find({ postId: postId })
  res.status(200).send({ comments: comments })
}