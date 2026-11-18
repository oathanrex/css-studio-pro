import { Plus, Trash2 } from 'lucide-react';
import React from 'react';
import type { ShadowLayer } from '../types';

interface ShadowControlsProps {
  shadows: ShadowLayer[];
  onChange: (next: ShadowLayer[]) => void;
}

export function ShadowControls({ shadows, onChange }: ShadowControlsProps) {
  const handleAddLayer = () => {
    if (shadows.length >= 5) return;
    const newLayer: ShadowLayer = {
      id: String(Date.now()),
      x: 0,
      y: 12,
      blur: 24,
      spread: -4,
      color: 'rgba(0, 0, 0, 0.4)',
      inset: false,
    };
    onChange([...shadows, newLayer]);
  };

  const handleUpdate = (id: string, partial: Partial<ShadowLayer>) => {
    onChange(shadows.map((s) => (s.id === id ? { ...s, ...partial } : s)));
  };

  const handleDelete = (id: string) => {
    if (shadows.length <= 1) return;
    onChange(shadows.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-100">
            Box Shadow Physics
          </h3>
          <p className="text-[11px] text-zinc-400">
            Composite multi-layer realistic depth and atmospheric ambient glow.
          </p>
        </div>
        {shadows.length < 5 && (
          <button
            type="button"
            onClick={handleAddLayer}
            className="flex items-center gap-1 rounded-md border border-white/10 bg-zinc-900 px-2 py-1 text-[11px] font-medium text-zinc-200 transition-all hover:bg-zinc-800 cursor-pointer shadow-xs"
          >
            <Plus className="h-3 w-3" />
            <span>Add Layer</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {shadows.map((layer, idx) => (
          <div
            key={layer.id}
            className="space-y-3 rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5 transition-all hover:border-white/10"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                Layer #{idx + 1}
              </span>

              <div className="flex items-center gap-2">
                <label className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={layer.inset}
                    onChange={(e) => handleUpdate(layer.id, { inset: e.target.checked })}
                    className="rounded border-zinc-700 bg-zinc-900 accent-zinc-200 cursor-pointer"
                  />
                  <span>Inset</span>
                </label>

                {shadows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDelete(layer.id)}
                    className="text-zinc-600 hover:text-rose-400 transition-colors cursor-pointer"
                    title="Remove Layer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-2 gap-3 text-[10px] font-mono text-zinc-400">
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Offset Y</span>
                  <span className="text-zinc-200">{layer.y}px</span>
                </div>
                <input
                  type="range"
                  min={-40}
                  max={60}
                  value={layer.y}
                  onChange={(e) => handleUpdate(layer.id, { y: Number(e.target.value) })}
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Blur Radius</span>
                  <span className="text-zinc-200">{layer.blur}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={80}
                  value={layer.blur}
                  onChange={(e) => handleUpdate(layer.id, { blur: Number(e.target.value) })}
                  className="w-full cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
