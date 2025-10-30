'use client';

import { useRef, useEffect, useState, ReactNode } from 'react';
import { WindowState } from '@/lib/types';
import { cn, constrainToViewport } from '@/lib/utils';
import { sfx } from '@/lib/sfx';

interface WindowProps {
  window: WindowState;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onUpdate: (updates: Partial<WindowState>) => void;
  children: ReactNode;
}

export default function Window({
  window,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onUpdate,
  children,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0 });

  // Handle dragging
  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;

      const newPos = constrainToViewport(
        window.x + deltaX,
        window.y + deltaY,
        window.width,
        window.height
      );

      onUpdate({ x: newPos.x, y: newPos.y });
      setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, window, onUpdate]);

  // Handle resizing
  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - resizeStart.x;
      const deltaY = e.clientY - resizeStart.y;

      const newWidth = Math.max(300, resizeStart.width + deltaX);
      const newHeight = Math.max(200, resizeStart.height + deltaY);

      onUpdate({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, resizeStart, onUpdate]);

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if (window.isMaximized) return;
    if ((e.target as HTMLElement).closest('button')) return;

    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    onFocus();
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.isMaximized) return;

    setIsResizing(true);
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: window.width,
      height: window.height,
    });
    onFocus();
  };

  const handleClose = () => {
    sfx.play('close');
    onClose();
  };

  const handleMinimize = () => {
    sfx.play('minimize');
    onMinimize();
  };

  const handleMaximize = () => {
    sfx.play('click');
    onMaximize();
  };

  if (window.isMinimized) return null;

  const style: React.CSSProperties = window.isMaximized
    ? {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)',
        zIndex: window.zIndex,
      }
    : {
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        zIndex: window.zIndex,
      };

  return (
    <div
      ref={windowRef}
      className={cn(
        'fixed window-chrome flex flex-col',
        isDragging && 'cursor-move',
        isResizing && 'cursor-nwse-resize'
      )}
      style={style}
      onMouseDown={onFocus}
      role="dialog"
      aria-labelledby={`window-title-${window.id}`}
      aria-modal="false"
    >
      {/* Title Bar */}
      <div
        className={cn(
          'window-title-bar font-pixel text-xs select-none',
          !window.isFocused && 'window-title-bar-inactive'
        )}
        onMouseDown={handleTitleBarMouseDown}
      >
        <div id={`window-title-${window.id}`} className="flex items-center gap-2 flex-1">
          <div className="w-4 h-4 bg-white/20 flex items-center justify-center">
            <div className="w-2 h-2 bg-white/60" />
          </div>
          <span>{window.title}</span>
        </div>

        <div className="flex items-center gap-1">
          {/* Minimize */}
          <button
            onClick={handleMinimize}
            className="w-6 h-6 bg-retro-beige-200 hover:bg-retro-beige-300 border border-solid border-white border-b-gray-700 border-r-gray-700 flex items-center justify-center text-black text-sm font-bold"
            aria-label="Minimize"
            title="Minimize"
          >
            _
          </button>

          {/* Maximize */}
          <button
            onClick={handleMaximize}
            className="w-6 h-6 bg-retro-beige-200 hover:bg-retro-beige-300 border border-solid border-white border-b-gray-700 border-r-gray-700 flex items-center justify-center text-black"
            aria-label={window.isMaximized ? 'Restore' : 'Maximize'}
            title={window.isMaximized ? 'Restore' : 'Maximize'}
          >
            <div className="w-3 h-3 border border-black" />
          </button>

          {/* Close */}
          <button
            onClick={handleClose}
            className="w-6 h-6 bg-retro-beige-200 hover:bg-red-400 border border-solid border-white border-b-gray-700 border-r-gray-700 flex items-center justify-center text-black font-bold"
            aria-label="Close"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-white overflow-auto scrollbar-retro">
        {children}
      </div>

      {/* Resize Handle */}
      {!window.isMaximized && (
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={handleResizeMouseDown}
          style={{
            background: 'linear-gradient(135deg, transparent 50%, #808080 50%)',
          }}
        />
      )}
    </div>
  );
}
