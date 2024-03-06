---
title: 'Docker and Node 20 on M1 Macs'
description: "If you trying to build a Node 20 image with Docker on Apple Silicon while upgrading from an older Node versions, you may get stuck on the `npm install` step. There's an easy fix for it."
publishDate: 2023-09-17
category: "Web Development"
image:
  src: '@assets/blog/covers/docker-and-node-20-on-m1-macs.png'
  alt: 'Generic blog post cover image'
---

## TL;DR

Without dragging this any further, check your Docker Desktop "Experimental Features" setting and make sure to uncheck "**Use Rosetta for x86/amd64 emulation on Apple Silicon**".

## How did I get here?

I've been doing some maintenance at work of one of the service my team owns. As part of this maintenance, I needed to upgrade Node runtime the service uses from an older Node (it had Node 16 and even one Node 14 service) to the current stable version. This version is Node 20 as of this writing, and it was supposed to be a fairly easy change. Feature updates were out of scope in this particular case; I didn't need to, say, replace every `node-fetch` with global fetch, or leverage top-level `await` across the code base, so in theory the change should've been trivial. I just needed to update the required `engines`, all of the `rc` files (`.npmrc`, `.nvmrc`, etc), make sure dependencies don't break, tests and builds work as expected, and finally update `Dockerfile` for each service to use `node:20-alpine`. Easy enough.

When I got all the way to the `Dockerfile` update step, things started getting weird. No matter what I did, the build step would stall on `npm install` step. I tried explicitly selecting specific npm versions, using different Node images (`node:20-slim`, `node:20`, etc), nothing worked. The `silly` loglevel indicated that the step that `npm install` was stalling at was on `idealTree`, basically, the first real installation step. Ok, I thought, it certainly has something to do with my work machine being an M1 Mac, so I tried all sorts of combinations of commands with `--platform linux/amd64` to no effect. And the most frustrating part was that Node 16 and Node 18 were building just fine; the issue only presented itself with Node 20.

Did I reboot my computer? Yes. Restart Docker multiple times? Yes. Read through a dozen of articles and however many StackOverflow pages? Sure, yes. Talk to more experienced folks on my team? You guessed it.

The consensus at this point was that it's most likely something on "_my machine_". But what? I've got the correct Docker version, same as everybody else. I guess, I'll just go and turn settings in Docker on and off until I find the cause of this problem.

And there it was. A while back, when trees were tall and Docker barely worked on M1 Macs, I've enabled this rather obscure experimental feature called "**Use Rosetta for x86/amd64 emulation on Apple Silicon**": it made something that didn't work at the time actually work. As it turned out, it also made something that was supposed to work now not work at all. Unchecking this feature resolved the issue, and I was able to finally finish the upgrade.

I have no idea why this would be the case, yet here we are. Hope it helps someone in a similar situation.
