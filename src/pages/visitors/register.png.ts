export const prerender = false;

import type { APIRoute } from 'astro';
import { Visits, and, db, eq } from 'astro:db';
import crypto from 'node:crypto';

export const GET: APIRoute = async (data) => {
  const hash = (data: any) => crypto.createHash('sha256').update(data).digest('hex');

  const userAgent: string = data.request.headers.get('User-Agent') || '';
  const ip: string = data.clientAddress;
  const pagePathName: string = data.request.url.split('=')[1];

  const pagePaths = pagePathName ? pagePathName.split(',') : [];

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

  console.log("Visitor registered!", {
    page,
    content,
    pagination,
    visitor_ip_hash: ipHash,
    visitor_user_agent_hash: userAgentHash
  })

  return new Response(new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 1, 0, 0, 0, 1, 8, 6, 0, 0, 0, 31, 21, 196, 137, 0, 0, 0, 13, 73, 68, 65, 84, 120, 156, 99, 248, 255, 159, 161, 7, 0, 7, 130, 2, 127, 61, 200, 72, 239, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130]), {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "no-cache, no-store, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0"
    }
  });
}
