import { BlogPost } from 'index';
import { RelatedPostsCards } from '@components/Blog/Posts';

export const RelatedPosts = ({
  references,
}: {
  references: BlogPost['references'];
}) => {
  return (
    <div className="mb-5 mx-auto md:max-w-3xl overflow-hidden rounded-lg">
      <h2 className="text-3xl font-semibold text-center my-10 mx-auto overflow-hidden rounded-lg">
        Related Posts
      </h2>

      <div className="w-full md:max-w-5xl mx-auto mb-2 md:mb-6 text-center">
        <RelatedPostsCards posts={references} />
      </div>
    </div>
  );
};
