type SoundEffect = 'click' | 'open' | 'close' | 'minimize' | 'error';

class SoundManager {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private enabled = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadSounds();
    }
  }

  private loadSounds() {
    const soundFiles: Record<SoundEffect, string> = {
      click: '/audio/click.mp3',
      open: '/audio/open.mp3',
      close: '/audio/close.mp3',
      minimize: '/audio/minimize.mp3',
      error: '/audio/error.mp3',
    };

    Object.entries(soundFiles).forEach(([effect, path]) => {
      const audio = new Audio(path);
      audio.volume = 0.3;
      this.sounds.set(effect as SoundEffect, audio);
    });
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  play(effect: SoundEffect) {
    if (!this.enabled) return;

    const sound = this.sounds.get(effect);
    if (sound) {
      // Clone and play to allow overlapping sounds
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Silently fail if audio can't play (autoplay restrictions, etc.)
      });
    }
  }
}

export const sfx = new SoundManager();
