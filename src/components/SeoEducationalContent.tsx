import {
  Activity,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Code2,
  Cpu,
  Eye,
  FileCode,
  Gauge,
  HelpCircle,
  Layers,
  Palette,
  ShieldCheck,
  Sparkles,
  User,
  Zap,
} from 'lucide-react';
import React, { useState } from 'react';

export function SeoEducationalContent() {
  const [activeTab, setActiveTab] = useState<'oklch' | 'harmonies' | 'canvas' | 'optics' | 'accessibility' | 'about'>('oklch');

  return (
    <section id="educational-guide" className="space-y-8 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-6 sm:p-8 md:p-10 shadow-lg dark:shadow-xl text-zinc-700 dark:text-zinc-300 transition-colors duration-200">
      {/* Section Header */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider font-semibold">
            <BookOpen className="h-4 w-4 text-zinc-400" />
            <span>Architectural Engineering Guide &amp; Technical Documentation</span>
          </div>
          <span className="rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800/50 px-2.5 py-0.5 text-[11px] font-mono text-blue-700 dark:text-blue-300">
            CSS Color Module Level 4 &amp; WCAG 2.1
          </span>
        </div>
        <h2 className="mt-3 text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl tracking-tight">
          Modern Color Science, Algorithmic Harmonies &amp; Sub-Pixel CSS Optics
        </h2>
        <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-4xl">
          An in-depth technical manual for frontend architects, design system engineers, and UI developers.
          Learn how perceptual color spaces, client-side canvas quantization, hardware-accelerated compositor layers,
          and mathematical contrast ratios elevate production web experiences.
        </p>

        {/* Navigation Tabs */}
        <div className="mt-6 flex flex-wrap gap-2 border-t border-zinc-100 dark:border-white/5 pt-4">
          <button
            type="button"
            onClick={() => setActiveTab('oklch')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'oklch'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Palette className="h-3.5 w-3.5" />
            <span>1. OKLCH Color Science</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('harmonies')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'harmonies'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>2. The 10 Color Harmonies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'canvas'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>3. Client-Side Image Sampling</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('optics')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'optics'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>4. Glassmorphism &amp; Shadows</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('accessibility')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'accessibility'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>5. WCAG 2.1 &amp; Vision Deficiencies</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800'
            }`}
          >
            <User className="h-3.5 w-3.5" />
            <span>6. About &amp; Philosophy</span>
          </button>
        </div>
      </div>

      {/* Tab 1: OKLCH Color Science */}
      {activeTab === 'oklch' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900/40 p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Palette className="h-5 w-5 text-indigo-500" />
              <span>OKLCH vs Traditional sRGB: Eliminating the &quot;Gray Dead Zone&quot;</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              For decades, the web has relied on standard RGB (<code className="font-mono text-zinc-900 dark:text-zinc-200">sRGB</code>) color representation.
              However, sRGB is fundamentally non-uniform to the human optical system: a transition between blue and yellow in sRGB
              traverses mathematically through desaturated, muddy gray midpoints because RGB coordinates do not correspond to perceptual lightness.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <h4 className="font-semibold text-xs text-red-600 dark:text-red-400 uppercase tracking-wide">
                  Traditional sRGB Problem
                </h4>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Interpolating complementary colors creates an involuntary desaturation dip (the muddy gray dead zone).
                  Lightness shifts uncontrollably across hues, causing poor contrast and inconsistent button states.
                </p>
                <div className="mt-3 rounded-lg bg-zinc-100 dark:bg-black/60 p-2 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
                  <code>background: linear-gradient(90deg, #0284c7, #f59e0b);</code>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <h4 className="font-semibold text-xs text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">
                  CSS Color 4 OKLCH Solution
                </h4>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  OKLCH separates Lightness (<code className="font-mono">L</code>, 0% to 100%), Chroma (<code className="font-mono">C</code>, purity),
                  and Hue angle (<code className="font-mono">h</code>, 0° to 360°). Interpolation preserves perceived luminescence and vibrant saturation.
                </p>
                <div className="mt-3 rounded-lg bg-zinc-100 dark:bg-black/60 p-2 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
                  <code>background: linear-gradient(in oklch 90deg, #0284c7, #f59e0b);</code>
                </div>
              </div>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-white/10 text-zinc-500 font-mono text-[11px] uppercase">
                    <th className="py-2.5 px-3">Dimension</th>
                    <th className="py-2.5 px-3">sRGB Color Space</th>
                    <th className="py-2.5 px-3">OKLCH Color Space</th>
                    <th className="py-2.5 px-3">Architectural Benefit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-white/5 font-sans">
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-zinc-900 dark:text-white">Perceptual Uniformity</td>
                    <td className="py-2.5 px-3 text-red-500 dark:text-red-400">Non-uniform (gamma skewed)</td>
                    <td className="py-2.5 px-3 text-emerald-500 dark:text-emerald-400">Mathematically linear to human eye</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">Smooth gradients without muddy bands</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-zinc-900 dark:text-white">Gamut Coverage</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">Standard sRGB (~35% of visible)</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">Display-P3 &amp; Rec.2020 wide-gamut</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">Vibrant neon &amp; deep OLED saturations</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-zinc-900 dark:text-white">Lightness Predictability</td>
                    <td className="py-2.5 px-3 text-red-500 dark:text-red-400">Yellow looks brighter than Blue at same #</td>
                    <td className="py-2.5 px-3 text-emerald-500 dark:text-emerald-400">L=0.7 is identical perceived brightness across all hues</td>
                    <td className="py-2.5 px-3 text-zinc-600 dark:text-zinc-400">Guaranteed WCAG contrast across theme hues</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: The 10 Color Harmonies */}
      {activeTab === 'harmonies' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900/40 p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-500" />
              <span>The 10 Classical &amp; Algorithmic Color Harmony Systems</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Color harmony is the aesthetic juxtaposition of hues based on geometric relationships along the color wheel.
              CSS Studio Pro includes 10 algorithmic rules allowing designers to generate cohesive palettes from any base anchor hue.
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">1. Complementary</h4>
                  <span className="font-mono text-[10px] text-zinc-500">180°</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Colors diametrically opposite on the wheel. Delivers maximum visual tension, high-energy contrast, and distinct focal points.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">2. Analogous</h4>
                  <span className="font-mono text-[10px] text-zinc-500">±30°</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Colors situated adjacent to each other. Creates serene, natural, and harmonious monochromatic-like gradients found in nature.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">3. Triadic</h4>
                  <span className="font-mono text-[10px] text-zinc-500">120°</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Three equidistant points forming an equilateral triangle. Offers vibrant balance while retaining strong visual variety.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">4. Tetradic (Rectangular)</h4>
                  <span className="font-mono text-[10px] text-zinc-500">60° / 180°</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Two complementary color pairs arranged in a rectangle. Rich palette with ample color combinations when one dominant hue is chosen.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">5. Square</h4>
                  <span className="font-mono text-[10px] text-zinc-500">90°</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Four colors spaced evenly at 90-degree intervals around the color wheel. Maximum dynamic chromatic range with four balanced accents.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">6. Split-Complementary</h4>
                  <span className="font-mono text-[10px] text-zinc-500">150° / 210°</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  A base hue paired with the two colors adjacent to its complement. Delivers high contrast with less visual tension than standard complement.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">7. Monochromatic</h4>
                  <span className="font-mono text-[10px] text-zinc-500">ΔL / ΔC</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Constant hue angle with varying levels of saturation (chroma) and lightness. Perfect for cohesive enterprise design token systems.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">8. Compound (Double-Split)</h4>
                  <span className="font-mono text-[10px] text-zinc-500">±30° &amp; 180°</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Combines analogous neighbors with their opposite counterparts. Subtle contrast with organic, nuanced depth for illustrations and headers.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">9. Shades &amp; Tints</h4>
                  <span className="font-mono text-[10px] text-zinc-500">Black/White Mix</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Pure hue graduated toward black (shades) and toward white (tints). Essential for UI states (hover, active, disabled) and border layers.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4 sm:col-span-2 lg:col-span-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-xs text-zinc-900 dark:text-white">10. OKLCH Perceptual Hue-Step</h4>
                  <span className="font-mono text-[10px] text-zinc-500">Δh in Cylindrical Space</span>
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400">
                  Calculates equidistant hue steps in the cylindrical OKLCH model while strictly holding Lightness and Chroma constant.
                  Guarantees that every generated swatch shares identical perceived prominence and luminosity on both dark and light modes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Client-Side Image Sampling */}
      {activeTab === 'canvas' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900/40 p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-emerald-500" />
              <span>Client-Side Image Color &amp; Gradient Extraction via HTML5 Canvas</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Unlike legacy online palette extractors that upload high-resolution images to remote cloud servers,
              CSS Studio Pro executes 100% of image decoding and quantization directly in the client browser using the HTML5 2D Canvas API.
            </p>

            <div className="mt-5 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900 dark:text-white">Sub-Pixel Sampling &amp; Quantization</h4>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Uploaded images are drawn to an off-screen canvas. The raw pixel array (<code className="font-mono">ctx.getImageData().data</code>) is downsampled
                    using step-stride decimation, skipping transparent and extreme low-frequency background pixels to extract meaningful foreground and midtone hues.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900 dark:text-white">Euclidean Clustering &amp; Mood Filters</h4>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Colors are clustered based on Euclidean distance in perceptual space. Dynamic mood filters (Vibrant, Muted, Deep Dark, Pastel, High Contrast)
                    weight candidates by chromatic saturation and luminance thresholds to isolate the exact brand aesthetic desired.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-xs text-zinc-900 dark:text-white">Zero Telemetry &amp; Absolute Data Privacy</h4>
                  <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Images never leave the user machine. Zero bytes are uploaded, cached, or stored on remote servers.
                    Engineers can safely extract color palettes from proprietary UI mockups, confidential photography, and unreleased client branding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Glassmorphism & Shadows */}
      {activeTab === 'optics' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900/40 p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-cyan-500" />
              <span>Sub-Pixel Optics: Glassmorphism, GPU Layer Isolation &amp; Natural Shadows</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Modern digital interfaces simulate real-world optical phenomena—such as refraction, sub-surface scattering, and diffuse shadows—using standard CSS properties.
              Achieving tactile elegance without degrading frame rates requires understanding GPU compositing mechanics.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <h4 className="font-bold text-xs text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Gauge className="h-4 w-4 text-cyan-500" />
                  <span>Hardware-Accelerated Frosted Glass</span>
                </h4>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Applying <code className="font-mono">backdrop-filter: blur(20px)</code> forces the browser engine to sample behind the element.
                  To ensure 60fps scrolling on mobile devices, isolate the element onto its own GPU compositor layer:
                </p>
                <div className="mt-3 rounded-lg bg-zinc-100 dark:bg-black/60 p-2 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 space-y-1">
                  <div>background: rgba(255, 255, 255, 0.12);</div>
                  <div>backdrop-filter: blur(20px);</div>
                  <div>-webkit-backdrop-filter: blur(20px);</div>
                  <div>transform: translateZ(0); /* GPU Layer */</div>
                  <div>border: 1px solid rgba(255, 255, 255, 0.15);</div>
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <h4 className="font-bold text-xs text-zinc-900 dark:text-white flex items-center gap-1.5">
                  <Activity className="h-4 w-4 text-cyan-500" />
                  <span>Multi-Layer Ambient &amp; Penumbra Shadows</span>
                </h4>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Real light sources produce both an umbra (tight contact shadow) and a penumbra (diffuse ambient spread).
                  Stacking multiple subtle box-shadows produces photorealistic elevation:
                </p>
                <div className="mt-3 rounded-lg bg-zinc-100 dark:bg-black/60 p-2 font-mono text-[11px] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/5 space-y-1">
                  <div>box-shadow:</div>
                  <div>&nbsp;&nbsp;0 16px 32px -8px rgba(0, 0, 0, 0.6), /* Penumbra */</div>
                  <div>&nbsp;&nbsp;0 4px 8px -2px rgba(0, 0, 0, 0.4);  /* Umbra */</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: WCAG 2.1 & Vision Deficiencies */}
      {activeTab === 'accessibility' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900/40 p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-500" />
              <span>WCAG 2.1 Contrast Ratios &amp; Color Vision Deficiency Simulation</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Web accessibility is non-negotiable for modern software. Over 300 million people worldwide experience color vision deficiencies.
              CSS Studio Pro builds Adobe Color parity contrast checking and real-time color blindness simulations directly into the core studio.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <h4 className="font-bold text-xs text-zinc-900 dark:text-white uppercase tracking-wide">
                  Relative Luminance &amp; Contrast Formula
                </h4>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Relative luminance <code className="font-mono">L</code> is calculated from linearized RGB components:
                </p>
                <div className="mt-2 rounded-lg bg-zinc-100 dark:bg-black/60 p-2.5 font-mono text-[11px] text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
                  L = 0.2126 * R + 0.7152 * G + 0.0722 * B
                </div>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  The contrast ratio between light luminance <code className="font-mono">L1</code> and dark luminance <code className="font-mono">L2</code> is:
                </p>
                <div className="mt-2 rounded-lg bg-zinc-100 dark:bg-black/60 p-2.5 font-mono text-[11px] text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
                  Ratio = (L1 + 0.05) / (L2 + 0.05)
                </div>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <h4 className="font-bold text-xs text-zinc-900 dark:text-white uppercase tracking-wide">
                  WCAG Compliance Thresholds
                </h4>
                <ul className="mt-2 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-1">
                    <span>Normal Body Text (AA)</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">≥ 4.5 : 1</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-1">
                    <span>Large Text (18pt+) &amp; UI Components (AA)</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">≥ 3.0 : 1</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-zinc-100 dark:border-white/5 pb-1">
                    <span>Normal Body Text Enhanced (AAA)</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">≥ 7.0 : 1</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Large Text Enhanced (AAA)</span>
                    <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">≥ 4.5 : 1</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
              <h4 className="font-bold text-xs text-zinc-900 dark:text-white uppercase tracking-wide flex items-center gap-2">
                <Eye className="h-4 w-4 text-indigo-500" />
                <span>Simulated Color Vision Deficiencies</span>
              </h4>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/60 p-3 border border-zinc-200/60 dark:border-white/5">
                  <div className="font-semibold text-xs text-zinc-900 dark:text-white">Protanopia</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Red-cone deficiency (1% of males). Red appears dark or olive gray.</div>
                </div>
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/60 p-3 border border-zinc-200/60 dark:border-white/5">
                  <div className="font-semibold text-xs text-zinc-900 dark:text-white">Deuteranopia</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Green-cone deficiency (6% of males). Difficulty discerning reds and greens.</div>
                </div>
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/60 p-3 border border-zinc-200/60 dark:border-white/5">
                  <div className="font-semibold text-xs text-zinc-900 dark:text-white">Tritanopia</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Blue-cone deficiency (rare, &lt;0.1%). Blue and yellow appear desaturated or pink.</div>
                </div>
                <div className="rounded-lg bg-zinc-50 dark:bg-zinc-900/60 p-3 border border-zinc-200/60 dark:border-white/5">
                  <div className="font-semibold text-xs text-zinc-900 dark:text-white">Achromatopsia</div>
                  <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Complete color blindness. World is perceived exclusively in lightness values.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6: About the Project & Author Philosophy */}
      {activeTab === 'about' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="rounded-2xl border border-zinc-200 dark:border-white/[0.08] bg-slate-50 dark:bg-zinc-900/40 p-6">
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-500" />
              <span>About CSS Studio Pro &amp; Author Engineering Philosophy</span>
            </h3>
            <p className="mt-3 text-xs sm:text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              CSS Studio Pro was created and architected by <strong>Oathan Rex</strong>, a frontend engineer, open-source contributor, and web architect.
              Frustrated by bloated online design tools with intrusive ads, paywalls, and heavy tracking scripts, Oathan designed CSS Studio Pro
              to be an uncompromising, executive-grade design workstation that runs entirely client-side.
            </p>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <Zap className="h-4 w-4 text-amber-500" />
                <h4 className="mt-2 font-bold text-xs text-zinc-900 dark:text-white">Zero Bloat &amp; Sub-50ms React</h4>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Built on React 19, TypeScript, and Vite. Instant render cycles, 100/100 Lighthouse performance, and zero Cumulative Layout Shift (CLS).
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <ShieldCheck className="h-4 w-4 text-emerald-500" />
                <h4 className="mt-2 font-bold text-xs text-zinc-900 dark:text-white">Strict Privacy Architecture</h4>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Zero telemetry, zero cookies, and zero third-party advertising trackers. Your images and palette designs remain 100% on your machine.
                </p>
              </div>

              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-950 p-4">
                <FileCode className="h-4 w-4 text-blue-500" />
                <h4 className="mt-2 font-bold text-xs text-zinc-900 dark:text-white">Production-Ready Code Output</h4>
                <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Export directly to vanilla CSS, Tailwind CSS v3/v4 classes, SVG vector gradients, Flutter Dart BoxDecoration, and Android XML.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200 dark:border-white/10 pt-4 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-semibold text-zinc-900 dark:text-white">Connect with the Author:</span>
                <a
                  href="https://oathanrex.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Oathan Rex Portfolio →
                </a>
                <a
                  href="https://github.com/oathanrex"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-zinc-700 dark:text-zinc-300 hover:underline font-medium"
                >
                  GitHub Profile →
                </a>
              </div>

              <span className="font-mono text-[11px] text-zinc-500">
                CSS Studio Pro v2.5 · Open Source MIT License
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}