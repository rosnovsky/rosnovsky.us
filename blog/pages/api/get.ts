import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
import { PostComment } from '../../index'
import { CommentSchema } from './commentSchema'
// mongoose.set('debug', true)

const AuthorSchema = new mongoose.Schema({
  id: String,
  email_verified: Boolean,
  family_name: String,
  given_name: String,
  name: String,
  nickname: String,
  picture: String,
  stats: { type: Object },
})

let Comment
try {
  Comment = mongoose.model('comments')
} catch (error) {
  Comment = mongoose.model('comments', CommentSchema)
}

export default async (req: NowRequest, res: NowResponse) => {
  const postId = req.query.postId
  await mongoose.connect(process.env.DB_URL || 'default', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  const comments: PostComment[] = await Comment.find({
    'comment.postId': postId,
  })
  mongoose.disconnect()
  res.status(200).send({ comments })
}
