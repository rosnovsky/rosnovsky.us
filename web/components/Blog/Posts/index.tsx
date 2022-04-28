import type { BlogPost } from 'index';
import PostCard from './PostCard';

type Props = {
  posts: BlogPost[];
};

const Posts = ({ posts }: Props) => {
  return (
    <div className="flex flex-wrap -mx-4 mb-12 md:mb-20">
      {posts &&
        posts.map((post) => {
          return <PostCard key={post.title} post={post} />;
        })}
    </div>
  );
};

export default Posts;
