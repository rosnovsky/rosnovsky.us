import sanityClient from '@lib/sanityClient';
import { postQuery, postPathsQuery } from '@lib/queries';
import dynamic from 'next/dynamic';
const Containter = dynamic(() => import('@components/Container'));
import { PostHeader } from '@components/Blog/Posts';
import Notification from '@components/Comments/notification';
import { useState } from 'react';
import {
  PostImage,
  PostContent,
  RelatedPosts,
  PostComments,
} from '@components/Blog/Posts';
import type { BlogPost } from 'index';

type Props = {
  post: BlogPost;
  status: 'up' | 'down';
};

const Post = ({ post, status = 'up' }: Props) => {
  const {
    publishedAt,
    title,
    summaryRaw,
    coverImage,
    body,
    references,
    socialCardImage,
  } = post;

  const [commentStatus, setCommentStatus] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    'Your comment has been posted'
  );

  return (
    <Containter
      title={`${title}`}
      description={summaryRaw}
      image={
        socialCardImage
          ? socialCardImage.asset.url
          : 'https://rosnovsky.us/static/images/banner.jpg'
      }
      status={status}
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
          <PostHeader post={post} />
          <PostImage coverImage={coverImage} />
          <PostContent body={body} />
          <RelatedPosts references={references} />
          <PostComments
            post={post}
            setCommentStatus={setCommentStatus}
            setStatusMessage={setStatusMessage}
          />
        </div>
        <Notification notify={commentStatus} message={statusMessage} />
      </section>
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postPathsQuery);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const post: BlogPost = await sanityClient.fetch(postQuery, { slug });

  const sysytemStatus = await fetch('https://rosnovsky.us/api/status').then(
    (res) => res.json()
  );

  return {
    props: {
      post,
      status: sysytemStatus,
    },
  };
}

export default Post;
