import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import sanityClient from '../../lib/sanityClient';
import { localDate, PortableTextComponents, urlFor } from 'lib/helpers';
import type { BlogPost, PostComment } from 'index';
import Link from 'next/link';
import Containter from '@components/Container';
import Head from 'next/head';
import Error from 'next/error';
import { useUser, UserProfile } from '@auth0/nextjs-auth0';
import Comments from '@components/Comments/Comments';
import fetch from 'isomorphic-fetch';

type Props = {
  post: BlogPost;
  postComments: PostComment[];
  resolvedUsers: { data: UserProfile }[];
};

const Post = ({ post, postComments, resolvedUsers }: Props) => {
  const { user, error, isLoading } = useUser();

  if (!post)
    return (
      <div>
        <Error statusCode={404} />
      </div>
    );
  const {
    publishedAt,
    title,
    summary,
    coverImage,
    categories,
    body,
    estimatedReadingTime,
  } = post;

  return (
    <Containter>
      <Head>
        <title>{title} - Rosnovsky Park&trade; Blog</title>
        <meta name="description" content={title} />
        <meta
          name="keywords"
          content="Art Rosnovsky, Rosnovsky Park, Rosnovsky Park&trade;, Rosnovsky Park's Blog"
        />
        <meta name="author" content="Art Rosnovsky" />
        <meta name="robots" content="index, follow" />
        <meta name="referrer" content="origin" />
        <meta
          name="og:title"
          property="og:title"
          content="Rosnovsky Park&trade; - Art Rosnovsky's Blog"
        />
        <meta
          name="og:description"
          property="og:description"
          content="Art Rosnovsky's Blog"
        />
        <meta
          name="og:image"
          property="og:image"
          content="https://rosnovsky.us/static/logo.png"
        />
        <meta
          name="og:url"
          property="og:url"
          content="https://rosnovsky.us/blog"
        />
        <meta name="og:type" property="og:type" content="website" />
        <meta
          name="twitter:card"
          property="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:site"
          property="twitter:site"
          content="@rosnovsky"
        />
        <meta
          name="twitter:creator"
          property="twitter:creator"
          content="@rosnovsky"
        />
        <meta
          name="twitter:title"
          property="twitter:title"
          content="Rosnovsky Park&trade; - Art Rosnovsky's Blog"
        />
        <meta
          name="twitter:description"
          property="twitter:description"
          content="Art Rosnovsky's Blog"
        />
        <meta
          name="twitter:image"
          property="twitter:image"
          content="https://rosnovsky.us/static/logo.png"
        />
        <meta
          name="twitter:url"
          property="twitter:url"
          content="https://rosnovsky.us/blog"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://rosnovsky.us/static/logo.png"
        />
      </Head>
      <section
        className="py-16 md:py-24 bg-white"
        style={{
          backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
          backgroundPosition: 'center top',
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="md:max-w-2xl mx-auto mb-12 text-center">
            <div className="flex items-center justify-center">
              <p className="inline-block text-blue-600 font-medium">
                {localDate(publishedAt)}
              </p>
              <span className="mx-1 text-blue-500">•</span>
              <p className="inline-block text-blue-400 font-medium">
                {estimatedReadingTime} minute read
              </p>
            </div>
            <h2 className="mb-4 mt-3 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              {title}
            </h2>
            <div className="mb-6 text-lg md:text-xl font-medium text-coolGray-500">
              <PortableText value={summary} />
            </div>
            {categories &&
              categories.map((category) => (
                <div
                  key={category.title}
                  className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-blue-500 font-medium uppercase bg-blue-100 rounded-full shadow-sm"
                >
                  <Link href={`/category/${category.slug.current}`}>
                    {category.title}
                  </Link>
                </div>
              ))}
          </div>
          <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
            <Image
              src={urlFor(coverImage).url()}
              placeholder="blur"
              blurDataURL={coverImage.asset.metadata.lqip}
              width={coverImage.asset.metadata.dimensions.width}
              height={coverImage.asset.metadata.dimensions.height}
              objectFit="cover"
            />
          </div>
          <div className="prose prose-xl md:max-w-3xl mx-auto">
            <PortableText value={body} components={PortableTextComponents} />
          </div>
          <div className="w-full text-center mt-10 mx-auto">
            <h2 className="text-2xl">Comments</h2>
            <div className="max-w-3xl min-w-3xl mx-auto py-3">
              {postComments && resolvedUsers && (
                <Comments
                  postComments={postComments}
                  resolvedUsers={resolvedUsers}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const post = await sanityClient.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
      ...,
      coverImage {
        ...,
        asset->
      },
      categories[]->{
        title,
        description,
        slug
      },
      references[]->{
        title,
        publishedAt,
        slug,
        coverImage,
        summary
      },
      body[]{
        asset->{...},
        ...
      },
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `,
    { slug }
  );

  const postComments: PostComment[] = await fetch(
    `/api/comments/getComments?id=${slug}`
  ).then((res) => res.json());

  if (postComments) {
    const userIds = postComments.map((comment) => {
      return [comment.user_id];
    });

    const uniqueUserIds = [...new Set(userIds.flat())];

    const users = uniqueUserIds.map(async (id) => {
      const user = await fetch(`/api/comments/userProfile?user_id=${id}`)
        .then((res) => res.json())
        .catch((err) => console.error(err));
      return user;
    });
    return {
      props: {
        post,
        postComments,
        resolvedUsers: null,
      },
      revalidate: 1,
    };
  }

  return {
    props: {
      post,
      postComments,
      resolvedUsers: null,
    },
    revalidate: 1,
  };
}

export default Post;
