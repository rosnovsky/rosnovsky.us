import { PortableText } from '@portabletext/react';
import Image from 'next/image';

const Comment = ({ comment }) => {
  const { authorName, authorAvatar, commentDate, commentBody } = comment;
  return (
    <div className="flex justify-start my-10 py-5 border-b border-r">
      <div className="w-28 h-28">
        <Image
          src={(authorAvatar as string) || '/images/avatar.png'}
          className="rounded-full"
          alt={authorName as string}
          width={100}
          height={100}
        />
      </div>
      <div className="text-left flex flex-col ml-5 mb-2 mt-2">
        <div className="mb-0 font-semibold">
          {authorName.charAt(0).toUpperCase() + authorName.slice(1)}
        </div>
        <div className="mb-2 text-xs text-gray-500 prose prose-lg">
          {new Date(commentDate).toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
        <div className="w-lg">
          <PortableText value={commentBody} />
        </div>
      </div>
    </div>
  );
};

export default Comment;
