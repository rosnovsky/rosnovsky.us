import mongoose from 'mongoose'
const Schema = mongoose.Schema

const CommentSchema = new Schema({
  author: {
    id: String,
    profile: {
      name: String,
      email: String,
    },
    stats: {
      comments: Number,
      pending: Number,
    },
  },
  postId: { type: String, requires: true },
  content: { type: String, required: true },
  commentTimestamp: { type: Date, required: true },
  sentiment: { type: Number, default: 50 },
  status: { type: String, default: 'new' },
  likes: { type: Number, default: 0 },
  savedTimestamp: { type: Date, default: Date.now() },
})

export default mongoose.model('comments', CommentSchema)
