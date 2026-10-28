import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../config';
import { getArticles } from '../lib/articles';
import { url } from '../lib/url';

export async function GET(context: APIContext) {
  const articles = (await getArticles()).filter((a) => !a.data.draft);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: new URL(url('/'), context.site).href,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.pubDate,
      link: url(`/articles/${article.id}/`),
      categories: article.data.tags,
    })),
    customData: '<language>en</language>',
  });
}
