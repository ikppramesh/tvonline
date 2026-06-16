import { useQuery } from '@tanstack/react-query';
import { fetchTrendingVideos } from '../services/youtubeApi';

export function useTrendingVideos() {
  return useQuery({
    queryKey: ['trending-videos'],
    queryFn: () => fetchTrendingVideos(5),
    staleTime: 1000 * 60 * 30, // cache for 30 minutes
    enabled: !!import.meta.env.VITE_YOUTUBE_API_KEY,
    retry: 1,
  });
}
