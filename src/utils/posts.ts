import type { Post } from '@types';
import { getCollection } from 'astro:content';
import { slugify } from './slugs';

export async function getTopCategories() {
  const posts: Post[] = await getCollection('blog');
  const repeatingCategories = posts.map((post) => post.data.category);
  const categoryCount = new Map();

  repeatingCategories.forEach((category) => {
    if (categoryCount.has(category)) {
      categoryCount.set(category, categoryCount.get(category) + 1);
    } else {
      categoryCount.set(category, 1); // Map to capture Count of elements
    }
  });

  const uniqueCategories = [...new Set(repeatingCategories)];

  const categories = uniqueCategories.sort((category1, category2) => {
    let freq1 = categoryCount.get(category1);
    let freq2 = categoryCount.get(category2);

    return freq2 - freq1;
  });

  // return the top 4 categories
  return categories.slice(0, 4);
}

export function getNonDraftPosts(posts: Post[]) {
  return posts.filter((post) => !post.data.draft);
}

export function sortPosts(posts: Post[]) {
  return getNonDraftPosts(posts)
    .filter(Boolean)
    .sort(
      (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
    );
}

export async function getSortedPosts() {
  const posts = await getCollection('blog');
  return sortPosts(posts);
}

/**
 * Build the filter-chip data for the Almanac blog FilterBar.
 *
 * Returns the top N categories by post count, plus the count map so
 * callers can look up any other category's count cheaply. If
 * `mustInclude` is set (e.g. the category the user is currently
 * viewing), that category is appended to the chip list even when it
 * would normally fall outside the top N — so the active chip always
 * appears highlighted on category routes.
 */
export interface CategoryChip {
  label: string;
  slug: string;
  count: number;
}

export async function getCategoryChips(opts?: {
  topN?: number;
  mustInclude?: string;
}): Promise<{ chips: CategoryChip[]; counts: Map<string, number> }> {
  const { topN = 4, mustInclude } = opts ?? {};
  const posts = await getCollection('blog');
  const counts = new Map<string, number>();
  posts.forEach((p) => {
    counts.set(p.data.category, (counts.get(p.data.category) ?? 0) + 1);
  });

  const sorted = Array.from(counts.entries()).sort(
    (a, b) => b[1] - a[1]
  );
  const top = sorted.slice(0, topN).map(([label]) => label);

  if (mustInclude && !top.includes(mustInclude) && counts.has(mustInclude)) {
    top.push(mustInclude);
  }

  const chips: CategoryChip[] = top.map((label) => ({
    label,
    slug: slugify(label),
    count: counts.get(label) ?? 0,
  }));

  return { chips, counts };
}
