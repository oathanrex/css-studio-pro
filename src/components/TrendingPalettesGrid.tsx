import { Check, Copy, Flame } from 'lucide-react';
import React, { useState } from 'react';
import { TRENDING_PALETTES } from '../engine/trendingPalettes';
import type { PalettePreset } from '../types';

interface TrendingPalettesGridProps {
  onSelectPalette: (preset: PalettePreset) => void;
}

export function TrendingPalettesGrid({ onSelectPalette }: TrendingPalettesGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, p: PalettePreset) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`background: ${p.gradient};`).then(() => {
      setCopiedId(p.name);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="flex items-center gap-1.5 text-sm font-bold text-white">
            <Flame className="h-4 w-4 text-rose-500" />
            <span>Curated Trending CSS Gradients</span>
          </h3>
          <p className="text-xs text-slate-400">
            Hand-crafted high-converting color transitions ready for your website.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {TRENDING_PALETTES.map((p) => (
          <div
            key={p.name}
            onClick={() => onSelectPalette(p)}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-slate-800 bg-slate-950 p-2.5 transition-all hover:border-slate-600 hover:shadow-lg"
          >
            {/* Color Swatch Preview */}
            <div
              className="h-24 w-full rounded-lg shadow-inner transition-transform group-hover:scale-[1.02]"
              style={{ background: p.gradient }}
            />

            <div className="mt-2.5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {p.name}
                </h4>
                <span className="text-[10px] font-mono text-slate-500 uppercase">{p.category}</span>
              </div>

              <button
                type="button"
                onClick={(e) => handleCopy(e, p)}
                className="flex items-center gap-1 rounded bg-slate-800 px-2 py-1 text-[10px] font-semibold text-slate-300 transition-all hover:bg-slate-700 cursor-pointer shadow-xs"
                title="Copy CSS"
              >
                {copiedId === p.name ? (
                  <Check className="h-3 w-3 text-emerald-400" />
                ) : (
                  <Copy className="h-3 w-3" />
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
