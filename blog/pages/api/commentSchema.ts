import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema({
  authorId: String,
  postId: { type: String, requires: true },
  content: { type: String, required: true },
  commentTimestamp: { type: Date, required: true },
  sentiment: { type: Number, default: 50 },
  status: { type: String, default: 'new' },
  likes: { type: Number, default: 0 },
  savedTimestamp: { type: Date, default: Date.now() },
})
