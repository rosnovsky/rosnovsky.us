---
title: 'Exploring Astro DB'
description: 'Astro just released Astro DB, a fully managed database integrated with the framework itself. I created a views counter for my blog, and loved the experience.'
publishDate: 2024-03-13
image: { src: 'assets/blog/covers/generic.webp', alt: 'Alt' }
category: 'Web Development'
---

## Astro DB

A bit about the announcement. What it is, what it does, why it's cool. Drizzle, Studio, local dev.

## Page views counter

So what can I use it for right away? How about counting viewes of pages on this site?

- record a visit in the database
- record user properties (hashes of IP and User Agent)
- record page visited
- display view counts per page
- display popular pages

### Configuration

- configuring Astro DB
- linking project with Astro Studio
- seeding the DB

### Accessing Astro Studio

- Limited functionality, generous free tier

### Implementation

- issues with `hybrid` mode
- workaround with a tracking pixel
- API endpoints to register and return counts from DB
- Using an Island (`preact`)

## All done!

Screenshots and such
