import { Plus, RotateCw, Shuffle, Sparkles, Trash2 } from 'lucide-react';
import React from 'react';
import type { ColorSpace, GradientState, GradientType, RadialPosition, RadialShape } from '../types';

interface GradientControlsProps {
  state: GradientState;
  onChange: (next: GradientState) => void;
  onRandomize?: () => void;
}

const QUICK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function GradientControls({ state, onChange, onRandomize }: GradientControlsProps) {
  const handleTypeChange = (type: GradientType) => {
    onChange({ ...state, type });
  };

  const handleColorSpaceChange = (colorSpace: ColorSpace) => {
    onChange({ ...state, colorSpace });
  };

  const handleAngleChange = (angle: number) => {
    onChange({ ...state, angle });
  };

  const handleStopChange = (id: string, color: string, position: number) => {
    const updated = state.stops.map((s) => (s.id === id ? { ...s, color, position } : s));
    onChange({ ...state, stops: updated });
  };

  const handleAddStop = () => {
    if (state.stops.length >= 8) return;
    const newId = String(Date.now());
    // Pick an interpolated color between existing stops or a harmonious tone
    const lastStop = state.stops[state.stops.length - 1];
    const prevStop = state.stops[state.stops.length - 2] || state.stops[0];
    const newStop = {
      id: newId,
      color: '#475569',
      position: Math.round((prevStop.position + lastStop.position) / 2),
    };
    onChange({ ...state, stops: [...state.stops, newStop] });
  };

  const handleDeleteStop = (id: string) => {
    if (state.stops.length <= 2) return;
    const filtered = state.stops.filter((s) => s.id !== id);
    onChange({ ...state, stops: filtered });
  };

  return (
    <div className="space-y-5 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-5 sm:p-6 shadow-lg dark:shadow-xl transition-colors duration-200">
      <div className="flex items-center justify-between border-b border-zinc-200 dark:border-white/[0.08] pb-3">
        <div>
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
            Gradient Architecture
          </h3>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
            Sub-pixel multi-stop interpolations &amp; color spaces.
          </p>
        </div>
        {onRandomize && (
          <button
            type="button"
            onClick={onRandomize}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-zinc-800/90 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 px-3 py-1.5 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer shadow-xs active:scale-95"
            title="Generate balanced random palette"
          >
            <Shuffle className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
            <span>Randomize</span>
          </button>
        )}
      </div>

      {/* Gradient Mathematical Engine Type */}
      <div className="space-y-2">
        <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Geometry Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 sm:grid-cols-5">
          {(['linear', 'radial', 'conic', 'repeating-linear', 'mesh'] as GradientType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`rounded-full border px-2.5 py-1.5 text-xs font-medium capitalize transition-all cursor-pointer ${
                state.type === t
                  ? 'border-zinc-800 dark:border-white/20 bg-zinc-900 dark:bg-zinc-800 text-white shadow-xs font-semibold'
                  : 'border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Modern CSS Color Space Interpolator */}
      <div className="space-y-2 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400">
            Color Interpolation Space
          </label>
          <span className="text-[9px] font-mono text-zinc-500">CSS Color 4</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'oklch', label: 'OKLCH (Perceptual)', tip: 'No gray dead-zone' },
            { id: 'oklab', label: 'OKLab (Balanced)', tip: 'Smooth perceptual transitions' },
            { id: 'srgb', label: 'sRGB (Classic)', tip: 'Legacy standard' },
          ].map((cs) => (
            <button
              key={cs.id}
              type="button"
              onClick={() => handleColorSpaceChange(cs.id as ColorSpace)}
              className={`flex flex-col items-center rounded-xl border px-2 py-1.5 text-center transition-all cursor-pointer ${
                (state.colorSpace || 'oklch') === cs.id
                  ? 'border-zinc-800 dark:border-white/20 bg-zinc-900 dark:bg-zinc-800 text-white shadow-xs'
                  : 'border-zinc-200 dark:border-white/[0.05] bg-white dark:bg-zinc-950/60 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
              }`}
            >
              <span className="text-xs font-semibold">{cs.label}</span>
              <span className="text-[9px] text-zinc-500">{cs.tip}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Angle Selector (Linear & Conic) */}
      {(state.type === 'linear' || state.type === 'repeating-linear' || state.type === 'conic') && (
        <div className="space-y-2.5 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-3.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-400">
              <RotateCw className="h-3 w-3 text-zinc-500 dark:text-zinc-400" />
              <span>Angle: {state.angle}°</span>
            </label>
            <input
              type="number"
              min={0}
              max={360}
              value={state.angle}
              onChange={(e) => handleAngleChange(Number(e.target.value) || 0)}
              className="w-16 rounded-lg border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-950 px-2 py-0.5 text-center font-mono text-xs text-zinc-900 dark:text-white"
            />
          </div>

          <input
            type="range"
            min={0}
            max={360}
            value={state.angle}
            onChange={(e) => handleAngleChange(Number(e.target.value))}
            className="w-full cursor-pointer"
          />

          {/* Quick Angles */}
          <div className="flex items-center justify-between gap-1 pt-1">
            {QUICK_ANGLES.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => handleAngleChange(a)}
                className={`rounded-full px-2 py-0.5 font-mono text-[10px] transition-all cursor-pointer ${
                  state.angle === a
                    ? 'bg-zinc-900 dark:bg-zinc-800 text-white font-bold border border-zinc-800 dark:border-white/10 shadow-xs'
                    : 'text-zinc-500 hover:text-black dark:hover:text-zinc-300'
                }`}
              >
                {a}°
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Radial Options */}
      {state.type === 'radial' && (
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-white/[0.06] bg-zinc-900/40 p-3.5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Radial Shape
            </label>
            <select
              value={state.radialShape}
              onChange={(e) => onChange({ ...state, radialShape: e.target.value as RadialShape })}
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-2.5 py-1.5 text-xs text-white"
            >
              <option value="circle">Circle</option>
              <option value="ellipse">Ellipse</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400">
              Focal Position
            </label>
            <select
              value={state.radialPosition}
              onChange={(e) =>
                onChange({ ...state, radialPosition: e.target.value as RadialPosition })
              }
              className="w-full rounded-lg border border-white/10 bg-zinc-950 px-2.5 py-1.5 text-xs text-white"
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="top left">Top Left</option>
              <option value="top right">Top Right</option>
              <option value="bottom left">Bottom Left</option>
              <option value="bottom right">Bottom Right</option>
            </select>
          </div>
        </div>
      )}

      {/* Color Stops Sequence */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Color Stops ({state.stops.length})
          </label>
          {state.stops.length < 8 && (
            <button
              type="button"
              onClick={handleAddStop}
              className="flex items-center gap-1 rounded-full border border-zinc-300 dark:border-white/10 bg-zinc-900 dark:bg-zinc-800 px-3 py-1 text-[11px] font-medium text-white transition-all hover:bg-black dark:hover:bg-zinc-700 cursor-pointer shadow-xs"
            >
              <Plus className="h-3 w-3" />
              <span>Add Stop</span>
            </button>
          )}
        </div>

        {/* Visual Stop Distribution Track */}
        <div className="relative h-6 w-full rounded-full border border-zinc-300 dark:border-white/10 bg-slate-100 dark:bg-zinc-950 p-1">
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `linear-gradient(to right, ${state.stops
                .map((s) => `${s.color} ${s.position}%`)
                .join(', ')})`,
            }}
          />
        </div>

        {/* Stop Row Items */}
        <div className="space-y-2">
          {state.stops.map((stop, idx) => (
            <div
              key={stop.id}
              className="flex items-center gap-2.5 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/50 p-2.5 transition-all hover:border-zinc-300 dark:hover:border-white/10 shadow-xs"
            >
              <span className="font-mono text-[10px] font-bold text-zinc-500 w-4">#{idx + 1}</span>

              {/* Color Picker Chip */}
              <div className="relative flex items-center gap-1.5">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleStopChange(stop.id, e.target.value, stop.position)}
                  className="h-7 w-7 rounded-full cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => handleStopChange(stop.id, e.target.value, stop.position)}
                  className="w-18 rounded-lg border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-950 px-1.5 py-0.5 font-mono text-xs text-zinc-800 dark:text-zinc-300"
                />
              </div>

              {/* Position Slider */}
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(e) =>
                    handleStopChange(stop.id, stop.color, Number(e.target.value))
                  }
                  className="w-full cursor-pointer"
                />
                <span className="font-mono text-xs text-zinc-600 dark:text-zinc-400 w-10 text-right">
                  {stop.position}%
                </span>
              </div>

              {/* Delete Stop */}
              {state.stops.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleDeleteStop(stop.id)}
                  className="rounded-full p-1 text-zinc-400 hover:text-rose-500 transition-colors cursor-pointer"
                  title="Remove Stop"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
