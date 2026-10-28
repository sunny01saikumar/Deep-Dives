# Deep Dives

A fast, readable website for long-form articles. Articles are plain Markdown files, and every push to `main` rebuilds and publishes the site to GitHub Pages.

**Live site:** https://sunny01saikumar.github.io/Deep-Dives/

## What readers get

- A clean reading column with comfortable type, and a **depth gauge** in the margin that shows how far down they are and how many minutes are left
- Reading time on every article, and a table of contents on longer ones
- Search (press `/` on any page), topic pages, an archive and an RSS feed
- Light and dark themes that follow the device setting, with a manual switch
- Works on phones, supports keyboard navigation and reduced motion, and prints cleanly

## Publish an article

1. Create a draft:

   ```bash
   npm run new -- "Your article title"
   ```

   This makes `src/content/articles/your-article-title.md`. You can also add any `.md` file to that folder by hand.

2. Fill in the header at the top of the file and write the article below it in Markdown:

   ```yaml
   ---
   title: "Your article title"
   description: "One or two sentences that say what the reader will learn."
   pubDate: 2026-11-02
   updatedDate: 2026-11-09   # optional
   tags: ["Topic one", "Topic two"]
   draft: false              # true keeps it off the live site
   ---
   ```

3. Preview it on your computer:

   ```bash
   npm install   # first time only
   npm run dev
   ```

4. Publish by pushing to `main`:

   ```bash
   git add .
   git commit -m "Publish: Your article title"
   git push
   ```

   The **Actions** tab shows the build. When it turns green the article is live.

Images go in `public/images/` and are used in Markdown as `![Describe the picture](/Deep-Dives/images/name.png)`.

## First-time setup on GitHub

Do this once so the workflow is allowed to publish:

1. Open the repository on GitHub, then **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main` (or run the workflow from the **Actions** tab).

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the site locally with live reload. Drafts are visible. |
| `npm run build` | Builds the site and the search index into `dist/`. |
| `npm run preview` | Serves the built site locally, including search. |
| `npm run new -- "Title"` | Creates a new draft article. |

Search is created during the build, so it works in `npm run preview` and on the live site, but not in `npm run dev`.

## Make it yours

- **Name, tagline, author:** `src/config.ts`
- **Colors and fonts:** the variables at the top of `src/styles/global.css`
- **Custom domain:** in `astro.config.mjs`, set `site` to your domain and `base` to `'/'`, and update the sitemap line in `public/robots.txt`

## How it is built

[Astro](https://astro.build) turns the Markdown files into plain HTML ahead of time, so pages load without waiting on a server. [Pagefind](https://pagefind.app) builds the search index. Fonts (Literata and Familjen Grotesk) are bundled with the site, so no outside requests are made.

```
src/content/articles/   your articles (Markdown)
src/pages/              home, article, topic, about and feed pages
src/layouts/            the page frame, header, footer and search
src/components/         article list rows and the depth gauge
src/styles/global.css   colors, type and layout
.github/workflows/      the automatic deploy
```
