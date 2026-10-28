---
title: "How to publish an article on Deep Dives"
description: "Everything you need to write, preview and publish a new article, from the first line of Markdown to the live page."
pubDate: 2026-10-29
tags: ["Guide", "Writing"]
---

Publishing here takes three steps: write a Markdown file, check it in the preview, and push it to GitHub. The site rebuilds itself and the article appears a minute or two later. This article is also a sample, so it uses every kind of formatting the site supports. Delete it whenever you like.

## Start a new article

The quickest way is the helper command. It creates a draft with the right header already filled in.

```bash
npm run new -- "How tides actually work"
```

That creates `src/content/articles/how-tides-actually-work.md`. The file name becomes the web address, so this article will live at `/articles/how-tides-actually-work/`.

You can also create the file by hand. Any `.md` file in `src/content/articles/` becomes an article.

## The header at the top of every article

Each article starts with a short block between two lines of three dashes. It tells the site everything it needs to list the article.

```yaml
---
title: "How tides actually work"
description: "Why the sea rises twice a day, and why it is not just the moon."
pubDate: 2026-11-02
updatedDate: 2026-11-09
tags: ["Physics", "Oceans"]
draft: false
---
```

| Field | Required | What it does |
| --- | --- | --- |
| `title` | Yes | Shown as the headline, in search results and in link previews. |
| `description` | Yes | One or two sentences shown under the headline and on the home page. |
| `pubDate` | Yes | The publish date, written as year-month-day. Newest articles are listed first. |
| `updatedDate` | No | Shows an "Updated" date when you revise an article. |
| `tags` | No | Topics for the article. Each tag gets its own page. |
| `draft` | No | While this is `true`, the article is visible on your computer but left out of the live site. |

## Write the article

Everything below the header is plain Markdown. A few things worth knowing:

- Use `##` for section headings and `###` for sub-sections. Three or more `##` headings add a table of contents at the top.
- Reading time is worked out for you from the word count.
- **Bold**, *italic* and [links](https://github.com/sunny01saikumar/Deep-Dives) work the way you would expect.

> Quotes are set apart with a yellow rule on the left, which makes them easy to find when you scroll back.

Code blocks get colors that follow the light or dark theme:

```js
function readingTime(words) {
  const wordsPerMinute = 238;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}
```

### Add an image

Put the picture in the `public/images/` folder, then refer to it with the full path, including `/Deep-Dives`:

```md
![A short description of the picture](/Deep-Dives/images/tide-chart.png)
```

The description matters. It is read aloud to people who cannot see the picture, and shown if the picture fails to load.

## Preview it

Run the site on your own computer to see the article as readers will:

```bash
npm install
npm run dev
```

Open the address it prints. The page updates each time you save the file.

## Publish it

Change `draft` to `false` (or delete that line), then commit and push:

```bash
git add .
git commit -m "Publish: How tides actually work"
git push
```

GitHub builds the site and publishes it. You can watch progress in the **Actions** tab of the repository. When the run turns green, the article is live.
