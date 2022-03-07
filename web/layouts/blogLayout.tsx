import Image from 'next/image';
import slugify from 'slugify';

import Container from '@components/Container';
import SubscribeCard from '@components/Cards/SubscribeCard';
import React from 'react';
import { BlogPost } from 'index';

export default function BlogLayout({
  children,
  post,
}: {
  children: React.ReactNode;
  post: BlogPost;
}) {
  const { title, summary, publishedAt, slug } = post;
  return (
    <Container
      title={`${title} – Art Rosnovsky`}
      description={summary}
      image={`https://res.cloudinary.com/rosnovsky/image/upload/v1639272559/social-images/${slug.current}.jpg`}
      date={new Date(publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {title}
        </h1>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full mt-2">
          <div className="flex items-center">
            <Image
              alt="Art Rosnovsky"
              height={24}
              width={24}
              src="/static/images/art.jpg"
              className="rounded-full"
            />
            <p className="text-sm text-gray-700 dark:text-gray-300 ml-2">
              {'Art Rosnovsky / '}
              {new Date(publishedAt).toLocaleDateString('en-US', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            Reading time?
          </p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
        <div className="mt-8"></div>
        <SubscribeCard />
      </article>
    </Container>
  );
}
