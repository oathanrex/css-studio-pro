import { Check, Copy, Flame } from 'lucide-react';
import React, { useState } from 'react';
import { TRENDING_PALETTES } from '../engine/trendingPalettes';
import type { PalettePreset } from '../types';

interface TrendingPalettesGridProps {
  onSelectPalette: (preset: PalettePreset) => void;
}

const CATEGORIES: { id: string; label: string }[] = [
  { id: 'all', label: 'All Presets' },
  { id: 'titanium', label: 'Titanium & Slate' },
  { id: 'metals', label: 'Luxury Metals' },
  { id: 'aurora', label: 'Nordic Aurora' },
  { id: 'twilight', label: 'Tokyo Twilight' },
  { id: 'space', label: 'Deep Space' },
  { id: 'minimal', label: 'Editorial Minimal' },
];

export function TrendingPalettesGrid({ onSelectPalette }: TrendingPalettesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPalettes =
    selectedCategory === 'all'
      ? TRENDING_PALETTES
      : TRENDING_PALETTES.filter((p) => p.category === selectedCategory);

  const handleCopy = (e: React.MouseEvent, p: PalettePreset) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`background: ${p.gradient};`).then(() => {
      setCopiedId(p.name);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-5 shadow-xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
        <div>
          <h3 className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-100">
            <Flame className="h-3.5 w-3.5 text-zinc-400" />
            <span>Curated Architectural Palettes</span>
          </h3>
          <p className="text-[11px] text-zinc-400">
            Engineered color harmonies with balanced optical contrast.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-lg px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-zinc-800 text-white font-semibold border border-white/10'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {filteredPalettes.map((p) => (
          <div
            key={p.name}
            onClick={() => onSelectPalette(p)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/[0.06] bg-zinc-900/40 p-2.5 transition-all hover:border-white/20 hover:bg-zinc-900/80 hover:shadow-xl"
          >
            {/* Color Swatch Preview */}
            <div
              className="h-24 w-full rounded-lg shadow-inner transition-transform duration-300 group-hover:scale-[1.01]"
              style={{ background: p.gradient }}
            />

            <div className="mt-2.5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-white transition-colors">
                  {p.name}
                </h4>
                <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">
                  {p.category}
                </span>
              </div>

              <button
                type="button"
                onClick={(e) => handleCopy(e, p)}
                className="flex items-center gap-1 rounded bg-zinc-800 px-2 py-1 text-[10px] font-mono font-medium text-zinc-300 transition-all hover:bg-zinc-700 hover:text-white cursor-pointer shadow-xs border border-white/[0.06]"
                title="Copy CSS"
              >
                {copiedId === p.name ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3 text-zinc-400" />
                )}
                <span>{copiedId === p.name ? 'Copied' : 'CSS'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
