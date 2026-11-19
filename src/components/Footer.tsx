import {
  BookOpen,
  Code2,
  ExternalLink,
  Github,
  Globe,
  HelpCircle,
  Palette,
  Shield,
  Sparkles,
} from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-zinc-200 dark:border-white/[0.08] bg-slate-100/80 dark:bg-[#07080b] py-14 text-zinc-600 dark:text-zinc-400 text-xs transition-colors duration-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand & Mission (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white text-base">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 font-black text-xs">
                C
              </div>
              <span>CSS Studio Pro</span>
              <span className="rounded-full bg-zinc-200 dark:bg-zinc-800 border border-zinc-300 dark:border-white/10 px-2 py-0.5 text-[10px] text-zinc-700 dark:text-zinc-300 font-mono">
                v2.5 PRO
              </span>
            </div>

            <p className="text-xs leading-relaxed text-zinc-600 dark:text-zinc-400 max-w-sm">
              Architectural visual color &amp; CSS design workstation by{' '}
              <a
                href="https://oathanrex.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-900 dark:text-zinc-200 hover:underline font-semibold underline-offset-2"
              >
                Oathan Rex
              </a>
              . Engineered for frontend architects, UI engineers, and design system creators.
              100% client-side computing, zero tracking scripts, and zero advertising.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://oathanrex.github.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <Globe className="h-3 w-3 text-zinc-500" />
                <span>Portfolio</span>
              </a>

              <a
                href="https://github.com/oathanrex"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 py-1.5 text-[11px] font-medium text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs"
              >
                <Github className="h-3 w-3 text-zinc-500" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </div>

          {/* Col 2: Workstation Modules */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
              Workstation Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#root" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  OKLCH Linear &amp; Radial Gradients
                </a>
              </li>
              <li>
                <a href="#root" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Color Wheel Studio (10 Harmonies)
                </a>
              </li>
              <li>
                <a href="#root" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Canvas Image Palette Extractor
                </a>
              </li>
              <li>
                <a href="#root" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Sub-Pixel Glassmorphism Optics
                </a>
              </li>
              <li>
                <a href="#root" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Tactile Neumorphic Physics
                </a>
              </li>
              <li>
                <a href="#root" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Multi-Layer Elevation Shadows
                </a>
              </li>
              <li>
                <a href="#root" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  WCAG 2.1 AA/AAA Contrast Checker
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Color Science & Guides */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
              Color Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  OKLCH vs sRGB Perceptual Space
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  The 10 Color Harmony Rules
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Client-Side Quantization Math
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  GPU Layer Isolation at 60fps
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Relative Luminance Formula
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Color Blindness 3x3 Matrices
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Legal */}
          <div className="space-y-3">
            <h4 className="font-semibold text-xs text-zinc-900 dark:text-white uppercase tracking-wider font-mono">
              Engineering &amp; Trust
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#faq-section" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Technical FAQs (10 Q&amp;As)
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Tailwind CSS v3 &amp; v4 Generation
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  SVG, Flutter &amp; Android Exports
                </a>
              </li>
              <li>
                <a href="#educational-guide" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
                  Zero-Telemetry Privacy Guarantee
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/oathanrex/css-studio-pro"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  <span>Open Source MIT Repository</span>
                  <ExternalLink className="h-2.5 w-2.5 text-zinc-400" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-white/[0.08] pt-6 text-[11px] text-zinc-500">
          <div>
            © 2026 <strong className="text-zinc-700 dark:text-zinc-300 font-semibold">Oathan Rex</strong>. All rights reserved.
            Crafted for web architects with React 19, TypeScript &amp; Vite.
          </div>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              100% Client-Side Computing
            </span>
            <span>·</span>
            <span>Zero Tracking</span>
            <span>·</span>
            <span>Zero Ads</span>
          </div>
        </div>
      </div>
    </footer>
  );
}