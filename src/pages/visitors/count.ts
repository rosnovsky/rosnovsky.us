import type { APIRoute } from 'astro';
import { Visits, and, db, eq } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async (data) => {
  let currentPage;
  if (!data.request.url.includes('page=')) {
    currentPage = ['home', 'none']
  } else {
    currentPage = data.request.url.split('=')[1].split(',')
  }

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
