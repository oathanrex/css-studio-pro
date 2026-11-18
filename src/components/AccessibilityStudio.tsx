import {
  AlertTriangle,
  ArrowRightLeft,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  Info,
  RotateCw,
  ShieldCheck,
  Sliders,
  Sparkles,
  Wand2,
  XCircle,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import {
  auditContrast,
  autoFixContrast,
  calculateContrastRatio,
  detectColorCollisions,
  simulateHexColorBlindness,
  type VisionDeficiency,
} from '../engine/colorBlindnessEngine';
import { hexToRgb, hslToRgb, rgbToHex, rgbToHsl } from '../engine/harmonyEngine';

interface AccessibilityStudioProps {
  currentPalette: string[];
}

type SubTab = 'summary' | 'suggestions' | 'set-ratio';

export function AccessibilityStudio({ currentPalette }: AccessibilityStudioProps) {
  // Contrast Testing State (Adobe default: #FFE8F0 on #4B0090 or high contrast)
  const [fgColor, setFgColor] = useState<string>('#FFE8F0');
  const [bgColor, setBgColor] = useState<string>('#4B0090');
  const [activeSubTab, setActiveSubTab] = useState<SubTab>('summary');
  const [showEntirePalette, setShowEntirePalette] = useState(false);
  const [targetRatio, setTargetRatio] = useState<number>(7.0);

  // Active deficiency for simulated viewer
  const [activeVision, setActiveVision] = useState<VisionDeficiency>('deuteranopia');

  // Derived HSL for lightness sliders
  const fgHsl = useMemo(() => rgbToHsl(hexToRgb(fgColor)), [fgColor]);
  const bgHsl = useMemo(() => rgbToHsl(hexToRgb(bgColor)), [bgColor]);

  const audit = useMemo(() => auditContrast(fgColor, bgColor), [fgColor, bgColor]);
  const collisions = useMemo(
    () => detectColorCollisions(currentPalette, activeVision),
    [currentPalette, activeVision]
  );

  // Invert colors
  const handleSwap = () => {
    const temp = fgColor;
    setFgColor(bgColor);
    setBgColor(temp);
  };

  // Adjust foreground lightness
  const handleFgLightnessChange = (newLightness: number) => {
    const rgb = hslToRgb({ h: fgHsl.h, s: fgHsl.s, l: newLightness });
    setFgColor(rgbToHex(rgb).toUpperCase());
  };

  // Adjust background lightness
  const handleBgLightnessChange = (newLightness: number) => {
    const rgb = hslToRgb({ h: bgHsl.h, s: bgHsl.s, l: newLightness });
    setBgColor(rgbToHex(rgb).toUpperCase());
  };

  // Apply auto-fix suggestions
  const handleApplyAA = () => {
    const fixed = autoFixContrast(fgColor, bgColor, 4.5);
    setBgColor(fixed.toUpperCase());
  };

  const handleApplyAAA = () => {
    const fixed = autoFixContrast(fgColor, bgColor, 7.0);
    setBgColor(fixed.toUpperCase());
  };

  // Target ratio solver
  const handleSolveTargetRatio = (ratio: number) => {
    setTargetRatio(ratio);
    const fixed = autoFixContrast(fgColor, bgColor, ratio);
    setBgColor(fixed.toUpperCase());
  };

  const isPassingAA = audit.ratio >= 4.5;

  return (
    <div className="space-y-8 rounded-3xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-6 sm:p-9 shadow-xl dark:shadow-2xl transition-colors duration-200">
      {/* Top Header & Telemetry Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-200/80 dark:border-white/[0.08] pb-5">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Contrast ratio
            </span>
            {/* Pill Contrast Ratio Badge matching Adobe Color */}
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-3 py-0.5 text-xs font-bold text-white transition-all shadow-xs ${
                isPassingAA ? 'bg-[#107c41]' : 'bg-[#c92a2a]'
              }`}
            >
              {isPassingAA ? (
                <Check className="h-3.5 w-3.5 stroke-[3]" />
              ) : (
                <XCircle className="h-3.5 w-3.5 stroke-[2.5]" />
              )}
              <span>{audit.ratio} : 1</span>
            </span>
          </div>

          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">|</span>

          <span className="rounded-full bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/10 px-2.5 py-0.5 text-[10px] font-mono text-zinc-600 dark:text-zinc-300">
            APCA Lc {audit.apca}
          </span>
        </div>

        {/* Compare Entire Palette Link */}
        <button
          type="button"
          onClick={() => setShowEntirePalette(!showEntirePalette)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white underline underline-offset-4 cursor-pointer transition-colors"
        >
          <span>Compare entire palette</span>
          {showEntirePalette ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* Main Contrast Section (Adobe Color Light / Dark 10/10 Parity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input Cards & Sliders (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Foreground & Background Pickers with Center Swap Button */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-3">
            {/* Foreground Color Card */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                Foreground color
              </label>

              {/* Pill Input Container */}
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900/80 px-3.5 py-2.5 shadow-xs transition-all focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-400/20">
                <label className="relative h-7 w-7 flex-shrink-0 cursor-pointer rounded-full border border-black/15 shadow-xs overflow-hidden">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: fgColor }}
                  />
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value.toUpperCase())}
                    className="opacity-0 absolute inset-0 cursor-pointer h-full w-full"
                  />
                </label>
                <input
                  type="text"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value.toUpperCase())}
                  className="w-full bg-transparent font-mono text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 outline-none"
                  placeholder="#FFFFFF"
                />
              </div>

              {/* Lightness Pill Slider & Number Box */}
              <div className="flex items-center gap-2 pt-1">
                <div
                  className="relative h-4.5 flex-1 rounded-full cursor-pointer border border-zinc-200 dark:border-white/10 shadow-inner overflow-hidden"
                  style={{
                    background: `linear-gradient(to right, #000000 0%, ${fgColor} 50%, #ffffff 100%)`,
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={fgHsl.l}
                    onChange={(e) => handleFgLightnessChange(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    title={`Foreground Lightness: ${fgHsl.l}%`}
                  />
                  {/* Circular White Thumb Ring */}
                  <div
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-white bg-transparent shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    style={{ left: `${fgHsl.l}%` }}
                  />
                </div>
                <div className="flex h-8 w-13 items-center justify-center rounded-xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  {fgHsl.l}%
                </div>
              </div>
            </div>

            {/* Circular Animated Swap Button */}
            <div className="flex justify-center pt-5 sm:pt-6">
              <button
                type="button"
                onClick={handleSwap}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 hover:text-black dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:scale-110 active:rotate-180 cursor-pointer shadow-xs"
                title="Swap Foreground & Background Colors"
                aria-label="Swap colors"
              >
                <ArrowRightLeft className="h-4 w-4" />
              </button>
            </div>

            {/* Background Color Card */}
            <div className="space-y-2.5">
              <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
                Background color
              </label>

              {/* Pill Input Container */}
              <div className="flex items-center gap-3 rounded-2xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900/80 px-3.5 py-2.5 shadow-xs transition-all focus-within:border-zinc-500 focus-within:ring-2 focus-within:ring-zinc-400/20">
                <label className="relative h-7 w-7 flex-shrink-0 cursor-pointer rounded-full border border-black/15 shadow-xs overflow-hidden">
                  <span
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: bgColor }}
                  />
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                    className="opacity-0 absolute inset-0 cursor-pointer h-full w-full"
                  />
                </label>
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                  className="w-full bg-transparent font-mono text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100 outline-none"
                  placeholder="#000000"
                />
              </div>

              {/* Lightness Pill Slider & Number Box */}
              <div className="flex items-center gap-2 pt-1">
                <div
                  className="relative h-4.5 flex-1 rounded-full cursor-pointer border border-zinc-200 dark:border-white/10 shadow-inner overflow-hidden"
                  style={{
                    background: `linear-gradient(to right, #000000 0%, ${bgColor} 50%, #ffffff 100%)`,
                  }}
                >
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={bgHsl.l}
                    onChange={(e) => handleBgLightnessChange(Number(e.target.value))}
                    className="absolute inset-0 w-full opacity-0 cursor-pointer"
                    title={`Background Lightness: ${bgHsl.l}%`}
                  />
                  {/* Circular White Thumb Ring */}
                  <div
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-white bg-transparent shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                    style={{ left: `${bgHsl.l}%` }}
                  />
                </div>
                <div className="flex h-8 w-13 items-center justify-center rounded-xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                  {bgHsl.l}%
                </div>
              </div>
            </div>
          </div>

          {/* Sub-Tabs (Summary | Contrast suggestions | Set a contrast ratio) */}
          <div className="border-b border-zinc-200 dark:border-white/[0.08] flex items-center gap-6 pt-2">
            <button
              type="button"
              onClick={() => setActiveSubTab('summary')}
              className={`pb-2.5 text-xs font-semibold transition-all cursor-pointer border-b-2 ${
                activeSubTab === 'summary'
                  ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                  : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Summary
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('suggestions')}
              className={`pb-2.5 text-xs font-semibold transition-all cursor-pointer border-b-2 ${
                activeSubTab === 'suggestions'
                  ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                  : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Contrast suggestions
            </button>

            <button
              type="button"
              onClick={() => setActiveSubTab('set-ratio')}
              className={`pb-2.5 text-xs font-semibold transition-all cursor-pointer border-b-2 ${
                activeSubTab === 'set-ratio'
                  ? 'border-zinc-900 dark:border-white text-zinc-900 dark:text-white'
                  : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
              }`}
            >
              Set a contrast ratio
            </button>
          </div>

          {/* SubTab 1: Summary Table (Exact 10/10 Parity with Uploaded Screenshot) */}
          {activeSubTab === 'summary' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-white/[0.08]">
                    <th className="pb-3 font-bold text-zinc-900 dark:text-zinc-100 text-sm">
                      Category
                    </th>
                    <th className="pb-3 font-bold text-zinc-800 dark:text-zinc-200 text-sm text-center">
                      <span
                        className="border-b border-dotted border-zinc-400 dark:border-zinc-500 cursor-help"
                        title="WCAG Level AA: 4.5:1 for regular text, 3.0:1 for large text & UI"
                      >
                        AA
                      </span>
                    </th>
                    <th className="pb-3 font-bold text-zinc-800 dark:text-zinc-200 text-sm text-center">
                      <span
                        className="border-b border-dotted border-zinc-400 dark:border-zinc-500 cursor-help"
                        title="WCAG Level AAA: 7.0:1 for regular text, 4.5:1 for large text"
                      >
                        AAA
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/80 dark:divide-white/[0.06]">
                  {/* Large Text */}
                  <tr>
                    <td className="py-3.5 text-zinc-800 dark:text-zinc-200">
                      <span
                        className="border-b border-dotted border-zinc-400 dark:border-zinc-500 cursor-help"
                        title="18pt (24px) or 14pt (18.66px) bold"
                      >
                        Large text
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      {audit.largeTextAA ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#107c41] dark:text-emerald-400">
                          <span>Pass</span>
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                          <span>Fail</span>
                          <XCircle className="h-4 w-4" />
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      {audit.largeTextAAA ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#107c41] dark:text-emerald-400">
                          <span>Pass</span>
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                          <span>Fail</span>
                          <XCircle className="h-4 w-4" />
                        </span>
                      )}
                    </td>
                  </tr>

                  {/* Small Text */}
                  <tr>
                    <td className="py-3.5 text-zinc-800 dark:text-zinc-200">
                      <span
                        className="border-b border-dotted border-zinc-400 dark:border-zinc-500 cursor-help"
                        title="Standard body text below 18pt"
                      >
                        Small text
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      {audit.normalTextAA ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#107c41] dark:text-emerald-400">
                          <span>Pass</span>
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                          <span>Fail</span>
                          <XCircle className="h-4 w-4" />
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      {audit.normalTextAAA ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#107c41] dark:text-emerald-400">
                          <span>Pass</span>
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                          <span>Fail</span>
                          <XCircle className="h-4 w-4" />
                        </span>
                      )}
                    </td>
                  </tr>

                  {/* Graphics and UI */}
                  <tr>
                    <td className="py-3.5 text-zinc-800 dark:text-zinc-200">
                      <span
                        className="border-b border-dotted border-zinc-400 dark:border-zinc-500 cursor-help"
                        title="Icons, input borders, buttons, and visual state indicators"
                      >
                        Graphics and UI
                      </span>
                    </td>
                    <td className="py-3.5 text-center">
                      {audit.graphicComponentsAA ? (
                        <span className="inline-flex items-center gap-1.5 font-medium text-[#107c41] dark:text-emerald-400">
                          <span>Pass</span>
                          <CheckCircle2 className="h-4 w-4" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 font-medium text-rose-600 dark:text-rose-400">
                          <span>Fail</span>
                          <XCircle className="h-4 w-4" />
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 text-center">
                      <span className="font-mono text-zinc-400 dark:text-zinc-500">N/A</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* SubTab 2: Contrast Suggestions */}
          {activeSubTab === 'suggestions' && (
            <div className="space-y-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-4">
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block">
                Automatic Accessible Harmonization
              </span>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Preserves exact hue and saturation while recalibrating perceptual luminance to meet standards.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleApplyAA}
                  className="flex items-center gap-1.5 rounded-full bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-950 px-4 py-2 text-xs font-semibold transition-all hover:scale-105 cursor-pointer shadow-xs"
                >
                  <Wand2 className="h-3.5 w-3.5 text-amber-400 dark:text-amber-600" />
                  <span>Apply AA Pass (4.5 : 1)</span>
                </button>

                <button
                  type="button"
                  onClick={handleApplyAAA}
                  className="flex items-center gap-1.5 rounded-full bg-[#107c41] text-white px-4 py-2 text-xs font-semibold transition-all hover:scale-105 cursor-pointer shadow-xs"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Apply AAA Pass (7.0 : 1)</span>
                </button>
              </div>
            </div>
          )}

          {/* SubTab 3: Set a Contrast Ratio */}
          {activeSubTab === 'set-ratio' && (
            <div className="space-y-4 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                  Target Contrast Ratio: {targetRatio}:1
                </span>
                <span className="font-mono text-[11px] text-zinc-500">Range: 3.0 to 14.0</span>
              </div>
              <input
                type="range"
                min="3.0"
                max="14.0"
                step="0.5"
                value={targetRatio}
                onChange={(e) => handleSolveTargetRatio(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex items-center gap-2 pt-1">
                {[3.0, 4.5, 7.0, 10.0, 14.0].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleSolveTargetRatio(r)}
                    className={`rounded-full px-3 py-1 text-xs font-mono transition-all cursor-pointer ${
                      targetRatio === r
                        ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold shadow-xs'
                        : 'border border-zinc-300 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {r}:1
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Real-time Live Rendering Preview Box (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block">
            Live Rendering Preview
          </label>
          <div
            className="rounded-3xl p-6 sm:p-7 border border-zinc-300 dark:border-white/10 shadow-lg space-y-4 transition-colors duration-200 min-h-[260px] flex flex-col justify-between"
            style={{ backgroundColor: bgColor, color: fgColor }}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider opacity-70">
                  WCAG Preview Box
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full border border-current shadow-xs">
                  {audit.ratio}:1
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                Architectural Clarity
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                Large headline and body text preview. High-contrast typography guarantees effortless legibility under varying ambient lighting conditions.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                className="px-4 py-1.5 rounded-full text-xs font-semibold border border-current shadow-xs hover:opacity-90 transition-opacity"
              >
                CTA Action
              </button>
              <span className="font-mono text-[10px] opacity-80">APCA Lc {audit.apca}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Compare Entire Palette Matrix (Collapsible) */}
      {showEntirePalette && (
        <div className="pt-6 border-t border-zinc-200 dark:border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Palette Cross-Contrast Matrix
            </span>
            <span className="text-[11px] text-zinc-500">
              Matrix of all pairwise color combinations in current palette
            </span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-white/10 p-3 bg-zinc-50/50 dark:bg-zinc-900/30">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {currentPalette.map((c1, i) =>
                currentPalette.map((c2, j) => {
                  if (i >= j) return null;
                  const pairAudit = auditContrast(c1, c2);
                  return (
                    <div
                      key={`${i}-${j}`}
                      onClick={() => {
                        setFgColor(c1.toUpperCase());
                        setBgColor(c2.toUpperCase());
                      }}
                      className="rounded-xl border border-zinc-200 dark:border-white/10 p-2.5 space-y-1.5 cursor-pointer hover:scale-102 transition-transform shadow-xs"
                      style={{ backgroundColor: c2, color: c1 }}
                      title="Click to load into live contrast analyzer"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold">
                        <span>
                          #{i + 1} on #{j + 1}
                        </span>
                        <span>{pairAudit.ratio}:1</span>
                      </div>
                      <p className="text-[11px] font-semibold truncate">Sample Text</p>
                      <span
                        className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-mono font-bold ${
                          pairAudit.normalTextAA
                            ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                            : 'bg-rose-500/20 text-rose-600 dark:text-rose-400'
                        }`}
                      >
                        {pairAudit.normalTextAA ? 'AA ✓' : 'FAIL'}
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Part 2: 4-Column Color Blindness Simulation Matrix */}
      <div className="pt-6 border-t border-zinc-200 dark:border-white/[0.08] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase font-mono">
              Color Blindness Matrix (Brettel-Vienot Simulation)
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Evaluates deficiency collision conflicts across red, green, and blue cone anomalies.
            </p>
          </div>

          {/* Collision Alert Indicator */}
          {collisions.length > 0 ? (
            <div className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-amber-600 dark:text-amber-400 text-xs font-medium">
              <AlertTriangle className="h-3.5 w-3.5" />
              <span>{collisions.length} Perceptual Collision(s) Detected</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Zero Collisions — 100% Safe</span>
            </div>
          )}
        </div>

        {/* 4-Column deficiency comparison table */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { id: 'normal', name: 'Original', desc: 'Standard Trichromatic' },
            { id: 'deuteranopia', name: 'Deuteranopia', desc: 'Green-Weak (~6% males)' },
            { id: 'protanopia', name: 'Protanopia', desc: 'Red-Weak (~2% males)' },
            { id: 'tritanopia', name: 'Tritanopia', desc: 'Blue-Weak (<1% rare)' },
          ].map((col) => (
            <div
              key={col.id}
              className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/70 dark:bg-zinc-900/40 p-4 space-y-3"
            >
              <div>
                <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 block">
                  {col.name}
                </span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-mono">
                  {col.desc}
                </span>
              </div>

              {/* Swatch chips simulated in this deficiency */}
              <div className="space-y-1.5">
                {currentPalette.map((hex, idx) => {
                  const simHex = simulateHexColorBlindness(hex, col.id as VisionDeficiency);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl p-1.5 border border-zinc-200/80 dark:border-white/5 bg-white dark:bg-zinc-950"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-5 w-5 rounded-full border border-black/10 shadow-xs"
                          style={{ backgroundColor: simHex }}
                        />
                        <span className="font-mono text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
                          {simHex.toUpperCase()}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-400">
                        #{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
