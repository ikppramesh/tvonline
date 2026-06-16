import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ChannelCard } from '../livetv/ChannelCard';
import { LIVE_TV_CHANNELS } from '../../config/liveTv.config';

// Show a mix: 3 Hindi + 2 Telugu + 2 Tamil on the home screen
const FEATURED = [
  ...LIVE_TV_CHANNELS.hindi.slice(0, 3),
  ...LIVE_TV_CHANNELS.telugu.slice(0, 2),
  ...LIVE_TV_CHANNELS.tamil.slice(0, 2),
];

export function LiveChannelRow() {
  const navigate = useNavigate();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-lg font-semibold">Live TV — Indian Channels</h3>
        <button
          onClick={() => navigate('/live')}
          className="flex items-center gap-1 text-tv-text-muted text-sm hover:text-white transition-colors"
        >
          See all <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {FEATURED.map((channel) => (
          <div key={channel.channelId} className="flex-shrink-0 w-40 sm:w-52">
            <ChannelCard channel={channel} />
          </div>
        ))}
      </div>
    </div>
  );
}
