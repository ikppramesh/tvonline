export interface AppItem {
  id: string;
  name: string;
  icon: string;
  color: string;
  launchUrl: string;
  launchMode: 'tab' | 'internal';
  description?: string;
}

export interface LiveChannel {
  channelId: string;       // our internal slug
  ytChannelId: string;     // YouTube UC... channel ID for embed
  channelName: string;
  category: ChannelCategory;
  thumbnailUrl?: string;   // optional verified image URL
  liveUrl: string;         // YouTube @handle/live fallback
  color: string;           // brand color for gradient fallback
  tagline?: string;
  language?: string;
}

export type ChannelCategory =
  | 'news'
  | 'hindi'
  | 'telugu'
  | 'tamil'
  | 'kannada'
  | 'malayalam'
  | 'marathi'
  | 'music'
  | 'movies'
  | 'sports'
  | 'gaming';

export interface YouTubeSearchResult {
  kind: string;
  id: { kind: string; videoId?: string; channelId?: string };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: YouTubeThumbnail;
      medium: YouTubeThumbnail;
      high: YouTubeThumbnail;
    };
    channelTitle: string;
    liveBroadcastContent: 'live' | 'upcoming' | 'none';
  };
}

export interface YouTubeThumbnail {
  url: string;
  width: number;
  height: number;
}

export interface YouTubeVideoDetails {
  id: string;
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: Record<string, YouTubeThumbnail>;
    description: string;
  };
  liveStreamingDetails?: {
    concurrentViewers?: string;
    activeLiveChatId?: string;
  };
  statistics?: {
    viewCount: string;
    likeCount: string;
  };
}

export interface TrendingVideo {
  id: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount: string;
  publishedAt: string;
}

export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}
