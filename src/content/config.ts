import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: z.object({
        src: image(),
        alt: z.string(),
      }),
      category: z.enum([
        'Family',
        'Travel',
        'Web Development',
        'Open Source',
        'Music',
        'Books',
        'Personal',
        'Covid',
        'Gaming',
      ]),
      description: z.string(),
      publishDate: z.date(),
      draft: z.boolean().optional(),
    }),
});

const sessionsCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      subtitle: z.string(),
      tags: z.array(z.string()),
      thumbnail: z.object({
        src: image(),
        alt: z.string(),
      }),
      coverImage: z.object({
        src: image(),
        alt: z.string(),
      }),
      images: z.array(
        z.object({
          src: image(),
          alt: z.string(),
        })
      ),
      timeline: z.object({
        start: z.date(),
        end: z.date(),
      }),
      projectURL: z.string().url(),
      description: z.string(),
    }),
});

export const collections = {
  blog: blogCollection,
  sessions: sessionsCollection,
};
