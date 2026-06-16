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
  const color       = searchParams.get('color') || '#1e88e5';

  const allChannels = Object.values(LIVE_TV_CHANNELS).flat();
  const channel     = allChannels.find((c) => c.ytChannelId === id || c.channelId === id);
  const language    = channel?.language;

  function handleWatchLive() {
    if (liveUrl) window.location.href = liveUrl;
  }

  const ab = abbr(channelName);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden bg-tv-bg">

      {/* Full-screen gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 100% 80% at 60% 40%, ${color}33 0%, transparent 70%),
                       linear-gradient(160deg, ${color}22 0%, #0d0f18 60%)`,
        }}
      />

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none overflow-hidden">
        <span
          className="font-black text-white"
          style={{ fontSize: 'clamp(8rem, 28vw, 28vw)', opacity: 0.04, lineHeight: 1 }}
        >
          {ab}
        </span>
      </div>

      {/* ── Top bar ─────────────────────────────── */}
      <div className="relative z-10 flex items-center gap-4 px-4 pt-4 pb-2 md:px-6 md:pt-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-3 py-2 md:px-4 md:py-2.5 rounded-xl text-white font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/40"
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            border: `1px solid ${color}66`,
            backdropFilter: 'blur(10px)',
          }}
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* ── Main content ────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-4 md:px-6 md:pb-6 gap-5 md:gap-8">

        {/* Channel badge / logo tile */}
        <div
          className="w-20 h-20 md:w-28 md:h-28 rounded-3xl flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${color}ee, ${color}77)`,
            boxShadow: `0 8px 40px ${color}55, 0 0 0 1px ${color}44`,
          }}
        >
          <span className="text-white font-black text-2xl md:text-3xl tracking-tight select-none">
            {ab}
          </span>
        </div>

        {/* Channel info */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2.5">
            <LiveBadge />
            {language && (
              <span
                className="text-xs font-semibold px-2.5 py-0.5 rounded-full text-white"
                style={{ backgroundColor: `${color}44`, border: `1px solid ${color}66` }}
              >
                {language}
              </span>
            )}
          </div>
          <h1 className="text-white text-2xl md:text-4xl font-black tracking-tight">{channelName}</h1>
          {tagline && <p className="text-white/55 text-sm md:text-base max-w-sm mx-auto">{tagline}</p>}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleWatchLive}
            className="flex items-center gap-3 px-8 py-3.5 md:px-10 md:py-4 rounded-2xl text-white text-lg md:text-xl font-bold transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white/20"
            style={{
              background: `linear-gradient(135deg, ${color}, ${color}bb)`,
              boxShadow: `0 8px 32px ${color}66`,
            }}
          >
            <Play size={22} fill="white" />
            Watch Live
          </button>
          <p className="text-white/35 text-xs flex items-center gap-1.5">
            <ExternalLink size={11} />
            Opens YouTube in this window — browser Back returns here
          </p>
        </div>

        {/* More channels in same category */}
        {channel && (
          <div className="w-full max-w-xl space-y-2">
            <p className="text-white/35 text-xs font-medium uppercase tracking-widest text-center">
              More in {channel.category}
            </p>
            <div
              className="flex gap-2 overflow-x-auto pb-1 justify-start md:justify-center"
              style={{ scrollbarWidth: 'none' }}
            >
              {LIVE_TV_CHANNELS[channel.category]
                .filter((c) => c.channelId !== channel.channelId)
                .slice(0, 7)
                .map((c) => {
                  const p = new URLSearchParams({
                    name: c.channelName,
                    tagline: c.tagline || '',
                    liveUrl: c.liveUrl,
                    color: c.color,
                  });
                  return (
                    <button
                      key={c.channelId}
                      onClick={() => navigate(`/player/ch/${c.ytChannelId}?${p.toString()}`)}
                      className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl transition-all hover:scale-105 focus:outline-none text-white text-xs font-medium"
                      style={{
                        backgroundColor: 'rgba(0,0,0,0.4)',
                        border: `1px solid ${c.color}55`,
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span
                        className="w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] flex-shrink-0"
                        style={{ backgroundColor: c.color }}
                      >
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
