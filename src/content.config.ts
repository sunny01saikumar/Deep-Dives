import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every Markdown file in src/content/articles becomes an article.
// The file name (without .md) becomes the address: my-first-post.md -> /articles/my-first-post/
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string().max(100, 'Keep titles under 100 characters so they fit in search results.'),
    // One or two sentences shown under the title and used for link previews.
    description: z.string().max(220, 'Keep the description under 220 characters.'),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Set to true to keep an article out of the published site while you write it.
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
