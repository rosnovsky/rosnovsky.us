---
title: 'Dynamic comments for a static website'
pubDatetime: 2021-02-13
description: "For the past couple of months, I've been working on a comment feature for this blog. Now that it's almost finished, I invite you to check it out along with some implementation details."
tags:
  - web development
  - how-to
  - next.js
---

It’s safe to say that for the first time in a long time, I actually finished something. Well, not 100% finished, but got this _something_ into a usable state.

In my previous post, I outlined some of the plans for this blog. And while Social Images — one of the features I planned early on — was pretty easy to implement, this one was much more challenging.

## Static Sites

This particular site is powered by Next.js 10, a fantastic framework powering millions of static websites. It’s really easy to build a static blog with Next.js, hook it up to Sanity.io, and deploy it to Vercel. Next.js is smart enough to offer both static pages, dynamic pages, and a thing they call Incremental Static Generation. With out-of-the box serverless functions integration with Vercel, truly the sky is the limit.

The biggest challenge, though, comes when you realize that your site is built once, then deployed and remains what it was at build time until you re-build and re-deploy It.

Clearly, some pages and features absolutely require dynamically generated pages. Take user profiles, for example, or dashboards, you get the idea. Next.js allows you to mix and match static and dynamic content, but dynamic pages do not get some of major benefits of pre-generated pages.

And here we come to the comment sections of blogs. There’s a fair number of folks who detest blog comments, and I understand the sentiment. I’m not sure I’m a fan either, but here I am, learning stuff while building a comment section for my blog 🤷‍♂️

## Comments

Comments are not dynamic per se. They are static when already posted. Yet, when someone posts a comment things get more complicated. A newly posted comment could trigger an entire site rebuild, or, in case of Next.js, trigger an incremental rebuild of a specific page (I’ll get to this in a moment). So this solves the issue, right? Someone posts a comment, Next.js rebuilds the page, everybody’s happy? Not exactly. Users would have to refresh the page to see their new comment: the page had been rebuilt in the background, yes, but to get this newly built page, you’d have to hit refresh. Not ideal.

## Dynamic Comments on Static Sites

- Well, there’s a way around this limitation as well. [stale-while-revalidate](https://web.dev/stale-while-revalidate/) to the rescue! With a nice package from Vercel team called [SWR](https://swr.vercel.app/) you can do all sorts of magic. And here it all comes together:
- A bunch of static blog posts gets generated at build time and deployed to a static hosting
- Someone wants to leave a comment to a specific blog post
- They visit the page and post their comment
- Next.js triggered incremental rebuild of this specific blog post page
- SWR forces to refresh the content of the page in the background
- A happy user sees their comment magically appear almost immediately after posting, without a page reload!

Now, it sounds pretty simple and straightforward, and I promise you it is! However, there’s so much more that goes into posting comments.

Where do you store these comments?

How do you authenticate visitors?

Believe it or not, but I spent probably 80% of the time on these two items. I ended up storing comments in [MongoDB](https://www.mongodb.com/cloud/atlas) and authenticate users with ~~Okta~~ ~~Firebase~~ [Auth0](https://auth0.com). Let me gather my thoughts and walk you through the specifics in the next post.

Feel free to leave a comment below :) Please keep in mind that it’s still very much _work in progress_: some obvious things don’t work as expected, others are half-baked, and the entire thing is fairly easy to break. Be gentle :)
