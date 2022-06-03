import type { BlogPost } from 'index';
import PostCard from './PostCard';
import RelatedPostCard from './RelatedPostCard';

type Props = {
  posts: BlogPost[] | BlogPost['references'];
};

const Posts = ({ posts }: Props) => {
  return (
    <div id="blogPosts" className="flex flex-wrap -mx-4 mb-6 md:mb-10">
      {posts &&
        posts.map((post) => {
          return <PostCard key={post.title} post={post} />;
        })}
    </div>
  );
};

export const RelatedPosts = ({ posts }: Props) => {
  return (
    <div
      id="relatedBlogPosts"
      className="flex flex-wrap w-full mx-auto mb-6 md:mb-10"
    >
      {posts &&
        posts.map((post) => {
          return <RelatedPostCard key={post.title} post={post} />;
        })}
    </div>
  );
};

export default Posts;
