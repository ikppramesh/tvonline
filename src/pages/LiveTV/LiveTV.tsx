import { useParams, useNavigate } from 'react-router-dom';
import { CategoryTabBar } from '../../components/livetv/CategoryTabBar';
import { ChannelGrid } from '../../components/livetv/ChannelGrid';
import { LIVE_TV_CHANNELS } from '../../config/liveTv.config';
import { useLiveTVStore } from '../../store/livetvStore';
import type { ChannelCategory } from '../../types';

const VALID: ChannelCategory[] = [
  'news', 'hindi', 'telugu', 'tamil', 'kannada',
  'malayalam', 'marathi', 'music', 'movies', 'sports', 'gaming',
];

export function LiveTV() {
  const { category: paramCategory } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const { selectedCategory, setSelectedCategory } = useLiveTVStore();

  const active: ChannelCategory =
    paramCategory && VALID.includes(paramCategory as ChannelCategory)
      ? (paramCategory as ChannelCategory)
      : selectedCategory;

  const channels = LIVE_TV_CHANNELS[active];

  function handleCategorySelect(cat: ChannelCategory) {
    setSelectedCategory(cat);
    navigate(`/live/${cat}`, { replace: true });
  }

  return (
    <div className="h-full overflow-y-auto px-3 py-4 md:px-6 md:py-6 space-y-4 md:space-y-6 fade-in">
      <div>
        <h1 className="text-white text-2xl font-bold mb-1">Live TV</h1>
        <p className="text-tv-text-muted text-sm">{channels.length} channels — click any to open on YouTube</p>
      </div>

      <CategoryTabBar selected={active} onSelect={handleCategorySelect} />

      <ChannelGrid
        channels={channels}
        isLoading={false}
        error={null}
        onChannelFocus={() => {}}
      />
    </div>
  );
}
