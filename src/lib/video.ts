/** Accepts a YouTube link (watch, youtu.be, embed, shorts, live) or a bare 11-character video ID. */
export function youtubeId(input?: string): string | undefined {
  if (!input) return undefined;
  const value = input.trim();
  if (/^[\w-]{11}$/.test(value)) return value;
  try {
    const u = new URL(value);
    if (u.hostname.endsWith('youtu.be')) return u.pathname.slice(1, 12) || undefined;
    const v = u.searchParams.get('v');
    if (v) return v;
    const m = u.pathname.match(/\/(?:embed|shorts|live)\/([\w-]{11})/);
    return m?.[1];
  } catch {
    return undefined;
  }
}

/** Privacy-friendly embed address (no cookies until the viewer presses play). */
export function embedSrc(videoId: string): string {
  return `https://www.youtube-nocookie.com/embed/${videoId}`;
}

export function liveChannelSrc(channelId: string): string {
  return `https://www.youtube-nocookie.com/embed/live_stream?channel=${encodeURIComponent(channelId)}`;
}
