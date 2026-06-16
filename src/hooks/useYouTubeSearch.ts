import { useQuery } from '@tanstack/react-query';
import { searchYouTube } from '../services/youtubeApi';
import { useAuthStore } from '../store/authStore';

export function useYouTubeSearch(query: string) {
  const accessToken = useAuthStore((s) => s.accessToken);
  const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

  return useQuery({
    queryKey: ['search', query],
    queryFn: () => searchYouTube(query, accessToken),
    enabled: query.trim().length > 2 && !!(accessToken || apiKey),
    staleTime: 5 * 60 * 1000,
  });
}
