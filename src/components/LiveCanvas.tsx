import {
  Check,
  Copy,
  Eye,
  Maximize2,
  Minimize2,
  Moon,
  Sparkles,
  Sun,
} from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { calculateWcagContrast } from '../engine/gradientEngine';
import type {
  ButtonState,
  GlassmorphismState,
  GradientState,
  NeumorphismState,
  ShadowLayer,
  TextGradientState,
  ToolMode,
} from '../types';

interface LiveCanvasProps {
  mode: ToolMode;
  gradient: GradientState;
  gradientCss: string;
  glass: GlassmorphismState;
  neu: NeumorphismState;
  shadows: ShadowLayer[];
  btn: ButtonState;
  textGrad: TextGradientState;
  onCopyCss: () => void;
  copied: boolean;
}

export function LiveCanvas({
  mode,
  gradient,
  gradientCss,
  glass,
  neu,
  shadows,
  btn,
  textGrad,
  onCopyCss,
  copied,
}: LiveCanvasProps) {
  const [backdrop, setBackdrop] = useState<'dark' | 'light' | 'checker'>('dark');
  const [aspectRatio, setAspectRatio] = useState<'fluid' | '16:9' | '9:16' | '1:1'>('fluid');
  const [fullscreen, setFullscreen] = useState(false);

  // Backdrop styling
  const backdropClasses = {
    dark: 'canvas-grid-dark',
    light: 'canvas-grid-light',
    checker: 'canvas-checkerboard',
  }[backdrop];

  // Aspect ratio styling
  const aspectClass = {
    fluid: 'w-full min-h-[380px]',
    '16:9': 'w-full aspect-[16/9] max-w-4xl',
    '9:16': 'w-[280px] aspect-[9/16]',
    '1:1': 'w-[360px] aspect-square',
  }[aspectRatio];

  // WCAG Accessibility calculation
  const wcag = useMemo(() => calculateWcagContrast(gradient.stops), [gradient.stops]);

  // Build Shadow CSS
  const shadowCss = shadows
    .map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
    .join(', ');

  // Neumorphic box shadows
  const neuOffset = neu.distance;
  const neuBlur = neu.blur;
  const neuShadow =
    neu.shape === 'pressed'
      ? `inset ${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.6), inset -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.06)`
      : `${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.6), -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.05)`;

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-3xl border border-zinc-200 dark:border-white/[0.08] transition-all overflow-hidden ${backdropClasses} ${
        fullscreen ? 'fixed inset-0 z-50 rounded-none' : 'min-h-[420px] w-full p-6 shadow-xl dark:shadow-2xl'
      }`}
    >
      {/* Precision CAD Crosshair Markers */}
      <span className="absolute top-3 left-3 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 select-none">+ 0,0</span>
      <span className="absolute bottom-3 left-3 font-mono text-[10px] text-zinc-400 dark:text-zinc-600 select-none">✕ CANVAS</span>

      {/* Floating Precision Toolbar */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-zinc-200 dark:border-white/[0.08] bg-white/90 dark:bg-zinc-950/90 p-1 backdrop-blur-xl z-20 shadow-lg">
        {/* Aspect Ratio Switcher */}
        {mode === 'gradient' && (
          <div className="flex items-center gap-0.5 border-r border-zinc-200 dark:border-white/10 pr-1.5 mr-0.5">
            {(['fluid', '16:9', '9:16', '1:1'] as const).map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => setAspectRatio(ratio)}
                className={`rounded-full px-2.5 py-1 text-[10px] font-mono font-medium transition-all cursor-pointer ${
                  aspectRatio === ratio
                    ? 'bg-zinc-900 dark:bg-zinc-800 text-white shadow-xs'
                    : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
                title={`Aspect Ratio: ${ratio}`}
              >
                {ratio}
              </button>
            ))}
          </div>
        )}

        {/* Backdrop Switchers */}
        <div className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => setBackdrop('dark')}
            className={`rounded-full p-1.5 transition-all cursor-pointer ${
              backdrop === 'dark' ? 'bg-zinc-900 dark:bg-zinc-800 text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
            title="Obsidian Grid"
          >
            <Moon className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setBackdrop('light')}
            className={`rounded-full p-1.5 transition-all cursor-pointer ${
              backdrop === 'light' ? 'bg-zinc-900 dark:bg-zinc-800 text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
            title="Clean Light Grid"
          >
            <Sun className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={() => setBackdrop('checker')}
            className={`rounded-full p-1.5 transition-all cursor-pointer ${
              backdrop === 'checker' ? 'bg-zinc-900 dark:bg-zinc-800 text-white' : 'text-zinc-500 hover:text-black dark:hover:text-white'
            }`}
            title="Alpha Transparency"
          >
            <span className="font-mono text-[10px] font-bold">▦</span>
          </button>
        </div>

        {/* Fullscreen Mode */}
        <div className="border-l border-zinc-200 dark:border-white/10 pl-1.5 ml-0.5">
          <button
            type="button"
            onClick={() => setFullscreen(!fullscreen)}
            className="rounded-full p-1.5 text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-all cursor-pointer"
            title={fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
          >
            {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport Area */}
      <div className={`relative flex items-center justify-center transition-all ${aspectClass}`}>
        {/* Mode 1: Gradients */}
        {mode === 'gradient' && (
          <div
            className="relative h-full w-full rounded-2xl border border-white/10 shadow-2xl transition-all duration-300"
            style={{ background: gradientCss }}
          >
            {/* Live Color Space Indicator */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded-lg bg-zinc-950/80 px-2.5 py-1 text-[10px] font-mono text-zinc-300 backdrop-blur-md border border-white/10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{gradient.colorSpace ? gradient.colorSpace.toUpperCase() : 'OKLCH'}</span>
              <span className="text-zinc-600">|</span>
              <span>{gradient.type.toUpperCase()}</span>
            </div>
          </div>
        )}

        {/* Mode 2: Glassmorphism */}
        {mode === 'glassmorphism' && (
          <div
            className="relative flex h-full min-h-[300px] w-full items-center justify-center rounded-2xl p-8"
            style={{
              background:
                'radial-gradient(circle at 20% 30%, #1e293b 0%, transparent 60%), radial-gradient(circle at 80% 70%, #0f172a 0%, #020617 100%)',
            }}
          >
            {/* Background geometric shapes to highlight blur refraction */}
            <div className="absolute top-12 left-16 h-36 w-36 rounded-full bg-gradient-to-tr from-amber-500/30 to-rose-500/30 blur-xl" />
            <div className="absolute bottom-12 right-20 h-44 w-44 rounded-full bg-gradient-to-tr from-teal-500/20 to-sky-500/20 blur-2xl" />

            {/* Frosted Glass Card */}
            <div
              className="relative z-10 flex max-w-sm flex-col gap-4 p-6 transition-all"
              style={{
                backgroundColor: `rgba(255, 255, 255, ${glass.opacity / 100})`,
                backdropFilter: `blur(${glass.blur}px)`,
                WebkitBackdropFilter: `blur(${glass.blur}px)`,
                border: `${glass.borderWidth}px solid ${glass.borderColor}`,
                borderRadius: `${glass.borderRadius}px`,
                boxShadow: glass.hasShadow ? '0 20px 40px -15px rgba(0, 0, 0, 0.6)' : 'none',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider text-white uppercase">Glass Card</span>
                <span className="h-2 w-2 rounded-full bg-zinc-200" />
              </div>
              <p className="text-xs text-zinc-200 leading-relaxed">
                Optical sub-pixel refraction with real-time hardware compositing.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-zinc-300 font-mono">
                <span>BLUR {glass.blur}px</span>
                <span>OPACITY {glass.opacity}%</span>
              </div>
            </div>
          </div>
        )}

        {/* Mode 3: Neumorphism */}
        {mode === 'neumorphism' && (
          <div
            className="flex h-full min-h-[300px] w-full items-center justify-center rounded-2xl p-10"
            style={{ backgroundColor: neu.baseColor }}
          >
            <div
              className="flex items-center justify-center transition-all cursor-pointer"
              style={{
                width: `${neu.size}px`,
                height: `${neu.size}px`,
                borderRadius: `${neu.radius}px`,
                backgroundColor: neu.baseColor,
                boxShadow: neuShadow,
              }}
            >
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-400">
                {neu.shape}
              </span>
            </div>
          </div>
        )}

        {/* Mode 4: Box Shadows */}
        {mode === 'shadow' && (
          <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-2xl p-10">
            <div
              className="flex h-44 w-72 flex-col items-center justify-center rounded-2xl border border-white/10 bg-zinc-900 p-6 text-center transition-all"
              style={{ boxShadow: shadowCss }}
            >
              <span className="text-sm font-bold text-white tracking-tight">Multi-Layer Elevation</span>
              <span className="mt-1 font-mono text-[11px] text-zinc-400">
                {shadows.length} Stacking Layers
              </span>
            </div>
          </div>
        )}

        {/* Mode 5: Button */}
        {mode === 'button' && (
          <div className="flex h-full min-h-[300px] w-full items-center justify-center rounded-2xl p-10">
            <button
              type="button"
              className={`group relative overflow-hidden transition-all duration-300 cursor-pointer font-semibold tracking-tight ${
                btn.hoverEffect === 'scale' ? 'hover:scale-105 active:scale-95' : ''
              } ${btn.hoverEffect === 'lift' ? 'hover:-translate-y-1 shadow-xl' : ''}`}
              style={{
                background: `linear-gradient(${btn.gradientAngle}deg, ${btn.colorStart}, ${btn.colorEnd})`,
                color: btn.textColor,
                borderRadius: `${btn.borderRadius}px`,
                padding: `${btn.paddingY}px ${btn.paddingX}px`,
                fontSize: `${btn.fontSize}px`,
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
              }}
            >
              {btn.hoverEffect === 'shine' && (
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              )}
              <span className="relative z-10">{btn.text}</span>
            </button>
          </div>
        )}

        {/* Mode 6: Typography / Text Gradient */}
        {mode === 'text' && (
          <div className="flex h-full min-h-[300px] w-full items-center justify-center p-8 text-center">
            <h1
              className="transition-all tracking-tight"
              style={{
                backgroundImage: `linear-gradient(${textGrad.angle}deg, ${textGrad.colorStart}, ${textGrad.colorMiddle}, ${textGrad.colorEnd})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: `${textGrad.fontSize}px`,
                fontWeight: textGrad.fontWeight,
                filter: textGrad.hasShadow ? 'drop-shadow(0 4px 20px rgba(0, 0, 0, 0.6))' : 'none',
              }}
            >
              {textGrad.text}
            </h1>
          </div>
        )}
      </div>

      {/* WCAG Contrast Inspector Bar (Bottom) */}
      {mode === 'gradient' && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 w-full border-t border-zinc-200 dark:border-white/[0.06] pt-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Eye className="h-3.5 w-3.5 text-zinc-500" />
              <span>WCAG 2.1 Contrast:</span>
            </span>

            {/* White Text Score */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-zinc-300">White: {wcag.whiteContrast}:1</span>
              <span
                className={`rounded px-1.5 py-0.2 text-[9px] font-mono font-bold ${
                  wcag.whiteLevel === 'AAA'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : wcag.whiteLevel === 'AA'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {wcag.whiteLevel}
              </span>
            </div>

            {/* Black Text Score */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[11px] text-zinc-300">Black: {wcag.blackContrast}:1</span>
              <span
                className={`rounded px-1.5 py-0.2 text-[9px] font-mono font-bold ${
                  wcag.blackLevel === 'AAA'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : wcag.blackLevel === 'AA'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                }`}
              >
                {wcag.blackLevel}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onCopyCss}
            className="flex items-center gap-1 font-mono text-[11px] text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-3 w-3 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard</span>
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                <span>Click to Copy CSS</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
