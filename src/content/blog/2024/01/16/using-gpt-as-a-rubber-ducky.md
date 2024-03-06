---
title: Using GPT as a rubber ducky
publishDate: 2024-01-16
description: "There's this popular practice among engineers to talk through problems out loud. When there's nobody around (or you don't want to interrupt others), this practice calls for talking to a rubber duck toy. Well, I found a great rubber ducky in ✨sparkling autocomplete✨ AKA generative pre-trained transformers."
category: "Web Development"
image:
  src: '@assets/blog/covers/generic.webp'
  alt: 'Generic blog post cover image'
---

## Why

I bet you've experienced this phenomenon at least once: as soon as you attempt to explain the issue you're having to a friend or a colleague, you suddenly realize how to solve it. Well, that's just how our brains work, nothing mysterious or magical about it. Talking through problems has always been a great way to figure out possible solutions, so it's always a good idea to discuss an issue with someone: even if they can't help you solve it, _you_ may stumble upon a solution just by explaining what you're dealing with.

Somethimes, though, you don't have anybody around that would listen to you. Not because you're a terrible person (well, not _necessarily_ because of that) but because everyone's busy, you're busy, or perhaps the issue is maddeningly, embarrassingly simply and you just need to solve it yourself. That's when [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging) is the way to go.

## What??

Yep, it's an actual thing. I mean, it has a Wikipedia page so it's real (these are the rules, sorry). Anyway, I can't count how many times I'd typed a Stack Overflow question or a lengthy message in Slack only to have an "aha!" moment, delete it all, and resolve whatever it was that needed resolving. Sure, it doesn't work **every** time, but it certainly works, like, _a lot_.

If you have an actual rubber duck toy, good for you. Cherish your friendship and all that. And while it's true that you don't have to use specifically a rubber duck toy, again, the rules are such that you take it, put it in front of you and pour your soul to it: what you're trying to do, how you're doing it, why this way in particular, what's not going right, what you've already tried, and so forth until either you find a solution, realize that you've tried everything, or the duck toy starts to respond in a tiny voice. In this last case, please, seek medical attention, otherwise, that's the entire technique.

It makes me sad and cringe, but I guess I'm a techbro at heart. Why use an outdated tech using _my hands_ when I could use a chat bot? Well, I mean, there are multiple reasons _why_ a rubber duck toy is better than a chat bot, but for the purposes of this post, let's just assume it's not. _Trust me, bro_, so to speak.

Anyway, I've found it very helpful to chat with an LLM the way I'd chat with a rubber ducky. It could be literally any LLM of your choice; for historical reasons, I have a ChatGPT account and that's what I've been using.

## How

I've covered the basics of it a few paragraphs back, but there area few things to keep in mind:

- unlike actual rubber duck toys, commercial generative pretrained transformers may use whatever you tell them in whichever way they please. Be mindful about this fact; if you're talking through a work-specific problem, make sure to make it as generic as possible - like a question you'd post publically on Stack Overflow.
- while it's tempting to just use whatever reasonably-sounding response you get, remember that LLMs/GPTs are designed to produce average of all _reasonably-sounding responses_ based on probability of the next word (or rather, token) in the sequence. There's a great albeit long [article](https://writings.stephenwolfram.com/2023/02/what-is-chatgpt-doing-and-why-does-it-work/) explaining how _exactly_ LLMs work. ChatGPT doesn't _understand_ your problem, it uses very large statistical model to predict how, on average, the response should sound. That's it, that's all there is.
- still, even having this _average_ of all possible responses in front of you could be helpful. I'd spotted typos, syntax nonsense, and very stupid basic mistakes that I've made by just looking at the responses or the code that ChatGPT had produced. Remember, the purpose of the exercise is for you to figure out stuff, not to get an _average_ of all possible solutions that has a 50/50 chance of being correct.

I know it may sound basic, obvious even. I bet there're thousands of engineers who're using GPTs as their rubber duckies. For me, it was kind of a breakthrough: I explain stuff in the chat window, generalize it, add relevant details, and _oh, fuck, of course, that's it_. Half of the time, as with actual real Slack messages, I don't even have to send my message to ChatGPT.

Just remember that everything you tell these GPT may and will be used to produce responses to other people's questions. Be careful about what you're asking your _Techbro Rubber Ducky™_. 🐤
