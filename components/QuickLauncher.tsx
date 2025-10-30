'use client';

import { useState, useEffect, useRef } from 'react';
import { fuzzySearch } from '@/lib/fuzzy';

interface QuickLauncherProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectApp: (appId: string) => void;
}

interface App {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const apps: App[] = [
  { id: 'about', name: 'About', icon: '👤', description: 'Learn about me' },
  { id: 'projects', name: 'Projects', icon: '💼', description: 'View my work' },
  { id: 'resume', name: 'Resume', icon: '📄', description: 'Download resume' },
  { id: 'gallery', name: 'Gallery', icon: '🖼️', description: 'Project screenshots' },
  { id: 'contact', name: 'Contact', icon: '📧', description: 'Get in touch' },
  { id: 'settings', name: 'Settings', icon: '⚙️', description: 'Configure preferences' },
];

const easterEggCommands = [
  { command: 'help', response: 'Available commands: theme-shuffle, scanlines' },
  { command: 'theme-shuffle', response: 'Shuffling themes...' },
  { command: 'scanlines', response: 'Adjusting scanline intensity...' },
];

export default function QuickLauncher({ isOpen, onClose, onSelectApp }: QuickLauncherProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = fuzzySearch(query, apps, (app) => `${app.name} ${app.description}`);
  const easterEgg = easterEggCommands.find((cmd) => cmd.command === query.toLowerCase());

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev === 0 ? results.length - 1 : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (easterEgg) {
        alert(easterEgg.response);
        onClose();
      } else if (results[selectedIndex]) {
        onSelectApp(results[selectedIndex].item.id);
        onClose();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-[9998]"
        onClick={onClose}
      />

      {/* Launcher */}
      <div
        className="fixed top-1/4 left-1/2 -translate-x-1/2 w-full max-w-lg z-[9999] window-chrome"
        role="dialog"
        aria-label="Quick Launcher"
        aria-modal="true"
      >
        <div className="window-title-bar font-pixel text-xs">
          <span>Quick Launcher</span>
          <button
            onClick={onClose}
            className="w-6 h-6 bg-retro-beige-200 hover:bg-red-400 border border-solid border-white border-b-gray-700 border-r-gray-700 flex items-center justify-center text-black font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="bg-white p-4">
          {/* Search Input */}
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type to search apps or commands..."
            className="w-full px-3 py-2 border-2 border-gray-400 focus:border-blue-600 focus:outline-none font-mono"
          />

          {/* Easter Egg Message */}
          {easterEgg && (
            <div className="mt-3 p-3 bg-green-100 border border-green-400 text-sm">
              <div className="font-bold">Easter Egg Found!</div>
              <div className="text-xs">{easterEgg.response}</div>
            </div>
          )}

          {/* Results */}
          <div className="mt-3 max-h-80 overflow-y-auto scrollbar-retro">
            {results.length === 0 && !easterEgg ? (
              <div className="text-center py-8 text-gray-500 text-sm">
                No results found. Try "help" for easter eggs!
              </div>
            ) : (
              <div className="space-y-1">
                {results.map((result, i) => (
                  <button
                    key={result.item.id}
                    onClick={() => {
                      onSelectApp(result.item.id);
                      onClose();
                    }}
                    className={`w-full flex items-center gap-3 p-3 text-left ${
                      i === selectedIndex
                        ? 'bg-blue-600 text-white'
                        : 'bg-retro-beige-50 hover:bg-retro-beige-100'
                    }`}
                  >
                    <span className="text-2xl">{result.item.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{result.item.name}</div>
                      <div className="text-xs opacity-75 truncate">
                        {result.item.description}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Hint */}
          <div className="mt-3 text-xs text-gray-500 text-center">
            Use ↑↓ to navigate, Enter to select, Esc to close
          </div>
        </div>
      </div>
    </>
  );
}
