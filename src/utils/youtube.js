/**
 * extractYoutubeId
 * Extracts the 11-character YouTube video ID from various URL formats or raw ID.
 * Supports:
 * - Shorts (e.g. youtube.com/shorts/-yz1tYzU38g?si=...)
 * - Shortened youtu.be links (e.g. youtu.be/-yz1tYzU38g)
 * - Standard watch links (e.g. youtube.com/watch?v=-yz1tYzU38g)
 * - Embed links (e.g. youtube.com/embed/-yz1tYzU38g)
 * - Bare 11-character IDs
 */
export const extractYoutubeId = (idOrUrl) => {
  if (!idOrUrl || typeof idOrUrl !== 'string') return '';
  const trimmed = idOrUrl.trim();

  // 1. Bare 11-character ID (can include alphanumeric, hyphens, and underscores)
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // 2. Regex matches for various YouTube URL patterns
  const patterns = [
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|shorts\/|watch\?v=|watch\?.+&v=))([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  // 3. Fallback URL parsing
  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace(/^\//, '').split('/')[0];
      if (/^[\w-]{11}$/.test(id)) return id;
    }
    if (url.pathname.includes('/shorts/')) {
      const parts = url.pathname.split('/shorts/');
      const id = parts[1]?.split('/')[0]?.split('?')[0];
      if (id && /^[\w-]{11}$/.test(id)) return id;
    }
    const v = url.searchParams.get('v');
    if (v && /^[\w-]{11}$/.test(v)) return v;
  } catch (e) {
    // Ignore URL parse error
  }

  return trimmed;
};

/**
 * getYoutubeEmbedUrl
 * Returns standard cross-browser embed URL with optimal Safari & Chrome parameters.
 */
export const getYoutubeEmbedUrl = (idOrUrl) => {
  const videoId = extractYoutubeId(idOrUrl);
  if (!videoId) return '';

  // - playsinline=1: Ensures video can play inline in iOS Safari
  // - rel=0: Does not show unrelated recommendations
  // - modestbranding=1: Minimal YouTube branding
  // - enablejsapi=1: Standard player API support
  return `https://www.youtube.com/embed/${videoId}?playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;
};

/**
 * getYoutubeDirectUrl
 * Returns direct link to open in YouTube app or browser.
 */
export const getYoutubeDirectUrl = (idOrUrl) => {
  const videoId = extractYoutubeId(idOrUrl);
  if (!videoId) return idOrUrl;
  return `https://www.youtube.com/watch?v=${videoId}`;
};