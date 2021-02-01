import { VscVerified } from 'react-icons/vsc'
import { useState, useEffect } from 'react'
import { PostComment } from '../..'
import mongoose from 'mongoose'
import User from './UserSchema'

// const User = mongoose.model('userModel')

const Comment = ({ comment }: { comment: PostComment }) => {
  const [author, setAuthor]: any = useState()

  useEffect(() => {
    const fetchAuthor = async () => {
      await mongoose.connect(process.env.DB_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      })
      const user = await User.findOne({ id: comment.authorId })
      console.log(user)
      setAuthor(result)
      return user
    }
    setAuthor(fetchAuthor())
    const result = fetchAuthor()
  }, [])

  return (
    <div>
      <div className="border-2 border-gray-100 my-3" key={comment._id}>
        <div>
          <span className="font-mono font-semibold">Author ID: </span>
          {author.profile.email}
        </div>
        <div>
          <span className="font-mono font-semibold">Comment content: </span>
          {comment.content}
        </div>
        <div>
          <span className="font-mono font-semibold">Comment timestamp: </span>
          {comment.commentTimestamp}
        </div>
      </div>
    </div>
  )
}

export default Comment
