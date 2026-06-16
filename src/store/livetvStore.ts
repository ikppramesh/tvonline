import { create } from 'zustand';
import type { ChannelCategory, LiveChannel } from '../types';

interface LiveTVStore {
  selectedCategory: ChannelCategory;
  featuredChannel: LiveChannel | null;
  setSelectedCategory: (category: ChannelCategory) => void;
  setFeaturedChannel: (channel: LiveChannel | null) => void;
}

export const useLiveTVStore = create<LiveTVStore>((set) => ({
  selectedCategory: 'hindi',
  featuredChannel: null,
  setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
  setFeaturedChannel: (featuredChannel) => set({ featuredChannel }),
}));
