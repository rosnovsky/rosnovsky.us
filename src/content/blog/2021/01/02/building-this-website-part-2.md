---
title: 'Building this website: Part 2'
publishDate: 2021-01-02T20:20:20Z
description: 'For the past few months, I’ve been rebuilding my website. This time, I’ve built it from scratch, with these two hands. In this post, I want to take a deep dive into what and how I built, and what’s next.'
category: 'Web Development'
image:
  src: '@assets/blog/posts/building-this-website-part-2/ccf00c415ef6dcb0fa914b907352d765b3b5c2b4-2024x2498.png'
  alt: 'Generic blog post cover image'
---

Since my previous post about rebuilding this site, I’ve made enough progress to actually launch the site. You’re looking at it right now :)

# Stack

Initially, I planned on using [Gatsby](https://gatsbyjs.com), and I in fact built the entire site with Gatsby at its heart. But where’s fun in that?

## Next.js with TypeScript

While I was finishing the site with Gatsby, [Next.js 10](https://nextjs.org/blog/next-10) came out, and I had to try it. It's such an impressive framework, there was no way I won't give it a shot. It took me a few hours to completely replace Gatsby with [Next.js](https://nextjs.org/), and there's so much I love about Next! Just some of them are:

- Static and dynamic generation
- Choose your own data fetching (GROQ, GraphQL, plain fetch, you name it!)
- Dynamic module imports
- Awesome code-splitting
- By-default performance and web-vitals optimization
- Built-in image optimization
- Built-in serverless functions (especially, when deployed to Vercel)

Developer experience is also pretty nice. With Next's amazing flexibility and ease of use, I was able to rewrite major chunks of code trying different approaches, and it not only was a breeze, but it also allowed me to try multiple things within just a couple of hours. All told, I'm a fan. I wish [Svelte Kit](https://svelte.dev/blog/whats-the-deal-with-sveltekit) gets to the same level of maturity sometime really soon — for now, Next.js is the next best thing.

## Tailwind 2

I'm a huge fan of utility-first approach offered by [Tailwind](https://tailwindcss.com). It takes a minute to get a hang of it, but when you get it, you get it. It's fantastically easy to style elements, move them around, make things as responsive or rigid as you want. It's a truly great tool for efficient and productive web styling. While I've been working on the rewrite, Tailwind upgraded from version 1.x to 2.0, migration was a breeze.

## Sanity

I've selected [Sanity.io](https://sanity.io) as a CMS for my website. Some of the reasons for this decision were, in no particular order:

- Fantastic flexibility in modeling data
- Developer-first DNA
- Full out-of-the-box GraphQL support
- Great community and awesome documentation
- Data portability: if Sanity doesn't work out for me, I can easily take all my data and move it wherever

So far, I love what I've built with Sanity, and I will showcase my setup in a separate post. I got so thrilled with this CMS that I've built a plugin for it: [Autocomplete Tags](https://www.sanity.io/plugins/autocomplete-tags). I use it in every project now :)

## Cloudinary

The last technology I want to mention is [Cloudinary](https://cloudinary.com). Honestly, it was an afterthought to the large extent, and a lot needs to be done before I can claim in earnest that I'm using it. So far, all it does is "generate" social cover images for my posts. Try sharing this post on Facebook or Twitter to see what I mean. I will write another post about this bit as soon as I get to reworking social images.

# Deployment

Originally, I was planning on deploying this site to [Netlify](https://netlify.com). I love Netlify, it's a great place to host a JAM website. However, at the time I moved from Gatsby to Next.js, Netlify was not too friendly to certain aspects of Next's powers. And given that Next.js is created by the same folks who run Vercel, I naturally just moved to [Vercel](https://vercel.com). As a result, not only did I cut build and deployment time in half, I also have access to "real-time" web-vitals/lighthouse analytics — it's built into both Vercel and Next.js.

![Vercel Analytics](assets/blog/posts/building-this-website-part-2/ccf00c415ef6dcb0fa914b907352d765b3b5c2b4-2024x2498.png)

# What’s next?

This year, I plan to make some major improvements.

- Improve progressive loading for images. Now they are lazy-loaded, which is good, but I'm looking to improve the experience with progressive loading. I've implemented this and had to remove it due to its wonkiness.
- Email subscription. With RSS effectively dead, email subscription will be the main avenue for delivering updates along with posting to social media. Low effort solution, shouldn't take long to implement.
- Related posts. Another low-effort solution. With tags attached to every post, it's fairly easy to introduce relevant related posts at the bottom of every post.
- Improve design. So far, I like the boldness of it, but there are things that I'd like to improve and so far I don't really know how to do it 🤷‍♂️
- AI/ML generated image captions. Every image posted on the website will have a caption and/or alt text generated by [Microsoft's Computer Vision](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/)
- Search with [Algolia](https://algolia.com) or vanilla JS. Not sure yet what route I want to go here. Vanilla JS search is easy to implement and could be as robust as I want it to be, but Algolia offers so much more than just search. I'm torn :)
- LinkCards with metascrapper. Right now, I'm low-key using microlink.io and their React SDK to generate embedded cards for certain links. I don't like this approach for a variety of reasons, the main of them being it's a paid 3rd-party service. So I will build my own LinkCard component, with blackjack and hookers.
- Comments. Not sure how critical these are, but definitely worth exploring. The main difficulty here is the static re-generation of post pages when new comments are posted. Next's incremental static generation should really help with this a lot.
- Membership with [Auth0](https://auth0.com). Powered by Auth0, I will offer some sort of extra content or functionality to members.
- Subscription with [Stripe](https://stripe.com). Mostly for the sake of learning how to do this with a JAM site.
- Finally, a variety of post types: book reviews, podcast episodes (**yep, the podcast is returning!**), hike reports, and so on.

Stay tuned for more. One of my goals this year is to blog much, much more. And I'm determined to stick with this goal 💪
