

import crypto from 'node:crypto';
import { db, Visits, eq, and } from 'astro:db';
import type { APIRoute } from 'astro';

export const prerender = false;
export const GET: APIRoute = async (data) => {
  const hash = (data: any) => crypto.createHash('sha256').update(data).digest('hex');

  const userAgent: string = data.request.headers.get('User-Agent') || '';
  const ip: string = data.clientAddress;
  const pagePathName: string = data.request.url.split('=')[1];

  const pagePaths = pagePathName.split(',')

  let page = "home";
  let content = "none";
  let pagination = 1;


  if (pagePathName.length === 0) {
    page = 'home'
  } else if (pagePaths.length === 1) {
    page = pagePaths[0]
  } else if (pagePaths.length === 2) {
    page = pagePaths[0]
    content = pagePaths[1]
  } else if (pagePaths.length === 3) {
    page = pagePaths[0]
    content = pagePaths[1]
    pagination = Number(pagePaths[2])
  }

  const userAgentHash = hash(userAgent);
  const ipHash = hash(ip);

  const [visits] = await db.select().from(Visits).where(and(eq(Visits.visitor_ip_hash, ipHash), eq(Visits.visitor_user_agent_hash, userAgentHash), eq(Visits.page, page), eq(Visits.content, content), eq(Visits.pagination, pagination)))

  if (visits) {
    await db.update(Visits).set({ visitor_count: visits.visitor_count + 1 }).where(eq(Visits.id, visits.id))
  } else {
    await db.insert(Visits).values({
      page,
      content,
      pagination,
      visitor_ip_hash: ipHash,
      visitor_user_agent_hash: userAgentHash
    })
  }

  return new Response(JSON.stringify(visits), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
}
