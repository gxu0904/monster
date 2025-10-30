import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatTime(date: Date, format: '12h' | '24h'): string {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (format === '24h') {
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  }

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${minutes} ${period}`;
}

export function constrainToViewport(
  x: number,
  y: number,
  width: number,
  height: number
): { x: number; y: number } {
  const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
  const viewportHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

  return {
    x: Math.max(0, Math.min(x, viewportWidth - width)),
    y: Math.max(0, Math.min(y, viewportHeight - height)),
  };
}
