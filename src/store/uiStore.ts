import { create } from 'zustand';

interface UIStore {
  sidebarExpanded: boolean;
  setSidebarExpanded: (expanded: boolean) => void;
  apiKeyModalOpen: boolean;
  setApiKeyModalOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  sidebarExpanded: false,
  setSidebarExpanded: (sidebarExpanded) => set({ sidebarExpanded }),
  apiKeyModalOpen: false,
  setApiKeyModalOpen: (apiKeyModalOpen) => set({ apiKeyModalOpen }),
}));
