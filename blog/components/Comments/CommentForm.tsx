import { useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import Link from 'next/link'
import { BlogPost, PostComment } from '../..'

const CommentForm = ({
  postId,
  user,
}: {
  user: any
  postId: BlogPost['_id']
}) => {
  // const { user, loading } = useFetchUser()
  const [comment, setComment] = useState(localStorage.getItem('post') || '')
  const [posting, setPosting] = useState(false)
  const [success, setSuccess] = useState(false)

  const updateComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value
    localStorage.setItem('post', value)
    setComment(event.target.value)
  }

  const postComment = async (event: React.FormEvent) => {
    event.preventDefault()
    setPosting(true)

    if (!comment) return
    const cleanComment = DOMPurify.sanitize(comment)

    const commentObject: PostComment = {
      comment: {
        authorId: user.sub,
        postId: postId!,
        content: cleanComment,
        commentTimestamp: Date.now(),
      },
      author: {
        id: user.sub,
        name: user.name,
        email: user.email,
        picture: user.picture,
        nickname: user.nickname,
        family_name: user.family_name,
        given_name: user.given_name,
      },
    }

    localStorage.setItem('post', '')

    const commentPosting = await fetch('/api/post', {
      method: 'POST',
      body: JSON.stringify(commentObject),
    })
      .then((result) => result.json())
      .then((status) => {
        console.info(status)
        setComment('')
        setSuccess(true)
      })
    setPosting(false)
    return commentPosting
  }

  const closeSuccess = () => {
    setSuccess(false)
  }

  return (
    <>
      <div className="w-full mx-auto prose prose-2xl max-w-5xl mb-20">
        <div className="pt-6 px-4 pb-4 sm:px-6 lg:col-span-3 lg:pt-6  xl:pl-12">
          <div className="max-w-full mx-auto lg:max-w-none">
            <div>
              <label htmlFor="message" className="sr-only">
                Comment form
              </label>
              <form>
                <textarea
                  disabled={posting}
                  onChange={updateComment}
                  id="message"
                  name="message"
                  value={comment}
                  rows={4}
                  className="block w-full shadow-lg py-3 px-4 placeholder-gray-500 ring-red-500 border-gray-300 rounded-lg border-2"
                  placeholder={
                    !posting
                      ? comment
                        ? comment
                        : `What's on your mind${
                            user ? ', ' + user.nickname + '?' : '?'
                          }`
                      : 'Posting...'
                  }
                ></textarea>
                <div className="py-6">
                  {user && (
                    <div className="flex justify-between">
                      <div className="font-mono text-green-700 text-sm">
                        <Link href="/api/auth/logout">
                          <span className="text-gray-400 hover:underline cursor-pointer">
                            Logout
                          </span>
                        </Link>
                      </div>
                      <div className="justify-end">
                        <button
                          onClick={postComment}
                          type="submit"
                          disabled={posting}
                          className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
                        >
                          Post Comment
                        </button>
                      </div>
                    </div>
                  )}
                  {!user && (
                    <div className="flex justify-end">
                      <div className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md bg-green-200 hover:bg-green-800 hover:text-green-200 text-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer transition duration-300">
                        <Link
                          href={`/api/auth/login?returnTo=${window.location.pathname}`}
                          scroll={false}
                        >
                          <span className="no-underline font-mono ">
                            Login and post
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 flex items-center justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-center sm:justify-center">
        <div
          className={`max-w-lg w-full bg-gray-50 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden opacity-0 hidden ${
            success
              ? 'opacity-100 visible transform ease-out duration-400 transition'
              : 'transition ease-in duration-400'
          }`}
        >
          <div className="p-10">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-10 w-10 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5">
                <p className="text-lg mb-1 pb-1 font-medium text-gray-900">
                  Posted successfully!
                </p>
                <p className="text-sm text-gray-500">
                  Your comment will appear below this post soon.
                </p>
              </div>
              <div className="ml-4 flex-shrink-0 flex">
                <button
                  className="bg-gray-50 self-start hover:cursor-pointer rounded-md inline-flex text-gray-500 hover:text-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={closeSuccess}
                >
                  <span className="sr-only">Close</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CommentForm
