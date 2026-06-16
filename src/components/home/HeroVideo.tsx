import { useState } from 'react';
import { Play } from 'lucide-react';
import { getFeaturedVideo, getRegionLabel, getThumbUrl, getThumbUrlFallback } from '../../config/trendingVideos.config';

export function HeroVideo() {
  const video = getFeaturedVideo();
  const label = getRegionLabel();
  const [imgSrc, setImgSrc] = useState(getThumbUrl(video.id));
  const [imgLoaded, setImgLoaded] = useState(false);

  const watchUrl = `https://www.youtube.com/watch?v=${video.id}`;

  return (
    <a
      href={watchUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full h-44 sm:h-56 md:h-64 rounded-3xl overflow-hidden focus:outline-none"
      style={{ display: 'flex' }}
    >
      {/* Thumbnail background */}
      {imgLoaded && (
        <img
          src={imgSrc}
          alt={video.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      )}

      {/* Hidden loader — tries maxres first, falls back to hqdefault */}
      <img
        src={imgSrc}
        alt=""
        className="hidden"
        onLoad={() => setImgLoaded(true)}
        onError={() => {
          if (imgSrc !== getThumbUrlFallback(video.id)) {
            setImgSrc(getThumbUrlFallback(video.id));
          }
        }}
      />

      {/* Gradient colour fallback (also visible while image loads) */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #1a0a3a 0%, #0a1a40 50%, #050509 100%)',
          opacity: imgLoaded ? 0 : 1,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t  from-black/85 via-black/20 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-r  from-black/40 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-end w-full p-4 md:p-6">
        <div className="flex items-end justify-between w-full gap-4">

          {/* Left — title + meta */}
          <div className="flex-1 min-w-0 space-y-1.5">
            {/* Region badge */}
            <span
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-white/90"
              style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {label}
            </span>

            {/* Title */}
            <h2 className="text-white font-bold text-lg sm:text-2xl md:text-3xl leading-tight line-clamp-2 tracking-tight">
              {video.title}
            </h2>

            {/* Channel */}
            <p className="text-white/50 text-xs sm:text-sm">{video.channelTitle}</p>
          </div>

          {/* Right — play button */}
          <button
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-2xl text-white font-semibold text-sm transition-all duration-200 group-hover:scale-105 pointer-events-none"
            style={{
              background: 'rgba(255,255,255,0.15)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            <Play size={15} fill="white" />
            <span className="hidden sm:inline">Watch</span>
          </button>
        </div>
      </div>
    </a>
  );
}
