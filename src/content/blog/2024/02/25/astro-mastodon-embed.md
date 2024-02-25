---
title: Building "astro-mastodon" library
pubDatetime: "2024-02-25"
featured: false
draft: true
tags:
  - web development
  - open-source
description: ""
---

After I was laid off earlier this month (I promise, I will post about it eventually), I figured that it's perfect time to [have some fun](/blog/resume-automation).

It also just so happened that I've created a Slack group for those of us who were laid off, and somehow this group turned into a place for OG Auth0 folks to hang out - for those who're still employed by Okta, and for those who moved on long time ago.

And it's entirely natural that one of the first orders of business happen to be a hackathon. Because of course that's what happens when you get a small crowd of phenomenally talanted people with some spare time on their hands.

Anyway, [Anny](https://www.youtube.com/@securitips) suggested we hack for a few days, and we did. Her [own hack](https://www.youtube.com/watch?v=0-vA1lKeqOA) made it to the Hacker News and forced her to upgrade her hosting to handle the traffic. Because this is how we roll :)

My hack was a niche one. Now that this site runs on [Astro](https://astro.build), and my social networking happens exclusively at [Lounge.town](https://lounge.town/@rosnovsky) on Mastodon, it got me thinking about bridging the two. When I was writing about [migrating Lounge.town to Kubernetes](/blog/migrating-mastodon-instance-to-kubernetes), I really wanted to embed some of my mastodon posts but there were no good options to do so. So I've built one.

## `astro-mastodon` journey

How do you build a thing when you don't even know where to begin? Well, you begin with what you know. It's not specific to software development; it's a fairly good framework in general.

### Component in `MDX` maybe?

I started with what I knew. I knew that you can use custom components in `.mdx` files, and that these components get rendered on the page when it loads:

```markdown
---
title: some frontmatter
---

import { Component } from '@/components'

<Component prop="some prop" />
```

It works, of course. But there are multiple problems with this approach:

- it's client-side so you lose benefits of SSR. It sucks.
- on Astro, it also requires `client:load` directive, e.g. `<Component prop="some prop" client:load />`. Hard to remember, it sucks.
- an extra request on page load to some instance running on a Raspberry Pi in someone's basement could make page load time painfully slow
- this approach only works in `MDX` and doesn't work in plain markdown
- layout shift, loading indicator, runtime errors... quite a few foot-guns readily available

But what's the great advantage of this approach? I know it, and it works. So that's where I started.

### `remark` plugin maybe?

How do I work around all of the problems listed above? Let me solve the biggest one for me personally: I've got a lot of posts in plain markdown, and it's unacceptible that this thing only works with `MDX`. How can I make it work with markdown?

I was aware of `remark` plugins that allow you to modify how markdown is transformed and rendered, but I had no clue what they are exactly, how they work, and how to create one. Knowing _exactly_ what you don't know is a great place to be: you just go and learn!

I ended up with a rather simple `remark` plugin. It walks the node tree of a post, looks for a particular pattern (in this case, anything that looks something like **@username@instance.domain:postId**), and replaces such nodes with an embedded card with post information. It happens at build time, doesn't require you to remember specific syntax, has no `import` boilerplate, prevents layout shifting, entirely SSR. Perfect, so many problems solved! It works great!

Until it doesn't. 

Apparently, `remark` plugins have to by synchronous. And my little plugin does a few things asynchroneously: it fetches post information from an instance, which requires an `async` `fetch` request. Well, crap. If I provide the plugin with post data by the time it runs, it does what it's supposed to. Otherwise, if I try to fetch the data when it runs, the plugin fails (it can't wait for the data to come back from the interwebs).

All right. Ok. Ok. So, I need to pre-fetch data about mastodon posts beforehand, and then provide the plugin with it. All right. Got it. Cool, cool, cool. But how?

### Astro `integration` perhaps?



`@rosnovsky@lounge.town:111994284450336426`

Hackathon


