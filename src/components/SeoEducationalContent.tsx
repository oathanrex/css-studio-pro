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
    <section className="space-y-8 rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-xl text-slate-300">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-wider">
          <BookOpen className="h-4 w-4" />
          <span>Technical Architecture &amp; Developer Guide</span>
        </div>
        <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
          Mastering Modern CSS Gradients, Glassmorphism &amp; Shadows
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-400 max-w-3xl">
          Everything you need to know about mathematical color transitions, hardware-accelerated
          compositing, and zero-CLS web performance.
        </p>
      </div>

      {/* Grid of Knowledge Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Card 1: Linear Gradients */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center gap-2 text-indigo-400">
            <Palette className="h-5 w-5" />
            <h3 className="text-base font-bold text-white">The Anatomy of CSS Linear Gradients</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            A linear gradient generates a progressive color transition along a directional gradient line.
            The angle is defined either through degrees (<code className="text-indigo-300">45deg</code>, <code className="text-indigo-300">135deg</code>) or standard directional keywords (<code className="text-indigo-300">to right</code>, <code className="text-indigo-300">to bottom left</code>).
          </p>
          <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-emerald-400">
            <code>background: linear-gradient(135deg, #f72585 0%, #4361ee 100%);</code>
          </div>
        </div>

        {/* Card 2: Radial & Conic Gradients */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center gap-2 text-purple-400">
            <Sparkles className="h-5 w-5" />
            <h3 className="text-base font-bold text-white">Radial &amp; Conic Gradient Geometry</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Radial gradients expand outward circularly or elliptically from an origin point (<code className="text-purple-300">center</code>, <code className="text-purple-300">top left</code>).
            Conic gradients rotate colors 360° around a center coordinate, making them ideal for pie charts, color wheels, and ray-tracing effects.
          </p>
          <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-emerald-400">
            <code>background: radial-gradient(circle at center, #00f2fe 0%, #4facfe 100%);</code>
          </div>
        </div>

        {/* Card 3: Core Web Vitals Advantage */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center gap-2 text-emerald-400">
            <Gauge className="h-5 w-5" />
            <h3 className="text-base font-bold text-white">Why Pure CSS Crushes Image Backgrounds in Core Web Vitals</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Replacing heavy PNG/JPG background images with native CSS gradients saves hundreds of kilobytes of network transfer, eliminates extra HTTP requests, avoids Cumulative Layout Shift (CLS), and achieves an instant <strong className="text-white">0ms Largest Contentful Paint (LCP)</strong>.
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>100/100 Google Lighthouse &amp; PageSpeed Rating</span>
          </div>
        </div>

        {/* Card 4: Glassmorphism Architecture */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-950/50 p-5">
          <div className="flex items-center gap-2 text-cyan-400">
            <Layers className="h-5 w-5" />
            <h3 className="text-base font-bold text-white">Hardware-Accelerated Glassmorphism</h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-400">
            Glassmorphism combines <code className="text-cyan-300">backdrop-filter: blur()</code> with translucent RGBA layers and sub-pixel borders. Always declare <code className="text-cyan-300">-webkit-backdrop-filter</code> alongside standard rules to support WebKit/Safari rendering engines without visual artifacts.
          </p>
          <div className="rounded-lg bg-slate-900 p-2.5 font-mono text-[11px] text-emerald-400">
            <code>backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);</code>
          </div>
        </div>
      </div>
    </section>
  );
}
