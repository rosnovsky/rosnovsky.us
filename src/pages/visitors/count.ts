import { Visits, db, eq, and } from 'astro:db';
import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async (data) => {
  const currentPage = data.request.url.split('?')[1].split(',')

  const visitsData = await db.select().from(Visits).where(and(eq(Visits.page, currentPage[0] === '' ? "home" : currentPage[0]), eq(Visits.content, currentPage[1] ? currentPage[1] : 'none')))

  const visits = visitsData.reduce((acc, item) => {
    return acc + item.visitor_count
  }, 0)

  return new Response(JSON.stringify(visits), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
