import React from 'react';
import type { TextGradientState } from '../types';

interface TextGradientControlsProps {
  state: TextGradientState;
  onChange: (next: TextGradientState) => void;
}

export function TextGradientControls({ state, onChange }: TextGradientControlsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-5 shadow-xl">
      <div className="border-b border-white/[0.08] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-100">
          Typography Gradient Studio
        </h3>
        <p className="text-[11px] text-zinc-400">
          Background-clip text typography gradients with optical depth.
        </p>
      </div>

      <div className="space-y-3.5 text-xs">
        {/* Sample Headline Text */}
        <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5 space-y-1.5">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
            Headline Text
          </label>
          <input
            type="text"
            value={state.text}
            onChange={(e) => onChange({ ...state, text: e.target.value })}
            className="w-full rounded-lg border border-white/10 bg-zinc-950 px-3 py-1.5 text-xs text-white font-medium"
          />
        </div>

        {/* 3-Stop Color Palette */}
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5">
          <div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase">Start</span>
            <div className="mt-1 flex items-center gap-1.5">
              <input
                type="color"
                value={state.colorStart}
                onChange={(e) => onChange({ ...state, colorStart: e.target.value })}
                className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="font-mono text-[10px] text-zinc-300">{state.colorStart}</span>
            </div>
          </div>

          <div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase">Mid</span>
            <div className="mt-1 flex items-center gap-1.5">
              <input
                type="color"
                value={state.colorMiddle}
                onChange={(e) => onChange({ ...state, colorMiddle: e.target.value })}
                className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="font-mono text-[10px] text-zinc-300">{state.colorMiddle}</span>
            </div>
          </div>

          <div>
            <span className="text-[9px] font-mono text-zinc-400 uppercase">End</span>
            <div className="mt-1 flex items-center gap-1.5">
              <input
                type="color"
                value={state.colorEnd}
                onChange={(e) => onChange({ ...state, colorEnd: e.target.value })}
                className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent p-0"
              />
              <span className="font-mono text-[10px] text-zinc-300">{state.colorEnd}</span>
            </div>
          </div>
        </div>

        {/* Font Size & Weight */}
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5">
          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>Font Size</span>
              <span className="text-zinc-200">{state.fontSize}px</span>
            </div>
            <input
              type="range"
              min={24}
              max={72}
              value={state.fontSize}
              onChange={(e) => onChange({ ...state, fontSize: Number(e.target.value) })}
              className="w-full cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
              <span>Angle</span>
              <span className="text-zinc-200">{state.angle}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={state.angle}
              onChange={(e) => onChange({ ...state, angle: Number(e.target.value) })}
              className="w-full cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
