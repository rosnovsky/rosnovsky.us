import Header from './Header';
import Posts from './Posts';
import ReadMore from './Posts/ReadMore';
import Search from './Search';
import Tags from './Categories';

const Blog = ({ posts, categories }) => {
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
            <Header />
            <Search />
          </div>
          <Tags categories={categories} />
          <Posts posts={posts} />
          <ReadMore />
        </div>
      </section>
    </div>
  );
};

export default Blog;
