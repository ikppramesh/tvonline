export interface TrendingVideoItem {
  id: string;
  title: string;
  channelTitle: string;
}

// Pool of globally popular YouTube videos.
// Thumbnails are fetched directly from i.ytimg.com — no API key needed.
export const TRENDING_VIDEO_POOL: TrendingVideoItem[] = [
  { id: 'XqZsoesa55w', title: 'Baby Shark Dance', channelTitle: 'Pinkfong' },
  { id: 'ktvTqknDobU', title: 'Despacito', channelTitle: 'Luis Fonsi' },
  { id: 'JGwWNGJdvx8', title: 'Shape of You', channelTitle: 'Ed Sheeran' },
  { id: 'RgKAFK5djSk', title: 'See You Again', channelTitle: 'Wiz Khalifa ft. Charlie Puth' },
  { id: 'OPf0YbXqDm0', title: 'Uptown Funk', channelTitle: 'Mark Ronson ft. Bruno Mars' },
  { id: '9bZkp7q19f0', title: 'Gangnam Style', channelTitle: 'PSY' },
  { id: 'hT_nvWreIhg', title: 'Counting Stars', channelTitle: 'OneRepublic' },
  { id: 'CevxZvSJLk8', title: 'Roar', channelTitle: 'Katy Perry' },
  { id: 'nfWlot6h_JM', title: 'Shake It Off', channelTitle: 'Taylor Swift' },
  { id: 'ZbZSe6N_BXs', title: 'Happy', channelTitle: 'Pharrell Williams' },
  { id: '4NRXx6pTmKQ', title: 'Blinding Lights', channelTitle: 'The Weeknd' },
  { id: 'H5v3kku4y6Q', title: 'As It Was', channelTitle: 'Harry Styles' },
  { id: 'G7KNmW9a75Y', title: 'Flowers', channelTitle: 'Miley Cyrus' },
  { id: 'b1kbLwvqugk', title: 'Anti-Hero', channelTitle: 'Taylor Swift' },
  { id: 'mRD0-GxqHVo', title: 'Heat Waves', channelTitle: 'Glass Animals' },
  { id: 'TUVcZfQe-Kw', title: 'Levitating', channelTitle: 'Dua Lipa' },
  { id: 'pXRviuL6vMY', title: 'Stressed Out', channelTitle: 'Twenty One Pilots' },
  { id: 'fKopy74weus', title: 'Thunder', channelTitle: 'Imagine Dragons' },
  { id: 'FM7MFYoylVs', title: 'Something Just Like This', channelTitle: 'The Chainsmokers & Coldplay' },
  { id: 'E07s5ZYygMg', title: 'Watermelon Sugar', channelTitle: 'Harry Styles' },
];

export function getThumbUrl(videoId: string) {
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
}

/** Returns n items picked randomly without replacement */
export function pickRandom(n: number): TrendingVideoItem[] {
  const shuffled = [...TRENDING_VIDEO_POOL].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}
