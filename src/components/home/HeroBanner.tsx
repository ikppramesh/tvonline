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
      <div className="relative w-full h-40 md:h-60 rounded-3xl overflow-hidden animate-pulse"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="absolute bottom-0 left-0 p-5 space-y-2">
          <div className="w-16 h-4 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="w-44 h-6 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }} />
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
    <div className="relative w-full h-40 md:h-60 rounded-3xl overflow-hidden">
      {/* Gradient bg */}
      <div className="absolute inset-0" style={{
        background: `linear-gradient(135deg, ${channel.color}cc 0%, ${channel.color}66 45%, #05050920 100%)`,
      }} />
      {/* Glass overlay for depth */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(to bottom, rgba(255,255,255,0.03) 0%, transparent 40%, rgba(0,0,0,0.45) 100%)',
      }} />
      {/* Dot grid */}
      <div className="absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
      {/* Watermark */}
      <div className="absolute inset-0 flex items-end justify-end pr-4 md:pr-10 pb-2 select-none pointer-events-none overflow-hidden">
        <span className="font-black text-white leading-none" style={{ fontSize: 'clamp(4rem,18vw,9rem)', opacity: 0.07 }}>
          {abbr(channel.channelName)}
        </span>
      </div>
      {/* Left fade */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex items-end p-4 md:p-6">
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <LiveBadge />
            {channel.language && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full text-white/80"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.15)' }}>
                {channel.language}
              </span>
            )}
          </div>
          <h2 className="text-white text-lg md:text-3xl font-bold tracking-tight leading-tight">
            {channel.channelName}
          </h2>
          {channel.tagline && (
            <p className="text-white/55 text-xs md:text-sm hidden sm:block">{channel.tagline}</p>
          )}
        </div>

        <button
          onClick={handleWatch}
          className="flex items-center gap-2 px-4 py-2.5 md:px-6 md:py-3 rounded-2xl font-semibold text-white text-sm transition-all duration-200 hover:scale-105 focus:outline-none ml-3 flex-shrink-0"
          style={{
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.25)',
            boxShadow: `0 4px 20px ${channel.color}44`,
          }}
        >
          <Play size={15} fill="white" />
          <span className="hidden sm:inline">Watch Live</span>
          <span className="sm:hidden">Watch</span>
        </button>
      </div>
    </div>
  );
}
