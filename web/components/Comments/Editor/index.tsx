import { htmlToBlocks, normalizeBlock } from '@sanity/block-tools';
import Schema from '@sanity/schema';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useDebouncedValue } from '@mantine/hooks';

const RTE = dynamic(() => import('@mantine/rte'), {
  ssr: false,
  loading: () => null,
});

// TODO Fetch users and tags from API
const people = [{ id: 1, value: 'Art Rosnovsky' }];

const tags = [
  { id: 1, value: 'JavaScript' },
  { id: 2, value: 'TypeScript' },
];

type Props = {
  postId: string;
  postTitle: string;
};

const CommentEditor = ({ postId, postTitle }: Props) => {
  const [value, setValue] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const initialValue = localStorage.getItem(`${postId}`);
    if (initialValue) {
      setValue(initialValue);
    }
  }, [postId]);

  const handleComment = async (comment, postId) => {
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

    const blocks = htmlToBlocks(comment, blockContentType);
    const normalizedBlocks = blocks.map((block) => {
      return normalizeBlock(block);
    });
    console.log(normalizedBlocks);
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
        console.log(data);
        return data;
      });
  };

  const mentions = useMemo(
    () => ({
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ['@', '#'],
      source: (
        searchTerm: string,
        renderList: (items: Record<string, string | number>[]) => JSX.Element,
        mentionChar: string
      ) => {
        const list = mentionChar === '@' ? people : tags;
        const includesSearchTerm = list.filter((item) =>
          item.value.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderList(includesSearchTerm);
      },
    }),
    []
  );

  // ? This is not necessary, but I'm using it as an autosave feature. Using the debounced value for performance reasons.
  const handleChange = (value: string) => {
    setValue(value);
    localStorage.setItem(postId, value);
  };

  return (
    <>
      <RTE
        className="text-left"
        controls={[['bold', 'italic', 'link'], ['blockquote'], ['codeBlock']]}
        value={value}
        onChange={handleChange}
        mentions={mentions}
      />
      <button onClick={() => handleComment(value, postId)}>Submit</button>
    </>
  );
};

export default CommentEditor;
