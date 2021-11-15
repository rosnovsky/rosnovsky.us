import Image from 'next/image';
import { parseISO, format } from 'date-fns';
import generateSocialImage from '../utils/generateSocialCard'

import Container from '../components/Container';
import SubscribeCard from '../components/Cards/SubscribeCard';
import React from 'react';
import { FrontMatter } from 'index';

const editUrl = (slug) =>
  `https://github.com/rosnovsky/rosnovsky.us/edit/main/data/blog/${slug}.mdx`;

export default function BlogLayout({ children, frontMatter }: { children: React.ReactNode, frontMatter: FrontMatter }) {
  return (
    <Container
      title={`${frontMatter.title} – Art Rosnovsky`}
      description={frontMatter.summary}
      image={generateSocialImage({
        title: frontMatter.title,
        cloudName: 'rosnovsky',
        publishedAt: format(parseISO(frontMatter.publishedAt), 'dd MMMM yyyy'),
        postTag: 'rosnovsky.us',
        cloudinaryUrlBase: 'https://res.cloudinary.com',
        imagePublicID: 'greenSocialCard.jpg',
        textColor: 'fff',
      })}
      date={new Date(frontMatter.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          {frontMatter.title}
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
              by
              {'Art Rosnovsky / '}
              {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="text-sm text-gray-500 min-w-32 mt-2 md:mt-0">
            {frontMatter.readingTime.text}
          </p>
        </div>
        <div className="prose dark:prose-dark max-w-none w-full">
          {children}
        </div>
        <div className="mt-8">
        </div>
        <SubscribeCard />
        <div className="text-sm text-gray-700 dark:text-gray-300">
          <a
            href={editUrl(frontMatter.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Edit on GitHub'}
          </a>
        </div>
      </article>
    </Container>
  );
}
