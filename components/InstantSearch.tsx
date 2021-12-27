import { useEffect, useState } from 'react';
import Link from 'next/link';
import BlogPost from '@components/Blog/BlogPost';
import Image from 'next/image';
import { InView } from 'react-intersection-observer';

interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  frontMatter: { readingTime: Record<string, string> };
  keyPhrases: string;
}

export const InstantSearch = ({ posts }: { posts: BlogPost[] }) => {
  const [page, setPage] = useState(1);
  const [loadedPosts, setLoadedPosts] = useState([] as BlogPost[]);

  const [searchResults, setSearchResults] = useState([] as BlogPost[]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadedPosts = posts.slice(0, page * 10);
    const searchResults = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.keyPhrases.includes(searchTerm.toLowerCase())
    );
    setLoadedPosts(loadedPosts);
    setSearchResults(searchResults);
  }, [page, searchTerm, posts]);

  return (
    <>
      <div className="w-full mb-10 ">
        <input
          className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 dark:border-gray-600 rounded-lg py-2 px-4 block w-full appearance-none text-black leading-normal"
          type="text"
          placeholder={'Instant search'}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="text-xs text-right text-black mt-1 dark:text-white">
          ℹ{' '}
          <Link href="/about" passHref>
            <span className="hover:underline text-black cursor-point dark:text-white">
              How it works
            </span>
          </Link>
        </div>
      </div>
      <div className="relative w-full mb-4">
        {!searchTerm
          ? loadedPosts.map((post) => (
              <div key={post.slug}>
                <BlogPost {...post} />{' '}
              </div>
            ))
          : searchResults.map((post) => (
              <div key={post.slug}>
                <BlogPost {...post} />{' '}
              </div>
            ))}
        {process.env.NODE_ENV !== 'test' ? (
          <InView
            className="text-black text-center mx-auto"
            as="div"
            onChange={(inView) => (inView ? setPage(page + 1) : null)}
          >
            {!searchTerm ? (
              <Image
                src={require('../public/static/images/backend/error.png')}
                alt="The End Of The Internet"
              />
            ) : searchResults.length < 1 ? (
              'Nothing found'
            ) : null}
          </InView>
        ) : !searchTerm ? (
          <Image
            src="/public/static/images/backend/error.png"
            alt="The End Of The Internet"
            layout="fill"
          />
        ) : searchResults.length < 1 ? (
          'Nothing found'
        ) : null}
      </div>
    </>
  );
};
