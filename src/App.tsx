import React, { useMemo, useState } from 'react';
import { ButtonControls } from './components/ButtonControls';
import { CodeExportPanel } from './components/CodeExportPanel';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GlassmorphismControls } from './components/GlassmorphismControls';
import { GradientControls } from './components/GradientControls';
import { LiveCanvas } from './components/LiveCanvas';
import { Navbar } from './components/Navbar';
import { NeumorphismControls } from './components/NeumorphismControls';
import { SeoEducationalContent } from './components/SeoEducationalContent';
import { ShadowControls } from './components/ShadowControls';
import { TextGradientControls } from './components/TextGradientControls';
import { TrendingPalettesGrid } from './components/TrendingPalettesGrid';
import { buildGradientCss, generateRandomGradient } from './engine/gradientEngine';
import { exportGradientToPng } from './engine/pngExporter';
import type {
  ButtonState,
  GlassmorphismState,
  GradientState,
  NeumorphismState,
  PalettePreset,
  ShadowLayer,
  TextGradientState,
  ToolMode,
} from './types';

export default function App() {
  const [activeMode, setActiveMode] = useState<ToolMode>('gradient');
  const [copied, setCopied] = useState(false);

  // Gradient State
  const [gradient, setGradient] = useState<GradientState>({
    type: 'linear',
    angle: 135,
    radialShape: 'circle',
    radialPosition: 'center',
    stops: [
      { id: '1', color: '#f72585', position: 0 },
      { id: '2', color: '#7209b7', position: 50 },
      { id: '3', color: '#4361ee', position: 100 },
    ],
  });

  // Glassmorphism State
  const [glass, setGlass] = useState<GlassmorphismState>({
    blur: 16,
    opacity: 18,
    color: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderRadius: 16,
    hasShadow: true,
  });

  // Neumorphism State
  const [neu, setNeu] = useState<NeumorphismState>({
    shape: 'flat',
    size: 200,
    radius: 32,
    distance: 14,
    blur: 28,
    baseColor: '#0f172a',
  });

  // Box Shadow State
  const [shadows, setShadows] = useState<ShadowLayer[]>([
    { id: '1', x: 0, y: 10, blur: 25, spread: -5, color: 'rgba(0, 0, 0, 0.4)', inset: false },
    { id: '2', x: 0, y: 8, blur: 10, spread: -6, color: 'rgba(0, 0, 0, 0.2)', inset: false },
  ]);

  // Button State
  const [btn, setBtn] = useState<ButtonState>({
    text: 'Explore Universe 🚀',
    gradientAngle: 90,
    colorStart: '#4f46e5',
    colorEnd: '#06b6d4',
    textColor: '#ffffff',
    borderRadius: 12,
    paddingY: 14,
    paddingX: 32,
    fontSize: 15,
    hoverEffect: 'shine',
  });

  // Text Gradient State
  const [textGrad, setTextGrad] = useState<TextGradientState>({
    text: 'Craft The Future With Pure CSS',
    angle: 90,
    colorStart: '#ec4899',
    colorMiddle: '#8b5cf6',
    colorEnd: '#3b82f6',
    fontSize: 48,
    fontWeight: 900,
    hasShadow: true,
  });

  const gradientCss = useMemo(() => buildGradientCss(gradient), [gradient]);

  const handleRandomize = () => {
    setGradient(generateRandomGradient());
  };

  const handleCopyCss = () => {
    let copyPayload = `background: ${gradientCss};`;
    if (activeMode === 'glassmorphism') {
      copyPayload = `background: rgba(255, 255, 255, ${glass.opacity / 100});\nbackdrop-filter: blur(${glass.blur}px);\n-webkit-backdrop-filter: blur(${glass.blur}px);\nborder: ${glass.borderWidth}px solid ${glass.borderColor};\nborder-radius: ${glass.borderRadius}px;\nbox-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;
    } else if (activeMode === 'shadow') {
      const sStr = shadows.map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(', ');
      copyPayload = `box-shadow: ${sStr};`;
    } else if (activeMode === 'button') {
      copyPayload = `background: linear-gradient(${btn.gradientAngle}deg, ${btn.colorStart}, ${btn.colorEnd});\ncolor: ${btn.textColor};\nborder-radius: ${btn.borderRadius}px;\npadding: ${btn.paddingY}px ${btn.paddingX}px;`;
    } else if (activeMode === 'text') {
      copyPayload = `background: linear-gradient(${textGrad.angle}deg, ${textGrad.colorStart}, ${textGrad.colorMiddle}, ${textGrad.colorEnd});\n-webkit-background-clip: text;\n-webkit-text-fill-color: transparent;`;
    }

    navigator.clipboard.writeText(copyPayload).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadPng = () => {
    exportGradientToPng(gradient, 1920, 1080);
  };

  const handleSelectPalette = (preset: PalettePreset) => {
    setGradient({
      type: 'linear',
      angle: preset.angle,
      radialShape: 'circle',
      radialPosition: 'center',
      stops: preset.stops,
    });
    setActiveMode('gradient');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-100">
      <Navbar
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        onRandomize={handleRandomize}
        onCopyCss={handleCopyCss}
        onDownloadPng={handleDownloadPng}
        copied={copied}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
        {/* Top Split Workspace: Live Canvas & Control Studio */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Canvas Preview (7 cols) */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <LiveCanvas
              mode={activeMode}
              gradient={gradient}
              gradientCss={gradientCss}
              glass={glass}
              neu={neu}
              shadows={shadows}
              btn={btn}
              textGrad={textGrad}
              onCopyCss={handleCopyCss}
              copied={copied}
            />

            {/* Code Export Box under canvas */}
            <CodeExportPanel
              mode={activeMode}
              gradient={gradient}
              gradientCss={gradientCss}
              glass={glass}
              neu={neu}
              shadows={shadows}
              btn={btn}
              textGrad={textGrad}
            />
          </div>

          {/* Control Dock (5 cols) */}
          <div className="lg:col-span-5">
            {activeMode === 'gradient' && (
              <GradientControls state={gradient} onChange={setGradient} />
            )}

            {activeMode === 'glassmorphism' && (
              <GlassmorphismControls state={glass} onChange={setGlass} />
            )}

            {activeMode === 'neumorphism' && (
              <NeumorphismControls state={neu} onChange={setNeu} />
            )}

            {activeMode === 'shadow' && (
              <ShadowControls shadows={shadows} onChange={setShadows} />
            )}

            {activeMode === 'button' && (
              <ButtonControls state={btn} onChange={setBtn} />
            )}

            {activeMode === 'text' && (
              <TextGradientControls state={textGrad} onChange={setTextGrad} />
            )}

            {activeMode === 'palettes' && (
              <TrendingPalettesGrid onSelectPalette={handleSelectPalette} />
            )}
          </div>
        </div>

        {/* Palettes Gallery Section (When not on palettes tab) */}
        {activeMode !== 'palettes' && (
          <TrendingPalettesGrid onSelectPalette={handleSelectPalette} />
        )}

        {/* SEO Technical Guide & Documentation */}
        <SeoEducationalContent />

        {/* FAQ Accordion Section */}
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
