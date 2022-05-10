import Image from 'next/image';
import sanityClient from '@lib/sanityClient';
import { localDate, PortableTextComponents, urlFor } from '@lib/helpers';
import type { BlogPost, PostComment } from 'index';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
const Error = dynamic(() => import('next/error'));
import Containter from '@components/Container';
import type { UserProfile } from '@auth0/nextjs-auth0';
const Comments = dynamic(() => import('@components/Comments/Comments'));
import fetch from 'isomorphic-fetch';
import slugify from 'slugify';

type Props = {
  post: BlogPost;
  postComments: PostComment[];
  resolvedUsers: { data: UserProfile }[];
};

const Post = ({ post, postComments, resolvedUsers }: Props) => {
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
    summaryRaw,
    coverImage,
    categories,
    body,
    estimatedReadingTime,
  } = post;

  return (
    <Containter
      title={`${title} – Art Rosnovsky`}
      description={summaryRaw}
      image={`https://res.cloudinary.com/rosnovsky/image/upload/v1639272559/social-images/${slugify(
        title
      )}.jpg`}
      date={new Date(publishedAt).toISOString()}
      type="article"
    >
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
              <div className="prose prose-xl">{summaryRaw}</div>
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
              (Commenting feature coming soon)
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
      "summaryRaw": pt::text(summary),
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `,
    { slug }
  );

  const postComments: PostComment[] = await fetch(
    `https://rosnovskyus-git-back-to-sanity-rosnovsky.vercel.app/api/comments/getComments?id=${slug}`
  )
    .then((res) => res.json())
    .catch(() => []);
  const baseUrl = 'https://rosnovsky-api.vercel.app';

  try {
    const generateSocialImage = await fetch(
      `${baseUrl}/api/opengraph/generate?title=${post.title}&meta=${new Date(
        post.publishedAt
      ).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })} | ${post.estimatedReadingTime} min read&coverImage=${
        urlFor(post.coverImage) || null
      }`
    );
    console.info(
      `♻️ Generating Social Image for ${post.title}. Here its status code: `,
      generateSocialImage.status
    );
  } catch (e) {
    console.error(e);
  }
  if (postComments.length > 0) {
    const userIds = postComments.map((comment) => {
      return [comment.user_id];
    });

    const uniqueUserIds = [...new Set(userIds.flat())];

    const users = uniqueUserIds.map(async (id) => {
      return await fetch(
        `https://rosnovsky.us/api/comments/userProfile?user_id=${id}`
      )
        .then((res) => res.json())
        .catch((err) => console.error(err));
    });
    return {
      props: {
        post,
        postComments,
        resolvedUsers: await Promise.all(users),
      },
    };
  }

  return {
    props: {
      post,
      postComments,
      resolvedUsers: null,
    },
  };
}

export default Post;
