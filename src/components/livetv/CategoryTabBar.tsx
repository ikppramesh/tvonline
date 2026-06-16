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
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto pb-1"
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      {LIVE_TV_CATEGORIES.map(({ id, label, emoji }) => (
        <button
          key={id}
          onClick={() => onSelect(id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border focus:outline-none flex-shrink-0 ${
            selected === id
              ? 'bg-tv-focus border-tv-focus text-white shadow-lg'
              : 'bg-tv-surface-2 border-tv-border text-tv-text-muted hover:border-tv-focus hover:text-white'
          }`}
        >
          <span className="text-base">{emoji}</span>
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
