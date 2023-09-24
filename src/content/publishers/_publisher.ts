import { defineCollection, reference, z } from 'astro:content';

export const publishers = defineCollection({
  // Type-check frontmatter using a schema
  type: 'content',
  schema: z.object({
    name: z.string(),
    website: z.string().url(),
  }),
});
