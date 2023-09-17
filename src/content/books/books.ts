import { defineCollection, reference, z } from 'astro:content';

export const books = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    author: reference('authors'),
    publisher: reference('publishers'),
    genre: z.string(),
    description: z.string(),
    pages: z.number(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    coverImage: z.object({
      path: z.string(),
      alt: z.string(),
      title: z.string(),
    }).optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string())
  }),
});
