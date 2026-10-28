// Change these to rename the site, edit the menu or add a live stream.
// Everything else on the site reads from here.

export const SITE = {
  title: 'Deep Dives',
  tagline: 'News and long reads in English and Telugu.',
  description:
    'News, explainers and long reads in English and Telugu: top stories, politics, business, sports, entertainment and technology.',
  author: 'Deep Dives Desk',
  githubUrl: 'https://github.com/sunny01saikumar/Deep-Dives',
  timeZone: 'Asia/Kolkata',
} as const;

export type Lang = 'en' | 'te';
export type LangFilter = Lang | 'all';

export const LANGUAGES: { code: Lang; label: string; locale: string }[] = [
  { code: 'en', label: 'English', locale: 'en-IN' },
  { code: 'te', label: 'తెలుగు', locale: 'te-IN' },
];

// The menu, in order. `slug` is what you write as `section:` in an article.
// To add a section: add a line here, and nothing else.
export const SECTIONS = [
  { slug: 'india', en: 'India', te: 'భారతదేశం' },
  { slug: 'world', en: 'World', te: 'ప్రపంచం' },
  { slug: 'politics', en: 'Politics', te: 'రాజకీయాలు' },
  { slug: 'business', en: 'Business', te: 'వ్యాపారం' },
  { slug: 'sports', en: 'Sports', te: 'క్రీడలు' },
  { slug: 'entertainment', en: 'Entertainment', te: 'వినోదం' },
  { slug: 'technology', en: 'Technology', te: 'సాంకేతికత' },
] as const;

export type SectionSlug = (typeof SECTIONS)[number]['slug'];
export const SECTION_SLUGS = SECTIONS.map((s) => s.slug) as [SectionSlug, ...SectionSlug[]];

// Live TV block on the home page. Leave both empty to hide it.
//  - videoId: the ID of a YouTube live video (the part after v= in its address)
//  - channelId: a YouTube channel ID (starts with UC) to show whatever that channel is streaming now
export const LIVE = {
  videoId: '',
  channelId: '',
} as const;

// Words used around the site. Article text is never translated automatically.
export const UI = {
  en: {
    home: 'Home',
    breaking: 'Breaking',
    latestTicker: 'Latest',
    topStories: 'Top stories',
    latest: 'Latest news',
    trending: 'Trending',
    videos: 'Videos',
    photos: 'Photos',
    live: 'Live TV',
    seeAll: 'See all',
    minRead: 'min read',
    published: 'Published',
    updated: 'Updated',
    by: 'By',
    share: 'Share',
    copyLink: 'Copy link',
    linkCopied: 'Link copied',
    moreIn: 'More in',
    newer: 'Newer',
    older: 'Older',
    watch: 'Watch video',
    photosCount: 'photos',
    search: 'Search',
    allLanguages: 'All',
    menu: 'Sections',
    language: 'Language',
    skip: 'Skip to content',
    about: 'About',
    topics: 'Topics',
    rss: 'RSS feed',
    source: 'Source on GitHub',
    noStories: 'No stories here yet.',
    minLeft: 'min left',
    done: 'Done',
    contents: 'In this story',
  },
  te: {
    home: 'హోమ్',
    breaking: 'బ్రేకింగ్',
    latestTicker: 'తాజా',
    topStories: 'ముఖ్య వార్తలు',
    latest: 'తాజా వార్తలు',
    trending: 'ట్రెండింగ్',
    videos: 'వీడియోలు',
    photos: 'ఫోటోలు',
    live: 'లైవ్ టీవీ',
    seeAll: 'అన్నీ చూడండి',
    minRead: 'నిమి. పఠనం',
    published: 'ప్రచురణ',
    updated: 'నవీకరణ',
    by: 'రచన',
    share: 'షేర్ చేయండి',
    copyLink: 'లింక్ కాపీ చేయండి',
    linkCopied: 'లింక్ కాపీ అయింది',
    moreIn: 'మరిన్ని',
    newer: 'కొత్తవి',
    older: 'పాతవి',
    watch: 'వీడియో చూడండి',
    photosCount: 'ఫోటోలు',
    search: 'శోధన',
    allLanguages: 'అన్నీ',
    menu: 'విభాగాలు',
    language: 'భాష',
    skip: 'కంటెంట్‌కు వెళ్లండి',
    about: 'మా గురించి',
    topics: 'అంశాలు',
    rss: 'RSS ఫీడ్',
    source: 'GitHub లో సోర్స్',
    noStories: 'ఇక్కడ ఇంకా వార్తలు లేవు.',
    minLeft: 'నిమి. మిగిలింది',
    done: 'పూర్తయింది',
    contents: 'ఈ వార్తలో',
  },
} as const;

export type UIKey = keyof (typeof UI)['en'];
