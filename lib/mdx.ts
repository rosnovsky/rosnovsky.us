import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';
import { serialize } from 'next-mdx-remote/serialize';
import mdxPrism from 'mdx-prism';
import { SummarizeContent } from '../lib/summarizeContent';

const root = process.cwd();

export async function getFiles(type) {
  return fs.readdirSync(path.join(root, 'data', type));
}

export async function getFileBySlug(type, slug) {
  const source = slug
    ? fs.readFileSync(path.join(root, 'data', type, `${slug}.mdx`), 'utf8')
    : fs.readFileSync(path.join(root, 'data', `${type}.mdx`), 'utf8');

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [
        require('remark-autolink-headings'),
        require('remark-slug'),
        require('remark-code-titles'),
      ],
      rehypePlugins: [mdxPrism],
    },
  });

  return {
    mdxSource,
    content,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      title: data.title,
      cover: data.cover ? data.cover : '/static/socialCard.jpg',
      summary: data.summary,
      publishedAt: data.publishedAt,
      ...data,
    },
  };
}

// const summarizeContent = async (content, slug) => {
//   const keyPhrases = SummarizeContent([content.substring(0, 1000)], slug).then(
//     (value) => value
//   );
//   return keyPhrases;
// };

export async function getFilesFrontMatter(type) {
  const files = await fs.readdirSync(path.join(root, 'data', type));
  const posts: any[] = [];

  for (const file of files) {
    const source = fs.readFileSync(path.join(root, 'data', type, file), 'utf8');
    const { data, content } = matter(source);
    if (content.length < 1) {
      console.log('No content: ', file, content);
    }

    // if (process.env.NODE_ENV === 'production') {
    //   try {
    //     const keyPhrasesSource = await summarizeContent(
    //       content,
    //       file.replace('.mdx', '')
    //     );
    //     // Not sure why this is needed, but it is. Somehow, the keyPhrasesSource array elements do not have keyPhrases (?) in their types.
    //     // @ts-expect-error
    //     const keyPhrases = await keyPhrasesSource[0].keyPhrases;
    //     if (keyPhrases === undefined) {
    //       console.log('No key phrases: ', file);
    //     }
    //     const post = {
    //       ...data,
    //       slug: file.replace('.mdx', ''),
    //       keyPhrases: await keyPhrases.join(', '),
    //     };

    //     posts.push(post);
    //   } catch (error) {
    //     const post = {
    //       ...data,
    //       slug: file.replace('.mdx', ''),
    //     };
    //     posts.push(post);
    //   }
    // } else {
    //   const post = {
    //     ...data,
    //     slug: file.replace('.mdx', ''),
    //   };
    //   posts.push(post);
    // }
    const post = {
      ...data,
      slug: file.replace('.mdx', ''),
    };
    posts.push(post);
  }

  return posts.sort((a, b) =>
    Date.parse(b.publishedAt) > Date.parse(a.publishedAt) ? 1 : -1
  );
}
