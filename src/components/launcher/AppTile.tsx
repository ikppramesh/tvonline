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
      className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-tv-surface-2 border border-tv-border hover:border-tv-focus focus:border-tv-focus focus:outline-none hover:bg-tv-surface-3 focus:bg-tv-surface-3 transition-all duration-200 hover:scale-105 focus:scale-105"
      style={{ '--app-color': app.color } as React.CSSProperties}
    >
      {/* Icon container */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden relative"
        style={{ backgroundColor: `${app.color}20`, border: `1px solid ${app.color}40` }}
      >
        <img
          src={app.icon}
          alt={app.name}
          className="w-10 h-10 object-contain"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = 'none';
            if (target.nextElementSibling) {
              (target.nextElementSibling as HTMLElement).style.display = 'flex';
            }
          }}
        />
        <div
          className="w-10 h-10 items-center justify-center hidden"
          style={{ display: 'none' }}
        >
          <span className="text-xl font-bold text-white">{app.name[0]}</span>
        </div>

        {/* Focus glow */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
          style={{ boxShadow: `inset 0 0 20px ${app.color}30` }}
        />
      </div>

      {/* Name + description */}
      <div className="text-center">
        <p className="text-white text-sm font-semibold leading-tight">{app.name}</p>
        {app.description && (
          <p className="text-tv-text-muted text-xs mt-0.5">{app.description}</p>
        )}
      </div>

      {/* Bottom glow on focus */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity"
        style={{ backgroundColor: app.color }}
      />
    </button>
  );
}
