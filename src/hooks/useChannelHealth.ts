import { useQuery } from '@tanstack/react-query';
import { LIVE_TV_CHANNELS } from '../config/liveTv.config';
import { fetchExistingChannelIds } from '../services/youtubeApi';
import { useAuthStore } from '../store/authStore';
import type { LiveChannel } from '../types';

const ALL_IDS = [
  ...new Set(Object.values(LIVE_TV_CHANNELS).flat().map((c) => c.ytChannelId)),
];

const EMPTY: ReadonlySet<string> = new Set();

// Checks every catalogue channel against the YouTube Data API and reports the
// ones that no longer exist (deleted, terminated or a wrong id). Needs an API
// key or sign-in; without one, or if the check fails, nothing is hidden.
export function useChannelHealth() {
  const accessToken = useAuthStore((s) => s.accessToken);
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  const { data } = useQuery({
    queryKey: ['channel-health', !!accessToken],
    queryFn: async (): Promise<ReadonlySet<string>> => {
      const found = await fetchExistingChannelIds(ALL_IDS, accessToken);
      // An empty answer means the API misbehaved, not that every channel died.
      if (found.size === 0) return EMPTY;
      return new Set(ALL_IDS.filter((id) => !found.has(id)));
    },
    enabled: !!(accessToken || apiKey),
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 12 * 60 * 60 * 1000,
    retry: 1,
  });

  const deadIds = data ?? EMPTY;

  function filterHealthy(channels: LiveChannel[]): LiveChannel[] {
    return deadIds.size ? channels.filter((c) => !deadIds.has(c.ytChannelId)) : channels;
  }

  return { deadIds, filterHealthy };
}
