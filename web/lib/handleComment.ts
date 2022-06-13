import { htmlToBlocks, normalizeBlock } from '@sanity/block-tools';
import { marked } from 'marked';
import Schema from '@sanity/schema';

export const handleComment = async ({
  value,
  postId,
  postTitle,
  setIsSaved,
  setIsSaving,
  setValue,
  setCommentStatus,
  setStatusMessage,
}) => {
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

  const blocks = htmlToBlocks(marked.parse(value), blockContentType);
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
      localStorage.removeItem(`comment-${postId}`);
      setIsSaving(false);
      setIsSaved(true);
      setCommentStatus(true);
      setValue('');
      setStatusMessage('Your comment has been posted successfully! 🎉');
      return data;
    });
};
