import { NowRequest, NowResponse } from '@vercel/node'
import mongoose from 'mongoose'
const Schema = mongoose.Schema
mongoose.set('debug', true)

const UserSchema = new Schema({
  stats: { type: Object },
  lastUpdated: { type: Date, default: Date.now() },
})
const User = mongoose.model('users', UserSchema)

export default async (req: NowRequest, res: NowResponse) => {
  const body = JSON.parse(req.body)
}
