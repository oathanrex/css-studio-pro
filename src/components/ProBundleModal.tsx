import {
  Check,
  CheckCircle2,
  Code2,
  Coffee,
  Copy,
  Download,
  ExternalLink,
  FileCode,
  Flame,
  Heart,
  Palette,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  downloadProTokensJson,
  downloadTailwindConfig,
} from '../engine/proBundleEngine';

interface ProBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProBundleModal({ isOpen, onClose }: ProBundleModalProps) {
  const [downloadingJson, setDownloadingJson] = useState(false);
  const [downloadingCss, setDownloadingCss] = useState(false);
  const [copiedSnippet, setCopiedSnippet] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadJson = () => {
    setDownloadingJson(true);
    downloadProTokensJson();
    setTimeout(() => setDownloadingJson(false), 2000);
  };

  const handleDownloadCss = () => {
    setDownloadingCss(true);
    downloadTailwindConfig();
    setTimeout(() => setDownloadingCss(false), 2000);
  };

  const sampleSnippet = `@theme {
  --color-gradient-titanium-saas: linear-gradient(in oklch 135deg, #090a0f 0%, #1a202c 40%, #334155 75%, #94a3b8 100%);
  --color-gradient-luxury-gold: linear-gradient(in oklch 135deg, #1c1917 0%, #78350f 33%, #b45309 66%, #fef3c7 100%);
  --color-gradient-nordic-aurora: linear-gradient(in oklch 135deg, #022c22 0%, #064e3b 33%, #059669 66%, #6ee7b7 100%);
}`;

  const handleCopySnippet = () => {
    navigator.clipboard.writeText(sampleSnippet).then(() => {
      setCopiedSnippet(true);
      setTimeout(() => setCopiedSnippet(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-in fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative z-50 w-full max-w-2xl rounded-3xl border border-zinc-200/90 dark:border-white/10 bg-white dark:bg-[#0c0d12] p-6 sm:p-8 shadow-2xl transition-all animate-in zoom-in-95 duration-200 max-h-[92vh] overflow-y-auto text-zinc-900 dark:text-zinc-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header Badge & Title */}
        <div className="space-y-2 pr-8">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              <Sparkles className="h-3 w-3" />
              <span>Architectural Bundle v2.5</span>
            </span>
            <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
              500+ Tokens Included
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Executive Design Tokens &amp; Tailwind v4 Bundle
          </h3>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Elevate your production design systems with 500+ curated OKLCH gradients, glassmorphism presets,
            and pure design tokens engineered for modern web architects.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-start gap-2.5 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/40 p-3.5">
            <Palette className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">500+ OKLCH Gradients</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-tight">
                Titanium SaaS, Luxury Metals, Aurora, Tokyo Neon, Cosmos &amp; Pastels.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/40 p-3.5">
            <Code2 className="h-4 w-4 text-cyan-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Tailwind CSS v4 &amp; CSS Vars</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-tight">
                Ready-to-paste <code className="font-mono text-[10px]">@theme</code> block and pure CSS declarations.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/40 p-3.5">
            <FileCode className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Figma &amp; W3C Tokens JSON</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-tight">
                Import directly into Tokens Studio, Style Dictionary, or Flutter apps.
              </span>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl border border-zinc-200 dark:border-white/5 bg-zinc-50 dark:bg-zinc-900/40 p-3.5">
            <ShieldCheck className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
            <div className="text-xs">
              <span className="font-bold text-zinc-900 dark:text-zinc-100 block">Commercial License</span>
              <span className="text-zinc-500 dark:text-zinc-400 text-[11px] leading-tight">
                Unlimited personal, commercial, client, and open-source projects.
              </span>
            </div>
          </div>
        </div>

        {/* Code Preview Box */}
        <div className="mt-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-slate-900 text-zinc-200 p-3.5 text-xs">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
            <span className="font-mono text-[11px] text-zinc-400">Sample Tailwind v4 @theme</span>
            <button
              type="button"
              onClick={handleCopySnippet}
              className="flex items-center gap-1 text-[11px] text-zinc-300 hover:text-white transition-colors cursor-pointer"
            >
              {copiedSnippet ? (
                <>
                  <Check className="h-3 w-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-3 w-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <pre className="font-mono text-[11px] text-zinc-300 overflow-x-auto whitespace-pre leading-relaxed scrollbar-thin">
            {sampleSnippet}
          </pre>
        </div>

        {/* Primary Support & Action Box */}
        <div className="mt-6 rounded-3xl border border-amber-500/20 bg-amber-500/5 dark:bg-amber-500/10 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5 font-bold text-sm text-zinc-900 dark:text-white">
                <Coffee className="h-4 w-4 text-amber-500" />
                <span>Support the Creator &amp; Unlock Development</span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                CSS Studio Pro is 100% free with zero ads. If it helped your workflow, consider supporting Oathan Rex with a coffee ($5 / $9 / Custom).
              </p>
            </div>

            <a
              href="https://buymeacoffee.com/oathanrex"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FFDD00] hover:bg-[#ffea47] text-black font-bold px-5 py-3 text-xs shadow-md transition-all cursor-pointer shrink-0 hover:scale-105"
            >
              <Coffee className="h-4 w-4 fill-black" />
              <span>Buy Me a Coffee →</span>
              <ExternalLink className="h-3 w-3 opacity-70" />
            </a>
          </div>

          <div className="border-t border-amber-500/20 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              Instant Free Access · 100% Client-Side Generator
            </span>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleDownloadJson}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                {downloadingJson ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Download className="h-3.5 w-3.5" />
                    <span>Download JSON</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadCss}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 rounded-xl border border-zinc-300 dark:border-white/10 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-3.5 py-2 text-xs font-semibold transition-all cursor-pointer shadow-xs"
              >
                {downloadingCss ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-500" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <FileCode className="h-3.5 w-3.5" />
                    <span>Download CSS</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Guarantee */}
        <div className="mt-4 flex items-center justify-between text-[11px] text-zinc-500">
          <div className="flex items-center gap-1.5">
            <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
            <span>Crafted by Oathan Rex for UI Architects</span>
          </div>
          <span className="font-mono">Open Source MIT</span>
        </div>
      </div>
    </div>
  );
}
