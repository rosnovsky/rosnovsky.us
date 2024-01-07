import { defineCollection, reference, z } from 'astro:content';

export const books = defineCollection({
  // Type-check frontmatter using a schema
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    author: reference('authors'),
    publisher: reference('publishers'),
    genre: z.enum([
      'fiction',
      'non-fiction',
      'poetry',
      'sci-fi',
      'biography',
      'history',
    ]),
    description: z.string(),
    pages: z.number(),
    // Transform string to Date object
    pubDatetime: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    coverImage: z
      .object({
        path: image(),
        alt: z.string(),
        title: z.string(),
      }),
    tags: z.array(z.string()),
    ISBN: z.string().optional(),
    status: z.enum(['read', 'reading', 'to-read']),
  }),
});
