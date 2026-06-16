import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { LiveBadge } from '../shared/LiveBadge';
import type { LiveChannel } from '../../types';

interface ChannelCardProps {
  channel: LiveChannel;
  onFocus?: () => void;
}

/** First-letter abbreviation used as background watermark */
function abbr(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.slice(0, 4).toUpperCase();
  return words
    .slice(0, 3)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
}

export function ChannelCard({ channel, onFocus }: ChannelCardProps) {
  const navigate = useNavigate();

  function handleClick() {
    const params = new URLSearchParams({
      name: channel.channelName,
      tagline: channel.tagline || '',
      liveUrl: channel.liveUrl,
      color: channel.color,
    });
    navigate(`/player/ch/${channel.ytChannelId}?${params.toString()}`);
  }

  const ab = abbr(channel.channelName);

  return (
    <button
      onClick={handleClick}
      onFocus={onFocus}
      className="group relative flex flex-col w-full rounded-xl overflow-hidden border border-tv-border hover:border-tv-focus focus:border-tv-focus focus:outline-none transition-all duration-200 hover:scale-[1.04] focus:scale-[1.04] text-left"
      style={{ boxShadow: `0 2px 16px ${channel.color}22` }}
    >
      {/* ── Visual area ─────────────────────────────────── */}
      <div className="relative aspect-video w-full overflow-hidden">

        {/* Gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${channel.color}ee 0%, ${channel.color}99 45%, #0d0f18 100%)`,
          }}
        />

        {/* Subtle dot-grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* Giant watermark abbreviation */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 8vw, 5rem)', opacity: 0.12 }}
          >
            {ab}
          </span>
        </div>

        {/* Channel name pill — centered */}
        <div className="absolute inset-0 flex items-center justify-center px-3">
          <span
            className="text-white font-bold text-sm text-center leading-snug px-3 py-1.5 rounded-lg backdrop-blur-sm max-w-full truncate"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
          >
            {channel.channelName}
          </span>
        </div>

        {/* Top-left: LIVE badge */}
        <div className="absolute top-2 left-2">
          <LiveBadge />
        </div>

        {/* Top-right: language tag */}
        {channel.language && (
          <div className="absolute top-2 right-2">
            <span
              className="text-[10px] font-semibold px-1.5 py-0.5 rounded text-white"
              style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
            >
              {channel.language}
            </span>
          </div>
        )}

        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
          <div
            className="w-13 h-13 rounded-full flex items-center justify-center border border-white/30"
            style={{
              width: 52,
              height: 52,
              backgroundColor: `${channel.color}cc`,
              backdropFilter: 'blur(6px)',
            }}
          >
            <Play size={22} fill="white" className="text-white ml-0.5" />
          </div>
        </div>

        {/* Bottom gradient fade into info bar */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* ── Info bar ──────────────────────────────────── */}
      <div
        className="px-3 py-2"
        style={{
          background: `linear-gradient(to right, ${channel.color}22, #1a1d27)`,
          borderTop: `1px solid ${channel.color}44`,
        }}
      >
        <p className="text-white text-xs font-semibold truncate leading-tight">
          {channel.channelName}
        </p>
        {channel.tagline && (
          <p className="text-white/50 text-[10px] truncate mt-0.5 leading-tight">
            {channel.tagline}
          </p>
        )}
      </div>

      {/* Focus ring */}
      <div
        className="absolute inset-0 rounded-xl ring-2 opacity-0 group-focus:opacity-100 transition-opacity duration-200 pointer-events-none"
        style={{ '--tw-ring-color': channel.color } as React.CSSProperties}
      />
    </button>
  );
}
