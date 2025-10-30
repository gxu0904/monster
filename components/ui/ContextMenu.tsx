'use client';

import { useEffect, useRef } from 'react';

interface ContextMenuItem {
  label?: string;
  icon?: string;
  action?: () => void;
  divider?: boolean;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (item.action) {
      item.action();
    }
    onClose();
  };

  return (
    <div
      ref={menuRef}
      className="fixed window-chrome bg-retro-beige-200 py-1 min-w-[200px] z-[9999]"
      style={{ left: x, top: y }}
      role="menu"
    >
      {items.map((item, i) => (
        item.divider ? (
          <div key={i} className="my-1 border-t border-gray-400" />
        ) : (
          <button
            key={i}
            onClick={() => handleItemClick(item)}
            className="w-full px-4 py-2 text-left text-sm hover:bg-blue-600 hover:text-white flex items-center gap-2"
            role="menuitem"
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        )
      ))}
    </div>
  );
}
