import type { Session } from '@types';
import { getCollection } from 'astro:content';

export async function getAllTags() {
  // Fetch case studies and extract tags
  const sessions: Session[] = await getCollection('sessions');
  const repeatingTags: string[] = sessions.flatMap(
    (session) => session.data.tags
  );

  // Count tag frequency using reduce
  const tagCount = repeatingTags.reduce((acc, tag) => {
    acc.set(tag, (acc.get(tag) || 0) + 1);
    return acc;
  }, new Map());

  // Sort tags based on frequency
  const sortedTags = Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0]);

  return sortedTags;
}

export async function getFeaturedTags() {
  const tags = await getAllTags();

  return tags.slice(0, 4);
}

export function sortSessions(sessions: Session[]) {
  return sessions.sort(
    (a, b) => b.data.timeline.end.valueOf() - a.data.timeline.end.valueOf()
  );
}

export async function getSortedSessions() {
  const sessions = await getCollection('sessions');
  return sortSessions(sessions);
}
