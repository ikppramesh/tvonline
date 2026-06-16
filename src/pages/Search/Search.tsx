import { useState } from 'react';
import { Search as SearchIcon, X, ExternalLink } from 'lucide-react';
import { OnScreenKeyboard } from '../../components/search/OnScreenKeyboard';
import { useYouTubeSearch } from '../../hooks/useYouTubeSearch';

export function Search() {
  const [query, setQuery] = useState('');
  const { data: results, isLoading } = useYouTubeSearch(query);

  function handleKey(key: string) {
    if (key === 'BACKSPACE') {
      setQuery((q) => q.slice(0, -1));
    } else if (key === 'SPACE') {
      setQuery((q) => q + ' ');
    } else {
      setQuery((q) => q + key);
    }
  }

  return (
    <div className="h-full overflow-y-auto px-3 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 fade-in">
      <h1 className="text-white text-2xl font-bold">Search</h1>

      {/* Search bar */}
      <div className="flex items-center gap-3 bg-tv-surface-2 border border-tv-border rounded-2xl px-5 py-4">
        <SearchIcon size={20} className="text-tv-text-muted flex-shrink-0" />
        <span className="text-white text-lg flex-1 font-mono min-h-7">
          {query || <span className="text-tv-text-muted">Type to search…</span>}
          <span className="animate-pulse">|</span>
        </span>
        {query && (
          <button onClick={() => setQuery('')} className="text-tv-text-muted hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* On-screen keyboard */}
      <OnScreenKeyboard onKey={handleKey} />

      {/* Results */}
      {query.length > 2 && (
        <div className="space-y-4">
          <h2 className="text-white font-semibold">
            {isLoading ? 'Searching…' : `Results for "${query}"`}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {(results || []).map((r) => {
              const videoUrl = r.id.videoId
                ? `https://www.youtube.com/watch?v=${r.id.videoId}`
                : `https://www.youtube.com/channel/${r.snippet.channelId}`;
              return (
                <a
                  key={r.id.videoId || r.snippet.channelId}
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col rounded-xl overflow-hidden bg-tv-surface-2 border border-tv-border hover:border-tv-focus focus:border-tv-focus focus:outline-none transition-all duration-200 hover:scale-[1.03]"
                >
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={r.snippet.thumbnails.high?.url || r.snippet.thumbnails.medium?.url}
                      alt={r.snippet.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 card-gradient" />
                    {r.snippet.liveBroadcastContent === 'live' && (
                      <div className="absolute top-2 left-2">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold text-white bg-red-600">
                          <span className="w-1.5 h-1.5 rounded-full bg-white pulse-glow" />
                          LIVE
                        </span>
                      </div>
                    )}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-6 h-6 rounded bg-black/50 backdrop-blur-sm flex items-center justify-center">
                        <ExternalLink size={12} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2">
                    <p className="text-white text-xs font-semibold line-clamp-2">{r.snippet.title}</p>
                    <p className="text-tv-text-muted text-xs truncate mt-0.5">{r.snippet.channelTitle}</p>
                  </div>
                </a>
              );
            })}
          </div>
          {!isLoading && !results?.length && query.length > 2 && (
            <p className="text-tv-text-muted text-center py-8">
              No results — add a YouTube API key in Settings to enable search
            </p>
          )}
        </div>
      )}
    </div>
  );
}
