import { HeroBanner } from '../../components/home/HeroBanner';
import { LiveChannelRow } from '../../components/home/LiveChannelRow';
import { FeaturedAppsRow } from '../../components/home/FeaturedAppsRow';
import { LIVE_TV_CHANNELS } from '../../config/liveTv.config';

// Feature the first Aaj Tak (Hindi) channel on the hero
const featuredChannel = LIVE_TV_CHANNELS.hindi[0];

export function Home() {
  return (
    <div className="h-full overflow-y-auto px-6 py-6 space-y-8 fade-in">
      <HeroBanner channel={featuredChannel} />
      <LiveChannelRow />
      <FeaturedAppsRow />
    </div>
  );
}
