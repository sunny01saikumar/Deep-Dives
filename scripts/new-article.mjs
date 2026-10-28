// Usage:
//   npm run new -- "Your headline"
//   npm run new -- "Your headline" --section politics --lang te
// Creates src/content/articles/your-headline.md as a draft, ready to write.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SECTIONS = ['india', 'world', 'politics', 'business', 'sports', 'entertainment', 'technology'];
const LANGS = ['en', 'te'];

const args = process.argv.slice(2);
const options = {};
const words = [];
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    options[args[i].slice(2)] = args[++i];
  } else {
    words.push(args[i]);
  }
}

const title = words.join(' ').trim();
const section = options.section ?? 'india';
const lang = options.lang ?? 'en';

if (!title) {
  console.error('Give the story a headline, for example:\n  npm run new -- "Heavy rain expected in Hyderabad"');
  process.exit(1);
}
if (!SECTIONS.includes(section)) {
  console.error(`"${section}" is not a section. Choose one of: ${SECTIONS.join(', ')}`);
  process.exit(1);
}
if (!LANGS.includes(lang)) {
  console.error(`"${lang}" is not a language. Use en for English or te for Telugu.`);
  process.exit(1);
}

// Telugu headlines have no Latin letters, so fall back to a date-based file name.
const now = new Date();
const stamp = now.toISOString().slice(0, 16).replace(/[-:T]/g, '');
const slug =
  title
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || `story-${stamp}`;

const dir = join('src', 'content', 'articles');
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`${file} already exists. Pick a different headline or edit that file.`);
  process.exit(1);
}

// Current time in India, written with the +05:30 offset.
const ist = new Date(now.getTime() + 5.5 * 60 * 60 * 1000).toISOString().slice(0, 19);
const safeTitle = title.replace(/"/g, '\\"');

mkdirSync(dir, { recursive: true });
writeFileSync(
  file,
  `---
title: "${safeTitle}"
description: "One or two sentences that sum up the story."
section: ${section}
lang: ${lang}
pubDate: ${ist}+05:30
author: "Your name"
# image: "photo-name.jpg"          # save the picture in src/assets/images/
# imageAlt: "What the photo shows"  # required when there is an image
# video: "https://www.youtube.com/watch?v=..."
tags: []
# breaking: true   # show in the ticker
# top: true        # eligible for the big lead slot
# trending: true   # show in the Trending list
draft: true
---

Start writing here.

## A heading

Use \`##\` headings to split a longer story into parts.
`,
);

console.log(`Created ${file}\nRun "npm run dev" to preview it. Change draft to false when it is ready to publish.`);
