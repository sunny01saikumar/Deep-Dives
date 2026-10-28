import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { SECTION_SLUGS } from './config';

// Every Markdown file in src/content/articles becomes a story.
// The file name (without .md) becomes the address: my-story.md -> /articles/my-story/
const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z
    .object({
      title: z.string().max(140, 'Keep headlines under 140 characters so they fit in search results.'),
      // One or two sentences shown under the headline and used for link previews.
      description: z.string().max(260, 'Keep the summary under 260 characters.'),
      // Which menu section the story belongs to. See SECTIONS in src/config.ts.
      section: z.enum(SECTION_SLUGS),
      // en or te. Sets the language filter, fonts and page language.
      lang: z.enum(['en', 'te']).default('en'),
      // Date and time, for example 2026-10-29T08:30:00+05:30 (+05:30 is India time).
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().optional(),

      // Cover picture: the file name of an image saved in src/assets/images/
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      imageCaption: z.string().optional(),

      // A YouTube link or video ID. It shows a player under the headline.
      video: z.string().optional(),

      // Photo gallery: a list of pictures saved in src/assets/images/
      gallery: z
        .array(
          z.object({
            image: z.string(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),

      tags: z.array(z.string()).default([]),

      // breaking: shows under the Breaking label in the ticker below the menu.
      // top: eligible for the big lead slot on the home page.
      // trending: appears in the Trending list.
      breaking: z.boolean().default(false),
      top: z.boolean().default(false),
      trending: z.boolean().default(false),

      // Set to true to keep a story off the live site while you write it.
      draft: z.boolean().default(false),
    })
    .refine((d) => !d.image || d.imageAlt, {
      message: 'Add imageAlt: one sentence describing the cover picture for readers who cannot see it.',
      path: ['imageAlt'],
    }),
});

export const collections = { articles };
