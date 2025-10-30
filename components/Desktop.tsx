'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Window from './Window';
import Taskbar from './Taskbar';
import QuickLauncher from './QuickLauncher';
import DesktopIcon from './ui/DesktopIcon';
import ContextMenu from './ui/ContextMenu';
import AboutWindow from './windows/AboutWindow';
import ProjectsWindow from './windows/ProjectsWindow';
import ProjectDetailWindow from './windows/ProjectDetailWindow';
import ResumeWindow from './windows/ResumeWindow';
import GalleryWindow from './windows/GalleryWindow';
import ContactWindow from './windows/ContactWindow';
import SettingsWindow from './windows/SettingsWindow';
import { WindowManager } from '@/lib/windowManager';
import { storage } from '@/lib/storage';
import { AppSettings, DEFAULT_SETTINGS, Project, ProjectsSchema } from '@/lib/types';
import { sfx } from '@/lib/sfx';
import projectsData from '@/data/projects.json';

const projects = ProjectsSchema.parse(projectsData);

const wallpapers = [
  { id: 'blue-grid', name: 'Blue Grid', gradient: 'from-blue-400 to-blue-600' },
  { id: 'green-field', name: 'Green Field', gradient: 'from-green-400 to-green-600' },
  { id: 'sunset', name: 'Sunset', gradient: 'from-orange-400 via-pink-500 to-purple-600' },
  { id: 'ocean', name: 'Ocean', gradient: 'from-cyan-400 to-blue-700' },
];

export default function Desktop() {
  const [windowManager] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = storage.getWindowStates();
      return new WindowManager(saved || {});
    }
    return new WindowManager();
  });

  const [settings, setSettings] = useState<AppSettings>(() => {
    if (typeof window !== 'undefined') {
      return storage.getSettings() || DEFAULT_SETTINGS;
    }
    return DEFAULT_SETTINGS;
  });

  const [wallpaper, setWallpaper] = useState(() => {
    if (typeof window !== 'undefined') {
      return storage.getWallpaper() || 'blue-grid';
    }
    return 'blue-grid';
  });

  const [, forceUpdate] = useState({});
  const [quickLauncherOpen, setQuickLauncherOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);

  // Subscribe to window manager updates
  useEffect(() => {
    const unsubscribe = windowManager.subscribe(() => {
      forceUpdate({});
      if (typeof window !== 'undefined') {
        storage.saveWindowStates(windowManager.getState());
      }
    });
    return unsubscribe;
  }, [windowManager]);

  // Apply settings
  useEffect(() => {
    if (typeof window !== 'undefined') {
      storage.saveSettings(settings);
      document.documentElement.setAttribute('data-theme', settings.theme);
      sfx.setEnabled(settings.soundEnabled);
    }
  }, [settings]);

  // Apply wallpaper
  useEffect(() => {
    if (typeof window !== 'undefined') {
      storage.saveWallpaper(wallpaper);
    }
  }, [wallpaper]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + ` for Quick Launcher
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setQuickLauncherOpen(true);
      }

      const focused = windowManager.getFocusedWindow();
      if (!focused) return;

      // Arrow keys to move window
      if (e.key.startsWith('Arrow') && !e.shiftKey && !e.ctrlKey) {
        e.preventDefault();
        const delta = 10;
        switch (e.key) {
          case 'ArrowLeft':
            windowManager.moveWindow(focused.id, -delta, 0);
            break;
          case 'ArrowRight':
            windowManager.moveWindow(focused.id, delta, 0);
            break;
          case 'ArrowUp':
            windowManager.moveWindow(focused.id, 0, -delta);
            break;
          case 'ArrowDown':
            windowManager.moveWindow(focused.id, 0, delta);
            break;
        }
      }

      // Escape to close focused window
      if (e.key === 'Escape') {
        windowManager.closeWindow(focused.id);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [windowManager]);

  const handleOpenApp = useCallback((appId: string) => {
    sfx.play('open');
    const titles: Record<string, string> = {
      about: 'About Me',
      projects: 'Projects',
      resume: 'Resume',
      gallery: 'Gallery',
      contact: 'Contact',
      settings: 'Settings',
    };
    windowManager.openWindow(appId, titles[appId] || appId);
  }, [windowManager]);

  const handleOpenProject = useCallback((project: Project) => {
    setSelectedProject(project);
    windowManager.openWindow(`project-${project.slug}`, project.name);
  }, [windowManager]);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleUpdateSettings = (updates: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  const handleResetLayout = () => {
    storage.clearAll();
    window.location.reload();
  };

  const handleWindowClick = (id: string) => {
    const window = windowManager.getWindow(id);
    if (window?.isMinimized) {
      windowManager.updateWindow(id, { isMinimized: false });
    }
    windowManager.focusWindow(id);
  };

  const windows = windowManager.getAllWindows();
  const currentWallpaper = wallpapers.find((w) => w.id === wallpaper) || wallpapers[0];

  const desktopIcons = [
    { id: 'about', label: 'About Me', icon: '👤' },
    { id: 'projects', label: 'Projects', icon: '💼' },
    { id: 'resume', label: 'Resume', icon: '📄' },
    { id: 'gallery', label: 'Gallery', icon: '🖼️' },
    { id: 'contact', label: 'Contact', icon: '📧' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <div
      ref={desktopRef}
      className={`fixed inset-0 bg-gradient-to-br ${currentWallpaper.gradient} ${settings.crtEffect ? 'crt-effect' : ''}`}
      onContextMenu={handleContextMenu}
    >
      {/* Desktop Icons */}
      <div className="absolute top-4 left-4 flex flex-col gap-4">
        {desktopIcons.map((icon) => (
          <DesktopIcon
            key={icon.id}
            id={icon.id}
            label={icon.label}
            icon={icon.icon}
            onOpen={() => handleOpenApp(icon.id)}
          />
        ))}
      </div>

      {/* Windows */}
      {windows.map((window) => {
        let content;

        if (window.id === 'about') {
          content = <AboutWindow />;
        } else if (window.id === 'projects') {
          content = <ProjectsWindow projects={projects} onOpenProject={handleOpenProject} />;
        } else if (window.id.startsWith('project-') && selectedProject) {
          content = <ProjectDetailWindow project={selectedProject} />;
        } else if (window.id === 'resume') {
          content = <ResumeWindow />;
        } else if (window.id === 'gallery') {
          content = <GalleryWindow />;
        } else if (window.id === 'contact') {
          content = <ContactWindow />;
        } else if (window.id === 'settings') {
          content = (
            <SettingsWindow
              settings={settings}
              onUpdateSettings={handleUpdateSettings}
              onResetLayout={handleResetLayout}
            />
          );
        }

        return (
          <Window
            key={window.id}
            window={window}
            onClose={() => windowManager.closeWindow(window.id)}
            onMinimize={() => windowManager.minimizeWindow(window.id)}
            onMaximize={() => windowManager.maximizeWindow(window.id)}
            onFocus={() => windowManager.focusWindow(window.id)}
            onUpdate={(updates) => windowManager.updateWindow(window.id, updates)}
          >
            {content}
          </Window>
        );
      })}

      {/* Taskbar */}
      <Taskbar
        windows={windows}
        onWindowClick={handleWindowClick}
        onStartClick={() => setQuickLauncherOpen(true)}
        clockFormat={settings.clockFormat}
      />

      {/* Quick Launcher */}
      <QuickLauncher
        isOpen={quickLauncherOpen}
        onClose={() => setQuickLauncherOpen(false)}
        onSelectApp={handleOpenApp}
      />

      {/* Context Menu */}
      {contextMenu && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          onClose={() => setContextMenu(null)}
          items={[
            { label: 'Arrange Icons', icon: '📐', action: () => alert('Icon arrangement coming soon!') },
            { divider: true },
            ...wallpapers.map((wp) => ({
              label: wp.name,
              icon: '🖼️',
              action: () => setWallpaper(wp.id),
            })),
            { divider: true },
            { label: 'Settings', icon: '⚙️', action: () => handleOpenApp('settings') },
          ]}
        />
      )}
    </div>
  );
}
