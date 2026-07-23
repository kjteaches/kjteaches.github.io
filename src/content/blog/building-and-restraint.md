---
title: "Notes on building"
description: "We're so preoccupied with whether we can, we don’t stop to think if we should"
featured: true
order: 2
draft: false
---

I've been building for the better part of a decade, so I'm aware I'm _inside_ the glass house, but I always try to build only when I need to.

The excellently named [Screenpapa](https://screenpapa.netlify.app/), for instance, came about because I was spending too much time going between tools. I'd take screenshots and make barebones annotations using [Shottr](https://shottr.cc/), copy them to my clipboard, then bring them over to [Fabpic](https://www.fabpic.app/) for the border. Both are paywalled, and Shottr is Mac-only, so I felt boxed in from the start.

And that’s just my workflow, as part of a team where that specific workflow wasn’t standardized. Some people used Canva, some people used Microsoft Paint, none of our annotated screenshots looked like they came from the same planet.

Whenever we _did_ try to standardize, a lot of times the tools would go offline for long stretches, and either never came back or returned with, you guessed it, paywalls. It’s actually concerning how many times this happened.

Obviously, we had to take matters into our own hands. Screenpapa was a long-deliberated option that succeeded because it was OS-agnostic, free, in our control, and free of local file management.

For everything that I’ve shipped, though, there's a dozen that didn't, often because I spent a bit more time looking and found something already available and mature. Off the top of my head, I've scrapped projects in diff checking (for [Diffchecker](https://www.diffchecker.com/)), visual markdown editing (for [StackEdit](https://stackedit.io/)), improved code annotations (for [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)), and diagramming (for [Diagrams.net](https://app.diagrams.net/)).

Each of those products has a team that's spent years, sometimes decades, fine-tuning it. The smart move is to take full advantage of their expertise and dedicate my time to something more productive.

Which brings me to April 2026, when I was finally given access to an e-commerce project that had been hyped for the preceding _weekend_ (a whole weekend!) as being “next level”.

This was the dashboard for the custom CMS it was using:

![Custom CMS screenshot](/src/content/images/the-cms-in-question.jpg)

If you're a certain kind of person, you just felt your skin crawl. If you’re me, you have a decision to make: A) encourage the builder’s spirit as yours was, years ago or B) tell them about WordPress.

I only have the one life. I wouldn’t want to spend it cataloging everything that could go wrong on a site spun up on a free account on chatgpt dot com. Instead, I initiated a respectful conversation with the project lead, where I told them about WordPress. They were, understandably, not thrilled to hear this. I got an earful (SMS-ful, actually) about being too high in my ivory tower to even give the project a look.

So, I gave it a look. It took an evening – hours of said life I'll never get back – and almost no effort to find:

- The entire "site" was a collection of static pages that weren't connected to anything, or each other beyond referencing URLs
- There's no server, backend, or database; everything relies on localStorage
- The numbers were so unrealistic I assumed they were placeholders for the demo. Turns out they were hard-coded, because, again, there's nothing to pull them from
- It connects to Stripe for payments, but the localStorage thing means anyone can drop the price to as low as $1 during checkout, right from their browser
- The Stripe API key was sitting in the client-side code, of course
- “Authentication” that logged you into the admin section as long as the login fields weren’t empty. Type literally anything, hit Enter and the project lead’s actual real-life banking info is right there staring at you in plain text

I’d seen enough and had to stop for my own well-being. I recorded and sent a short Loom demonstrating that last issue. Went to the admin login page, mashed my keyboard and hit Enter then zoomed in on their card number.

I haven't heard back since.
