import axios from 'axios';
import type { YouTubeSearchResult, YouTubeVideoDetails } from '../types';

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
