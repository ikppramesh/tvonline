import { Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { LiveBadge } from '../shared/LiveBadge';
import type { LiveChannel } from '../../types';

interface HeroBannerProps {
  channel: LiveChannel | null;
}

function abbr(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.slice(0, 4).toUpperCase();
  return words.slice(0, 3).map((w) => w[0]).join('').toUpperCase();
}

export function HeroBanner({ channel }: HeroBannerProps) {
  const navigate = useNavigate();

  if (!channel) {
    return (
      <div className="relative w-full h-64 bg-tv-surface-2 rounded-2xl overflow-hidden flex items-end p-8 animate-pulse">
        <div className="space-y-2">
          <div className="w-16 h-5 bg-tv-surface-3 rounded" />
          <div className="w-48 h-7 bg-tv-surface-3 rounded" />
          <div className="w-64 h-4 bg-tv-surface-3 rounded" />
        </div>
      </div>
    );
  }

  function handleWatch() {
    const params = new URLSearchParams({
      name: channel!.channelName,
      tagline: channel!.tagline || '',
      liveUrl: channel!.liveUrl,
      color: channel!.color,
    });
    navigate(`/player/ch/${channel!.ytChannelId}?${params.toString()}`);
  }

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${channel.color}ff 0%, ${channel.color}aa 40%, #0d0f18 100%)`,
        }}
      />

      {/* Dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-end justify-end pr-12 pb-4 select-none pointer-events-none overflow-hidden">
        <span
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: '9rem', opacity: 0.08 }}
        >
          {abbr(channel.channelName)}
        </span>
      </div>

      {/* Left-to-right darkening overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-8">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-3">
            <LiveBadge />
            {channel.language && (
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded-full text-white"
                style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
              >
                {channel.language}
              </span>
            )}
          </div>
          <h2 className="text-white text-3xl font-bold leading-tight">{channel.channelName}</h2>
          {channel.tagline && (
            <p className="text-white/70 text-sm">{channel.tagline}</p>
          )}
        </div>

        <button
          onClick={handleWatch}
          className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-bold text-white transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 ml-6 flex-shrink-0"
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            border: `2px solid ${channel.color}`,
            backdropFilter: 'blur(8px)',
            boxShadow: `0 4px 20px ${channel.color}55`,
          }}
        >
          <Play size={20} fill="white" />
          Watch Live
        </button>
      </div>
    </div>
  );
}
