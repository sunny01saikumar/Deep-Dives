---
title: "How to publish a story on Deep Dives"
description: "Write a Markdown file, add a picture if you have one, and push to GitHub. Every option a story can have, in one place."
section: technology
lang: en
pubDate: 2026-10-29T01:10:00+05:30
author: "Deep Dives Desk"
image: "sample-06.jpg"
imageAlt: "Abstract placeholder picture of teal and yellow circles on a dark background"
imageCaption: "Placeholder picture. Replace it with your own photo."
tags: ["Guide", "Sample"]
---

Publishing here takes three steps: write a Markdown file, check it on your computer, and push it to GitHub. The site rebuilds itself and the story appears a minute or two later. This story is also a sample, so it uses every kind of formatting the site supports. Delete it, and the other stories tagged **Sample**, when you are ready to publish your own.

## Start a new story

The quickest way is the helper command. It creates a draft with the header already filled in.

```bash
npm run new -- "Your headline here"
```

That creates `src/content/articles/your-headline-here.md`. The file name becomes the web address, so this story lives at `/articles/your-headline-here/`. You can also create the file by hand: any `.md` file in that folder becomes a story.

## The header at the top of every story

Each story starts with a short block between two lines of three dashes.

```yaml
---
title: "Your headline here"
description: "One or two sentences that sum up the story."
section: india
lang: en
pubDate: 2026-11-02T09:30:00+05:30
image: "my-photo.jpg"
imageAlt: "What the photo shows, in one sentence"
tags: ["Hyderabad", "Rain"]
top: true
---
```

| Field | Required | What it does |
| --- | --- | --- |
| `title` | Yes | The headline. |
| `description` | Yes | The summary shown under the headline and on the home page. |
| `section` | Yes | Where it appears in the menu: india, world, politics, business, sports, entertainment or technology. |
| `lang` | No | `en` for English (the default) or `te` for Telugu. |
| `pubDate` | Yes | Date and time. The `+05:30` at the end means India time. Newest stories are listed first. |
| `updatedDate` | No | Shows an "Updated" time when you change a story. |
| `author` | No | Shown in the byline. |
| `image`, `imageAlt`, `imageCaption` | No | The cover picture. `imageAlt` is required whenever there is an image. |
| `video` | No | A YouTube link. A player appears under the headline. |
| `gallery` | No | A list of pictures for a swipeable photo gallery. |
| `tags` | No | Topics. Each tag gets its own page. |
| `breaking` | No | `true` puts the headline in the Breaking ticker under the menu. |
| `top` | No | `true` makes the story eligible for the big lead slot on the home page. |
| `trending` | No | `true` adds it to the Trending list. |
| `draft` | No | `true` hides the story from the live site while you write it. |

## What the home page shows

- **Ticker:** stories marked `breaking: true`. When none are, it shows the latest headlines under a Latest label instead.
- **Lead story:** the newest story marked `top: true`, or simply the newest story.
- **Trending:** stories marked `trending: true`, newest first. You choose these by hand, because the site does not track what readers open.
- **Videos and Photos:** any story with a `video` or a `gallery`.

## Add pictures

Save the picture in `src/assets/images/` and refer to it by file name only. The site makes smaller copies for phones automatically.

```yaml
image: "flood-relief.jpg"
imageAlt: "Volunteers loading relief packets onto a truck"
gallery:
  - image: "camp-1.jpg"
    alt: "A queue outside a relief camp"
    caption: "Families wait at the camp on Monday morning."
  - image: "camp-2.jpg"
    alt: "Volunteers sorting food packets"
```

Use pictures you took or have permission to publish, and say who took them in the caption.

## Add a video or a live stream

Paste any YouTube link into `video:`. The player loads only when a reader presses play.

```yaml
video: "https://www.youtube.com/watch?v=lJouRKHuO4g"
```

To show a live TV block on the home page, put a YouTube live video ID or channel ID in `LIVE` in `src/config.ts`.

## Mark a story as Telugu

Add `lang: te` and write the story in Telugu. The page gets Telugu fonts and menu labels, and the language switch at the top of the site filters by language.

## Preview and publish

```bash
npm install
npm run dev
```

Open the address it prints and check the story. When it is ready, change `draft` to `false` (or delete the line), then commit and push:

```bash
git add .
git commit -m "Publish: Your headline here"
git push
```

GitHub builds the site and publishes it. Progress is in the **Actions** tab of the repository.
