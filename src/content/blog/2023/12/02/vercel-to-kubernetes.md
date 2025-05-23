---
title: Moving away from Vercel to Kubernetes
publishDate: 2023-12-02T20:59:00Z
featured: true
category: 'Web Development'
image:
  src: '@assets/blog/covers/generic.webp'
  alt: 'Generic blog post cover image'
description: After years and years of hosting this blog on Vercel, I'm moving away to my own Kubernetes cluster. Here's how (and why).
---

It's been quite a journey. For the longest time, I used [Vercel](https://vercel.com) with [Next.js](https://nextjs.org) for this blog. I've re-written bits and pieces of it through the years, added and removed features, deployed and redeployed it many times.

## Rewrite it in Astro

Recently, I've been toying with [Astro](https://astro.build). It feels a better fit for a static blog with just a handful of dynamic features. A blog is static by definition, yet I used to have a few dynamic things around here:

- **Search**: a dynamic search, with instant results dropdown powered by [Algolia](https://algolia.com)
- **Comments**: an auto-refresh comment system powered by [Sanity](https://sanity.io)
- **Status**: a live indicator of the status of the site and its various APIs
- **COVID stats**: live count of COVID cases, hospitalizations, and deaths
- **Live stats**: a bunch of different stats displayed (visitors, newsletter subscribers, github stars, etc)

I bet I'm forgetting something, but the bottom line is that most of the site is static, and `Next.js` is in facta bit of an overkill.

So some time ago I started migrationg the blog to `Astro`, a framework that's more suitable for sites with little interactivity. It's still possible to have `islands` that behave dynamically, it's even possible to use other frameworks with Astro (I'm using `React`), but it remains focused on building a fast, static, mostly HTML pages. Perfect for what I've got here.

## Move off of Vercel

The next thing I wanted to do is to move off of Vercel. I've been hosting stuff on Vercel since before it was called Vercel, and I love it. It's a cool company full of cool people working on cool tech. However, there are a few concerning trends I've been noticing lately:

- `Next.js` gets tighter and tighter shaped by Vercel's hosting
- the simplicity of `Next.js` suffers in favor of enterprise features
- Vercel is more focused on enterprise customers than ever before

And than there's the inevitable [enshittification](https://en.wikipedia.org/wiki/Enshittification) that is coming whether we like it or not. I have a strong feeling that as time goes by, Next.js itself or at least its more advanced and interesting features will be tied to Vercel hosting, which in turn will offer fewer features for free and cater more and more towards enterprise customers. And the features that are more developer-friendly will be more and more expensive (take their DB solutions, for example). Don't get me wrong, all power to them, they are a for-profit corporation and the whole reason they exist is to make more and more money. It's just it doesn't align with anything I need or want.

## Self-host it

So, here I am, thinking to myself "how and where can I host this blog?" I was working with `Kubernetes` at work when it hit me: I can move many things I rent from other companies to my own `k8s` cluster. Will it be cheaper? Absolutely not; after all, I'm taking features that are offered for free or are cheap at the moment due to chep VC money, and _roll my own_ paying with my own money. But if the last 10-15 years on the Internet taught me anything it's that if I'm not paying for it with my own money, I'm the product or I pay for it in other ways. And I hate that it's this way.

I've done a bit of research and came to a conclusion that, in fact, I'd be better off hosting my own stuff even if I have to pay more for it. Here's the plan I came up with.

I've got a bunch of things I rely on for my side projects, learning, and just messing around with different technologies:

- Postgres databases
- S3-like storage
- web hosting
- CI/CD pipelines that autodeploy my stuff
- Algolia-powered search
- Sanity.io-powered CMS
- other things that I'm forgetting

Rolling these things myself sounds like a challenge, and it certainly is. But it's also rewarding to know that I _own_ this stuff to a greater extent than before.

## Kuberbetes it is, then

I've got myself a cluster at [Civo](https://civo.com) with 2 Large nodes and got to work. The easy part was to deploy web apps there: you just add a `Dockerfile` to the project, push it to a registry (I used Github, DockerHub, and GitLab registries), explain to the cluster how to run them and how to expose them to the internet, run `kubectl apply` and you're done. All of the tricky things happen when you want to get stuff working automagically, say, deploy a new version of this site whenever you merge a PR to `main`, or automatically index every post upon deployment.

This is where educational benefits come in. I learned how to build and push `Docker` images in different CI environemnts, how to work with different registries, how to ensure that internal networking actually does what I want it to do, and how to take any `Docker` file and turn it into a service running in my cluster. It was fun, and not that difficult.

## Current status of things

As it stand right now, this site is deployed automatically whenever I merge a PR to its `main` branch. Github Action builds the site itself, builds a `Docker` image, pushes it to a registry and bounces the Kubernetes `deployment`. So within a few minutes of the merge, and updated site is up and running.

There's still more to do.

I do have [TypeSense](https://typesense.org) running but I'm not indexing blog posts yet. Authentication is not implemented yet (and I'm going to try and run [Logto](https://logto.io) for it), there're no comments implemented (but a fully configured Postgres DB is running in the cluster, ready to accept and store those comments). The CMS is no longer something I want to deal with so it's just `mdx` files now (again).

All in all, it's going pretty good and the end result is in sight.

---

**UPDATE**: A few days after posting this, I had shut down my Civo cluster and moved to a VPS by [Hostinger](https://hostinger.com?REFERRALCODE=1ART641) (referal link, 20% off). I installed `Debian` and `k3s` there, and that's where my cluster is hosted now.

---
