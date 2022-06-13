import fetch from 'isomorphic-fetch';
import sanityClient from './sanityClient';
import { commentQuery } from '@lib/queries';

export default async function fetcher(...args) {
  const res = await fetch(...(args as [string, RequestInit]));

  return res.json();
}

export async function sanityFetcher(slug) {
  const res = await sanityClient.fetch(commentQuery, { slug });
  return res;
}
