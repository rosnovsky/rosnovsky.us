import dynamic from 'next/dynamic';
import Header from './Header';
import Posts from './Posts';
const ReadMore = dynamic(() => import('./Posts/ReadMore'));
const Search = dynamic(() => import('./Search'));
const Categories = dynamic(() => import('./Categories'));
import type { BlogPost } from 'index';
import { useState } from 'react';
import sanityClient from '@lib/sanityClient';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
  isCategory?: BlogPost['categories'][0]['slug']['current'];
};

const Blog = ({ posts, categories, postCount, isCategory }: Props) => {
  const [morePosts, setMorePosts] = useState(posts);
  const [pageNumber, setPageNumber] = useState(6);
  const [loading, setLoading] = useState(false);

  const handleReadMore = () => {
    setLoading(true);
    const postsQuery = `*[_type == "post"] | order(publishedAt desc)[0...${
      pageNumber + 15
    }] {
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
          slug,
          "numberOfCharacters": length(pt::text(body)),
          "estimatedWordCount": round(length(pt::text(body)) / 5),
          "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
        }`;
    const categoryQuery = `*[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc)[0...${
      pageNumber + 15
    }] {
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
          slug,
          "numberOfCharacters": length(pt::text(body)),
          "estimatedWordCount": round(length(pt::text(body)) / 5),
          "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
        }`;

    sanityClient
      .fetch(
        isCategory ? categoryQuery : postsQuery,
        isCategory ? { slug: isCategory } : {}
      )
      .then((data) => {
        setMorePosts(() => data);
        setPageNumber(() => pageNumber + 15);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

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
            <Search
              placeholder="Looking for something?"
              openOnFocus={true}
              debug={true}
            />
          </div>
          <Categories categories={categories} />
          <Posts posts={morePosts ? morePosts : posts} />
          {posts && morePosts?.length > 6 && morePosts.length < postCount && (
            <ReadMore loading={loading} handleReadMore={handleReadMore} />
          )}
          {posts && morePosts?.length === postCount && (
            <div className="text-center">
              You have reached the end of the Internet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
