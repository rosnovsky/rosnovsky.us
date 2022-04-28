import PostCard from './PostCard';

const Posts = ({ posts }) => {
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
