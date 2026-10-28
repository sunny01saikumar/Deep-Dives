// Usage: npm run new -- "My article title"
// Creates src/content/articles/my-article-title.md as a draft, ready to write.
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const title = process.argv.slice(2).join(' ').trim();

if (!title) {
  console.error('Give the article a title, for example:\n  npm run new -- "How tides work"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .normalize('NFKD')
  .replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '');

if (!slug) {
  console.error('The title needs at least one letter or number.');
  process.exit(1);
}

const dir = join('src', 'content', 'articles');
const file = join(dir, `${slug}.md`);

if (existsSync(file)) {
  console.error(`${file} already exists. Pick a different title or edit that file.`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const safeTitle = title.replace(/"/g, '\\"');

mkdirSync(dir, { recursive: true });
writeFileSync(
  file,
  `---
title: "${safeTitle}"
description: "One or two sentences that say what the reader will learn."
pubDate: ${today}
tags: []
draft: true
---

Start writing here.

## First section

Use \`##\` headings for sections. A table of contents is added automatically once there are three or more.
`,
);

console.log(`Created ${file}\nRun "npm run dev" to preview it. Change draft to false when it is ready to publish.`);
