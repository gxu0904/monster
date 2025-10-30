'use client';

import { useState, useEffect } from 'react';
import { WindowState } from '@/lib/types';
import { formatTime } from '@/lib/utils';
import { sfx } from '@/lib/sfx';

interface TaskbarProps {
  windows: WindowState[];
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
  clockFormat: '12h' | '24h';
}

export default function Taskbar({ windows, onWindowClick, onStartClick, clockFormat }: TaskbarProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleWindowClick = (id: string, window: WindowState) => {
    sfx.play('click');
    onWindowClick(id);
  };

  const handleStartClick = () => {
    sfx.play('click');
    onStartClick();
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-retro-beige-300 border-t-2 border-white flex items-center px-1 gap-1 z-50">
      {/* Start Button */}
      <button
        onClick={handleStartClick}
        className="retro-button flex items-center gap-2 h-8 px-3 font-pixel text-xs"
        aria-label="Start menu"
      >
        <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-yellow-500" />
        <span>Start</span>
      </button>

      {/* Window Buttons */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto scrollbar-hide">
        {windows.map((window) => (
          <button
            key={window.id}
            onClick={() => handleWindowClick(window.id, window)}
            className={`retro-button h-8 px-3 min-w-[120px] max-w-[200px] truncate text-xs ${
              window.isFocused ? 'bg-retro-beige-400' : ''
            }`}
            aria-label={`Switch to ${window.title}`}
            aria-pressed={window.isFocused}
          >
            {window.title}
          </button>
        ))}
      </div>

      {/* System Tray */}
      <div className="flex items-center gap-2 px-2 h-8 bg-retro-beige-200 border border-solid border-gray-600 border-t-gray-400 border-l-gray-400">
        {/* Battery Icon */}
        <div className="flex items-center gap-1" title="Battery: OK">
          <div className="w-5 h-3 border border-black flex items-center">
            <div className="w-full h-full bg-green-500" />
          </div>
          <div className="w-0.5 h-1.5 bg-black" />
        </div>

        {/* Clock */}
        <div className="font-mono text-xs whitespace-nowrap" role="timer" aria-live="off">
          {formatTime(time, clockFormat)}
        </div>
      </div>
    </div>
  );
}
