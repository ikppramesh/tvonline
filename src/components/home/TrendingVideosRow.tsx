import { RefreshCw, TrendingUp, Eye, Lock } from 'lucide-react';
import { useTrendingVideos } from '../../hooks/useTrendingVideos';

function formatViews(count: string): string {
  const n = parseInt(count, 10);
  if (isNaN(n)) return '';
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B views`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${Math.round(n / 1_000)}K views`;
  return `${n} views`;
}

const RANK_COLORS = ['#FF0000', '#FF6B00', '#FFB300', '#7CB342', '#00ACC1'];

export function TrendingVideosRow() {
  const { data: videos, isLoading, isFetching, refetch, error } = useTrendingVideos();
  const hasApiKey = !!import.meta.env.VITE_YOUTUBE_API_KEY;

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-red-500" />
          <h3 className="text-white text-lg font-semibold">Trending on YouTube</h3>
        </div>
        {hasApiKey && (
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="flex items-center gap-1.5 text-tv-text-muted text-sm hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh trending videos"
          >
            <RefreshCw
              size={14}
              className={isFetching ? 'animate-spin' : ''}
            />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        )}
      </div>

      {/* No API key state */}
      {!hasApiKey && (
        <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-tv-surface-2 border border-tv-border">
          <div className="w-10 h-10 rounded-xl bg-tv-surface-3 flex items-center justify-center flex-shrink-0">
            <Lock size={18} className="text-tv-text-muted" />
          </div>
          <div>
            <p className="text-white text-sm font-medium">YouTube API key required</p>
            <p className="text-tv-text-muted text-xs mt-0.5">
              Add your key in <span className="text-tv-focus">Settings → API Key</span> to see trending videos
            </p>
          </div>
        </div>
      )}

      {/* Error state */}
      {hasApiKey && error && !isLoading && (
        <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-tv-surface-2 border border-red-500/20">
          <p className="text-red-400 text-sm">Failed to load trending videos</p>
          <button
            onClick={() => refetch()}
            className="text-xs text-tv-text-muted hover:text-white transition-colors"
          >
            Try again
          </button>
        </div>
      )}

      {/* Loading skeletons */}
      {hasApiKey && isLoading && (
        <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-56 sm:w-64 rounded-xl overflow-hidden bg-tv-surface-2 border border-tv-border animate-pulse">
              <div className="aspect-video w-full bg-tv-surface-3" />
              <div className="p-3 space-y-2">
                <div className="h-3.5 bg-tv-surface-3 rounded w-full" />
                <div className="h-3.5 bg-tv-surface-3 rounded w-3/4" />
                <div className="h-3 bg-tv-surface-3 rounded w-1/2 mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Video cards */}
      {hasApiKey && !isLoading && videos && videos.length > 0 && (
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
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={video.thumbnailUrl}
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
                <div className="flex items-center justify-between mt-2 gap-2">
                  <span className="text-tv-text-muted text-[10px] truncate">{video.channelTitle}</span>
                  {video.viewCount !== '0' && (
                    <span className="flex items-center gap-0.5 text-tv-text-muted text-[10px] whitespace-nowrap flex-shrink-0">
                      <Eye size={10} />
                      {formatViews(video.viewCount)}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
