import { PortableText } from '@portabletext/react';
import { BlogPost } from 'index';

type Props = {
  summary: BlogPost['summary'];
};

const PostSummary = ({ summary }: Props) => {
  return (
    <div className="mb-4 text-base md:text-lg text-coolGray-400 font-medium">
      <PortableText value={summary} />
    </div>
  );
};

export default PostSummary;
