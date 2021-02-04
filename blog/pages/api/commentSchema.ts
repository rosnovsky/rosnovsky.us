import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema({
  author: {
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
  },
  postId: { type: String, requires: true },
  content: { type: String, required: true },
  commentTimestamp: { type: Date, required: true },
  sentiment: { type: Number, default: 50 },
  status: { type: String, default: 'new' },
  likes: { type: Number, default: 0 },
  savedTimestamp: { type: Date, default: Date.now() },
})
