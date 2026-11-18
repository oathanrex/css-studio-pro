import React from 'react';
import type { GlassmorphismState } from '../types';

interface GlassmorphismControlsProps {
  state: GlassmorphismState;
  onChange: (next: GlassmorphismState) => void;
}

export function GlassmorphismControls({ state, onChange }: GlassmorphismControlsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-5 shadow-xl">
      <div className="border-b border-white/[0.08] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-100">
          Glassmorphism Optics
        </h3>
        <p className="text-[11px] text-zinc-400">
          Backdrop-filter blur, sub-pixel refraction &amp; depth.
        </p>
      </div>

      <div className="space-y-3.5 text-xs">
        {/* Blur Intensity Slider */}
        <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5 space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>Backdrop Filter Blur</span>
            <span className="text-zinc-200">{state.blur}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            value={state.blur}
            onChange={(e) => onChange({ ...state, blur: Number(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Opacity Slider */}
        <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5 space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>Background Surface Opacity</span>
            <span className="text-zinc-200">{state.opacity}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={state.opacity}
            onChange={(e) => onChange({ ...state, opacity: Number(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Border Radius Slider */}
        <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5 space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>Border Radius</span>
            <span className="text-zinc-200">{state.borderRadius}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            value={state.borderRadius}
            onChange={(e) => onChange({ ...state, borderRadius: Number(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>

        {/* Refractive Border Width */}
        <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5 space-y-1.5">
          <div className="flex justify-between text-[10px] font-mono text-zinc-400">
            <span>Border Width</span>
            <span className="text-zinc-200">{state.borderWidth}px</span>
          </div>
          <input
            type="range"
            min={0}
            max={5}
            value={state.borderWidth}
            onChange={(e) => onChange({ ...state, borderWidth: Number(e.target.value) })}
            className="w-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
