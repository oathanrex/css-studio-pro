import React from 'react';
import type { TextGradientState } from '../types';

interface TextGradientControlsProps {
  state: TextGradientState;
  onChange: (next: TextGradientState) => void;
}

export function TextGradientControls({ state, onChange }: TextGradientControlsProps) {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white">Text Gradient Studio</h3>
        <p className="text-xs text-slate-400">
          CSS background-clip: text gradients with 3D text shadows.
        </p>
      </div>

      <div className="space-y-4 text-xs">
        {/* Sample Text */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-1.5">
          <label className="font-bold text-slate-300">Display Text</label>
          <input
            type="text"
            value={state.text}
            onChange={(e) => onChange({ ...state, text: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-white"
          />
        </div>

        {/* Colors */}
        <div className="grid grid-cols-3 gap-2 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5">
          <div>
            <span className="font-bold text-slate-300">Start</span>
            <input
              type="color"
              value={state.colorStart}
              onChange={(e) => onChange({ ...state, colorStart: e.target.value })}
              className="mt-1 h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
            />
          </div>

          <div>
            <span className="font-bold text-slate-300">Middle</span>
            <input
              type="color"
              value={state.colorMiddle}
              onChange={(e) => onChange({ ...state, colorMiddle: e.target.value })}
              className="mt-1 h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
            />
          </div>

          <div>
            <span className="font-bold text-slate-300">End</span>
            <input
              type="color"
              value={state.colorEnd}
              onChange={(e) => onChange({ ...state, colorEnd: e.target.value })}
              className="mt-1 h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
            />
          </div>
        </div>

        {/* Font Size */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-3.5 space-y-2">
          <div className="flex justify-between">
            <span className="font-bold text-slate-300">Font Size: {state.fontSize}px</span>
          </div>
          <input
            type="range"
            min={24}
            max={72}
            value={state.fontSize}
            onChange={(e) => onChange({ ...state, fontSize: Number(e.target.value) })}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        {/* Text Shadow Toggle */}
        <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/40 p-3.5">
          <span className="font-bold text-slate-300">Drop Shadow Ambient Glow</span>
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
