---
title: 'New OS, Who Dis: Going Linux after 15 years on Mac'
publishDate: 2019-08-25
description: 'A story of a hardcore Mac user of 15 years switching to Linux and loving it.'
category: 'Open Source'
image:
  src: '@assets/blog/covers/generic.webp'
  alt: 'Generic blog post cover image'
---

the In 2005, I bought my first Mac mini. It had 1.25 Ghz G3 processor, like, 256 Mb of RAM, and a 40 Gb HDD. At the moment, it was the most exciting device I’ve ever owned. Mac OS X was such a blow of fresh air after Windows XP! It was well-designed, friendly, relatively fast, quiet. It had all the apps I wanted to use, and since I’ve never been a gamer, lack of gaming titles didn’t bother me at all. I was in love with Apple. In the years since, I owned a bunch of Macbooks, a couple of iMacs, all kinds of iPhones, iPads, and a pair of Apple Watches. My family is a full Apple house.

Apple of 2005 is not the same company like Apple in 2019. I’m not going to get into everything that makes Apple of 2019 into a Microsoft of 2005, and it’s not fair to compare them one to one, still, I’m convinced that these two have way more in common these days then they are different. Anyway, I’m not here to start another holy war, I’m just documenting my journey.

## Reasons

I’ve been thinking about leaving the Apple ecosystem for a while now. Apple has been slow to innovate or even uphold any level of quality of their laptops. In late 2016 I bought the latest and presumably the greatest MacBook Pro with TouchBar, and I had never been so disappointed in any Apple product, and possibly, in any piece of technology in a very long while. TouchBar is an unusable gimmick that replaced perfectly good function keys. The butterfly keyboard is by far, the very worst keyboard I’ve ever seen or used in my entire life (not to mention that I had to replace it twice because it’s constantly breaking due to its poor design). The computer is slow as heck (my bad, I could only afford 8 gigs of RAM), holds the charge for like 2 hours of light web browsing, tops, only has these stupid USB-C ports, doesn’t have an SD-card reader, has a relatively meh screen by today standards, no graphic card to speak of, and doesn’t support touch. Its operating system and applications are stale at best, and the day when Apple prevents any non-Apple-App-Store software from running on their laptops is closer than you think. You can service literally zero components of a computer that you (presumably) own.

Now that I’ve got it out of my system, let’s get to the real reason: **Apple is boring as hell**. I remember when they were at the forefront of things, now they are just a fashion brand of mediocre tech and status quo. All interesting things in the tech industry are happening elsewhere, and it’s been like this for a while now.

I want an adventure. I want new stuff. I want the cutting edge. I want round pegs in the square holes. I want to be with the misfits, the crazy ones. With the ones who see things differently.

## The Plan

To this day, I haven’t had any serious day-to-day experience with Linux. I use Windows 10 at work, and it’s a pretty ok system, but it’s not something I want to deal with in my personal life for a variety of reasons (from the fact that direction may and will change, and you have no input, to the fact that you get system “as is”, and it always be like that.)

The only alternative I know to Windows and Mac OS is Linux in all its flavors (don’t get me started saying that there’s also ChromeOS. Not only it’s Linux-based, it’s quite a joke, tbh). So my plan was simple: try some Linuxes (or is it **Linuxi?**), make sure they meet my needs, gradually transition my work to Linux, and finally migrate to some decent hardware as well. This is a sensible thing to do, a smooth and straightforward plan. So, yeah. I did none of this in this order. What I did, I outright bought a performance laptop, slapped Ubuntu on it, and haven’t opened my MacBook for a week. This is how real **crazy ones** explore new things, amirite?

## The Process

Here’s how it went. I’ve been reading about different branches of Linux, different flavors, desktop environments, and all things in between. I watch countless hours of Youtube reviews of different hardware, how it plays with different software, what works, what doesn’t, how things are done, what they look like, what gets the Linux people excited, and so forth. It actually took me down the rabbit hole of open-source software, decentralization, privacy, and other things, so much so that I’ve completely left mainstream social networks for Mastodon. But this is a whole [different story](/blog/digital-hygine) - a story of me suddenly realizing that I’ve been doing my digital hygiene and social media all wrong this whole time.

Anywho. Selecting a distro is like whoa?! 😲 There're hundreds if not thousands of them, most of them are so much alike, but some are so very different. Some have an underlying philosophy that drives the whole thing, some just have a cuter set of icons and a friendlier setup guide.

So how do I choose? Should I try Debian? After all, it runs on my home server. Or maybe, Ubuntu? I’ve tried it a few times in the past, and it runs on all my Digital Ocean instances. Maybe, Arch? It’s so customizable, they said. Manjaro, the friendly Arch? Fedora? CentOS? Mint? KDE Neon? OpenSUSE?

And what about desktop environments? They are, again, so alike, yet so different. GNOME looks ok, but KDE people tend to bash it a lot, and Plasma 5 indeed looks amazing. Perhaps, Cinnamon? Bungie? MATE? Maybe, Xfce? Pantheon? Deepin?

And what about hardware? Do NVidia cards work with Linux or do they not? Or is it the integrated Intel stuff that doesn’t work (or does it work?) What about HiDPI screens? Touch? External audio interfaces?

So here’s what I learned. **Literally, none of this matters.** When you’re just starting out, just go with the largest community, most available information, and just start somewhere. As far as hardware goes, Linux is at the point where it doesn’t matter what hardware you have, it will almost certainly support it. Worst case scenario, you’d need to type a few things into a command line, and maybe reboot.

## Status

Right now, I’m on a top-notch Dell XPS 15, 32 Gb of RAM, 1 TB of fast SSD and an Ubuntu. It’s been fantastic so far. I enjoy tinkering with the system, tweaking every little thing to my liking, although arguably GNOME doesn’t bend as far as KDE does. I’ve installed all the apps I need, including Steam, and with NVidia card on (I can turn it on and off at will), games look fantastic on this incredible HiDPI OLED touchscreen. I do venture into other live distros that I store on an SD card (yep, I’ve got an SD card reader here! Screw you, Apple!) It’s been almost 5 hours since I’ve unplugged the charger; I’ve been coding a bit, watching videos, listening to music in the background (and switching between tracks with predictable function keys), and writing this post on this great keyboard. Battery holds at 40%, and I haven’t really done any serious optimizations yet (although I plan to; I want to see if I can make this baby run for 10 hours on a single charge while I’m doing some meaningful work.)

Are there quirks? Oh, hell yes. For starters, I’ve got a really new Killer Wifi card here, and apparently, it hasn’t made its way into the kernel yet. So I had indeed struggled for a few minutes until I found a step-by-step (with 2 steps, really) tutorial on how to add this specific card driver to my system. It will, of course, be included in the fall system update. Aside from that, some weirdness is going on with some VS Code shortcuts (they are supposed to work, but they don’t, specifically `Shift+Alt+Up/Down`); email clients are trash (not that I use them anyway, but still), Firefox is surprisingly unstable (it crashes whenever another app tries to open a browser window) (**UPD**: **Mozilla has already fixed this along with other minor annoyances**.) There are tricky issues with .NET (it installs, runs, and builds just fine, but some weirdness is going on with serving server responses and SSL, not sure yet). Overall visual language in GNOME is outdated, even though I’d say it’s meh bordering with ok. As for the laptop itself, speakers are narrowly passable at best. Oh, and the fingerprint scanner doesn’t work, and on the first try, the external monitor didn’t connect right away (pending investigation). HiDPI screen is also quirky in that scaling is basically 100%, 200%, or 300%, and some apps get confused (although, I’ve already seen Nextcloud fix it before my eyes: 2 days ago it was confusing, now it’s all good). Notifications in GNOME are useless since you can’t really really read the third line (and if click as to expand, they just clear up). I bet I’ll think of something else before next weekend.

## What’s next

Glad you asked! Next, I’m staying here for as long as this laptop lasts. With these specs, this solid quality build, and this level of future-proofing and serviceability (oh yeah, I can replace the SSD with a bigger one eventually; memory is topped out, though, but the battery is replaceable and serviceable as well) it could last me for 10 years. Sure, it’s still very early, but I’m so very happy with this move, I can’t even. So, will see.

As a side note here, I’m researching GNOME themes. I mean, out of dozens and dozens that I’ve seen, literally, none are good. I’m on Arc-Darker now, and I can stand it, but I’m looking into building my own theme. I’ve heard they are CSS-based ;)
