import { useState } from 'react';
import { RefreshCw, TrendingUp } from 'lucide-react';
import { pickRandom, getThumbUrl } from '../../config/trendingVideos.config';

const RANK_COLORS = ['#FF0000', '#FF6B00', '#FFB300', '#7CB342', '#00ACC1'];

export function TrendingVideosRow() {
  const [videos, setVideos] = useState(() => pickRandom(5));
  const [spinning, setSpinning] = useState(false);

  function handleRefresh() {
    setSpinning(true);
    setTimeout(() => { setVideos(pickRandom(5)); setSpinning(false); }, 400);
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-red-400" />
          <h3 className="text-white/90 text-base font-semibold tracking-tight">Trending on YouTube</h3>
        </div>
        <button
          onClick={handleRefresh}
          disabled={spinning}
          className="flex items-center gap-1.5 text-white/35 text-sm hover:text-white/70 transition-colors disabled:opacity-40"
        >
          <RefreshCw size={13} className={spinning ? 'animate-spin' : ''} />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {videos.map((video, index) => (
          <a
            key={video.id}
            href={`https://www.youtube.com/watch?v=${video.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex-shrink-0 w-48 sm:w-56 md:w-64 rounded-2xl overflow-hidden focus:outline-none transition-all duration-200 hover:scale-[1.03]"
            style={{
              background: 'rgba(255,255,255,0.04)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <div className="relative aspect-video w-full overflow-hidden">
              <img
                src={getThumbUrl(video.id)}
                alt={video.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div
                className="absolute top-2 left-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                style={{ backgroundColor: RANK_COLORS[index] ?? '#888' }}
              >
                <span className="text-white font-black text-[10px] leading-none">#{index + 1}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="p-3">
              <p className="text-white/90 text-xs font-semibold line-clamp-2 leading-snug">{video.title}</p>
              <p className="text-white/35 text-[10px] truncate mt-1.5">{video.channelTitle}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
