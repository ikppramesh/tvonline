import { NavLink } from 'react-router-dom';
import { Home, Tv, Grid3X3, Search, Settings } from 'lucide-react';
import { useUIStore } from '../../store/uiStore';

const NAV_ITEMS = [
  { path: '/', label: 'Home', icon: Home, end: true },
  { path: '/live', label: 'Live TV', icon: Tv, end: false },
  { path: '/apps', label: 'Apps', icon: Grid3X3, end: false },
  { path: '/search', label: 'Search', icon: Search, end: false },
  { path: '/settings', label: 'Settings', icon: Settings, end: false },
];

export function Sidebar() {
  const { sidebarExpanded, setSidebarExpanded } = useUIStore();

  return (
    <aside
      className={`flex flex-col h-full bg-tv-surface/80 backdrop-blur-md border-r border-tv-border transition-all duration-300 z-50 flex-shrink-0 ${
        sidebarExpanded ? 'w-48' : 'w-16'
      }`}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-tv-border">
        <div className="w-8 h-8 rounded-lg bg-tv-focus flex items-center justify-center flex-shrink-0">
          <Tv size={16} className="text-white" />
        </div>
        {sidebarExpanded && (
          <span className="text-white font-bold text-sm whitespace-nowrap slide-in-left">
            TVOnline
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-1 p-2 flex-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
                isActive
                  ? 'bg-tv-focus text-white'
                  : 'text-tv-text-muted hover:bg-tv-surface-2 hover:text-white'
              }`
            }
          >
            <Icon size={20} className="flex-shrink-0" />
            {sidebarExpanded && (
              <span className="text-sm font-medium whitespace-nowrap slide-in-left">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Time */}
      <div className="px-4 py-4 border-t border-tv-border">
        <Clock expanded={sidebarExpanded} />
      </div>
    </aside>
  );
}

function Clock({ expanded }: { expanded: boolean }) {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hh = time.getHours().toString().padStart(2, '0');
  const mm = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 flex items-center justify-center">
        <span className="text-xs font-mono text-tv-text-muted">{hh}</span>
      </div>
      {expanded && (
        <span className="text-xs font-mono text-tv-text-muted slide-in-left">
          {hh}:{mm}
        </span>
      )}
    </div>
  );
}

import React from 'react';
