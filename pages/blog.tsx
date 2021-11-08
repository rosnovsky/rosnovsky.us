import Container from '../components/Container';
import BlogPost from '../components/Blog/BlogPost';
import SubscribeCard from '../components/Cards/SubscribeCard';
import { getFilesFrontMatter } from '../lib/mdx';
import { InView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';
import Image from 'next/image';
const error = require('../public/static/images/backend/error.png')

type BlogPost = {
  slug: string;
  title: string;
  summary: string,
  publishedAt: string;
  keyPhrases: string;
}

export default function Blog({ posts }: {posts: BlogPost[]}) {
  const [ page, setPage ] = useState(1);
  const [ loadedPosts, setLoadedPosts ] = useState([] as BlogPost[]);

  const [searchResults, setSearchResults] = useState([] as BlogPost[]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadedPosts = posts.slice(0, page * 10);
    const searchResults = posts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.summary.toLowerCase().includes(searchTerm.toLowerCase()) || post.keyPhrases.includes(searchTerm.toLowerCase()));
    setLoadedPosts(loadedPosts);
    setSearchResults(searchResults);
  }, [page, searchTerm]);

  return (
    <Container
      title="Blog – Art Rosnovsky"
      description="A bunch of nonsense."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {`My first blog on Livejournal was established in 2003. I've started this one in 2019, posting ${posts.length} blog posts.`}
        </p>
        <input className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none text-black mb-10 leading-normal" type="text" placeholder="Instant search" onChange={(e) => setSearchTerm(e.target.value)}/>
        <div className="relative w-full mb-4">
        {!searchTerm ? loadedPosts.map(post => (<div key={post.slug}><BlogPost  {...post} /> </div>)) : searchResults.map(post => (<div key={post.slug}><BlogPost  {...post} /> </div>))}
        <InView className="text-black text-center mx-auto" as="div" onChange={(inView) => inView ? setPage(page + 1) : null}>
          {!searchTerm  ? <Image src={error} alt="The End Of The Internet" /> : searchResults.length <1 ? "Nothing found" : null}
        </InView>
        </div>
        <SubscribeCard />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getFilesFrontMatter('blog');
  

  return { props: { posts } };
}
