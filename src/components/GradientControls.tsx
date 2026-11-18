import { Plus, RotateCw, Trash2 } from 'lucide-react';
import React from 'react';
import type { GradientState, GradientType, RadialPosition, RadialShape } from '../types';

interface GradientControlsProps {
  state: GradientState;
  onChange: (next: GradientState) => void;
}

const QUICK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function GradientControls({ state, onChange }: GradientControlsProps) {
  const handleTypeChange = (type: GradientType) => {
    onChange({ ...state, type });
  };

  const handleAngleChange = (angle: number) => {
    onChange({ ...state, angle });
  };

  const handleStopChange = (id: string, color: string, position: number) => {
    const updated = state.stops.map((s) => (s.id === id ? { ...s, color, position } : s));
    onChange({ ...state, stops: updated });
  };

  const handleAddStop = () => {
    if (state.stops.length >= 6) return;
    const newId = String(Date.now());
    const newStop = {
      id: newId,
      color: '#38ef7d',
      position: 50,
    };
    onChange({ ...state, stops: [...state.stops, newStop] });
  };

  const handleDeleteStop = (id: string) => {
    if (state.stops.length <= 2) return;
    const filtered = state.stops.filter((s) => s.id !== id);
    onChange({ ...state, stops: filtered });
  };

  return (
    <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="border-b border-slate-800 pb-3">
        <h3 className="text-sm font-bold text-white">Gradient Studio Architecture</h3>
        <p className="text-xs text-slate-400">
          Linear, radial, conic &amp; mesh multi-stop gradient editor.
        </p>
      </div>

      {/* Gradient Type */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
          Gradient Type
        </label>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {(['linear', 'radial', 'conic', 'repeating-linear', 'mesh'] as GradientType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => handleTypeChange(t)}
              className={`rounded-lg border px-2.5 py-1.5 text-xs font-semibold capitalize transition-all cursor-pointer ${
                state.type === t
                  ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-xs'
                  : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:text-white'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Angle Selector (Linear & Conic) */}
      {(state.type === 'linear' || state.type === 'repeating-linear' || state.type === 'conic') && (
        <div className="space-y-2.5 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300">
              <RotateCw className="h-3.5 w-3.5 text-indigo-400" />
              <span>Angle: {state.angle}°</span>
            </label>
            <input
              type="number"
              min={0}
              max={360}
              value={state.angle}
              onChange={(e) => handleAngleChange(Number(e.target.value) || 0)}
              className="w-16 rounded-md border border-slate-700 bg-slate-900 px-2 py-0.5 text-center text-xs text-white"
            />
          </div>

          <input
            type="range"
            min={0}
            max={360}
            value={state.angle}
            onChange={(e) => handleAngleChange(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />

          <div className="flex flex-wrap gap-1.5 pt-1">
            {QUICK_ANGLES.map((a) => (
              <button
                key={a}
                type="button"
                onClick={() => handleAngleChange(a)}
                className={`rounded px-2 py-1 text-[10px] font-semibold transition-all cursor-pointer ${
                  state.angle === a
                    ? 'bg-indigo-600 text-white'
                    : 'bg-slate-800 text-slate-400 hover:text-white'
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
        <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5">
          <div>
            <label className="text-[11px] font-bold text-slate-300 uppercase">Shape</label>
            <select
              value={state.radialShape}
              onChange={(e) => onChange({ ...state, radialShape: e.target.value as RadialShape })}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-white"
            >
              <option value="circle">Circle</option>
              <option value="ellipse">Ellipse</option>
            </select>
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-300 uppercase">Position</label>
            <select
              value={state.radialPosition}
              onChange={(e) => onChange({ ...state, radialPosition: e.target.value as RadialPosition })}
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1.5 text-xs text-white"
            >
              <option value="center">Center</option>
              <option value="top">Top</option>
              <option value="bottom">Bottom</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="top left">Top Left</option>
              <option value="top right">Top Right</option>
            </select>
          </div>
        </div>
      )}

      {/* Color Stops Track & Management */}
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/40 p-3.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Color Stops ({state.stops.length})
          </label>
          {state.stops.length < 6 && (
            <button
              type="button"
              onClick={handleAddStop}
              className="flex items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 cursor-pointer shadow-xs"
            >
              <Plus className="h-3 w-3 text-emerald-400" />
              <span>Add Stop</span>
            </button>
          )}
        </div>

        {/* Individual Stop Rows */}
        <div className="space-y-2.5">
          {state.stops.map((stop, idx) => (
            <div
              key={stop.id}
              className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-900/80 p-2.5"
            >
              <span className="text-[11px] font-bold text-slate-500">#{idx + 1}</span>

              {/* Color Picker */}
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={stop.color}
                  onChange={(e) => handleStopChange(stop.id, e.target.value, stop.position)}
                  className="h-7 w-7 rounded cursor-pointer border-0 bg-transparent"
                />
                <input
                  type="text"
                  value={stop.color}
                  onChange={(e) => handleStopChange(stop.id, e.target.value, stop.position)}
                  className="w-20 rounded border border-slate-700 bg-slate-950 px-2 py-0.5 text-center font-mono text-xs text-white"
                />
              </div>

              {/* Position Slider */}
              <div className="flex flex-1 items-center gap-2">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={stop.position}
                  onChange={(e) => handleStopChange(stop.id, stop.color, Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer"
                />
                <span className="w-9 text-right font-mono text-[11px] text-slate-400">
                  {stop.position}%
                </span>
              </div>

              {/* Delete Stop */}
              {state.stops.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleDeleteStop(stop.id)}
                  className="rounded p-1 text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Remove stop"
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
