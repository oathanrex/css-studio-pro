import { Plus, Trash2 } from 'lucide-react';
import React from 'react';
import type { ShadowLayer } from '../types';

interface ShadowControlsProps {
  shadows: ShadowLayer[];
  onChange: (next: ShadowLayer[]) => void;
}

export function ShadowControls({ shadows, onChange }: ShadowControlsProps) {
  const handleAddShadow = () => {
    if (shadows.length >= 5) return;
    const newShadow: ShadowLayer = {
      id: String(Date.now()),
      x: 0,
      y: 10,
      blur: 25,
      spread: -5,
      color: 'rgba(0, 0, 0, 0.3)',
      inset: false,
    };
    onChange([...shadows, newShadow]);
  };

  const handleDelete = (id: string) => {
    if (shadows.length <= 1) return;
    onChange(shadows.filter((s) => s.id !== id));
  };

  const handleUpdate = (id: string, updates: Partial<ShadowLayer>) => {
    onChange(shadows.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white">Box Shadow &amp; Glow Studio</h3>
          <p className="text-xs text-slate-400">
            Stack multiple realistic shadow layers for realistic 3D elevation.
          </p>
        </div>
        {shadows.length < 5 && (
          <button
            type="button"
            onClick={handleAddShadow}
            className="flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 cursor-pointer shadow-xs"
          >
            <Plus className="h-3 w-3 text-emerald-400" />
            <span>Add Layer</span>
          </button>
        )}
      </div>

      <div className="space-y-3">
        {shadows.map((sh, idx) => (
          <div
            key={sh.id}
            className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 text-xs"
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-300">Layer #{idx + 1}</span>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1 text-slate-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sh.inset}
                    onChange={(e) => handleUpdate(sh.id, { inset: e.target.checked })}
                    className="rounded border-slate-700 text-indigo-500"
                  />
                  <span>Inset</span>
                </label>
                {shadows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDelete(sh.id)}
                    className="text-slate-500 hover:text-rose-400 cursor-pointer"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400">X Offset: {sh.x}px</span>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={sh.x}
                  onChange={(e) => handleUpdate(sh.id, { x: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-slate-400">Y Offset: {sh.y}px</span>
                <input
                  type="range"
                  min={-50}
                  max={50}
                  value={sh.y}
                  onChange={(e) => handleUpdate(sh.id, { y: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <span className="text-slate-400">Blur: {sh.blur}px</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={sh.blur}
                  onChange={(e) => handleUpdate(sh.id, { blur: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>

              <div>
                <span className="text-slate-400">Spread: {sh.spread}px</span>
                <input
                  type="range"
                  min={-30}
                  max={50}
                  value={sh.spread}
                  onChange={(e) => handleUpdate(sh.id, { spread: Number(e.target.value) })}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
