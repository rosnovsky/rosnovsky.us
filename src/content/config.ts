import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.object({
      path: z.string(),
      alt: z.string(),
      title: z.string(),
    }).optional(),
    draft: z.boolean().optional(),
    tags: z.array(z.string())
  }),
});

export const collections = { blog };