import { ChannelCard } from './ChannelCard';
import { LoadingSpinner } from '../shared/LoadingSpinner';
import type { LiveChannel } from '../../types';

interface ChannelGridProps {
  channels: LiveChannel[];
  isLoading: boolean;
  error?: Error | null;
  onChannelFocus?: (channel: LiveChannel) => void;
}

export function ChannelGrid({ channels, isLoading, error, onChannelFocus }: ChannelGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-3 text-tv-text-muted">
        <p>Failed to load channels</p>
        <p className="text-sm opacity-60">Try refreshing the page</p>
      </div>
    );
  }

  if (!channels.length) {
    return (
      <div className="flex items-center justify-center h-64 text-tv-text-muted">
        <p>No live channels found right now</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {channels.map((channel) => (
        <ChannelCard
          key={channel.channelId}
          channel={channel}
          onFocus={() => onChannelFocus?.(channel)}
        />
      ))}
    </div>
  );
}
