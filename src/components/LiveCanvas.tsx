import {
  Check,
  Copy,
  Grid,
  Maximize2,
  Minimize2,
  Moon,
  Sun,
} from 'lucide-react';
import React, { useState } from 'react';
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
  const [fullscreen, setFullscreen] = useState(false);

  // Backdrop styling
  const backdropStyles = {
    dark: 'bg-slate-950 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]',
    light: 'bg-slate-100 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px]',
    checker: 'bg-[repeating-conic-gradient(#1e293b_0%_25%,#0f172a_0%_50%)] [background-size:24px_24px]',
  }[backdrop];

  // Build Shadow CSS
  const shadowCss = shadows
    .map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
    .join(', ');

  // Neumorphic box shadows
  const neuOffset = neu.distance;
  const neuBlur = neu.blur;
  const neuShadow =
    neu.shape === 'pressed'
      ? `inset ${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.4), inset -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.1)`
      : `${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.5), -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.08)`;

  return (
    <div
      className={`relative flex flex-col items-center justify-center rounded-2xl border border-slate-800 transition-all ${backdropStyles} ${
        fullscreen ? 'fixed inset-0 z-50 rounded-none' : 'min-h-[380px] w-full p-6 shadow-2xl'
      }`}
    >
      {/* Top Toolbar inside Canvas */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/90 p-1 backdrop-blur-md z-10 shadow-md">
        <button
          type="button"
          onClick={() => setBackdrop('dark')}
          className={`rounded-md p-1.5 transition-all cursor-pointer ${
            backdrop === 'dark' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
          title="Dark Grid"
        >
          <Moon className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setBackdrop('light')}
          className={`rounded-md p-1.5 transition-all cursor-pointer ${
            backdrop === 'light' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
          title="Light Grid"
        >
          <Sun className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={() => setBackdrop('checker')}
          className={`rounded-md p-1.5 transition-all cursor-pointer ${
            backdrop === 'checker' ? 'bg-slate-800 text-white' : 'text-slate-400 hover:text-white'
          }`}
          title="Transparency Checkerboard"
        >
          <Grid className="h-3.5 w-3.5" />
        </button>

        <button
          type="button"
          onClick={onCopyCss}
          className="flex items-center gap-1 rounded-md bg-indigo-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-xs transition-all hover:bg-indigo-500 cursor-pointer"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span>{copied ? 'Copied' : 'CSS'}</span>
        </button>

        <button
          type="button"
          onClick={() => setFullscreen(!fullscreen)}
          className="rounded-md p-1.5 text-slate-400 hover:text-white transition-all cursor-pointer"
          title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen Canvas'}
        >
          {fullscreen ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
        </button>
      </div>

      {/* DYNAMIC PREVIEW BASED ON ACTIVE MODE */}

      {/* 1. GRADIENT MODE */}
      {(mode === 'gradient' || mode === 'palettes') && (
        <div
          className="h-64 w-full max-w-lg rounded-2xl border border-white/10 shadow-2xl transition-all duration-300 sm:h-80"
          style={{ background: gradientCss }}
        />
      )}

      {/* 2. GLASSMORPHISM MODE */}
      {mode === 'glassmorphism' && (
        <div className="relative flex items-center justify-center">
          {/* Background decorative glowing circles behind the glass */}
          <div className="absolute -top-12 -left-12 h-36 w-36 rounded-full bg-indigo-500/80 blur-2xl animate-pulse" />
          <div className="absolute -bottom-10 -right-10 h-36 w-36 rounded-full bg-pink-500/80 blur-2xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-full bg-cyan-400/80 blur-xl" />

          {/* Frosted Glass Card */}
          <div
            className="relative z-10 flex flex-col justify-between p-6 transition-all"
            style={{
              width: '320px',
              height: '200px',
              backdropFilter: `blur(${glass.blur}px)`,
              WebkitBackdropFilter: `blur(${glass.blur}px)`,
              backgroundColor: `rgba(255, 255, 255, ${glass.opacity / 100})`,
              border: `${glass.borderWidth}px solid ${glass.borderColor}`,
              borderRadius: `${glass.borderRadius}px`,
              boxShadow: glass.hasShadow ? '0 8px 32px 0 rgba(0, 0, 0, 0.37)' : 'none',
            }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-white">Glassmorphism</span>
              <span className="h-3 w-3 rounded-full bg-emerald-400 shadow-xs" />
            </div>
            <p className="text-xs text-white/90 font-medium">
              Real-time backdrop optical blur with frosted glass refractions.
            </p>
            <div className="flex justify-between items-center text-[10px] text-white/75 font-mono">
              <span>blur({glass.blur}px)</span>
              <span>opacity: {glass.opacity}%</span>
            </div>
          </div>
        </div>
      )}

      {/* 3. NEUMORPHISM MODE */}
      {mode === 'neumorphism' && (
        <div
          className="flex flex-col items-center justify-center p-6 transition-all"
          style={{
            width: `${neu.size}px`,
            height: `${neu.size}px`,
            backgroundColor: neu.baseColor,
            borderRadius: `${neu.radius}px`,
            boxShadow: neuShadow,
          }}
        >
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Soft UI
          </span>
          <span className="mt-1 font-mono text-[10px] text-slate-500 capitalize">
            {neu.shape}
          </span>
        </div>
      )}

      {/* 4. BOX SHADOWS MODE */}
      {mode === 'shadow' && (
        <div
          className="flex h-56 w-56 items-center justify-center rounded-2xl bg-slate-900 border border-slate-800 transition-all"
          style={{ boxShadow: shadowCss }}
        >
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
            Box Shadow
          </span>
        </div>
      )}

      {/* 5. BUTTONS MODE */}
      {mode === 'button' && (
        <button
          type="button"
          className="relative font-bold transition-all transform hover:scale-105 active:scale-95 cursor-pointer shadow-xl overflow-hidden group"
          style={{
            background: `linear-gradient(${btn.gradientAngle}deg, ${btn.colorStart}, ${btn.colorEnd})`,
            color: btn.textColor,
            borderRadius: `${btn.borderRadius}px`,
            padding: `${btn.paddingY}px ${btn.paddingX}px`,
            fontSize: `${btn.fontSize}px`,
          }}
        >
          {btn.hoverEffect === 'shine' && (
            <span className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full transition-transform duration-700 group-hover:translate-x-[300%]" />
          )}
          <span>{btn.text}</span>
        </button>
      )}

      {/* 6. TEXT GRADIENT MODE */}
      {mode === 'text' && (
        <h2
          className="text-center font-black transition-all max-w-lg leading-tight select-text"
          style={{
            background: `linear-gradient(${textGrad.angle}deg, ${textGrad.colorStart}, ${textGrad.colorMiddle}, ${textGrad.colorEnd})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontSize: `${textGrad.fontSize}px`,
            fontWeight: textGrad.fontWeight,
            textShadow: textGrad.hasShadow ? '0 10px 25px rgba(0,0,0,0.5)' : 'none',
          }}
        >
          {textGrad.text}
        </h2>
      )}
    </div>
  );
}
