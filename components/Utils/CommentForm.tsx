import { useUser } from '@auth0/nextjs-auth0';
import { FormEvent, useState } from 'react';

export const CommentForm = ({ postId, postTitle }) => {
  const [commentStatus, setCommentStatus] = useState(false);
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState('');

  const postCommentRequest = async (e: FormEvent) => {
    e.preventDefault();

    setCommentStatus(true);
    setCommentError('');

    try {
      const result = await fetch('/api/comments/postComment', {
        method: 'POST',
        body: JSON.stringify({ postId, postTitle, content: comment })
      }).then((res) => res.json());
      if (!result.ok) {
        setCommentError(result.error);
        throw new Error(result.error);
      }
    } catch (error) {
      console.error(commentError);
    }
    setCommentStatus(false);
    setComment('');
    return null;
  };
  return (
    <span id="comments" className="font-bold">
      <div className="flex mx-auto items-center justify-center shadow-lg mb-4 w-full">
        <form
          className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg px-4 pt-2"
          onSubmit={(e) => postCommentRequest(e)}
        >
          <div className="flex flex-wrap -mx-3 mb-6">
            <h2 className="px-4 pt-1 pb-2 text-gray-800 dark:text-gray-200 text-lg">
              Add a new comment
            </h2>
            <div className="w-full md:w-full px-3 mb-2 mt-2">
              <textarea
                className="bg-gray-100 dark:bg-gray-700 rounded border dark:border-gray-700 border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 dark:placeholder-gray-200 focus:outline-none focus:bg-white dark:focus:bg-gray-900"
                name="body"
                placeholder="Type Your Comment"
                onChange={(e) => {
                  setComment(e.target.value);
                  setCommentError('');
                }}
                value={comment}
                required
              ></textarea>
            </div>
            <div className="w-full flex px-3">
              <div className="w-full mx-auto">
                <input
                  type="submit"
                  disabled={comment ? commentStatus : true}
                  className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-1 px-4 mx-auto border dark:border-gray-600 border-gray-400 rounded-lg tracking-wide dark:hover:bg-gray-900 hover:bg-gray-100"
                  value={
                    commentStatus
                      ? 'Posting...'
                      : commentError
                      ? 'Comment already exists'
                      : 'Post Comment'
                  }
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </span>
  );
};
