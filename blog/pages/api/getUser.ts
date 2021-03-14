import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
mongoose.set('debug', true)

const UserSchema = new Schema({
  id: { type: String },
})

const User = mongoose.models.User || mongoose.model('users', UserSchema)

export default async (req: NowRequest, res: NowResponse) => {
  const authorId = req.query.userId

  await mongoose.createConnection(process.env.DB_URL || 'default', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })

  const author = await User.findOne({ id: authorId })

  res.status(200).send({ author: author })
}
