import mongoose from 'mongoose'
const Schema = mongoose.Schema

const UserSchema = new Schema({
  id: { type: String },
})

export default mongoose.model('users', UserSchema)
