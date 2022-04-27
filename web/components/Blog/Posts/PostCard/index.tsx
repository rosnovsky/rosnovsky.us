import PostCover from './PostCover';
import PostHeading from './PostHeading';
import PostMetadata from './PostMetadata';
import PostSummary from './PostSummary';

const PostCard = () => {
  return (
    <div className="w-full md:w-1/2 px-4 mb-8">
      <PostCover />
      <PostMetadata />
      <PostHeading />
      <PostSummary />
    </div>
  );
};

export default PostCard;
