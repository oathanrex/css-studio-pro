import {
  Box,
  CircleDot,
  Copy,
  Download,
  Flame,
  Image as ImageIcon,
  Layers,
  Palette,
  ShieldCheck,
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
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#090a0f]/90 backdrop-blur-xl px-4 py-2.5 transition-all">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
        {/* Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-b from-zinc-800 to-zinc-950 border border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#f4f4f5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#a1a1aa" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#e4e4e7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-tight text-zinc-100 uppercase">
                CSS Studio
              </span>
              <span className="rounded-md bg-zinc-800/90 border border-white/10 px-1.5 py-0.5 text-[9px] font-mono font-semibold text-zinc-300 tracking-wider">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-zinc-400 font-normal">
              Visual Design Workstation by <span className="text-zinc-200 font-medium">Oathan Rex</span>
            </p>
          </div>
        </div>

        {/* High-Precision Segmented Navigation Tabs */}
        <nav className="flex items-center gap-1 overflow-x-auto rounded-xl border border-white/[0.08] bg-zinc-950/80 p-1 shadow-inner scrollbar-none max-w-full">
          {TOOLS.map((t) => {
            const Icon = t.icon;
            const isActive = activeMode === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => onSelectMode(t.id)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-zinc-800 text-white shadow-xs border border-white/10 font-semibold'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/50 border border-transparent'
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isActive ? 'text-zinc-100' : 'text-zinc-500'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Studio Actions */}
        <div className="flex items-center gap-2">
          {activeMode === 'gradient' && (
            <button
              type="button"
              onClick={onRandomize}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white cursor-pointer shadow-xs"
              title="Generate Balanced Palette"
            >
              <Shuffle className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden sm:inline">Randomize</span>
            </button>
          )}

          <button
            type="button"
            onClick={onCopyCss}
            className="flex items-center gap-1.5 rounded-lg bg-zinc-100 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 transition-all hover:bg-white cursor-pointer shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.4)]"
          >
            <Copy className="h-3.5 w-3.5 text-zinc-950" />
            <span>{copied ? '✓ Copied' : 'Copy CSS'}</span>
          </button>

          {activeMode === 'gradient' && (
            <button
              type="button"
              onClick={onDownloadPng}
              className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-zinc-900/90 px-3 py-1.5 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white cursor-pointer shadow-xs"
              title="Download 4K Ultra HD PNG"
            >
              <Download className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden md:inline">4K Wallpaper</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
