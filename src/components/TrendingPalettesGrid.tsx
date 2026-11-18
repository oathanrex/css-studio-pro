import {
  Bookmark,
  BookmarkCheck,
  Check,
  CircleDot,
  Code2,
  Copy,
  Download,
  Flame,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Upload,
  Zap,
} from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { TRENDING_PALETTES } from '../engine/trendingPalettes';
import type { ColorStop, GradientState, PalettePreset } from '../types';

interface TrendingPalettesGridProps {
  onSelectPalette: (preset: PalettePreset) => void;
  onInspectContrast?: (hexColors: string[]) => void;
  currentGradient?: GradientState;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Presets' },
  { id: 'titanium', label: 'SaaS & Titanium' },
  { id: 'metals', label: 'Luxury Metals' },
  { id: 'aurora', label: 'Nordic Aurora' },
  { id: 'twilight', label: 'Tokyo Twilight' },
  { id: 'space', label: 'Deep Space' },
  { id: 'minimal', label: 'Editorial Minimal' },
];

const LOCAL_STORAGE_KEY = 'css-studio-saved-palettes';

export function TrendingPalettesGrid({
  onSelectPalette,
  onInspectContrast,
  currentGradient,
}: TrendingPalettesGridProps) {
  const [activeTab, setActiveTab] = useState<'presets' | 'saved'>('presets');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // User Saved Palettes from LocalStorage
  const [savedPalettes, setSavedPalettes] = useState<PalettePreset[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved palettes', err);
      }
    }
    return [];
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(savedPalettes));
    } catch (err) {
      console.error('Failed to save palettes to storage', err);
    }
  }, [savedPalettes]);

  // Save active studio gradient into user library
  const handleSaveCurrentGradient = () => {
    if (!currentGradient || currentGradient.stops.length === 0) return;
    const name = `Custom Palette #${savedPalettes.length + 1}`;
    const newPreset: PalettePreset = {
      name,
      category: 'titanium',
      angle: currentGradient.angle,
      gradient: `linear-gradient(${currentGradient.angle}deg, ${currentGradient.stops
        .map((s) => `${s.color} ${s.position}%`)
        .join(', ')})`,
      stops: currentGradient.stops,
    };

    setSavedPalettes((prev) => [newPreset, ...prev]);
    setActiveTab('saved');
  };

  // Delete saved palette
  const handleDeleteSaved = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    setSavedPalettes((prev) => prev.filter((_, i) => i !== index));
  };

  // Filtered curated palettes
  const filteredCurated = useMemo(() => {
    return TRENDING_PALETTES.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stops.some((s) => s.color.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Filtered user-saved palettes
  const filteredSaved = useMemo(() => {
    return savedPalettes.filter((p) => {
      return (
        searchQuery.trim() === '' ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.stops.some((s) => s.color.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    });
  }, [savedPalettes, searchQuery]);

  // Copy helper by format
  const handleCopyCode = (
    e: React.MouseEvent,
    p: PalettePreset,
    format: 'css' | 'tailwind' | 'tokens' | 'json'
  ) => {
    e.stopPropagation();
    let textToCopy = '';

    if (format === 'css') {
      textToCopy = `background: ${p.gradient};`;
    } else if (format === 'tailwind') {
      if (p.stops.length === 2) {
        textToCopy = `bg-gradient-to-r from-[${p.stops[0].color}] to-[${p.stops[1].color}]`;
      } else if (p.stops.length === 3) {
        textToCopy = `bg-gradient-to-r from-[${p.stops[0].color}] via-[${p.stops[1].color}] to-[${p.stops[2].color}]`;
      } else {
        textToCopy = `bg-[linear-gradient(${p.angle}deg,${p.stops
          .map((s) => `${s.color}_${s.position}%`)
          .join(',')})]`;
      }
    } else if (format === 'tokens') {
      const cleanSlug = p.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      textToCopy = `:root {\n${p.stops
        .map((s, i) => `  --color-${cleanSlug}-${i + 1}: ${s.color};`)
        .join('\n')}\n}`;
    } else if (format === 'json') {
      textToCopy = JSON.stringify(
        {
          name: p.name,
          angle: p.angle,
          stops: p.stops.map((s) => ({ color: s.color, position: s.position })),
        },
        null,
        2
      );
    }

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopiedId(`${p.name}-${format}`);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  // Copy single color chip hex
  const handleCopySingleHex = (e: React.MouseEvent, hex: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedId(hex);
      setTimeout(() => setCopiedId(null), 1500);
    });
  };

  return (
    <div className="space-y-6 rounded-3xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-6 sm:p-8 shadow-xl dark:shadow-2xl transition-colors duration-200">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-200 dark:border-white/[0.08] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Design Token &amp; Palette Vault
            </h2>
            <span className="rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 px-2 py-0.5 text-[9px] font-mono text-zinc-700 dark:text-zinc-300">
              DEVELOPER SUITE
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Architectural color collections, developer design tokens, and local library persistence.
          </p>
        </div>

        {/* Studio Quick Actions: Save Active Gradient */}
        <div className="flex flex-wrap items-center gap-2">
          {currentGradient && (
            <button
              type="button"
              onClick={handleSaveCurrentGradient}
              className="flex items-center gap-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 hover:bg-black dark:hover:bg-white text-white dark:text-zinc-950 px-4 py-2 text-xs font-semibold transition-all cursor-pointer shadow-xs hover:scale-105"
              title="Bookmark active studio gradient to your personal library"
            >
              <Bookmark className="h-3.5 w-3.5" />
              <span>Save Active to Library</span>
            </button>
          )}

          {/* Tab Pill Switcher (Curated vs My Saved) */}
          <div className="flex items-center gap-1 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-zinc-100 dark:bg-zinc-900/60 p-1 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveTab('presets')}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'presets'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              Curated Presets ({TRENDING_PALETTES.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`rounded-full px-3.5 py-1 text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs font-semibold'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <span>My Saved Library</span>
              <span className="rounded-full bg-zinc-200 dark:bg-zinc-700 px-1.5 py-0.2 text-[10px] font-mono">
                {savedPalettes.length}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter & Live Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or hex code (e.g. titanium, #090a0f)..."
            className="w-full rounded-full border border-zinc-300 dark:border-white/10 bg-slate-50 dark:bg-zinc-900/60 pl-9 pr-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-400/20"
          />
        </div>

        {/* Category Pills (Only for Presets Tab) */}
        {activeTab === 'presets' && (
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-3 py-1 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-zinc-900 dark:bg-zinc-800 text-white font-semibold border border-zinc-800 dark:border-white/10 shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200 border border-transparent'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of Palette Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* If Active Tab is Presets */}
        {activeTab === 'presets' &&
          filteredCurated.map((p) => {
            return (
              <div
                key={p.name}
                onClick={() => onSelectPalette(p)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-zinc-900/40 p-4 transition-all hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-xl shadow-xs space-y-3.5"
              >
                {/* Gradient Banner Preview */}
                <div
                  className="h-28 w-full rounded-2xl shadow-inner transition-transform duration-300 group-hover:scale-[1.01] relative overflow-hidden"
                  style={{ background: p.gradient }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-zinc-900 dark:text-white shadow-md">
                      Load in Studio Editor →
                    </span>
                  </div>
                </div>

                {/* Individual Color Stop Chips Ladder */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {p.stops.map((stop) => (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={(e) => handleCopySingleHex(e, stop.color)}
                      className="flex-1 h-6 rounded-lg border border-black/10 dark:border-white/10 shadow-xs hover:scale-110 transition-transform cursor-pointer relative group/chip"
                      style={{ backgroundColor: stop.color }}
                      title={`Click to copy: ${stop.color}`}
                    >
                      <span className="opacity-0 group-hover/chip:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                        {copiedId === stop.color ? 'Copied!' : stop.color}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Title & Category Telemetry */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {p.category} · {p.stops.length} Stops · {p.angle}°
                    </span>
                  </div>

                  {/* Quick Contrast Checker Bridge Shortcut */}
                  {onInspectContrast && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onInspectContrast(p.stops.map((s) => s.color));
                      }}
                      className="rounded-full p-1.5 text-zinc-500 hover:text-black dark:hover:text-white hover:bg-zinc-200/60 dark:hover:bg-zinc-800 transition-colors"
                      title="Inspect Contrast in Accessibility Studio"
                    >
                      <ShieldCheck className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Developer Token Export Bar */}
                <div className="flex items-center justify-between gap-1 pt-2 border-t border-zinc-200 dark:border-white/[0.06]">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-semibold">
                    Copy Token:
                  </span>
                  <div className="flex items-center gap-1">
                    {(['css', 'tailwind', 'tokens', 'json'] as const).map((fmt) => {
                      const isCopied = copiedId === `${p.name}-${fmt}`;
                      return (
                        <button
                          key={fmt}
                          type="button"
                          onClick={(e) => handleCopyCode(e, p, fmt)}
                          className={`rounded-full px-2 py-0.5 text-[9px] font-mono uppercase font-semibold transition-all cursor-pointer border ${
                            isCopied
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                          }`}
                          title={`Copy as ${fmt.toUpperCase()}`}
                        >
                          {isCopied ? '✓' : fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}

        {/* If Active Tab is Saved Library */}
        {activeTab === 'saved' &&
          (filteredSaved.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-dashed border-zinc-300 dark:border-white/15 p-12 text-center space-y-3">
              <Bookmark className="mx-auto h-8 w-8 text-zinc-400" />
              <h4 className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                No Saved Palettes Yet
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
                Click <span className="font-semibold text-zinc-800 dark:text-zinc-200">&quot;Save Active to Library&quot;</span> above or in the studio editor to save and persist your custom palettes here in browser storage!
              </p>
            </div>
          ) : (
            filteredSaved.map((p, idx) => (
              <div
                key={`${p.name}-${idx}`}
                onClick={() => onSelectPalette(p)}
                className="group relative cursor-pointer overflow-hidden rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-zinc-900/40 p-4 transition-all hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-xl shadow-xs space-y-3.5"
              >
                {/* Gradient Banner Preview */}
                <div
                  className="h-28 w-full rounded-2xl shadow-inner transition-transform duration-300 group-hover:scale-[1.01] relative overflow-hidden"
                  style={{ background: p.gradient }}
                >
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1 text-xs font-semibold text-zinc-900 dark:text-white shadow-md">
                      Load in Studio Editor →
                    </span>
                  </div>
                </div>

                {/* Individual Color Stop Chips Ladder */}
                <div className="flex items-center gap-1.5 pt-0.5">
                  {p.stops.map((stop) => (
                    <button
                      key={stop.id}
                      type="button"
                      onClick={(e) => handleCopySingleHex(e, stop.color)}
                      className="flex-1 h-6 rounded-lg border border-black/10 dark:border-white/10 shadow-xs hover:scale-110 transition-transform cursor-pointer relative group/chip"
                      style={{ backgroundColor: stop.color }}
                      title={`Click to copy: ${stop.color}`}
                    >
                      <span className="opacity-0 group-hover/chip:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-900 text-white font-mono text-[9px] px-1.5 py-0.5 rounded shadow pointer-events-none whitespace-nowrap z-10">
                        {copiedId === stop.color ? 'Copied!' : stop.color}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Title & Delete Action */}
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-black dark:group-hover:text-white transition-colors">
                      {p.name}
                    </h4>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      Saved Custom · {p.stops.length} Stops · {p.angle}°
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleDeleteSaved(e, idx)}
                    className="rounded-full p-1.5 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    title="Delete Saved Palette"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                {/* Developer Token Export Bar */}
                <div className="flex items-center justify-between gap-1 pt-2 border-t border-zinc-200 dark:border-white/[0.06]">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-semibold">
                    Copy Token:
                  </span>
                  <div className="flex items-center gap-1">
                    {(['css', 'tailwind', 'tokens', 'json'] as const).map((fmt) => {
                      const isCopied = copiedId === `${p.name}-${fmt}`;
                      return (
                        <button
                          key={fmt}
                          type="button"
                          onClick={(e) => handleCopyCode(e, p, fmt)}
                          className={`rounded-full px-2 py-0.5 text-[9px] font-mono uppercase font-semibold transition-all cursor-pointer border ${
                            isCopied
                              ? 'bg-emerald-500 text-white border-emerald-500'
                              : 'border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700'
                          }`}
                          title={`Copy as ${fmt.toUpperCase()}`}
                        >
                          {isCopied ? '✓' : fmt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
}
