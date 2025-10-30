'use client';

import { useRef, useState } from 'react';
import { sfx } from '@/lib/sfx';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: string;
  onOpen: () => void;
  onSelect?: () => void;
  selected?: boolean;
}

export default function DesktopIcon({ id, label, icon, onOpen, onSelect, selected }: DesktopIconProps) {
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    sfx.play('click');

    if (clickTimer.current) {
      clearTimeout(clickTimer.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount === 1) {
      onSelect?.();
      clickTimer.current = setTimeout(() => {
        setClickCount(0);
      }, 300);
    } else if (newCount === 2) {
      setClickCount(0);
      onOpen();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sfx.play('click');
      onOpen();
    }
  };

  return (
    <div
      className={`desktop-icon ${selected ? 'bg-blue-500/30' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Open ${label}`}
    >
      <div className="w-12 h-12 flex items-center justify-center text-4xl">
        {icon}
      </div>
      <div className="text-xs text-center text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] font-pixel px-1 break-words">
        {label}
      </div>
    </div>
  );
}
