---
title: "Investigating node_modules"
description: "Find out why they call me the Sherlock Holmes of the programming world"
featured: false
order: 4
draft: false
---

So many of my projects inevitably contain a folder called `node_modules`, and every one of those folders has been enormous. I don't create those folders. I have never looked inside those folders. I install the dependencies, the folder appears and I move on without thinking about it.

Well, I'm thinking about it today. _We_ are thinking about it today.

Specifically, we'm thinking about the `node_modules` folder belonging to this website, the one you're reading this very sentence on. This is what just the first level of subfolders looks like:

![node_modules subfolders](../images/node%20modules.gif)

Ridiculous.

My rational guess is it's all carefully-considered dependencies for the dependencies, but there's a small part of me that hopes it's like the unused photo of a coconut in Team Fortress 2 that [breaks the game if you take it out](https://www.reddit.com/r/tf2/comments/il8yyq/this_is_inside_the_tf2_game_files_as_coconutjpg/).

That'd be so funny.

Anyway, let's get started.

## The grand total

Running `du -sh node_modules` returns 160MB.

That is 8,988 files spread across 241 packages. My `package.json`, for comparison, lists a single dependency, one line that reads `"astro": "^7.1.1"`. Everything in those 160MB exists as a consequence of that one line.

The mechanism is transitive dependencies. `astro` depends on other packages, and those depend on others, down and down until you reach the packages that finally depend on nothing.

## The big ones

The 160 megabytes aren't spread evenly. The five largest directories account for about 67 of them, a little under half the folder in five places:

- `@rolldown` at 16MB
- `@img` (sharp, for image processing) at 16MB
- `@shikijs` (syntax highlighting) at 13MB
- `esbuild` at 11MB
- `@esbuild` at 11MB

That last pair is worth a closer look: `esbuild` appears twice, once as the wrapper and once as its platform-specific binary, for roughly 22MB between them.

Opening the biggest offenders revealed the pattern. They aren't JS like I'd expected, but compiled native binaries, shipped precompiled so nothing has to be built on install. Very useful.

Inside `@rolldown` is a single 16MB `.node` file, a Rust (?!) bundler, delivered whole. `lightningcss` contributes one 8.2MB `.node` file. The Astro compiler adds a 5.8MB one. And `sharp` brings a 16MB native image library of its own.

Every one of those binaries is named `darwin-arm64`. They were compiled for an Apple-Silicon Mac, because that's the machine this was installed on – which is a small reminder that `node_modules` isn't portable code so much as a machine-shaped cast of it. The four largest native binaries come to around 32MB; add sharp's image library and you're near 48MB of compiled, non-JavaScript code before any actual JavaScript is counted.

## The little ones

The other half of the folder is the opposite problem. It's not a few large things, but a great many small ones. Around 169 entries at the top level alone, most of them a few kilobytes each.

None of them is unreasonable on its own. Collectively they're most of the file count, if not most of the size. This is what one dependency looks like after it's been fully unpacked.

## The doubles

While counting, I found duplicates. `css-tree` is present at version 3.2.1 at the top level and again at 2.2.1, buried inside `csso`. `entities` appears as 6.0.1 and, separately, as 4.5.0 tucked under `dom-serializer`.

Initially, I thought this was the funny coconut.jpg evidence, but no. I dug and found that this is npm behaving correctly. It flattens and shares a single copy of a package wherever the version ranges allow it, but when two dependencies want genuinely incompatible versions, it can't collapse them so it keeps both, nested. Multiply that across a tree this size and a slow, invisible amount of the folder is simply the same code at two different ages.

Boo!

## That's not even code?

Technically, it's code in a Docs-as-Code way, but there are 225 Markdown files in here, spanning readmes, changelogs and contribution guidelines.

Now, you all know I love a good Markdown file, but will I ever read any of these?

Will I ever read any of these?

Will I read these 225 Markdown files in my computer?

## Case closed?

There's no _single_ reason `node_modules` is so large. It's precompiled native binaries built for one specific machine, plus a long tail of tiny transitive packages, plus a layer of duplicated versions, plus every readme anyone ever shipped. The folder never had the chance to be small. All of it descended from one dependency.

The reassuring part, which I only suspected before and which slightly deflates things, is that none of it ships. `node_modules` is a build-time staging area. The site you're reading is a few hundred kilobytes of HTML, CSS and JavaScript, assembled _using_ those 160 megabytes and then leaving them behind. The folder is scaffolding, and scaffolding is allowed to be unwieldy.

Well, we've looked inside now, got to the bottom of some very important questions. That is, except for one: Will I read these 225 Markdown files in my laptop computer?
