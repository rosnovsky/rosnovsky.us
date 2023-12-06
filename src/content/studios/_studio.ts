import { defineCollection, z } from 'astro:content';

export const studio = defineCollection({
  // Type-check frontmatter using a schema
  type: 'content',
  schema: z.object({
    name: z.string(),
    website: z.string().url(),
  }),
});
