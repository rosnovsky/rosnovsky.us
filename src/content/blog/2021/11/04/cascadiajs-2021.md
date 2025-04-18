---
title: CascadiaJS 2021
description: For years I wanted to attend CascadiaJS 2021, a PNW-native JavaScript conference. And for a while, I either couldn’t afford it, didn’t have the time, or had more immediate priorities.
publishDate: 2021-11-04
category: 'Web Development'
image:
  src: '@assets/blog/posts/cascadiajs-2021/08b8509e78d22e88095a33dac1f3229dc36494ac-1086x724.avif'
  alt: 'Generic blog post cover image'
---

For years I wanted to attend [CascadiaJS 2021](https://cascadiajs.com), a PNW-native JavaScript conference. And for a while, I either couldn't afford it, didn't have the time, or had more immediate priorities.

Finally, this year everything clicked in place: [Auth0](https://auth0.com/) helped me with the ticket, I was able to take time off to attend, and nothing else got in the way.

It was a blast! Worth every penny, every minute, and I'm so glad I attended. Fantastic speakers, incredible community, family vibes, and a lot of fun - this is CascadiaJS I've enjoyed this year.

I've got a few general takeaways, a bunch of specific things I want to share, and some notes on what I learned.

![](assets/blog/posts/cascadiajs-2021/08b8509e78d22e88095a33dac1f3229dc36494ac-1086x724.avif)Notes from CascadiaJS 2021)

> All talks, slides, and graphic recordings will be available on [CascadiaJS 2021 website](https://2021.cascadiajs.com/) within the next couple of weeks. Don't miss it!

## General takeaways

- If you want to attend a virtual conference, **take time off work** to do so. I've been making the mistake of watching talks on a second screen while working in the past; never again. Engaging, being fully emerged, and being able to take notes without the distraction of work is priceless.
- **Taking notes is key**. Watching passively is fun and all, but if you really want to take something away from the presentation, take notes. Not going to lie, I love [taking notes](/blog/journaling), but I bet you'll find it to be valuable too!
- If you're attending a workshop, don't think that a question you have is stupid or irrelevant; **others have this same question as well, or had this question in the past**. ASK AWAY!
- If you're following along during a workshop and something goes wrong, figure out whether it's something you can fix later. If so, **keep following along** and fix the issue later. Just assume that everything is working as presented. However, if it's something you can't fix or don't know how to fix, absolutely ASK FOR HELP! This is the entire reason for the workshop in question!

> During the [dApps workshop](https://2021.cascadiajs.com/workshops/dapps) this year, I had an issue with [RedwoodJS](https://redwoodjs.com/) and couldn't get it to work. Since the focus of the workshop was to get a smart contract on the local Ethereum network, I focused on this part and was able to replace Redwood with [Next](https://nextjs.org/) later to get things working.

- **Doodle if you can**. Cascadia had these awesome live graphic recordings that were not only incredibly helpful and fun to watch, but they also inspired me to explore "doodling" as a way to take notes. The recorder was amazing [Ashton Rodenhiser](https://twitter.com/mindseyeccf), and I will be taking her course "[Sketchnote All the Things](https://store.mindseyecreative.ca/sketchnote)" as soon as I can.
- If you feel lost, **take a break and re-watch the talk later**. There's no point in trying to understand something while falling behind, getting frustrated and discouraged, and giving up. Take a break, get some water, make a note of what got you off track, and come back to it later.
- HAVE FUN! And I can't stress this enough: **H A V E F U N**! You could watch speakers give talks on youtube any day of the year, but having them in the room, available for live Q&A, with other like-minded people around is the stuff.

## Specifics

- Like it or not, [blockchain](https://www.theverge.com/22654785/blockchain-explained-cryptocurrency-what-is-stake-nft) **is here to stay**. It's not going away, and if you're in the tech space, you will have to either use it, work on it, or develop for it sometime in the foreseeable future.
- Responsive Components are coming to the CSS spec soon. You'll be able to **make specific boxes responsive**, not just the whole page. And by responsive, I don't just mean size, but also font sizes, colors, layouts - all the things you'd normally have to do to make a website responsive, just for individual components.
- The most basic things can give you an expansive space for experimentation. Think `window.open()`: apparently, there's a whole world there, and you can use it in many fun ways.
- If you want to learn something, **give a talk about it**. If you don't want to do it in public, make it an internal talk and give it to your team.
- Field data > Lighthouse. Web Vitals all things, and track performance based on **real user experience**.
- [WASM](https://webassembly.org/) is still an enigma to me. [Aaron Turner](https://github.com/torch2424) did a great job of explaining it, but I got lost and will try again later. Perhaps, I just don't have a real use-case for it yet and thus its value escapes me.
- There are some basic things you need to learn about JS before learning React, but you can learn them _while_ learning React. I mean, React pays the bills, but you have **better chances of success** if you're learning JS basics as soon as you can.
- Smart contracts are basically just functions that require a compatible blockchain to run on. It's not rocket science, but given that there are dozens of blockchains, and [Ehtereum](https://ethereum.org/) being ridiculously expensive, you may spend a lot of time learning specific implementations of smart contracts (think [Solidity](https://soliditylang.org/)). Start with Solidity and go from there.
- Sensible encapsulation with React Hooks could make your life more DRY, but you'd need to really think **what to encapsulate and how**.
- **There are super fun things to play with**. With ML widely available to the JS developers (think [TensorJS](https://www.tensorflow.org/js), [ML5](https://ml5js.org/), etc.), you can make all sorts of cool things based, for example, on computer vision. Some of these things have huge real-world value. For example, gaze detection could be used by people with mobility limitations to not only navigate apps but also to build them. I personally use [computer vision to add `alt` text to images](/blog/2021/07/07/alt-text) on this site. It's not perfect, but it's a start.
- If you brush the cryptocurrency hype off of blockchain concepts, you'll end up with the core of Web3. Web3 in many ways is a return to Web's roots of being decentralized, but with a ton of control in the hands of the users. "**Open Web: this time we mean it**".
- You should treat **your internal tools as production software**, and your teammates are your customers. Think of their experience as DX you want to provide.
- **Refactoring and code migrations are "human work"** more than "code work". Buy-in, marketing, and support of your refactoring work are not optional.
- **Typescript is a wild beast** and you need to hunt it down! :)

```typescript
type ValKeys<V> = {
  [K in keyof V]-?: (Exclude<V[K], null>)
    extends {a: U, b: U} ? isTruthy<U>
    extends true ? K : never : never}[keyof V]
};
```

- Seriously, though: a lot of Typescript looks beyond intimidating sometimes, but if you dissect and expand it, you'll find it easier to understand.
- If you're interested in cartography on the Web, **begin with exploring data layer and UI layer concepts, vector tiles, and GeoJSON**. Another interesting thing to think about is that maps should be responsive in all three dimensions(xyz), not just two as is the case with websites.
- Whatever tool you're building, you have to **think about _how_ it will be used to abuse others** (not **if** it will be used for abuse). You must figure out a balance between privacy and safety, and it's a hell of a task.
- **NPM and the entire JS ecosystem is wild**: this site, for example, relies on thousands of packages created by thousands of people, and I have to trust the entire supply chain. We had issues with this sort of thing [in the past](https://thehackernews.com/2021/10/malicious-npm-libraries-caught.html), and supply chain attacks are not going away. There are [tools](https://socket.security/) that can help, though, and tracking simple things (like typos in package names) is a good start.

I missed two awesome talks and I'll update this page as I get them.

## CascadiaJS 2022

![](assets/blog/posts/cascadiajs-2021/4db36590c9ab23332ebe1b4e4c6b87da94b534e5-3500x1882.avif)

I don't know if I'll be able to make it, but that's the plan.

## Notes

### Day 1

![](assets/blog/posts/cascadiajs-2021/ef2922758eb0777d1b6e8a3cd37b4964fd766929-1000x1468.avif)
![](assets/blog/posts/cascadiajs-2021/7e9458bf0ebd514e89197c5f7756fa94e3f9f67d-1000x1426.avif)
![](assets/blog/posts/cascadiajs-2021/a62f12d0febaa0920f6f8ce2959e49a563ebae8c-1000x1473.avif)

### Day 2

![](assets/blog/posts/cascadiajs-2021/043d93499e585ef79237cdd82b4636d209b0a9be-1000x1442.avif)
![](assets/blog/posts/cascadiajs-2021/2184f74e42bc7fde1804f637bd1ba4904b004d19-1000x1419.avif)
![](assets/blog/posts/cascadiajs-2021/f32a113652ad3d13190749e4f548ef3b44eafc2b-1000x1451.avif)
![](assets/blog/posts/cascadiajs-2021/8cc1dc33c41ac5643aea8ea916a4f6f408a89d72-1000x1559.avif)
