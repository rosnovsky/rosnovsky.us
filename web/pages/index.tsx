import { NavBar } from '@components/NavBar';
import { Hero } from '@components/Hero';
import Blog from '@components/Blog';
import NewsletterForm from '@components/NewsletterForm';
import Stats from '@components/Stats';
import Footer from '@components/Footer';
import sanityClient from 'lib/sanityClient';

const Home = ({ posts, categories }) => {
  return (
    <div className="">
      <section className="relative bg-coolGray-50 overflow-hidden">
        <div className="bg-transparent">
          <NavBar />
          <Hero />
          <Blog posts={posts} categories={categories} />
          <NewsletterForm />
          <Stats />
          <Footer />
        </div>
      </section>
    </div>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const posts = await sanityClient.fetch(
    `
    *[_type == "post"][0...6] {
      title,
      coverImage {
        ...,
        asset->
      },
      categories[]->{
        title,
        description,
        slug
      },
      publishedAt,
      summary,
      slug
    }
  `
  );

  const categories = await sanityClient.fetch(
    `
    *[_type == "category"][0...6] {
      title,
      description,
      slug
    }
  `
  );

  return {
    props: {
      posts,
      categories,
    },
  };
}

export default Home;
