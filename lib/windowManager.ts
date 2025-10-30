import { WindowState } from './types';

export const DEFAULT_WINDOW_POSITIONS: Record<string, Partial<WindowState>> = {
  about: { x: 100, y: 80, width: 600, height: 500 },
  projects: { x: 150, y: 100, width: 700, height: 550 },
  resume: { x: 200, y: 120, width: 650, height: 600 },
  gallery: { x: 120, y: 90, width: 800, height: 600 },
  contact: { x: 180, y: 110, width: 500, height: 400 },
  settings: { x: 250, y: 150, width: 550, height: 500 },
};

export class WindowManager {
  private windows: Map<string, WindowState> = new Map();
  private nextZIndex = 100;
  private listeners: Set<() => void> = new Set();

  constructor(initialWindows?: Record<string, WindowState>) {
    if (initialWindows) {
      Object.entries(initialWindows).forEach(([id, state]) => {
        this.windows.set(id, state);
        this.nextZIndex = Math.max(this.nextZIndex, state.zIndex + 1);
      });
    }
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(listener => listener());
  }

  openWindow(id: string, title: string): WindowState {
    const existing = this.windows.get(id);

    if (existing) {
      // Window exists, just restore and focus it
      if (existing.isMinimized) {
        existing.isMinimized = false;
      }
      this.focusWindow(id);
      return existing;
    }

    // Create new window
    const defaults = DEFAULT_WINDOW_POSITIONS[id] || {
      x: 100 + this.windows.size * 30,
      y: 80 + this.windows.size * 30,
      width: 600,
      height: 500,
    };

    const windowState: WindowState = {
      id,
      title,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      x: defaults.x!,
      y: defaults.y!,
      width: defaults.width!,
      height: defaults.height!,
      zIndex: this.nextZIndex++,
      isFocused: true,
    };

    // Unfocus all other windows
    this.windows.forEach(w => w.isFocused = false);

    this.windows.set(id, windowState);
    this.notify();
    return windowState;
  }

  closeWindow(id: string) {
    this.windows.delete(id);
    this.notify();
  }

  minimizeWindow(id: string) {
    const window = this.windows.get(id);
    if (window) {
      window.isMinimized = true;
      window.isFocused = false;
      this.notify();
    }
  }

  maximizeWindow(id: string) {
    const window = this.windows.get(id);
    if (window) {
      window.isMaximized = !window.isMaximized;
      this.notify();
    }
  }

  focusWindow(id: string) {
    const window = this.windows.get(id);
    if (!window) return;

    // Unfocus all windows
    this.windows.forEach(w => w.isFocused = false);

    // Focus this window and bring to front
    window.isFocused = true;
    window.zIndex = this.nextZIndex++;

    this.notify();
  }

  updateWindow(id: string, updates: Partial<WindowState>) {
    const window = this.windows.get(id);
    if (window) {
      Object.assign(window, updates);
      this.notify();
    }
  }

  moveWindow(id: string, deltaX: number, deltaY: number) {
    const window = this.windows.get(id);
    if (window && !window.isMaximized) {
      window.x += deltaX;
      window.y += deltaY;
      this.notify();
    }
  }

  getWindow(id: string): WindowState | undefined {
    return this.windows.get(id);
  }

  getAllWindows(): WindowState[] {
    return Array.from(this.windows.values());
  }

  getOpenWindows(): WindowState[] {
    return this.getAllWindows().filter(w => !w.isMinimized);
  }

  getFocusedWindow(): WindowState | undefined {
    return this.getAllWindows().find(w => w.isFocused);
  }

  getState(): Record<string, WindowState> {
    const state: Record<string, WindowState> = {};
    this.windows.forEach((window, id) => {
      state[id] = { ...window };
    });
    return state;
  }

  snapToEdge(id: string, edge: 'left' | 'right' | 'top' | 'bottom') {
    const window = this.windows.get(id);
    if (!window || window.isMaximized) return;

    const padding = 10;
    const viewportWidth = typeof globalThis.window !== 'undefined' ? globalThis.window.innerWidth : 1200;
    const viewportHeight = typeof globalThis.window !== 'undefined' ? globalThis.window.innerHeight : 800;

    switch (edge) {
      case 'left':
        window.x = padding;
        break;
      case 'right':
        window.x = viewportWidth - window.width - padding;
        break;
      case 'top':
        window.y = padding;
        break;
      case 'bottom':
        window.y = viewportHeight - window.height - padding;
        break;
    }

    this.notify();
  }
}
