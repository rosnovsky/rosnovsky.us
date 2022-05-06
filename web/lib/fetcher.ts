import fetch from 'isomorphic-fetch';

export default async function fetcher(...args) {
  const res = await fetch(...(args as [string, RequestInit]));

  return res.json();
}
