import React from 'react';
import type { NeumorphismState } from '../types';

interface NeumorphismControlsProps {
  state: NeumorphismState;
  onChange: (next: NeumorphismState) => void;
}

export function NeumorphismControls({ state, onChange }: NeumorphismControlsProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-5 sm:p-6 shadow-lg dark:shadow-xl transition-colors duration-200">
      <div className="border-b border-zinc-200 dark:border-white/[0.08] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          Neumorphism Tactile Studio
        </h3>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Soft UI extruded and debossed tactile surfaces.
        </p>
      </div>

      <div className="space-y-3.5 text-xs">
        {/* Surface Shape */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 space-y-1.5 shadow-xs">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Surface Curvature
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {(['flat', 'concave', 'convex', 'pressed'] as const).map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => onChange({ ...state, shape })}
                className={`rounded-full border px-2 py-1.5 text-center font-mono text-[11px] capitalize transition-all cursor-pointer ${
                  state.shape === shape
                    ? 'border-zinc-800 dark:border-white/20 bg-zinc-900 dark:bg-zinc-800 text-white font-semibold shadow-xs'
                    : 'border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>

        {/* Distance Slider */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 space-y-1.5 shadow-xs">
          <div className="flex justify-between text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
            <span>Light Distance</span>
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{state.distance}px</span>
          </div>
          <input
            type="range"
            min={5}
            max={40}
            value={state.distance}
            onChange={(e) => onChange({ ...state, distance: Number(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Blur Slider */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 space-y-1.5 shadow-xs">
          <div className="flex justify-between text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
            <span>Shadow Softness</span>
            <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{state.blur}px</span>
          </div>
          <input
            type="range"
            min={10}
            max={60}
            value={state.blur}
            onChange={(e) => onChange({ ...state, blur: Number(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Base Color */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 space-y-1.5 shadow-xs">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Base Canvas Surface Color
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={state.baseColor}
              onChange={(e) => onChange({ ...state, baseColor: e.target.value })}
              className="h-7 w-7 rounded-full cursor-pointer border-0 bg-transparent p-0"
            />
            <span className="font-mono text-zinc-800 dark:text-zinc-300 text-xs font-semibold">{state.baseColor}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
