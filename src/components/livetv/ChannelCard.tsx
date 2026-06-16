import { useNavigate } from 'react-router-dom';
import { Play } from 'lucide-react';
import { LiveBadge } from '../shared/LiveBadge';
import type { LiveChannel } from '../../types';

interface ChannelCardProps {
  channel: LiveChannel;
  onFocus?: () => void;
}

function abbr(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.slice(0, 4).toUpperCase();
  return words.slice(0, 3).map((w) => w[0]).join('').toUpperCase();
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
      className="group relative flex flex-col w-full rounded-2xl overflow-hidden focus:outline-none transition-all duration-200 hover:scale-[1.04] focus:scale-[1.04] text-left"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: `0 4px 24px ${channel.color}18`,
      }}
    >
      {/* Visual area */}
      <div className="relative aspect-video w-full overflow-hidden rounded-t-2xl">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${channel.color}dd 0%, ${channel.color}77 50%, #05050920 100%)` }}
        />
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '18px 18px' }}
        />
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden select-none pointer-events-none">
          <span className="font-black text-white leading-none" style={{ fontSize: 'clamp(3rem,8vw,5rem)', opacity: 0.1 }}>
            {ab}
          </span>
        </div>
        {/* Channel name */}
        <div className="absolute inset-0 flex items-center justify-center px-3">
          <span
            className="text-white font-semibold text-sm text-center leading-snug px-3 py-1.5 rounded-xl max-w-full truncate"
            style={{ background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(8px)' }}
          >
            {channel.channelName}
          </span>
        </div>
        {/* LIVE badge */}
        <div className="absolute top-2 left-2"><LiveBadge /></div>
        {/* Language tag */}
        {channel.language && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-lg text-white/80"
              style={{ background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)' }}>
              {channel.language}
            </span>
          </div>
        )}
        {/* Hover play */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-200">
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: `${channel.color}cc`, backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)' }}>
            <Play size={20} fill="white" className="ml-0.5" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Info bar */}
      <div className="px-3 py-2.5" style={{ borderTop: `1px solid ${channel.color}25` }}>
        <p className="text-white/90 text-xs font-semibold truncate">{channel.channelName}</p>
        {channel.tagline && (
          <p className="text-white/40 text-[10px] truncate mt-0.5">{channel.tagline}</p>
        )}
      </div>

      {/* Focus ring */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-focus:opacity-100 transition-opacity duration-200"
        style={{ boxShadow: `0 0 0 2px ${channel.color}88` }} />
    </button>
  );
}
