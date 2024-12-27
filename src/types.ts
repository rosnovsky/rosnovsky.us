import type { ImageMetadata } from 'astro';
import type { CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Project = CollectionEntry<'projects'>;

export type Site = {
  website: string;
  author: string;
  description: string;
  title: string;
  ogImage: string;
  postsPerPage: number;
  projectsPerPage: number;
};

export type SocialObjects = {
  name: SocialMedia;
  href: string;
  showInHero: boolean;
  label: string;
  ariaLabel: string;
}[];

export type SocialMedia =
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'bluesky'
  | 'youTube'
  | 'tikTok'
  | 'discord'
  | 'gitLab'
  | 'steam'
  | 'mastodon'
  | 'rss';

export type StackObjects = {
  name: string;
  logo: ImageMetadata;
  experience?: string;
}[];
