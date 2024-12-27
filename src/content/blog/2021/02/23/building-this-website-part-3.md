---
title: 'Building this website: Part 3'
publishDate: 2021-02-23
description: 'In this installment, let’s talk about what it takes to start over and why perfect is indeed the enemy of good.'
category: 'Web Development'
image:
  src: '@assets/blog/covers/generic.webp'
  alt: 'Generic blog post cover image'
---

It's been a journey. Never before I was able to stick with the website I've developed for myself for so long :)

In Part 2 of this series, I outlined some new stuff that I changes since I published Part 1. Since then, I've posted a general comments overview (it's pretty cool), and described how I go around generating social images for my blog posts.

Today, I want touch a little bit on some of the moving parts that are involved. It's still a more or less general overview. Eventually, I'll get to posting all the technical bits as well.

## Covid Component

At the top of the home page there's a Covid component. It's a neat little thing that fetches latest data from [CovidTracking Project](https://covidtracking.com) and presents it in three nice cards. Early on I decided that I'm going to have this at the top of the page for the remainder of the pandemic. Since CovidTracking is [winding down](https://covidtracking.com/analysis-updates/covid-tracking-project-end-march-7) its data collection in March, I'd need to switch to a different source. Hopefully, sometime soon I'd switch to tracking the recovery and will remove this component entirely once we are on track to recovery.

This component uses [swr](https://swr.vercel/com) to update data and a bunch of tricks to display how it has changed since the day before. [Check it out](https://github.com/rosnovsky/rosnovsky.us/tree/main/blog/components/Covid)!

## Infinite Scroll

This one is more or less standard. If you scroll to the bottom of the home page, a set of new posts will be loaded and show up. This is made so that the home page itself loads faster, while additional posts are loaded lazily on demand. This one is using `request` to fetch the next set of posts from Sanity's GraphQL endpoint, nothing fancy, but I'm still pretty proud of it. [Check it out](https://github.com/rosnovsky/rosnovsky.us/blob/eb965932fa9989dce9e62541916690d152a2eb82/blog/pages/index.tsx#L46).

## GraphQL vs GROQ

An arbitrary decision that I'm still contemplating. Sanity offers GROQ as their main query language. It's a bit unusual and takes some time to wrap one's head around, and I'm almost there, I guess. But so far I'm using familiar GraphQL to fetch data. This approach introduces some unexpected challenges. For example, when fetching a blog post via GraphQL, you get main image as a reference to an actual document. With GROQ you could request this image object as well, but with GraphQL it's quite tricky and a bit convoluted. This fact is keeping me on track to switching to GROQ eventually.

## Perfect is the enemy of good

It's been a constant battle between me wanting to push something to prod here and me being cautios and holding back because things are not perfect yet, not ready for prime time, so to speak.

Covid component used to break with unusual data or upon some unexpected schema changes on the CovidTracking Project side. I think, I fixed most of it.

Infinite scroll used to break unexpectedly. Again, appears to be fixed now.

Comments are an unfinished mess that actually works pretty well, although it does lack a ton of features.

All of these things are not perfect. In fact, nothing about this site is perfect. However, I decided to go ahead and push it anyway. Moreover, I push most updates almost immediately to production. So most of the time you're seeing the very latest code running the site.

At first, I really struggled with this. I'd scrap the entire project and start over because of how _imperfect_ it was getting. I'd delete entire components to start over because of this same reason: they weren't good enough. It cost me months of lost time. What I learned, though, is that

- nobody cares how imperfect my blog is
- exposing it to the world helps me move faster given your feedback
- nothing is perfect :)

If I chose to make things perfect first and then push them, this site wouldn't go live, probably, ever. So here it is, imperfect, live, and avaialble to you to criticize and comment. Did I mention that comments are a reliably working mess? ;)
