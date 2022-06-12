import { htmlToBlocks, normalizeBlock } from '@sanity/block-tools';
import Schema from '@sanity/schema';
import { useEffect, useState } from 'react';

type Props = {
  postId: string;
  postTitle: string;
};

const CommentEditor = ({ postId, postTitle }: Props) => {
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const initialValue = localStorage.getItem(`comment-${postId}`);
    if (initialValue) {
      setValue(initialValue);
    }
  }, []);

  const handleComment = async (e, value, postId) => {
    e.preventDefault();
    setIsSaving(true);
    const defaultSchema = Schema.compile({
      name: 'myBlog',
      types: [
        {
          type: 'object',
          name: 'blogPost',
          fields: [
            {
              title: 'Body',
              name: 'body',
              type: 'array',
              of: [{ type: 'block' }],
            },
          ],
        },
      ],
    });

    // The compiled schema type for the content type that holds the block array
    const blockContentType = defaultSchema
      .get('blogPost')
      .fields.find((field) => field.name === 'body').type;

    const blocks = htmlToBlocks(value, blockContentType);
    const normalizedBlocks = blocks.map((block) => {
      return normalizeBlock(block);
    });

    await fetch('/api/comments/post', {
      method: 'POST',
      body: JSON.stringify({
        postId: postId,
        postTitle: postTitle,
        commentContent: normalizedBlocks,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsSaving(false);
        setIsSaved(true);
        setValue('');
        localStorage.removeItem(`comment-${postId}`);
        return data;
      });
  };

  const handleChange = (e) => {
    localStorage.setItem(`comment-${postId}`, e.target.value);
    setValue(e.target.value);
  };

  return (
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
      <button
        className="max-w-sm mx-auto inline-block py-3 px-5 mt-3 mb-5 leading-5 text-white bg-blue-500 hover:bg-blue-600 font-medium text-center focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm disabled:text-coolGray-800 transition-all duration-300 disabled:bg-coolGray-200 disabled:hover:bg-coolGray-300 disabled:focus:ring-coolGray-200 disabled:border-coolGray-200"
        disabled={isSaving || value.length < 10}
        onClick={(e) => handleComment(e, value, postId)}
      >
        {value.length < 10
          ? 'Too short'
          : isSaving
          ? 'Posting...'
          : 'Post Comment'}
      </button>
    </div>
  );
};

export default CommentEditor;
