import React from 'react';
import type { GlassmorphismState } from '../types';

interface GlassmorphismControlsProps {
  state: GlassmorphismState;
  onChange: (next: GlassmorphismState) => void;
}

export function GlassmorphismControls({ state, onChange }: GlassmorphismControlsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white">Glassmorphism Studio</h3>
        <p className="text-xs text-slate-400">
          Frosted glass UI with real-time backdrop blur and refractive borders.
        </p>
      </div>

      <div className="space-y-4">
        {/* Blur */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-300">Backdrop Blur: {state.blur}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            value={state.blur}
            onChange={(e) => onChange({ ...state, blur: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Opacity */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-300">Background Opacity: {state.opacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={state.opacity}
            onChange={(e) => onChange({ ...state, opacity: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Border Radius */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-300">Border Radius: {state.borderRadius}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            value={state.borderRadius}
            onChange={(e) => onChange({ ...state, borderRadius: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Shadow Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 text-xs">
          <span className="font-bold text-slate-300">Reflective Drop Shadow</span>
          <input
            type="checkbox"
            checked={state.hasShadow}
            onChange={(e) => onChange({ ...state, hasShadow: e.target.checked })}
            className="rounded border-slate-700 text-indigo-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
