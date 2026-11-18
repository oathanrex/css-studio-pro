import { Check, Code2, Copy, FileCode } from 'lucide-react';
import React, { useState } from 'react';
import { buildSvgGradient, buildTailwindCss } from '../engine/gradientEngine';
import type {
  ButtonState,
  GlassmorphismState,
  GradientState,
  NeumorphismState,
  ShadowLayer,
  TextGradientState,
  ToolMode,
} from '../types';

interface CodeExportPanelProps {
  mode: ToolMode;
  gradient: GradientState;
  gradientCss: string;
  glass: GlassmorphismState;
  neu: NeumorphismState;
  shadows: ShadowLayer[];
  btn: ButtonState;
  textGrad: TextGradientState;
}

export function CodeExportPanel({
  mode,
  gradient,
  gradientCss,
  glass,
  neu,
  shadows,
  btn,
  textGrad,
}: CodeExportPanelProps) {
  const [activeFormat, setActiveFormat] = useState<'css' | 'tailwind' | 'react' | 'svg'>('css');
  const [copied, setCopied] = useState(false);

  // Generate CSS based on mode
  let rawCss = `background: ${gradientCss};`;
  let tailwindCode = buildTailwindCss(gradient);
  let reactStyleCode = `style={{ background: '${gradientCss}' }}`;

  if (mode === 'glassmorphism') {
    rawCss = `background: rgba(255, 255, 255, ${glass.opacity / 100});
backdrop-filter: blur(${glass.blur}px);
-webkit-backdrop-filter: blur(${glass.blur}px);
border: ${glass.borderWidth}px solid ${glass.borderColor};
border-radius: ${glass.borderRadius}px;
${glass.hasShadow ? 'box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);' : ''}`;

    tailwindCode = `backdrop-blur-[${glass.blur}px] bg-white/${glass.opacity} border border-white/20 rounded-[${glass.borderRadius}px] shadow-lg`;
    reactStyleCode = `style={{
  backgroundColor: 'rgba(255, 255, 255, ${glass.opacity / 100})',
  backdropFilter: 'blur(${glass.blur}px)',
  WebkitBackdropFilter: 'blur(${glass.blur}px)',
  borderRadius: '${glass.borderRadius}px'
}}`;
  } else if (mode === 'neumorphism') {
    const neuOffset = neu.distance;
    const neuBlur = neu.blur;
    const shadowVal =
      neu.shape === 'pressed'
        ? `inset ${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.4), inset -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.1)`
        : `${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.5), -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.08)`;

    rawCss = `background: ${neu.baseColor};
border-radius: ${neu.radius}px;
box-shadow: ${shadowVal};`;
    tailwindCode = `bg-[${neu.baseColor}] rounded-[${neu.radius}px] shadow-[${shadowVal.replace(/\s+/g, '_')}]`;
    reactStyleCode = `style={{
  background: '${neu.baseColor}',
  borderRadius: '${neu.radius}px',
  boxShadow: '${shadowVal}'
}}`;
  } else if (mode === 'shadow') {
    const shadowStr = shadows
      .map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`)
      .join(', ');
    rawCss = `box-shadow: ${shadowStr};`;
    tailwindCode = `shadow-[${shadowStr.replace(/\s+/g, '_')}]`;
    reactStyleCode = `style={{ boxShadow: '${shadowStr}' }}`;
  } else if (mode === 'button') {
    rawCss = `background: linear-gradient(${btn.gradientAngle}deg, ${btn.colorStart}, ${btn.colorEnd});
color: ${btn.textColor};
border-radius: ${btn.borderRadius}px;
padding: ${btn.paddingY}px ${btn.paddingX}px;
font-size: ${btn.fontSize}px;
border: none;
cursor: pointer;
transition: transform 0.2s ease;`;
    tailwindCode = `bg-gradient-to-r from-[${btn.colorStart}] to-[${btn.colorEnd}] text-[${btn.textColor}] rounded-[${btn.borderRadius}px] px-6 py-2.5`;
    reactStyleCode = `style={{
  background: 'linear-gradient(${btn.gradientAngle}deg, ${btn.colorStart}, ${btn.colorEnd})',
  color: '${btn.textColor}',
  borderRadius: '${btn.borderRadius}px'
}}`;
  } else if (mode === 'text') {
    rawCss = `background: linear-gradient(${textGrad.angle}deg, ${textGrad.colorStart}, ${textGrad.colorMiddle}, ${textGrad.colorEnd});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: ${textGrad.fontSize}px;
font-weight: ${textGrad.fontWeight};`;
    tailwindCode = `bg-gradient-to-r from-[${textGrad.colorStart}] via-[${textGrad.colorMiddle}] to-[${textGrad.colorEnd}] bg-clip-text text-transparent`;
    reactStyleCode = `style={{
  background: 'linear-gradient(${textGrad.angle}deg, ${textGrad.colorStart}, ${textGrad.colorMiddle}, ${textGrad.colorEnd})',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent'
}}`;
  }

  const svgCode = buildSvgGradient(gradient);

  // Active Code Payload
  const getPayload = () => {
    switch (activeFormat) {
      case 'css':
        return rawCss;
      case 'tailwind':
        return tailwindCode;
      case 'react':
        return reactStyleCode;
      case 'svg':
        return svgCode;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getPayload()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-indigo-400" />
          <h3 className="text-sm font-bold text-white">Export Production Code</h3>
        </div>

        {/* Format Switcher */}
        <div className="flex items-center rounded-lg border border-slate-800 bg-slate-950 p-0.5">
          <button
            type="button"
            onClick={() => setActiveFormat('css')}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              activeFormat === 'css' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            CSS
          </button>
          <button
            type="button"
            onClick={() => setActiveFormat('tailwind')}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              activeFormat === 'tailwind' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tailwind CSS
          </button>
          <button
            type="button"
            onClick={() => setActiveFormat('react')}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
              activeFormat === 'react' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
            }`}
          >
            React Style
          </button>
          {mode === 'gradient' && (
            <button
              type="button"
              onClick={() => setActiveFormat('svg')}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-all cursor-pointer ${
                activeFormat === 'svg' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              SVG
            </button>
          )}
        </div>
      </div>

      {/* Code Display Area */}
      <div className="relative">
        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-2.5 right-2.5 flex items-center gap-1.5 rounded-md bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-all hover:bg-slate-700 cursor-pointer shadow-sm"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Code'}</span>
        </button>

        <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono leading-relaxed text-emerald-400/95 select-all">
          <code>{getPayload()}</code>
        </pre>
      </div>
    </div>
  );
}
