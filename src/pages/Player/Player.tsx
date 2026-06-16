import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { LiveBadge } from '../../components/shared/LiveBadge';
import { useKeyHandler } from '../../hooks/useKeyHandler';
import { LIVE_TV_CHANNELS } from '../../config/liveTv.config';

function abbr(name: string): string {
  const words = name.trim().split(/\s+/);
  if (words.length === 1) return name.slice(0, 4).toUpperCase();
  return words.slice(0, 3).map((w) => w[0]).join('').toUpperCase();
}

export function Player() {
  const { id } = useParams<{ type: string; id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useKeyHandler({ onBack: () => navigate(-1) });

  const channelName = searchParams.get('name') || 'Live TV';
  const tagline     = searchParams.get('tagline') || '';
  const liveUrl     = searchParams.get('liveUrl') || '';
  const color       = searchParams.get('color') || '#2997ff';

  const allChannels = Object.values(LIVE_TV_CHANNELS).flat();
  const channel     = allChannels.find((c) => c.ytChannelId === id || c.channelId === id);
  const language    = channel?.language;

  function handleWatchLive() {
    if (liveUrl) window.location.href = liveUrl;
  }

  const ab = abbr(channelName);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: '#050509' }}>

      {/* Ambient glow background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          radial-gradient(ellipse 80% 70% at 60% 30%, ${color}28 0%, transparent 65%),
          radial-gradient(ellipse 50% 50% at 20% 80%, ${color}10 0%, transparent 60%)
        `,
      }} />

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span className="font-black text-white" style={{ fontSize: 'clamp(8rem,28vw,28vw)', opacity: 0.03, lineHeight: 1 }}>
          {ab}
        </span>
      </div>

      {/* Top bar */}
      <div className="relative z-10 flex items-center gap-4 px-4 pt-4 pb-2 md:px-6 md:pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 rounded-2xl text-white/80 font-medium text-sm transition-all hover:text-white hover:scale-105 focus:outline-none"
          style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.1)' }}
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-4 md:px-6 md:pb-6 gap-5 md:gap-7">

        {/* Channel logo tile */}
        <div
          className="w-20 h-20 md:w-28 md:h-28 rounded-3xl flex items-center justify-center relative overflow-hidden"
          style={{
            background: `linear-gradient(145deg, ${color}ff, ${color}88)`,
            boxShadow: `0 12px 48px ${color}55, 0 0 0 1px rgba(255,255,255,0.08)`,
          }}
        >
          <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.2) 0%, transparent 60%)' }} />
          <span className="text-white font-black text-2xl md:text-3xl tracking-tight select-none relative z-10">{ab}</span>
        </div>

        {/* Channel info */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2.5">
            <LiveBadge />
            {language && (
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white/70"
                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.12)' }}>
                {language}
              </span>
            )}
          </div>
          <h1 className="text-white text-2xl md:text-4xl font-black tracking-tight">{channelName}</h1>
          {tagline && <p className="text-white/40 text-sm md:text-base max-w-sm mx-auto">{tagline}</p>}
        </div>

        {/* Watch Live CTA */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleWatchLive}
            className="flex items-center gap-3 px-8 py-3.5 md:px-10 md:py-4 rounded-2xl text-white text-lg md:text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none"
            style={{
              background: `linear-gradient(135deg, ${color}ff, ${color}cc)`,
              boxShadow: `0 8px 32px ${color}66, 0 0 0 1px rgba(255,255,255,0.1)`,
            }}
          >
            <Play size={22} fill="white" />
            Watch Live
          </button>
          <p className="text-white/25 text-xs flex items-center gap-1.5">
            <ExternalLink size={11} />
            Opens YouTube in this window
          </p>
        </div>

        {/* More channels in category */}
        {channel && (
          <div className="w-full max-w-xl space-y-2">
            <p className="text-white/25 text-xs font-medium uppercase tracking-widest text-center">
              More in {channel.category}
            </p>
            <div className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-center" style={{ scrollbarWidth: 'none' }}>
              {LIVE_TV_CHANNELS[channel.category]
                .filter((c) => c.channelId !== channel.channelId)
                .slice(0, 7)
                .map((c) => {
                  const p = new URLSearchParams({ name: c.channelName, tagline: c.tagline || '', liveUrl: c.liveUrl, color: c.color });
                  return (
                    <button
                      key={c.channelId}
                      onClick={() => navigate(`/player/ch/${c.ytChannelId}?${p.toString()}`)}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105 focus:outline-none text-white/70 hover:text-white text-xs font-medium"
                      style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                      <span className="w-5 h-5 rounded-lg flex items-center justify-center font-bold text-[10px] flex-shrink-0 text-white"
                        style={{ backgroundColor: c.color }}>
                        {c.channelName[0]}
                      </span>
                      <span className="whitespace-nowrap">{c.channelName}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
