import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { handleComment } from '@lib/handleComment';

type Props = {
  postId: string;
  postTitle: string;
  setCommentStatus: Dispatch<SetStateAction<boolean>>;
  setStatusMessage: Dispatch<SetStateAction<string>>;
};

const CommentEditor = ({
  postId,
  postTitle,
  setCommentStatus,
  setStatusMessage,
}: Props) => {
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const initialValue = localStorage.getItem(`comment-${postId}`);
    if (initialValue) {
      setValue(initialValue);
    }
    if (isSaved) {
      setIsSaved(false);
    }
    return () => {
      clearInterval();
    };
  }, [isSaved, postId, setCommentStatus]);

  const handleChange = (e) => {
    localStorage.setItem(`comment-${postId}`, e.target.value);
    setIsSaved(false);
    setValue(e.target.value);
  };

  return (
    <>
      <div className="max-w-2xlmx-auto flex flex-col md:w-auto">
        <textarea
          rows={5}
          className="p-2 max-w-2xl mx-auto my-2 text-left h-full w-full py-3 px-4 text-coolGray-500 leading-tight placeholder-coolGray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-coolGray-200 rounded-lg shadow-xs"
          contentEditable
          value={value}
          onChange={(e) => handleChange(e)}
          placeholder="Add a comment..."
          disabled={isSaving}
        />
        <p className="text-sm text-gray-400">
          Some **markdown** _is_ [allowed](here)
        </p>
        <button
          className="max-w-sm mx-auto inline-block py-3 px-5 mt-3 mb-5 leading-5 text-white bg-blue-500 hover:bg-blue-600 font-medium text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm disabled:text-coolGray-800 transition-all duration-300 disabled:bg-coolGray-200 disabled:hover:bg-coolGray-300 disabled:focus:ring-coolGray-200 disabled:border-coolGray-200"
          disabled={isSaving || value.length < 10}
          onClick={(e) => {
            e.preventDefault();
            return handleComment({
              value,
              postId,
              postTitle,
              setCommentStatus,
              setStatusMessage,
              setIsSaving,
              setIsSaved,
              setValue,
            });
          }}
        >
          {value.length < 10
            ? 'Too short'
            : isSaving
            ? 'Posting...'
            : 'Post Comment'}
        </button>
      </div>
    </>
  );
};

export default CommentEditor;
