import { db, Visits } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Visits).values({
    page: 'home',
    pagination: 1,
    visitor_ip_hash: 'ip',
    visitor_user_agent_hash: 'ua',
    visitor_count: 10,
  });
}
