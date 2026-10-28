import { LANGUAGES, SECTIONS, UI, type Lang, type LangFilter, type UIKey } from '../config';
import { url } from './url';

/** The language used for the page chrome (menu, labels). "All" uses English. */
export function pageLang(filter: LangFilter): Lang {
  return filter === 'te' ? 'te' : 'en';
}

export function t(lang: Lang, key: UIKey): string {
  return UI[lang][key];
}

export function sectionLabel(slug: string, lang: Lang): string {
  const section = SECTIONS.find((s) => s.slug === slug);
  return section ? section[lang] : slug;
}

export function locale(lang: Lang): string {
  return LANGUAGES.find((l) => l.code === lang)?.locale ?? 'en-IN';
}

/** Links that stay inside the chosen language filter: /te/section/india/ or /section/india/ */
export function filterHref(filter: LangFilter, path: string): string {
  return url(filter === 'all' ? path : `/${filter}${path}`);
}
