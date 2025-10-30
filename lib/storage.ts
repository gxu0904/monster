import { AppSettings, Theme, WindowState } from './types';

const STORAGE_KEYS = {
  SETTINGS: 'retro-portfolio-settings',
  WINDOWS: 'retro-portfolio-windows',
  WALLPAPER: 'retro-portfolio-wallpaper',
} as const;

export const storage = {
  // Settings
  getSettings(): AppSettings | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveSettings(settings: AppSettings): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings:', e);
    }
  },

  // Window positions
  getWindowStates(): Record<string, WindowState> | null {
    if (typeof window === 'undefined') return null;
    try {
      const data = localStorage.getItem(STORAGE_KEYS.WINDOWS);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveWindowStates(windows: Record<string, WindowState>): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.WINDOWS, JSON.stringify(windows));
    } catch (e) {
      console.error('Failed to save window states:', e);
    }
  },

  // Wallpaper
  getWallpaper(): string | null {
    if (typeof window === 'undefined') return null;
    try {
      return localStorage.getItem(STORAGE_KEYS.WALLPAPER);
    } catch {
      return null;
    }
  },

  saveWallpaper(wallpaper: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.WALLPAPER, wallpaper);
    } catch (e) {
      console.error('Failed to save wallpaper:', e);
    }
  },

  // Clear all
  clearAll(): void {
    if (typeof window === 'undefined') return;
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (e) {
      console.error('Failed to clear storage:', e);
    }
  },
};
