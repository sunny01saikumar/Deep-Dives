import { getCollection, type CollectionEntry } from 'astro:content';
import readingTime from 'reading-time';
import { SECTIONS, SITE, type Lang, type LangFilter } from '../config';
import { locale } from './i18n';
import { youtubeId } from './video';

export type Article = CollectionEntry<'articles'>;

/** All published stories, newest first. Drafts are hidden in production builds only. */
export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection('articles', ({ data }) =>
    import.meta.env.PROD ? !data.draft : true,
  );
  return entries.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function byLang(articles: Article[], filter: LangFilter): Article[] {
  return filter === 'all' ? articles : articles.filter((a) => a.data.lang === filter);
}

export function bySection(articles: Article[], slug: string): Article[] {
  return articles.filter((a) => a.data.section === slug);
}

/** Whole minutes to read, never less than 1. */
export function minutesToRead(article: Article): number {
  return Math.max(1, Math.ceil(readingTime(article.body ?? '').minutes));
}

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ఀ-౿]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Tags with their stories, most-used first. */
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

type DateStyle = 'long' | 'short' | 'time';

/** Dates are always shown in India time so every reader sees the same clock. */
export function formatDateTime(date: Date, lang: Lang = 'en', style: DateStyle = 'long'): string {
  const options: Intl.DateTimeFormatOptions =
    style === 'long'
      ? { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }
      : style === 'short'
        ? { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }
        : { day: 'numeric', month: 'short', year: 'numeric' };
  return new Intl.DateTimeFormat(locale(lang), { ...options, timeZone: SITE.timeZone }).format(date);
}

export function formatDate(date: Date, lang: Lang = 'en'): string {
  return formatDateTime(date, lang, 'time');
}

export function articleHref(article: Article): string {
  return `/articles/${article.id}/`;
}

export function hasVideo(article: Article): boolean {
  return Boolean(youtubeId(article.data.video));
}

/** Everything the front page needs, picked from a (possibly language-filtered) list. */
export function pickFront(articles: Article[]) {
  const lead = articles.find((a) => a.data.top) ?? articles[0];
  const rest = articles.filter((a) => a !== lead);
  const secondary = rest.slice(0, 4);
  const latest = rest.slice(4, 12);

  const breaking = articles.filter((a) => a.data.breaking).slice(0, 8);
  const tickerItems = breaking.length > 0 ? breaking : articles.slice(0, 6);

  const trending = articles.filter((a) => a.data.trending).slice(0, 6);
  const videos = articles.filter(hasVideo).slice(0, 5);
  const galleries = articles.filter((a) => a.data.gallery.length > 0).slice(0, 6);

  const sections = SECTIONS.map((section) => ({
    section,
    articles: bySection(articles, section.slug).slice(0, 4),
  })).filter((s) => s.articles.length > 0);

  return {
    lead,
    secondary,
    latest,
    tickerItems,
    tickerIsBreaking: breaking.length > 0,
    trending,
    videos,
    galleries,
    sections,
  };
}
