import React, { useMemo, useState } from 'react';
import { AccessibilityStudio } from './components/AccessibilityStudio';
import { ButtonControls } from './components/ButtonControls';
import { CodeExportPanel } from './components/CodeExportPanel';
import { ColorWheelStudio } from './components/ColorWheelStudio';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { GlassmorphismControls } from './components/GlassmorphismControls';
import { GradientControls } from './components/GradientControls';
import { ImageExtractStudio } from './components/ImageExtractStudio';
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

  // Top 1% Architectural Signature Gradient (Liquid Titanium & Obsidian)
  const [gradient, setGradient] = useState<GradientState>({
    type: 'linear',
    angle: 135,
    radialShape: 'circle',
    radialPosition: 'center',
    colorSpace: 'oklch',
    stops: [
      { id: '1', color: '#090a0f', position: 0 },
      { id: '2', color: '#1a202c', position: 40 },
      { id: '3', color: '#334155', position: 75 },
      { id: '4', color: '#94a3b8', position: 100 },
    ],
  });

  // Glassmorphism Optics State
  const [glass, setGlass] = useState<GlassmorphismState>({
    blur: 20,
    opacity: 12,
    color: '#ffffff',
    borderColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderRadius: 16,
    hasShadow: true,
  });

  // Neumorphism Tactile State
  const [neu, setNeu] = useState<NeumorphismState>({
    shape: 'flat',
    size: 200,
    radius: 32,
    distance: 14,
    blur: 28,
    baseColor: '#0b0c10',
  });

  // Multi-Layer Shadow Physics State
  const [shadows, setShadows] = useState<ShadowLayer[]>([
    { id: '1', x: 0, y: 16, blur: 32, spread: -8, color: 'rgba(0, 0, 0, 0.6)', inset: false },
    { id: '2', x: 0, y: 4, blur: 8, spread: -2, color: 'rgba(0, 0, 0, 0.4)', inset: false },
  ]);

  // Executive CTA Button State
  const [btn, setBtn] = useState<ButtonState>({
    text: 'Deploy to Production →',
    gradientAngle: 135,
    colorStart: '#18181b',
    colorEnd: '#27272a',
    textColor: '#ffffff',
    borderRadius: 10,
    paddingY: 13,
    paddingX: 28,
    fontSize: 14,
    hoverEffect: 'shine',
  });

  // Architectural Typography State
  const [textGrad, setTextGrad] = useState<TextGradientState>({
    text: 'CRAFT WITH ARCHITECTURAL PRECISION',
    angle: 135,
    colorStart: '#ffffff',
    colorMiddle: '#cbd5e1',
    colorEnd: '#64748b',
    fontSize: 40,
    fontWeight: 800,
    hasShadow: true,
  });

  const gradientCss = useMemo(() => buildGradientCss(gradient), [gradient]);
  const currentPalette = useMemo(() => gradient.stops.map((s) => s.color), [gradient.stops]);

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
    exportGradientToPng(gradient, 3840, 2160);
  };

  const handleSelectPalette = (preset: PalettePreset) => {
    setGradient({
      type: 'linear',
      angle: preset.angle,
      radialShape: 'circle',
      radialPosition: 'center',
      colorSpace: 'oklch',
      stops: preset.stops,
    });
    setActiveMode('gradient');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Bridge colors from Color Wheel or Image Extractor directly into the Gradient Studio
  const handleApplyColorsToGradient = (hexColors: string[]) => {
    if (!hexColors || hexColors.length === 0) return;
    const step = 100 / Math.max(1, hexColors.length - 1);
    const newStops = hexColors.map((hex, idx) => ({
      id: String(idx + 1),
      color: hex,
      position: Math.round(idx * step),
    }));

    setGradient({
      ...gradient,
      stops: newStops,
    });
    setActiveMode('gradient');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInspectContrast = (hexColors: string[]) => {
    if (!hexColors || hexColors.length === 0) return;
    setActiveMode('accessibility');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-[#08090d] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      <Navbar
        activeMode={activeMode}
        onSelectMode={setActiveMode}
        onRandomize={handleRandomize}
        onCopyCss={handleCopyCss}
        onDownloadPng={handleDownloadPng}
        copied={copied}
      />

      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 sm:p-6 lg:p-8">
        {/* Full-Width Flagship Suite Views */}
        {activeMode === 'color-wheel' && (
          <ColorWheelStudio onApplyToGradient={handleApplyColorsToGradient} />
        )}

        {activeMode === 'image-extract' && (
          <ImageExtractStudio onApplyToGradient={handleApplyColorsToGradient} />
        )}

        {activeMode === 'accessibility' && (
          <AccessibilityStudio currentPalette={currentPalette} />
        )}

        {/* Standard Split Workspace: Live Canvas & Controls (for gradients, glass, neu, shadows, buttons, text, palettes) */}
        {activeMode !== 'color-wheel' && activeMode !== 'image-extract' && activeMode !== 'accessibility' && (
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
                <TrendingPalettesGrid
                  onSelectPalette={handleSelectPalette}
                  onInspectContrast={handleInspectContrast}
                  currentGradient={gradient}
                />
              )}
            </div>
          </div>
        )}

        {/* Curated Gallery Section (Rendered below if on standard modes) */}
        {activeMode !== 'palettes' && activeMode !== 'color-wheel' && activeMode !== 'image-extract' && activeMode !== 'accessibility' && (
          <TrendingPalettesGrid
            onSelectPalette={handleSelectPalette}
            onInspectContrast={handleInspectContrast}
            currentGradient={gradient}
          />
        )}

        {/* Technical Architectural Knowledge Base */}
        <SeoEducationalContent />

        {/* FAQ Accordion Section */}
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
