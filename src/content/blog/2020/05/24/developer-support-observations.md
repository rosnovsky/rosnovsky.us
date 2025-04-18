---
title: 'Developer Support Observations'
publishDate: 2020-05-24
description: "I've been working as a Developer Support Engineer at Auth0 for the past six months. Here're a few things I learned along the way."
category: 'Personal'
image:
  src: '@assets/blog/covers/generic.webp'
  alt: 'Generic blog post cover image'
---

It's been just over 6 months since I joined [Auth0](https://auth0.com/) as their newest Developer Support Engineer. A bunch of my highbrow friends was very condescending. "Oh, tech support. Good for you. With time, you'll become a real engineer". I shrugged these comments off back then, but now I think it was cute of them to say things like this. As in "Aww, honey. You have _no idea_ what you're talking about" :)

The main reason for my chirpy attitude towards my then-new position has always been the fact that I enjoy troubleshooting and solving unexpected and obscure practical, real-life problems. I also really enjoy helping smarter people figure out stuff that I know more about. Not only does it expose me to a wide variety of systems and engineering approaches, but it also gives me a chance to connect with some fantastic people and soak in a ton of exclusive experiences. When you get to collaborate with some of the brightest engineers from the most forward-looking companies in the world on their critical cybersecurity infrastructure, it's something that is very easy for me to enjoy.

I came up with some quick observations as well as misconceptions I want to share.

## People who ask for help are not stupid

A common misconception in the IT world is that people who reach out to their support are dumb. They can't figure things out on their own. They don't know what they are doing. They ask dumb questions. You get the idea. This can't be further from the truth.

In my case, identity and cybersecurity are extremely complex (to put it mildly), and the smartest people, smartest engineers reach out to us when they exhaust every other option available to them. There's nothing else they can do without some very specific expertise. In no way am I implying here that I now possess this expertise, but I certainly am in a better position to provide helpful advice. Sometimes, this advice is very specific to Auth0, but sometimes it's more specific to identity quirks (and by identity I mean authorization, authentication, user identity, role-based access control, OAuth, OIDC, and a multitude of other protocols, and so forth). It's so cool, I can't even.

## Be clear who's side you are on

![](assets/blog/posts/developer-support-observations/6d9b9853539df0982537138d4368881efca0c36e-480x270.gif)

This can be a bit controversial. I always make it clear that even though I work at Auth0, I'm here to represent the customer within Auth0. I first consider whatever the pain they encountered to be our fault. It's kind of an "innocent until proven guilty" approach: a customer got in a pickle and it's on us until or unless I can prove otherwise. I find this perspective to be quite helpful. You don't ask "[have you tried turning it off and on again](https://www.youtube.com/watch?v=nn2FB1P_Mn8&feature=emb_title)", you assume that you are the last resort for the customer. They tried everything and ended up nowhere. Is it because our [docs](https://auth0.com/docs) are bad? Is it because our product is difficult to use? Is it a bug on our end? An [outage](https://status.auth0.com/)? Until I can rule these out, it's on me to make sure the customer is aware of what I'm looking for first.

When we implement a change that affects customers, I made it a point to get a clear message to them: I will raise hell internally to make sure that the customer's voice is heard loud and clear, and that their concerns will be taken seriously.

## Screw-ups happen

![Facepalm](assets/blog/posts/developer-support-observations/140b5fc3379513d9b6e3f76f2c77281eadbaefd2-602x482.jpg)

In the last 6 months, I screwed up more than once. I've sent a response meant for one customer to a different person with a different issue. I sent responses that were factually wrong. I misassigned a case in such a way that it went unnoticed for a week. I probably missed an SLA for a ticket resolution more than once. These things do happen and will happen, even in such a diverse, distributed, remote team of talented personalities as we have. They do happen less often with experience, yet there's no way to avoid this stuff entirely. Which brings us to my next point.

## Sincere apologies go a long way

![](assets/blog/posts/developer-support-observations/d342583e26063e1cb851f72e004accfd8d0cccd3-354x480.gif)

There are a few ways to apologize for your mistakes. One way is to say that you apologize for the poor experience. Another one is to express something along these lines:

> Shit, I screwed up :( Like, I'm so very sorry. Jeez, what a disaster. This is not at all how I want you to experience Auth0. I'll make it up to you.

Obviously, the phrasing is different, but the sentiment remains clear. Whenever possible, I follow up with specifics: here's what happened, here's why I screwed up, these are the steps I'm taking to fix it, and here's why it will never happen again. Only once it didn't go too well: a customer got all snarky and passive-aggressive. Yet, I don't blame them; apologies are not a "free get out of jail" card. They are meant to convey, with 100% transparency, your fuckup exactly as it happened and what you're doing in response. That's it. If an occasional customer doesn't accept it, it's their right. At least, I'm doing all I can.

It's worth saying that in the absolutely vastest majority of cases, a sincere apology turned a disgruntled customer into a ~~raving fan~~ supporter.

## You can't know everything

![I know nothing](assets/blog/posts/developer-support-observations/cebbce2d501ca0be67dc91c8571ef87f67052d86-576x342.jpg)

Sometimes I feel like I'm drowning in a sea of information, knowledge, tricks, quirks, specifics, edge cases, and so on. One of my much senior colleagues demonstrated early on that there's no shame in not knowing something. Not because it's ok to be lazy and stop learning things, but because there's absolutely no way a single person can possibly know everything, even in their special area of expertise. If I don't know something, I just go and learn about it and move on. That's it.

## You know the product better than most

![I Know things](assets/blog/posts/developer-support-observations/27e3fe404ee76f485364a7c4689900e3cbf538c2-650x360.jpg)

This one is my favorite. As a developer support engineer, I get to touch pretty much every aspect of Auth0 products. I mean it: from sales to UI all the way to the core underlying tech and concepts. And I venture here and there on a daily basis. I won't pretend that I, in fact, do know our products better than most, not by a long shot. But also — not _yet_. Being exposed to all sorts of complex problems each element of Auth0 deals with and solves, not only helps me stay on my toes but also offers a great 30-thousand-feet view of everything we do as well as specific lines of code that are responsible for every aspect of the product.
