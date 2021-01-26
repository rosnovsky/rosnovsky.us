import { useState, useEffect } from 'react'
import DOMPurify from 'dompurify'

const CommentForm = ({ user, postId }: { user: any; postId: string }) => {
  const [comment, setComment] = useState('')
  const [posting, setPosting] = useState(false)

  const updateComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = JSON.stringify(event.target.value)
    localStorage.setItem('post', value)
    setComment(event.target.value)
  }

  const postComment = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!comment) return
    const cleanComment = DOMPurify.sanitize(comment)

    setPosting(true)

    const commentMetadata = {
      timestamp: Date.now(),
      postId: postId,
    }

    const author = {
      id: user.id,
      membership: user.membership,
    }

    const commentObject = {
      meta: commentMetadata,
      author,
      content: cleanComment,
    }

    const commentPosting = await fetch('/api/postComment', {
      method: 'POST',
      body: JSON.stringify(commentObject),
    })
      .then((result) => result.json())
      .then((status) => {
        console.log(status)
      })
    setPosting(false)
    return commentPosting
  }

  return (
    <div className="w-full mx-auto">
      <div className="bg-white pt-6 px-4 pb-4 sm:px-6 lg:col-span-3 lg:pt-6  xl:pl-12">
        <div className="max-w-full mx-auto lg:max-w-none">
          <div className="">
            <label htmlFor="message" className="sr-only">
              Comment form
            </label>
            <form>
              <textarea
                onChange={updateComment}
                id="message"
                name="message"
                rows={4}
                className="block w-full shadow-lg py-3 px-4 placeholder-gray-500 ring-red-500 border-gray-300 rounded-lg border-2"
                placeholder={`What's on your mind${
                  user ? ', ' + user + '?' : '?'
                }`}
              ></textarea>
              <div className="flex justify-end py-6">
                <button
                  onClick={postComment}
                  type="submit"
                  disabled={posting}
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {user ? 'Post Comment' : 'Login to Comment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CommentForm
