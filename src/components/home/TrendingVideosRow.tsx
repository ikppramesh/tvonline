import { useState } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { pickRandom, getThumbUrl } from '../../config/trendingVideos.config';

const RANK_COLORS = ['#FF0000', '#FF6B00', '#FFB300', '#7CB342', '#00ACC1'];

export function TrendingVideosRow() {
  const [videos, setVideos] = useState(() => pickRandom(5));
  const [spinning, setSpinning] = useState(false);

  function handleRefresh() {
    setSpinning(true);
    setTimeout(() => {
      setVideos(pickRandom(5));
      setSpinning(false);
    }, 400);
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-red-500" />
          <h3 className="text-white text-lg font-semibold">Trending on YouTube</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={spinning}
          className="flex items-center gap-1.5 text-tv-text-muted text-sm hover:text-white transition-colors disabled:opacity-50"
          title="Shuffle videos"
        >
          <RefreshCw size={14} className={spinning ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      {/* Video cards */}
      <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {videos.map((video, index) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-56 sm:w-64 rounded-xl overflow-hidden bg-tv-surface-2 border border-tv-border hover:border-tv-focus focus:border-tv-focus focus:outline-none transition-all duration-200 hover:scale-[1.03]"
          >
            {/* Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-tv-surface-3">
              <img
                src={getThumbUrl(video.id)}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              {/* Rank badge */}
              <div
                className="absolute top-2 left-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: RANK_COLORS[index] ?? '#888' }}
              >
                <span className="text-white font-black text-xs leading-none">#{index + 1}</span>
              </div>
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Info */}
            <div className="p-3">
              <p className="text-white text-xs font-semibold line-clamp-2 leading-snug">
                {video.title}
              </p>
              <p className="text-tv-text-muted text-[10px] truncate mt-1.5">
                {video.channelTitle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
