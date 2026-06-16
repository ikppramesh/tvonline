import { useRef } from 'react';
import { LIVE_TV_CATEGORIES } from '../../config/liveTv.config';
import type { ChannelCategory } from '../../types';

interface CategoryTabBarProps {
  selected: ChannelCategory;
  onSelect: (category: ChannelCategory) => void;
}

export function CategoryTabBar({ selected, onSelect }: CategoryTabBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
      {LIVE_TV_CATEGORIES.map(({ id, label, emoji }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 focus:outline-none flex-shrink-0 ${
            selected === id ? 'bg-white text-black shadow-lg' : 'text-white/50 hover:text-white/80'
          }`}
          style={selected !== id ? { background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' } : undefined}
        >
          <span>{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
