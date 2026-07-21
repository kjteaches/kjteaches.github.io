---
title: "Notes on system design and knowing your users"
description: "How do you build an app when half your users don't have smartphones?"
featured: true
order: 1
draft: false
---

These days, I don’t have nearly as much time as I used to for side projects. So, if an opportunity comes up, the best I can do is some in-depth system design with some architecture diagramming thrown into the mix.

That’s what happened a few months ago when I was approached with the idea for a managed marketplace. Vetted merchants could list goods and services for customers to browse, with a fleet of vetted couriers offering delivery and the company holding payments in escrow.

The target customer would fall somewhere on the spectrum between having a mid-range Android phone on metered, often unreliable mobile data, and no smartphone at all.

It all sounded great, until I got access to the WIP codebase.

To put it mildly, it was a mess.

When I joined the project, I found a:

- Next.js app
- On Vercel
- With a React frontend
- WebSocket-driven live features
- Stripe-only checkout
- Analytics that loaded _way_ too eagerly

You might have spotted some issues when trying to tie this stack back to the target audience, and you’re right.

My initial instinct was to catalog some of the biggest issues and suggest measured solutions. That worked for the first few days, but eventually that list grew so long that I had to confront the realization that this entire thing had to be scrapped and redone from the ground up.

The first design doc I submitted with a new direction didn’t go over too well. I have it open in another window, and I’ll admit it reads very steamroll-y. It doesn’t do enough to explain why certain areas needed to be gutted rather than reworked, and it barely acknowledges any strengths of the project as it existed.

While most of it did make the final cut, it doesn’t help that one of the suggestions was to switch from Next.js to SvelteKit. Really tipped the whole doc into “Trying to impose my own vision” territory.

Luckily the underlying ideas were strong, and we only needed to work out the execution. Through the power of communication, i.e. several hours on Google Meet spread across ~2 weeks – we refined the vision for the project!

I was brought in for the architecture, so barring disaster this is where I step off. The final design doc all bends toward keeping the platform fast and usable on a weak phone and a bad network.

Let’s go over how each layer gets there:

## Access channels

There’s no one path that works for every user, even in the limited spectrum we were aiming for, so there are three doors:

- The PWA covers people with a decent connection and even middling hardware.
- USSD covers people with no data or no smartphone at all.
- The WhatsApp bot covers people who want to stick with what they know. I respect that.

## Edge (Cloudflare)

Origin bandwidth and latency are the second biggest constraint, and serving every asset from one server means slow first loads. With Cloudflare, we could address this issue easily enough.

## Subdomains

The platform has three audiences, i.e. shoppers, merchants and riders, who all require different screens, permissions, update cycles, etc. Cramming all three into one interface produces an inflated app where every user loads code for roles they'll never use. Splitting by subdomain at login keeps each surface lean and lets the three evolve independently, while still sharing one backend.

For example, a rider's phone never loads the merchant POS, and vice versa.

## PHP application

An SPA framework, as originally proposed, ships a large JS bundle the browser must deal with before showing anything. It’s expensive + not ideal on a slow device and a slow connection. Server-rendered HTML arrives ready to display, so the phone renders it and stops. Tailwind is self-hosted so there's no extra DNS lookup.

Interactivity is hand-written vanilla JS layered on top, so the page works before the JS loads and degrades if it never does. URL rewriting gives shareable, indexable links over the .php files underneath.

## API endpoints

The dynamic bits, like finding nearby merchants and autocomplete are small, targeted .php handlers rather than one large API surface. Each returns only what a specific interaction needs, which keeps payloads small on a metered connection. The chat uses polling rather than a persistent socket because a held-open connection is fragile on a network that drops frequently; a poll that fails just retries on the next tick.

## Services

Payments run through mobile money (M-Pesa) and a stored wallet rather than cards, because that's how the users hold and move money. The card-only Stripe checkout would exclude most of them. Analytics is consolidated behind a single tag manager and deferred until the first scroll or tap, so tracking scripts don't compete with the page for a weak CPU and slow bandwidth during the most important load.

reCAPTCHA v3 guards the chat and support flow without a challenge screen to avoid the kind of friction that hurts conversions.

---

The platform is now [live](https://tinyurl.com/ycxmrsne) in a sort of soft launch, and the early performance looks promising. Whether the whole thing succeeds is out of my hands now, but as long as the architecture stays strong holding, I’m happy!
