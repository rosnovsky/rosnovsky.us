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
}

export default function Blog({ posts }: {posts: BlogPost[]}) {
  const [ page, setPage ] = useState(1);
  const [ loadedPosts, setLoadedPosts ] = useState([] as BlogPost[]);

  useEffect(() => {
    const loadedPosts = posts.slice(0, page * 10);
    setLoadedPosts(loadedPosts);
  }, [page]);

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

        <div className="relative w-full mb-4">
        {loadedPosts.map(post => (<div key={post.slug}><BlogPost  {...post} /> </div>))}
        <InView className="text-black text-center mx-auto" as="div" onChange={(inView) => inView ? setPage(page + 1) : null}>
          <Image src={error} alt="The End Of The Internet" />
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
