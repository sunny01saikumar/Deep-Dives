import { getCollection, type CollectionEntry } from 'astro:content';
import readingTime from 'reading-time';

export type Article = CollectionEntry<'articles'>;

/** All published articles, newest first. Drafts are hidden in production builds only. */
export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection('articles', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

/** Whole minutes to read, never less than 1. */
export function minutesToRead(article: Article): number {
  return Math.max(1, Math.ceil(readingTime(article.body ?? '').minutes));
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Tags with their articles, most-used first. */
export function groupByTag(articles: Article[]) {
  const map = new Map<string, { slug: string; name: string; articles: Article[] }>();
  for (const article of articles) {
    for (const name of article.data.tags) {
      const slug = tagSlug(name);
      const group = map.get(slug) ?? { slug, name, articles: [] };
      group.articles.push(article);
      map.set(slug, group);
    }
  }
  return [...map.values()].sort(
    (a, b) => b.articles.length - a.articles.length || a.name.localeCompare(b.name),
  );
}

export function formatDate(date: Date, style: 'long' | 'short' = 'long'): string {
  return new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}
