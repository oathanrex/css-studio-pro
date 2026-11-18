import { Check, Code2, Copy, FileCode } from 'lucide-react';
import React, { useState } from 'react';
import {
  buildAndroidXml,
  buildFlutterCode,
  buildSvgGradient,
  buildTailwindCss,
} from '../engine/gradientEngine';
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
  const [activeFormat, setActiveFormat] = useState<
    'css' | 'tailwind' | 'react' | 'svg' | 'flutter' | 'android'
  >('css');
  const [copied, setCopied] = useState(false);

  // Generate CSS based on mode
  let rawCss = `background: ${gradientCss};`;
  let tailwindCode = buildTailwindCss(gradient);
  let reactStyleCode = `style={{ background: '${gradientCss}' }}`;
  let svgCode = buildSvgGradient(gradient);
  let flutterCode = buildFlutterCode(gradient);
  let androidCode = buildAndroidXml(gradient);

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
        ? `inset ${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.6), inset -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.06)`
        : `${neuOffset}px ${neuOffset}px ${neuBlur}px rgba(0,0,0,0.6), -${neuOffset}px -${neuOffset}px ${neuBlur}px rgba(255,255,255,0.05)`;

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
padding: ${btn.paddingY}px ${btn.paddingX}px;
border-radius: ${btn.borderRadius}px;
font-size: ${btn.fontSize}px;
border: 1px solid rgba(255, 255, 255, 0.15);
cursor: pointer;
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`;
    tailwindCode = `bg-gradient-to-r from-[${btn.colorStart}] to-[${btn.colorEnd}] text-white px-[${btn.paddingX}px] py-[${btn.paddingY}px] rounded-[${btn.borderRadius}px] font-semibold transition-all hover:scale-105`;
    reactStyleCode = `style={{
  background: 'linear-gradient(${btn.gradientAngle}deg, ${btn.colorStart}, ${btn.colorEnd})',
  color: '${btn.textColor}',
  padding: '${btn.paddingY}px ${btn.paddingX}px',
  borderRadius: '${btn.borderRadius}px'
}}`;
  } else if (mode === 'text') {
    rawCss = `background-image: linear-gradient(${textGrad.angle}deg, ${textGrad.colorStart}, ${textGrad.colorMiddle}, ${textGrad.colorEnd});
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
font-size: ${textGrad.fontSize}px;
font-weight: ${textGrad.fontWeight};`;
    tailwindCode = `bg-gradient-to-r from-[${textGrad.colorStart}] via-[${textGrad.colorMiddle}] to-[${textGrad.colorEnd}] bg-clip-text text-transparent text-[${textGrad.fontSize}px] font-black`;
    reactStyleCode = `style={{
  backgroundImage: 'linear-gradient(${textGrad.angle}deg, ${textGrad.colorStart}, ${textGrad.colorMiddle}, ${textGrad.colorEnd})',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontSize: '${textGrad.fontSize}px',
  fontWeight: ${textGrad.fontWeight}
}}`;
  }

  // Active code string
  const activeCodeMap: Record<string, string> = {
    css: rawCss,
    tailwind: tailwindCode,
    react: reactStyleCode,
    svg: svgCode,
    flutter: flutterCode,
    android: androidCode,
  };

  const activeSnippet = activeCodeMap[activeFormat] || rawCss;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-5 sm:p-6 shadow-lg dark:shadow-xl transition-colors duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-200 dark:border-white/[0.08] pb-3">
        <div className="flex items-center gap-2">
          <Code2 className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Code Exporter
            </h3>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Production-ready syntax for Web, Mobile &amp; Vector.
            </p>
          </div>
        </div>

        {/* Format Selector Pills */}
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
          {[
            { id: 'css', label: 'CSS' },
            { id: 'tailwind', label: 'Tailwind' },
            { id: 'react', label: 'React JSX' },
            { id: 'svg', label: 'SVG' },
            { id: 'flutter', label: 'Flutter' },
            { id: 'android', label: 'Android' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setActiveFormat(f.id as any)}
              className={`rounded-full px-3 py-1 text-[11px] font-mono font-medium transition-all cursor-pointer ${
                activeFormat === f.id
                  ? 'bg-zinc-900 dark:bg-zinc-800 text-white font-semibold border border-zinc-800 dark:border-white/10 shadow-xs'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-black dark:hover:text-zinc-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Code Snippet Box */}
      <div className="relative rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-[#050608] p-4">
        <pre className="font-mono text-xs leading-relaxed text-zinc-800 dark:text-zinc-300 overflow-x-auto select-all max-h-48 scrollbar-none">
          <code>{activeSnippet}</code>
        </pre>

        <button
          type="button"
          onClick={handleCopy}
          className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-white/10 bg-white/95 dark:bg-zinc-900/90 px-3.5 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-all hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shadow-md"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-emerald-500 font-semibold">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
              <span>Copy Code</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
