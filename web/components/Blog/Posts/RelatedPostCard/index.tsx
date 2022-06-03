import type { BlogPost } from 'index';
import PostCover from './PostCover';
import PostHeading from './PostHeading';
import PostSummary from './PostSummary';

type Props = {
  post: BlogPost | BlogPost['references'][0];
};

const PostCard = ({ post }: Props) => {
  const { title, summaryRaw, coverImage, slug } = post;
  return (
    <div
      id="relatedPostCard"
      key={title}
      className="w-full md:w-1/3 px-4 mb-10"
    >
      <PostCover coverImage={coverImage} slug={slug.current} />
      <PostHeading heading={title} slug={slug.current} />
      <PostSummary summaryRaw={summaryRaw} />
    </div>
  );
};

export default PostCard;
