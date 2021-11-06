import Container from '../components/Container';
import BlogPost from '../components/Blog/BlogPost';
import SubscribeCard from '../components/Cards/SubscribeCard';
import { getAllFilesFrontMatter } from '../lib/mdx';

type BlogPost = {
  slug: string;
  title: string;
  summary: string,
  publishedAt: string;
}


export default function Blog({ posts }: {posts: BlogPost[]}) {
  const sortedPosts = posts.sort((a, b) => a.publishedAt > b.publishedAt ? -1 : 1);

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
          {`My first blog on Livejournal was established in 2003. I've started this one in 2019, posting ${posts.length} blog posts. You can find interesting posts with this Algolia-powered full-text search.`}
        </p>
        <div className="relative w-full mb-4">
        {sortedPosts.map(post => (<div key={post.slug}><BlogPost {...post} /></div>))}
        </div>
        <SubscribeCard />
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const posts = await getAllFilesFrontMatter('blog');

  return { props: { posts } };
}
