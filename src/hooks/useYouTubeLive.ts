import { LIVE_TV_CHANNELS } from '../config/liveTv.config';
import type { ChannelCategory, LiveChannel } from '../types';

export function useYouTubeLive(category: ChannelCategory): {
  data: LiveChannel[];
  isLoading: false;
  error: null;
} {
  return {
    data: LIVE_TV_CHANNELS[category],
    isLoading: false,
    error: null,
  };
}
