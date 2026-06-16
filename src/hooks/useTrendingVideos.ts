import { useQuery } from '@tanstack/react-query';
import { fetchTrendingVideos } from '../services/youtubeApi';

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY ?? '';
const HAS_REAL_KEY = API_KEY.length > 0 && API_KEY !== 'your_youtube_api_key_here';

export function useTrendingVideos() {
  return useQuery({
    queryKey: ['trending-videos'],
    queryFn: () => fetchTrendingVideos(5),
    staleTime: 1000 * 60 * 30,
    enabled: HAS_REAL_KEY,
    retry: 1,
  });
}

export { HAS_REAL_KEY as hasTrendingApiKey };
