// import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
import auth from '../../utils/auth'
const Schema = mongoose.Schema
import Comment from './commentSchema'
mongoose.set('debug', true)

export default async (req: any, res: any) => {
  const UserSchema = new Schema({
    id: String,
    profile: {
      type: Object,
    },
    stats: { type: Object },
    lastUpdated: { type: Date, default: Date.now() },
  })

  const User = mongoose.model('users') || mongoose.model('users', UserSchema)

  try {
    const session = await auth.getSession(req)
    const tokenCache = auth.tokenCache(req, res)
    const { accessToken } = await tokenCache.getAccessToken({
      scopes: ['post:comments'],
    })
    if (!accessToken) {
      throw new Error('Insufficient scope')
    }
  } catch (error) {
    console.error(error)
    res.status(error.status || 403).end(error.message)
    return
  }
  const body = JSON.parse(req.body)

  await mongoose.connect(process.env.DB_URL || 'default', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  const user = User.findOne({ id: body.author.id })
  const update = {
    $inc: { 'stats.comments': 1, 'stats.pending': 1 },
    lastUpdated: Date.now(),
  }
  await user.updateOne(update)
  const updatedDoc = await User.findOne({ id: body.author.id })

  const NewComment = new Comment({
    author: updatedDoc,
    content: body.content,
    commentTimestamp: body.meta.timestamp,
    postId: body.meta.postId,
    status: 'new',
    likes: 0,
  })

  NewComment.save({ checkKeys: false }, (err) => {
    if (err) return console.error(err)
  })

  res.status(200).send({ comment: NewComment, user: updatedDoc })
}
