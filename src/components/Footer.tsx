import { Github, Globe, Heart, Shield } from 'lucide-react';
import React from 'react';

export function Footer() {
  return (
    <footer className="mt-16 border-t border-slate-800 bg-slate-950 py-12 text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <span>CSS Studio Pro</span>
            <span className="rounded bg-indigo-500/20 px-1.5 py-0.5 text-[10px] text-indigo-400 font-mono">
              v2.0
            </span>
          </div>
          <p className="mt-1 max-w-md text-[11px] text-slate-500">
            Open-source visual CSS design studio built by{' '}
            <a
              href="https://oathanrex.github.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-400 hover:underline font-semibold"
            >
              Oathan Rex
            </a>
            . 100% client-side, privacy-first, zero ads, zero trackers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-semibold">
          <a
            href="https://oathanrex.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Globe className="h-3.5 w-3.5 text-indigo-400" />
            <span>OathanRex Portfolio</span>
          </a>

          <a
            href="https://github.com/oathanrex"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Profile</span>
          </a>

          <span className="text-slate-600">•</span>
          <span>MIT License © 2026</span>
        </div>
      </div>
    </footer>
  );
}
