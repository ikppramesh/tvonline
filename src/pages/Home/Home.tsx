import { HeroVideo } from '../../components/home/HeroVideo';
import { LiveChannelRow } from '../../components/home/LiveChannelRow';
import { FeaturedAppsRow } from '../../components/home/FeaturedAppsRow';
import { TrendingVideosRow } from '../../components/home/TrendingVideosRow';

export function Home() {
  return (
    <div className="h-full overflow-y-auto px-3 py-4 md:px-6 md:py-6 space-y-6 md:space-y-8 fade-in">
      <HeroVideo />
      <TrendingVideosRow />
      <LiveChannelRow />
      <FeaturedAppsRow />
    </div>
  );
}
