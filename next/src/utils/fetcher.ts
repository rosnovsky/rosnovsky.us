import sanityClient from "./sanityClient";
import { commentQuery } from "./queries";

export default async function fetcher(...args: [string, RequestInit]) {
  const res = await fetch(...(args as [string, RequestInit]));

  return res.json();
}

export async function sanityFetcher(slug: string) {
  const res = await sanityClient.fetch(commentQuery, { slug });
  return res;
}
