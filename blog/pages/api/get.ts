import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
import { PostComment } from '../../index'
import { CommentSchema } from './commentSchema'

let Comment
try {
  Comment = mongoose.model('comments')
} catch (error) {
  Comment = mongoose.model('comments', CommentSchema)
}

export default async (req: NowRequest, res: NowResponse) => {
  const postId = req.query.postId
  await mongoose
    .connect(process.env.DB_URL || 'default', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    .then(async () => {
      const comments: PostComment[] = await Comment.find({
        'comment.postId': postId,
      })
      res.status(200).send({ comments })
      mongoose.disconnect()
    })
}
