import type { AppItem } from '../../types';

interface AppTileProps {
  app: AppItem;
}

export function AppTile({ app }: AppTileProps) {
  function handleClick() {
    window.open(app.launchUrl, '_blank', 'noopener,noreferrer');
  }

  return (
    <button
      onClick={handleClick}
      className="group flex flex-col items-center gap-2.5 focus:outline-none"
    >
      {/* App icon — iOS/Apple TV rounded-square style */}
      <div
        className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl sm:rounded-[22px] flex items-center justify-center overflow-hidden transition-all duration-200 group-hover:scale-110 group-focus:scale-110"
        style={{
          background: `linear-gradient(145deg, ${app.color}ff, ${app.color}99)`,
          boxShadow: `0 6px 24px ${app.color}50, 0 2px 8px rgba(0,0,0,0.4)`,
        }}
      >
        {/* Glass highlight */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, transparent 55%)' }}
        />
        <img
          src={app.icon}
          alt={app.name}
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain relative z-10"
          onError={(e) => {
            const t = e.currentTarget as HTMLImageElement;
            t.style.display = 'none';
            const fb = t.nextElementSibling as HTMLElement | null;
            if (fb) fb.style.display = 'flex';
          }}
        />
        {/* Letter fallback */}
        <div className="absolute inset-0 items-center justify-center hidden z-10">
          <span className="text-2xl font-black text-white">{app.name[0]}</span>
        </div>
      </div>

      {/* Label */}
      <p className="text-white/80 text-xs font-medium text-center leading-tight truncate w-full px-1">
        {app.name}
      </p>
    </button>
  );
}
