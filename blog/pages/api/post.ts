// import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
import auth from '../../utils/auth'
const Schema = mongoose.Schema
import { CommentSchema } from './commentSchema'
mongoose.set('debug', true)

let Comment
try {
  Comment = mongoose.model('comments')
} catch (error) {
  Comment = mongoose.model('comments', CommentSchema)
}

const UserSchema = new Schema({
  id: String,
  created_at: Date,
  email: String,
  email_verified: Boolean,
  family_name: String,
  given_name: String,
  name: String,
  nickname: String,
  picture: String,
  updated_at: Date,
  user_metadata: Object,
  app_metadata: Object,
  stats: { type: Object },
  lastUpdated: { type: Date, default: Date.now() },
})

const User: mongoose.Model<mongoose.Document<any>> = mongoose.models.User
  ? mongoose.models.User
  : mongoose.model('users', UserSchema)

export default async (req: any, res: any) => {
  // try {
  //   const session = await auth.getSession(req)
  //   const tokenCache = auth.tokenCache(req, res)
  //   const { accessToken } = await tokenCache.getAccessToken({
  //     scopes: ['post:comments'],
  //   })
  //   if (!accessToken) {
  //     throw new Error('Insufficient scope')
  //   }
  // } catch (error) {
  //   console.error(error)
  //   res.status(error.status || 403).end(error.message)
  //   return
  // }
  const body = JSON.parse(req.body)

  await mongoose.connect(process.env.DB_URL || 'default', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  try {
    User.findOneAndUpdate(
      { id: body.author.id },
      {
        $inc: { 'stats.comments': 1, 'stats.pending': 1 },
        lastUpdated: Date.now(),
      }
    )
  } catch (err) {
    console.log(err)
  }

  const updatedDoc = await User.findOne({ id: body.author.id })

  console.log(updatedDoc)

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
