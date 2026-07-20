# My Portfolio

This is a static portfolio and blog built with Astro. Every project and post is a
Markdown file. Astro validates each file against a schema when the site builds
and outputs static HTML. There's no database or CMS, and the only content type
to manage is Markdown.

Configured to deploy to GitHub Pages.

## Structure

```
public/               favicon, one small script for the home-page accordion
src/
  content.config.ts   defines the collections and their fields
  content/
    blog/             posts
    projects/         projects
  pages/              the routes
  layouts/            the shared page shell
  lib/                reading-time helper
  styles/             all styling
```

## Content

Content is split into two collections, `blog` and `projects`. Each entry is a
Markdown file with a frontmatter block at the top. The frontmatter is checked
against a schema at build time, so a missing title or a malformed link stops the
build and points at the file rather than shipping a broken page.

Both collections use these fields:

| Field         | Required | Default | Purpose                                                      |
| ------------- | -------- | ------- | ------------------------------------------------------------ |
| `title`       | yes      | —       | The entry's title.                                           |
| `description` | yes      | —       | A short summary, shown in lists and as the page description. |
| `featured`    | no       | `false` | Puts the entry on the home page.                             |
| `order`       | no       | `0`     | Sort position within a list, lowest first.                   |
| `draft`       | no       | `false` | Hides the entry from the site.                               |

Projects add two fields: `url`, a link to the live project, and `stack`, the
technologies it was built with.

Filenames become URLs: `screenpapa.md` is served at `/projects/screenpapa`. A
filename starting with `_` is left unpublished.

## How project links behave

A project's `url` field controls where its entry goes when clicked:

- With a `url`, the entry opens the live project in a new tab.
- Without a `url`, the entry opens a page built from the Markdown file's body,
  so that write-up becomes the destination.

## Pages

| Path               | Shows                                                          |
| ------------------ | -------------------------------------------------------------- |
| `/`                | An accordion of sections and a panel of recent posts.          |
| `/projects`        | Every project, in `order`.                                     |
| `/projects/<name>` | A single project write-up (only for projects without a `url`). |
| `/blog`            | Every post, each with a reading time.                          |
| `/blog/<name>`     | A single post, with a reading time.                            |

Drafts are hidden everywhere. Reading times are estimated from each post's
length.

## Adding a project or post

1. Add a Markdown file to `content/projects` or `content/blog`. Start the name
   with `_` to keep it unpublished while you work.
2. Fill in `title` and `description`. Everything else is optional.
3. For a project, either set `url` to point at the live project, or leave it off
   and write a body that becomes the project's page.
4. Set `featured: true` to feature it on the home page, and use `order` to place
   it.
5. Build. A valid file publishes itself while an invalid one fails the build and says
   what's wrong.

## Running it

```
npm install
npm run dev       # local preview while editing
npm run build     # build the static site to dist/
npm run preview   # serve the built site
```
