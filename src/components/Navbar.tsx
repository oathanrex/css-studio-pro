import {
  Box,
  CircleDot,
  Copy,
  Download,
  Flame,
  Image as ImageIcon,
  Layers,
  Moon,
  Palette,
  ShieldCheck,
  Shuffle,
  Sparkles,
  Sun,
  Type,
  Zap,
} from 'lucide-react';
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import type { ToolMode } from '../types';

interface NavbarProps {
  activeMode: ToolMode;
  onSelectMode: (mode: ToolMode) => void;
  onRandomize: () => void;
  onCopyCss: () => void;
  onDownloadPng: () => void;
  copied: boolean;
}

const TOOLS: { id: ToolMode; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'gradient', label: 'Gradients', icon: Palette },
  { id: 'color-wheel', label: 'Color Wheel', icon: CircleDot },
  { id: 'image-extract', label: 'Extract Image', icon: ImageIcon },
  { id: 'accessibility', label: 'Accessibility', icon: ShieldCheck },
  { id: 'glassmorphism', label: 'Glassmorphism', icon: Layers },
  { id: 'neumorphism', label: 'Neumorphism', icon: Box },
  { id: 'shadow', label: 'Shadows', icon: Sparkles },
  { id: 'button', label: 'Buttons', icon: Zap },
  { id: 'text', label: 'Typography', icon: Type },
  { id: 'palettes', label: 'Gallery', icon: Flame },
];

export function Navbar({
  activeMode,
  onSelectMode,
  onRandomize,
  onCopyCss,
  onDownloadPng,
  copied,
}: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/80 dark:border-white/[0.08] bg-white/90 dark:bg-[#090a0f]/90 backdrop-blur-xl px-4 py-2.5 transition-colors duration-200">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-zinc-900 dark:bg-gradient-to-b dark:from-zinc-800 dark:to-zinc-950 border border-zinc-800 dark:border-white/10 shadow-xs">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#f4f4f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#e4e4e7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
                CSS Studio
              </span>
              <span className="rounded-full bg-zinc-200 dark:bg-zinc-800/90 border border-zinc-300 dark:border-white/10 px-2 py-0.5 text-[9px] font-mono font-semibold text-zinc-800 dark:text-zinc-300 tracking-wider">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal">
              Visual Design Workstation by <span className="text-zinc-800 dark:text-zinc-200 font-medium">Oathan Rex</span>
            </p>
          </div>
        </div>

        {/* High-Precision Fluid Segmented Navigation Tabs (Pill Architecture) */}
        <nav className="flex items-center gap-1 overflow-x-auto rounded-full border border-zinc-200/90 dark:border-white/[0.08] bg-zinc-100/90 dark:bg-zinc-950/80 p-1 shadow-inner scrollbar-none max-w-full">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            const isActive = activeMode === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectMode(t.id)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs border border-zinc-200/80 dark:border-white/10 font-semibold'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-200 hover:bg-zinc-200/60 dark:hover:bg-zinc-900/50 border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-zinc-900 dark:text-zinc-100' : 'text-zinc-400 dark:text-zinc-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Studio Actions & Theme Switcher */}
        <div className="flex items-center gap-2">
          {/* Light / Dark Mode Toggle Pill */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-xs"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400 animate-in fade-in" />
            ) : (
              <Moon className="h-4 w-4 text-indigo-600 animate-in fade-in" />
            )}
          </button>

          {activeMode === 'gradient' && (
            <button
              type="button"
              onClick={onRandomize}
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-zinc-100 dark:bg-zinc-900/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white cursor-pointer shadow-xs"
              title="Generate Balanced Palette"
            >
              <Shuffle className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              <span className="hidden sm:inline">Randomize</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCopyCss}
            className="flex items-center gap-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 px-4 py-1.5 text-xs font-semibold text-white dark:text-zinc-950 transition-all hover:bg-black dark:hover:bg-white cursor-pointer shadow-xs"
          >
            <Copy className="h-3.5 w-3.5 text-white dark:text-zinc-950" />
            <span>{copied ? '✓ Copied' : 'Copy CSS'}</span>
          </button>

          {activeMode === 'gradient' && (
            <button
              type="button"
              onClick={onDownloadPng}
              className="flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-zinc-100 dark:bg-zinc-900/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-all hover:bg-zinc-200 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white cursor-pointer shadow-xs"
              title="Download 4K Ultra HD PNG"
            >
              <Download className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              <span className="hidden md:inline">4K Wallpaper</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
