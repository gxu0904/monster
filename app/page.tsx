'use client';

import { useState, useEffect } from 'react';
import BootScreen from '@/components/BootScreen';
import Desktop from '@/components/Desktop';

export default function Home() {
  const [booted, setBooted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className="h-screen w-screen overflow-hidden">
      {!booted && <BootScreen onBootComplete={() => setBooted(true)} />}
      {booted && <Desktop />}
    </main>
  );
}
