import type { NextPage } from 'next';
import { NavBar } from '@components/NavBar';
import { Hero } from '@components/Hero';
import Blog from '@components/Blog';
import NewsletterForm from '@components/NewsletterForm';
import Stats from '@components/Stats';
import Footer from '@components/Footer';

const Home: NextPage = () => {
  return (
    <div className="">
      <section className="relative bg-coolGray-50 overflow-hidden">
        <div className="bg-transparent">
          <NavBar />
          <Hero />
          <Blog />
          <NewsletterForm />
          <Stats />
          <Footer />
        </div>
      </section>
    </div>
  );
};

export default Home;
