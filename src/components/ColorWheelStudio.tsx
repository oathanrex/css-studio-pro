import {
  Check,
  Copy,
  Lock,
  LockOpen,
  Palette,
  RotateCw,
  Sliders,
  Sparkles,
  Unlock,
  Zap,
} from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import {
  buildSwatchFromHex,
  calculateHarmonies,
  hslToRgb,
  rgbToHex,
  rgbToHsl,
  type HarmonyRule,
  type SwatchColor,
} from '../engine/harmonyEngine';

interface ColorWheelStudioProps {
  onApplyToGradient: (hexColors: string[]) => void;
}

const HARMONY_RULES: { id: HarmonyRule; label: string }[] = [
  { id: 'analogous', label: 'Analogous' },
  { id: 'monochromatic', label: 'Monochromatic' },
  { id: 'triad', label: 'Triad' },
  { id: 'complementary', label: 'Complementary' },
  { id: 'split-complementary', label: 'Split Comp' },
  { id: 'tetradic', label: 'Tetradic' },
  { id: 'square', label: 'Square' },
  { id: 'compound', label: 'Compound' },
  { id: 'shades', label: 'Shades' },
  { id: 'custom', label: 'Custom' },
];

// Discrete 7-step tint/shade stops matching Adobe Color
const TINT_STOPS = [10, 25, 40, 55, 70, 85, 95];

export function ColorWheelStudio({ onApplyToGradient }: ColorWheelStudioProps) {
  const [activeRule, setActiveRule] = useState<HarmonyRule>('analogous');
  const [colorSpaceMode, setColorSpaceMode] = useState<'hsl' | 'oklch'>('hsl');
  const [sliderModes, setSliderModes] = useState<Record<string, 'rgb' | 'hsl' | 'cmyk' | 'oklch'>>({});
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  // Initialize base color (Titanium Liquid Accent: #6366f1)
  const [swatches, setSwatches] = useState<SwatchColor[]>(() => {
    const base = buildSwatchFromHex('#6366f1', true, '3');
    return calculateHarmonies(base, 'analogous');
  });

  const wheelSvgRef = useRef<SVGSVGElement | null>(null);
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  const baseSwatch = swatches.find((s) => s.isBase) || swatches[2] || swatches[0];

  // Re-calculate when rule changes
  const handleRuleChange = (rule: HarmonyRule) => {
    setActiveRule(rule);
    if (rule !== 'custom') {
      const next = calculateHarmonies(baseSwatch, rule);
      setSwatches(next);
    }
  };

  // Change base swatch
  const handleSetBase = (id: string) => {
    const updated = swatches.map((s) => ({
      ...s,
      isBase: s.id === id,
    }));
    const newBase = updated.find((s) => s.id === id) || baseSwatch;
    if (activeRule !== 'custom') {
      setSwatches(calculateHarmonies(newBase, activeRule));
    } else {
      setSwatches(updated);
    }
  };

  // Update a single swatch hex/color
  const handleColorChange = (id: string, newHex: string) => {
    const target = swatches.find((s) => s.id === id);
    if (!target) return;
    const updatedSwatch = buildSwatchFromHex(newHex, target.isBase, id);

    if (target.isBase && activeRule !== 'custom') {
      const next = calculateHarmonies(updatedSwatch, activeRule);
      setSwatches(next);
    } else {
      setSwatches(swatches.map((s) => (s.id === id ? updatedSwatch : s)));
    }
  };

  // Color Wheel Dragging Math
  const wheelRadius = 130;
  const wheelCenter = 150;

  const handlePointerDown = (id: string) => {
    setActiveDragId(id);
  };

  const handleWheelPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!activeDragId || !wheelSvgRef.current) return;
    const rect = wheelSvgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - wheelCenter;
    const y = e.clientY - rect.top - wheelCenter;

    let angle = (Math.atan2(y, x) * 180) / Math.PI;
    if (angle < 0) angle += 360;

    const dist = Math.min(wheelRadius, Math.sqrt(x * x + y * y));
    const saturation = Math.round((dist / wheelRadius) * 100);

    const target = swatches.find((s) => s.id === activeDragId);
    if (!target) return;

    const newHsl = {
      h: Math.round(angle),
      s: saturation,
      l: target.hsl.l,
    };
    const newHex = rgbToHex(hslToRgb(newHsl));
    handleColorChange(activeDragId, newHex);
  };

  const handlePointerUp = () => {
    setActiveDragId(null);
  };

  // Toggle channel slider mode for a swatch card
  const toggleSliderMode = (swatchId: string, mode: 'rgb' | 'hsl' | 'cmyk' | 'oklch') => {
    setSliderModes((prev) => ({
      ...prev,
      [swatchId]: mode,
    }));
  };

  // Copy Code
  const handleCopy = (format: 'css' | 'tailwind' | 'json') => {
    let payload = '';
    if (format === 'css') {
      payload = `:root {\n${swatches
        .map((s, idx) => `  --color-${idx + 1}: ${s.hex}; /* OKLCH: lch(${s.oklch.l} ${s.oklch.c} ${s.oklch.h}) */`)
        .join('\n')}\n}`;
    } else if (format === 'tailwind') {
      payload = `module.exports = {\n  theme: {\n    extend: {\n      colors: {\n${swatches
        .map((s, idx) => `        'palette-${idx + 1}': '${s.hex}',`)
        .join('\n')}\n      }\n    }\n  }\n};`;
    } else if (format === 'json') {
      payload = JSON.stringify(
        swatches.map((s, idx) => ({
          name: `Color ${idx + 1}`,
          hex: s.hex,
          rgb: s.rgb,
          hsl: s.hsl,
          oklch: s.oklch,
          isBase: s.isBase,
        })),
        null,
        2
      );
    }

    navigator.clipboard.writeText(payload).then(() => {
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2000);
    });
  };

  return (
    <div className="space-y-6 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-5 sm:p-7 shadow-2xl">
      {/* Header & Mode Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-100">
              Interactive Color Wheel Studio
            </h2>
            <span className="rounded bg-zinc-800 border border-white/10 px-1.5 py-0.5 text-[9px] font-mono text-zinc-300">
              HARMONY ENGINE
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            10 mathematical harmony rules with polar coordinates, tint ladders, and OKLCH wide-gamut precision.
          </p>
        </div>

        {/* Color Space Toggle */}
        <div className="flex items-center gap-1 rounded-xl border border-white/[0.08] bg-zinc-900/60 p-1 shadow-inner">
          <button
            type="button"
            onClick={() => setColorSpaceMode('hsl')}
            className={`rounded-lg px-2.5 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
              colorSpaceMode === 'hsl'
                ? 'bg-zinc-800 text-white shadow-xs border border-white/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Classic HSL
          </button>
          <button
            type="button"
            onClick={() => setColorSpaceMode('oklch')}
            className={`rounded-lg px-2.5 py-1 text-xs font-mono font-medium transition-all cursor-pointer ${
              colorSpaceMode === 'oklch'
                ? 'bg-zinc-800 text-white shadow-xs border border-white/10'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            OKLCH Perceptual
          </button>
        </div>
      </div>

      {/* Harmony Rules Switcher */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        {HARMONY_RULES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => handleRuleChange(r.id)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeRule === r.id
                ? 'bg-zinc-800 text-white font-semibold border border-white/15 shadow-xs'
                : 'border border-white/[0.04] bg-zinc-900/40 text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Centerpiece: Interactive Color Wheel & Spoke Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: SVG Wheel (6 cols) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4">
          <div className="relative select-none touch-none">
            <svg
              ref={wheelSvgRef}
              width="300"
              height="300"
              viewBox="0 0 300 300"
              className="cursor-crosshair rounded-full shadow-2xl"
              onPointerMove={handleWheelPointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              <defs>
                <radialGradient id="wheel-sat" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Conic Wheel Background */}
              <circle
                cx={wheelCenter}
                cy={wheelCenter}
                r={wheelRadius}
                fill="none"
                stroke="rgba(255, 255, 255, 0.12)"
                strokeWidth="2"
              />

              {/* Render wheel slices */}
              {Array.from({ length: 48 }).map((_, i) => {
                const startAngle = (i * 360) / 48;
                const endAngle = ((i + 1) * 360) / 48;
                const radStart = (startAngle * Math.PI) / 180;
                const radEnd = (endAngle * Math.PI) / 180;
                const x1 = wheelCenter + wheelRadius * Math.cos(radStart);
                const y1 = wheelCenter + wheelRadius * Math.sin(radStart);
                const x2 = wheelCenter + wheelRadius * Math.cos(radEnd);
                const y2 = wheelCenter + wheelRadius * Math.sin(radEnd);
                const path = `M ${wheelCenter} ${wheelCenter} L ${x1} ${y1} A ${wheelRadius} ${wheelRadius} 0 0 1 ${x2} ${y2} Z`;
                const col = rgbToHex(hslToRgb({ h: startAngle, s: 100, l: 50 }));
                return <path key={i} d={path} fill={col} />;
              })}

              {/* White Saturation Overlay Ring */}
              <circle
                cx={wheelCenter}
                cy={wheelCenter}
                r={wheelRadius}
                fill="url(#wheel-sat)"
                style={{ mixBlendMode: 'overlay' }}
              />

              {/* Dark Ambient Rim */}
              <circle
                cx={wheelCenter}
                cy={wheelCenter}
                r={wheelRadius}
                fill="none"
                stroke="rgba(8, 9, 13, 0.6)"
                strokeWidth="1.5"
              />

              {/* Polar Spokes connecting swatches */}
              {swatches.map((s) => {
                const rad = (s.hsl.h * Math.PI) / 180;
                const dist = (s.hsl.s / 100) * wheelRadius;
                const px = wheelCenter + dist * Math.cos(rad);
                const py = wheelCenter + dist * Math.sin(rad);

                return (
                  <g key={`spoke-${s.id}`}>
                    <line
                      x1={wheelCenter}
                      y1={wheelCenter}
                      x2={px}
                      y2={py}
                      stroke={s.isBase ? '#ffffff' : 'rgba(255, 255, 255, 0.35)'}
                      strokeWidth={s.isBase ? 2 : 1}
                      strokeDasharray={s.isBase ? 'none' : '3 3'}
                    />
                  </g>
                );
              })}

              {/* Center Pivot Point */}
              <circle cx={wheelCenter} cy={wheelCenter} r={4} fill="#ffffff" opacity="0.6" />

              {/* Swatch Pins on the Wheel */}
              {swatches.map((s) => {
                const rad = (s.hsl.h * Math.PI) / 180;
                const dist = (s.hsl.s / 100) * wheelRadius;
                const px = wheelCenter + dist * Math.cos(rad);
                const py = wheelCenter + dist * Math.sin(rad);

                return (
                  <g
                    key={`pin-${s.id}`}
                    className="cursor-grab active:cursor-grabbing transition-transform hover:scale-110"
                    onPointerDown={() => handlePointerDown(s.id)}
                  >
                    {/* Outer Glow Ring */}
                    <circle
                      cx={px}
                      cy={py}
                      r={s.isBase ? 14 : 10}
                      fill="none"
                      stroke={s.isBase ? '#ffffff' : 'rgba(255, 255, 255, 0.85)'}
                      strokeWidth={s.isBase ? 3 : 1.5}
                      className="shadow-md"
                    />
                    {/* Inner Color Fill */}
                    <circle cx={px} cy={py} r={s.isBase ? 10 : 7} fill={s.hex} />
                    {/* Base Color Pointer Marker (Adobe Triangle Signature) */}
                    {s.isBase && (
                      <polygon
                        points={`${px},${py - 5} ${px + 4},${py + 3} ${px - 4},${py + 3}`}
                        fill="#ffffff"
                      />
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          <span className="mt-3 text-[11px] font-mono text-zinc-500">
            Drag spokes to rotate harmonies · Triangle handle marks locked Base Key
          </span>
        </div>

        {/* Right: Quick Action Controls & Export Matrix (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                Palette Telemetry
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                P3 GAMUT READY
              </span>
            </div>

            {/* 5 Swatches Quick Visual Bar */}
            <div className="grid grid-cols-5 h-16 rounded-xl overflow-hidden border border-white/10 shadow-inner">
              {swatches.map((s) => (
                <div
                  key={`bar-${s.id}`}
                  className="relative flex flex-col items-center justify-end p-1.5 transition-transform hover:scale-105"
                  style={{ backgroundColor: s.hex }}
                >
                  {s.isBase && (
                    <span className="absolute top-1 left-1 bg-black/60 rounded px-1 py-0.2 text-[8px] font-mono text-white">
                      BASE
                    </span>
                  )}
                  <span
                    className="font-mono text-[9px] font-bold px-1 py-0.5 rounded"
                    style={{
                      backgroundColor: s.hsl.l > 50 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                      color: s.hsl.l > 50 ? '#ffffff' : '#000000',
                    }}
                  >
                    {s.hex}
                  </span>
                </div>
              ))}
            </div>

            {/* Studio Integration Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={() => onApplyToGradient(swatches.map((s) => s.hex))}
                className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-zinc-100 hover:bg-white text-zinc-950 px-3 py-2 text-xs font-semibold transition-all cursor-pointer shadow-md"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Apply as Live Gradient</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy('css')}
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 text-xs font-mono font-medium transition-all cursor-pointer shadow-xs"
              >
                {copiedFormat === 'css' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>:root CSS</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy('tailwind')}
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 text-xs font-mono font-medium transition-all cursor-pointer shadow-xs"
              >
                {copiedFormat === 'tailwind' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>Tailwind</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy('json')}
                className="flex items-center gap-1 rounded-lg border border-white/10 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 px-3 py-2 text-xs font-mono font-medium transition-all cursor-pointer shadow-xs"
              >
                {copiedFormat === 'json' ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>JSON</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Swatch Cards Inspector (with Tint Ladders & Channel Sliders) */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2">
        {swatches.map((s, idx) => {
          const currentMode = sliderModes[s.id] || 'hsl';
          return (
            <div
              key={s.id}
              className={`rounded-xl border p-3.5 space-y-3 transition-all ${
                s.isBase
                  ? 'border-white/30 bg-zinc-900/80 shadow-lg'
                  : 'border-white/[0.06] bg-zinc-900/40 hover:border-white/15'
              }`}
            >
              {/* Swatch Header */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">
                  #{idx + 1} {s.isBase ? '(Base Key)' : ''}
                </span>

                <button
                  type="button"
                  onClick={() => handleSetBase(s.id)}
                  className={`rounded p-1 transition-colors cursor-pointer ${
                    s.isBase
                      ? 'text-white bg-white/20'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  title={s.isBase ? 'Locked Base Key Color' : 'Click to Set as Base Key'}
                >
                  {s.isBase ? <Lock className="h-3.5 w-3.5 text-white" /> : <Unlock className="h-3.5 w-3.5" />}
                </button>
              </div>

              {/* Color Swatch Preview Tile */}
              <div
                className="h-14 w-full rounded-lg border border-white/10 shadow-inner flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.02]"
                style={{ backgroundColor: s.hex }}
                onClick={() => {
                  navigator.clipboard.writeText(s.hex);
                  setCopiedFormat(s.id);
                  setTimeout(() => setCopiedFormat(null), 1500);
                }}
                title="Click to copy Hex"
              >
                <span
                  className="font-mono text-xs font-bold px-2 py-0.5 rounded shadow-xs"
                  style={{
                    backgroundColor: s.hsl.l > 50 ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.7)',
                    color: s.hsl.l > 50 ? '#ffffff' : '#000000',
                  }}
                >
                  {copiedFormat === s.id ? 'Copied!' : s.hex}
                </span>
              </div>

              {/* 7-Step Tint/Shade Ladder (Matching Adobe Color) */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono text-zinc-500 uppercase">Tint / Shade Ladder:</span>
                <div className="grid grid-cols-7 h-5 rounded overflow-hidden border border-white/10">
                  {TINT_STOPS.map((l) => {
                    const tintHex = rgbToHex(hslToRgb({ h: s.hsl.h, s: s.hsl.s, l }));
                    return (
                      <button
                        key={l}
                        type="button"
                        onClick={() => handleColorChange(s.id, tintHex)}
                        className="h-full w-full hover:scale-125 transition-transform cursor-pointer"
                        style={{ backgroundColor: tintHex }}
                        title={`Luminance: ${l}% (${tintHex})`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Channel Mode Toggle (HSL, RGB, CMYK, OKLCH) */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-2">
                <span className="text-[9px] font-mono text-zinc-400 uppercase">Sliders:</span>
                <div className="flex items-center gap-1">
                  {(['hsl', 'rgb', 'cmyk', 'oklch'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => toggleSliderMode(s.id, m)}
                      className={`text-[9px] font-mono uppercase px-1 rounded transition-colors ${
                        currentMode === m
                          ? 'bg-zinc-700 text-white font-bold'
                          : 'text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channel Sliders per mode */}
              <div className="space-y-1.5 text-[10px] font-mono text-zinc-400">
                {currentMode === 'hsl' && (
                  <>
                    <div className="flex justify-between">
                      <span>Hue: {s.hsl.h}°</span>
                      <span>Sat: {s.hsl.s}%</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={s.hsl.h}
                      onChange={(e) => {
                        const newHsl = { ...s.hsl, h: Number(e.target.value) };
                        handleColorChange(s.id, rgbToHex(hslToRgb(newHsl)));
                      }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between pt-1">
                      <span>Lightness</span>
                      <span>{s.hsl.l}%</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={s.hsl.l}
                      onChange={(e) => {
                        const newHsl = { ...s.hsl, l: Number(e.target.value) };
                        handleColorChange(s.id, rgbToHex(hslToRgb(newHsl)));
                      }}
                      className="w-full cursor-pointer"
                    />
                  </>
                )}

                {currentMode === 'rgb' && (
                  <>
                    <div className="flex justify-between">
                      <span>R: {s.rgb.r}</span>
                      <span>G: {s.rgb.g}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={s.rgb.r}
                      onChange={(e) => {
                        const newRgb = { ...s.rgb, r: Number(e.target.value) };
                        handleColorChange(s.id, rgbToHex(newRgb));
                      }}
                      className="w-full cursor-pointer"
                    />
                    <div className="flex justify-between pt-1">
                      <span>B: {s.rgb.b}</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={255}
                      value={s.rgb.b}
                      onChange={(e) => {
                        const newRgb = { ...s.rgb, b: Number(e.target.value) };
                        handleColorChange(s.id, rgbToHex(newRgb));
                      }}
                      className="w-full cursor-pointer"
                    />
                  </>
                )}

                {currentMode === 'cmyk' && (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>C: {s.cmyk.c}%</span>
                      <span>M: {s.cmyk.m}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Y: {s.cmyk.y}%</span>
                      <span>K: {s.cmyk.k}%</span>
                    </div>
                  </div>
                )}

                {currentMode === 'oklch' && (
                  <div className="space-y-1">
                    <div className="flex justify-between">
                      <span>L: {s.oklch.l}</span>
                      <span>C: {s.oklch.c}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Hue: {s.oklch.h}°</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Exact Hex Input */}
              <div className="flex items-center justify-between border-t border-white/[0.06] pt-2">
                <span className="font-mono text-[10px] text-zinc-400">HEX:</span>
                <input
                  type="text"
                  value={s.hex}
                  onChange={(e) => handleColorChange(s.id, e.target.value)}
                  className="w-24 rounded border border-white/10 bg-zinc-950 px-2 py-0.5 text-right font-mono text-xs text-white"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
