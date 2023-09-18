import { defineCollection, reference, z } from 'astro:content';

export const author = defineCollection({
  // Type-check frontmatter using a schema
  type: 'data',
  schema: z.object({
    name: z.string(),
    website: z.string().url(),
    coverImage: z.object({
      path: z.string(),
      alt: z.string(),
      title: z.string(),
    }).optional(),
  }),
});
