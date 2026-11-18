import React from 'react';
import type { ButtonState } from '../types';

interface ButtonControlsProps {
  state: ButtonState;
  onChange: (next: ButtonState) => void;
}

export function ButtonControls({ state, onChange }: ButtonControlsProps) {
  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-5 sm:p-6 shadow-lg dark:shadow-xl transition-colors duration-200">
      <div className="border-b border-zinc-200 dark:border-white/[0.08] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
          CSS Button Architecture
        </h3>
        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
          Interactive call-to-action buttons with hardware-accelerated hover physics.
        </p>
      </div>

      <div className="space-y-4 text-xs">
        {/* Button Label */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 space-y-1.5 shadow-xs">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Button Label
          </label>
          <input
            type="text"
            value={state.text}
            onChange={(e) => onChange({ ...state, text: e.target.value })}
            className="w-full rounded-xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-950 px-3 py-1.5 text-xs text-zinc-900 dark:text-white"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 shadow-xs">
          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              Start Color
            </span>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="color"
                value={state.colorStart}
                onChange={(e) => onChange({ ...state, colorStart: e.target.value })}
                className="h-7 w-7 rounded-full cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="font-mono text-zinc-800 dark:text-zinc-300 text-xs font-semibold">{state.colorStart}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
              End Color
            </span>
            <div className="mt-1.5 flex items-center gap-2">
              <input
                type="color"
                value={state.colorEnd}
                onChange={(e) => onChange({ ...state, colorEnd: e.target.value })}
                className="h-7 w-7 rounded-full cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="font-mono text-zinc-800 dark:text-zinc-300 text-xs font-semibold">{state.colorEnd}</span>
            </div>
          </div>
        </div>

        {/* Hover Animation Effect */}
        <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 space-y-1.5 shadow-xs">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Hover Physics &amp; Light Dynamics
          </label>
          <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
            {(['scale', 'lift', 'shine', 'glow'] as const).map((effect) => (
              <button
                key={effect}
                type="button"
                onClick={() => onChange({ ...state, hoverEffect: effect })}
                className={`rounded-full border px-2 py-1.5 text-center font-mono text-[11px] capitalize transition-all cursor-pointer ${
                  state.hoverEffect === effect
                    ? 'border-zinc-800 dark:border-white/20 bg-zinc-900 dark:bg-zinc-800 text-white font-semibold shadow-xs'
                    : 'border-zinc-200 dark:border-white/[0.06] bg-white dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {effect}
              </button>
            ))}
          </div>
        </div>

        {/* Geometry Sliders */}
        <div className="grid grid-cols-2 gap-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5 shadow-xs">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
              <span>Border Radius</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{state.borderRadius}px</span>
            </div>
            <input
              type="range"
              min={0}
              max={32}
              value={state.borderRadius}
              onChange={(e) => onChange({ ...state, borderRadius: Number(e.target.value) })}
              className="w-full cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-zinc-600 dark:text-zinc-400">
              <span>Font Size</span>
              <span className="text-zinc-900 dark:text-zinc-200 font-semibold">{state.fontSize}px</span>
            </div>
            <input
              type="range"
              min={11}
              max={20}
              value={state.fontSize}
              onChange={(e) => onChange({ ...state, fontSize: Number(e.target.value) })}
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
