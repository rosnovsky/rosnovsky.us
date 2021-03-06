// import { NowRequest, NowResponse } from '@vercel/node'
import { PostComment } from '../../index'
import mongoose from 'mongoose'
import { withApiAuthRequired, getSession } from '@auth0/nextjs-auth0'

const Schema = mongoose.Schema
import { CommentSchema } from './commentSchema'
// mongoose.set('debug', true)

let Comment
try {
  Comment = mongoose.model('comments')
} catch (error) {
  Comment = mongoose.model('comments', CommentSchema)
}

const UserSchema = new Schema({
  id: String,
  stats: { type: Object },
  lastUpdated: { type: Date, default: Date.now() },
})

let User: mongoose.Model<mongoose.Document<any>>
try {
  User = mongoose.model('users')
} catch (error) {
  mongoose.model('users', UserSchema)
}

export default withApiAuthRequired(async (req: any, res: any) => {
  const body: PostComment = JSON.parse(req.body)
  const session = getSession(req, res)
  if (!session) res(401).send('Nope.')
  const { user } = session
  if (body.author.id !== user.sub) res(403).send('You sneaky bastard!')

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

  const saveComment: PostComment = {
    author: {
      id: user.sub,
      email_verified: user.email_verified,
      family_name: user.family_name,
      given_name: user.given_name,
      name: user.name,
      nickname: user.nickname,
      picture: user.picture,
    },
    comment: {
      authorId: user.sub,
      content: body.comment.content,
      commentTimestamp: body.comment.commentTimestamp,
      postId: body.comment.postId,
      status: 'new',
      likes: 0,
    },
  }

  const NewComment = new Comment(saveComment)

  NewComment.save({ checkKeys: false }, (err) => {
    if (err) return console.error(err)
  })

  mongoose.disconnect()

  res.status(200).send({ comment: NewComment })
  // } catch (error) {
  //   console.error(error)
  //   res.status(error.status || 403).end(error.message)
  //   return
  // }
})
