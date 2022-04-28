import Header from './Header';
import Posts from './Posts';
import ReadMore from './Posts/ReadMore';
import Search from './Search';
import Categories from './Categories';
import type { BlogPost } from 'index';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
};

const Blog = ({ posts, categories, postCount }: Props) => {
  return (
    <div>
      <section
        className="py-24 bg-white"
        style={{
          backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'left top',
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
            <Header postCount={postCount} />
            <Search />
          </div>
          <Categories categories={categories} />
          <Posts posts={posts} />
          <ReadMore />
        </div>
      </section>
    </div>
  );
};

export default Blog;
