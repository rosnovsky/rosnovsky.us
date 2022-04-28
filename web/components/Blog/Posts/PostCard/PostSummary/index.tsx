import { PortableText } from '@portabletext/react';

const PostSummary = ({ summary }) => {
  return (
    <div className="mb-4 text-base md:text-lg text-coolGray-400 font-medium">
      <PortableText value={summary} />
    </div>
  );
};

export default PostSummary;
