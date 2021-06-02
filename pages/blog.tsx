import { InstantSearch, Hits, connectSearchBox } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';
import { SearchIcon } from '@heroicons/react/outline'

import Container from '../components/Container';
import BlogPost from '../components/Blog/BlogPost';
import Subscribe from '../components/Cards/SubscribeCard';
import { getAllFilesFrontMatter } from '../lib/mdx';

const searchClient = algoliasearch(
  'MX9C0DBFF5',
  '7f731b4f232d7b9e557319bc45e709fb'
);

export default function Blog({ posts }) {
    const Hit = ({ hit }) => {
      const hitPost = posts.filter(post => hit.title === post.title);
      return <BlogPost key={hitPost[0].title} {...hitPost[0]} />
    }

    const SearchBox = ({refine}) => (
      <div>
        <div className="mt-1 relative shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-10 w-10 text-gray-600" />
          </div>
          <input onChange={event => refine(event.currentTarget.value)}type="search" name="search" id="search" autoComplete="false" className="h-16 text-black dark:text-white text-xl block w-full pl-16 border-gray-600" placeholder="Find a post..." />
        </div>
      </div>
    );

    const CustomSearchBox = connectSearchBox(SearchBox);


  return (
    <Container
      title="Blog – Art Rosnovsky"
      description="A bunch of nonsense."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {`My first blog on Livejournal was istablished in 2003. I've started this one in 2019, posting ${posts.length} blog posts.`}
        </p>
        <div className="relative w-full mb-4">
          <InstantSearch
            indexName="prod_BLOG"
            searchClient={searchClient}
          >
            {/* Widgets */}
            <CustomSearchBox className="w-full text-black dark:text-white border-2 border-black" />
            <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
        </h3>
          <Hits hitComponent={Hit} />
          </InstantSearch>
          
        </div>
        <Subscribe />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { posts } };
}
