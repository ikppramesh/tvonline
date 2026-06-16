import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { GoogleUser } from '../types';

interface AuthStore {
  user: GoogleUser | null;
  accessToken: string | null;
  setAuth: (user: GoogleUser, accessToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setAuth: (user, accessToken) => set({ user, accessToken }),
      clearAuth: () => set({ user: null, accessToken: null }),
    }),
    {
      name: 'tvonline-auth',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
      }),
    }
  )
);
