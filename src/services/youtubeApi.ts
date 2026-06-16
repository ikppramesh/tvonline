import axios from 'axios';
import type { YouTubeSearchResult, YouTubeVideoDetails, TrendingVideo } from '../types';

const BASE_URL = 'https://www.googleapis.com/youtube/v3';

function buildParams(params: Record<string, string>, accessToken?: string | null) {
  if (accessToken) return params;
  return { ...params, key: import.meta.env.VITE_YOUTUBE_API_KEY || '' };
}

function buildHeaders(accessToken?: string | null) {
  if (accessToken) return { Authorization: `Bearer ${accessToken}` };
  return {};
}

export async function fetchVideoDetails(
  videoIds: string[],
  accessToken?: string | null
): Promise<YouTubeVideoDetails[]> {
  if (!videoIds.length) return [];
  const params = buildParams(
    { part: 'snippet,liveStreamingDetails,statistics', id: videoIds.join(',') },
    accessToken
  );
  const { data } = await axios.get(`${BASE_URL}/videos`, {
    params,
    headers: buildHeaders(accessToken),
  });
  return data.items || [];
}

export async function fetchTrendingVideos(
  maxResults = 5,
  accessToken?: string | null
): Promise<TrendingVideo[]> {
  const params = buildParams(
    { part: 'snippet,statistics', chart: 'mostPopular', maxResults: String(maxResults), regionCode: 'US' },
    accessToken
  );
  const { data } = await axios.get(`${BASE_URL}/videos`, {
    params,
    headers: buildHeaders(accessToken),
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (data.items || []).map((item: any) => ({
    id: item.id,
    title: item.snippet.title,
    channelTitle: item.snippet.channelTitle,
    thumbnailUrl:
      item.snippet.thumbnails.maxres?.url ||
      item.snippet.thumbnails.high?.url ||
      item.snippet.thumbnails.medium?.url ||
      '',
    viewCount: item.statistics?.viewCount || '0',
    publishedAt: item.snippet.publishedAt,
  }));
}

export async function searchYouTube(
  query: string,
  accessToken?: string | null
): Promise<YouTubeSearchResult[]> {
  if (!query.trim()) return [];
  const params = buildParams(
    { part: 'snippet', q: query, type: 'video', maxResults: '20' },
    accessToken
  );
  const { data } = await axios.get(`${BASE_URL}/search`, {
    params,
    headers: buildHeaders(accessToken),
  });
  return data.items || [];
}
