import {
  Box,
  Copy,
  Download,
  Flame,
  Layers,
  Palette,
  Shuffle,
  Sparkles,
  Type,
  Zap,
} from 'lucide-react';
import React from 'react';
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
  { id: 'glassmorphism', label: 'Glassmorphism', icon: Layers },
  { id: 'neumorphism', label: 'Neumorphism', icon: Box },
  { id: 'shadow', label: 'Box Shadows', icon: Sparkles },
  { id: 'button', label: 'CSS Buttons', icon: Zap },
  { id: 'text', label: 'Text Gradients', icon: Type },
  { id: 'palettes', label: '100+ Palettes', icon: Flame },
];

export function Navbar({
  activeMode,
  onSelectMode,
  onRandomize,
  onCopyCss,
  onDownloadPng,
  copied,
}: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-4 py-3">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white shadow-md font-black text-sm">
            CSS
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-base tracking-tight text-white">
                CSS Studio Pro
              </span>
              <span className="rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 px-2 py-0.5 text-[9px] font-bold text-white uppercase tracking-wider shadow-xs">
                Free &amp; Open
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Modern CSS Gradient, Glassmorphism &amp; Shadow Generator by Oathan Rex
            </p>
          </div>
        </div>

        {/* Tool Switcher Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/80 p-1 scrollbar-none">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            const isActive = activeMode === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectMode(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Top Actions */}
        <div className="flex items-center gap-2">
          {activeMode === 'gradient' && (
            <button
              type="button"
              onClick={onRandomize}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 cursor-pointer shadow-xs"
              title="Generate Random Gradient"
            >
              <Shuffle className="h-3.5 w-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Randomize</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCopyCss}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white transition-all hover:bg-indigo-500 cursor-pointer shadow-md"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? '✓ Copied!' : 'Copy CSS'}</span>
          </button>

          {activeMode === 'gradient' && (
            <button
              type="button"
              onClick={onDownloadPng}
              className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 cursor-pointer shadow-xs"
              title="Download 1080p Wallpaper"
            >
              <Download className="h-3.5 w-3.5 text-cyan-400" />
              <span className="hidden md:inline">PNG Wallpaper</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
