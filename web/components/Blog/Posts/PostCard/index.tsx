import type { BlogPost } from 'index';
import PostCover from './PostCover';
import PostHeading from './PostHeading';
import PostMetadata from './PostMetadata';
import PostSummary from './PostSummary';

type Props = {
  post: BlogPost;
};

const PostCard = ({ post }: Props) => {
  const { title, summary, coverImage, categories, publishedAt, slug } = post;

  const postMetadata = {
    categories,
    publishedAt,
  };
  return (
    <div key={title} className="w-full md:w-1/2 px-4 mb-8">
      <PostCover coverImage={coverImage} slug={slug.current} />
      <PostMetadata metadata={postMetadata} />
      <PostHeading heading={title} slug={slug.current} />
      <PostSummary summary={summary} />
    </div>
  );
};

export default PostCard;
