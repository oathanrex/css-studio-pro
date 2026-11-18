import React from 'react';
import type { NeumorphismState } from '../types';

interface NeumorphismControlsProps {
  state: NeumorphismState;
  onChange: (next: NeumorphismState) => void;
}

export function NeumorphismControls({ state, onChange }: NeumorphismControlsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white">Neumorphism (Soft UI) Studio</h3>
        <p className="text-xs text-slate-400">
          Tactile embossed &amp; debossed soft UI shadow mechanics.
        </p>
      </div>

      <div className="space-y-4">
        {/* Shape */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Surface Shape
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['flat', 'concave', 'convex', 'pressed'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onChange({ ...state, shape: s })}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold capitalize transition-all cursor-pointer ${
                  state.shape === s
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Base Color */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 text-xs">
          <span className="font-bold text-slate-300">Base Surface Color</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400">{state.baseColor}</span>
            <input
              type="color"
              value={state.baseColor}
              onChange={(e) => onChange({ ...state, baseColor: e.target.value })}
              className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
            />
          </div>
        </div>

        {/* Distance */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-300">Light Distance: {state.distance}px</span>
          </div>
          <input
            type="range"
            min={5}
            max={50}
            value={state.distance}
            onChange={(e) => onChange({ ...state, distance: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Blur */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="font-bold text-slate-300">Shadow Softness Blur: {state.blur}px</span>
          </div>
          <input
            type="range"
            min={5}
            max={60}
            value={state.blur}
            onChange={(e) => onChange({ ...state, blur: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
