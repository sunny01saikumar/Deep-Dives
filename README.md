# Deep Dives

A news website in English and Telugu. Every story is a Markdown file, and every push to `main` rebuilds the site and publishes it to GitHub Pages.

**Live site:** https://sunny01saikumar.github.io/Deep-Dives/

## What readers get

- **Home page** with a Breaking ticker, a lead story, four side stories, Latest news, a Trending list, a Videos block (with an optional Live TV player), a block for each section, and Photos
- **Sections** in the menu: India, World, Politics, Business, Sports, Entertainment, Technology, plus Videos and Photos pages
- **English and Telugu** with a language switch at the top. Telugu pages get Telugu fonts and Telugu menu labels
- **Story pages** with byline, published and updated times in India time, share buttons (WhatsApp, X, Facebook, copy link), cover picture or video, photo galleries and related stories
- **Longer reads** (4 minutes or more) get a table of contents and a depth gauge in the margin showing how many minutes are left
- Search (press `/`), RSS feed, light and dark themes, phone-friendly layout, keyboard support, and print styles

## Publish a story

1. Create a draft:

   ```bash
   npm run new -- "Your headline"
   npm run new -- "Your headline" --section politics --lang te
   ```

   This creates a file in `src/content/articles/`. You can also add any `.md` file there by hand.

2. Fill in the header at the top and write the story below it:

   ```yaml
   ---
   title: "Your headline"
   description: "One or two sentences that sum up the story."
   section: india              # india, world, politics, business, sports, entertainment, technology
   lang: en                    # en or te
   pubDate: 2026-11-02T09:30:00+05:30
   author: "Your name"
   image: "photo-name.jpg"     # saved in src/assets/images/
   imageAlt: "What the photo shows"
   tags: ["Hyderabad"]
   top: true                   # eligible for the big lead slot
   draft: false
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
   git commit -m "Publish: Your headline"
   git push
   ```

   The **Actions** tab shows the build. When it turns green, the story is live.

The full list of header fields, with examples for pictures, galleries and video, is in the sample story *How to publish a story on Deep Dives*.

## How the home page picks stories

| Where | Which stories |
| --- | --- |
| Ticker | Stories with `breaking: true`. If none, the latest headlines appear under a Latest label. |
| Lead story | The newest story with `top: true`, otherwise the newest story. |
| Side stories and Latest news | The next newest stories. |
| Trending | Stories with `trending: true`. You choose these by hand, because the site does not track what readers open. |
| Videos | Stories with a `video`. |
| Photos | Stories with a `gallery`. |
| Section blocks | The four newest stories in each section. |

The language switch (All, English, తెలుగు) filters all of these.

## Pictures, video and live TV

- **Pictures:** save them in `src/assets/images/` and use the file name in `image:` or `gallery:`. The site creates smaller versions for phones. Always write `imageAlt`.
- **Video:** paste a YouTube link into `video:`. The player only loads from YouTube when a reader presses play.
- **Live TV:** put a YouTube live video ID or channel ID in `LIVE` in `src/config.ts`. A Live TV player then appears on the home page.

## First-time setup on GitHub

Do this once so the workflow is allowed to publish:

1. Open the repository on GitHub, then **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions**.
3. Push to `main`, or run the workflow from the **Actions** tab.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Runs the site locally with live reload. Drafts are visible. |
| `npm run build` | Builds the site and the search index into `dist/`. |
| `npm run preview` | Serves the built site locally, including search. |
| `npm run new -- "Headline"` | Creates a new draft story. Add `--section` and `--lang` to choose them. |

Search is created during the build, so it works in `npm run preview` and on the live site, but not in `npm run dev`.

## Make it yours

- **Site name, sections, Telugu labels, live stream:** `src/config.ts`. To add a section, add one line to `SECTIONS`.
- **Colors and fonts:** the variables at the top of `src/styles/global.css`
- **Custom domain:** in `astro.config.mjs`, set `site` to your domain and `base` to `'/'`, and update `public/robots.txt`

## Before you go live

- The stories tagged **Sample** are placeholders. Delete them (search the folder for `Sample`).
- The pictures named `sample-*.jpg` in `src/assets/images/` are generated placeholders.
- The Telugu sample stories and menu labels were written for this template. Have a Telugu reader check them before you rely on them.
- Only publish pictures and video you have the right to use, and credit them in the caption.

## How it is built

[Astro](https://astro.build) turns the Markdown files into plain HTML ahead of time, so pages load without waiting on a server. [Pagefind](https://pagefind.app) builds the search index, covering English and Telugu together. Fonts (Literata, Familjen Grotesk and the Noto Telugu fonts) are bundled with the site, so no outside requests are made.

```
src/content/articles/   your stories (Markdown)
src/assets/images/      pictures used by stories
src/pages/              home, section, story, topic, video, photo and feed pages
src/components/         story cards, ticker, trending list, video, gallery, share bar
src/layouts/            the page frame, header, footer and search
src/styles/global.css   colors, type and layout
.github/workflows/      the automatic deploy
```
