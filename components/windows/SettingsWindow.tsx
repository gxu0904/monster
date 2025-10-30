'use client';

import { AppSettings, Theme } from '@/lib/types';

interface SettingsWindowProps {
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
  onResetLayout: () => void;
}

const themes: { value: Theme; label: string; description: string }[] = [
  { value: 'classic-beige', label: 'Classic Beige', description: 'Traditional Windows 95 aesthetic' },
  { value: 'olive-gray', label: 'Olive Gray', description: 'Dark mode with olive tones' },
  { value: 'candy-blue', label: 'Candy Blue', description: 'Vibrant blue theme' },
];

export default function SettingsWindow({ settings, onUpdateSettings, onResetLayout }: SettingsWindowProps) {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-pixel mb-6 text-blue-700">Settings</h1>

      <div className="space-y-6">
        {/* Theme */}
        <section className="bg-retro-beige-50 p-4 border-2 border-retro-beige-300">
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Theme</h2>
          <div className="space-y-2">
            {themes.map((theme) => (
              <label
                key={theme.value}
                className="flex items-start gap-3 p-3 bg-white border border-gray-300 cursor-pointer hover:border-blue-500"
              >
                <input
                  type="radio"
                  name="theme"
                  value={theme.value}
                  checked={settings.theme === theme.value}
                  onChange={(e) => onUpdateSettings({ theme: e.target.value as Theme })}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="font-bold">{theme.label}</div>
                  <div className="text-xs text-gray-600">{theme.description}</div>
                </div>
              </label>
            ))}
          </div>
        </section>

        {/* Visual Effects */}
        <section className="bg-retro-beige-50 p-4 border-2 border-retro-beige-300">
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Visual Effects</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-white border border-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.crtEffect}
                onChange={(e) => onUpdateSettings({ crtEffect: e.target.checked })}
              />
              <div className="flex-1">
                <div className="font-bold">CRT Screen Effect</div>
                <div className="text-xs text-gray-600">
                  Scanlines, vignette, and chromatic aberration
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Audio */}
        <section className="bg-retro-beige-50 p-4 border-2 border-retro-beige-300">
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Audio</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 bg-white border border-gray-300 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.soundEnabled}
                onChange={(e) => onUpdateSettings({ soundEnabled: e.target.checked })}
              />
              <div className="flex-1">
                <div className="font-bold">Sound Effects</div>
                <div className="text-xs text-gray-600">
                  Play sounds for clicks, window actions, etc.
                </div>
              </div>
            </label>
          </div>
        </section>

        {/* Clock Format */}
        <section className="bg-retro-beige-50 p-4 border-2 border-retro-beige-300">
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Clock</h2>
          <div className="flex gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="clockFormat"
                value="12h"
                checked={settings.clockFormat === '12h'}
                onChange={(e) => onUpdateSettings({ clockFormat: '12h' })}
              />
              <span>12-hour</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="clockFormat"
                value="24h"
                checked={settings.clockFormat === '24h'}
                onChange={(e) => onUpdateSettings({ clockFormat: '24h' })}
              />
              <span>24-hour</span>
            </label>
          </div>
        </section>

        {/* Layout Reset */}
        <section className="bg-retro-beige-50 p-4 border-2 border-retro-beige-300">
          <h2 className="text-lg font-pixel mb-3 text-blue-600">Layout</h2>
          <button
            onClick={onResetLayout}
            className="retro-button px-4 py-2"
          >
            Reset Window Positions
          </button>
          <p className="text-xs text-gray-600 mt-2">
            Reset all windows to their default positions and sizes
          </p>
        </section>
      </div>
    </div>
  );
}
