---
title: "Building astro-mastodon library"
publishDate: 2024-02-25
category: "Open Source"
description: "I really wanted to embed some of my Mastodon posts right into my blog posts, but there were no good options to do so. Well, I've built one."
image:
  src: '@assets/blog/covers/astro-mastodon.webp'
  alt: 'Generic blog post cover image'
---

After I was laid off earlier this month (I promise, I will post about it eventually), I figured that it's perfect time to [have some fun](/blog/resume-automation).

It also just so happened that I've created a Slack group for those of us who were laid off, and somehow this group turned into a place for OG Auth0 folks to hang out - for those who're still employed by Okta, *and* for those who moved on long time ago.

And it's entirely natural that one of the first orders of business happen to be a hackathon. Because of course that's what happens when you get a small crowd of phenomenally talanted people with some spare time on their hands.

Anyway, [@anny](https://www.youtube.com/@securitips) suggested we hack for a few days, and we did. Her [own hack](https://www.youtube.com/watch?v=0-vA1lKeqOA) made it to the Hacker News and forced her to upgrade her hosting to handle the traffic. Because this is how we roll :)

My hack was a niche one. Now that this site runs on [Astro](https://astro.build), and my social networking happens exclusively at [Lounge.town](https://lounge.town/@rosnovsky) on Mastodon, it got me thinking about bridging the two. When I was writing about [migrating Lounge.town to Kubernetes](/blog/migrating-mastodon-instance-to-kubernetes), I really wanted to embed some of my mastodon posts but there were no good options to do so. So I've built one.

