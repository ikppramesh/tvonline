import React from 'react';
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
      className={`hidden md:flex flex-col h-full transition-all duration-300 z-50 flex-shrink-0 ${
        sidebarExpanded ? 'w-48' : 'w-16'
      }`}
      style={{
        background: 'rgba(255,255,255,0.03)',
        backdropFilter: 'saturate(180%) blur(24px)',
        WebkitBackdropFilter: 'saturate(180%) blur(24px)',
        borderRight: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={() => setSidebarExpanded(true)}
      onMouseLeave={() => setSidebarExpanded(false)}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'linear-gradient(135deg, #2997ff, #0a6edc)' }}>
          <Tv size={15} className="text-white" />
        </div>
        {sidebarExpanded && (
          <span className="text-white font-semibold text-sm tracking-tight whitespace-nowrap slide-in-left">
            TVOnline
          </span>
        )}
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-0.5 p-2 flex-1">
        {NAV_ITEMS.map(({ path, label, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80'
              }`
            }
            style={({ isActive }) => isActive
              ? { background: 'rgba(255,255,255,0.10)', backdropFilter: 'blur(8px)' }
              : undefined
            }
          >
            <Icon size={19} className="flex-shrink-0" />
            {sidebarExpanded && (
              <span className="text-sm font-medium whitespace-nowrap slide-in-left">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Clock */}
      <div className="px-4 py-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Clock expanded={sidebarExpanded} />
      </div>
    </aside>
  );
}

export function BottomNav() {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around px-2 pt-1 pb-2"
      style={{
        background: 'rgba(5,5,9,0.85)',
        backdropFilter: 'saturate(180%) blur(28px)',
        WebkitBackdropFilter: 'saturate(180%) blur(28px)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
      }}
    >
      {NAV_ITEMS.map(({ path, label, icon: Icon, end }) => (
        <NavLink
          key={path}
          to={path}
          end={end}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[52px] ${
              isActive ? 'text-white' : 'text-white/35'
            }`
          }
        >
          {({ isActive }) => (
            <>
              <div
                className="p-1.5 rounded-xl transition-all duration-200"
                style={isActive ? { background: 'rgba(41,151,255,0.25)' } : undefined}
              >
                <Icon size={20} />
              </div>
              <span className="text-[10px] font-medium">{label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
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
        <span className="text-[11px] font-mono" style={{ color: 'rgba(255,255,255,0.3)' }}>{hh}</span>
      </div>
      {expanded && (
        <span className="text-[11px] font-mono slide-in-left" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {hh}:{mm}
        </span>
      )}
    </div>
  );
}
