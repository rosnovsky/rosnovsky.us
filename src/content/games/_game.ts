import { defineCollection, reference, z } from 'astro:content';

export const games = defineCollection({
  // Type-check frontmatter using a schema
  type: 'content',
  schema: z.object({
    name: z.string(),
    coverImage: z.object({
      path: z.string(),
      alt: z.string(),
      title: z.string(),
    }),
    studio: reference('studios'),
    website: z.string().url(),
    genre: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
  }),
});
