import {
  AlertTriangle,
  Check,
  CheckCircle2,
  Eye,
  RotateCw,
  ShieldCheck,
  Sparkles,
  Wand2,
  XCircle,
} from 'lucide-react';
import React, { useState } from 'react';
import {
  auditContrast,
  autoFixContrast,
  detectColorCollisions,
  simulateHexColorBlindness,
  type VisionDeficiency,
} from '../engine/colorBlindnessEngine';

interface AccessibilityStudioProps {
  currentPalette: string[];
}

const DEFICIENCIES: { id: VisionDeficiency; label: string; desc: string }[] = [
  { id: 'normal', label: 'Normal Vision', desc: 'Full trichromatic vision' },
  { id: 'deuteranopia', label: 'Deuteranopia', desc: 'Green-weak (6% of males)' },
  { id: 'protanopia', label: 'Protanopia', desc: 'Red-weak (2% of males)' },
  { id: 'tritanopia', label: 'Tritanopia', desc: 'Blue-weak (rare)' },
  { id: 'achromatopsia', label: 'Achromatopsia', desc: 'Monochromacy (complete)' },
];

export function AccessibilityStudio({ currentPalette }: AccessibilityStudioProps) {
  const [activeVision, setActiveVision] = useState<VisionDeficiency>('deuteranopia');

  // Contrast Testing State
  const [fgColor, setFgColor] = useState<string>('#ffffff');
  const [bgColor, setBgColor] = useState<string>('#0f172a');

  const audit = auditContrast(fgColor, bgColor);
  const collisions = detectColorCollisions(currentPalette, activeVision);

  const handleAutoFixAAA = () => {
    const fixedBg = autoFixContrast(fgColor, bgColor, 7.0);
    setBgColor(fixedBg);
  };

  const handleAutoFixAA = () => {
    const fixedBg = autoFixContrast(fgColor, bgColor, 4.5);
    setBgColor(fixedBg);
  };

  return (
    <div className="space-y-6 rounded-2xl border border-white/[0.08] bg-zinc-950/80 p-5 sm:p-7 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-zinc-100">
              Accessibility &amp; Color Blindness Suite
            </h2>
            <span className="rounded bg-zinc-800 border border-white/10 px-1.5 py-0.5 text-[9px] font-mono text-zinc-300">
              WCAG 2.1 &amp; APCA READY
            </span>
          </div>
          <p className="text-xs text-zinc-400 mt-0.5">
            Validate contrast thresholds, APCA lightness scores, and full-spectrum color blindness simulation.
          </p>
        </div>
      </div>

      {/* Part 1: WCAG 2.1 & APCA Contrast Analyzer */}
      <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
            Real-Time Contrast Evaluator
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleAutoFixAA}
              className="flex items-center gap-1 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-white/10 px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer shadow-xs"
              title="Automatically adjust background to pass AA (4.5:1)"
            >
              <Wand2 className="h-3 w-3 text-amber-400" />
              <span>Auto-Fix AA (4.5:1)</span>
            </button>
            <button
              type="button"
              onClick={handleAutoFixAAA}
              className="flex items-center gap-1 rounded bg-zinc-100 hover:bg-white text-zinc-950 px-2.5 py-1 text-[11px] font-mono font-semibold transition-all cursor-pointer shadow-xs"
              title="Automatically adjust background to pass AAA (7.0:1)"
            >
              <Sparkles className="h-3 w-3" />
              <span>Auto-Fix AAA (7.0:1)</span>
            </button>
          </div>
        </div>

        {/* Inputs & Live Visual Testbed */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          {/* Color Pickers (5 cols) */}
          <div className="md:col-span-5 space-y-3 text-xs font-mono">
            {/* Text Color Picker */}
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-zinc-950 p-2.5">
              <span className="text-zinc-400">Foreground Text:</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-20 rounded border border-white/10 bg-zinc-900 px-1.5 py-0.5 text-right text-xs text-white"
                />
              </div>
            </div>

            {/* Background Color Picker */}
            <div className="flex items-center justify-between rounded-lg border border-white/10 bg-zinc-950 p-2.5">
              <span className="text-zinc-400">Background Canvas:</span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-6 w-6 rounded cursor-pointer border-0 bg-transparent p-0"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-20 rounded border border-white/10 bg-zinc-900 px-1.5 py-0.5 text-right text-xs text-white"
                />
              </div>
            </div>

            {/* Quick Invert Button */}
            <button
              type="button"
              onClick={() => {
                const temp = fgColor;
                setFgColor(bgColor);
                setBgColor(temp);
              }}
              className="flex items-center justify-center gap-1.5 w-full rounded-lg border border-white/[0.06] bg-zinc-900 hover:bg-zinc-800 p-1.5 text-[11px] text-zinc-300 transition-colors cursor-pointer"
            >
              <RotateCw className="h-3 w-3" />
              <span>Invert Foreground &amp; Background</span>
            </button>
          </div>

          {/* Live Preview Card (7 cols) */}
          <div
            className="md:col-span-7 rounded-xl p-5 border border-white/10 shadow-lg space-y-3 transition-colors duration-200"
            style={{ backgroundColor: bgColor, color: fgColor }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider opacity-70">
                Live Rendering Preview
              </span>
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded border border-current">
                Contrast {audit.ratio}:1
              </span>
            </div>

            <h3 className="text-lg font-bold tracking-tight">
              Large Headline Text Preview
            </h3>

            <p className="text-xs leading-relaxed opacity-90">
              Regular 14px body paragraph. Accessibility ensures legible information architecture across diverse lighting conditions and ambient reflections.
            </p>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1 rounded text-xs font-semibold border border-current shadow-xs"
              >
                CTA Button
              </button>
              <span className="font-mono text-[10px] opacity-80">APCA Score: Lc {audit.apca}</span>
            </div>
          </div>
        </div>

        {/* Compliance Rating Matrix */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/[0.06]">
          {/* Normal Text */}
          <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block">Regular Text (14px)</span>
              <span className="text-xs font-semibold text-zinc-200">Min 4.5:1 (AA)</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                  audit.normalTextAA ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {audit.normalTextAA ? 'AA ✓' : 'FAIL'}
              </span>
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                  audit.normalTextAAA ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {audit.normalTextAAA ? 'AAA ✓' : 'FAIL'}
              </span>
            </div>
          </div>

          {/* Large Text */}
          <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block">Large Text (18px+)</span>
              <span className="text-xs font-semibold text-zinc-200">Min 3.0:1 (AA)</span>
            </div>
            <div className="flex items-center gap-1">
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                  audit.largeTextAA ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {audit.largeTextAA ? 'AA ✓' : 'FAIL'}
              </span>
              <span
                className={`rounded px-1.5 py-0.5 text-[9px] font-mono font-bold ${
                  audit.largeTextAAA ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                }`}
              >
                {audit.largeTextAAA ? 'AAA ✓' : 'FAIL'}
              </span>
            </div>
          </div>

          {/* Graphic Components */}
          <div className="rounded-lg border border-white/[0.06] bg-zinc-950 p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono text-zinc-400 block">UI Graphic Elements</span>
              <span className="text-xs font-semibold text-zinc-200">Min 3.0:1 (AA)</span>
            </div>
            <span
              className={`rounded px-2 py-0.5 text-[9px] font-mono font-bold ${
                audit.graphicComponentsAA ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {audit.graphicComponentsAA ? 'PASS (AA)' : 'FAIL'}
            </span>
          </div>
        </div>
      </div>

      {/* Part 2: Full-Spectrum Color Blindness Simulation */}
      <div className="rounded-xl border border-white/[0.06] bg-zinc-900/40 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
              Color Blindness Evaluator (Current Studio Palette)
            </h3>
            <p className="text-[11px] text-zinc-400 mt-0.5">
              Simulates how your 5-color palette appears under various cone cell vision deficiencies.
            </p>
          </div>

          {/* Deficiency Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {DEFICIENCIES.map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setActiveVision(d.id)}
                className={`rounded px-2.5 py-1 text-[11px] font-mono transition-all cursor-pointer whitespace-nowrap ${
                  activeVision === d.id
                    ? 'bg-zinc-800 text-white font-bold border border-white/10 shadow-xs'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Collision Warning Banner */}
        {collisions.length > 0 ? (
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 flex items-start gap-2.5 text-xs text-amber-200">
            <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Accessibility Collision Detected:</span>{' '}
              <span>
                {collisions.length} pair(s) of swatches (e.g. Color #{collisions[0].colorIndex1 + 1} and #{collisions[0].colorIndex2 + 1}) become difficult to distinguish under {activeVision}. Adjust luminance to resolve.
              </span>
            </div>
          </div>
        ) : (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 flex items-center gap-2.5 text-xs text-emerald-200">
            <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">
              Color Blind Safe: All 5 colors maintain clear perceptual separation under {activeVision}.
            </span>
          </div>
        )}

        {/* 4-Column Comparative Color Blindness Matrix (Adobe Color Signature) */}
        <div className="overflow-x-auto rounded-xl border border-white/10 bg-zinc-950 p-4">
          <table className="w-full text-left font-mono text-xs">
            <thead>
              <tr className="border-b border-white/[0.08] text-[10px] uppercase text-zinc-400">
                <th className="pb-3 font-bold">Original Palette</th>
                <th className="pb-3 font-bold">Deuteranopia (Green-Weak)</th>
                <th className="pb-3 font-bold">Protanopia (Red-Weak)</th>
                <th className="pb-3 font-bold">Tritanopia (Blue-Weak)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {currentPalette.map((hex, idx) => {
                const deut = simulateHexColorBlindness(hex, 'deuteranopia');
                const prot = simulateHexColorBlindness(hex, 'protanopia');
                const trit = simulateHexColorBlindness(hex, 'tritanopia');

                return (
                  <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-12 rounded border border-white/10 shadow-xs" style={{ backgroundColor: hex }} />
                        <span className="text-zinc-200">{hex}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-12 rounded border border-white/10 shadow-xs" style={{ backgroundColor: deut }} />
                        <span className="text-zinc-400">{deut}</span>
                      </div>
                    </td>
                    <td className="py-2.5 pr-3">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-12 rounded border border-white/10 shadow-xs" style={{ backgroundColor: prot }} />
                        <span className="text-zinc-400">{prot}</span>
                      </div>
                    </td>
                    <td className="py-2.5">
                      <div className="flex items-center gap-2.5">
                        <span className="h-7 w-12 rounded border border-white/10 shadow-xs" style={{ backgroundColor: trit }} />
                        <span className="text-zinc-400">{trit}</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
