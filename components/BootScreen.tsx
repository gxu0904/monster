'use client';

import { useEffect, useState } from 'react';

interface BootScreenProps {
  onBootComplete: () => void;
}

export default function BootScreen({ onBootComplete }: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);

  const bootLines = [
    'RetroOS v2.1 BIOS (C) 1998 Retro Computing Inc.',
    'CPU: Pentium II 450MHz',
    'Memory Test: 64MB OK',
    'Detecting Primary Master... OK',
    'Detecting Primary Slave... OK',
    'Loading PORTFOLIO.SYS...',
    'Initializing Window Manager...',
    'Loading Desktop Environment...',
    'Starting User Profile...',
    'System Ready.',
  ];

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Boot text animation
    const lineInterval = setInterval(() => {
      setCurrentLine(prev => {
        if (prev >= bootLines.length - 1) {
          clearInterval(lineInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);

    // Complete boot sequence
    const timeout = setTimeout(() => {
      onBootComplete();
    }, 2500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
      clearTimeout(timeout);
    };
  }, [onBootComplete]);

  return (
    <div className="fixed inset-0 bg-black text-green-400 font-mono text-sm flex flex-col justify-center px-8 md:px-16 animate-boot">
      <div className="max-w-3xl">
        {/* BIOS Header */}
        <div className="border-2 border-green-400 p-4 mb-8">
          <div className="text-center text-lg mb-2">RETRO COMPUTER PORTFOLIO</div>
          <div className="text-center text-xs">Press DEL to enter SETUP</div>
        </div>

        {/* Boot Messages */}
        <div className="space-y-1 mb-8 min-h-[200px]">
          {bootLines.slice(0, currentLine + 1).map((line, i) => (
            <div key={i} className="flex items-start">
              <span className="text-green-500 mr-2">&gt;</span>
              <span>{line}</span>
            </div>
          ))}
          {currentLine < bootLines.length - 1 && (
            <div className="flex items-start animate-pulse">
              <span className="text-green-500 mr-2">&gt;</span>
              <span className="inline-block w-2 h-4 bg-green-400" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="border border-green-400 p-2">
          <div className="bg-green-400 h-4 transition-all duration-100" style={{ width: `${progress}%` }} />
        </div>
        <div className="text-right mt-2 text-xs">{progress}%</div>
      </div>
    </div>
  );
}
