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

![Astro Mastodon](assets/blog/posts/astro-mastodon/integration-live.png)

## A tale of `astro-mastodon`

How do you build a thing when you don’t even know where to begin? 

> Well, you begin with what you **do** know. 

It's not specific to software development; it's a fairly good framework in general.

### Component in `MDX` maybe?

I started with what I knew. I knew that you can use custom components in [`MDX`](https://mdxjs.com/) files, and that these components get rendered on the page when it loads:

```markdown
---
title: some frontmatter
---

import { Component } from '@/components'

<Component prop="some prop" />
```

It works, of course. But there are multiple problems with this approach:

- it's client-side so you lose benefits of SSR. It sucks.
- in Astro, it also requires [`client:load`](https://docs.astro.build/en/reference/directives-reference/#clientload) directive, e.g. `<Component prop="some prop" client:load />`. Hard to remember, it sucks.
- an extra request on page load to some instance running on a Raspberry Pi in someone's basement could make page load time painfully slow
- this approach only works in `MDX` and doesn't work in plain markdown
- layout shift, loading indicator, runtime errors... quite a few foot-guns readily available

But what's the great advantage of this approach? I know it, and it works. So that's where I started.

### `remark` plugin maybe?

How do I work around all of the problems listed above? Let me solve the biggest one for me personally: I've got a lot of posts in plain markdown, and it's unacceptible that this thing only works with `MDX`. How can I make it work with markdown?

I was aware of [`remark`](https://remark.js.org/) plugins that allow you to modify how markdown is transformed and rendered, but I had no clue what they are exactly, how they work, and how to create one. Knowing _exactly_ what you don't know is a great place to be: you just go and learn!

I ended up with a rather simple `remark` plugin. It walks the node tree of a post, looks for a particular pattern (in this case, anything that looks something like **@username@instance.domain:postId**), and replaces such nodes with an embedded card with post information. It happens at build time, doesn't require you to remember specific syntax, has no `import` boilerplate, prevents layout shifting, entirely SSR. Perfect, so many problems solved! It works great!

Until it doesn't. 

Apparently, `remark` plugins have to by synchronous. And my little plugin does a few things asynchroneously: it fetches post information from an instance, which requires an `async` `fetch` request. Well, crap. If I provide the plugin with post data by the time it runs, it does what it's supposed to. Otherwise, if I try to fetch the data when it runs, the plugin fails (it can't wait for the data to come back from the interwebs).

All right. Ok. Ok. So, I need to pre-fetch data about mastodon posts beforehand, and then provide the plugin with it. All right. Got it. Cool, cool, cool. But how?

### Astro `integration` perhaps?

Ok, now that we've tumbled down this rabbit hole, let's see if we can combine the `remark` plugin with some Astro magic. I mean, Astro _builds_ the website, it *has* to have a way of injecting custom functions at build time! And it sure does: [integrations](https://docs.astro.build/en/reference/integrations-reference/) offer a way to use lifecycle hooks! Exactly what I need! I'm going to use a hook to generate a list of all Mastodon links I can find in markdown or `mdx` files, then fetch all the information about these posts that I need, store it temporarily on disk, and let Astro do its thing - build the website. As it builds it, the `remark` plugin will _already_ have access to the pre-fetched data and it should be happy!

Believe it or not, but that's in essense, the entirety of [`astro-mastodon`](https://npmjs.org/package/astro-mastodon) package. It collects "mentions", determines if they produce valid Mastodon links, checks whether these links actually resolve to Mastodon posts, fetches posts data, and stores it on disk. Then the plugin just renders this data into a nice embedded card like this one: 

`@rosnovsky@lounge.town:111994284450336426`

## What's next?

The card above, as you can see, does indeed require some tender loving care. It's not as _nice_ as I want it to be, and there are multiple problems with it. 

But for a quick (and solo) hackathon project, it's not too bad. The biggest problems that remain are: 
- proper hot reloading in `dev` mode (now it just restarts the server, which is not ideal at all.)
- caching of already pre-fetched data (it has to be smart: people update posts, number of replies change, but re-downloading hundreds of Mastodon posts on every build is, again, not ideal.)
- an option to enable the embedded card component to work with any Astro renderer (React, Preact, Svelte, Vue, etc.)
- a way to render custom emoji. Custom emoji is a huge thing on the Fediverse, I have to be able to show them off!
- a nice way to render media. Mastodon cards can include links, images, video, audio, OpenGraph preview cards, etc. I need to make all these render nicely. And I mean _really_ nicely. 
- Make it possible to properly "mention" people inline and embed profile cards.
- Embed cards for other ActivityPub platforms (PeerTube, FunkyWhale, Pixelfed, etc.)

The good news is that with a fairly solid foundation, I can just iterate over these things, making small improvements here and there until I can tackle the big stuff. All in all, I'm very happy with how this hackathon project turned out :)

[![astro-mastodon](https://opengraph.githubassets.com/64ba1c409cde8f7e6bc0ad7d7dc41d9ad3f4e8bd07d2907c01728f6358f9055c/rosnovsky/astro-mastodon)](https://github.com/rosnovsky/astro-mastodon)
