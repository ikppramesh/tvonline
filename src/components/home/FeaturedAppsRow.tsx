import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { APPS } from '../../config/apps.config';

export function FeaturedAppsRow() {
  const navigate = useNavigate();
  const featuredApps = APPS.slice(0, 10);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white/90 text-base font-semibold tracking-tight">Streaming Apps</h3>
        <button
          onClick={() => navigate('/apps')}
          className="flex items-center gap-1 text-white/40 text-sm hover:text-white/70 transition-colors"
        >
          All <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex gap-4 sm:gap-5 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
        {featuredApps.map((app) => (
          <button
            key={app.id}
            onClick={() => window.open(app.launchUrl, '_blank', 'noopener,noreferrer')}
            className="group flex-shrink-0 flex flex-col items-center gap-2 focus:outline-none"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-200 group-hover:scale-110"
              style={{
                background: `linear-gradient(145deg, ${app.color}ff, ${app.color}99)`,
                boxShadow: `0 4px 16px ${app.color}44`,
              }}
            >
              <div className="absolute inset-0 rounded-2xl" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.15) 0%, transparent 55%)' }} />
              <img
                src={app.icon}
                alt={app.name}
                className="w-7 h-7 object-contain relative z-10"
                onError={(e) => { e.currentTarget.style.display = 'none'; }}
              />
            </div>
            <span className="text-white/60 text-[10px] font-medium text-center group-hover:text-white/90 transition-colors truncate w-14">
              {app.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
