import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { APPS } from '../../config/apps.config';

export function FeaturedAppsRow() {
  const navigate = useNavigate();
  const featuredApps = APPS.slice(0, 8);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-lg font-semibold">Apps</h3>
        <button
          onClick={() => navigate('/apps')}
          className="flex items-center gap-1 text-tv-text-muted text-sm hover:text-white transition-colors"
        >
          All apps <ChevronRight size={16} />
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2">
        {featuredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => window.open(app.launchUrl, '_blank', 'noopener,noreferrer')}
            className="flex-shrink-0 flex flex-col items-center gap-2 p-3 rounded-xl bg-tv-surface-2 border border-tv-border hover:border-tv-focus hover:bg-tv-surface-3 focus:outline-none focus:border-tv-focus transition-all duration-200 w-20"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: `${app.color}20` }}
            >
              <img
                src={app.icon}
                alt={app.name}
                className="w-7 h-7 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="text-white text-xs font-medium text-center truncate w-full">
              {app.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
