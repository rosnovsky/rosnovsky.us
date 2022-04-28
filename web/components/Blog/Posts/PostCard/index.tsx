import PostCover from './PostCover';
import PostHeading from './PostHeading';
import PostMetadata from './PostMetadata';
import PostSummary from './PostSummary';

const PostCard = ({ post }) => {
  return (
    <div key={post.title} className="w-full md:w-1/2 px-4 mb-8">
      <PostCover coverImage={post.coverImage} slug={post.slug.current} />
      <PostMetadata metadata={post} />
      <PostHeading heading={post.title} slug={post.slug.current} />
      <PostSummary summary={post.summary} />
    </div>
  );
};

export default PostCard;
