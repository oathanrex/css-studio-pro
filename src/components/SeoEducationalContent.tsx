import {
  BookOpen,
  CheckCircle2,
  Code,
  Gauge,
  Layers,
  Palette,
  Sparkles,
} from 'lucide-react';
import React from 'react';

export function SeoEducationalContent() {
  return (
    <section className="space-y-8 rounded-3xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-zinc-950/80 p-6 sm:p-8 shadow-lg dark:shadow-xl text-zinc-700 dark:text-zinc-300 transition-colors duration-200">
      {/* Section Header */}
      <div className="border-b border-zinc-200 dark:border-white/[0.08] pb-5">
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-xs uppercase tracking-wider font-semibold">
          <BookOpen className="h-4 w-4 text-zinc-400" />
          <span>Architectural Engineering Guide</span>
        </div>
        <h2 className="mt-2 text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl tracking-tight">
          Modern CSS Gradients, OKLCH Interpolation &amp; Sub-Pixel Optics
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-3xl">
          Complete guide to mathematical color transitions, CSS Color Module Level 4, hardware-accelerated
          compositing, and zero-CLS web performance.
        </p>
      </div>

      {/* Grid of Knowledge Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: Linear Gradients & OKLCH */}
        <div className="space-y-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
            <Palette className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Linear Gradients &amp; Modern OKLCH Interpolation</h3>
          </div>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Traditional sRGB color interpolation suffers from the notorious &quot;gray dead zone&quot; in the middle of complementary colors. By utilizing CSS Color 4 <code className="text-zinc-900 dark:text-zinc-200 font-mono">in oklch</code>, color transitions remain perceptually uniform with vibrant chroma preservation across all degrees.
          </p>
          <div className="rounded-xl bg-white dark:bg-black/60 p-2.5 font-mono text-[11px] text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
            <code>background: linear-gradient(in oklch 135deg, #090a0f 0%, #334155 60%, #94a3b8 100%);</code>
          </div>
        </div>

        {/* Card 2: Radial & Conic Gradients */}
        <div className="space-y-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
            <Sparkles className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Radial &amp; Conic Gradient Geometry</h3>
          </div>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Radial gradients project colors outward from a focal point using <code className="text-zinc-900 dark:text-zinc-200 font-mono">circle</code> or <code className="text-zinc-900 dark:text-zinc-200 font-mono">ellipse</code> geometry.
            Conic gradients rotate colors 360° around an origin coordinate, ideal for rotational dials, gauges, and light-sweep ray effects.
          </p>
          <div className="rounded-xl bg-white dark:bg-black/60 p-2.5 font-mono text-[11px] text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
            <code>background: radial-gradient(circle at center, #1e293b 0%, #090a0f 100%);</code>
          </div>
        </div>

        {/* Card 3: Glassmorphism Optics */}
        <div className="space-y-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
            <Layers className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">High-Performance Glassmorphism</h3>
          </div>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Glassmorphism combines <code className="text-zinc-900 dark:text-zinc-200 font-mono">backdrop-filter: blur()</code> with sub-pixel alpha transparency.
            For 60fps scrolling, always isolate blurred surfaces to dedicated GPU compositing layers using <code className="text-zinc-900 dark:text-zinc-200 font-mono">will-change: transform</code> or <code className="text-zinc-900 dark:text-zinc-200 font-mono">transform: translateZ(0)</code>.
          </p>
          <div className="rounded-xl bg-white dark:bg-black/60 p-2.5 font-mono text-[11px] text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
            <code>backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);</code>
          </div>
        </div>

        {/* Card 4: Multi-Layer Box Shadows */}
        <div className="space-y-3 rounded-2xl border border-zinc-200 dark:border-white/[0.06] bg-slate-50 dark:bg-zinc-900/40 p-5 shadow-xs">
          <div className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
            <Gauge className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">Realistic 3D Elevation Layering</h3>
          </div>
          <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
            Single-layer box shadows look artificial and harsh. Top-tier design systems stack 2 to 4 subtle shadow layers: a tight ambient shadow for edge definition, and a soft, dispersed penumbra shadow for realistic optical depth.
          </p>
          <div className="rounded-xl bg-white dark:bg-black/60 p-2.5 font-mono text-[11px] text-zinc-800 dark:text-zinc-300 border border-zinc-200 dark:border-white/5">
            <code>box-shadow: 0 16px 32px -8px rgba(0,0,0,0.6), 0 4px 8px -2px rgba(0,0,0,0.4);</code>
          </div>
        </div>
      </div>
    </section>
  );
}
