import {
  Box,
  ChevronDown,
  CircleDot,
  Copy,
  Download,
  ExternalLink,
  Flame,
  Globe,
  Image as ImageIcon,
  Layers,
  Palette,
  ShieldCheck,
  Shuffle,
  Sparkles,
  Type,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';
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

const ECOSYSTEM_TOOLS = [
  {
    name: 'Pro Color Extractor',
    desc: 'Dominant palette extraction engine with HEX/RGB/HSL telemetry',
    url: 'https://oathanrex.github.io/pro-color-extractor/',
  },
  {
    name: 'OKLCH Design Tokens',
    desc: 'Consistent OKLCH color palettes & production CSS token generator',
    url: 'https://oathanrex.github.io/oklch-tool/',
  },
  {
    name: 'ChromaLab Pro',
    desc: 'Universal color space converter: HEX, RGB, HSL, CMYK, LAB',
    url: 'https://oathanrex.github.io/chromalab-pro/',
  },
  {
    name: 'ColorKit Pro',
    desc: 'Instant web-based color format converter & preview studio',
    url: 'https://oathanrex.github.io/colorkit-pro/',
  },
  {
    name: 'Named Colors Explorer',
    desc: 'Interactive visual directory of 140+ CSS named colors',
    url: 'https://oathanrex.github.io/css-named-colors-explorer/',
  },
];

export function Navbar({
  activeMode,
  onSelectMode,
  onRandomize,
  onCopyCss,
  onDownloadPng,
  copied,
}: NavbarProps) {
  const [showEcosystem, setShowEcosystem] = useState(false);

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

        {/* Studio Actions & Silo Ecosystem */}
        <div className="flex items-center gap-2">
          {/* Ecosystem Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEcosystem(!showEcosystem)}
              className="flex items-center gap-1 rounded-lg border border-white/[0.08] bg-zinc-900/90 px-2.5 py-1.5 text-xs font-mono font-medium text-zinc-300 hover:bg-zinc-800 hover:text-white transition-all cursor-pointer shadow-xs"
              title="Explore Oathan Rex Color Suite Ecosystem"
            >
              <Globe className="h-3 w-3 text-zinc-400" />
              <span className="hidden sm:inline">Suite</span>
              <ChevronDown className="h-3 w-3 text-zinc-500" />
            </button>

            {showEcosystem && (
              <div
                className="absolute right-0 mt-2 w-72 rounded-xl border border-white/10 bg-zinc-950 p-2 shadow-2xl z-50 space-y-1"
                onMouseLeave={() => setShowEcosystem(false)}
              >
                <div className="px-3 py-1.5 border-b border-white/[0.06]">
                  <span className="text-[10px] font-mono uppercase font-bold text-zinc-400 tracking-wider">
                    Oathan Rex Design Cloud
                  </span>
                </div>
                {ECOSYSTEM_TOOLS.map((et) => (
                  <a
                    key={et.name}
                    href={et.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col gap-0.5 rounded-lg p-2 hover:bg-zinc-900 transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-zinc-200 group-hover:text-white">
                        {et.name}
                      </span>
                      <ExternalLink className="h-3 w-3 text-zinc-600 group-hover:text-zinc-400" />
                    </div>
                    <span className="text-[10px] text-zinc-500 leading-tight">
                      {et.desc}
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>

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
