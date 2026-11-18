import React from 'react';
import type { ButtonState } from '../types';

interface ButtonControlsProps {
  state: ButtonState;
  onChange: (next: ButtonState) => void;
}

export function ButtonControls({ state, onChange }: ButtonControlsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white">CSS Button Generator</h3>
        <p className="text-xs text-slate-400">
          Design high-converting gradient CTA buttons with hover animations.
        </p>
      </div>

      <div className="space-y-4 text-xs">
        {/* Button Label */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-1.5">
          <label className="font-bold text-slate-300">Button Label</label>
          <input
            type="text"
            value={state.text}
            onChange={(e) => onChange({ ...state, text: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5">
          <div>
            <span className="font-bold text-slate-300">Start Color</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={state.colorStart}
                onChange={(e) => onChange({ ...state, colorStart: e.target.value })}
                className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="font-mono text-slate-400">{state.colorStart}</span>
            </div>
          </div>

          <div>
            <span className="font-bold text-slate-300">End Color</span>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="color"
                value={state.colorEnd}
                onChange={(e) => onChange({ ...state, colorEnd: e.target.value })}
                className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="font-mono text-slate-400">{state.colorEnd}</span>
            </div>
          </div>
        </div>

        {/* Hover Animation Effect */}
        <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5">
          <label className="font-bold text-slate-300 uppercase tracking-wider">
            Hover Animation
          </label>
          <div className="grid grid-cols-4 gap-2">
            {(['scale', 'glow', 'shine', 'lift'] as const).map((eff) => (
              <button
                key={eff}
                type="button"
                onClick={() => onChange({ ...state, hoverEffect: eff })}
                className={`rounded-lg border px-2 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                  state.hoverEffect === eff
                    ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                    : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {eff}
              </button>
            ))}
          </div>
        </div>

        {/* Border Radius */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
          <div className="flex justify-between">
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
      </div>
    </div>
  );
}
