export interface TrendingVideoItem {
  id: string;
  title: string;
  channelTitle: string;
}

// Pool of globally popular YouTube videos.
// Thumbnails from i.ytimg.com — no API key needed.
export const TRENDING_VIDEO_POOL: TrendingVideoItem[] = [
  { id: 'XqZsoesa55w', title: 'Baby Shark Dance',             channelTitle: 'Pinkfong' },
  { id: 'ktvTqknDobU', title: 'Despacito',                    channelTitle: 'Luis Fonsi' },
  { id: 'JGwWNGJdvx8', title: 'Shape of You',                 channelTitle: 'Ed Sheeran' },
  { id: 'RgKAFK5djSk', title: 'See You Again',                channelTitle: 'Wiz Khalifa ft. Charlie Puth' },
  { id: 'OPf0YbXqDm0', title: 'Uptown Funk',                  channelTitle: 'Mark Ronson ft. Bruno Mars' },
  { id: '9bZkp7q19f0', title: 'Gangnam Style',                channelTitle: 'PSY' },
  { id: 'hT_nvWreIhg', title: 'Counting Stars',               channelTitle: 'OneRepublic' },
  { id: 'CevxZvSJLk8', title: 'Roar',                         channelTitle: 'Katy Perry' },
  { id: 'nfWlot6h_JM', title: 'Shake It Off',                 channelTitle: 'Taylor Swift' },
  { id: 'ZbZSe6N_BXs', title: 'Happy',                        channelTitle: 'Pharrell Williams' },
  { id: '4NRXx6pTmKQ', title: 'Blinding Lights',              channelTitle: 'The Weeknd' },
  { id: 'H5v3kku4y6Q', title: 'As It Was',                    channelTitle: 'Harry Styles' },
  { id: 'G7KNmW9a75Y', title: 'Flowers',                      channelTitle: 'Miley Cyrus' },
  { id: 'b1kbLwvqugk', title: 'Anti-Hero',                    channelTitle: 'Taylor Swift' },
  { id: 'mRD0-GxqHVo', title: 'Heat Waves',                   channelTitle: 'Glass Animals' },
  { id: 'TUVcZfQe-Kw', title: 'Levitating',                   channelTitle: 'Dua Lipa' },
  { id: 'pXRviuL6vMY', title: 'Stressed Out',                 channelTitle: 'Twenty One Pilots' },
  { id: 'fKopy74weus', title: 'Thunder',                      channelTitle: 'Imagine Dragons' },
  { id: 'FM7MFYoylVs', title: 'Something Just Like This',     channelTitle: 'The Chainsmokers & Coldplay' },
  { id: 'E07s5ZYygMg', title: 'Watermelon Sugar',             channelTitle: 'Harry Styles' },
];

// One curated featured video per region — shown as the full-width hero.
// Region detected via browser timezone (no API key).
const REGION_FEATURED: Record<string, TrendingVideoItem> = {
  // India
  IN: { id: 'Umqb9KENgmk', title: 'Tum Hi Ho',       channelTitle: 'Arijit Singh · Aashiqui 2' },
  // United States / Canada
  US: { id: '4NRXx6pTmKQ', title: 'Blinding Lights', channelTitle: 'The Weeknd' },
  // Europe
  EU: { id: 'JGwWNGJdvx8', title: 'Shape of You',    channelTitle: 'Ed Sheeran' },
  // Australia / NZ
  AU: { id: 'mRD0-GxqHVo', title: 'Heat Waves',      channelTitle: 'Glass Animals' },
  // Rest of Asia / Middle East
  AS: { id: '9bZkp7q19f0', title: 'Gangnam Style',   channelTitle: 'PSY' },
  // Global fallback
  default: { id: 'XqZsoesa55w', title: 'Baby Shark Dance', channelTitle: 'Pinkfong · #1 on YouTube' },
};

function detectRegionCode(): string {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
    if (tz.includes('Kolkata') || tz.includes('Calcutta')) return 'IN';
    if (tz.startsWith('America/'))  return 'US';
    if (tz.startsWith('Europe/'))   return 'EU';
    if (tz.startsWith('Australia/') || tz.startsWith('Pacific/Auckland')) return 'AU';
    if (tz.startsWith('Asia/'))     return 'AS';
  } catch { /* ignore */ }
  return 'default';
}

const REGION_LABELS: Record<string, string> = {
  IN:      '🔥 Trending in India',
  US:      '🔥 Trending in US',
  EU:      '🔥 Trending in Europe',
  AU:      '🔥 Trending in Australia',
  AS:      '🔥 Trending in Asia',
  default: '🔥 Trending Worldwide',
};

/** Returns the single featured video for the user's detected region. */
export function getFeaturedVideo(): TrendingVideoItem {
  const code = detectRegionCode();
  return REGION_FEATURED[code] ?? REGION_FEATURED.default;
}

/** Returns a human-readable "Trending in …" label. */
export function getRegionLabel(): string {
  const code = detectRegionCode();
  return REGION_LABELS[code] ?? REGION_LABELS.default;
}

export function getThumbUrl(videoId: string) {
  // maxresdefault preferred; falls back gracefully if absent
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

export function getThumbUrlFallback(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/** Returns n items picked randomly without replacement from the pool. */
export function pickRandom(n: number): TrendingVideoItem[] {
  const shuffled = [...TRENDING_VIDEO_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
