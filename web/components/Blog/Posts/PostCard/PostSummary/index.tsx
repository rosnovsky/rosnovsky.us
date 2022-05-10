import { BlogPost } from 'index';

type Props = {
  summaryRaw: BlogPost['summaryRaw'];
};

const PostSummary = ({ summaryRaw }: Props) => {
  return (
    <div className="mb-4 text-base md:text-lg text-coolGray-400 font-medium">
      <div className="prose prose-xl">{summaryRaw}</div>
    </div>
  );
};

export default PostSummary;
